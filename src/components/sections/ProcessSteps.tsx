export interface Step {
  title: string
  desc: string
}

/** Numbered process steps with a gold ordinal. */
export function ProcessSteps({ steps }: { steps: Step[] }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(260px, 1fr))`,
        gap: 22,
      }}
    >
      {steps.map((s, i) => (
        <div
          key={s.title}
          style={{
            position: 'relative',
            background: 'var(--surface-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '28px 24px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              fontSize: 13,
              color: 'var(--gold-700)',
              letterSpacing: '0.04em',
            }}
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3
            style={{
              margin: '10px 0 8px',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: '-0.01em',
              color: 'var(--navy-900)',
            }}
          >
            {s.title}
          </h3>
          <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-body)' }}>{s.desc}</p>
        </div>
      ))}
    </div>
  )
}
