import type { Localized } from '../i18n/LanguageContext'

/**
 * Time-limited promo event (DAMAC roadshow).
 * Auto-hides after `activeUntil`. To remove the banner entirely, delete this
 * file's usages in Home.tsx and Layout.tsx, or set activeUntil to a past date.
 */
export const EVENT = {
  activeUntil: '2026-06-29T00:00:00+09:00', // expires after 2026-06-28 (Seoul time)
  formUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLScCRMbBgGpt4l50w-dVNqQmN0nCMyxsQCqvIK-JugVNsG_9lA/viewform?usp=send_form',
  // Poster image shown in the popup (720x1080). Empty → branded fallback card.
  posterUrl: '/brand/event/damac-roadshow.png',
  brand: 'DAMAC EXCLUSIVE ROADSHOW',
  title: 'LUXURY GATE TO DUBAI',
  date: '2026.06.28',
  venue: { ko: '소피텔 앰배서더 서울 · Bastille Room', en: 'SOFITEL Ambassador Seoul · Bastille Room' } as Localized<string>,
  sessions: [
    { label: { ko: '1부 · 오픈 로드쇼', en: 'Part 1 · Open Roadshow' } as Localized<string>, time: '12:00–14:30' },
    { label: { ko: '2부 · VIP 행사', en: 'Part 2 · VIP Event' } as Localized<string>, time: '15:00–18:00' },
  ],
  hostedBy: 'Snowcube',
  poweredBy: 'Buniverse',
}

/** True while the event promo should be shown. */
export function isEventActive(): boolean {
  try {
    return new Date() < new Date(EVENT.activeUntil)
  } catch {
    return true
  }
}
