import { useRef, useEffect, useState, useCallback } from 'react';

interface ProjectTiltProps {
  children: React.ReactNode;
  disabled?: boolean;
  maxTilt?: number;
  className?: string;
}

export const ProjectTilt = ({ 
  children, 
  disabled = false, 
  maxTilt = 10,
  className = '' 
}: ProjectTiltProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [shadow, setShadow] = useState('');

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    
    // Dynamic shadow based on tilt
    const shadowX = (x - centerX) / 10;
    const shadowY = (y - centerY) / 10;
    setShadow(`${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.15)`);
  }, [maxTilt]);

  const handleMouseEnter = useCallback(() => {
    setShadow('0 8px 30px rgba(0, 0, 0, 0.12)');
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setShadow('0 4px 20px rgba(0, 0, 0, 0.08)');
  }, []);

  useEffect(() => {
    if (disabled || !containerRef.current) return;

    const container = containerRef.current;

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [disabled, handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return (
    <div
      ref={containerRef}
      className={`transition-transform duration-200 ease-out ${className}`}
      style={{
        transform,
        boxShadow: shadow,
      }}
    >
      {children}
    </div>
  );
};