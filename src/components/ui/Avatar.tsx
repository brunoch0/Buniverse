import React from 'react'

export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string | null
  name?: string
  size?: number
  ring?: boolean
}

/** Circular avatar. Renders a 3D clay brand figure or initials on a soft disc. */
export function Avatar({ src = null, name = '', size = 48, ring = false, style = {}, ...rest }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: 'var(--radius-full)',
        background: 'radial-gradient(circle at 50% 35%, var(--white), var(--sand-300))',
        color: 'var(--navy-700)',
        fontFamily: 'var(--font-body)',
        fontWeight: 700,
        fontSize: size * 0.38,
        overflow: 'hidden',
        boxShadow: ring ? '0 0 0 2px var(--gold-500), var(--shadow-sm)' : 'var(--shadow-xs)',
        flexShrink: 0,
        ...style,
      }}
      {...rest}
    >
      {src ? (
        <img src={src} alt={name} style={{ width: '92%', height: '116%', objectFit: 'contain', objectPosition: 'bottom' }} />
      ) : (
        <span style={{ alignSelf: 'center' }}>{initials}</span>
      )}
    </span>
  )
}
