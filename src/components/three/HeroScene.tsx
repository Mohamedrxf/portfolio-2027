import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { createRenderer, createScene } from '@/lib/three';
import { disposeScene } from '@/lib/three/utils/cleanup';
import { getRuntimeConfig } from '@/lib/config/runtime';
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
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const rendererResultRef = useRef<ReturnType<typeof createRenderer> | null>(null);
  const isMountedRef = useRef(true);
  const initializationRef = useRef(false);
  
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
    // Prevent double initialization in React StrictMode
    if (initializationRef.current) {
      return;
    }
    initializationRef.current = true;

    const canvas = canvasRef.current;
    if (!canvas) {
      console.warn('Canvas element not found');
      setError('Canvas element not found');
      return;
    }

    // Check WebGL support
    const runtimeConfig = getRuntimeConfig();
    if (!runtimeConfig.supports.webGL) {
      console.error('WebGL is not supported');
      setError('WebGL is not supported in this browser');
      return;
    }

    try {
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
      setIsInitialized(true);

      const container = canvas.parentElement;
      if (container) {
        const { clientWidth, clientHeight } = container;
        setDimensions({ width: clientWidth, height: clientHeight });
        rendererResult.resize(clientWidth, clientHeight);
      }
    } catch (err) {
      console.error('Failed to initialize Three.js renderer:', err);
      setError(err instanceof Error ? err.message : 'Failed to initialize renderer');
    }

    return () => {
      isMountedRef.current = false;
      
      // Clean up renderer - use the built-in dispose which includes context loss
      if (rendererResultRef.current) {
        try {
          rendererResultRef.current.dispose();
        } catch (err) {
          console.error('Error disposing renderer:', err);
        }
        rendererResultRef.current = null;
      }
      
      // Clean up scene
      if (scene) {
        try {
          disposeScene(scene);
        } catch (err) {
          console.error('Error disposing scene:', err);
        }
      }
      
      // Clear state
      setRenderer(null);
      setScene(null);
      setIsInitialized(false);
    };
  }, []);

  useEffect(() => {
    const container = canvasRef.current?.parentElement;
    if (!container) return;

    const handleResize = () => {
      if (!isMountedRef.current) return;
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
    if (!isMountedRef.current) return;
    if (rendererResultRef.current && dimensions.width > 0 && dimensions.height > 0) {
      try {
        rendererResultRef.current.resize(dimensions.width, dimensions.height);
      } catch (error) {
        console.error('Error resizing renderer:', error);
      }
    }
  }, [dimensions]);

  useEffect(() => {
    if (!isMountedRef.current) return;
    if (!scene || !camera || !renderer) return;

    let animationFrameId: number;
    let isRenderLoopMounted = true;

    const render = () => {
      if (isRenderLoopMounted && isMountedRef.current && isTabVisible.current && renderer && scene && camera) {
        try {
          renderer.render(scene, camera);
        } catch (error) {
          console.error('Error rendering scene:', error);
          isRenderLoopMounted = false;
        }
      }
      if (isRenderLoopMounted && isMountedRef.current) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      isRenderLoopMounted = false;
      cancelAnimationFrame(animationFrameId);
    };
  }, [scene, camera, renderer]);

  const handleCameraReady = useCallback((cam: THREE.PerspectiveCamera) => {
    if (isMountedRef.current) {
      setCamera(cam);
    }
  }, []);

  const animationEnabled = !prefersReducedMotion;

  // Render static placeholder if WebGL is not supported or initialization failed
  if (error || !isInitialized) {
    return (
      <div className={`relative w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 ${className}`}>
        <div className="text-center p-8">
          <div className="text-[var(--color-text-secondary)] text-sm mb-2">
            {error || 'Loading 3D scene...'}
          </div>
          <div className="w-16 h-16 mx-auto rounded-full bg-[var(--color-primary)]/20 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        aria-hidden="true"
      />
      {scene && isInitialized && (
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
