import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Section } from '../components/sections/Section'
import { Button } from '../components/ui/Button'
import { useLang } from '../i18n/LanguageContext'
import { EVENT, isEventActive } from '../config/event'

export function Event() {
  const { t } = useLang()
  const active = isEventActive()

  return (
    <Section bg="navy">
      <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
        {!active && (
          <p style={{ margin: '0 0 18px', fontSize: 14, color: 'var(--gold-400)', fontWeight: 600 }}>
            {t({ ko: '종료된 행사입니다.', en: 'This event has ended.' })}
          </p>
        )}

        <img
          src={EVENT.inviteUrl}
          alt={`${EVENT.brand} — ${EVENT.title}`}
          style={{ width: '100%', display: 'block', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xl)' }}
        />

        {active && (
          <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a href={EVENT.formUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <Button variant="gold" size="lg" fullWidth iconRight={<ArrowRight size={20} />}>
                {t({ ko: '참가 신청하기', en: 'Register now' })}
              </Button>
            </a>
            <p style={{ margin: 0, fontSize: 12.5, color: 'var(--text-on-navy-muted)' }}>
              {t({ ko: `${EVENT.date} · ${EVENT.hostedBy} 주최 · ${EVENT.poweredBy} 제공`, en: `${EVENT.date} · Hosted by ${EVENT.hostedBy} · Powered by ${EVENT.poweredBy}` })}
            </p>
          </div>
        )}

        <div style={{ marginTop: 24 }}>
          <Link to="/" style={{ color: 'var(--text-on-navy-muted)', textDecoration: 'none', fontSize: 13.5 }}>
            ← {t({ ko: '홈으로', en: 'Back home' })}
          </Link>
        </div>
      </div>
    </Section>
  )
}
