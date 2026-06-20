import { Link } from 'react-router-dom'
import { ShieldCheck, KeyRound, Scale, LifeBuoy, type LucideIcon } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { useLang, type Localized } from '../i18n/LanguageContext'

const PARTNERS: { name: string; note: Localized<string> }[] = [
  { name: 'Dubai Land Department', note: { ko: 'RERA 공인', en: 'RERA certified' } },
  { name: 'EMAAR', note: { ko: '공식 파트너', en: 'Official partner' } },
  { name: 'DAMAC', note: { ko: '공식 파트너', en: 'Official partner' } },
  { name: 'Nakheel', note: { ko: '공식 파트너', en: 'Official partner' } },
]

const BENEFITS: { icon: LucideIcon; title: Localized<string>; desc: Localized<string> }[] = [
  { icon: KeyRound, title: { ko: '독점 매물 우선 접근', en: 'Priority on exclusive units' }, desc: { ko: '파트너사 미공개 신규 매물을 일반 공개 전에 먼저 확인합니다.', en: 'See partner off-market units before public release.' } },
  { icon: ShieldCheck, title: { ko: '공인 가격 정보 제공', en: 'Verified pricing' }, desc: { ko: '현지 공인 기관 데이터 기반의 정확한 시세·가격 분석을 제공합니다.', en: 'Accurate pricing from official local data sources.' } },
  { icon: Scale, title: { ko: '법률·세무 전문가 연계', en: 'Legal & tax experts' }, desc: { ko: '두바이 현지 법무·세무 전문가와 직접 연결로 안전한 투자를 지원합니다.', en: 'Direct access to Dubai legal and tax professionals.' } },
  { icon: LifeBuoy, title: { ko: '사후 자산 관리 지원', en: 'Aftercare management' }, desc: { ko: '매입 완료 후 임대·유지·매각까지 파트너 네트워크로 관리합니다.', en: 'Rental, upkeep and resale handled via the partner network.' } },
]

export function Partners() {
  const { t } = useLang()
  return (
    <section style={{ padding: 'clamp(56px, 8vw, 96px) max(24px, 5vw)', background: 'var(--surface-page)', fontFamily: 'var(--font-body)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 40px' }}>
          <p style={{ margin: '0 0 10px', fontWeight: 700, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold-700)' }}>
            {t({ ko: '공식 파트너', en: 'Official partners' })}
          </p>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px, 3.6vw, 38px)', letterSpacing: '-0.02em', color: 'var(--navy-900)' }}>
            {t({ ko: '검증된 기관과의 파트너십', en: 'Partnered with trusted institutions' })}
          </h2>
          <p style={{ margin: '14px 0 0', fontSize: 17, lineHeight: 1.6, color: 'var(--text-body)' }}>
            {t({ ko: '글로벌 신뢰 기관과의 공식 파트너십으로 검증된 서비스를 제공합니다.', en: 'Verified service backed by official partnerships with trusted institutions.' })}
          </p>
        </div>

        {/* Partner logos (text badges) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 44 }}>
          {PARTNERS.map((p) => (
            <div
              key={p.name}
              style={{
                background: 'var(--surface-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '22px 20px',
                textAlign: 'center',
                boxShadow: 'var(--shadow-xs)',
              }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 17, letterSpacing: '0.02em', color: 'var(--navy-800)' }}>{p.name}</div>
              <div style={{ marginTop: 4, fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--gold-700)' }}>{t(p.note)}</div>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          {BENEFITS.map((b) => (
            <div key={b.title.en} style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 24, boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--navy-050)', color: 'var(--navy-700)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                <b.icon size={22} strokeWidth={1.75} />
              </div>
              <h3 style={{ margin: '0 0 6px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16.5, color: 'var(--navy-900)' }}>{t(b.title)}</h3>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: 'var(--text-body)' }}>{t(b.desc)}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
          <Link to="/partner" style={{ textDecoration: 'none' }}>
            <Button variant="outline">{t({ ko: '공식 파트너 전체 보기', en: 'View all partners' })}</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
