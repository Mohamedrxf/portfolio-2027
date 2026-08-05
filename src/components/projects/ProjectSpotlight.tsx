import { useRef, useEffect, useState, useCallback } from 'react';

interface ProjectSpotlightProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export const ProjectSpotlight = ({ 
  children, 
  disabled = false,
  className = '' 
}: ProjectSpotlightProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setPosition({ x, y });
    setOpacity(1);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setOpacity(1);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOpacity(0);
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
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)',
          left: position.x - 150,
          top: position.y - 150,
          opacity,
          transition: 'opacity 0.3s ease',
        }}
      />
      {children}
    </div>
  );
};