import { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { disposeGeometry, disposeMaterial } from '@/lib/three/utils/cleanup';
import { NetworkTopology } from './NetworkTopology';

interface PortraitEnvironmentProps {
  scene: THREE.Scene;
  portraitSrc?: string;
  enabled?: boolean;
  mousePosition?: { x: number; y: number };
  parallaxStrength?: number;
}

interface NetworkNode {
  id: string;
  type: 'pc' | 'switch' | 'router' | 'server' | 'firewall' | 'cloud' | 'database';
  position: [number, number, number];
  label: string;
  active?: boolean;
}
interface NetworkConn {
  from: string;
  to: string;
  packetSpeed?: number;
}

export function PortraitEnvironment({
  scene,
  portraitSrc,
  enabled = true,
  mousePosition = { x: 0, y: 0 },
  parallaxStrength = 0.35,
}: PortraitEnvironmentProps) {
  const planeRef = useRef<THREE.Mesh | null>(null);
  const ringRef = useRef<THREE.Mesh | null>(null);
  const glowRef = useRef<THREE.Mesh | null>(null);

  const texture = useMemo(() => {
    if (!portraitSrc) return null;
    const loader = new THREE.TextureLoader();
    const tex = loader.load(portraitSrc);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [portraitSrc]);

  const nodes: NetworkNode[] = useMemo(
    () => [
      { id: 'pc', type: 'pc', position: [-2.6, 0.7, 1.4], label: 'PC', active: true },
      { id: 'switch', type: 'switch', position: [-1.2, 0.3, 2.0], label: 'SWITCH', active: true },
      { id: 'router', type: 'router', position: [0.1, -0.2, 2.4], label: 'ROUTER', active: true },
      {
        id: 'firewall',
        type: 'firewall',
        position: [1.5, -0.6, 1.8],
        label: 'FIREWALL',
        active: true,
      },
      { id: 'server', type: 'server', position: [2.7, -1.0, 0.9], label: 'SERVER', active: true },
      { id: 'cloud', type: 'cloud', position: [0.5, 1.5, 0.3], label: 'CLOUD', active: true },
      { id: 'db', type: 'database', position: [2.0, -0.1, 0.1], label: 'DB', active: true },
    ],
    []
  );

  const connections: NetworkConn[] = useMemo(
    () => [
      { from: 'pc', to: 'switch', packetSpeed: 1.0 },
      { from: 'switch', to: 'router', packetSpeed: 1.1 },
      { from: 'router', to: 'firewall', packetSpeed: 1.2 },
      { from: 'firewall', to: 'server', packetSpeed: 1.3 },
      { from: 'firewall', to: 'cloud', packetSpeed: 0.9 },
      { from: 'router', to: 'db', packetSpeed: 0.8 },
    ],
    []
  );

  useEffect(() => {
    if (!scene || !enabled) return;

    // Portrait plane
    const planeGeo = new THREE.PlaneGeometry(3.2, 4.2, 1, 1);
    const planeMat = new THREE.MeshStandardMaterial({
      color: 0x1a1f2e,
      metalness: 0.2,
      roughness: 0.55,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.06,
      side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.position.set(0, 0.2, 0);
    plane.castShadow = true;
    planeRef.current = plane;
    scene.add(plane);

    // Backdrop disc behind portrait
    const disc = new THREE.Mesh(
      new THREE.CircleGeometry(2.1, 48),
      new THREE.MeshBasicMaterial({
        color: 0x0a0e14,
        transparent: true,
        opacity: 0.9,
        side: THREE.BackSide,
      })
    );
    disc.position.set(0, 0.2, -0.06);
    scene.add(disc);

    // Rim ring
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.05, 0.025, 16, 64),
      new THREE.MeshStandardMaterial({
        color: 0x22d3ee,
        emissive: 0x22d3ee,
        emissiveIntensity: 0.5,
        metalness: 1,
        roughness: 0.2,
      })
    );
    ring.rotation.set(Math.PI / 2, 0, 0);
    ring.position.set(0, 0.2, -0.03);
    ringRef.current = ring;
    scene.add(ring);

    // Back glow
    const glow = new THREE.Mesh(
      new THREE.CircleGeometry(1.95, 32),
      new THREE.MeshBasicMaterial({
        color: 0x0ea5e9,
        transparent: true,
        opacity: 0.16,
        side: THREE.BackSide,
      })
    );
    glow.position.set(0, 0.2, -0.09);
    glowRef.current = glow;
    scene.add(glow);

    return () => {
      scene.remove(plane);
      disposeGeometry(planeGeo);
      disposeMaterial(planeMat);
      scene.remove(disc);
      disposeGeometry(disc.geometry);
      disposeMaterial(disc.material as any);
      scene.remove(ring);
      disposeGeometry(ring.geometry);
      disposeMaterial(ring.material as any);
      scene.remove(glow);
      disposeGeometry(glow.geometry);
      disposeMaterial(glow.material as any);
      planeRef.current = null;
      ringRef.current = null;
      glowRef.current = null;
    };
  }, [scene, enabled]);

  useEffect(() => {
    if (planeRef.current && texture) {
      const mat = planeRef.current.material as THREE.MeshStandardMaterial;
      mat.map = texture;
      mat.emissiveMap = null;
      mat.emissive.setHex(0x0ea5e9);
      mat.emissiveIntensity = 0.05;
      mat.needsUpdate = true;
    }
  }, [texture]);

  useEffect(() => {
    if (!planeRef.current || !enabled) return;
    let id: number;
    const tick = () => {
      if (!planeRef.current) return;
      planeRef.current.rotation.y = mousePosition.x * parallaxStrength;
      planeRef.current.rotation.x = -mousePosition.y * parallaxStrength * 0.6;
      id = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(id);
  }, [enabled, mousePosition, parallaxStrength]);

  return (
    <NetworkTopology
      scene={scene}
      nodes={nodes}
      connections={connections}
      enabled={enabled}
      rotationSpeed={0.04}
    />
  );
}
