import { useLang, type Localized } from '../i18n/LanguageContext'

const STEPS: { title: Localized<string>; desc: Localized<string> }[] = [
  { title: { ko: '초기 상담', en: 'Consultation' }, desc: { ko: '니즈 파악 및 투자 목표 설정', en: 'Understand needs and set investment goals' } },
  { title: { ko: '매물 선별', en: 'Curation' }, desc: { ko: 'AI 분석 기반 맞춤 매물 제안', en: 'AI-driven, tailored property shortlist' } },
  { title: { ko: '현장 투어', en: 'Site tour' }, desc: { ko: '현지 동행 투어 및 실사 지원', en: 'Guided on-site tours and due diligence' } },
  { title: { ko: '계약 지원', en: 'Contract' }, desc: { ko: '법무·금융 전문가 연계 계약 진행', en: 'Contracting with legal & finance experts' } },
  { title: { ko: '등기·소유권', en: 'Title transfer' }, desc: { ko: '두바이 부동산청(DLD) 기준 소유권 등기', en: 'Ownership registration per Dubai Land Department' } },
  { title: { ko: '사후 관리', en: 'Aftercare' }, desc: { ko: '임대 운영 및 자산 관리 서비스', en: 'Rental operations and asset management' } },
]

export function Process() {
  const { t } = useLang()
  return (
    <section style={{ padding: 'clamp(56px, 8vw, 96px) max(24px, 5vw)', background: 'var(--surface-cream)', fontFamily: 'var(--font-body)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 44px' }}>
          <p style={{ margin: '0 0 10px', fontWeight: 700, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold-700)' }}>
            {t({ ko: '서비스 프로세스', en: 'How it works' })}
          </p>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px, 3.6vw, 38px)', letterSpacing: '-0.02em', color: 'var(--navy-900)' }}>
            {t({ ko: '상담부터 사후관리까지, 6단계 원스톱', en: 'One-stop, six steps — consult to aftercare' })}
          </h2>
          <p style={{ margin: '14px 0 0', fontSize: 17, lineHeight: 1.6, color: 'var(--text-body)' }}>
            {t({ ko: '계약 전 단계까지 별도 수수료 없이 무료로 안내드립니다.', en: 'Everything up to contract is guided free of charge.' })}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {STEPS.map((s, i) => (
            <div
              key={s.title.en}
              style={{
                background: 'var(--surface-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '26px 24px',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--navy-900)',
                    color: 'var(--gold-400)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    fontSize: 15,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--navy-900)' }}>{t(s.title)}</h3>
              </div>
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.55, color: 'var(--text-body)' }}>{t(s.desc)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
