import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, ArrowLeft } from 'lucide-react'
import { PageHero } from '../components/sections/PageHero'
import { Section } from '../components/sections/Section'
import { Button } from '../components/ui/Button'
import { useLang, type Localized } from '../i18n/LanguageContext'
import { submitTourRequest } from '../lib/leads'

const REGIONS = ['Dubai Marina', 'Downtown Dubai', 'Business Bay', 'Palm Jumeirah', 'JVC', 'The World']
const DEVELOPERS = ['EMAAR', 'DAMAC', 'Nakheel', 'Binghatti', 'Ellington']
const ASSETS: Localized<string>[] = [
  { ko: '아파트', en: 'Apartment' }, { ko: '빌라', en: 'Villa' }, { ko: '오피스', en: 'Office' }, { ko: '상가', en: 'Retail' }, { ko: '분양권', en: 'Off-plan' },
]
const PURPOSES: Localized<string>[] = [{ ko: '투자', en: 'Investment' }, { ko: '거주', en: 'Residence' }, { ko: '투자+거주', en: 'Both' }]
const CHANNELS: Localized<string>[] = [{ ko: '전화', en: 'Phone' }, { ko: '카카오톡', en: 'KakaoTalk' }, { ko: '이메일', en: 'Email' }, { ko: 'WhatsApp', en: 'WhatsApp' }]

const field: React.CSSProperties = {
  width: '100%', height: 46, padding: '0 14px', borderRadius: 'var(--radius-md)',
  border: '1.5px solid var(--border-default)', background: 'var(--white)',
  fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-strong)',
}
const labelStyle: React.CSSProperties = { fontSize: 13.5, fontWeight: 600, color: 'var(--navy-800)', marginBottom: 8, display: 'block' }

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} style={{
      border: '1.5px solid ' + (active ? 'var(--navy-700)' : 'var(--border-default)'),
      background: active ? 'var(--navy-700)' : 'transparent', color: active ? '#fff' : 'var(--navy-700)',
      fontWeight: 600, fontSize: 13, padding: '8px 14px', borderRadius: 'var(--radius-full)', cursor: 'pointer',
    }}>{children}</button>
  )
}

export function TourApply() {
  const { t, lang } = useLang()
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [f, setF] = useState({
    name: '', phone: '', email: '', residence: '',
    budgetMin: '', budgetMax: '', month: '', participants: '1',
    purpose: 0, channel: 0, message: '',
  })
  const [regions, setRegions] = useState<string[]>([])
  const [developers, setDevelopers] = useState<string[]>([])
  const [assets, setAssets] = useState<string[]>([])

  const toggle = (arr: string[], set: (v: string[]) => void, v: string) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v])

  const submit = async () => {
    setError('')
    const min = Number(f.budgetMin.replace(/[^\d]/g, ''))
    const max = Number(f.budgetMax.replace(/[^\d]/g, ''))
    if (!f.name.trim() || !f.phone.trim() || !f.email.trim() || !f.budgetMin || !f.budgetMax || !f.month || !f.participants) {
      setError(t({ ko: '필수 항목(이름·연락처·이메일·예산·투어 월·인원)을 입력해 주세요.', en: 'Please fill in the required fields (name, phone, email, budget, tour month, participants).' }))
      return
    }
    if (min > max) {
      setError(t({ ko: '예산 최소값이 최대값보다 클 수 없습니다.', en: 'Minimum budget cannot exceed maximum.' }))
      return
    }
    setLoading(true)
    const res = await submitTourRequest({
      name: f.name, phone: f.phone, email: f.email, lang,
      residence_country: f.residence, budget_min: min, budget_max: max,
      regions, developers, asset_types: assets.length ? assets : [],
      purpose: PURPOSES[f.purpose].en, tour_month: f.month, participants: Number(f.participants),
      contact_channel: CHANNELS[f.channel].en, message: f.message,
    })
    setLoading(false)
    if (res.ok) { setSent(true); window.scrollTo(0, 0) }
    else setError(t({ ko: '전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', en: 'Submission failed. Please try again shortly.' }))
  }

  if (sent) {
    return (
      <Section bg="page">
        <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center', background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', padding: 'clamp(40px, 7vw, 64px)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--gold-100)', color: 'var(--gold-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}><Check size={30} strokeWidth={2.4} /></div>
          <h1 style={{ margin: '0 0 10px', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, color: 'var(--navy-900)' }}>{t({ ko: '투어 신청이 접수되었습니다', en: 'Tour request received' })}</h1>
          <p style={{ margin: '0 0 28px', fontSize: 16, lineHeight: 1.6, color: 'var(--text-body)' }}>{t({ ko: '담당 어드바이저가 일정과 세부 사항을 안내해 드리겠습니다.', en: 'An advisor will be in touch with dates and details.' })}</p>
          <Link to="/" style={{ textDecoration: 'none' }}><Button variant="primary" size="lg">{t({ ko: '홈으로', en: 'Back home' })}</Button></Link>
        </div>
      </Section>
    )
  }

  return (
    <>
      <PageHero image="/brand/heroes/hero-waterfront-panorama.png" height={320}
        eyebrow={t({ ko: '투어 신청', en: 'Tour application' })}
        title={t({ ko: '두바이 투자 투어 신청', en: 'Apply for the Dubai investment tour' })}
        subtitle={t({ ko: '아래 정보를 남겨주시면 맞춤 일정으로 안내해 드립니다.', en: 'Share a few details and we’ll tailor your itinerary.' })}
      />
      <Section bg="page">
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <Link to="/tour" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--navy-600)', textDecoration: 'none', fontWeight: 600, fontSize: 14, marginBottom: 20 }}>
            <ArrowLeft size={16} /> {t({ ko: '투어 안내로', en: 'Tour info' })}
          </Link>

          <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', padding: 'clamp(24px, 4vw, 36px)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: 22 }}>
            {/* Contact */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              <div><label style={labelStyle}>{t({ ko: '이름 *', en: 'Name *' })}</label><input style={field} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder={t({ ko: '홍길동', en: 'John Smith' })} /></div>
              <div><label style={labelStyle}>{t({ ko: '연락처 (국가코드 포함) *', en: 'Phone (with country code) *' })}</label><input style={field} value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} placeholder="+82 10-0000-0000" /></div>
              <div><label style={labelStyle}>{t({ ko: '이메일 *', en: 'Email *' })}</label><input style={field} type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} placeholder="you@email.com" /></div>
              <div><label style={labelStyle}>{t({ ko: '거주 국가', en: 'Country of residence' })}</label><input style={field} value={f.residence} onChange={(e) => setF({ ...f, residence: e.target.value })} placeholder={t({ ko: '대한민국', en: 'South Korea' })} /></div>
            </div>

            {/* Budget + month + pax */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
              <div><label style={labelStyle}>{t({ ko: '예산 최소 (AED) *', en: 'Budget min (AED) *' })}</label><input style={field} inputMode="numeric" value={f.budgetMin} onChange={(e) => setF({ ...f, budgetMin: e.target.value })} placeholder="1,000,000" /></div>
              <div><label style={labelStyle}>{t({ ko: '예산 최대 (AED) *', en: 'Budget max (AED) *' })}</label><input style={field} inputMode="numeric" value={f.budgetMax} onChange={(e) => setF({ ...f, budgetMax: e.target.value })} placeholder="5,000,000" /></div>
              <div><label style={labelStyle}>{t({ ko: '희망 투어 월 *', en: 'Preferred month *' })}</label><input style={field} type="month" value={f.month} onChange={(e) => setF({ ...f, month: e.target.value })} /></div>
              <div><label style={labelStyle}>{t({ ko: '참가 인원 *', en: 'Participants *' })}</label><input style={field} type="number" min={1} value={f.participants} onChange={(e) => setF({ ...f, participants: e.target.value })} /></div>
            </div>

            {/* Regions */}
            <div><label style={labelStyle}>{t({ ko: '관심 지역 (복수 선택)', en: 'Areas of interest (multi)' })}</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{REGIONS.map((r) => <Chip key={r} active={regions.includes(r)} onClick={() => toggle(regions, setRegions, r)}>{r}</Chip>)}</div>
            </div>
            {/* Developers */}
            <div><label style={labelStyle}>{t({ ko: '관심 디벨로퍼 (선택)', en: 'Developers (optional)' })}</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{DEVELOPERS.map((d) => <Chip key={d} active={developers.includes(d)} onClick={() => toggle(developers, setDevelopers, d)}>{d}</Chip>)}</div>
            </div>
            {/* Assets */}
            <div><label style={labelStyle}>{t({ ko: '관심 자산 유형 (복수 선택)', en: 'Asset types (multi)' })}</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{ASSETS.map((a) => <Chip key={a.en} active={assets.includes(a.en)} onClick={() => toggle(assets, setAssets, a.en)}>{t(a)}</Chip>)}</div>
            </div>

            {/* Purpose + channel */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 22 }}>
              <div><label style={labelStyle}>{t({ ko: '투자 / 거주 목적', en: 'Purpose' })}</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{PURPOSES.map((p, i) => <Chip key={p.en} active={f.purpose === i} onClick={() => setF({ ...f, purpose: i })}>{t(p)}</Chip>)}</div>
              </div>
              <div><label style={labelStyle}>{t({ ko: '선호 연락 채널', en: 'Preferred channel' })}</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{CHANNELS.map((c, i) => <Chip key={c.en} active={f.channel === i} onClick={() => setF({ ...f, channel: i })}>{t(c)}</Chip>)}</div>
              </div>
            </div>

            {/* Message */}
            <div><label style={labelStyle}>{t({ ko: '추가 메시지 (선택)', en: 'Message (optional)' })}</label>
              <textarea value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} rows={4} style={{ ...field, height: 'auto', padding: 12, resize: 'vertical' }} placeholder={t({ ko: '문의하실 내용을 적어주세요.', en: 'Anything you’d like us to know.' })} />
            </div>

            {error && <p style={{ margin: 0, fontSize: 14, color: 'var(--status-danger)' }}>{error}</p>}
            <Button variant="gold" size="lg" fullWidth disabled={loading} onClick={submit}>
              {loading ? t({ ko: '전송 중…', en: 'Submitting…' }) : t({ ko: '투어 신청하기', en: 'Submit tour request' })}
            </Button>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>
              {t({ ko: '제출 시 상담 목적의 개인정보 수집·이용에 동의하는 것으로 간주됩니다.', en: 'By submitting you consent to the use of your details for consultation.' })}
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}
