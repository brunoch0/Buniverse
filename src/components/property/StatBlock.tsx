import React from 'react'

export interface StatBlockProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: React.ReactNode
  label: string
  accent?: boolean
  align?: 'left' | 'center'
}

/** Headline metric block — a big mono figure with a label. For stat strips. */
export function StatBlock({ value, label, accent = false, align = 'left', style = {}, ...rest }: StatBlockProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        alignItems: align === 'center' ? 'center' : 'flex-start',
        textAlign: align,
        fontFamily: 'var(--font-body)',
        ...style,
      }}
      {...rest}
    >
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 42,
          lineHeight: 1,
          letterSpacing: '-0.03em',
          color: accent ? 'var(--gold-600)' : 'var(--navy-800)',
        }}
      >
        {value}
      </span>
      <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)', letterSpacing: '0.02em' }}>{label}</span>
    </div>
  )
}
