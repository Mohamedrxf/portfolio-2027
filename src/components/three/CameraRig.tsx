/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createPerspectiveCamera } from '@/lib/three/camera';
import { dampVector } from '@/lib/three/utils/math';

interface CameraRigProps {
  width: number;
  height: number;
  mousePosition: { x: number; y: number };
  onCameraReady?: (camera: THREE.PerspectiveCamera) => void;
}

export function CameraRig({ width, height, mousePosition, onCameraReady }: CameraRigProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const targetPositionRef = useRef(new THREE.Vector3(0, 0, 7.5));
  const currentPositionRef = useRef(new THREE.Vector3(0, 0, 7.5));
  const mouseRef = useRef(mousePosition);

  useEffect(() => {
    mouseRef.current = mousePosition;
  });

  useEffect(() => {
    const cameraResult = createPerspectiveCamera({
      fov: 45,
      aspect: width / height,
      near: 0.1,
      far: 100,
      position: new THREE.Vector3(0, 0, 7.5),
      lookAt: new THREE.Vector3(0, 0, 0),
    });

    cameraRef.current = cameraResult.camera as THREE.PerspectiveCamera;
    onCameraReady?.(cameraResult.camera as THREE.PerspectiveCamera);

    return () => {
      cameraResult.dispose();
    };
  }, [onCameraReady]);

  useEffect(() => {
    const camera = cameraRef.current;
    if (!camera) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }, [width, height]);

  useEffect(() => {
    const camera = cameraRef.current;
    if (!camera) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      const m = mouseRef.current;
      const parallaxStrength = 0.45;
      targetPositionRef.current.set(m.x * parallaxStrength, m.y * parallaxStrength * 0.6, 7.5);

      dampVector(
        currentPositionRef.current,
        targetPositionRef.current,
        4,
        deltaTime,
        currentPositionRef.current
      );

      camera.position.copy(currentPositionRef.current);
      camera.lookAt(0, 0, 0);

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return null;
}
