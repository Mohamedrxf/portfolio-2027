import { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { disposeGeometry, disposeMaterial } from '@/lib/three/utils/cleanup';

interface NetworkDeviceProps {
  parent: THREE.Group;
  position: [number, number, number];
  type: 'pc' | 'switch' | 'router' | 'server' | 'firewall' | 'cloud' | 'database';
  label?: string;
  active?: boolean;
  scale?: number;
}

const CONFIG: Record<
  NetworkDeviceProps['type'],
  { color: number; emissive: number; shape: 'box' | 'cylinder' | 'sphere' }
> = {
  pc: { color: 0x0a0c10, emissive: 0x0ea5e9, shape: 'box' },
  switch: { color: 0x0b0f14, emissive: 0x22d3ee, shape: 'box' },
  router: { color: 0x0a0d12, emissive: 0x3b82f6, shape: 'cylinder' },
  server: { color: 0x090c10, emissive: 0x8b5cf6, shape: 'box' },
  firewall: { color: 0x0a0c10, emissive: 0xf97316, shape: 'box' },
  cloud: { color: 0x11151c, emissive: 0x22d3ee, shape: 'sphere' },
  database: { color: 0x0a0d12, emissive: 0x10b981, shape: 'cylinder' },
};

export function NetworkDevice({
  parent,
  position,
  type,
  label,
  active = true,
  scale = 1,
}: NetworkDeviceProps) {
  const groupRef = useRef<THREE.Group | null>(null);
  const cfg = CONFIG[type];

  const geometry = useMemo(() => {
    if (cfg.shape === 'box') return new THREE.BoxGeometry(1, 1, 1);
    if (cfg.shape === 'cylinder') return new THREE.CylinderGeometry(0.6, 0.7, 1, 24);
    return new THREE.SphereGeometry(0.6, 24, 24);
  }, [cfg.shape]);

  useEffect(() => {
    const group = new THREE.Group();
    group.position.set(...position);
    group.scale.setScalar(scale);
    group.userData = { type, label, active };
    groupRef.current = group;
    parent.add(group);

    const bodyMat = new THREE.MeshStandardMaterial({
      color: cfg.color,
      emissive: cfg.emissive,
      emissiveIntensity: 0.18,
      metalness: 0.7,
      roughness: 0.35,
    });
    const body = new THREE.Mesh(geometry, bodyMat);
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    const bezel = new THREE.Mesh(
      new THREE.PlaneGeometry(0.92, 0.82),
      new THREE.MeshBasicMaterial({ color: 0x020304, side: THREE.DoubleSide })
    );
    bezel.position.set(0, 0, 0.51);
    group.add(bezel);

    const ledMat = new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      emissive: 0x22d3ee,
      emissiveIntensity: 0.9,
    });
    const ledCount = type === 'server' ? 8 : 4;
    for (let i = 0; i < ledCount; i++) {
      const led = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), ledMat);
      led.position.set((i - (ledCount - 1) / 2) * 0.16, -0.35, 0.5);
      led.userData = { blink: Math.random() * Math.PI * 2 };
      group.add(led);
    }

    const labelMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1.4, 0.22),
      new THREE.MeshBasicMaterial({ color: 0x94a3b8 })
    );
    labelMesh.position.set(0, 0.62, 0.55);
    group.add(labelMesh);

    return () => {
      parent.remove(group);
      group.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry?.dispose();
          const mats = Array.isArray(child.material) ? child.material : [child.material];
          mats.forEach((m) => disposeMaterial(m));
        }
      });
      disposeGeometry(geometry);
      groupRef.current = null;
    };
  }, [parent, position, scale, type, active, cfg, geometry]);

  useEffect(() => {
    if (!groupRef.current) return;
    let id: number;
    const tick = () => {
      const t = performance.now() / 1000;
      groupRef.current?.children.forEach((child) => {
        if (child instanceof THREE.Mesh && child.userData?.blink !== undefined) {
          const m = child.material as THREE.MeshStandardMaterial;
          const on = Math.sin(t * 3 + child.userData.blink) > 0.3;
          if (active && on) {
            m.emissive.setScalar(1.0);
            m.color.setHex(0x22d3ee);
          } else {
            m.emissive.setScalar(active ? 0.3 : 0);
            m.color.setHex(active ? 0x22d3ee : 0x334155);
          }
        }
      });
      id = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(id);
  }, [active]);

  return null;
}
