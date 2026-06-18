import React from 'react'

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'style'> {
  label?: string
  adornment?: React.ReactNode
  helper?: string
  error?: string
  style?: React.CSSProperties
}

/** Text input with optional label, leading adornment and helper/error text. */
export function Input({
  label = '',
  placeholder = '',
  type = 'text',
  adornment = null,
  helper = '',
  error = '',
  disabled = false,
  id,
  style = {},
  ...rest
}: InputProps) {
  const [focus, setFocus] = React.useState(false)
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)
  const borderColor = error
    ? 'var(--status-danger)'
    : focus
      ? 'var(--navy-500)'
      : 'var(--border-default)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7, fontFamily: 'var(--font-body)', ...style }}>
      {label && (
        <label htmlFor={inputId} style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy-800)' }}>
          {label}
        </label>
      )}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 9,
          height: 48,
          padding: '0 16px',
          background: disabled ? 'var(--gray-100)' : 'var(--white)',
          border: `1.5px solid ${borderColor}`,
          borderRadius: 'var(--radius-md)',
          boxShadow: focus ? '0 0 0 4px rgba(50,74,147,0.12)' : 'none',
          transition: 'border-color var(--dur-base), box-shadow var(--dur-base)',
        }}
      >
        {adornment && <span style={{ color: 'var(--text-muted)', display: 'inline-flex' }}>{adornment}</span>}
        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontFamily: 'var(--font-body)',
            fontSize: 15,
            color: 'var(--text-strong)',
            minWidth: 0,
          }}
          {...rest}
        />
      </div>
      {(error || helper) && (
        <span style={{ fontSize: 12, color: error ? 'var(--status-danger)' : 'var(--text-muted)' }}>
          {error || helper}
        </span>
      )}
    </div>
  )
}
