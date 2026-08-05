import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { createRenderer, createScene } from '@/lib/three';
import { disposeScene, disposeRenderer } from '@/lib/three/utils/cleanup';
import { FloatingGeometry } from './FloatingGeometry';
import { FloatingParticles } from './FloatingParticles';
import { Lighting } from './Lighting';
import { CameraRig } from './CameraRig';
import { MouseParallax } from './MouseParallax';
import { useMediaQuery } from '@/hooks';

interface HeroSceneProps {
  className?: string;
}

export function HeroScene({ className = '' }: HeroSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);
  const rendererResultRef = useRef<ReturnType<typeof createRenderer> | null>(null);
  
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const isTabVisible = useRef(true);

  const getParticleCount = useCallback(() => {
    if (isMobile) return 100;
    if (isTablet) return 150;
    return 200;
  }, [isMobile, isTablet]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      isTabVisible.current = !document.hidden;
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rendererResult = createRenderer({
      canvas,
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
    });

    const sceneResult = createScene({
      background: null,
      fog: null,
      environment: null,
      helpers: false,
    });
    
    sceneResult.scene.background = null;

    rendererResultRef.current = rendererResult;
    setRenderer(rendererResult.renderer);
    setScene(sceneResult.scene);

    const container = canvas.parentElement;
    if (container) {
      const { clientWidth, clientHeight } = container;
      setDimensions({ width: clientWidth, height: clientHeight });
      rendererResult.resize(clientWidth, clientHeight);
    }

    return () => {
      rendererResult.dispose();
      sceneResult.dispose();
      disposeRenderer(rendererResult.renderer);
      disposeScene(sceneResult.scene);
      rendererResultRef.current = null;
      setRenderer(null);
      setScene(null);
    };
  }, []);

  useEffect(() => {
    const container = canvasRef.current?.parentElement;
    if (!container) return;

    const handleResize = () => {
      const { clientWidth, clientHeight } = container;
      setDimensions({ width: clientWidth, height: clientHeight });
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (rendererResultRef.current && dimensions.width > 0 && dimensions.height > 0) {
      rendererResultRef.current.resize(dimensions.width, dimensions.height);
    }
  }, [dimensions]);

  useEffect(() => {
    if (!scene || !camera || !renderer) return;

    let animationFrameId: number;

    const render = () => {
      if (isTabVisible.current) {
        renderer.render(scene, camera);
      }
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [scene, camera, renderer]);

  const handleCameraReady = useCallback((cam: THREE.PerspectiveCamera) => {
    setCamera(cam);
  }, []);

  const animationEnabled = !prefersReducedMotion;

  return (
    <div className={`relative w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        aria-hidden="true"
      />
      {scene && (
        <>
          <Lighting scene={scene} />
          <FloatingGeometry scene={scene} enabled={animationEnabled} />
          <FloatingParticles 
            scene={scene} 
            enabled={animationEnabled}
            particleCount={getParticleCount()}
          />
          <CameraRig
            width={dimensions.width}
            height={dimensions.height}
            mousePosition={mousePosition}
            onCameraReady={handleCameraReady}
          />
          <MouseParallax
            enabled={animationEnabled}
            onPositionChange={setMousePosition}
          />
        </>
      )}
    </div>
  );
}
