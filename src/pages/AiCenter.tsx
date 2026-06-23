import { ComingSoon } from './ComingSoon'

export function AiCenter() {
  return (
    <ComingSoon
      image="/brand/heroes/hero-isometric-district.png"
      eyebrow={{ ko: 'AI 데이터센터', en: 'AI Data Center' }}
      title={{ ko: 'AI 기반 투자 인사이트', en: 'AI-driven investment insight' }}
      subtitle={{ ko: '장단기 가치 예측과 지역 투자 성향 진단을 준비하고 있습니다.', en: 'Long/short-term value forecasts and investment-style diagnostics are on the way.' }}
      body={{
        ko: 'AI 데이터센터는 현재 준비 중입니다. 지역·예산·기간 기반의 가치 예측과 투자 성향 진단을 곧 선보일 예정입니다. 먼저 전문가 상담으로 분석을 받아보세요.',
        en: 'The AI Data Center is in preparation. Value forecasts and investor-style diagnostics by area, budget and horizon are coming soon. For now, get an expert analysis via consultation.',
      }}
    />
  )
}
