import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';

export interface OrbitControlsConfig {
  camera: THREE.Camera;
  domElement?: HTMLElement;
  enableDamping?: boolean;
  dampingFactor?: number;
  enableZoom?: boolean;
  enableRotate?: boolean;
  enablePan?: boolean;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  minDistance?: number;
  maxDistance?: number;
  minPolarAngle?: number;
  maxPolarAngle?: number;
  minAzimuthAngle?: number;
  maxAzimuthAngle?: number;
}

export interface ControlsResult {
  controls: OrbitControls;
  dispose: () => void;
}

interface OrbitControlsDefaults {
  enableDamping: boolean;
  dampingFactor: number;
  enableZoom: boolean;
  enableRotate: boolean;
  enablePan: boolean;
  autoRotate: boolean;
  autoRotateSpeed: number;
  minDistance: number;
  maxDistance: number;
  minPolarAngle: number;
  maxPolarAngle: number;
  minAzimuthAngle: number;
  maxAzimuthAngle: number;
}

const DEFAULT_ORBIT_CONFIG: OrbitControlsDefaults = {
  enableDamping: true,
  dampingFactor: 0.05,
  enableZoom: true,
  enableRotate: true,
  enablePan: true,
  autoRotate: false,
  autoRotateSpeed: 2.0,
  minDistance: 0,
  maxDistance: Infinity,
  minPolarAngle: 0,
  maxPolarAngle: Math.PI,
  minAzimuthAngle: -Infinity,
  maxAzimuthAngle: Infinity,
};

export function createOrbitControls(
  config: OrbitControlsConfig
): ControlsResult {
  const { camera, domElement, ...restConfig } = config;
  const finalConfig = { ...DEFAULT_ORBIT_CONFIG, ...restConfig };

  const controls = new OrbitControls(
    camera as THREE.PerspectiveCamera | THREE.OrthographicCamera,
    domElement || document.body
  );

  controls.enableDamping = finalConfig.enableDamping;
  controls.dampingFactor = finalConfig.dampingFactor;
  controls.enableZoom = finalConfig.enableZoom;
  controls.enableRotate = finalConfig.enableRotate;
  controls.enablePan = finalConfig.enablePan;
  controls.autoRotate = finalConfig.autoRotate;
  controls.autoRotateSpeed = finalConfig.autoRotateSpeed;
  controls.minDistance = finalConfig.minDistance;
  controls.maxDistance = finalConfig.maxDistance;
  controls.minPolarAngle = finalConfig.minPolarAngle;
  controls.maxPolarAngle = finalConfig.maxPolarAngle;
  controls.minAzimuthAngle = finalConfig.minAzimuthAngle;
  controls.maxAzimuthAngle = finalConfig.maxAzimuthAngle;

  controls.enabled = false;

  const dispose = (): void => {
    controls.dispose();
  };

  return {
    controls,
    dispose,
  };
}
