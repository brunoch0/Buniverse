import { useEffect, useMemo, useState } from 'react'
import { PageHero } from '../components/sections/PageHero'
import { Section, SectionHeading } from '../components/sections/Section'
import { DataDisclosure } from '../components/sections/DataDisclosure'
import { useLang, type Localized } from '../i18n/LanguageContext'
import { fetchMarketAreas, fmtAed, offplanRatio, type AreaSummary } from '../lib/marketData'

export function MarketData() {
  const { t } = useLang()
  const [areas, setAreas] = useState<AreaSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState(0)

  useEffect(() => {
    let on = true
    fetchMarketAreas().then((a) => { if (on) { setAreas(a); setLoading(false) } })
    return () => { on = false }
  }, [])

  const source = useMemo(() => {
    const a = areas[0]
    return a ? { sourceName: `${a.source} · data.dubaitoday.org`, sourceUrl: a.source_url, asOfDate: a.as_of } : null
  }, [areas])

  const area = areas[active]

  const metrics: { label: Localized<string>; value: string; primary?: boolean }[] = area
    ? [
        { label: { ko: '중위 거래가', en: 'Median price' }, value: fmtAed(area.median_value_aed), primary: true },
        { label: { ko: '㎡당 가격', en: 'Price / m²' }, value: `AED ${area.price_per_sqm.toLocaleString()}` },
        { label: { ko: '월 거래 건수', en: 'Monthly deals' }, value: area.transaction_count.toLocaleString() },
        { label: { ko: '분양 비율', en: 'Off-plan share' }, value: `${offplanRatio(area)}%` },
      ]
    : []

  const byPrice = useMemo(() => [...areas].sort((a, b) => b.price_per_sqm - a.price_per_sqm), [areas])

  return (
    <>
      <PageHero
        image="/brand/heroes/hero-waterfront-panorama.png"
        height={360}
        eyebrow={t({ ko: '시장데이터', en: 'Market Data' })}
        title={t({ ko: '지역별 시세와 거래 지표', en: 'Area pricing & transaction metrics' })}
        subtitle={t({ ko: '두바이 토지청(DLD) 공식 거래 데이터를 출처·기준일과 함께 제공합니다.', en: 'Official Dubai Land Department transaction data, with source and as-of date.' })}
      />

      <Section bg="page">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '56px 24px', color: 'var(--text-muted)' }}>{t({ ko: '데이터를 불러오는 중…', en: 'Loading data…' })}</div>
        ) : !area ? (
          <div style={{ textAlign: 'center', padding: '56px 24px', color: 'var(--text-muted)' }}>{t({ ko: '데이터 준비 중입니다.', en: 'Data is being prepared.' })}</div>
        ) : (
          <>
            {/* Region selector */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
              {areas.map((a, i) => (
                <button
                  key={a.area_name}
                  onClick={() => setActive(i)}
                  style={{
                    border: '1.5px solid ' + (active === i ? 'var(--navy-700)' : 'var(--border-default)'),
                    background: active === i ? 'var(--navy-700)' : 'transparent',
                    color: active === i ? '#fff' : 'var(--navy-700)',
                    fontWeight: 600, fontSize: 13, padding: '8px 15px', borderRadius: 'var(--radius-full)', cursor: 'pointer',
                  }}
                >
                  {a.area_name}
                </button>
              ))}
            </div>

            {/* Metric cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 18 }}>
              {metrics.map((m) => (
                <div key={m.label.en} style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 22, boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>{t(m.label)}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 26, letterSpacing: '-0.02em', color: m.primary ? 'var(--gold-600)' : 'var(--navy-800)' }}>
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            {source && (
              <div style={{ marginTop: 16, padding: '12px 16px', background: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                <DataDisclosure source={source} />
              </div>
            )}
          </>
        )}
      </Section>

      {/* Comparison table */}
      {!loading && areas.length > 0 && (
        <Section bg="card">
          <SectionHeading eyebrow={t({ ko: '지역 비교', en: 'Area comparison' })} title={t({ ko: '㎡당 가격 상위 지역', en: 'Top areas by price per m²' })} />
          <div style={{ marginTop: 28, overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)', minWidth: 600 }}>
              <thead>
                <tr style={{ textAlign: 'left', color: 'var(--text-muted)', fontSize: 12.5 }}>
                  <th style={{ padding: '10px 12px', fontWeight: 600 }}>{t({ ko: '지역', en: 'Area' })}</th>
                  <th style={{ padding: '10px 12px', fontWeight: 600 }}>{t({ ko: '중위 거래가', en: 'Median' })}</th>
                  <th style={{ padding: '10px 12px', fontWeight: 600 }}>{t({ ko: '㎡당', en: '/ m²' })}</th>
                  <th style={{ padding: '10px 12px', fontWeight: 600 }}>{t({ ko: '월 거래', en: 'Deals' })}</th>
                  <th style={{ padding: '10px 12px', fontWeight: 600 }}>{t({ ko: '분양%', en: 'Off-plan' })}</th>
                </tr>
              </thead>
              <tbody>
                {byPrice.map((a) => (
                  <tr key={a.area_name} style={{ borderTop: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '12px', fontWeight: 600, color: 'var(--navy-900)' }}>{a.area_name}</td>
                    <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--navy-800)' }}>{fmtAed(a.median_value_aed)}</td>
                    <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--navy-800)' }}>{a.price_per_sqm.toLocaleString()}</td>
                    <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--navy-800)' }}>{a.transaction_count.toLocaleString()}</td>
                    <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--navy-800)' }}>{offplanRatio(a)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {source && <div style={{ marginTop: 16 }}><DataDisclosure source={source} /></div>}
        </Section>
      )}
    </>
  )
}
