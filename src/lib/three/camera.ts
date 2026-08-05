import * as THREE from 'three';

export interface PerspectiveCameraConfig {
  fov?: number;
  aspect?: number;
  near?: number;
  far?: number;
  position?: THREE.Vector3;
  lookAt?: THREE.Vector3;
}

export interface OrthographicCameraConfig {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  near?: number;
  far?: number;
  position?: THREE.Vector3;
  lookAt?: THREE.Vector3;
}

export interface CameraResult {
  camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
  resize: (width: number, height: number) => void;
  setPosition: (position: THREE.Vector3) => void;
  setLookAt: (target: THREE.Vector3) => void;
  dispose: () => void;
}

const DEFAULT_PERSPECTIVE_CONFIG: Required<PerspectiveCameraConfig> = {
  fov: 75,
  aspect: 1,
  near: 0.1,
  far: 1000,
  position: new THREE.Vector3(0, 0, 5),
  lookAt: new THREE.Vector3(0, 0, 0),
};

const DEFAULT_ORTHOGRAPHIC_CONFIG: Required<OrthographicCameraConfig> = {
  left: -5,
  right: 5,
  top: 5,
  bottom: -5,
  near: 0.1,
  far: 1000,
  position: new THREE.Vector3(0, 0, 5),
  lookAt: new THREE.Vector3(0, 0, 0),
};

export function createPerspectiveCamera(
  config: PerspectiveCameraConfig = {}
): CameraResult {
  const finalConfig = { ...DEFAULT_PERSPECTIVE_CONFIG, ...config };

  const camera = new THREE.PerspectiveCamera(
    finalConfig.fov,
    finalConfig.aspect,
    finalConfig.near,
    finalConfig.far
  );

  camera.position.copy(finalConfig.position);
  camera.lookAt(finalConfig.lookAt);

  const resize = (width: number, height: number): void => {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  const setPosition = (position: THREE.Vector3): void => {
    camera.position.copy(position);
  };

  const setLookAt = (target: THREE.Vector3): void => {
    camera.lookAt(target);
  };

  const dispose = (): void => {
    camera.clear();
  };

  return {
    camera,
    resize,
    setPosition,
    setLookAt,
    dispose,
  };
}

export function createOrthographicCamera(
  config: OrthographicCameraConfig = {}
): CameraResult {
  const finalConfig = { ...DEFAULT_ORTHOGRAPHIC_CONFIG, ...config };

  const camera = new THREE.OrthographicCamera(
    finalConfig.left,
    finalConfig.right,
    finalConfig.top,
    finalConfig.bottom,
    finalConfig.near,
    finalConfig.far
  );

  camera.position.copy(finalConfig.position);
  camera.lookAt(finalConfig.lookAt);

  const resize = (width: number, height: number): void => {
    const aspect = width / height;
    const frustumSize = 10;
    
    camera.left = -frustumSize * aspect / 2;
    camera.right = frustumSize * aspect / 2;
    camera.top = frustumSize / 2;
    camera.bottom = -frustumSize / 2;
    
    camera.updateProjectionMatrix();
  };

  const setPosition = (position: THREE.Vector3): void => {
    camera.position.copy(position);
  };

  const setLookAt = (target: THREE.Vector3): void => {
    camera.lookAt(target);
  };

  const dispose = (): void => {
    camera.clear();
  };

  return {
    camera,
    resize,
    setPosition,
    setLookAt,
    dispose,
  };
}

export function calculateResponsiveFOV(
  baseFOV: number,
  screenWidth: number,
  baseWidth: number = 1920
): number {
  const scaleFactor = Math.min(screenWidth / baseWidth, 1.5);
  return baseFOV * scaleFactor;
}
