import { Button } from '../components/ui/Button'
import { SpeechPill } from '../components/ui/SpeechPill'
import { useLang, type Localized } from '../i18n/LanguageContext'
import { useEnquiry } from '../components/layout/enquiry'

interface Pillar {
  pill: Localized<string>
  tail: 'left' | 'right'
  title: Localized<string>
  points: Localized<string>[]
  img: string
}

const PILLARS: Pillar[] = [
  {
    pill: { ko: '부동산', en: 'Real Estate' },
    tail: 'left',
    title: { ko: '인사이더와 함께하는 매매·투자', en: 'Buy, sell & invest with insiders' },
    points: [
      { ko: '분양·재판매 시장 직접 접근', en: 'Off-plan & secondary market access' },
      { ko: '비공개 오프마켓 매물 제공', en: 'Private, off-market opportunities' },
      { ko: '모기지·골든비자 구조 설계', en: 'Mortgage & golden-visa structuring' },
      { ko: '계약·소유권 이전 원스톱', en: 'End-to-end conveyancing' },
    ],
    img: '/brand/heroes/hero-beach-skyline.png',
  },
  {
    pill: { ko: '비즈니스', en: 'Business' },
    tail: 'right',
    title: { ko: '에미레이트에서 설립하고 확장', en: 'Set up & scale in the Emirates' },
    points: [
      { ko: '메인랜드·프리존 법인 설립', en: 'Mainland & free-zone company formation' },
      { ko: '은행·비자·PRO 서비스', en: 'Banking, visas & PRO services' },
      { ko: '세무 거주·홀딩 구조', en: 'Tax residency & holding structures' },
      { ko: '지속적인 기업 자문', en: 'Ongoing corporate advisory' },
    ],
    img: '/brand/heroes/hero-isometric-district.png',
  },
]

export function Services() {
  const { t } = useLang()
  const onEnquire = useEnquiry()
  return (
    <section style={{ padding: 'clamp(56px, 8vw, 96px) max(24px, 5vw)', background: 'var(--surface-card)', fontFamily: 'var(--font-body)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 48px' }}>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 40px)', letterSpacing: '-0.02em', color: 'var(--navy-900)' }}>
            {t({ ko: '두 개의 세계, 하나의 파트너', en: 'Two worlds, one partner' })}
          </h2>
          <p style={{ margin: '14px 0 0', fontSize: 18, lineHeight: 1.6, color: 'var(--text-body)' }}>
            {t({
              ko: '집을 마련하든 법인을 세우든, 뷰니버스가 두바이의 모든 과정을 처음부터 끝까지 책임집니다.',
              en: "Whether you're acquiring a home or building a company, Buniverse handles the Emirates end-to-end.",
            })}
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
          {PILLARS.map((p) => (
            <div
              key={p.pill.en}
              style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                background: 'var(--surface-card)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ position: 'relative', height: 200 }}>
                <img src={p.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: 16, left: 16 }}>
                  <SpeechPill tail={p.tail}>{t(p.pill)}</SpeechPill>
                </div>
              </div>
              <div style={{ padding: 28, display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ margin: '0 0 18px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, letterSpacing: '-0.01em', color: 'var(--navy-900)' }}>
                  {t(p.title)}
                </h3>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                  {p.points.map((pt) => (
                    <li key={pt.en} style={{ display: 'flex', gap: 11, alignItems: 'flex-start', fontSize: 15, color: 'var(--text-body)' }}>
                      <span style={{ color: 'var(--gold-600)', fontWeight: 800, lineHeight: 1.4 }}>✓</span>
                      {t(pt)}
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: 26 }}>
                  <Button variant="primary" onClick={onEnquire} iconRight={<span style={{ fontSize: 16, lineHeight: 0 }}>→</span>}>
                    {t({ ko: '전문가 상담', en: 'Talk to an advisor' })}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
