import { useState } from 'react'
import { PropertyCard } from '../components/property/PropertyCard'
import { Button } from '../components/ui/Button'
import { useLang } from '../i18n/LanguageContext'
import { useEnquiry } from '../components/layout/enquiry'

const LISTINGS = [
  { image: '/brand/heroes/hero-coastline-villas.png', title: 'Palm Signature Villa', location: 'Palm Jumeirah', price: 'AED 32.0M', priceNote: '· freehold', beds: 5, baths: 6, area: '8,200 ft²', badges: ['Exclusive', 'Beachfront'] },
  { image: '/brand/property/damac-safa-two.png', title: 'Safa Two — Sky Collection', location: 'Business Bay', price: 'AED 2.4M', priceNote: '· from', beds: 1, baths: 2, area: '740 ft²', badges: ['Off-plan'] },
  { image: '/brand/heroes/hero-resort-pools.png', title: 'Beach Estate Residences', location: 'Jumeirah Bay Island', price: 'AED 48.0M', priceNote: '· freehold', beds: 6, baths: 7, area: '11,400 ft²', badges: ['Exclusive', 'Private pool'] },
  { image: '/brand/heroes/hero-marina-frame.png', title: 'Marina Frame Penthouse', location: 'Dubai Marina', price: 'AED 9.8M', priceNote: '', beds: 3, baths: 4, area: '3,100 ft²', badges: ['Ready'] },
  { image: '/brand/heroes/hero-island-aerial.png', title: 'The World — Private Island', location: 'The World Islands', price: 'AED 120M', priceNote: '· bespoke', beds: 8, baths: 10, area: '24,000 ft²', badges: ['Exclusive'] },
  { image: '/brand/heroes/hero-waterfront-panorama.png', title: 'Downtown Sky Residence', location: 'Downtown Dubai', price: 'AED 6.2M', priceNote: '', beds: 2, baths: 3, area: '1,860 ft²', badges: ['Off-plan'] },
]

export function Listings() {
  const { t } = useLang()
  const onEnquire = useEnquiry()
  const filters = [
    { ko: '전체', en: 'All' },
    { ko: '입주가능', en: 'Ready' },
    { ko: '분양', en: 'Off-plan' },
    { ko: '비치프론트', en: 'Beachfront' },
    { ko: '펜트하우스', en: 'Penthouses' },
  ]
  const [active, setActive] = useState(0)
  return (
    <section style={{ padding: 'clamp(56px, 8vw, 96px) max(24px, 5vw)', background: 'var(--surface-page)', fontFamily: 'var(--font-body)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
          <div>
            <p style={{ margin: '0 0 8px', fontWeight: 700, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold-700)' }}>
              {t({ ko: '추천 매물', en: 'Featured collection' })}
            </p>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 40px)', letterSpacing: '-0.02em', color: 'var(--navy-900)' }}>
              {t({ ko: '소유할 가치가 있는 주소', en: 'Addresses worth owning' })}
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {filters.map((f, i) => (
              <button
                key={f.en}
                onClick={() => setActive(i)}
                style={{
                  border: '1.5px solid ' + (active === i ? 'var(--navy-700)' : 'var(--border-default)'),
                  background: active === i ? 'var(--navy-700)' : 'transparent',
                  color: active === i ? '#fff' : 'var(--navy-700)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: 13,
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  cursor: 'pointer',
                  transition: 'all var(--dur-base)',
                }}
              >
                {t(f)}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 22 }}>
          {LISTINGS.map((l) => (
            <PropertyCard key={l.title} {...l} onClick={onEnquire} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
          <Button variant="outline" size="lg">
            {t({ ko: '전체 매물 보기', en: 'View all 240 listings' })}
          </Button>
        </div>
      </div>
    </section>
  )
}
