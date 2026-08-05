import * as THREE from 'three';

export interface RendererConfig {
  canvas?: HTMLCanvasElement;
  antialias?: boolean;
  alpha?: boolean;
  pixelRatio?: number;
  maxPixelRatio?: number;
  powerPreference?: 'default' | 'high-performance' | 'low-power';
  shadowMapEnabled?: boolean;
  shadowMapType?: THREE.ShadowMapType;
  outputColorSpace?: THREE.ColorSpace;
  toneMapping?: THREE.ToneMapping;
  toneMappingExposure?: number;
}

export interface RendererResult {
  renderer: THREE.WebGLRenderer;
  resize: (width: number, height: number) => void;
  dispose: () => void;
}

const DEFAULT_CONFIG: Omit<Required<RendererConfig>, 'canvas'> = {
  antialias: true,
  alpha: true,
  pixelRatio: window.devicePixelRatio,
  maxPixelRatio: 2,
  powerPreference: 'high-performance',
  shadowMapEnabled: true,
  shadowMapType: THREE.PCFSoftShadowMap,
  outputColorSpace: THREE.SRGBColorSpace,
  toneMapping: THREE.ACESFilmicToneMapping,
  toneMappingExposure: 1,
};

export function createRenderer(config: RendererConfig = {}): RendererResult {
  const { canvas, ...restConfig } = config;
  const finalConfig = { ...DEFAULT_CONFIG, ...restConfig };

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: finalConfig.antialias,
    alpha: finalConfig.alpha,
    powerPreference: finalConfig.powerPreference,
  });

  const clampedPixelRatio = Math.min(
    finalConfig.pixelRatio,
    finalConfig.maxPixelRatio
  );
  renderer.setPixelRatio(clampedPixelRatio);

  renderer.outputColorSpace = finalConfig.outputColorSpace;
  renderer.toneMapping = finalConfig.toneMapping;
  renderer.toneMappingExposure = finalConfig.toneMappingExposure;

  if (finalConfig.shadowMapEnabled) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = finalConfig.shadowMapType;
  }

  renderer.setSize(0, 0);

  const resize = (width: number, height: number): void => {
    renderer.setSize(width, height);
  };

  const dispose = (): void => {
    renderer.dispose();
    renderer.forceContextLoss();
  };

  return {
    renderer,
    resize,
    dispose,
  };
}
