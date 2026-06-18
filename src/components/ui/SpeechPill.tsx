import React from 'react'

export interface SpeechPillProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  tail?: 'left' | 'right'
}

/**
 * Gold "speech bubble" pill — the recurring brand motif flanking the wordmark
 * (REAL ESTATE / BUSINESS). A burnished gold capsule with a small tail.
 */
export function SpeechPill({ children, tail = 'left', style = {}, ...rest }: SpeechPillProps) {
  return (
    <span
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '8px 16px',
        background: 'linear-gradient(165deg, var(--gold-300), var(--gold-600))',
        color: 'var(--navy-900)',
        fontFamily: 'var(--font-body)',
        fontWeight: 800,
        fontSize: 11,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        lineHeight: 1.15,
        borderRadius: 'var(--radius-full)',
        boxShadow: 'var(--shadow-sm), inset 0 1px 1px rgba(255,255,255,0.5)',
        ...style,
      }}
      {...rest}
    >
      {children}
      <span
        style={{
          position: 'absolute',
          bottom: -5,
          [tail === 'left' ? 'left' : 'right']: 16,
          width: 12,
          height: 12,
          background: 'var(--gold-600)',
          borderRadius: '0 0 3px 0',
          transform: 'rotate(45deg)',
        }}
      />
    </span>
  )
}
