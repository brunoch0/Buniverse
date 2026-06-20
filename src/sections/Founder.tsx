import { Link } from 'react-router-dom'
import { Check, BadgeCheck } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { useLang, type Localized } from '../i18n/LanguageContext'

const EXPERTISE: Localized<string>[] = [
  { ko: '두바이 프리홀드 투자 전략', en: 'Dubai freehold investment strategy' },
  { ko: '현지 개발사 및 공식 에이전시 네트워크', en: 'Local developer & official agency network' },
  { ko: '한국 투자자 맞춤 세금·법률 가이드', en: 'Tax & legal guidance for Korean investors' },
  { ko: '임대 수익률 분석 및 포트폴리오 관리', en: 'Rental yield analysis & portfolio management' },
]

const STATS: { value: string; label: Localized<string> }[] = [
  { value: '10+', label: { ko: 'UAE 현지 경력', en: 'Years in the UAE' } },
  { value: '500+', label: { ko: '누적 거래 실적', en: 'Deals closed' } },
  { value: 'RERA', label: { ko: '공인 등록 에이전시', en: 'Registered agency' } },
]

export function Founder() {
  const { t } = useLang()
  return (
    <section style={{ padding: 'clamp(56px, 8vw, 96px) max(24px, 5vw)', background: 'var(--surface-card)', fontFamily: 'var(--font-body)' }}>
      <div
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 48,
          alignItems: 'center',
        }}
      >
        {/* Portrait */}
        <div
          style={{
            position: 'relative',
            borderRadius: 'var(--radius-2xl)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
            background: 'linear-gradient(160deg, var(--navy-700), var(--navy-900))',
            minHeight: 380,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          <img
            src="/brand/avatars/avatar-businessman.png"
            alt={t({ ko: '채현민 대표', en: 'CEO Chae Hyun-min' })}
            style={{ width: '78%', maxWidth: 320, objectFit: 'contain', filter: 'drop-shadow(0 18px 36px rgba(0,0,0,0.35))' }}
          />
          <div style={{ position: 'absolute', top: 20, left: 20, display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(6px)', padding: '7px 13px', borderRadius: 'var(--radius-full)' }}>
            <BadgeCheck size={16} style={{ color: 'var(--gold-400)' }} />
            <span style={{ color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em' }}>RERA</span>
          </div>
        </div>

        {/* Text */}
        <div>
          <p style={{ margin: '0 0 10px', fontWeight: 700, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold-700)' }}>
            {t({ ko: '대표 소개', en: 'Meet our CEO' })}
          </p>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(26px, 3.6vw, 36px)', letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--navy-900)' }}>
            {t({ ko: '두바이 부동산 시장을\n가장 잘 아는 전문가', en: 'The expert who knows\nDubai property best' })
              .split('\n')
              .map((l, i) => (
                <span key={i}>
                  {l}
                  <br />
                </span>
              ))}
          </h2>
          <p style={{ margin: '16px 0 24px', fontSize: 16, lineHeight: 1.7, color: 'var(--text-body)' }}>
            {t({
              ko: '채현민 대표는 10년 이상 UAE 현지에서 활동한 부동산 전문가로, 두바이 프리홀드 투자부터 장기 임대 전략까지 한국 고객의 눈높이에 맞춘 자산 컨설팅을 제공합니다.',
              en: 'A property expert with 10+ years on the ground in the UAE, CEO Chae Hyun-min advises Korean clients from freehold investment to long-term rental strategy.',
            })}
          </p>
          <ul style={{ listStyle: 'none', margin: '0 0 28px', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
            {EXPERTISE.map((e) => (
              <li key={e.en} style={{ display: 'flex', gap: 9, alignItems: 'flex-start', fontSize: 14.5, color: 'var(--text-body)' }}>
                <Check size={18} strokeWidth={2.4} style={{ color: 'var(--gold-600)', flexShrink: 0, marginTop: 1 }} />
                {t(e)}
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', marginBottom: 28 }}>
            {STATS.map((s) => (
              <div key={s.value} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 30, lineHeight: 1, letterSpacing: '-0.02em', color: 'var(--gold-600)' }}>{s.value}</span>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{t(s.label)}</span>
              </div>
            ))}
          </div>
          <Link to="/about" style={{ textDecoration: 'none' }}>
            <Button variant="outline" iconRight={<span style={{ fontSize: 16, lineHeight: 0 }}>→</span>}>
              {t({ ko: '대표 소개 자세히 보기', en: 'More about our CEO' })}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
