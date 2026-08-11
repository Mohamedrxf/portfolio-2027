import { useSpotlight } from '@/hooks/useSpotlight';

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
  const spotlightRef = useSpotlight({
    size: 300,
    opacity: 0.15,
    disabled,
  });

  return (
    <div
      ref={spotlightRef as any}
      className={`relative overflow-hidden ${className}`}
      style={{
        '--spotlight-color': 'rgba(255, 255, 255, 0.15)',
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};