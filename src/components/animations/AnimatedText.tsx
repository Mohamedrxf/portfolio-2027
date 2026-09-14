import { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

/**
 * AnimatedText
 *
 * Character-by-character scroll reveal matching the MotionSites reference.
 *
 * Behavior:
 * - Uses Framer Motion `useScroll`.
 * - Targets the paragraph element.
 * - Scroll offset: ["start 0.8", "end 0.2"]
 * - Every character starts around opacity: 0.2 and progresses toward opacity: 1
 *   based on its position within the overall text and current scroll progress.
 * - Uses invisible placeholders plus absolutely positioned animated spans so the
 *   character layout does not shift.
 *
 * NOTE: hooks are NOT called inside the character loop. A single
 * `useMotionValueEvent` tracks the shared scroll progress, and each
 * character's opacity is derived inline from that scalar — no per-char hook.
 */
export interface AnimatedTextProps {
  text: string;
  className?: string;
  elementClassName?: string;
  once?: boolean;
}

export function AnimatedText({
  text,
  className,
  elementClassName,
  once = true,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const chars = text.split('');
  const count = Math.max(chars.length, 1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const [progress, setProgress] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (latest: number) => setProgress(latest));

  return (
    <motion.p
      ref={containerRef}
      className={cn('relative', className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once, amount: 0 }}
    >
      <span className={cn('relative inline', elementClassName)}>
        {/* Invisible placeholder keeps layout stable while chars animate */}
        <span className="opacity-0" aria-hidden="true">
          {text}
        </span>
        <span className="absolute inset-0 flex flex-wrap">
          {chars.map((char, i) => {
            const start = i / count;
            const end = (i + 1) / count;
            // Each char progresses from 0.2 -> 1 across its own slice of scroll.
            let opacity = 0.2;
            if (progress >= end) opacity = 1;
            else if (progress >= start) {
              const t = (progress - start) / (end - start);
              opacity = 0.2 + 0.8 * t;
            }
            return (
              <span key={`${char}-${i}`} style={{ opacity }} className="inline-block">
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}
        </span>
      </span>
    </motion.p>
  );
}

AnimatedText.displayName = 'AnimatedText';

function cn(...inputs: Array<string | false | undefined>): string {
  return inputs.filter(Boolean).join(' ');
}
