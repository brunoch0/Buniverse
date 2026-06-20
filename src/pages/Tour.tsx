import { useNavigate } from 'react-router-dom'
import { Target, Users, Sparkles, Plane, Check } from 'lucide-react'
import { PageHero } from '../components/sections/PageHero'
import { Section, SectionHeading } from '../components/sections/Section'
import { FeatureGrid, type Feature } from '../components/sections/FeatureGrid'
import { Button } from '../components/ui/Button'
import { CtaBand } from '../components/sections/CtaBand'
import { useLang, type Localized } from '../i18n/LanguageContext'

type LFeature = { icon: Feature['icon']; title: Localized<string>; desc: Localized<string> }

const GOALS: LFeature[] = [
  { icon: Target, title: { ko: '고수익 투자 발굴', en: 'High-yield discovery' }, desc: { ko: '높은 수익 잠재력을 지닌 최적의 부동산·비즈니스를 발굴하고 고객별 맞춤 자금 계획을 수립합니다.', en: 'Sourcing high-potential property and business, with a funding plan tailored to you.' } },
  { icon: Users, title: { ko: '폭넓은 투자 대상', en: 'Everyone welcome' }, desc: { ko: '해외 부동산 투자 초보부터 초고액 자산가, 개인·법인 투자자 모두 환영합니다.', en: 'From first-time overseas investors to UHNW individuals and corporates.' } },
  { icon: Sparkles, title: { ko: '새로운 시작 지원', en: 'A fresh start' }, desc: { ko: '새로운 비전과 출발이 필요한 모든 분들을 위한 기회를 제공합니다.', en: 'An opportunity for anyone ready for a new vision and a new beginning.' } },
]

const FEATURES: Localized<string>[] = [
  { ko: '100% 현지 전문가 그룹이 직접 진행하는 신뢰할 수 있는 투어', en: 'Led 100% by trusted on-the-ground local experts' },
  { ko: '탑티어 개발사와 직접 미팅 및 레어 유닛 우선 제공', en: 'Direct meetings with top-tier developers and priority on rare units' },
  { ko: '세종 회계법인 컨설팅 및 법률·세무 상담 지원', en: 'Accounting, legal and tax consulting support' },
  { ko: '프라이빗 전용기 투어·골든비자 할인·멤버십 카드 제공', en: 'Private-jet touring, golden-visa discounts and a membership card' },
]

const ITINERARY: { day: Localized<string>; items: Localized<string>[] }[] = [
  {
    day: { ko: '1일차', en: 'Day 1' },
    items: [
      { ko: '인천 출발 및 두바이 도착', en: 'Depart Incheon, arrive in Dubai' },
      { ko: '호텔 체크인 및 휴식', en: 'Hotel check-in and rest' },
    ],
  },
  {
    day: { ko: '2일차', en: 'Day 2' },
    items: [
      { ko: '두바이 시티투어 — 두바이 프레임, 주메이라 해변, 팜 주메이라', en: 'City tour — Dubai Frame, Jumeirah Beach, Palm Jumeirah' },
      { ko: '부동산 시장 & 정책 오리엔테이션', en: 'Property market & policy orientation' },
      { ko: '프리미엄 프로젝트 현장 방문', en: 'Premium project site visits' },
    ],
  },
  {
    day: { ko: '3일차', en: 'Day 3' },
    items: [
      { ko: '주요 개발사 프리젠테이션 및 모델하우스 투어', en: 'Developer presentations and show-home tours' },
      { ko: '투자유망지역(다운타운·마리나·JVC) 현장실사', en: 'On-site review of prime areas (Downtown, Marina, JVC)' },
      { ko: '투자 실무 Q&A / 네트워킹', en: 'Practical investment Q&A and networking' },
    ],
  },
  {
    day: { ko: '4일차', en: 'Day 4' },
    items: [
      { ko: '프리미엄 프로젝트 심화 컨설팅', en: 'In-depth consulting on premium projects' },
      { ko: '실제 거래 현장체험 및 매매 계약 안내', en: 'Live deal experience and contract guidance' },
      { ko: '자유 일정 (쇼핑·레저)', en: 'Free time (shopping, leisure)' },
    ],
  },
  {
    day: { ko: '5일차', en: 'Day 5' },
    items: [{ ko: '체크아웃 및 두바이 출발', en: 'Check out and depart Dubai' }],
  },
  {
    day: { ko: '6일차', en: 'Day 6' },
    items: [{ ko: '인천공항 도착', en: 'Arrive at Incheon Airport' }],
  },
]

export function Tour() {
  const { t } = useLang()
  const navigate = useNavigate()
  return (
    <>
      <PageHero
        image="/brand/heroes/hero-waterfront-panorama.png"
        eyebrow={t({ ko: '투자투어', en: 'Investment Tour' })}
        title={t({ ko: '두바이 부동산 투자 탐방 프로그램', en: 'A guided Dubai investment tour' })}
        subtitle={t({
          ko: '두바이 비즈니스 전문가, 탑급 컨설턴트, 탑티어 개발사와의 직접 네트워킹으로 압축된 시간 안에 최고의 투자 의사결정을 지원합니다.',
          en: 'Direct networking with Dubai business experts, top consultants and tier-one developers — the best decisions, in a focused window of time.',
        })}
      >
        <Button variant="gold" size="lg" onClick={() => navigate('/tour/apply')} iconRight={<span style={{ fontSize: 18, lineHeight: 0 }}>→</span>}>
          {t({ ko: '투어 신청하기', en: 'Book a tour' })}
        </Button>
      </PageHero>

      <Section bg="page">
        <SectionHeading eyebrow={t({ ko: '프로그램 목표', en: 'Programme goals' })} title={t({ ko: '투어가 만드는 결과', en: 'What the tour delivers' })} />
        <div style={{ marginTop: 36 }}>
          <FeatureGrid items={GOALS.map((g) => ({ icon: g.icon, title: t(g.title), desc: t(g.desc) }))} minWidth={300} />
        </div>
      </Section>

      <Section bg="card">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, alignItems: 'center' }}>
          <div>
            <SectionHeading eyebrow={t({ ko: '차별화된 특징', en: 'What sets it apart' })} title={t({ ko: '왜 뷰니버스 투어인가', en: 'Why the Buniverse tour' })} />
            <ul style={{ listStyle: 'none', margin: '28px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {FEATURES.map((f) => (
                <li key={f.en} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 16, lineHeight: 1.55, color: 'var(--text-body)' }}>
                  <Check size={20} strokeWidth={2.4} style={{ color: 'var(--gold-600)', flexShrink: 0, marginTop: 2 }} />
                  {t(f)}
                </li>
              ))}
            </ul>
          </div>
          <div
            style={{
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
              position: 'relative',
              minHeight: 320,
            }}
          >
            <img src="/brand/heroes/hero-marina-frame.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(12,20,48,0) 40%, rgba(12,20,48,0.82) 100%)' }} />
            <div style={{ position: 'absolute', left: 24, bottom: 22, display: 'inline-flex', alignItems: 'center', gap: 10, color: '#fff' }}>
              <Plane size={20} strokeWidth={1.75} style={{ color: 'var(--gold-400)' }} />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20 }}>
                {t({ ko: '4박 6일 프리미엄 일정', en: '6-day premium itinerary' })}
              </span>
            </div>
          </div>
        </div>
      </Section>

      <Section bg="page">
        <SectionHeading
          eyebrow={t({ ko: '투어 일정', en: 'Itinerary' })}
          title={t({ ko: '4박 6일, 압축적이고 체계적인 일정', en: '6 days, focused and structured' })}
          subtitle={t({
            ko: '부동산 투자 인사이트와 네트워킹이 결합된 뷰니버스 투어 일정입니다.',
            en: 'A Buniverse itinerary that pairs investment insight with networking.',
          })}
        />
        <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 0 }}>
          {ITINERARY.map((d, i) => (
            <div
              key={d.day.en}
              style={{
                display: 'grid',
                gridTemplateColumns: '100px 1fr',
                gap: 24,
                padding: '24px 0',
                borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 20,
                  color: 'var(--gold-700)',
                  letterSpacing: '-0.01em',
                }}
              >
                {t(d.day)}
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {d.items.map((it) => (
                  <li key={it.en} style={{ display: 'flex', gap: 11, alignItems: 'flex-start', fontSize: 15.5, lineHeight: 1.5, color: 'var(--text-body)' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold-500)', marginTop: 8, flexShrink: 0 }} />
                    {t(it)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        title={{ ko: '다음 투어에 함께하세요', en: 'Join the next tour' }}
        subtitle={{ ko: '일정과 참가 조건을 안내해 드립니다. 부담 없이 문의하세요.', en: 'We’ll share dates and details — reach out, no obligation.' }}
      />
    </>
  )
}
