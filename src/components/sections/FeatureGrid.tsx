import type { LucideIcon } from 'lucide-react'

export interface Feature {
  icon: LucideIcon
  title: string
  desc: string
}

/** Responsive grid of feature cards — icon disc, title, description. */
export function FeatureGrid({ items, minWidth = 280 }: { items: Feature[]; minWidth?: number }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}px, 1fr))`,
        gap: 22,
      }}
    >
      {items.map((f) => (
        <div
          key={f.title}
          style={{
            background: 'var(--surface-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: 28,
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 'var(--radius-md)',
              background: 'var(--gold-100)',
              color: 'var(--gold-700)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 18,
            }}
          >
            <f.icon size={24} strokeWidth={1.75} />
          </div>
          <h3
            style={{
              margin: '0 0 8px',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 19,
              letterSpacing: '-0.01em',
              color: 'var(--navy-900)',
            }}
          >
            {f.title}
          </h3>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'var(--text-body)' }}>{f.desc}</p>
        </div>
      ))}
    </div>
  )
}
