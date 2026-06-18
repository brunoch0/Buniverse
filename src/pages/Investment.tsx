import { UserCog, Lock, Handshake, Scale } from 'lucide-react'
import { PageHero } from '../components/sections/PageHero'
import { Section, SectionHeading } from '../components/sections/Section'
import { FeatureGrid, type Feature } from '../components/sections/FeatureGrid'
import { ProcessSteps, type Step } from '../components/sections/ProcessSteps'
import { CtaBand } from '../components/sections/CtaBand'
import { useLang, type Localized } from '../i18n/LanguageContext'

type LFeature = { icon: Feature['icon']; title: Localized<string>; desc: Localized<string> }

const BENEFITS: LFeature[] = [
  { icon: UserCog, title: { ko: '전담 매니저 1:1 배정', en: 'Dedicated 1:1 manager' }, desc: { ko: '프리미엄 랜드마크 매물·분양권 전문 매니저가 고객 맞춤 포트폴리오를 제안합니다.', en: 'A landmark-property specialist builds a portfolio tailored to you.' } },
  { icon: Lock, title: { ko: '비공개·우선 매물', en: 'Off-market & priority' }, desc: { ko: '일반에 공개되지 않는 오프마켓 매물과 우선 분양권·선청약 기회를 제공합니다.', en: 'Off-market listings plus priority allocations and early subscriptions.' } },
  { icon: Handshake, title: { ko: '우대 조건 & 협상', en: 'Preferential terms' }, desc: { ko: '매매·임대 가격 협상을 전담하고 수수료 할인과 유리한 계약 조건을 확보합니다.', en: 'We negotiate price, secure fee discounts and favourable terms.' } },
  { icon: Scale, title: { ko: '법률·세무·소유권 지원', en: 'Legal, tax & title' }, desc: { ko: '현지 법률·세무 전문가와 연계해 안전한 소유권 이전과 문서 검증을 지원합니다.', en: 'Local legal and tax experts ensure safe title transfer and document checks.' } },
]

const PROCESS: { ko: Step; en: Step }[] = [
  { ko: { title: '즉시 상담 & 48시간 내 제안', desc: '요청 즉시 상담을 연결하고 48시간 이내 맞춤 매물 패키지를 제공합니다.' }, en: { title: 'Consult & 48-hr proposal', desc: 'Instant consultation and a tailored property package within 48 hours.' } },
  { ko: { title: '실사 & 계약 전담 지원', desc: '현장 실사, 개발사 방문, 모델하우스 투어 동행과 전자서명·계약 절차 전체를 지원합니다.' }, en: { title: 'Due diligence & contract', desc: 'Site visits, developer meetings, show-home tours and full e-signing support.' } },
  { ko: { title: '프라이빗 클로징룸 제공', desc: 'VIP 고객 전용 거래실에서 자금·문서·보안 검증까지 원스톱으로 처리합니다.' }, en: { title: 'Private closing room', desc: 'A VIP-only room handling funds, documents and security checks in one place.' } },
]

export function Investment() {
  const { t, lang } = useLang()
  return (
    <>
      <PageHero
        image="/brand/property/damac-safa-two.png"
        eyebrow={t({ ko: '부동산투자', en: 'Real Estate' })}
        title={t({ ko: 'VIP 부동산 프리미엄 서비스', en: 'VIP Real Estate Premium Service' })}
        subtitle={t({
          ko: '두바이 프라임 자산을 위한 프라이빗 전용 서비스 라인. 고급 매물 추천부터 계약·소유권 이전·사후 관리까지 원스톱으로 제공합니다.',
          en: 'A private service line for Dubai’s prime assets — from curated listings to contract, title transfer and aftercare, end-to-end.',
        })}
      />

      <Section bg="page">
        <SectionHeading eyebrow={t({ ko: '주요 혜택', en: 'Key benefits' })} title={t({ ko: 'VIP 고객만의 4가지', en: 'Four VIP advantages' })} />
        <div style={{ marginTop: 36 }}>
          <FeatureGrid items={BENEFITS.map((b) => ({ icon: b.icon, title: t(b.title), desc: t(b.desc) }))} minWidth={280} />
        </div>
      </Section>

      <Section bg="cream">
        <SectionHeading eyebrow={t({ ko: '거래 프로세스', en: 'How it works' })} title={t({ ko: '상담부터 클로징까지 3단계', en: 'From consult to close in three steps' })} />
        <div style={{ marginTop: 36 }}>
          <ProcessSteps steps={PROCESS.map((p) => (lang === 'ko' ? p.ko : p.en))} />
        </div>
      </Section>

      <CtaBand
        title={{ ko: '프라임 매물, 비공개로 먼저 받아보세요', en: 'See prime listings, privately, first' }}
        subtitle={{ ko: '전담 매니저가 48시간 내 맞춤 매물 패키지를 제공합니다.', en: 'A dedicated manager delivers a tailored package within 48 hours.' }}
      />
    </>
  )
}
