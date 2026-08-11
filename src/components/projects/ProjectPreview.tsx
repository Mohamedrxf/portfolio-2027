import { useState, useRef, useEffect, useTransition } from 'react';

interface ProjectPreviewProps {
  image?: string;
  alt: string;
  className?: string;
}

export const ProjectPreview = ({ image, alt, className = '' }: ProjectPreviewProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (!image) {
      startTransition(() => {
        setIsLoading(false);
        setHasError(true);
      });
      return;
    }

    startTransition(() => {
      setIsLoading(true);
      setHasError(false);
    });
  }, [image]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError || !image) {
    return null;
  }

  return (
    <div className={`aspect-video rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900 relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-900">
          <div className="w-8 h-8 border-2 border-slate-300 dark:border-slate-600 border-t-slate-500 dark:border-t-slate-400 rounded-full animate-spin" />
        </div>
      )}
      <img
        ref={imgRef}
        src={image}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      />
    </div>
  );
};