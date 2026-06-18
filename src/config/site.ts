import type { Localized } from '../i18n/LanguageContext'

export interface NavItem {
  path: string
  label: Localized<string>
}

/** Primary navigation — mirrors the original buniverse.ae menu. */
export const NAV: NavItem[] = [
  { path: '/about', label: { ko: '뷰니버스 소개', en: 'About' } },
  { path: '/membership', label: { ko: '멤버십', en: 'Membership' } },
  { path: '/tour', label: { ko: '투자투어', en: 'Tour' } },
  { path: '/investment', label: { ko: '부동산투자', en: 'Real Estate' } },
  { path: '/premium', label: { ko: '프리미엄투자', en: 'Premium' } },
  { path: '/partner', label: { ko: '파트너', en: 'Partners' } },
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
