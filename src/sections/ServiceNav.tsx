import { Link } from 'react-router-dom'
import { Search, LineChart, Sparkles, Crown, type LucideIcon } from 'lucide-react'
import { useLang, type Localized } from '../i18n/LanguageContext'

interface ServiceCard {
  to: string
  icon: LucideIcon
  image: string
  title: Localized<string>
  desc: Localized<string>
}

const CARDS: ServiceCard[] = [
  {
    to: '/properties',
    icon: Search,
    image: '/brand/heroes/hero-coastline-villas.png',
    title: { ko: '매물 찾기', en: 'Find properties' },
    desc: { ko: '두바이 전역 검증 매물을 검색하고 비교하세요.', en: 'Search and compare verified listings across Dubai.' },
  },
  {
    to: '/market-data',
    icon: LineChart,
    image: '/brand/heroes/hero-waterfront-panorama.png',
    title: { ko: '시장 데이터', en: 'Market data' },
    desc: { ko: '최신 가격 동향과 투자 지표를 확인하세요.', en: 'Track the latest price trends and investment metrics.' },
  },
  {
    to: '/ai-center',
    icon: Sparkles,
    image: '/brand/heroes/hero-isometric-district.png',
    title: { ko: 'AI 데이터센터', en: 'AI data center' },
    desc: { ko: 'AI 분석 기반의 투자 인사이트를 제공합니다.', en: 'Investment insight powered by AI analysis.' },
  },
  {
    to: '/membership',
    icon: Crown,
    image: '/brand/heroes/hero-resort-pools.png',
    title: { ko: '멤버십·콘텐츠', en: 'Membership' },
    desc: { ko: '프리미엄 리포트와 독점 콘텐츠를 이용하세요.', en: 'Premium reports and exclusive content.' },
  },
]

export function ServiceNav() {
  const { t } = useLang()
  return (
    <section style={{ padding: 'clamp(48px, 7vw, 80px) max(24px, 5vw)', background: 'var(--surface-page)', fontFamily: 'var(--font-body)' }}>
      <div
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 22,
        }}
      >
        {CARDS.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            style={{
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              background: 'var(--surface-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div style={{ position: 'relative', height: 150, overflow: 'hidden' }}>
              <img src={c.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <span
                style={{
                  position: 'absolute',
                  left: 16,
                  bottom: 16,
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--gold-500)',
                  color: 'var(--navy-900)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-gold)',
                }}
              >
                <c.icon size={22} strokeWidth={2} />
              </span>
            </div>
            <div style={{ padding: '20px 22px 24px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--navy-900)', letterSpacing: '-0.01em' }}>
                  {t(c.title)}
                </h3>
                <span style={{ color: 'var(--gold-600)', fontSize: 16 }}>→</span>
              </div>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: 'var(--text-body)' }}>{t(c.desc)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
