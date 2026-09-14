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
  const discRef = useRef<THREE.Mesh | null>(null);

  const texture = useMemo(() => {
    if (!portraitSrc) return null;
    const loader = new THREE.TextureLoader();
    const tex = loader.load(portraitSrc);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.generateMipmaps = true;
    return tex;
  }, [portraitSrc]);

  // Cinematic network topology — realistic hardware proportions in depth
  const nodes: NetworkNode[] = useMemo(
    () => [
      { id: 'pc', type: 'pc', position: [-3.4, 1.1, 1.6], label: 'PC', active: true },
      { id: 'switch', type: 'switch', position: [-1.7, 0.5, 2.4], label: 'SWITCH', active: true },
      { id: 'router', type: 'router', position: [0.0, -0.1, 2.8], label: 'ROUTER', active: true },
      {
        id: 'firewall',
        type: 'firewall',
        position: [1.7, -0.7, 2.1],
        label: 'FIREWALL',
        active: true,
      },
      { id: 'server', type: 'server', position: [3.2, -1.2, 1.1], label: 'SERVER', active: true },
      { id: 'cloud', type: 'cloud', position: [0.6, 1.7, 0.2], label: 'CLOUD', active: true },
      { id: 'db', type: 'database', position: [2.2, -0.2, 0.2], label: 'DB', active: true },
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

    // Portrait plane — embedded cinematic object, no card UI
    const planeGeo = new THREE.PlaneGeometry(3.4, 4.4, 1, 1);
    const planeMat = new THREE.MeshStandardMaterial({
      color: 0x141922,
      metalness: 0.25,
      roughness: 0.5,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.05,
      side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.position.set(0, 0.1, 0);
    plane.castShadow = true;
    plane.receiveShadow = true;
    planeRef.current = plane;
    scene.add(plane);

    // Backdrop disc — soft atmospheric halo behind portrait
    const disc = new THREE.Mesh(
      new THREE.CircleGeometry(2.35, 64),
      new THREE.MeshBasicMaterial({
        color: 0x06080c,
        transparent: true,
        opacity: 0.92,
        side: THREE.BackSide,
      })
    );
    disc.position.set(0, 0.1, -0.08);
    discRef.current = disc;
    scene.add(disc);

    // Soft rim ring — thin metallic bezel
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.22, 0.012, 16, 96),
      new THREE.MeshStandardMaterial({
        color: 0x9fb2c8,
        emissive: 0x22d3ee,
        emissiveIntensity: 0.35,
        metalness: 1,
        roughness: 0.18,
      })
    );
    ring.rotation.set(Math.PI / 2, 0, 0);
    ring.position.set(0, 0.1, -0.04);
    ringRef.current = ring;
    scene.add(ring);

    // Back glow — subtle cyan/violet wash
    const glow = new THREE.Mesh(
      new THREE.CircleGeometry(2.1, 32),
      new THREE.MeshBasicMaterial({
        color: 0x0ea5e9,
        transparent: true,
        opacity: 0.14,
        side: THREE.BackSide,
      })
    );
    glow.position.set(0, 0.1, -0.12);
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
      discRef.current = null;
    };
  }, [scene, enabled]);

  useEffect(() => {
    if (planeRef.current && texture) {
      const mat = planeRef.current.material as THREE.MeshStandardMaterial;
      mat.map = texture;
      mat.emissiveMap = null;
      mat.emissive.setHex(0x0ea5e9);
      mat.emissiveIntensity = 0.04;
      mat.needsUpdate = true;
    }
  }, [texture]);

  // Subtle parallax on the portrait plane
  useEffect(() => {
    if (!planeRef.current || !enabled) return;
    let id: number;
    const tick = () => {
      if (!planeRef.current) return;
      planeRef.current.rotation.y = mousePosition.x * parallaxStrength;
      planeRef.current.rotation.x = -mousePosition.y * parallaxStrength * 0.55;
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
      rotationSpeed={0.015}
    />
  );
}
