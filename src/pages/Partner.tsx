import { MapPin } from 'lucide-react'
import { PageHero } from '../components/sections/PageHero'
import { Section, SectionHeading } from '../components/sections/Section'
import { Badge } from '../components/ui/Badge'
import { CtaBand } from '../components/sections/CtaBand'
import { useLang, type Localized } from '../i18n/LanguageContext'

interface Developer {
  name: string
  projects: string
  feature: Localized<string>
  regions: string
}

const DEVELOPERS: Developer[] = [
  { name: 'EMAAR Properties', projects: 'Burj Khalifa · Dubai Mall · Dubai Creek Harbour', feature: { ko: '두바이 최대 건설사, 랜드마크 프로젝트 전문', en: 'Dubai’s largest developer, landmark specialist' }, regions: 'Downtown / Creek Harbour' },
  { name: 'DAMAC Properties', projects: 'DAMAC Hills · Aykon City · Marina Residences', feature: { ko: '럭셔리 레지던스, 브랜드 협업 전문', en: 'Luxury residences and branded collaborations' }, regions: 'Marina / Business Bay' },
  { name: 'Nakheel', projects: 'Palm Jumeirah · The World Islands · Jumeirah Islands', feature: { ko: '인공섬 개발, 대형 리조트 전문', en: 'Man-made islands and large-scale resorts' }, regions: 'Palm Jumeirah' },
  { name: 'Select Group', projects: 'The Residences · Marina Gate · Downtown Views', feature: { ko: '프리미엄 고층 타워, 혁신적 디자인', en: 'Premium high-rises with innovative design' }, regions: 'Downtown / Marina' },
  { name: 'Ellington Properties', projects: 'Belgravia · DT1 · Wilton Park Residences', feature: { ko: '모던 럭셔리, 세련된 디자인 감각', en: 'Modern luxury and refined design' }, regions: 'Downtown / MBR City' },
  { name: 'Binghatti Developers', projects: 'Binghatti Gateway · Bugatti Residences', feature: { ko: '독특한 건축 디자인, 브랜드 협업', en: 'Distinctive architecture and brand tie-ups' }, regions: 'Business Bay / JVC' },
  { name: 'Danube Properties', projects: 'Glamz · Diamondz · Miraclz', feature: { ko: '합리적 가격, 실거주 투자자 선호', en: 'Accessible pricing, favoured by end-users' }, regions: 'JVC / Arjan' },
]

export function Partner() {
  const { t } = useLang()
  return (
    <>
      <PageHero
        image="/brand/heroes/hero-isometric-district.png"
        eyebrow={t({ ko: '파트너', en: 'Partners' })}
        title={t({ ko: '신뢰할 수 있는 협력사 네트워크', en: 'A trusted partner network' })}
        subtitle={t({
          ko: '뷰니버스는 두바이 현지의 검증된 파트너사들과 함께 최상의 부동산 및 라이프스타일 서비스를 제공합니다.',
          en: 'Buniverse works with verified local partners to deliver the best in property and lifestyle.',
        })}
      />

      <Section bg="page">
        <SectionHeading
          eyebrow={t({ ko: '두바이 주요 건설사', en: 'Leading developers' })}
          title={t({ ko: '함께하는 탑티어 디벨로퍼', en: 'Top-tier developers we work with' })}
        />
        <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 22 }}>
          {DEVELOPERS.map((d) => (
            <div
              key={d.name}
              style={{
                background: 'var(--surface-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: 26,
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 }}>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, letterSpacing: '-0.01em', color: 'var(--navy-900)' }}>
                  {d.name}
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.55, color: 'var(--text-body)' }}>{t(d.feature)}</p>
              <div style={{ paddingTop: 12, borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--navy-700)', lineHeight: 1.5 }}>{d.projects}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <MapPin size={15} strokeWidth={1.9} style={{ color: 'var(--gold-700)' }} />
                  <Badge tone="gold">{d.regions}</Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        title={{ ko: '검증된 파트너와 안전하게 투자하세요', en: 'Invest safely with verified partners' }}
        subtitle={{ ko: '관심 있는 디벨로퍼나 프로젝트가 있다면 바로 문의하세요.', en: 'Have a developer or project in mind? Reach out anytime.' }}
      />
    </>
  )
}
