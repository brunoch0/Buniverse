import { PageHero } from '../components/sections/PageHero'
import { Section } from '../components/sections/Section'
import { Button } from '../components/ui/Button'
import { useLang, type Localized } from '../i18n/LanguageContext'
import { useEnquiry } from '../components/layout/enquiry'

/** Branded placeholder for V2 features not yet wired to a backend. */
export function ComingSoon({
  image,
  eyebrow,
  title,
  subtitle,
  body,
}: {
  image: string
  eyebrow: Localized<string>
  title: Localized<string>
  subtitle: Localized<string>
  body: Localized<string>
}) {
  const { t } = useLang()
  const onEnquire = useEnquiry()
  return (
    <>
      <PageHero image={image} height={360} eyebrow={t(eyebrow)} title={t(title)} subtitle={t(subtitle)} />
      <Section bg="page">
        <div
          style={{
            maxWidth: 620,
            margin: '0 auto',
            textAlign: 'center',
            background: 'var(--surface-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(36px, 6vw, 56px)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--gold-100)',
              color: 'var(--gold-900)',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 18,
            }}
          >
            {t({ ko: '준비 중', en: 'Coming soon' })}
          </span>
          <h2 style={{ margin: '0 0 12px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(22px, 3vw, 28px)', letterSpacing: '-0.01em', color: 'var(--navy-900)' }}>
            {t(title)}
          </h2>
          <p style={{ margin: '0 0 28px', fontSize: 16, lineHeight: 1.7, color: 'var(--text-body)' }}>{t(body)}</p>
          <Button variant="gold" size="lg" onClick={onEnquire} iconRight={<span style={{ fontSize: 18, lineHeight: 0 }}>→</span>}>
            {t({ ko: '먼저 상담 신청하기', en: 'Request a consultation' })}
          </Button>
        </div>
      </Section>
    </>
  )
}
