import { useState } from 'react'
import { MapPin, Building2, CalendarClock } from 'lucide-react'
import { PageHero } from '../components/sections/PageHero'
import { Section } from '../components/sections/Section'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { useLang, type Localized } from '../i18n/LanguageContext'
import { useEnquiry } from '../components/layout/enquiry'

interface Project {
  name: string
  developer: string
  region: string
  image: string
  priceFrom: string
  handover: string
  highlights: Localized<string>[]
}

const PROJECTS: Project[] = []

const REGIONS = ['Business Bay', 'Dubai Marina', 'Downtown Dubai', 'Palm Jumeirah', 'JVC']
const DEVELOPERS = ['EMAAR', 'DAMAC', 'Nakheel', 'Binghatti']

export function Projects() {
  const { t } = useLang()
  const onEnquire = useEnquiry()
  const [axis, setAxis] = useState<'region' | 'developer'>('region')
  const [value, setValue] = useState<string | null>(null)

  const chips = axis === 'region' ? REGIONS : DEVELOPERS
  const filtered = PROJECTS.filter((p) => {
    if (!value) return true
    return axis === 'region' ? p.region === value : p.developer.toUpperCase() === value
  })

  const chipStyle = (active: boolean): React.CSSProperties => ({
    border: '1.5px solid ' + (active ? 'var(--navy-700)' : 'var(--border-default)'),
    background: active ? 'var(--navy-700)' : 'transparent',
    color: active ? '#fff' : 'var(--navy-700)',
    fontWeight: 600, fontSize: 13, padding: '8px 16px', borderRadius: 'var(--radius-full)', cursor: 'pointer',
  })

  return (
    <>
      <PageHero
        image="/brand/heroes/hero-sunset-skyline.png"
        height={360}
        eyebrow={t({ ko: '신규 런칭 프로젝트', en: 'New launches' })}
        title={t({ ko: '두바이 신규 분양 프로젝트', en: 'New off-plan projects in Dubai' })}
        subtitle={t({ ko: '지역별·디벨로퍼별로 최신 런칭 프로젝트를 탐색하세요.', en: 'Explore the latest launches by area and by developer.' })}
      />

      <Section bg="page">
        {/* Axis tabs */}
        <div style={{ display: 'inline-flex', background: 'var(--surface-sunken)', borderRadius: 'var(--radius-full)', padding: 4, marginBottom: 18 }}>
          {(['region', 'developer'] as const).map((a) => (
            <button key={a} onClick={() => { setAxis(a); setValue(null) }} style={{
              border: 'none', cursor: 'pointer', padding: '8px 20px', borderRadius: 'var(--radius-full)',
              background: axis === a ? 'var(--navy-700)' : 'transparent', color: axis === a ? '#fff' : 'var(--navy-700)',
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14,
            }}>
              {a === 'region' ? t({ ko: '지역별', en: 'By area' }) : t({ ko: '디벨로퍼별', en: 'By developer' })}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
          <button onClick={() => setValue(null)} style={chipStyle(value === null)}>{t({ ko: '전체', en: 'All' })}</button>
          {chips.map((c) => <button key={c} onClick={() => setValue(c)} style={chipStyle(value === c)}>{c}</button>)}
        </div>

        {filtered.length === 0 && (
          <div style={{ padding: '56px 24px', textAlign: 'center', background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
            <p style={{ margin: '0 0 18px', color: 'var(--text-body)', fontSize: 15 }}>
              {t({ ko: '신규 런칭 프로젝트를 준비 중입니다. 관심 지역·개발사를 알려주시면 먼저 안내드립니다.', en: 'New launches are being prepared. Tell us your preferred area or developer and we’ll notify you first.' })}
            </p>
            <Button variant="gold" onClick={onEnquire}>{t({ ko: '프로젝트 문의', en: 'Enquire' })}</Button>
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 22 }}>
          {filtered.map((p) => (
            <div key={p.name} style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: 12, left: 12 }}><Badge tone="gold" solid>{t({ ko: '신규 런칭', en: 'New launch' })}</Badge></div>
              </div>
              <div style={{ padding: 20, display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ margin: '0 0 4px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 19, color: 'var(--navy-900)' }}>{p.name}</h3>
                <div style={{ display: 'flex', gap: 14, fontSize: 12.5, color: 'var(--text-muted)', marginBottom: 12 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Building2 size={13} /> {p.developer}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><MapPin size={13} /> {p.region}</span>
                </div>
                <ul style={{ listStyle: 'none', margin: '0 0 14px', padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {p.highlights.map((h) => (
                    <li key={h.en} style={{ fontSize: 13.5, color: 'var(--text-body)' }}>· {t(h)}</li>
                  ))}
                </ul>
                <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 17, color: 'var(--navy-800)' }}>{p.priceFrom}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: 4 }}><CalendarClock size={12} /> {p.handover}</div>
                  </div>
                  <Button variant="outline" size="sm" onClick={onEnquire}>{t({ ko: '문의', en: 'Enquire' })}</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
