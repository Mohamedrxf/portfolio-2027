import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { disposeMaterial, disposeObject3D } from '@/lib/three/utils/cleanup';

interface NodeDef {
  id: string;
  type: 'pc' | 'switch' | 'router' | 'server' | 'firewall' | 'cloud' | 'database';
  position: [number, number, number];
  label: string;
  active?: boolean;
}
interface ConnectionDef {
  from: string;
  to: string;
  packetSpeed?: number;
}

interface NetworkTopologyProps {
  scene: THREE.Scene;
  nodes: NodeDef[];
  connections: ConnectionDef[];
  enabled?: boolean;
  rotationSpeed?: number;
}

// Cinematic hardware palette — dark metallic, understated, no neon
const DEVICE: Record<
  NodeDef['type'],
  {
    color: number;
    emissive: number;
    shape: 'box' | 'cylinder' | 'sphere';
    size: number;
  }
> = {
  pc: { color: 0x0a0c10, emissive: 0x0ea5e9, shape: 'box', size: 0.85 },
  switch: { color: 0x0b0f14, emissive: 0x22d3ee, shape: 'box', size: 0.95 },
  router: { color: 0x0a0d12, emissive: 0x3b82f6, shape: 'cylinder', size: 0.78 },
  server: { color: 0x090c10, emissive: 0x8b5cf6, shape: 'box', size: 0.8 },
  firewall: { color: 0x0a0c10, emissive: 0xf97316, shape: 'box', size: 0.9 },
  cloud: { color: 0x11151c, emissive: 0x22d3ee, shape: 'sphere', size: 1.0 },
  database: { color: 0x0a0d12, emissive: 0x10b981, shape: 'cylinder', size: 0.72 },
};

export function NetworkTopology({
  scene,
  nodes,
  connections,
  enabled = true,
  rotationSpeed = 0.04,
}: NetworkTopologyProps) {
  const groupRef = useRef<THREE.Group | null>(null);
  const packetMeshesRef = useRef<THREE.Mesh[]>([]);
  const curvesRef = useRef<THREE.QuadraticBezierCurve3[]>([]);

  useEffect(() => {
    if (!scene || !enabled) return;
    const group = new THREE.Group();
    groupRef.current = group;
    scene.add(group);

    const built: THREE.Object3D[] = [];
    const packetMeshes: THREE.Mesh[] = [];
    const curves: THREE.QuadraticBezierCurve3[] = [];

    // --- Devices ---
    nodes.forEach((node) => {
      const cfg = DEVICE[node.type];
      const sub = new THREE.Group();
      sub.position.set(...node.position);
      sub.scale.setScalar(node.type === 'cloud' ? 1.35 : 1);
      sub.userData = { type: node.type, label: node.label, active: node.active ?? true };
      group.add(sub);
      built.push(sub);

      const s = cfg.size;

      // Body — realistic hardware proportions
      const geo =
        cfg.shape === 'box'
          ? new THREE.BoxGeometry(s, s * 0.78, s * 0.85)
          : cfg.shape === 'cylinder'
            ? new THREE.CylinderGeometry(s * 0.7, s * 0.78, s * 0.9, 28)
            : new THREE.SphereGeometry(s * 0.7, 32, 24);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        emissive: cfg.emissive,
        emissiveIntensity: 0.12,
        metalness: 0.85,
        roughness: 0.32,
      });
      const body = new THREE.Mesh(geo, bodyMat);
      body.castShadow = true;
      body.receiveShadow = true;
      sub.add(body);
      built.push(body);

      // Front bezel — recessed dark panel
      const bezel = new THREE.Mesh(
        new THREE.PlaneGeometry(s * 0.88, s * 0.62),
        new THREE.MeshBasicMaterial({ color: 0x020304, side: THREE.DoubleSide })
      );
      bezel.position.set(0, 0, s * 0.43);
      sub.add(bezel);
      built.push(bezel);

      // Status LEDs — tiny, understated
      const ledMat = new THREE.MeshStandardMaterial({
        color: 0x22d3ee,
        emissive: 0x22d3ee,
        emissiveIntensity: 0.8,
        metalness: 0.4,
        roughness: 0.4,
      });
      const ledCount = node.type === 'server' ? 6 : 3;
      for (let i = 0; i < ledCount; i++) {
        const led = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), ledMat);
        led.position.set((i - (ledCount - 1) / 2) * (s * 0.13), -s * 0.32, s * 0.43);
        led.userData = { blink: Math.random() * Math.PI * 2 };
        sub.add(led);
        built.push(led);
      }

      // Label plate — small metallic nameplate
      const labelMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(s * 1.25, 0.16),
        new THREE.MeshBasicMaterial({ color: 0x7a8694 })
      );
      labelMesh.position.set(0, s * 0.52, s * 0.45);
      sub.add(labelMesh);
      built.push(labelMesh);
    });

    // --- Cables + packets ---
    connections.forEach((conn) => {
      const from = nodes.find((n) => n.id === conn.from);
      const to = nodes.find((n) => n.id === conn.to);
      if (!from || !to) return;
      const s = new THREE.Vector3(...from.position);
      const e = new THREE.Vector3(...to.position);
      const mid = new THREE.Vector3().addVectors(s, e).multiplyScalar(0.5);
      mid.y += (e.y - s.y) * 0.18;
      const curve = new THREE.QuadraticBezierCurve3(s, mid, e);
      curves.push(curve);

      const pts = curve.getPoints(47);
      const pos = new Float32Array(48 * 3);
      for (let i = 0; i < pts.length; i++) {
        pos[i * 3] = pts[i].x;
        pos[i * 3 + 1] = pts[i].y;
        pos[i * 3 + 2] = pts[i].z;
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(pos.slice(), 3));
      g.computeBoundingSphere();
      const line = new THREE.Line(
        g,
        new THREE.LineBasicMaterial({ color: 0x2a3340, transparent: true, opacity: 0.5 })
      );
      group.add(line);
      built.push(line);

      const packet = new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 10, 10),
        new THREE.MeshBasicMaterial({ color: 0x67e8f9, transparent: true, opacity: 0.95 })
      );
      group.add(packet);
      packetMeshes.push(packet);
      built.push(packet);
    });

    packetMeshesRef.current = packetMeshes;
    curvesRef.current = curves;

    return () => {
      scene.remove(group);
      group.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry?.dispose();
          const mats = Array.isArray(child.material) ? child.material : [child.material];
          mats.forEach((m) => disposeMaterial(m));
        }
      });
      built.forEach((o) => disposeObject3D(o));
      groupRef.current = null;
      packetMeshesRef.current = [];
      curvesRef.current = [];
    };
  }, [scene, enabled, nodes, connections]);

  useEffect(() => {
    if (!groupRef.current || !enabled) return;
    let id: number;
    const tick = () => {
      if (groupRef.current) groupRef.current.rotation.y += rotationSpeed * 0.003;
      const t = performance.now() / 1000;
      packetMeshesRef.current.forEach((p, i) => {
        const curve = curvesRef.current[i];
        if (!curve) return;
        const tt = (t * 0.3 * (1 + (i % 3) * 0.25)) % 1;
        const pt = curve.getPoint(tt);
        p.position.copy(pt);
        p.scale.setScalar(0.5 + Math.sin(tt * Math.PI * 2) * 0.12 + 0.6);
      });
      id = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(id);
  }, [enabled, rotationSpeed]);

  return null;
}
