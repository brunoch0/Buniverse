import { Link } from 'react-router-dom'
import { useLang } from '../../i18n/LanguageContext'
import { NAV, SITE } from '../../config/site'

export function SiteFooter() {
  const { t } = useLang()
  return (
    <footer
      style={{
        background: 'var(--navy-900)',
        color: 'var(--text-on-navy)',
        padding: 'clamp(48px,7vw,72px) max(24px,5vw) 32px',
        fontFamily: 'var(--font-body)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(240px, 1.4fr) repeat(2, minmax(160px, 1fr))',
          gap: 40,
        }}
      >
        <div>
          <img
            src="/brand/logo/buniverse-logo.jpg"
            alt={SITE.name}
            style={{ height: 30, filter: 'brightness(0) invert(1)', opacity: 0.95 }}
          />
          <p style={{ margin: '18px 0 0', fontSize: 14, lineHeight: 1.6, color: 'var(--text-on-navy-muted)', maxWidth: 300 }}>
            {t(SITE.tagline)}
            <br />
            {t({ ko: '새로운 투자의 기준을 제시합니다.', en: 'Setting a new standard for investment.' })}
          </p>
        </div>

        <div>
          <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-400)', marginBottom: 14 }}>
            {t({ ko: '바로가기', en: 'Explore' })}
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {NAV.map((item) => (
              <li key={item.path}>
                <Link to={item.path} style={{ color: 'var(--text-on-navy)', textDecoration: 'none', fontSize: 14 }}>
                  {t(item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-400)', marginBottom: 14 }}>
            {t({ ko: '문의하기', en: 'Contact' })}
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
            <li style={{ color: 'var(--text-on-navy-muted)' }}>
              {t({ ko: '한국', en: 'Korea' })}{' '}
              <a href={`tel:${SITE.phoneKo}`} style={{ color: 'var(--text-on-navy)', textDecoration: 'none', fontFamily: 'var(--font-mono)' }}>
                {SITE.phoneKo}
              </a>
            </li>
            <li style={{ color: 'var(--text-on-navy-muted)' }}>
              {t({ ko: '두바이', en: 'Dubai' })}{' '}
              <a href={`tel:${SITE.phoneAe}`} style={{ color: 'var(--text-on-navy)', textDecoration: 'none', fontFamily: 'var(--font-mono)' }}>
                {SITE.phoneAe}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} style={{ color: 'var(--text-on-navy)', textDecoration: 'none' }}>
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        style={{
          maxWidth: 'var(--container-max)',
          margin: '44px auto 0',
          paddingTop: 22,
          borderTop: '1px solid rgba(255,255,255,0.12)',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          fontSize: 13,
          color: 'var(--text-on-navy-muted)',
        }}
      >
        <span>© 2026 {SITE.name}. Powered by {SITE.poweredBy}.</span>
        <span>{t({ ko: '개인정보처리방침 · 이용약관', en: 'Privacy · Terms' })}</span>
      </div>
    </footer>
  )
}
