import { Link } from 'react-router-dom'
import { useLang, type Localized } from '../../i18n/LanguageContext'
import { SITE } from '../../config/site'

interface FooterCol {
  heading: Localized<string>
  links: { to: string; label: Localized<string> }[]
}

const COLS: FooterCol[] = [
  {
    heading: { ko: '탐색', en: 'Explore' },
    links: [
      { to: '/properties', label: { ko: '매물찾기', en: 'Properties' } },
      { to: '/projects', label: { ko: '신규 런칭', en: 'New launches' } },
      { to: '/market-data', label: { ko: '시장데이터', en: 'Market data' } },
      { to: '/ai-center', label: { ko: 'AI 데이터센터', en: 'AI center' } },
    ],
  },
  {
    heading: { ko: '멤버십·콘텐츠', en: 'Membership' },
    links: [
      { to: '/membership', label: { ko: '멤버십', en: 'Membership' } },
      { to: '/content', label: { ko: '콘텐츠센터', en: 'Content center' } },
      { to: '/community', label: { ko: '커뮤니티', en: 'Community' } },
      { to: '/tour', label: { ko: '투자투어', en: 'Investment tour' } },
    ],
  },
  {
    heading: { ko: '회사', en: 'Company' },
    links: [
      { to: '/about', label: { ko: '뷰니버스 소개', en: 'About' } },
      { to: '/partner', label: { ko: '공식 파트너', en: 'Partners' } },
      { to: '/premium', label: { ko: '프리미엄 자산', en: 'Premium assets' } },
      { to: '/admin', label: { ko: '어드민', en: 'Admin' } },
    ],
  },
]

export function SiteFooter() {
  const { t } = useLang()
  return (
    <footer style={{ background: 'var(--navy-900)', color: 'var(--text-on-navy)', padding: 'clamp(48px,7vw,72px) max(24px,5vw) 32px', fontFamily: 'var(--font-body)' }}>
      <div
        className="bun-footer-grid"
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(220px, 1.4fr) repeat(3, minmax(140px, 1fr)) minmax(180px, 1fr)',
          gap: 36,
        }}
      >
        <div>
          <img src="/brand/logo/buniverse-logo.jpg" alt={SITE.name} style={{ height: 30, filter: 'brightness(0) invert(1)', opacity: 0.95 }} />
          <p style={{ margin: '18px 0 0', fontSize: 14, lineHeight: 1.6, color: 'var(--text-on-navy-muted)', maxWidth: 280 }}>
            {t(SITE.tagline)}
            <br />
            {t({ ko: '새로운 투자의 기준을 제시합니다.', en: 'Setting a new standard for investment.' })}
          </p>
        </div>

        {COLS.map((col) => (
          <div key={col.heading.en}>
            <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-400)', marginBottom: 14 }}>{t(col.heading)}</div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} style={{ color: 'var(--text-on-navy)', textDecoration: 'none', fontSize: 14 }}>{t(l.label)}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-400)', marginBottom: 14 }}>{t({ ko: '문의하기', en: 'Contact' })}</div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
            <li style={{ color: 'var(--text-on-navy-muted)' }}>{t({ ko: '한국', en: 'Korea' })}{' '}<a href={`tel:${SITE.phoneKo}`} style={{ color: 'var(--text-on-navy)', textDecoration: 'none', fontFamily: 'var(--font-mono)' }}>{SITE.phoneKo}</a></li>
            <li style={{ color: 'var(--text-on-navy-muted)' }}>{t({ ko: '두바이', en: 'Dubai' })}{' '}<a href={`tel:${SITE.phoneAe}`} style={{ color: 'var(--text-on-navy)', textDecoration: 'none', fontFamily: 'var(--font-mono)' }}>{SITE.phoneAe}</a></li>
            <li><a href={`mailto:${SITE.email}`} style={{ color: 'var(--text-on-navy)', textDecoration: 'none' }}>{SITE.email}</a></li>
          </ul>
        </div>
      </div>

      <div style={{ maxWidth: 'var(--container-max)', margin: '44px auto 0', paddingTop: 22, borderTop: '1px solid rgba(255,255,255,0.12)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontSize: 13, color: 'var(--text-on-navy-muted)' }}>
        <span>© 2026 {SITE.name}. Powered by {SITE.poweredBy}.</span>
        <span>{t({ ko: '개인정보처리방침 · 이용약관', en: 'Privacy · Terms' })}</span>
      </div>
    </footer>
  )
}
