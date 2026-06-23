import type { Localized } from '../i18n/LanguageContext'

export interface NavItem {
  path: string
  label: Localized<string>
  disabled?: boolean // shown but not clickable (준비 중)
}

/** Primary navigation — V2 IA (신뢰→탐색→전환). */
export const NAV: NavItem[] = [
  { path: '/properties', label: { ko: '매물찾기', en: 'Properties' } },
  { path: '/market-data', label: { ko: '시장데이터', en: 'Market Data' } },
  { path: '/ai-center', label: { ko: 'AI 데이터센터', en: 'AI Center' }, disabled: true },
  { path: '/membership', label: { ko: '멤버십', en: 'Membership' } },
  { path: '/community', label: { ko: '커뮤니티', en: 'Community' } },
]

export const SITE = {
  name: 'BUNIVERSE',
  tagline: {
    ko: '두바이 프리미엄 부동산 비즈니스',
    en: 'Premium Real Estate & Business in Dubai',
  } as Localized<string>,
  phoneKo: '+82-10-6770-7979',
  phoneAe: '+971-56-492-3403',
  email: 'buniversekorea@gmail.com',
  poweredBy: 'Snowcube Co. Ltd.',
}

/** Shared CTA labels. */
export const CTA = {
  apply: { ko: '투어 신청', en: 'Book a tour' } as Localized<string>,
  inquiry: { ko: '온라인 문의', en: 'Enquire' } as Localized<string>,
  talk: { ko: '전문가 상담', en: 'Talk to an advisor' } as Localized<string>,
}
