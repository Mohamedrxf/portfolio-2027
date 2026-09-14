import { forwardRef, useCallback, useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks';

/**
 * Magnet
 *
 * Reusable magnetic interaction component matching the MotionSites reference spec.
 *
 * - Tracks the cursor relative to the element center.
 * - Applies translate3d with movement divided by `strength`.
 * - Activation depends on cursor distance from the configured `padding` region.
 * - Active transition: transform 0.3s ease-out
 * - Inactive transition: transform 0.6s ease-in-out
 * - Uses willChange: transform
 */
export interface MagnetProps {
  children: React.ReactNode;
  className?: string;
  /** Padding region (px) around the element that does NOT trigger magnetism */
  padding?: number;
  /** Divisor applied to the raw cursor offset */
  strength?: number;
  /** Additional inline style overrides */
  style?: React.CSSProperties;
}

export const Magnet = forwardRef<HTMLDivElement, MagnetProps>(
  ({ children, className, padding = 150, strength = 3, style }: MagnetProps, externalRef) => {
    const prefersReducedMotion = useReducedMotion();
    const localRef = useRef<HTMLDivElement | null>(null);

    const setRef = useCallback(
      (node: HTMLDivElement | null) => {
        localRef.current = node;
        if (typeof externalRef === 'function') {
          externalRef(node);
        } else if (externalRef) {
          (externalRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [externalRef]
    );

    const applyMagnetic = useCallback(
      (deltaX: number, deltaY: number, active: boolean) => {
        const element = localRef.current;
        if (!element) return;

        if (active) {
          element.style.transform = `translate3d(${deltaX / strength}px, ${deltaY / strength}px, 0)`;
          // Active transition
          element.style.transition = 'transform 0.3s ease-out';
          element.style.setProperty('--magnetic-active', '1');
        } else {
          element.style.transform = '';
          // Inactive transition
          element.style.transition = 'transform 0.6s ease-in-out';
          element.style.setProperty('--magnetic-active', '0');
        }
      },
      [strength]
    );

    const handlePointerMove = useCallback(
      (e: PointerEvent) => {
        const element = localRef.current;
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        // Activation depends on cursor distance from the configured padding region
        const halfW = rect.width / 2 + padding;
        const halfH = rect.height / 2 + padding;

        const withinX = Math.abs(deltaX) < halfW;
        const withinY = Math.abs(deltaY) < halfH;

        applyMagnetic(deltaX, deltaY, withinX && withinY);
      },
      [padding, applyMagnetic]
    );

    const handlePointerLeave = useCallback(() => {
      applyMagnetic(0, 0, false);
    }, [applyMagnetic]);

    useEffect(() => {
      if (prefersReducedMotion) return;
      const element = localRef.current;
      if (!element) return;

      element.style.willChange = 'transform';
      element.style.transition = 'transform 0.6s ease-in-out';
      element.style.setProperty('--magnetic-active', '0');

      element.addEventListener('pointermove', handlePointerMove, { passive: true });
      element.addEventListener('pointerleave', handlePointerLeave);
      element.addEventListener('pointercancel', handlePointerLeave);

      return () => {
        element.removeEventListener('pointermove', handlePointerMove);
        element.removeEventListener('pointerleave', handlePointerLeave);
        element.removeEventListener('pointercancel', handlePointerLeave);
      };
    }, [prefersReducedMotion, handlePointerMove, handlePointerLeave]);

    return (
      <div
        ref={setRef}
        className={className}
        style={{
          ...style,
          willChange: prefersReducedMotion ? undefined : 'transform',
        }}
      >
        {children}
      </div>
    );
  }
);

Magnet.displayName = 'Magnet';
