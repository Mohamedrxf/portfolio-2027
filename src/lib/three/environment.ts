import * as THREE from 'three';
import { loadHDR, loadCubeTexture } from './loaders';

export type EnvironmentPreset = 
  | 'studio'
  | 'outdoor'
  | 'night'
  | 'sunset'
  | 'overcast';

export interface EnvironmentConfig {
  preset?: EnvironmentPreset;
  hdrUrl?: string;
  cubeTextureUrls?: string[];
  background?: boolean;
}

export interface EnvironmentResult {
  environment: THREE.Texture | null;
  background: THREE.Texture | null;
  dispose: () => void;
}

const ENVIRONMENT_PRESETS: Record<EnvironmentPreset, { intensity: number; color: THREE.Color }> = {
  studio: { intensity: 1.0, color: new THREE.Color(0xffffff) },
  outdoor: { intensity: 1.2, color: new THREE.Color(0xffeedd) },
  night: { intensity: 0.3, color: new THREE.Color(0x334466) },
  sunset: { intensity: 0.8, color: new THREE.Color(0xffaa55) },
  overcast: { intensity: 0.6, color: new THREE.Color(0x8899aa) },
};

export async function createEnvironment(
  config: EnvironmentConfig = {}
): Promise<EnvironmentResult> {
  const {
    hdrUrl,
    cubeTextureUrls,
    background = true,
  } = config;

  let environment: THREE.Texture | null = null;
  let backgroundTexture: THREE.Texture | null = null;

  if (hdrUrl) {
    try {
      environment = await loadHDR(hdrUrl);
      if (background) {
        backgroundTexture = environment.clone();
      }
    } catch (error) {
      console.warn('Failed to load HDR environment:', error);
    }
  } else if (cubeTextureUrls) {
    try {
      environment = await loadCubeTexture(cubeTextureUrls);
      if (background) {
        backgroundTexture = environment.clone();
      }
    } catch (error) {
      console.warn('Failed to load cube texture environment:', error);
    }
  }

  const dispose = (): void => {
    if (environment && environment !== backgroundTexture) {
      environment.dispose();
    }
    if (backgroundTexture) {
      backgroundTexture.dispose();
    }
  };

  return {
    environment,
    background: backgroundTexture,
    dispose,
  };
}

export function createSkybox(
  urls: string[],
  scene: THREE.Scene
): THREE.CubeTexture {
  const loader = new THREE.CubeTextureLoader();
  const cubeTexture = loader.load(urls);
  scene.background = cubeTexture;
  return cubeTexture;
}

export function applyEnvironmentPreset(
  scene: THREE.Scene,
  preset: EnvironmentPreset
): void {
  const presetConfig = ENVIRONMENT_PRESETS[preset];
  
  scene.background = presetConfig.color;
  
  if (scene.fog) {
    scene.fog.color.copy(presetConfig.color);
  }
}

export function createGradientBackground(
  topColor: THREE.Color,
  bottomColor: THREE.Color,
  height: number = 32
): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 2;
  canvas.height = height;
  
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Failed to get canvas context');
  }
  
  const gradient = context.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, `#${topColor.getHexString()}`);
  gradient.addColorStop(1, `#${bottomColor.getHexString()}`);
  
  context.fillStyle = gradient;
  context.fillRect(0, 0, 2, height);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;
  
  return texture;
}

export function disposeEnvironment(
  scene: THREE.Scene
): void {
  if (scene.background !== null && scene.background instanceof THREE.Texture) {
    scene.background.dispose();
    scene.background = null;
  }
  
  if (scene.environment !== null && scene.environment instanceof THREE.Texture) {
    scene.environment.dispose();
    scene.environment = null;
  }
}
