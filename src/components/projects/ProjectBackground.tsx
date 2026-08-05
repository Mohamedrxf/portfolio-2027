import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThree, useAnimationFrame } from '@/lib/three';
import { randomRange } from '@/lib/three/utils/math';
import { disposeObject3D } from '@/lib/three/utils/cleanup';
import { useMediaQuery } from '@/hooks';

interface ProjectBackgroundProps {
  className?: string;
}

export const ProjectBackground = ({ className = '' }: ProjectBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const { renderer, scene, camera, resize } = useThree({
    canvas: canvasRef.current || undefined,
    enableControls: false,
    cameraType: 'perspective',
    rendererConfig: {
      antialias: true,
      alpha: true,
      powerPreference: 'low-power',
    },
    sceneConfig: {
      background: null,
    },
    cameraConfig: {
      position: new THREE.Vector3(0, 0, 20),
      fov: 75,
      near: 0.1,
      far: 100,
    },
  });

  const shapesRef = useRef<any[]>([]);

  useEffect(() => {
    if (!scene || !camera || !isDesktop || prefersReducedMotion) return;

    // Create subtle floating shapes
    const geometries = [
      new THREE.IcosahedronGeometry(0.5, 0),
      new THREE.OctahedronGeometry(0.4, 0),
      new THREE.TetrahedronGeometry(0.3, 0),
    ];

    const material = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.03,
      wireframe: true,
    });

    const shapes: any[] = [];

    for (let i = 0; i < 8; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const mesh = new THREE.Mesh(geometry, material.clone());
      
      mesh.position.x = randomRange(-15, 15);
      mesh.position.y = randomRange(-10, 10);
      mesh.position.z = randomRange(-5, 5);
      
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      
      const scale = randomRange(0.5, 2);
      mesh.scale.setScalar(scale);

      // Store animation data
      mesh.userData = {
        rotationSpeed: {
          x: randomRange(-0.01, 0.01),
          y: randomRange(-0.01, 0.01),
        },
        floatSpeed: randomRange(0.2, 0.5),
        floatOffset: Math.random() * Math.PI * 2,
        originalY: mesh.position.y,
      };

      scene.add(mesh);
      shapes.push(mesh);
    }

    shapesRef.current = shapes;

    return () => {
      shapes.forEach((shape) => {
        scene.remove(shape);
        disposeObject3D(shape);
      });
      shapesRef.current = [];
    };
  }, [scene, camera, isDesktop, prefersReducedMotion]);

  useAnimationFrame({
    callback: () => {
      if (!scene || !camera || !isDesktop || prefersReducedMotion) return;

      const time = performance.now() / 1000;

      shapesRef.current.forEach((shape) => {
        // Rotate
        shape.rotation.x += shape.userData.rotationSpeed.x;
        shape.rotation.y += shape.userData.rotationSpeed.y;

        // Float
        shape.position.y = shape.userData.originalY + 
          Math.sin(time * shape.userData.floatSpeed + shape.userData.floatOffset) * 0.5;
      });

      renderer?.render(scene, camera);
    },
    enabled: isDesktop && !prefersReducedMotion,
  });

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const width = canvasRef.current?.clientWidth || 0;
      const height = canvasRef.current?.clientHeight || 0;
      resize(width, height);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [resize]);

  if (!isDesktop || prefersReducedMotion) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 -z-10 pointer-events-none ${className}`}
      style={{ touchAction: 'none' }}
    />
  );
};