import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHero } from '../components/sections/PageHero'
import { Section } from '../components/sections/Section'
import { PropertyCard } from '../components/property/PropertyCard'
import { Button } from '../components/ui/Button'
import { useLang, type Localized } from '../i18n/LanguageContext'
import { useEnquiry } from '../components/layout/enquiry'
import { fetchListings, LISTING_TYPES, type Listing, type ListingType } from '../lib/properties'

const REGIONS = ['Palm Jumeirah', 'Business Bay', 'Dubai Marina', 'Downtown Dubai', 'JVC']

export function Properties() {
  const { t } = useLang()
  const onEnquire = useEnquiry()
  const navigate = useNavigate()
  const [type, setType] = useState<ListingType | 'all'>('all')
  const [region, setRegion] = useState<string | null>(null)
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    fetchListings().then((l) => {
      if (active) { setListings(l); setLoading(false) }
    })
    return () => { active = false }
  }, [])

  const types: { key: ListingType | 'all'; label: Localized<string> }[] = [
    { key: 'all', label: { ko: '전체', en: 'All' } },
    ...LISTING_TYPES,
  ]

  const results = useMemo(
    () => listings.filter((l) => (type === 'all' || l.type === type) && (!region || l.location.includes(region))),
    [listings, type, region],
  )

  const chip = (active: boolean): React.CSSProperties => ({
    border: '1.5px solid ' + (active ? 'var(--navy-700)' : 'var(--border-default)'),
    background: active ? 'var(--navy-700)' : 'transparent',
    color: active ? '#fff' : 'var(--navy-700)',
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    fontSize: 13,
    padding: '8px 16px',
    borderRadius: 'var(--radius-full)',
    cursor: 'pointer',
    transition: 'all var(--dur-base)',
  })

  return (
    <>
      <PageHero
        image="/brand/heroes/hero-coastline-villas.png"
        height={360}
        eyebrow={t({ ko: '매물찾기', en: 'Properties' })}
        title={t({ ko: '두바이 전역 검증 매물', en: 'Verified listings across Dubai' })}
        subtitle={t({ ko: '매매·임대·분양·투자매물을 한곳에서 검색하고 비교하세요.', en: 'Search and compare sale, rental, off-plan and investment listings.' })}
      />

      <Section bg="page">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 26 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {types.map((ty) => (
              <button key={ty.key} onClick={() => setType(ty.key)} style={chip(type === ty.key)}>
                {t(ty.label)}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: 'var(--text-muted)', marginRight: 4 }}>{t({ ko: '지역', en: 'Area' })}</span>
            <button onClick={() => setRegion(null)} style={chip(region === null)}>{t({ ko: '전체', en: 'All' })}</button>
            {REGIONS.map((r) => (
              <button key={r} onClick={() => setRegion(r)} style={chip(region === r)}>{r}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 18 }}>
          <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>
            {t({ ko: '총', en: 'Total' })}{' '}
            <b style={{ fontFamily: 'var(--font-mono)', color: 'var(--navy-800)' }}>{results.length}</b>{' '}
            {t({ ko: '건', en: 'results' })}
          </span>
          {(type !== 'all' || region) && (
            <button onClick={() => { setType('all'); setRegion(null) }} style={{ border: 'none', background: 'transparent', color: 'var(--navy-600)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              {t({ ko: '필터 초기화', en: 'Reset filters' })}
            </button>
          )}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '56px 24px', color: 'var(--text-muted)' }}>{t({ ko: '매물을 불러오는 중…', en: 'Loading listings…' })}</div>
        ) : results.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 22 }}>
            {results.map((l) => (
              <PropertyCard key={l.id} {...l} onClick={() => navigate(`/properties/${l.id}`)} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '56px 24px', background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
            <p style={{ margin: '0 0 18px', color: 'var(--text-body)', fontSize: 15 }}>
              {t({ ko: '조건에 맞는 매물이 준비 중입니다. 원하시는 조건을 알려주시면 먼저 보내드립니다.', en: 'No matching listings yet — tell us your criteria and we’ll send a shortlist first.' })}
            </p>
            <Button variant="gold" onClick={onEnquire}>{t({ ko: '맞춤 매물 요청', en: 'Request a shortlist' })}</Button>
          </div>
        )}
      </Section>
    </>
  )
}
