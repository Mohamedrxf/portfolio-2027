import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { disposeObject3D, disposeGeometry, disposeMaterial } from '@/lib/three/utils/cleanup';
import { randomRange, degreesToRadians } from '@/lib/three/utils/math';

interface FloatingGeometryProps {
  scene: THREE.Scene;
  enabled: boolean;
}

export function FloatingGeometry({ scene, enabled }: FloatingGeometryProps) {
  const objectsRef = useRef<THREE.Object3D[]>([]);
  const animationRef = useRef<{ time: number }>({ time: 0 });

  useEffect(() => {
    const objects: THREE.Object3D[] = [];

    const material = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      metalness: 0.3,
      roughness: 0.4,
    });

    const accentMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      metalness: 0.2,
      roughness: 0.5,
    });

    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xa78bfa,
      metalness: 0.4,
      roughness: 0.3,
      transparent: true,
      opacity: 0.8,
    });

    const icosahedronGeometry = new THREE.IcosahedronGeometry(1.2, 0);
    const icosahedron = new THREE.Mesh(icosahedronGeometry, material);
    icosahedron.position.set(2, 0.5, 0);
    icosahedron.userData = {
      originalY: 0.5,
      speed: 0.5,
      amplitude: 0.3,
      rotationSpeed: { x: 0.002, y: 0.003 },
    };
    scene.add(icosahedron);
    objects.push(icosahedron);

    const torusGeometry = new THREE.TorusGeometry(0.8, 0.25, 16, 32);
    const torus = new THREE.Mesh(torusGeometry, accentMaterial);
    torus.position.set(-1.5, 1.2, 1);
    torus.rotation.set(degreesToRadians(45), degreesToRadians(30), 0);
    torus.userData = {
      originalY: 1.2,
      speed: 0.4,
      amplitude: 0.25,
      rotationSpeed: { x: 0.003, y: 0.002 },
    };
    scene.add(torus);
    objects.push(torus);

    const sphereGeometry = new THREE.SphereGeometry(0.6, 32, 32);
    const sphere = new THREE.Mesh(sphereGeometry, material);
    sphere.position.set(0.8, -0.8, -1);
    sphere.userData = {
      originalY: -0.8,
      speed: 0.6,
      amplitude: 0.2,
      rotationSpeed: { x: 0.001, y: 0.002 },
    };
    scene.add(sphere);
    objects.push(sphere);

    const ringGeometry = new THREE.TorusGeometry(1.5, 0.05, 16, 64);
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.set(-0.5, -0.5, 0.5);
    ring.rotation.set(degreesToRadians(60), 0, degreesToRadians(30));
    ring.userData = {
      originalY: -0.5,
      speed: 0.3,
      amplitude: 0.15,
      rotationSpeed: { x: 0.001, y: 0.004 },
    };
    scene.add(ring);
    objects.push(ring);

    const cubeGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    for (let i = 0; i < 6; i++) {
      const cube = new THREE.Mesh(cubeGeometry, accentMaterial);
      cube.position.set(
        randomRange(-2, 2),
        randomRange(-1.5, 1.5),
        randomRange(-1, 1)
      );
      cube.rotation.set(
        randomRange(0, Math.PI),
        randomRange(0, Math.PI),
        randomRange(0, Math.PI)
      );
      cube.userData = {
        originalY: cube.position.y,
        speed: randomRange(0.2, 0.5),
        amplitude: randomRange(0.1, 0.2),
        rotationSpeed: {
          x: randomRange(0.001, 0.003),
          y: randomRange(0.001, 0.003),
        },
      };
      scene.add(cube);
      objects.push(cube);
    }

    objectsRef.current = objects;

    return () => {
      objects.forEach((obj) => {
        scene.remove(obj);
        disposeObject3D(obj);
      });
      disposeGeometry(icosahedronGeometry);
      disposeGeometry(torusGeometry);
      disposeGeometry(sphereGeometry);
      disposeGeometry(ringGeometry);
      disposeGeometry(cubeGeometry);
      disposeMaterial(material);
      disposeMaterial(accentMaterial);
      disposeMaterial(ringMaterial);
    };
  }, [scene]);

  useEffect(() => {
    if (!enabled) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      animationRef.current.time += deltaTime;

      objectsRef.current.forEach((obj) => {
        const userData = obj.userData as {
          originalY: number;
          speed: number;
          amplitude: number;
          rotationSpeed: { x: number; y: number };
        };

        obj.position.y = userData.originalY + 
          Math.sin(animationRef.current.time * userData.speed) * userData.amplitude;
        
        obj.rotation.x += userData.rotationSpeed.x;
        obj.rotation.y += userData.rotationSpeed.y;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled]);

  return null;
}
