import { useState } from 'react'
import { X, ArrowRight } from 'lucide-react'
import { useLang } from '../../i18n/LanguageContext'
import { EVENT, isEventActive } from '../../config/event'

const DISMISS_KEY = 'buniverse.event.dismissed'

export function AnnouncementBar() {
  const { t } = useLang()
  const [closed, setClosed] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem(DISMISS_KEY) === EVENT.date
  })

  if (!isEventActive() || closed) return null

  const dismiss = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    window.localStorage.setItem(DISMISS_KEY, EVENT.date)
    setClosed(true)
  }

  return (
    <div
      style={{
        background: 'var(--navy-900)',
        color: '#fff',
        fontFamily: 'var(--font-body)',
        position: 'relative',
      }}
    >
      <a
        href={EVENT.formUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          flexWrap: 'wrap',
          textDecoration: 'none',
          color: '#fff',
          padding: '9px max(44px, 5vw)',
          fontSize: 13.5,
          lineHeight: 1.4,
          textAlign: 'center',
        }}
      >
        <span style={{ fontWeight: 800, letterSpacing: '0.06em', color: 'var(--gold-400)' }}>{EVENT.brand}</span>
        <span style={{ opacity: 0.85 }}>
          {EVENT.title} · {EVENT.date} · {t(EVENT.venue)}
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontWeight: 700, color: 'var(--gold-300)' }}>
          {t({ ko: '참가 신청', en: 'Register' })} <ArrowRight size={14} />
        </span>
      </a>
      <button
        onClick={dismiss}
        aria-label="Close"
        style={{
          position: 'absolute',
          right: 'max(12px, 2vw)',
          top: '50%',
          transform: 'translateY(-50%)',
          border: 'none',
          background: 'transparent',
          color: 'rgba(255,255,255,0.7)',
          cursor: 'pointer',
          padding: 4,
          display: 'inline-flex',
        }}
      >
        <X size={16} />
      </button>
    </div>
  )
}
