import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Check, MapPin, ArrowLeft, BedDouble, Bath, Maximize } from 'lucide-react'
import { Section } from '../components/sections/Section'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { PropertyCard } from '../components/property/PropertyCard'
import { useLang } from '../i18n/LanguageContext'
import { useEnquiry } from '../components/layout/enquiry'
import { fetchListingBySlug, fetchListings, type Listing } from '../lib/properties'

export function PropertyDetail() {
  const { id } = useParams()
  const { t } = useLang()
  const onEnquire = useEnquiry()
  const navigate = useNavigate()
  const [listing, setListing] = useState<Listing | null>(null)
  const [similar, setSimilar] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState(0)

  useEffect(() => {
    let on = true
    setLoading(true)
    setActive(0)
    ;(async () => {
      const l = id ? await fetchListingBySlug(id) : null
      if (!on) return
      setListing(l)
      if (l) {
        const all = await fetchListings()
        if (on) setSimilar(all.filter((x) => x.id !== l.id && x.type === l.type).slice(0, 3))
      }
      setLoading(false)
    })()
    return () => { on = false }
  }, [id])

  if (loading) {
    return <Section bg="page"><p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>{t({ ko: '불러오는 중…', en: 'Loading…' })}</p></Section>
  }

  if (!listing) {
    return (
      <Section bg="page">
        <div style={{ textAlign: 'center', padding: '64px 24px' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy-900)' }}>{t({ ko: '매물을 찾을 수 없습니다', en: 'Listing not found' })}</h1>
          <div style={{ marginTop: 20 }}>
            <Link to="/properties" style={{ textDecoration: 'none' }}>
              <Button variant="outline">{t({ ko: '매물 목록으로', en: 'Back to listings' })}</Button>
            </Link>
          </div>
        </div>
      </Section>
    )
  }

  const spec = (icon: React.ReactNode, label: string, value?: number | string | null) =>
    value == null ? null : (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ color: 'var(--gold-700)' }}>{icon}</span>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 16, color: 'var(--navy-900)' }}>{value}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{label}</div>
        </div>
      </div>
    )

  return (
    <Section bg="page">
      <button onClick={() => navigate('/properties')} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, border: 'none', background: 'transparent', color: 'var(--navy-600)', fontWeight: 600, fontSize: 14, cursor: 'pointer', marginBottom: 18 }}>
        <ArrowLeft size={16} /> {t({ ko: '매물 목록', en: 'All listings' })}
      </button>

      <div className="bun-detail-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.6fr) minmax(280px, 1fr)', gap: 32, alignItems: 'start' }}>
        <div>
          <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', aspectRatio: '16 / 10', position: 'relative' }}>
            <img src={listing.gallery[active] ?? listing.image} alt={listing.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', gap: 6 }}>
              {listing.badges.map((b, i) => <Badge key={b} tone={i === 0 ? 'gold' : 'navy'} solid={i === 0}>{b}</Badge>)}
            </div>
          </div>
          {listing.gallery.length > 1 && (
            <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
              {listing.gallery.map((g, i) => (
                <button key={i} onClick={() => setActive(i)} style={{ flex: 1, padding: 0, border: '2px solid ' + (active === i ? 'var(--gold-500)' : 'transparent'), borderRadius: 'var(--radius-md)', overflow: 'hidden', cursor: 'pointer', aspectRatio: '16/10', background: 'none' }}>
                  <img src={g} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </button>
              ))}
            </div>
          )}

          {listing.highlights.length > 0 && (
            <div style={{ marginTop: 28 }}>
              <h3 style={{ margin: '0 0 14px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: 'var(--navy-900)' }}>{t({ ko: '핵심 포인트', en: 'Highlights' })}</h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
                {listing.highlights.map((h) => (
                  <li key={h.en} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 15, color: 'var(--text-body)' }}>
                    <Check size={18} strokeWidth={2.4} style={{ color: 'var(--gold-600)', flexShrink: 0, marginTop: 1 }} /> {t(h)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="bun-detail-aside" style={{ position: 'sticky', top: 'calc(var(--header-height) + 16px)', background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', padding: 26, boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: 13, marginBottom: 6 }}>
            <MapPin size={14} /> {listing.location}
          </div>
          <h1 style={{ margin: '0 0 8px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, letterSpacing: '-0.01em', color: 'var(--navy-900)' }}>{listing.title}</h1>
          <p style={{ margin: '0 0 16px', fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-body)' }}>{t(listing.summary)}</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 18 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 600, color: 'var(--navy-800)' }}>{listing.price}</span>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{listing.priceNote}</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, padding: '16px 0', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', marginBottom: 18 }}>
            {spec(<BedDouble size={18} />, t({ ko: '침실', en: 'Beds' }), listing.beds)}
            {spec(<Bath size={18} />, t({ ko: '욕실', en: 'Baths' }), listing.baths)}
            {spec(<Maximize size={18} />, t({ ko: '면적', en: 'Area' }), listing.area)}
          </div>
          {listing.developer && (
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 18 }}>
              {t({ ko: '개발사', en: 'Developer' })}: <b style={{ color: 'var(--navy-800)' }}>{listing.developer}</b>
            </div>
          )}
          <Button variant="gold" size="lg" fullWidth onClick={onEnquire} iconRight={<span style={{ fontSize: 16, lineHeight: 0 }}>→</span>}>
            {t({ ko: '이 매물 문의하기', en: 'Enquire about this' })}
          </Button>
        </div>
      </div>

      {similar.length > 0 && (
        <div style={{ marginTop: 56 }}>
          <h3 style={{ margin: '0 0 22px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: 'var(--navy-900)' }}>{t({ ko: '비슷한 매물', en: 'Similar listings' })}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 22 }}>
            {similar.map((l) => (
              <PropertyCard key={l.id} {...l} onClick={() => navigate(`/properties/${l.id}`)} />
            ))}
          </div>
        </div>
      )}
    </Section>
  )
}
