import { CalendarDays, MapPin, ArrowRight } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'
import { EVENT, isEventActive } from '../config/event'

export function EventBanner() {
  const { t } = useLang()
  if (!isEventActive()) return null

  return (
    <section style={{ padding: 'clamp(28px, 5vw, 48px) max(24px, 5vw)', background: 'var(--surface-cream)', fontFamily: 'var(--font-body)' }}>
      <a
        href={EVENT.formUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'block',
          textDecoration: 'none',
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          borderRadius: 'var(--radius-2xl)',
          overflow: 'hidden',
          position: 'relative',
          background: 'linear-gradient(135deg, #6d6aa0 0%, #3b3a6b 42%, #1b2a57 78%, #0c1430 100%)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {/* faint skyline glow */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 90% at 85% 120%, rgba(203,164,92,0.22), transparent 60%)' }} />

        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 28,
            padding: 'clamp(28px, 4.5vw, 48px)',
          }}
        >
          {/* Left: event info */}
          <div style={{ minWidth: 260, flex: '1 1 420px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.18em', color: 'var(--gold-400)' }}>{EVENT.brand}</span>
            </div>
            <h2
              style={{
                margin: 0,
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(28px, 4.4vw, 46px)',
                lineHeight: 1.04,
                letterSpacing: '-0.02em',
                color: '#fff',
              }}
            >
              {EVENT.title}
            </h2>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 24px', marginTop: 20 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: '#fff', fontSize: 15, fontWeight: 600 }}>
                <CalendarDays size={16} style={{ color: 'var(--gold-400)' }} /> {EVENT.date}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: 'var(--text-on-navy)', fontSize: 15 }}>
                <MapPin size={16} style={{ color: 'var(--gold-400)' }} /> {t(EVENT.venue)}
              </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 14 }}>
              {EVENT.sessions.map((s) => (
                <span key={s.time} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 13px', borderRadius: 'var(--radius-full)', background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: 13, fontWeight: 600 }}>
                  {t(s.label)} <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--gold-300)' }}>{s.time}</span>
                </span>
              ))}
            </div>

            <p style={{ margin: '18px 0 0', fontSize: 12.5, color: 'var(--text-on-navy-muted)' }}>
              Hosted by {EVENT.hostedBy} · Powered by {EVENT.poweredBy}
            </p>
          </div>

          {/* Right: CTA */}
          <div style={{ flex: '0 0 auto' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                height: 58,
                padding: '0 32px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--gold-500)',
                color: 'var(--navy-900)',
                fontWeight: 800,
                fontSize: 17,
                boxShadow: 'var(--shadow-gold)',
                whiteSpace: 'nowrap',
              }}
            >
              {t({ ko: '참가 신청하기', en: 'Register now' })}
              <ArrowRight size={20} />
            </span>
            <div style={{ marginTop: 10, textAlign: 'center', fontSize: 12, color: 'var(--text-on-navy-muted)' }}>
              {t({ ko: '6/28까지 신청 가능', en: 'Open until Jun 28' })}
            </div>
          </div>
        </div>
      </a>
    </section>
  )
}
