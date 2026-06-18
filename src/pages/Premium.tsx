import { Ship, Hash, Plane, Check, type LucideIcon } from 'lucide-react'
import { PageHero } from '../components/sections/PageHero'
import { Section } from '../components/sections/Section'
import { SpeechPill } from '../components/ui/SpeechPill'
import { Button } from '../components/ui/Button'
import { CtaBand } from '../components/sections/CtaBand'
import { useLang, type Localized } from '../i18n/LanguageContext'
import { useEnquiry } from '../components/layout/enquiry'

interface Service {
  icon: LucideIcon
  tag: Localized<string>
  title: Localized<string>
  intro: Localized<string>
  points: Localized<string>[]
  img: string
}

const SERVICES: Service[] = [
  {
    icon: Ship,
    tag: { ko: '요트', en: 'Yacht' },
    title: { ko: '럭셔리 요트 트레이딩', en: 'Luxury Yacht Trading' },
    intro: { ko: '프라이빗 요트 매매부터 등록·관리·이벤트까지, 최상위 고객을 위한 풀서비스 요트 컨시어지입니다.', en: 'A full-service yacht concierge — from private sale to registration, management and events.' },
    points: [
      { ko: '용도·예산·항해 스타일 맞춤 매매·리스 중개', en: 'Sale & lease matched to use, budget and style' },
      { ko: '공식 수입사 연계 등록·라이선스·보험', en: 'Official-importer registration, licensing & insurance' },
      { ko: '커스터마이즈·정기 점검·보관·운영 대행', en: 'Customisation, servicing, storage & operations' },
    ],
    img: '/brand/heroes/hero-coastline-villas.png',
  },
  {
    icon: Hash,
    tag: { ko: '번호판', en: 'Plate' },
    title: { ko: '프리미엄 번호판 서비스', en: 'Premium Number Plates' },
    intro: { ko: '희소 가치가 높은 두바이 프리미엄 번호판을 검색 → 입찰 → 등록 → 인도까지 원스톱으로 제공합니다.', en: 'Rare Dubai plates, end-to-end: search, bid, register and deliver.' },
    points: [
      { ko: '한정·희소 번호 경매 입찰 대행 및 전략 컨설팅', en: 'Auction bidding and strategy for rare numbers' },
      { ko: 'VIP 전용 스페셜 패턴 독점 중개', en: 'Exclusive brokerage of special VIP patterns' },
      { ko: '등록·양수도·법률 프로세스 완전 지원', en: 'Full registration, transfer & legal support' },
    ],
    img: '/brand/heroes/hero-sunset-skyline.png',
  },
  {
    icon: Plane,
    tag: { ko: '전용기', en: 'Jet' },
    title: { ko: '프라이빗 제트 서비스', en: 'Private Jet Services' },
    intro: { ko: '두바이에서 진행되는 프라이빗 제트의 구매·매각·등록·관리를 전문 팀이 전담하여 원스톱으로 제공합니다.', en: 'A specialist team handles jet acquisition, sale, registration and management in one place.' },
    points: [
      { ko: '신품·중고·프리미엄 전용기 매매·매각 중개', en: 'Brokerage of new, pre-owned and premium jets' },
      { ko: '등록·인증·항공 법규·세금·보험 컨설팅', en: 'Registration, certification, aviation law & tax' },
      { ko: '정비(MRO)·운항·크루·차터 운영 연계', en: 'MRO, operations, crew and charter management' },
    ],
    img: '/brand/heroes/hero-island-aerial.png',
  },
]

export function Premium() {
  const { t } = useLang()
  const onEnquire = useEnquiry()
  return (
    <>
      <PageHero
        image="/brand/heroes/hero-marina-frame.png"
        eyebrow={t({ ko: '프리미엄투자', en: 'Premium' })}
        title={t({ ko: '부동산을 넘어선 자산의 경험', en: 'Beyond property — assets as experience' })}
        subtitle={t({
          ko: '요트, 번호판, 전용기 — 최상위 고객을 위한 프리미엄 투자 컨시어지입니다.',
          en: 'Yachts, plates and private jets — a premium concierge for top-tier clients.',
        })}
      />

      {SERVICES.map((s, i) => (
        <Section key={s.tag.en} bg={i % 2 === 0 ? 'page' : 'card'}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 40,
              alignItems: 'center',
              direction: i % 2 === 1 ? 'rtl' : 'ltr',
            }}
          >
            <div style={{ direction: 'ltr' }}>
              <SpeechPill tail={i % 2 === 0 ? 'left' : 'right'}>{t(s.tag)}</SpeechPill>
              <h2
                style={{
                  margin: '18px 0 14px',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(26px, 3.4vw, 34px)',
                  letterSpacing: '-0.02em',
                  color: 'var(--navy-900)',
                }}
              >
                {t(s.title)}
              </h2>
              <p style={{ margin: '0 0 22px', fontSize: 16.5, lineHeight: 1.65, color: 'var(--text-body)' }}>{t(s.intro)}</p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 13 }}>
                {s.points.map((p) => (
                  <li key={p.en} style={{ display: 'flex', gap: 11, alignItems: 'flex-start', fontSize: 15.5, color: 'var(--text-body)' }}>
                    <Check size={19} strokeWidth={2.4} style={{ color: 'var(--gold-600)', flexShrink: 0, marginTop: 2 }} />
                    {t(p)}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 26 }}>
                <Button variant="outline" onClick={onEnquire} iconRight={<span style={{ fontSize: 16, lineHeight: 0 }}>→</span>}>
                  {t({ ko: '서비스 문의', en: 'Enquire' })}
                </Button>
              </div>
            </div>
            <div style={{ direction: 'ltr', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', minHeight: 300 }}>
              <img src={s.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        </Section>
      ))}

      <CtaBand
        title={{ ko: '원하는 자산, 뷰니버스가 찾아드립니다', en: 'Tell us the asset — we’ll source it' }}
        subtitle={{ ko: '요트·번호판·전용기, 전담 매니저가 처음부터 끝까지 함께합니다.', en: 'Yacht, plate or jet — a dedicated manager handles it end-to-end.' }}
      />
    </>
  )
}
