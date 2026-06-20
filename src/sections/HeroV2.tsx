import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { SpeechPill } from '../components/ui/SpeechPill'
import { useLang } from '../i18n/LanguageContext'
import { useEnquiry } from '../components/layout/enquiry'

export function HeroV2() {
  const { t } = useLang()
  const onEnquire = useEnquiry()
  const navigate = useNavigate()
  return (
    <section style={{ position: 'relative', fontFamily: 'var(--font-body)' }}>
      <div style={{ position: 'relative', minHeight: 540, overflow: 'hidden' }}>
        <img
          src="/brand/heroes/hero-sunset-skyline.png"
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(12,20,48,0.82) 0%, rgba(12,20,48,0.5) 46%, rgba(12,20,48,0.08) 78%)',
          }}
        />
        <div
          style={{
            position: 'relative',
            maxWidth: 'var(--container-max)',
            margin: '0 auto',
            padding: 'clamp(72px, 12vw, 132px) max(24px, 5vw)',
          }}
        >
          <div style={{ maxWidth: 720 }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 22 }}>
              <SpeechPill tail="left">{t({ ko: '부동산', en: 'Real Estate' })}</SpeechPill>
              <SpeechPill tail="right">{t({ ko: '비즈니스', en: 'Business' })}</SpeechPill>
            </div>
            <h1
              style={{
                margin: 0,
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(34px, 5vw, 60px)',
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                color: '#fff',
                textWrap: 'balance',
              }}
            >
              {t({
                ko: '두바이 부동산,\n검증된 전문가와\n함께 시작하세요',
                en: 'Dubai property,\nstarted with a\nverified expert',
              })
                .split('\n')
                .map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
            </h1>
            <p style={{ margin: '22px 0 34px', fontSize: 19, lineHeight: 1.6, color: 'var(--text-on-navy)', maxWidth: 520 }}>
              {t({
                ko: '현지 네트워크와 AI 데이터 분석으로 최적의 자산을 찾아드립니다.',
                en: 'Local networks and AI-driven data analysis to find the right asset for you.',
              })}
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Button variant="gold" size="lg" onClick={onEnquire} iconRight={<span style={{ fontSize: 18, lineHeight: 0 }}>→</span>}>
                {t({ ko: '무료 상담 예약하기', en: 'Book a free consultation' })}
              </Button>
              <Button variant="secondary" size="lg" onClick={() => navigate('/tour/apply')}>
                {t({ ko: '투어 신청하기', en: 'Apply for a tour' })}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
