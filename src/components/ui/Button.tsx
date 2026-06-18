import React from 'react'

type Variant = 'primary' | 'gold' | 'secondary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
}

/** Buniverse primary button. Navy by default; gold for high-intent CTAs. */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  iconLeft = null,
  iconRight = null,
  disabled = false,
  type = 'button',
  style = {},
  ...rest
}: ButtonProps) {
  const sizes: Record<Size, React.CSSProperties> = {
    sm: { padding: '0 16px', height: 38, fontSize: 13 },
    md: { padding: '0 22px', height: 46, fontSize: 14 },
    lg: { padding: '0 30px', height: 56, fontSize: 16 },
  }
  const s = sizes[size]

  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    height: s.height,
    padding: s.padding,
    width: fullWidth ? '100%' : 'auto',
    fontFamily: 'var(--font-body)',
    fontSize: s.fontSize,
    fontWeight: 700,
    letterSpacing: '0.01em',
    lineHeight: 1,
    borderRadius: 'var(--radius-full)',
    border: '1.5px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition:
      'transform var(--dur-fast) var(--ease-out), background var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
  }

  const variants: Record<Variant, React.CSSProperties> = {
    primary: {
      background: 'var(--navy-700)',
      color: 'var(--text-on-navy)',
      boxShadow: 'var(--shadow-sm)',
    },
    gold: {
      background: 'var(--gold-500)',
      color: 'var(--navy-900)',
      boxShadow: 'var(--shadow-gold)',
    },
    secondary: {
      background: 'var(--white)',
      color: 'var(--navy-700)',
      borderColor: 'var(--border-default)',
    },
    outline: {
      background: 'transparent',
      color: 'var(--navy-700)',
      borderColor: 'var(--navy-700)',
    },
    ghost: { background: 'transparent', color: 'var(--navy-700)' },
  }

  const [hover, setHover] = React.useState(false)
  const [press, setPress] = React.useState(false)
  const v = variants[variant]

  const hoverStyles: Record<Variant, React.CSSProperties> = {
    primary: { background: 'var(--navy-800)', boxShadow: 'var(--shadow-md)' },
    gold: { background: 'var(--gold-600)' },
    secondary: { borderColor: 'var(--navy-300)', background: 'var(--navy-050)' },
    outline: { background: 'var(--navy-050)' },
    ghost: { background: 'var(--navy-050)' },
  }
  const hoverStyle = !disabled && hover ? hoverStyles[variant] : {}

  return (
    <button
      type={type}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false)
        setPress(false)
      }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        ...base,
        ...v,
        ...hoverStyle,
        transform: press && !disabled ? 'scale(0.97)' : 'scale(1)',
        ...style,
      }}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  )
}
