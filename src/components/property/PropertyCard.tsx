import React from 'react'
import { Badge } from '../ui/Badge'

export interface PropertyCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  image: string
  title: string
  location?: string
  price?: string
  priceNote?: string
  beds?: number | null
  baths?: number | null
  area?: string | null
  badges?: string[]
}

/**
 * Property listing card — image, location, price and key specs.
 * The signature Buniverse data component.
 */
export function PropertyCard({
  image,
  title,
  location = '',
  price = '',
  priceNote = '',
  beds,
  baths,
  area,
  badges = [],
  onClick,
  style = {},
  ...rest
}: PropertyCardProps) {
  const [hover, setHover] = React.useState(false)
  const spec = (label: string, value: number | string | null | undefined) =>
    value == null ? null : (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 600, color: 'var(--navy-800)' }}>{value}</span>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{label}</span>
      </div>
    )

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--surface-card)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid var(--border-subtle)',
        boxShadow: hover ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
        transform: hover ? 'translateY(-4px)' : 'none',
        transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
        cursor: onClick ? 'pointer' : 'default',
        fontFamily: 'var(--font-body)',
        ...style,
      }}
      {...rest}
    >
      <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
        <img
          src={image}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: hover ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform var(--dur-slow) var(--ease-out)',
          }}
        />
        {badges.length > 0 && (
          <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6 }}>
            {badges.map((b, i) => (
              <Badge key={i} tone={i === 0 ? 'gold' : 'navy'} solid={i === 0}>{b}</Badge>
            ))}
          </div>
        )}
      </div>
      <div style={{ padding: 18 }}>
        <h3 style={{ margin: '0 0 3px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 19, color: 'var(--navy-900)', letterSpacing: '-0.01em' }}>{title}</h3>
        {location && <p style={{ margin: 0, fontSize: 13, color: 'var(--text-muted)' }}>{location}</p>}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 14 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 600, color: 'var(--navy-800)' }}>{price}</span>
          {priceNote && <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{priceNote}</span>}
        </div>
        {(beds != null || baths != null || area != null) && (
          <div style={{ display: 'flex', gap: 26, marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border-subtle)' }}>
            {spec('Bedrooms', beds)}
            {spec('Bathrooms', baths)}
            {spec('Area', area)}
          </div>
        )}
      </div>
    </div>
  )
}
