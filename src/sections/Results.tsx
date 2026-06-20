import { Star } from 'lucide-react'
import { useLang, type Localized } from '../i18n/LanguageContext'

const STATS: { value: string; label: Localized<string> }[] = [
  { value: 'AED 2.4B+', label: { ko: '누적 거래 금액', en: 'Total transacted' } },
  { value: '98.6%', label: { ko: '고객 만족도', en: 'Client satisfaction' } },
  { value: '1,200+', label: { ko: '누적 계약 건수', en: 'Deals closed' } },
  { value: '47+', label: { ko: '현지 파트너사', en: 'Local partners' } },
]

const REVIEWS: { name: string; meta: Localized<string>; quote: Localized<string> }[] = [
  {
    name: '김지원',
    meta: { ko: '강남구 거주 · 2023년 투자', en: 'Seoul · invested 2023' },
    quote: {
      ko: '두바이 투자를 처음 고려할 때 막막했는데, 담당 컨설턴트가 현지 법률부터 세금 구조까지 단계별로 안내해 주었습니다. 6개월 만에 임대 계약까지 연결되어 만족스럽습니다.',
      en: 'Starting out felt daunting, but my consultant walked me through everything from local law to tax structure. Within six months I had a rental contract in place.',
    },
  },
  {
    name: '박준혁',
    meta: { ko: '분당구 거주 · 2022년 투자', en: 'Bundang · invested 2022' },
    quote: {
      ko: '매물 추천부터 계약, 사후 임대 관리까지 원스톱으로 처리해 주어서 해외에 있으면서도 걱정이 없었습니다. 수익률도 기대 이상이었어요.',
      en: 'From recommendations to contract to rental management — all handled end-to-end. Even from abroad I had nothing to worry about, and the yield beat my expectations.',
    },
  },
  {
    name: '이채린',
    meta: { ko: '마포구 거주 · 2024년 투자', en: 'Seoul · invested 2024' },
    quote: {
      ko: '시장 데이터와 AI 분석 리포트를 함께 제공받아 근거 있는 의사결정을 할 수 있었습니다. 플랫폼 자체가 신뢰감을 주는 구조로 잘 만들어져 있어요.',
      en: 'Getting market data and AI analysis together let me make decisions with real evidence. The whole platform is built to feel trustworthy.',
    },
  },
]

export function Results() {
  const { t } = useLang()
  return (
    <section style={{ padding: 'clamp(56px, 8vw, 96px) max(24px, 5vw)', background: 'var(--surface-card)', fontFamily: 'var(--font-body)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 44px' }}>
          <p style={{ margin: '0 0 10px', fontWeight: 700, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold-700)' }}>
            {t({ ko: '성과 및 고객 후기', en: 'Results & reviews' })}
          </p>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px, 3.6vw, 38px)', letterSpacing: '-0.02em', color: 'var(--navy-900)' }}>
            {t({ ko: '검증된 실적, 실제 고객의 이야기', en: 'Proven results, real client stories' })}
          </h2>
        </div>

        {/* Stat strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 24,
            padding: 'clamp(28px, 4vw, 40px)',
            background: 'var(--navy-900)',
            borderRadius: 'var(--radius-xl)',
            marginBottom: 40,
          }}
        >
          {STATS.map((s, i) => (
            <div key={s.label.en} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px, 3.4vw, 38px)', lineHeight: 1, letterSpacing: '-0.02em', color: i === 0 ? 'var(--gold-500)' : '#fff' }}>
                {s.value}
              </div>
              <div style={{ marginTop: 8, fontSize: 13, color: 'var(--text-on-navy-muted)' }}>{t(s.label)}</div>
            </div>
          ))}
        </div>

        {/* Reviews */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {REVIEWS.map((r) => (
            <div key={r.name} style={{ background: 'var(--surface-page)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 26, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', gap: 3 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="var(--gold-500)" style={{ color: 'var(--gold-500)' }} />
                ))}
              </div>
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.65, color: 'var(--text-body)' }}>“{t(r.quote)}”</p>
              <div style={{ marginTop: 'auto', paddingTop: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--navy-900)' }}>{r.name}</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{t(r.meta)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
