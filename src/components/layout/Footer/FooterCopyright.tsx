import { AnimatedText } from '@/components/animations/AnimatedText';

export const FooterCopyright = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="pt-8 border-t border-[var(--color-border)]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <AnimatedText
          text={`© ${currentYear} Portfolio. All rights reserved.`}
          className="text-sm text-[var(--color-text-secondary)]"
        />
        <AnimatedText
          text="Built with modern web technologies"
          className="text-xs text-[var(--color-text-tertiary)]"
        />
      </div>
    </div>
  );
};
