import { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { disposeGeometry, disposeMaterial } from '@/lib/three/utils/cleanup';

interface NetworkCableProps {
  parent: THREE.Group;
  start: [number, number, number];
  end: [number, number, number];
  active?: boolean;
  packetSpeed?: number;
}

export function NetworkCable({
  parent,
  start,
  end,
  active = true,
  packetSpeed = 1.2,
}: NetworkCableProps) {
  const lineRef = useRef<THREE.Line | null>(null);
  const packetRef = useRef<THREE.Mesh | null>(null);

  const { curve, positions } = useMemo(() => {
    const s = new THREE.Vector3(...start);
    const e = new THREE.Vector3(...end);
    const mid = new THREE.Vector3().addVectors(s, e).multiplyScalar(0.5);
    mid.y += (e.y - s.y) * 0.15;
    const curve = new THREE.QuadraticBezierCurve3(s, mid, e);
    const positions = new Float32Array(32 * 3);
    const pts = curve.getPoints(31);
    for (let i = 0; i < pts.length; i++) {
      positions[i * 3] = pts[i].x;
      positions[i * 3 + 1] = pts[i].y;
      positions[i * 3 + 2] = pts[i].z;
    }
    return { curve, positions };
  }, [start, end]);

  useEffect(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3));
    geometry.computeBoundingSphere();

    const mat = new THREE.LineBasicMaterial({
      color: 0x2a3340,
      transparent: true,
      opacity: active ? 0.55 : 0.12,
    });
    const line = new THREE.Line(geometry, mat);
    lineRef.current = line;
    parent.add(line);

    const packetGeo = new THREE.SphereGeometry(0.07, 10, 10);
    const packetMat = new THREE.MeshBasicMaterial({
      color: 0x67e8f9,
      transparent: true,
      opacity: 0.95,
    });
    const packet = new THREE.Mesh(packetGeo, packetMat);
    packetRef.current = packet;
    parent.add(packet);

    return () => {
      parent.remove(line);
      parent.remove(packet);
      disposeGeometry(geometry);
      disposeMaterial(mat);
      disposeGeometry(packetGeo);
      disposeMaterial(packetMat);
      lineRef.current = null;
      packetRef.current = null;
    };
  }, [parent, positions, active]);

  useEffect(() => {
    if (!packetRef.current || !active) return;
    let id: number;
    let t = 0;
    const tick = () => {
      t = (t + 0.003 * packetSpeed) % 1;
      const p = curve.getPoint(t);
      packetRef.current?.position.copy(p);
      packetRef.current?.scale.setScalar(0.5 + Math.sin(t * Math.PI * 2) * 0.15 + 0.6);
      id = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(id);
  }, [active, curve, packetSpeed]);

  return null;
}
