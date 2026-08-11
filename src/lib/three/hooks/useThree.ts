/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/refs */
import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';
import { createRenderer, type RendererResult } from '../renderer';
import { createScene, type SceneResult } from '../scene';
import { createPerspectiveCamera, createOrthographicCamera, type CameraResult } from '../camera';
import { createOrbitControls, type ControlsResult } from '../controls';

export interface UseThreeConfig {
  canvas?: HTMLCanvasElement | React.RefObject<HTMLCanvasElement>;
  enableControls?: boolean;
  cameraType?: 'perspective' | 'orthographic';
  rendererConfig?: Parameters<typeof createRenderer>[0];
  sceneConfig?: Parameters<typeof createScene>[0];
  cameraConfig?: Parameters<typeof createPerspectiveCamera>[0] | Parameters<typeof createOrthographicCamera>[0];
  controlsConfig?: Parameters<typeof createOrbitControls>[0];
}

export interface UseThreeResult {
  renderer: THREE.WebGLRenderer | null;
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | THREE.OrthographicCamera | null;
  controls: OrbitControls | null;
  resize: (width: number, height: number) => void;
}

export function useThree(config: UseThreeConfig = {}): UseThreeResult {
  const {
    canvas: canvasInput,
    enableControls = false,
    cameraType = 'perspective',
    rendererConfig,
    sceneConfig,
    cameraConfig,
    controlsConfig,
  } = config;

  const rendererRef = useRef<RendererResult | null>(null);
  const sceneRef = useRef<SceneResult | null>(null);
  const cameraRef = useRef<CameraResult | null>(null);
  const controlsRef = useRef<ControlsResult | null>(null);

  // Handle canvas ref or direct canvas element
  const isCanvasRef = canvasInput && 'current' in canvasInput;
  const canvasElement = isCanvasRef ? (canvasInput as React.RefObject<HTMLCanvasElement>).current : canvasInput as HTMLCanvasElement | undefined;

  useEffect(() => {
    if (!canvasElement) return;

    const rendererResult = createRenderer({ ...rendererConfig, canvas: canvasElement });
    rendererRef.current = rendererResult;

    const sceneResult = createScene(sceneConfig);
    sceneRef.current = sceneResult;

    const cameraResult = cameraType === 'perspective'
      ? createPerspectiveCamera(cameraConfig as Parameters<typeof createPerspectiveCamera>[0])
      : createOrthographicCamera(cameraConfig as Parameters<typeof createOrthographicCamera>[0]);
    cameraRef.current = cameraResult;

    let controlsResult: ControlsResult | null = null;
    if (enableControls && controlsConfig) {
      controlsResult = createOrbitControls({
        ...controlsConfig,
        camera: cameraResult.camera,
        domElement: canvasElement,
      });
      controlsRef.current = controlsResult;
    }

    return () => {
      rendererResult.dispose();
      sceneResult.dispose();
      cameraResult.dispose();
      controlsResult?.dispose();

      rendererRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
      controlsRef.current = null;
    };
  }, [canvasElement, enableControls, cameraType, rendererConfig, sceneConfig, cameraConfig, controlsConfig]);

  const resize = useCallback((width: number, height: number): void => {
    rendererRef.current?.resize(width, height);
    cameraRef.current?.resize(width, height);
  }, []);

  return {
    renderer: rendererRef.current?.renderer ?? null,
    scene: sceneRef.current?.scene ?? null,
    camera: cameraRef.current?.camera ?? null,
    controls: controlsRef.current?.controls ?? null,
    resize,
  };
}
