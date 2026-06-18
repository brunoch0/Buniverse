import React from 'react'

type Tone = 'navy' | 'gold' | 'sea' | 'success' | 'neutral'
type Size = 'sm' | 'md' | 'lg'

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: Tone
  solid?: boolean
  size?: Size
}

/** Small status / category label. Soft tints by default, solid for emphasis. */
export function Badge({
  children,
  tone = 'navy',
  solid = false,
  size = 'md',
  style = {},
  ...rest
}: BadgeProps) {
  const tones: Record<Tone, { soft: { bg: string; fg: string }; solid: { bg: string; fg: string } }> = {
    navy: { soft: { bg: 'var(--navy-050)', fg: 'var(--navy-700)' }, solid: { bg: 'var(--navy-700)', fg: '#fff' } },
    gold: { soft: { bg: 'var(--gold-100)', fg: 'var(--gold-900)' }, solid: { bg: 'var(--gold-500)', fg: 'var(--navy-900)' } },
    sea: { soft: { bg: 'var(--sea-100)', fg: 'var(--sea-700)' }, solid: { bg: 'var(--sea-500)', fg: '#fff' } },
    success: { soft: { bg: '#e3f1e9', fg: 'var(--status-success)' }, solid: { bg: 'var(--status-success)', fg: '#fff' } },
    neutral: { soft: { bg: 'var(--gray-100)', fg: 'var(--gray-700)' }, solid: { bg: 'var(--gray-700)', fg: '#fff' } },
  }
  const t = tones[tone][solid ? 'solid' : 'soft']
  const sizes: Record<Size, React.CSSProperties> = {
    sm: { fontSize: 10, padding: '3px 8px' },
    md: { fontSize: 11, padding: '4px 11px' },
    lg: { fontSize: 13, padding: '6px 14px' },
  }
  const s = sizes[size]
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        background: t.bg,
        color: t.fg,
        fontFamily: 'var(--font-body)',
        fontWeight: 700,
        fontSize: s.fontSize,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        padding: s.padding,
        borderRadius: 'var(--radius-full)',
        lineHeight: 1,
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  )
}
