import { HeroV2 } from '../sections/HeroV2'
import { EventBanner } from '../sections/EventBanner'
import { ServiceNav } from '../sections/ServiceNav'
import { Founder } from '../sections/Founder'
import { Partners } from '../sections/Partners'
import { Process } from '../sections/Process'
import { Results } from '../sections/Results'
import { CtaBand } from '../components/sections/CtaBand'

export function Home() {
  return (
    <>
      <HeroV2 />
      <EventBanner />
      <ServiceNav />
      <Founder />
      <Partners />
      <Process />
      <Results />
      <CtaBand
        title={{ ko: '지금 바로 두바이 부동산 전문가와 상담하세요', en: 'Talk to a Dubai property expert now' }}
        subtitle={{ ko: '무료 상담부터 현장 투어까지, 첫 걸음을 함께합니다.', en: 'From a free consultation to a site tour — we start the journey with you.' }}
      />
    </>
  )
}
