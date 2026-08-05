import { useEffect, useRef } from 'react';

interface MouseParallaxProps {
  enabled: boolean;
  onPositionChange?: (position: { x: number; y: number }) => void;
}

export function MouseParallax({ enabled, onPositionChange }: MouseParallaxProps) {
  const positionRef = useRef({ x: 0, y: 0 });
  const targetPositionRef = useRef({ x: 0, y: 0 });
  const onPositionChangeRef = useRef(onPositionChange);

  useEffect(() => {
    onPositionChangeRef.current = onPositionChange;
  }, [onPositionChange]);

  useEffect(() => {
    if (!enabled) {
      positionRef.current = { x: 0, y: 0 };
      targetPositionRef.current = { x: 0, y: 0 };
      onPositionChangeRef.current?.({ x: 0, y: 0 });
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      targetPositionRef.current = { x, y };
    };

    const handleMouseLeave = () => {
      targetPositionRef.current = { x: 0, y: 0 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      const lerpFactor = 5;
      positionRef.current.x += (targetPositionRef.current.x - positionRef.current.x) * lerpFactor * deltaTime;
      positionRef.current.y += (targetPositionRef.current.y - positionRef.current.y) * lerpFactor * deltaTime;

      onPositionChangeRef.current?.({ x: positionRef.current.x, y: positionRef.current.y });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled]);

  return null;
}
