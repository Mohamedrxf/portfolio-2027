import { useEffect } from 'react';
import * as THREE from 'three';
import {
  createAmbientLight,
  createDirectionalLight,
  createHemisphereLight,
} from '@/lib/three/lights';

interface LightingProps {
  scene: THREE.Scene;
}

export function Lighting({ scene }: LightingProps) {
  useEffect(() => {
    const ambientLight = createAmbientLight({
      color: new THREE.Color(0xffffff),
      intensity: 0.4,
    });
    scene.add(ambientLight);

    const directionalLight = createDirectionalLight({
      color: new THREE.Color(0xffffff),
      intensity: 0.8,
      position: new THREE.Vector3(5, 10, 7.5),
      castShadow: true,
      shadowMapSize: 1024,
      shadowCameraNear: 0.5,
      shadowCameraFar: 500,
      shadowCameraLeft: -10,
      shadowCameraRight: 10,
      shadowCameraTop: 10,
      shadowCameraBottom: -10,
    });
    scene.add(directionalLight);

    const hemisphereLight = createHemisphereLight({
      skyColor: new THREE.Color(0x6366f1),
      groundColor: new THREE.Color(0x1e1b4b),
      intensity: 0.5,
      position: new THREE.Vector3(0, 10, 0),
    });
    scene.add(hemisphereLight);

    return () => {
      scene.remove(ambientLight);
      scene.remove(directionalLight);
      scene.remove(hemisphereLight);
    };
  }, [scene]);

  return null;
}
