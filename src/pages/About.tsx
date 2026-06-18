import { ShieldCheck, BarChart3, Zap, Rocket, Building2, Handshake, Ship, MessagesSquare } from 'lucide-react'
import { PageHero } from '../components/sections/PageHero'
import { Section, SectionHeading } from '../components/sections/Section'
import { FeatureGrid, type Feature } from '../components/sections/FeatureGrid'
import { CtaBand } from '../components/sections/CtaBand'
import { useLang, type Localized } from '../i18n/LanguageContext'

type LFeature = { icon: Feature['icon']; title: Localized<string>; desc: Localized<string> }

const VALUES: LFeature[] = [
  { icon: ShieldCheck, title: { ko: '신뢰', en: 'Trust' }, desc: { ko: '검증된 디벨로퍼와 공식 파트너만 연결합니다.', en: 'Only verified developers and official partners.' } },
  { icon: BarChart3, title: { ko: '투명', en: 'Transparency' }, desc: { ko: '실제 시세에 기반한 데이터를 제공합니다.', en: 'Real, market-based pricing data.' } },
  { icon: Zap, title: { ko: '편의', en: 'Convenience' }, desc: { ko: '매물 등록·렌트·관리를 원스톱으로 처리합니다.', en: 'Listing, rental and management in one place.' } },
  { icon: Rocket, title: { ko: '확장성', en: 'Scalability' }, desc: { ko: '다양한 투자상품과 서비스로 확장 가능한 구조입니다.', en: 'Built to expand across products and services.' } },
]

const SERVICES: LFeature[] = [
  { icon: Building2, title: { ko: '프로젝트 정보 제공', en: 'Project intelligence' }, desc: { ko: '지역·디벨로퍼별 프로젝트 정보와 투자 인사이트를 제공합니다.', en: 'Project data and investment insight by area and developer.' } },
  { icon: Handshake, title: { ko: '자산관리 파트너 매칭', en: 'Asset-management matching' }, desc: { ko: '청소·유지보수·관리업체 연결 및 평가 기능을 제공합니다.', en: 'Connect and rate cleaning, maintenance and management partners.' } },
  { icon: Ship, title: { ko: '프리미엄 투자상품', en: 'Premium investments' }, desc: { ko: '요트·번호판·상업시설 등 부가 투자 기회를 제공합니다.', en: 'Yachts, plates, commercial assets and more.' } },
  { icon: MessagesSquare, title: { ko: '커뮤니티 & 네트워킹', en: 'Community & networking' }, desc: { ko: '투자자와 전문가가 정보를 공유하는 공간입니다.', en: 'A space for investors and experts to share.' } },
]

export function About() {
  const { t } = useLang()
  return (
    <>
      <PageHero
        image="/brand/heroes/hero-island-aerial.png"
        eyebrow={t({ ko: '뷰니버스 소개', en: 'About Buniverse' })}
        title={t({ ko: '두바이 통합 투자 플랫폼', en: 'Dubai’s integrated investment platform' })}
        subtitle={t({
          ko: '부동산·프리미엄 투자상품·자산관리 파트너를 하나로 연결합니다. 단 하나의 계정으로 모든 투자 경험을.',
          en: 'One platform connecting real estate, premium assets and management partners — every investment experience in a single account.',
        })}
      />

      <Section bg="card">
        <SectionHeading
          align="center"
          eyebrow={t({ ko: '핵심 서비스', en: 'Core service' })}
          title={t({ ko: '정보 탐색부터 자산관리까지, 한곳에서', en: 'From discovery to management — all in one place' })}
          subtitle={t({
            ko: '정보 탐색, 매물 관리, 렌트, 자산관리, 투자 확장까지 투자자가 필요한 모든 과정을 한곳에서 처리할 수 있습니다.',
            en: 'Search, listings, rentals, asset management and investment growth — the whole journey, handled in one place.',
          })}
        />
      </Section>

      <Section bg="page">
        <SectionHeading eyebrow={t({ ko: '핵심 가치', en: 'Our values' })} title={t({ ko: '뷰니버스가 지키는 4가지', en: 'Four principles we hold' })} />
        <div style={{ marginTop: 36 }}>
          <FeatureGrid items={VALUES.map((v) => ({ icon: v.icon, title: t(v.title), desc: t(v.desc) }))} />
        </div>
      </Section>

      <Section bg="cream">
        <SectionHeading eyebrow={t({ ko: '주요 서비스', en: 'What we do' })} title={t({ ko: '네 가지 핵심 서비스', en: 'Four core services' })} />
        <div style={{ marginTop: 36 }}>
          <FeatureGrid items={SERVICES.map((v) => ({ icon: v.icon, title: t(v.title), desc: t(v.desc) }))} />
        </div>
      </Section>

      <CtaBand />
    </>
  )
}
