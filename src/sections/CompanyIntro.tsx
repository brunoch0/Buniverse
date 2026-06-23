import { Link } from 'react-router-dom'
import { Check, BadgeCheck } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { useLang, type Localized } from '../i18n/LanguageContext'

const CAPABILITIES: Localized<string>[] = [
  { ko: '두바이 프리홀드 투자 전략', en: 'Dubai freehold investment strategy' },
  { ko: '현지 개발사 및 공식 에이전시 네트워크', en: 'Local developer & official agency network' },
  { ko: '한국 투자자 맞춤 세금·법률 가이드', en: 'Tax & legal guidance for Korean investors' },
  { ko: '임대 수익률 분석 및 자산관리', en: 'Rental yield analysis & asset management' },
]

const STATS: { value: string; label: Localized<string> }[] = [
  { value: '10+', label: { ko: '두바이 현지 경력', en: 'Years on the ground' } },
  { value: '47+', label: { ko: '공식 파트너사', en: 'Official partners' } },
  { value: 'RERA', label: { ko: '공인 등록 에이전시', en: 'Registered agency' } },
]

const TEAM = [
  '/brand/avatars/avatar-businesswoman.png',
  '/brand/avatars/avatar-businessman.png',
  '/brand/avatars/avatar-hijab.png',
]

export function CompanyIntro() {
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
        {/* Team visual */}
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
            padding: '0 12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', width: '100%', maxWidth: 460 }}>
            {TEAM.map((src, i) => (
              <img
                key={src}
                src={src}
                alt=""
                style={{
                  width: '40%',
                  objectFit: 'contain',
                  marginLeft: i === 0 ? 0 : '-9%',
                  zIndex: i === 1 ? 2 : 1,
                  filter: 'drop-shadow(0 18px 30px rgba(0,0,0,0.35))',
                  transform: i === 1 ? 'scale(1.08)' : 'none',
                }}
              />
            ))}
          </div>
          <div style={{ position: 'absolute', top: 20, left: 20, display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(6px)', padding: '7px 13px', borderRadius: 'var(--radius-full)' }}>
            <BadgeCheck size={16} style={{ color: 'var(--gold-400)' }} />
            <span style={{ color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em' }}>RERA</span>
          </div>
        </div>

        {/* Text */}
        <div>
          <p style={{ margin: '0 0 10px', fontWeight: 700, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold-700)' }}>
            {t({ ko: '뷰니버스 소개', en: 'About Buniverse' })}
          </p>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(26px, 3.6vw, 36px)', letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--navy-900)' }}>
            {t({ ko: '두바이 부동산을\n가장 잘 아는 팀', en: 'The team that knows\nDubai property best' })
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
              ko: '뷰니버스는 두바이 현지에서 활동하는 부동산·비즈니스 전문가 그룹입니다. 검증된 디벨로퍼와 공식 에이전시 네트워크를 기반으로, 프리홀드 투자부터 법인 설립·자산관리까지 한국 고객의 눈높이에 맞춘 원스톱 서비스를 제공합니다.',
              en: 'Buniverse is a group of on-the-ground real estate and business specialists in Dubai. Backed by verified developers and an official agency network, we deliver one-stop service for Korean clients — from freehold investment to company setup and asset management.',
            })}
          </p>
          <ul style={{ listStyle: 'none', margin: '0 0 28px', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
            {CAPABILITIES.map((e) => (
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
              {t({ ko: '회사 소개 자세히 보기', en: 'More about Buniverse' })}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
