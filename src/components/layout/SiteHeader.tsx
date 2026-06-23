import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button } from '../ui/Button'
import { useLang, type Localized } from '../../i18n/LanguageContext'
import { useEnquiry } from './enquiry'
import { NAV, SITE, CTA, type NavItem } from '../../config/site'
import { isEventActive } from '../../config/event'

interface DisplayNavItem extends NavItem {
  accent?: boolean
}

function LangToggle() {
  const { lang, setLang } = useLang()
  return (
    <div style={{ display: 'inline-flex', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-full)', overflow: 'hidden', fontSize: 12, fontWeight: 700 }}>
      {(['ko', 'en'] as const).map((l) => (
        <button key={l} onClick={() => setLang(l)} style={{ border: 'none', cursor: 'pointer', padding: '6px 11px', background: lang === l ? 'var(--navy-700)' : 'transparent', color: lang === l ? '#fff' : 'var(--navy-600)', fontFamily: 'var(--font-body)', letterSpacing: '0.04em' }}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

const EVENT_ITEM: DisplayNavItem = { path: '/event', label: { ko: '행사 안내', en: 'Event' } as Localized<string>, accent: true }

export function SiteHeader() {
  const { t } = useLang()
  const openEnquiry = useEnquiry()
  const [open, setOpen] = useState(false)

  const items: DisplayNavItem[] = isEventActive() ? [EVENT_ITEM, ...NAV] : [...NAV]

  const baseStyle = (isActive: boolean, accent?: boolean): React.CSSProperties => ({
    fontSize: 14,
    fontWeight: accent ? 700 : 600,
    color: accent ? 'var(--gold-700)' : isActive ? 'var(--gold-700)' : 'var(--navy-800)',
    textDecoration: 'none',
    letterSpacing: '0.01em',
    whiteSpace: 'nowrap',
  })

  const disabledStyle: React.CSSProperties = {
    fontSize: 14, fontWeight: 600, color: 'var(--text-muted)', cursor: 'default',
    display: 'inline-flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap',
  }
  const soonBadge = (
    <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--gold-700)', border: '1px solid var(--gold-300)', borderRadius: 'var(--radius-full)', padding: '1px 5px', letterSpacing: '0.02em' }}>
      준비중
    </span>
  )

  return (
    <header
      style={{
        position: 'sticky', top: 0, zIndex: 30, height: 'var(--header-height)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 max(24px, 5vw)', background: 'rgba(250,245,234,0.85)',
        backdropFilter: 'saturate(150%) blur(14px)', borderBottom: '1px solid var(--border-subtle)', fontFamily: 'var(--font-body)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 32, minWidth: 0 }}>
        <Link to="/" style={{ display: 'flex', flexShrink: 0, alignItems: 'center' }}>
          <img src="/brand/logo/buniverse-logo.jpg" alt={SITE.name} style={{ height: 46, mixBlendMode: 'multiply' }} />
        </Link>
        <nav className="bun-desktop-nav" style={{ display: 'flex', gap: 20 }}>
          {items.map((item) =>
            item.disabled ? (
              <span key={item.path} style={disabledStyle} title="준비 중">{t(item.label)} {soonBadge}</span>
            ) : (
              <NavLink key={item.path} to={item.path} style={({ isActive }) => baseStyle(isActive, item.accent)}>
                {t(item.label)}
              </NavLink>
            ),
          )}
        </nav>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div className="bun-desktop-nav"><LangToggle /></div>
        <div className="bun-desktop-nav"><Button variant="gold" size="sm" onClick={openEnquiry}>{t(CTA.inquiry)}</Button></div>
        <button aria-label="Menu" className="bun-mobile-trigger" onClick={() => setOpen((v) => !v)} style={{ display: 'none', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--navy-800)', padding: 4 }}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div style={{ position: 'absolute', top: 'var(--header-height)', left: 0, right: 0, background: 'var(--surface-card)', borderBottom: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-lg)', padding: '16px max(24px, 5vw) 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {items.map((item) =>
            item.disabled ? (
              <span key={item.path} style={{ padding: '12px 4px', fontSize: 16, fontWeight: 600, color: 'var(--text-muted)', borderBottom: '1px solid var(--border-subtle)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                {t(item.label)} {soonBadge}
              </span>
            ) : (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                style={({ isActive }) => ({ padding: '12px 4px', fontSize: 16, fontWeight: item.accent ? 700 : 600, color: item.accent ? 'var(--gold-700)' : isActive ? 'var(--gold-700)' : 'var(--navy-800)', textDecoration: 'none', borderBottom: '1px solid var(--border-subtle)' })}
              >
                {t(item.label)}
              </NavLink>
            ),
          )}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}>
            <LangToggle />
            <Button variant="gold" size="sm" onClick={() => { setOpen(false); openEnquiry() }}>{t(CTA.inquiry)}</Button>
          </div>
        </div>
      )}
    </header>
  )
}
