import { Play } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { useLang, type Localized } from '../i18n/LanguageContext'

const CHANNEL_URL = 'https://www.youtube.com/@뷰니버스'

interface Video {
  id: string
  title: Localized<string>
  meta: Localized<string>
}

const VIDEOS: Video[] = [
  {
    id: 'uEUoyocte2c',
    title: { ko: '두바이 부동산 시장 전망 2025', en: 'Dubai property market outlook 2025' },
    meta: { ko: '채현민 대표 · 조회수 12만회', en: 'CEO Chae Hyun-min · 120K views' },
  },
  {
    id: '4nex4eDKYPk',
    title: { ko: '프리미엄 투자상품 완벽 가이드', en: 'The complete premium-investment guide' },
    meta: { ko: '채현민 대표 · 조회수 8만회', en: 'CEO Chae Hyun-min · 80K views' },
  },
  {
    id: 'wM4Rqnv3KuM',
    title: { ko: '현지 투자투어 하이라이트', en: 'Investment tour highlights' },
    meta: { ko: '채현민 대표 · 조회수 15만회', en: 'CEO Chae Hyun-min · 150K views' },
  },
]

export function Media() {
  const { t } = useLang()
  return (
    <section style={{ padding: 'clamp(56px, 8vw, 96px) max(24px, 5vw)', background: 'var(--navy-900)', fontFamily: 'var(--font-body)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 44px' }}>
          <p style={{ margin: '0 0 10px', fontWeight: 700, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold-400)' }}>
            {t({ ko: '미디어', en: 'Media' })}
          </p>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(26px, 3.6vw, 38px)', letterSpacing: '-0.02em', color: '#fff', lineHeight: 1.15 }}>
            {t({ ko: '채현민 대표와 함께하는 두바이 부동산 투자', en: 'Dubai property investing with CEO Chae Hyun-min' })}
          </h2>
          <p style={{ margin: '14px 0 0', fontSize: 17, lineHeight: 1.6, color: 'var(--text-on-navy-muted)' }}>
            {t({ ko: '실전 투자 노하우와 시장 분석을 영상으로 만나보세요.', en: 'Hands-on investment know-how and market analysis, on video.' })}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {VIDEOS.map((v) => (
            <a
              key={v.id}
              href={`https://www.youtube.com/watch?v=${v.id}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', display: 'block', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--navy-800)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div style={{ position: 'relative', aspectRatio: '16 / 9', overflow: 'hidden' }}>
                <img
                  src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                  alt={t(v.title)}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: 'var(--gold-500)',
                    color: 'var(--navy-900)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-gold)',
                  }}
                >
                  <Play size={24} fill="currentColor" />
                </span>
              </div>
              <div style={{ padding: 18 }}>
                <h3 style={{ margin: '0 0 6px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: '#fff', lineHeight: 1.35 }}>{t(v.title)}</h3>
                <p style={{ margin: 0, fontSize: 13, color: 'var(--text-on-navy-muted)' }}>{t(v.meta)}</p>
              </div>
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
          <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <Button variant="secondary" size="lg">
              {t({ ko: '전체 영상 보기', en: 'View all videos' })}
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
