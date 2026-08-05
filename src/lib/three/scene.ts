import * as THREE from 'three';

export interface SceneConfig {
  background?: THREE.Color | THREE.Texture | null;
  fog?: {
    color: THREE.Color;
    near: number;
    far: number;
  } | null;
  environment?: THREE.Texture | null;
  helpers?: boolean;
}

export interface SceneResult {
  scene: THREE.Scene;
  setBackground: (background: THREE.Color | THREE.Texture | null) => void;
  setFog: (fog: { color: THREE.Color; near: number; far: number } | null) => void;
  setEnvironment: (environment: THREE.Texture | null) => void;
  dispose: () => void;
}

const DEFAULT_CONFIG: Required<SceneConfig> = {
  background: null,
  fog: null,
  environment: null,
  helpers: false,
};

export function createScene(config: SceneConfig = {}): SceneResult {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  const scene = new THREE.Scene();

  if (finalConfig.background !== null) {
    scene.background = finalConfig.background;
  }

  if (finalConfig.fog !== null) {
    scene.fog = new THREE.Fog(
      finalConfig.fog.color,
      finalConfig.fog.near,
      finalConfig.fog.far
    );
  }

  if (finalConfig.environment !== null) {
    scene.environment = finalConfig.environment;
  }

  const helpers: THREE.Object3D[] = [];

  if (finalConfig.helpers) {
    const gridHelper = new THREE.GridHelper(10, 10);
    helpers.push(gridHelper);
    scene.add(gridHelper);

    const axesHelper = new THREE.AxesHelper(5);
    helpers.push(axesHelper);
    scene.add(axesHelper);
  }

  const setBackground = (background: THREE.Color | THREE.Texture | null): void => {
    scene.background = background;
  };

  const setFog = (fog: { color: THREE.Color; near: number; far: number } | null): void => {
    scene.fog = fog
      ? new THREE.Fog(fog.color, fog.near, fog.far)
      : null;
  };

  const setEnvironment = (environment: THREE.Texture | null): void => {
    scene.environment = environment;
  };

  const dispose = (): void => {
    helpers.forEach((helper) => {
      scene.remove(helper);
      if (helper instanceof THREE.GridHelper || helper instanceof THREE.AxesHelper) {
        helper.dispose();
      }
    });

    scene.clear();
  };

  return {
    scene,
    setBackground,
    setFog,
    setEnvironment,
    dispose,
  };
}
