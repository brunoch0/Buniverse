import { ComingSoon } from './ComingSoon'

export function Community() {
  return (
    <ComingSoon
      image="/brand/heroes/hero-beach-skyline.png"
      eyebrow={{ ko: '커뮤니티', en: 'Community' }}
      title={{ ko: '투자자와 전문가의 네트워크', en: 'Where investors and experts meet' }}
      subtitle={{ ko: '두바이 투자 정보와 경험을 나누는 공간을 준비하고 있습니다.', en: 'A space to share Dubai investment knowledge and experience is on the way.' }}
      body={{
        ko: '커뮤니티는 현재 준비 중입니다. 투자 후기, 시장 인사이트, 렌트·매물 정보를 나누는 공간을 곧 열 예정입니다. 궁금한 점은 먼저 문의로 남겨주세요.',
        en: 'The community is in preparation. A space for investment stories, market insight and rental/listing info opens soon. For now, reach out with any questions.',
      }}
    />
  )
}
