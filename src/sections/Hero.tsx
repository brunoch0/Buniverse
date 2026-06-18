import { Button } from '../components/ui/Button'
import { SpeechPill } from '../components/ui/SpeechPill'
import { useLang } from '../i18n/LanguageContext'
import { useEnquiry } from '../components/layout/enquiry'

const STATS: { value: string; label: { ko: string; en: string }; accent: boolean }[] = [
  { value: 'AED 4B+', label: { ko: '누적 거래액', en: 'Property transacted' }, accent: true },
  { value: '1,200+', label: { ko: '자문 고객', en: 'Clients advised' }, accent: false },
  { value: '12 yrs', label: { ko: '두바이 현지 경력', en: 'On the ground in Dubai' }, accent: false },
  { value: '48 hrs', label: { ko: '평균 법인 설립', en: 'Avg. company setup' }, accent: false },
]

export function Hero() {
  const { t } = useLang()
  const onEnquire = useEnquiry()
  return (
    <section style={{ position: 'relative', fontFamily: 'var(--font-body)' }}>
      <div style={{ position: 'relative', height: 560, overflow: 'hidden' }}>
        <img src="/brand/heroes/hero-sunset-skyline.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(12,20,48,0.78) 0%, rgba(12,20,48,0.42) 42%, rgba(12,20,48,0) 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 max(24px, 5vw)',
            maxWidth: 760,
          }}
        >
          <div style={{ display: 'flex', gap: 12, marginBottom: 22 }}>
            <SpeechPill tail="left">{t({ ko: '부동산', en: 'Real Estate' })}</SpeechPill>
            <SpeechPill tail="right">{t({ ko: '비즈니스', en: 'Business' })}</SpeechPill>
          </div>
          <h1
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(36px, 5vw, 62px)',
              lineHeight: 1.06,
              letterSpacing: '-0.03em',
              color: '#fff',
              textWrap: 'balance',
            }}
          >
            {t({ ko: '두바이, 당신의 주소가 되다.', en: 'Own your address\nin Dubai.' })
              .split('\n')
              .map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
          </h1>
          <p style={{ margin: '20px 0 32px', fontSize: 19, lineHeight: 1.6, color: 'var(--text-on-navy)', maxWidth: 500 }}>
            {t({
              ko: '두바이 프리미엄 부동산과 법인 설립을 함께하는 부티크 파트너 — 분양 타워부터 운영 법인까지.',
              en: 'A boutique partner for luxury property and business setup in the Emirates — from off-plan towers to operating companies.',
            })}
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Button variant="gold" size="lg" onClick={onEnquire} iconRight={<span style={{ fontSize: 18, lineHeight: 0 }}>→</span>}>
              {t({ ko: '프라이빗 투어 신청', en: 'Book a private viewing' })}
            </Button>
            <Button variant="secondary" size="lg">
              {t({ ko: '매물 둘러보기', en: 'Explore listings' })}
            </Button>
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          gap: 'clamp(28px, 5vw, 64px)',
          flexWrap: 'wrap',
          padding: '26px max(24px, 5vw)',
          background: 'var(--navy-900)',
        }}
      >
        {STATS.map((s) => (
          <div key={s.value} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 40,
                lineHeight: 1,
                letterSpacing: '-0.03em',
                color: s.accent ? 'var(--gold-500)' : '#fff',
              }}
            >
              {s.value}
            </span>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-on-navy-muted)' }}>{t(s.label)}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
