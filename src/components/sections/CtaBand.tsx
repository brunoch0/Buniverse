import { Button } from '../ui/Button'
import { useLang, type Localized } from '../../i18n/LanguageContext'
import { useEnquiry } from '../layout/enquiry'

/** Full-width navy call-to-action band for the bottom of content pages. */
export function CtaBand({
  title,
  subtitle,
}: {
  title?: Localized<string>
  subtitle?: Localized<string>
}) {
  const { t } = useLang()
  const onEnquire = useEnquiry()
  return (
    <section style={{ background: 'var(--navy-900)', padding: 'clamp(56px, 8vw, 88px) max(24px, 5vw)' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
        <h2
          style={{
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(26px, 3.6vw, 38px)',
            letterSpacing: '-0.02em',
            color: '#fff',
            textWrap: 'balance',
          }}
        >
          {t(title ?? { ko: '두바이 투자, 지금 시작하세요', en: 'Start your Dubai journey today' })}
        </h2>
        <p style={{ margin: '16px 0 32px', fontSize: 18, lineHeight: 1.6, color: 'var(--text-on-navy-muted)' }}>
          {t(
            subtitle ?? {
              ko: '전문 어드바이저가 당신의 투자 목표에 맞는 다음 단계를 안내합니다.',
              en: 'A dedicated advisor will guide your next step, tailored to your goals.',
            },
          )}
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="gold" size="lg" onClick={onEnquire} iconRight={<span style={{ fontSize: 18, lineHeight: 0 }}>→</span>}>
            {t({ ko: '무료 상담 신청', en: 'Talk to an advisor' })}
          </Button>
        </div>
      </div>
    </section>
  )
}
