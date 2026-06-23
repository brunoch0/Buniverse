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

const ITEMS: Content[] = []

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

        {items.length === 0 && (
          <div style={{ padding: '56px 24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 15, background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
            {t({ ko: '콘텐츠를 준비 중입니다. 곧 만나보실 수 있습니다.', en: 'Content is on the way — coming soon.' })}
          </div>
        )}
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
