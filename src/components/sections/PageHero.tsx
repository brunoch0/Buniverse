import type { ReactNode } from 'react'

/** Compact inner-page hero with a brand claymation backdrop and navy gradient. */
export function PageHero({
  image,
  eyebrow,
  title,
  subtitle,
  children,
  height = 420,
}: {
  image: string
  eyebrow?: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  children?: ReactNode
  height?: number
}) {
  return (
    <section style={{ position: 'relative', height, overflow: 'hidden' }}>
      <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(12,20,48,0.82) 0%, rgba(12,20,48,0.5) 48%, rgba(12,20,48,0.12) 80%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 max(24px, 5vw)',
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <div style={{ maxWidth: 680 }}>
          {eyebrow && (
            <p
              style={{
                margin: '0 0 14px',
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--gold-400)',
              }}
            >
              {eyebrow}
            </p>
          )}
          <h1
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(32px, 4.6vw, 52px)',
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              color: '#fff',
              textWrap: 'balance',
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p style={{ margin: '18px 0 0', fontSize: 18, lineHeight: 1.6, color: 'var(--text-on-navy)', maxWidth: 560 }}>
              {subtitle}
            </p>
          )}
          {children && <div style={{ marginTop: 28, display: 'flex', gap: 14, flexWrap: 'wrap' }}>{children}</div>}
        </div>
      </div>
    </section>
  )
}
