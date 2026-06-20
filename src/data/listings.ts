import type { Localized } from '../i18n/LanguageContext'

export type ListingType = 'sale' | 'rent' | 'offplan' | 'investment'

export interface Listing {
  id: string
  type: ListingType
  image: string
  gallery: string[]
  title: string
  location: string
  community: string
  developer?: string
  price: string
  priceNote: string
  beds?: number
  baths?: number
  area: string
  badges: string[]
  summary: Localized<string>
  highlights: Localized<string>[]
}

export const LISTING_TYPES: { key: ListingType; label: Localized<string> }[] = [
  { key: 'sale', label: { ko: '매매', en: 'Sale' } },
  { key: 'rent', label: { ko: '임대', en: 'Rent' } },
  { key: 'offplan', label: { ko: '분양', en: 'Off-plan' } },
  { key: 'investment', label: { ko: '투자매물', en: 'Investment' } },
]

const HEROES = [
  '/brand/heroes/hero-coastline-villas.png',
  '/brand/heroes/hero-resort-pools.png',
  '/brand/heroes/hero-marina-frame.png',
  '/brand/heroes/hero-island-aerial.png',
  '/brand/heroes/hero-waterfront-panorama.png',
  '/brand/heroes/hero-beach-skyline.png',
  '/brand/heroes/hero-isometric-district.png',
  '/brand/heroes/hero-sunset-skyline.png',
]

export const LISTINGS: Listing[] = [
  {
    id: 'palm-signature-villa', type: 'sale', image: '/brand/heroes/hero-coastline-villas.png',
    gallery: [HEROES[0], HEROES[1], HEROES[4]],
    title: 'Palm Signature Villa', location: 'Palm Jumeirah', community: 'Palm Jumeirah', developer: 'Nakheel',
    price: 'AED 32.0M', priceNote: '· freehold', beds: 5, baths: 6, area: '8,200 ft²', badges: ['추천', 'Beachfront'],
    summary: { ko: '팜 주메이라 해변에 자리한 프라이빗 시그니처 빌라.', en: 'A private signature villa on the Palm Jumeirah shoreline.' },
    highlights: [
      { ko: '프라이빗 비치 액세스 및 전용 풀', en: 'Private beach access and pool' },
      { ko: '프리홀드 소유권 (외국인 소유 가능)', en: 'Freehold ownership (foreign-owned)' },
      { ko: '스마트홈 시스템 및 마이드룸', en: 'Smart-home system and maid’s room' },
    ],
  },
  {
    id: 'safa-two-sky', type: 'offplan', image: '/brand/property/damac-safa-two.png',
    gallery: ['/brand/property/damac-safa-two.png', HEROES[7], HEROES[2]],
    title: 'Safa Two — Sky Collection', location: 'Business Bay', community: 'Business Bay', developer: 'DAMAC',
    price: 'AED 2.4M', priceNote: '· from', beds: 1, baths: 2, area: '740 ft²', badges: ['신규', 'Off-plan'],
    summary: { ko: 'de GRISOGONO와 협업한 비즈니스베이 랜드마크 분양.', en: 'A Business Bay landmark launch in collaboration with de GRISOGONO.' },
    highlights: [
      { ko: '핸드오버 2027년 Q4 예정', en: 'Handover expected Q4 2027' },
      { ko: '분할 납부 플랜 제공', en: 'Flexible payment plan' },
      { ko: '인피니티 풀·스카이 라운지', en: 'Infinity pool and sky lounge' },
    ],
  },
  {
    id: 'beach-estate-residence', type: 'sale', image: '/brand/heroes/hero-resort-pools.png',
    gallery: [HEROES[1], HEROES[0], HEROES[4]],
    title: 'Beach Estate Residence', location: 'Jumeirah Bay Island', community: 'Jumeirah Bay', developer: 'Meraas',
    price: 'AED 48.0M', priceNote: '· freehold', beds: 6, baths: 7, area: '11,400 ft²', badges: ['추천', 'Private pool'],
    summary: { ko: '주메이라 베이 아일랜드의 초프리미엄 비치 에스테이트.', en: 'An ultra-prime beach estate on Jumeirah Bay Island.' },
    highlights: [
      { ko: '전용 해변과 보트 무어링', en: 'Private beach and boat mooring' },
      { ko: '홈 시네마·체육관·스파', en: 'Home cinema, gym and spa' },
      { ko: '24시간 보안 게이티드 커뮤니티', en: '24/7 secured gated community' },
    ],
  },
  {
    id: 'marina-frame-apartment', type: 'rent', image: '/brand/heroes/hero-marina-frame.png',
    gallery: [HEROES[2], HEROES[7], HEROES[4]],
    title: 'Marina Frame Apartment', location: 'Dubai Marina', community: 'Dubai Marina', developer: 'Emaar',
    price: 'AED 180K', priceNote: '· /yr', beds: 2, baths: 3, area: '1,420 ft²', badges: ['임대'],
    summary: { ko: '두바이 마리나 전망의 풀옵션 임대 아파트.', en: 'A fully-furnished rental with Dubai Marina views.' },
    highlights: [
      { ko: '풀옵션 가구·가전 포함', en: 'Fully furnished, appliances included' },
      { ko: '연 단위 계약, 4회 분납 가능', en: 'Annual lease, payable in 4 cheques' },
      { ko: '수영장·짐·발렛 파킹', en: 'Pool, gym and valet parking' },
    ],
  },
  {
    id: 'downtown-retail-unit', type: 'investment', image: '/brand/heroes/hero-isometric-district.png',
    gallery: [HEROES[6], HEROES[7], HEROES[5]],
    title: 'Downtown Retail Unit', location: 'Downtown Dubai', community: 'Downtown', developer: 'Emaar',
    price: 'AED 7.6M', priceNote: '· 8.2% yield', area: '2,050 ft²', badges: ['인기', 'Commercial'],
    summary: { ko: '안정적 임차인이 입점한 다운타운 상가 투자매물.', en: 'A Downtown retail unit with a stable anchor tenant.' },
    highlights: [
      { ko: '예상 순수익률 8.2%', en: 'Projected net yield 8.2%' },
      { ko: '장기 임대 계약 보유', en: 'Long-term lease in place' },
      { ko: '두바이 몰 도보권', en: 'Walking distance to Dubai Mall' },
    ],
  },
  {
    id: 'the-world-island-villa', type: 'offplan', image: '/brand/heroes/hero-island-aerial.png',
    gallery: [HEROES[3], HEROES[0], HEROES[1]],
    title: 'The World — Island Villa', location: 'The World Islands', community: 'The World', developer: 'Kleindienst',
    price: 'AED 120M', priceNote: '· bespoke', beds: 8, baths: 10, area: '24,000 ft²', badges: ['신규'],
    summary: { ko: '더 월드 아일랜드의 비스포크 프라이빗 아일랜드 빌라.', en: 'A bespoke private-island villa on The World Islands.' },
    highlights: [
      { ko: '전용 섬·헬리패드 옵션', en: 'Private island with optional helipad' },
      { ko: '맞춤 설계 및 인테리어', en: 'Bespoke design and interiors' },
      { ko: '전담 컨시어지·요트 정박', en: 'Dedicated concierge and yacht berth' },
    ],
  },
  {
    id: 'downtown-sky-residence', type: 'rent', image: '/brand/heroes/hero-waterfront-panorama.png',
    gallery: [HEROES[4], HEROES[7], HEROES[2]],
    title: 'Downtown Sky Residence', location: 'Downtown Dubai', community: 'Downtown', developer: 'Emaar',
    price: 'AED 240K', priceNote: '· /yr', beds: 3, baths: 4, area: '1,860 ft²', badges: ['임대'],
    summary: { ko: '부르즈 칼리파 전망의 다운타운 고층 임대.', en: 'A high-floor Downtown rental with Burj Khalifa views.' },
    highlights: [
      { ko: '부르즈 칼리파·분수 전망', en: 'Burj Khalifa and fountain views' },
      { ko: '풀옵션·발코니 2개', en: 'Furnished with two balconies' },
      { ko: '두바이 몰 직접 연결', en: 'Direct link to Dubai Mall' },
    ],
  },
  {
    id: 'jvc-serviced-office', type: 'investment', image: '/brand/heroes/hero-beach-skyline.png',
    gallery: [HEROES[5], HEROES[6], HEROES[7]],
    title: 'JVC Serviced Office', location: 'Jumeirah Village Circle', community: 'JVC', developer: 'Nakheel',
    price: 'AED 1.9M', priceNote: '· 9.1% yield', area: '1,100 ft²', badges: ['투자', 'Office'],
    summary: { ko: '높은 임대 수익률의 JVC 서비스드 오피스.', en: 'A high-yield serviced office in JVC.' },
    highlights: [
      { ko: '예상 순수익률 9.1%', en: 'Projected net yield 9.1%' },
      { ko: '프리존 라이센스 연계 가능', en: 'Free-zone licence pairing available' },
      { ko: '관리·임대 운영 대행', en: 'Managed leasing and operations' },
    ],
  },
]

export const getListing = (id: string) => LISTINGS.find((l) => l.id === id)
