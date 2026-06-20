import { Check } from 'lucide-react'
import { PageHero } from '../components/sections/PageHero'
import { Section, SectionHeading } from '../components/sections/Section'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { CtaBand } from '../components/sections/CtaBand'
import { useLang, type Localized } from '../i18n/LanguageContext'
import { useEnquiry } from '../components/layout/enquiry'

interface Tier {
  name: string
  tone: 'neutral' | 'gold' | 'navy'
  featured?: boolean
  tagline: Localized<string>
  audience: Localized<string>
  perks: Localized<string>[]
}

const TIERS: Tier[] = [
  {
    name: 'SILVER',
    tone: 'neutral',
    tagline: { ko: '두바이 투자를 시작하는 당신을 위한 첫걸음', en: 'Your first step into Dubai investment' },
    audience: { ko: '입문자 기본 혜택', en: 'Entry essentials' },
    perks: [
      { ko: '프로젝트 사전 정보 열람', en: 'Early project information access' },
      { ko: '부동산 매물 등록 1건 무료', en: 'One free property listing' },
      { ko: '뉴스레터 & 투자 리포트 제공', en: 'Newsletter & investment reports' },
    ],
  },
  {
    name: 'GOLD',
    tone: 'gold',
    featured: true,
    tagline: { ko: '본격적인 두바이 투자자를 위한 프리미엄', en: 'Premium for the serious investor' },
    audience: { ko: '투자자·렌트 보유자 추천', en: 'For active investors' },
    perks: [
      { ko: 'SILVER 혜택 포함', en: 'Everything in SILVER' },
      { ko: '부동산 관리 파트너 우선 매칭', en: 'Priority management-partner matching' },
      { ko: '두바이 현지 상담 우선 예약', en: 'Priority on-the-ground consultations' },
      { ko: '제휴 요트·차량 렌트 10% 할인', en: '10% off partner yacht & car rentals' },
    ],
  },
  {
    name: 'PLATINUM',
    tone: 'navy',
    tagline: { ko: '최상급 투자자를 위한 익스클루시브 서비스', en: 'Exclusive service for top investors' },
    audience: { ko: 'VIP 고객 전용', en: 'VIP only' },
    perks: [
      { ko: 'GOLD 혜택 포함', en: 'Everything in GOLD' },
      { ko: '두바이 VIP 공항 픽업 서비스', en: 'Dubai VIP airport pickup' },
      { ko: '현지 법률·세무 컨설팅 1회 무료', en: 'One free legal & tax consultation' },
      { ko: '요트·리조트 프라이빗 초대 이벤트', en: 'Private yacht & resort invitations' },
    ],
  },
]

export function Membership() {
  const { t } = useLang()
  const onEnquire = useEnquiry()
  return (
    <>
      <PageHero
        image="/brand/heroes/hero-resort-pools.png"
        eyebrow={t({ ko: '멤버십 안내', en: 'Membership' })}
        title={t({ ko: '하나의 멤버십, 두바이 라이프스타일 전부', en: 'One membership, the whole Dubai lifestyle' })}
        subtitle={t({
          ko: '두바이 부동산 투자자, 렌트 이용자, 자산 관리 고객을 위한 프리미엄 멤버십 — 부동산 서비스부터 현지 라이프스타일 혜택까지.',
          en: 'A premium programme for investors, renters and asset-management clients — from property services to on-the-ground lifestyle perks.',
        })}
      />

      <Section bg="page">
        <SectionHeading
          align="center"
          eyebrow={t({ ko: '멤버십 등급', en: 'Tiers' })}
          title={t({ ko: '나에게 맞는 등급을 선택하세요', en: 'Choose the tier that fits you' })}
        />
        <div
          style={{
            marginTop: 44,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
            alignItems: 'start',
          }}
        >
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              style={{
                background: 'var(--surface-card)',
                border: tier.featured ? '1.5px solid var(--gold-400)' : '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: tier.featured ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                padding: 30,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transform: tier.featured ? 'translateY(-8px)' : 'none',
              }}
            >
              {tier.featured && (
                <div style={{ position: 'absolute', top: 18, right: 18 }}>
                  <Badge tone="gold" solid>{t({ ko: '인기', en: 'Popular' })}</Badge>
                </div>
              )}
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 26,
                  letterSpacing: '0.04em',
                  color:
                    tier.tone === 'gold' ? 'var(--gold-700)' : tier.tone === 'navy' ? 'var(--navy-900)' : 'var(--gray-500)',
                }}
              >
                {tier.name}
              </div>
              <div style={{ marginTop: 8 }}>
                <Badge tone={tier.tone === 'gold' ? 'gold' : 'navy'}>{t(tier.audience)}</Badge>
              </div>
              <p style={{ margin: '16px 0 22px', fontSize: 15, lineHeight: 1.6, color: 'var(--text-body)', minHeight: 48 }}>
                {t(tier.tagline)}
              </p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 13, flex: 1 }}>
                {tier.perks.map((p) => (
                  <li key={p.en} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14.5, color: 'var(--text-body)' }}>
                    <Check size={18} strokeWidth={2.4} style={{ color: 'var(--gold-600)', flexShrink: 0, marginTop: 1 }} />
                    {t(p)}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 26 }}>
                <Button variant={tier.featured ? 'gold' : 'outline'} fullWidth onClick={onEnquire}>
                  {t({ ko: '가입 문의', en: 'Enquire' })}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="card">
        <SectionHeading
          align="center"
          eyebrow={t({ ko: '제휴사 혜택', en: 'Affiliate benefits' })}
          title={t({ ko: '두바이 라이프스타일 제휴 네트워크', en: 'A Dubai lifestyle partner network' })}
          subtitle={t({ ko: '멤버십 회원은 제휴 요트·차량·호텔·웰니스 서비스를 우대 조건으로 이용할 수 있습니다.', en: 'Members enjoy preferential terms across partner yacht, car, hotel and wellness services.' })}
        />
        <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
          {[
            { name: { ko: '요트·마리나', en: 'Yacht & marina' }, perk: { ko: '렌트 10% 할인', en: '10% off charters' } },
            { name: { ko: '프리미엄 차량', en: 'Premium cars' }, perk: { ko: '우선 예약·할인', en: 'Priority & discount' } },
            { name: { ko: '5성급 호텔', en: '5-star hotels' }, perk: { ko: '업그레이드 혜택', en: 'Room upgrades' } },
            { name: { ko: '웰니스·스파', en: 'Wellness & spa' }, perk: { ko: '전용 패키지', en: 'Exclusive packages' } },
            { name: { ko: '법률·세무', en: 'Legal & tax' }, perk: { ko: '상담 우대', en: 'Priority consults' } },
          ].map((a) => (
            <div key={a.name.en} style={{ background: 'var(--surface-page)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '20px 18px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: 'var(--navy-900)' }}>{t(a.name)}</div>
              <div style={{ marginTop: 6, fontSize: 12.5, color: 'var(--gold-700)', fontWeight: 600 }}>{t(a.perk)}</div>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        title={{ ko: '어떤 등급이 맞을지 고민되시나요?', en: 'Not sure which tier fits?' }}
        subtitle={{ ko: '간단한 상담으로 투자 목표에 맞는 멤버십을 추천해 드립니다.', en: 'A quick chat and we’ll recommend the right membership for your goals.' }}
      />
    </>
  )
}
