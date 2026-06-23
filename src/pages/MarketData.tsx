import { useEffect, useMemo, useState } from 'react'
import { CalendarRange } from 'lucide-react'
import { PageHero } from '../components/sections/PageHero'
import { Section, SectionHeading } from '../components/sections/Section'
import { DataDisclosure } from '../components/sections/DataDisclosure'
import { MarketMap } from '../components/sections/MarketMap'
import { useLang, type Localized } from '../i18n/LanguageContext'
import { fetchMarketAreas, fmtAed, offplanRatio, type AreaSummary } from '../lib/marketData'

const fmtDate = (d: string | null) => (d ? d.replace(/-/g, '.') : '')

export function MarketData() {
  const { t } = useLang()
  const [areas, setAreas] = useState<AreaSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [activeName, setActiveName] = useState<string | null>(null)

  useEffect(() => {
    let on = true
    fetchMarketAreas().then((a) => {
      if (!on) return
      setAreas(a)
      setActiveName(a[0]?.area_name ?? null)
      setLoading(false)
    })
    return () => { on = false }
  }, [])

  const source = useMemo(() => {
    const a = areas[0]
    return a ? { sourceName: `${a.source} · data.dubaitoday.org`, sourceUrl: a.source_url, asOfDate: a.as_of } : null
  }, [areas])

  const period = areas[0]
  const area = areas.find((a) => a.area_name === activeName) ?? areas[0]

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
            {/* Transaction period */}
            {period?.period_start && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '9px 16px', borderRadius: 'var(--radius-full)', background: 'var(--navy-050)', border: '1px solid var(--border-strong)', marginBottom: 22 }}>
                <CalendarRange size={16} style={{ color: 'var(--gold-700)' }} />
                <span style={{ fontSize: 13.5, color: 'var(--navy-800)', fontWeight: 600 }}>
                  {t({ ko: '거래 기간', en: 'Transaction period' })}:{' '}
                  <span style={{ fontFamily: 'var(--font-mono)' }}>{fmtDate(period.period_start)} ~ {fmtDate(period.period_end)}</span>
                </span>
              </div>
            )}

            {/* Region selector */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
              {areas.map((a) => (
                <button
                  key={a.area_name}
                  onClick={() => setActiveName(a.area_name)}
                  style={{
                    border: '1.5px solid ' + (a.area_name === activeName ? 'var(--navy-700)' : 'var(--border-default)'),
                    background: a.area_name === activeName ? 'var(--navy-700)' : 'transparent',
                    color: a.area_name === activeName ? '#fff' : 'var(--navy-700)',
                    fontWeight: 600, fontSize: 13, padding: '8px 15px', borderRadius: 'var(--radius-full)', cursor: 'pointer',
                  }}
                >
                  {a.area_name}
                </button>
              ))}
            </div>

            {/* Map */}
            <div style={{ marginBottom: 14 }}>
              <MarketMap areas={areas} activeArea={activeName ?? undefined} onSelect={setActiveName} />
            </div>
            <p style={{ margin: '0 0 22px', fontSize: 12.5, color: 'var(--text-muted)' }}>
              {t({ ko: '지도의 원에 마우스를 올리면 지역별 데이터가 표시됩니다. 원 크기는 거래량에 비례합니다.', en: 'Hover a circle for area data. Circle size scales with transaction volume.' })}
            </p>

            {/* Metric cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 18 }}>
              {metrics.map((m) => (
                <div key={m.label.en} style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 22, boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>{t(m.label)} · {area.area_name}</div>
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
                  <tr key={a.area_name} style={{ borderTop: '1px solid var(--border-subtle)', cursor: 'pointer', background: a.area_name === activeName ? 'var(--navy-050)' : 'transparent' }} onClick={() => setActiveName(a.area_name)}>
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
