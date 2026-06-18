import { Search, PenLine, Eye } from 'lucide-react'
import { PageHero } from '../components/sections/PageHero'
import { Section } from '../components/sections/Section'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { useLang, type Localized } from '../i18n/LanguageContext'
import { useEnquiry } from '../components/layout/enquiry'

interface Post {
  no: number
  category: Localized<string>
  title: Localized<string>
  author: Localized<string>
  date: string
  views: number
}

const isNotice = (no: number) => no === 0

const POSTS: Post[] = [
  { no: 0, category: { ko: '공지', en: 'Notice' }, title: { ko: '두바이 단기·장기 렌트 서비스 안내', en: 'Dubai short- & long-term rental services' }, author: { ko: '관리자', en: 'Admin' }, date: '2025.04.15', views: 334 },
  { no: 4, category: { ko: '후기', en: 'Story' }, title: { ko: '비지니스 부동산 투어 후기', en: 'My business property tour experience' }, author: { ko: '정재욱', en: 'J. Jung' }, date: '2025.11.28', views: 284 },
  { no: 3, category: { ko: '렌트', en: 'Rental' }, title: { ko: '다운타운 풀옵션 아파트 단기 렌트', en: 'Downtown fully-furnished short-term rental' }, author: { ko: '김렌트', en: 'Kim' }, date: '2025.06.11', views: 101 },
  { no: 2, category: { ko: '렌트', en: 'Rental' }, title: { ko: '마리나 전망 아파트 월세', en: 'Marina-view apartment, monthly' }, author: { ko: 'john', en: 'john' }, date: '2025.06.08', views: 88 },
  { no: 1, category: { ko: '투자', en: 'Investing' }, title: { ko: '두바이 분양권 투자 시 체크리스트', en: 'A checklist for off-plan investing in Dubai' }, author: { ko: '어드바이저', en: 'Advisor' }, date: '2025.05.30', views: 540 },
]

const CATEGORIES: Localized<string>[] = [
  { ko: '전체', en: 'All' },
  { ko: '공지', en: 'Notice' },
  { ko: '렌트', en: 'Rental' },
  { ko: '투자', en: 'Investing' },
  { ko: '후기', en: 'Story' },
]

export function Community() {
  const { t } = useLang()
  const onEnquire = useEnquiry()
  return (
    <>
      <PageHero
        image="/brand/heroes/hero-beach-skyline.png"
        height={360}
        eyebrow={t({ ko: '커뮤니티', en: 'Community' })}
        title={t({ ko: '투자자와 전문가의 네트워크', en: 'Where investors and experts meet' })}
        subtitle={t({ ko: '두바이 투자 정보와 경험을 나누는 공간입니다.', en: 'A space to share Dubai investment knowledge and experience.' })}
      />

      <Section bg="page">
        {/* Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 22 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {CATEGORIES.map((c, i) => (
              <button
                key={c.en}
                style={{
                  border: '1.5px solid ' + (i === 0 ? 'var(--navy-700)' : 'var(--border-default)'),
                  background: i === 0 ? 'var(--navy-700)' : 'transparent',
                  color: i === 0 ? '#fff' : 'var(--navy-700)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: 13,
                  padding: '7px 15px',
                  borderRadius: 'var(--radius-full)',
                  cursor: 'pointer',
                }}
              >
                {t(c)}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                height: 40,
                padding: '0 14px',
                background: 'var(--white)',
                border: '1.5px solid var(--border-default)',
                borderRadius: 'var(--radius-full)',
              }}
            >
              <Search size={16} style={{ color: 'var(--text-muted)' }} />
              <input
                placeholder={t({ ko: '검색', en: 'Search' })}
                style={{ border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--font-body)', fontSize: 14, width: 120 }}
              />
            </div>
            <Button variant="gold" size="sm" onClick={onEnquire} iconLeft={<PenLine size={15} />}>
              {t({ ko: '글쓰기', en: 'Write' })}
            </Button>
          </div>
        </div>

        {/* Board */}
        <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
          {POSTS.map((p, i) => (
            <div
              key={p.no}
              style={{
                display: 'grid',
                gridTemplateColumns: '56px 1fr auto',
                alignItems: 'center',
                gap: 16,
                padding: '16px 22px',
                borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: isNotice(p.no) ? 'var(--gold-700)' : 'var(--text-muted)' }}>
                {isNotice(p.no) ? '★' : String(p.no).padStart(2, '0')}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                <Badge tone={isNotice(p.no) ? 'gold' : 'navy'} solid={isNotice(p.no)}>{t(p.category)}</Badge>
                <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--navy-900)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {t(p.title)}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18, color: 'var(--text-muted)', fontSize: 13 }}>
                <span>{t(p.author)}</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>{p.date}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-mono)' }}>
                  <Eye size={14} /> {p.views.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p style={{ margin: '20px 0 0', textAlign: 'center', fontSize: 13, color: 'var(--text-muted)' }}>
          {t({ ko: '게시판은 곧 정식 오픈됩니다.', en: 'The community board opens soon.' })}
        </p>
      </Section>
    </>
  )
}
