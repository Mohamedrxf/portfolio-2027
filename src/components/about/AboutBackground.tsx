interface AboutBackgroundProps {
  children: React.ReactNode;
}

export const AboutBackground = ({ children }: AboutBackgroundProps) => {
  return (
    <div className="relative overflow-hidden bg-[var(--color-bg)]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)] via-[var(--color-bg)] to-[var(--color-surface)]" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] opacity-[0.15]"
          style={{
            background: 'radial-gradient(ellipse, var(--color-accent) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[700px] h-[500px] opacity-[0.1]"
          style={{
            background: 'radial-gradient(ellipse, var(--color-cyan) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(to right, var(--color-text-primary) 1px, transparent 1px)`,
              backgroundSize: '80px 80px',
            }}
          />
        </div>
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
};
