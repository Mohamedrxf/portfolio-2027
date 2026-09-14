import { useMemo } from 'react';

interface ProjectVisualProps {
  project: any;
}

export function ProjectVisual({ project }: ProjectVisualProps) {
  const visual = useMemo(() => {
    const id = project.id;
    if (id === 'project-1') return 'security';
    if (id === 'project-2') return 'execution';
    if (id === 'project-3') return 'traffic';
    return 'portfolio';
  }, [project.id]);

  return (
    <div className={`project-visual project-visual-${visual}`}>
      {visual === 'security' && <SecurityVisual />}
      {visual === 'execution' && <ExecutionVisual />}
      {visual === 'traffic' && <TrafficVisual />}
      {visual === 'portfolio' && <PortfolioVisual />}
    </div>
  );
}

function SecurityVisual() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-elevated)]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-48 h-48">
          <div className="absolute inset-0 rounded-full border border-[var(--color-accent)]/30" />
          <div className="absolute inset-4 rounded-full border border-[var(--color-accent)]/50" />
          <div className="absolute inset-8 rounded-full border-2 border-[var(--color-accent)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-[var(--color-accent)] shadow-[0_0_20px_var(--color-accent)]" />
          </div>
        </div>
      </div>
      <div className="absolute top-8 left-8 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-tertiary)]">
        {'//'} Vulnerability Scan
      </div>
      <div className="absolute bottom-8 right-8 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-tertiary)]">
        Threat Intel / Active
      </div>
    </div>
  );
}

function ExecutionVisual() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-elevated)]">
      <div className="absolute inset-0 flex items-center justify-center gap-3">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div
              className="w-10 h-14 bg-[var(--color-cyan)]/20 border border-[var(--color-cyan)]/40 rounded-sm relative overflow-hidden"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <div
                className="absolute bottom-0 left-0 right-0 bg-[var(--color-cyan)]"
                style={{ height: `${30 + i * 15}%` }}
              />
            </div>
            <span className="text-[9px] font-mono text-[var(--color-text-tertiary)]">
              C{String(i + 1)}
            </span>
          </div>
        ))}
      </div>
      <div className="absolute top-8 left-8 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-tertiary)]">
        {'//'} Sandboxed Containers
      </div>
      <div className="absolute bottom-8 right-8 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-tertiary)]">
        Resource Limits / Enforced
      </div>
    </div>
  );
}

function TrafficVisual() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-elevated)]">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
      >
        <path
          d="M0,200 Q100,150 200,180 T400,160"
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="1.5"
        />
        <path
          d="M0,240 Q120,210 240,230 T400,210"
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="1.5"
        />
        <path
          d="M0,160 Q100,120 200,140 T400,120"
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="1.5"
        />
        <circle cx="0" cy="200" r="3" fill="var(--color-warning)">
          <animate attributeName="cx" from="0" to="400" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="0" cy="240" r="2.5" fill="var(--color-success)">
          <animate attributeName="cx" from="0" to="400" dur="5.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="0" cy="160" r="3" fill="var(--color-accent)">
          <animate attributeName="cx" from="0" to="400" dur="3.2s" repeatCount="indefinite" />
        </circle>
      </svg>
      <div className="absolute top-8 left-8 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-tertiary)]">
        {'//'} Real-Time Telemetry
      </div>
      <div className="absolute bottom-8 right-8 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-tertiary)]">
        Emergency Priority / Active
      </div>
    </div>
  );
}

function PortfolioVisual() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-elevated)]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-16 h-16 border border-[var(--color-border)] bg-[var(--color-surface)]/60 backdrop-blur-sm"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
      <div className="absolute top-8 left-8 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-tertiary)]">
        {'//'} 3D Developer Environment
      </div>
      <div className="absolute bottom-8 right-8 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-tertiary)]">
        React / Three.js / WebGL
      </div>
    </div>
  );
}
