import { useEffect, useState } from 'react'
import { X, CalendarDays, MapPin, ArrowRight } from 'lucide-react'
import { useLang } from '../../i18n/LanguageContext'
import { EVENT, isEventActive } from '../../config/event'

const HIDE_KEY = 'buniverse.event.popup.hideUntil' // stores a YYYY-MM-DD date

function today(): string {
  try { return new Date().toISOString().slice(0, 10) } catch { return '' }
}

export function EventPopup() {
  const { t } = useLang()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!isEventActive()) return
    const hideUntil = window.localStorage.getItem(HIDE_KEY)
    if (hideUntil && hideUntil >= today()) return
    const tid = setTimeout(() => setOpen(true), 700)
    return () => clearTimeout(tid)
  }, [])

  if (!open) return null

  const close = () => setOpen(false)
  const hideToday = () => {
    window.localStorage.setItem(HIDE_KEY, today())
    setOpen(false)
  }

  return (
    <div
      onClick={close}
      style={{
        position: 'fixed', inset: 0, zIndex: 70, background: 'rgba(12,20,48,0.6)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: 'var(--font-body)',
        animation: 'bunFade 220ms ease',
      }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ width: 'min(440px, 100%)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-xl)', position: 'relative', background: 'var(--surface-card)' }}>
        {/* Close */}
        <button onClick={close} aria-label="Close" style={{ position: 'absolute', top: 12, right: 12, zIndex: 2, border: 'none', background: 'rgba(0,0,0,0.35)', color: '#fff', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <X size={17} />
        </button>

        {EVENT.posterUrl ? (
          /* Real poster image + register button */
          <div>
            <a href={EVENT.formUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
              <img src={EVENT.posterUrl} alt={EVENT.title} style={{ width: '100%', display: 'block' }} />
            </a>
            <div style={{ padding: '16px 18px 4px', background: 'var(--surface-card)' }}>
              <a
                href={EVENT.formUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 9,
                  height: 52,
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--gold-500)',
                  color: 'var(--navy-900)',
                  fontWeight: 800,
                  fontSize: 16,
                  textDecoration: 'none',
                  boxShadow: 'var(--shadow-gold)',
                }}
              >
                {t({ ko: '참가 신청하기', en: 'Register now' })} <ArrowRight size={19} />
              </a>
            </div>
          </div>
        ) : (
          /* Branded card */
          <a href={EVENT.formUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none' }}>
            <div style={{ position: 'relative', padding: '40px 30px 30px', background: 'linear-gradient(160deg, #6d6aa0 0%, #3b3a6b 44%, #1b2a57 80%, #0c1430 100%)', color: '#fff' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 80% at 85% 120%, rgba(203,164,92,0.22), transparent 60%)' }} />
              <div style={{ position: 'relative' }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.18em', color: 'var(--gold-400)', marginBottom: 12 }}>{EVENT.brand}</div>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 34, lineHeight: 1.05, letterSpacing: '-0.02em' }}>{EVENT.title}</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 20 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 600 }}>
                    <CalendarDays size={16} style={{ color: 'var(--gold-400)' }} /> {EVENT.date}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-on-navy)' }}>
                    <MapPin size={16} style={{ color: 'var(--gold-400)' }} /> {t(EVENT.venue)}
                  </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
                  {EVENT.sessions.map((s) => (
                    <span key={s.time} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 'var(--radius-full)', background: 'rgba(255,255,255,0.1)', fontSize: 12.5, fontWeight: 600 }}>
                      {t(s.label)} <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--gold-300)' }}>{s.time}</span>
                    </span>
                  ))}
                </div>
                <div style={{ marginTop: 24, display: 'inline-flex', alignItems: 'center', gap: 9, height: 50, padding: '0 26px', borderRadius: 'var(--radius-full)', background: 'var(--gold-500)', color: 'var(--navy-900)', fontWeight: 800, fontSize: 16, boxShadow: 'var(--shadow-gold)' }}>
                  {t({ ko: '참가 신청하기', en: 'Register now' })} <ArrowRight size={18} />
                </div>
                <p style={{ margin: '16px 0 0', fontSize: 11.5, color: 'var(--text-on-navy-muted)' }}>Hosted by {EVENT.hostedBy} · Powered by {EVENT.poweredBy}</p>
              </div>
            </div>
          </a>
        )}

        {/* Footer controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', background: 'var(--surface-card)', borderTop: '1px solid var(--border-subtle)' }}>
          <button onClick={hideToday} style={{ border: 'none', background: 'transparent', color: 'var(--text-muted)', fontSize: 13, cursor: 'pointer' }}>
            {t({ ko: '오늘 하루 보지 않기', en: "Don't show today" })}
          </button>
          <button onClick={close} style={{ border: 'none', background: 'transparent', color: 'var(--navy-700)', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            {t({ ko: '닫기', en: 'Close' })}
          </button>
        </div>
      </div>
    </div>
  )
}
