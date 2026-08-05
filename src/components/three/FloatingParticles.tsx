import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { disposeGeometry, disposeMaterial } from '@/lib/three/utils/cleanup';
import { randomRange } from '@/lib/three/utils/math';

interface FloatingParticlesProps {
  scene: THREE.Scene;
  enabled: boolean;
  particleCount?: number;
}

export function FloatingParticles({ 
  scene, 
  enabled, 
  particleCount = 200 
}: FloatingParticlesProps) {
  const particlesRef = useRef<THREE.Points | null>(null);
  const animationRef = useRef<{ time: number }>({ time: 0 });
  const particleCountRef = useRef(particleCount);

  useEffect(() => {
    particleCountRef.current = particleCount;
  }, [particleCount]);

  useEffect(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);
    const amplitudes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = randomRange(-4, 4);
      positions[i * 3 + 1] = randomRange(-3, 3);
      positions[i * 3 + 2] = randomRange(-2, 2);
      
      sizes[i] = randomRange(0.02, 0.08);
      speeds[i] = randomRange(0.2, 0.5);
      amplitudes[i] = randomRange(0.1, 0.3);
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.userData = { speeds, amplitudes, originalY: positions.slice() };

    const material = new THREE.PointsMaterial({
      color: 0x818cf8,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    return () => {
      scene.remove(particles);
      disposeGeometry(geometry);
      disposeMaterial(material);
    };
  }, [scene, particleCount]);

  useEffect(() => {
    if (!enabled || !particlesRef.current) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      animationRef.current.time += deltaTime;

      const particles = particlesRef.current;
      if (!particles) return;
      
      const geometry = particles.geometry;
      const positions = geometry.attributes.position.array as Float32Array;
      const speeds = geometry.userData.speeds as Float32Array;
      const amplitudes = geometry.userData.amplitudes as Float32Array;
      const originalY = geometry.userData.originalY as Float32Array;
      const count = particleCountRef.current;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3 + 1] = originalY[i3 + 1] + 
          Math.sin(animationRef.current.time * speeds[i]) * amplitudes[i];
      }

      geometry.attributes.position.needsUpdate = true;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled]);

  return null;
}
