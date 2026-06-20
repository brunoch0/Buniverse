import { useState } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { PageHero } from '../components/sections/PageHero'
import { Section, SectionHeading } from '../components/sections/Section'
import { DataDisclosure, type Disclosure } from '../components/sections/DataDisclosure'
import { useLang, type Localized } from '../i18n/LanguageContext'

const SOURCE: Disclosure = { sourceName: 'Dubai Land Department (DLD)', sourceUrl: 'https://dubailand.gov.ae', asOfDate: '2026-05-31' }

interface AreaData {
  region: string
  medianPrice: string // AED
  pricePerSqft: string // AED/ft²
  yoy: number // %
  rentYield: string // %
  txCount: number
}

const AREAS: AreaData[] = [
  { region: 'Dubai Marina', medianPrice: 'AED 2.1M', pricePerSqft: 'AED 1,650', yoy: 8.4, rentYield: '6.8%', txCount: 1240 },
  { region: 'Downtown Dubai', medianPrice: 'AED 3.4M', pricePerSqft: 'AED 2,180', yoy: 11.2, rentYield: '5.9%', txCount: 980 },
  { region: 'Business Bay', medianPrice: 'AED 1.8M', pricePerSqft: 'AED 1,520', yoy: 6.1, rentYield: '7.2%', txCount: 1510 },
  { region: 'Palm Jumeirah', medianPrice: 'AED 9.6M', pricePerSqft: 'AED 3,050', yoy: 14.7, rentYield: '4.8%', txCount: 420 },
  { region: 'JVC', medianPrice: 'AED 0.9M', pricePerSqft: 'AED 1,180', yoy: -2.3, rentYield: '8.6%', txCount: 2030 },
]

const METRICS: { key: keyof AreaData; label: Localized<string>; isPrimary?: boolean }[] = [
  { key: 'medianPrice', label: { ko: '중위 가격', en: 'Median price' }, isPrimary: true },
  { key: 'pricePerSqft', label: { ko: 'ft²당 가격', en: 'Price / ft²' } },
  { key: 'rentYield', label: { ko: '임대 수익률', en: 'Rental yield' } },
  { key: 'txCount', label: { ko: '거래 건수(분기)', en: 'Transactions (Q)' } },
]

export function MarketData() {
  const { t } = useLang()
  const [active, setActive] = useState(0)
  const area = AREAS[active]

  return (
    <>
      <PageHero
        image="/brand/heroes/hero-waterfront-panorama.png"
        height={360}
        eyebrow={t({ ko: '시장데이터', en: 'Market Data' })}
        title={t({ ko: '지역별 시세와 투자 지표', en: 'Area pricing & investment metrics' })}
        subtitle={t({ ko: '정부·공식 출처 기반 지표를 출처·기준일과 함께 제공합니다.', en: 'Government-sourced metrics, each with source and as-of date.' })}
      />

      <Section bg="page">
        {/* Region selector */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {AREAS.map((a, i) => (
            <button
              key={a.region}
              onClick={() => setActive(i)}
              style={{
                border: '1.5px solid ' + (active === i ? 'var(--navy-700)' : 'var(--border-default)'),
                background: active === i ? 'var(--navy-700)' : 'transparent',
                color: active === i ? '#fff' : 'var(--navy-700)',
                fontWeight: 600,
                fontSize: 13,
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
              }}
            >
              {a.region}
            </button>
          ))}
        </div>

        {/* Metric cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 18 }}>
          {METRICS.map((m) => (
            <div key={m.key} style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 22, boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>{t(m.label)}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 26, letterSpacing: '-0.02em', color: m.isPrimary ? 'var(--gold-600)' : 'var(--navy-800)' }}>
                {m.key === 'txCount' ? area.txCount.toLocaleString() : (area[m.key] as string)}
              </div>
              {m.isPrimary && (
                <div style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600, color: area.yoy >= 0 ? 'var(--status-success)' : 'var(--status-danger)' }}>
                  {area.yoy >= 0 ? <TrendingUp size={15} /> : <TrendingDown size={15} />}
                  {area.yoy >= 0 ? '+' : ''}{area.yoy}% {t({ ko: '전년比', en: 'YoY' })}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 16, padding: '12px 16px', background: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
          <DataDisclosure source={SOURCE} />
        </div>
      </Section>

      {/* Comparison table */}
      <Section bg="card">
        <SectionHeading eyebrow={t({ ko: '지역 비교', en: 'Area comparison' })} title={t({ ko: 'ft²당 가격 상위 지역', en: 'Top areas by price / ft²' })} />
        <div style={{ marginTop: 28, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)', minWidth: 560 }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--text-muted)', fontSize: 12.5 }}>
                <th style={{ padding: '10px 12px', fontWeight: 600 }}>{t({ ko: '지역', en: 'Area' })}</th>
                <th style={{ padding: '10px 12px', fontWeight: 600 }}>{t({ ko: '중위 가격', en: 'Median' })}</th>
                <th style={{ padding: '10px 12px', fontWeight: 600 }}>{t({ ko: 'ft²당', en: '/ ft²' })}</th>
                <th style={{ padding: '10px 12px', fontWeight: 600 }}>{t({ ko: '수익률', en: 'Yield' })}</th>
                <th style={{ padding: '10px 12px', fontWeight: 600 }}>{t({ ko: '전년比', en: 'YoY' })}</th>
              </tr>
            </thead>
            <tbody>
              {[...AREAS].sort((a, b) => Number(b.pricePerSqft.replace(/[^\d]/g, '')) - Number(a.pricePerSqft.replace(/[^\d]/g, ''))).map((a) => (
                <tr key={a.region} style={{ borderTop: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '12px', fontWeight: 600, color: 'var(--navy-900)' }}>{a.region}</td>
                  <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontSize: 13.5, color: 'var(--navy-800)' }}>{a.medianPrice}</td>
                  <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontSize: 13.5, color: 'var(--navy-800)' }}>{a.pricePerSqft}</td>
                  <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontSize: 13.5, color: 'var(--navy-800)' }}>{a.rentYield}</td>
                  <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontSize: 13.5, fontWeight: 600, color: a.yoy >= 0 ? 'var(--status-success)' : 'var(--status-danger)' }}>{a.yoy >= 0 ? '+' : ''}{a.yoy}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 16 }}>
          <DataDisclosure source={SOURCE} />
        </div>
      </Section>
    </>
  )
}
