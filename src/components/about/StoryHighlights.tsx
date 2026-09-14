import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';

export const StoryHighlights = ({ highlights }: { highlights: any[] }) => {
  return (
    <StaggerContainer stagger={0.1} delayChildren={0.2}>
      <div className="space-y-px bg-[var(--color-border)]">
        {highlights.map((highlight, index) => (
          <StaggerItem key={index}>
            <div className="group flex items-start gap-6 px-6 py-5 bg-[var(--color-bg)] hover:bg-[var(--color-surface)] transition-colors duration-300">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-accent)] pt-1 w-16 flex-shrink-0">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] tracking-tight">
                    {highlight.title}
                  </h3>
                  {highlight.badge && (
                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--color-text-tertiary)] border border-[var(--color-border)] px-2 py-0.5">
                      {highlight.badge}
                    </span>
                  )}
                </div>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                  {highlight.description}
                </p>
              </div>
              <span className="text-[var(--color-text-tertiary)] group-hover:text-[var(--color-cyan)] transition-colors duration-300 flex-shrink-0">
                ↗
              </span>
            </div>
          </StaggerItem>
        ))}
      </div>
    </StaggerContainer>
  );
};
