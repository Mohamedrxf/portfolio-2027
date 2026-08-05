import { useState, useRef, useEffect } from 'react';

interface ProjectPreviewProps {
  image?: string;
  alt: string;
  className?: string;
}

export const ProjectPreview = ({ image, alt, className = '' }: ProjectPreviewProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!image) {
      setIsLoading(false);
      setHasError(true);
      return;
    }

    setIsLoading(true);
    setHasError(false);
  }, [image]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError || !image) {
    return (
      <div className={`aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center p-4">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Preview coming soon</p>
        </div>
      </div>
    );
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