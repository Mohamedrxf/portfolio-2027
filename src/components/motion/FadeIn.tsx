import { forwardRef } from 'react';
import { motion, Variants } from 'framer-motion';

/**
 * FadeIn
 *
 * Reusable fade-in component matching the MotionSites reference behavior.
 *
 * Props:
 * - delay
 * - duration (default 0.7)
 * - x (default 0)
 * - y (default 30)
 *
 * Easing: [0.25, 0.1, 0.25, 1]
 *
 * Uses Framer Motion `whileInView` with:
 *   viewport: { once: true, margin: '50px', amount: 0 }
 *
 * Uses `motion.create()` where appropriate.
 */
export interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  once?: boolean;
  as?: React.ElementType;
  style?: React.CSSProperties;
}

const EASING: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export const FadeIn = forwardRef<HTMLDivElement, FadeInProps>(
  (
    {
      children,
      className,
      delay = 0,
      duration = 0.7,
      x = 0,
      y = 30,
      once = true,
      as = 'div',
      style,
    },
    ref
  ) => {
    const MotionComponent = motion[as as keyof typeof motion] as any;

    const variants: Variants = {
      hidden: {
        opacity: 0,
        x,
        y,
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration,
          delay,
          ease: EASING,
        },
      },
    };

    return (
      <MotionComponent
        ref={ref}
        className={className}
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: '50px', amount: 0 }}
        style={style}
      >
        {children}
      </MotionComponent>
    );
  }
);

FadeIn.displayName = 'FadeIn';
