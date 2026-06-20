import { useState } from 'react'
import { CalendarDays, MapPin, ArrowRight } from 'lucide-react'
import { PageHero } from '../components/sections/PageHero'
import { Section } from '../components/sections/Section'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { useLang, type Localized } from '../i18n/LanguageContext'
import { useEnquiry } from '../components/layout/enquiry'

type Category = 'buniverse' | 'collab' | 'seminar'

interface Content {
  category: Category
  image: string
  title: Localized<string>
  summary: Localized<string>
  date?: string
  place?: string
}

const ITEMS: Content[] = [
  { category: 'buniverse', image: '/brand/heroes/hero-sunset-skyline.png', title: { ko: '2026 두바이 부동산 시장 전망 리포트', en: '2026 Dubai property outlook report' }, summary: { ko: '지역별 시세 흐름과 투자 포인트를 정리한 분기 리포트.', en: 'A quarterly report on area pricing and investment angles.' } },
  { category: 'buniverse', image: '/brand/heroes/hero-waterfront-panorama.png', title: { ko: '골든비자 완벽 가이드', en: 'The complete golden-visa guide' }, summary: { ko: '부동산 투자 기반 골든비자 취득 절차와 요건 총정리.', en: 'Everything on obtaining a golden visa via property investment.' } },
  { category: 'collab', image: '/brand/heroes/hero-isometric-district.png', title: { ko: 'DAMAC 신규 프로젝트 콜라보 콘텐츠', en: 'DAMAC new-project collaboration' }, summary: { ko: '공식 파트너 DAMAC과 함께한 단독 프로젝트 소개.', en: 'An exclusive project feature with official partner DAMAC.' } },
  { category: 'collab', image: '/brand/heroes/hero-marina-frame.png', title: { ko: '현지 법무법인 세무 웨비나', en: 'Local law-firm tax webinar' }, summary: { ko: '두바이 세무 거주와 법인 구조를 다룬 협업 웨비나.', en: 'A joint webinar on Dubai tax residency and corporate structure.' } },
  { category: 'seminar', image: '/brand/heroes/hero-resort-pools.png', title: { ko: '서울 두바이 부동산 투자 세미나', en: 'Seoul Dubai investment seminar' }, summary: { ko: '채현민 대표와 함께하는 오프라인 투자 세미나.', en: 'An in-person seminar with CEO Chae Hyun-min.' }, date: '2026-07-12', place: '서울 강남' },
  { category: 'seminar', image: '/brand/heroes/hero-island-aerial.png', title: { ko: '두바이 현지 투자 투어 설명회', en: 'Dubai investment tour briefing' }, summary: { ko: '4박6일 투자 투어 일정과 혜택을 안내하는 설명회.', en: 'A briefing on the 6-day investment tour and its benefits.' }, date: '2026-07-26', place: '온라인' },
]

const CATS: { key: Category | 'all'; label: Localized<string> }[] = [
  { key: 'all', label: { ko: '전체', en: 'All' } },
  { key: 'buniverse', label: { ko: '뷰니버스 콘텐츠', en: 'Buniverse' } },
  { key: 'collab', label: { ko: '콜라보', en: 'Collab' } },
  { key: 'seminar', label: { ko: '세미나', en: 'Seminar' } },
]

export function ContentCenter() {
  const { t } = useLang()
  const onEnquire = useEnquiry()
  const [cat, setCat] = useState<Category | 'all'>('all')
  const items = ITEMS.filter((i) => cat === 'all' || i.category === cat)

  return (
    <>
      <PageHero
        image="/brand/heroes/hero-beach-skyline.png"
        height={360}
        eyebrow={t({ ko: '콘텐츠센터', en: 'Content Center' })}
        title={t({ ko: '인사이트 · 콜라보 · 세미나', en: 'Insight · Collab · Seminars' })}
        subtitle={t({ ko: '뷰니버스 콘텐츠와 제휴 콘텐츠, 오프라인 세미나 공지를 한곳에서 만나보세요.', en: 'Buniverse content, partner collaborations and seminar announcements in one place.' })}
      />

      <Section bg="page">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
          {CATS.map((c) => (
            <button key={c.key} onClick={() => setCat(c.key)} style={{
              border: '1.5px solid ' + (cat === c.key ? 'var(--navy-700)' : 'var(--border-default)'),
              background: cat === c.key ? 'var(--navy-700)' : 'transparent', color: cat === c.key ? '#fff' : 'var(--navy-700)',
              fontWeight: 600, fontSize: 13, padding: '8px 16px', borderRadius: 'var(--radius-full)', cursor: 'pointer',
            }}>{t(c.label)}</button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 22 }}>
          {items.map((it) => {
            const catLabel = CATS.find((c) => c.key === it.category)!.label
            const isSeminar = it.category === 'seminar'
            return (
              <div key={it.title.en} style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: 170, overflow: 'hidden' }}>
                  <img src={it.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: 12, left: 12 }}><Badge tone={isSeminar ? 'gold' : 'navy'} solid={isSeminar}>{t(catLabel)}</Badge></div>
                </div>
                <div style={{ padding: 20, display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ margin: '0 0 8px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17.5, lineHeight: 1.35, color: 'var(--navy-900)' }}>{t(it.title)}</h3>
                  <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.55, color: 'var(--text-body)' }}>{t(it.summary)}</p>
                  {isSeminar && (
                    <div style={{ display: 'flex', gap: 14, fontSize: 12.5, color: 'var(--text-muted)', marginBottom: 14 }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><CalendarDays size={13} /> {it.date}</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><MapPin size={13} /> {it.place}</span>
                    </div>
                  )}
                  <div style={{ marginTop: 'auto' }}>
                    {isSeminar ? (
                      <Button variant="gold" size="sm" onClick={onEnquire}>{t({ ko: '세미나 신청', en: 'Register' })}</Button>
                    ) : (
                      <button onClick={onEnquire} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, border: 'none', background: 'transparent', color: 'var(--navy-700)', fontWeight: 600, fontSize: 14, cursor: 'pointer', padding: 0 }}>
                        {t({ ko: '자세히 보기', en: 'Read more' })} <ArrowRight size={15} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Section>
    </>
  )
}
