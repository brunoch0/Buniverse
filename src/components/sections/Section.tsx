import type { CSSProperties, ReactNode } from 'react'

type Bg = 'page' | 'card' | 'cream' | 'navy'

const BG: Record<Bg, string> = {
  page: 'var(--surface-page)',
  card: 'var(--surface-card)',
  cream: 'var(--surface-cream)',
  navy: 'var(--navy-900)',
}

export function Section({
  children,
  bg = 'page',
  id,
  style = {},
}: {
  children: ReactNode
  bg?: Bg
  id?: string
  style?: CSSProperties
}) {
  return (
    <section
      id={id}
      style={{ padding: 'clamp(56px, 8vw, 96px) max(24px, 5vw)', background: BG[bg], ...style }}
    >
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>{children}</div>
    </section>
  )
}

export function Eyebrow({ children, style = {} }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <p
      style={{
        margin: '0 0 10px',
        fontWeight: 700,
        fontSize: 12,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--gold-700)',
        ...style,
      }}
    >
      {children}
    </p>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  onDark = false,
}: {
  eyebrow?: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  align?: 'left' | 'center'
  onDark?: boolean
}) {
  return (
    <div
      style={{
        textAlign: align,
        maxWidth: align === 'center' ? 680 : undefined,
        margin: align === 'center' ? '0 auto' : undefined,
      }}
    >
      {eyebrow && <Eyebrow style={{ color: onDark ? 'var(--gold-400)' : undefined }}>{eyebrow}</Eyebrow>}
      <h2
        style={{
          margin: 0,
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(28px, 4vw, 40px)',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          color: onDark ? '#fff' : 'var(--navy-900)',
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            margin: '16px 0 0',
            fontSize: 18,
            lineHeight: 1.6,
            color: onDark ? 'var(--text-on-navy-muted)' : 'var(--text-body)',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
