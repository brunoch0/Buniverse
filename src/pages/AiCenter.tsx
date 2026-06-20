import { useState } from 'react'
import { Sparkles, Check, Compass } from 'lucide-react'
import { PageHero } from '../components/sections/PageHero'
import { Section } from '../components/sections/Section'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { DataDisclosure, type Disclosure } from '../components/sections/DataDisclosure'
import { useLang, type Localized } from '../i18n/LanguageContext'
import { useEnquiry } from '../components/layout/enquiry'

const SOURCE: Disclosure = { sourceName: 'Buniverse AI · DLD 시세 기반', asOfDate: '2026-05-31' }

const REGIONS = ['Dubai Marina', 'Downtown Dubai', 'Business Bay', 'Palm Jumeirah', 'JVC']
const ASSET_TYPES: Localized<string>[] = [
  { ko: '아파트', en: 'Apartment' },
  { ko: '오피스', en: 'Office' },
  { ko: '상가', en: 'Retail' },
  { ko: '빌라', en: 'Villa' },
]
const PERIODS = ['1', '3', '5']

const SIGNAL: Record<string, { yoy: number; vol: 'low' | 'mid' | 'high'; demand: 'up' | 'flat' }> = {
  'Dubai Marina': { yoy: 8.4, vol: 'low', demand: 'up' },
  'Downtown Dubai': { yoy: 11.2, vol: 'mid', demand: 'up' },
  'Business Bay': { yoy: 6.1, vol: 'low', demand: 'up' },
  'Palm Jumeirah': { yoy: 14.7, vol: 'mid', demand: 'up' },
  JVC: { yoy: -2.3, vol: 'high', demand: 'flat' },
}

function predict(region: string) {
  const s = SIGNAL[region]
  const up = s.yoy >= 5 && s.demand === 'up'
  const outlook: 'up' | 'flat' | 'down' = up ? 'up' : s.yoy < 0 ? 'down' : 'flat'
  const confidence: 'low' | 'mid' | 'high' = s.vol === 'low' ? 'high' : s.vol === 'mid' ? 'mid' : 'low'
  return { outlook, confidence, yoy: s.yoy }
}

const field: React.CSSProperties = {
  width: '100%', height: 46, padding: '0 14px', borderRadius: 'var(--radius-md)',
  border: '1.5px solid var(--border-default)', background: 'var(--white)',
  fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-strong)',
}
const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 600, color: 'var(--navy-800)', marginBottom: 7, display: 'block' }

function pill(active: boolean): React.CSSProperties {
  return {
    border: '1.5px solid ' + (active ? 'var(--navy-700)' : 'var(--border-default)'),
    background: active ? 'var(--navy-700)' : 'transparent', color: active ? '#fff' : 'var(--navy-700)',
    fontWeight: 600, fontSize: 13, padding: '8px 14px', borderRadius: 'var(--radius-full)', cursor: 'pointer',
  }
}

/* ---------------- Value forecast ---------------- */
function ValueForecast() {
  const { t, lang } = useLang()
  const onEnquire = useEnquiry()
  const [region, setRegion] = useState(REGIONS[0])
  const [asset, setAsset] = useState(0)
  const [period, setPeriod] = useState('3')
  const [budget, setBudget] = useState('')
  const [result, setResult] = useState<ReturnType<typeof predict> | null>(null)

  const outlookMeta = {
    up: { label: { ko: '상승 가능성', en: 'Likely to rise' }, tone: 'success' as const },
    flat: { label: { ko: '보합 가능성', en: 'Likely flat' }, tone: 'gold' as const },
    down: { label: { ko: '하락 가능성', en: 'Likely to soften' }, tone: 'navy' as const },
  }
  const confLabel: Record<string, Localized<string>> = {
    low: { ko: '신뢰도 낮음', en: 'Low confidence' },
    mid: { ko: '신뢰도 중간', en: 'Medium confidence' },
    high: { ko: '신뢰도 높음', en: 'High confidence' },
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28, alignItems: 'start' }}>
      <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', padding: 28, boxShadow: 'var(--shadow-sm)' }}>
        <h2 style={{ margin: '0 0 20px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: 'var(--navy-900)' }}>{t({ ko: '가치 예측 입력', en: 'Forecast inputs' })}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={labelStyle}>{t({ ko: '지역', en: 'Area' })}</label>
            <select value={region} onChange={(e) => setRegion(e.target.value)} style={field}>
              {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>{t({ ko: '자산 유형', en: 'Asset type' })}</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {ASSET_TYPES.map((a, i) => <button key={a.en} onClick={() => setAsset(i)} style={pill(asset === i)}>{t(a)}</button>)}
            </div>
          </div>
          <div>
            <label style={labelStyle}>{t({ ko: '투자 기간', en: 'Horizon' })}</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {PERIODS.map((p) => (
                <button key={p} onClick={() => setPeriod(p)} style={{ ...pill(period === p), flex: 1, padding: '10px 0', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>{p}{t({ ko: '년', en: 'y' })}</button>
              ))}
            </div>
          </div>
          <div>
            <label style={labelStyle}>{t({ ko: '예산 (AED)', en: 'Budget (AED)' })}</label>
            <input value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="2,000,000" inputMode="numeric" style={field} />
          </div>
          <Button variant="gold" size="lg" fullWidth iconLeft={<Sparkles size={18} />} onClick={() => setResult(predict(region))}>{t({ ko: 'AI 분석 시작', en: 'Run AI analysis' })}</Button>
        </div>
      </div>

      <div style={{ background: result ? 'var(--surface-card)' : 'var(--surface-sunken)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', padding: 28, minHeight: 320, display: 'flex', flexDirection: 'column' }}>
        {!result ? (
          <div style={{ margin: 'auto', textAlign: 'center', color: 'var(--text-muted)' }}>
            <Sparkles size={32} strokeWidth={1.5} style={{ color: 'var(--gold-500)', marginBottom: 12 }} />
            <p style={{ margin: 0, fontSize: 15 }}>{t({ ko: '입력 후 분석을 실행하면 결과가 여기에 표시됩니다.', en: 'Run the analysis to see your result here.' })}</p>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <Badge tone={outlookMeta[result.outlook].tone} solid>{t(outlookMeta[result.outlook].label)}</Badge>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{t(confLabel[result.confidence])}</span>
            </div>
            <h3 style={{ margin: '0 0 4px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: 'var(--navy-900)' }}>{region} · {t(ASSET_TYPES[asset])}</h3>
            <p style={{ margin: '0 0 18px', fontSize: 14, color: 'var(--text-muted)' }}>{t({ ko: `투자 기간 ${period}년 기준 예측 요약`, en: `Forecast summary for a ${period}-year horizon` })}</p>
            <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--navy-800)', marginBottom: 8 }}>{t({ ko: '핵심 근거', en: 'Key signals' })}</div>
            <ul style={{ listStyle: 'none', margin: '0 0 18px', padding: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
              {[
                { ko: `최근 시세 ${result.yoy >= 0 ? '+' : ''}${result.yoy}% (전년比) 추이`, en: `Recent prices ${result.yoy >= 0 ? '+' : ''}${result.yoy}% YoY` },
                { ko: '커뮤니티 관심도(조회·문의) 추세 반영', en: 'Community interest (views, enquiries) trend' },
                { ko: '거래량·변동성 기반 안정성 평가', en: 'Stability from transaction volume & volatility' },
              ].map((s) => (
                <li key={s.en} style={{ display: 'flex', gap: 9, alignItems: 'flex-start', fontSize: 14, color: 'var(--text-body)' }}>
                  <Check size={17} strokeWidth={2.4} style={{ color: 'var(--gold-600)', flexShrink: 0, marginTop: 1 }} /> {lang === 'ko' ? s.ko : s.en}
                </li>
              ))}
            </ul>
            <div style={{ padding: 12, background: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', marginBottom: 18 }}><DataDisclosure source={SOURCE} level="ai" /></div>
            <div style={{ marginTop: 'auto' }}>
              <Button variant="primary" fullWidth onClick={onEnquire} iconRight={<span style={{ fontSize: 16, lineHeight: 0 }}>→</span>}>{t({ ko: '이 분석으로 전문가 상담받기', en: 'Discuss this with an advisor' })}</Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

/* ---------------- Investment-style diagnosis ---------------- */
const QUESTIONS: { q: Localized<string>; options: { label: Localized<string>; score: number }[] }[] = [
  { q: { ko: '투자 성향은 어느 쪽에 가깝나요?', en: 'Which best describes your risk appetite?' }, options: [
    { label: { ko: '안정적인 수익이 우선', en: 'Stable income first' }, score: 0 },
    { label: { ko: '수익과 안정의 균형', en: 'Balance of yield and stability' }, score: 1 },
    { label: { ko: '높은 수익을 위해 변동 감수', en: 'Higher return, accept volatility' }, score: 2 },
  ] },
  { q: { ko: '투자 기간은 어느 정도인가요?', en: 'What is your investment horizon?' }, options: [
    { label: { ko: '1~2년 단기', en: '1–2 years' }, score: 2 },
    { label: { ko: '3~5년 중기', en: '3–5 years' }, score: 1 },
    { label: { ko: '5년 이상 장기', en: '5+ years' }, score: 0 },
  ] },
  { q: { ko: '주요 목표는 무엇인가요?', en: 'What is your primary goal?' }, options: [
    { label: { ko: '임대 수익(현금흐름)', en: 'Rental income (cash flow)' }, score: 0 },
    { label: { ko: '시세 차익', en: 'Capital appreciation' }, score: 2 },
    { label: { ko: '거주 + 투자 병행', en: 'Live + invest' }, score: 1 },
  ] },
]

const PROFILES = [
  { range: [0, 2], type: { ko: '안정형', en: 'Conservative' }, regions: 'JVC · Business Bay', strategy: { ko: '높은 임대 수익률 지역 중심의 현금흐름 전략', en: 'Cash-flow strategy in high-yield areas' } },
  { range: [3, 4], type: { ko: '중립형', en: 'Balanced' }, regions: 'Dubai Marina · Downtown', strategy: { ko: '수익률과 시세 상승을 균형 있게 추구', en: 'Balance rental yield with appreciation' } },
  { range: [5, 6], type: { ko: '공격형', en: 'Aggressive' }, regions: 'Palm Jumeirah · 신규 분양', strategy: { ko: '프라임·분양 중심의 시세 차익 전략', en: 'Capital-gain strategy in prime & off-plan' } },
]

function Diagnosis() {
  const { t } = useLang()
  const onEnquire = useEnquiry()
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null])
  const done = answers.every((a) => a !== null)
  const score = answers.reduce<number>((s, a, i) => s + (a !== null ? QUESTIONS[i].options[a].score : 0), 0)
  const profile = PROFILES.find((p) => score >= p.range[0] && score <= p.range[1]) ?? PROFILES[1]
  const [show, setShow] = useState(false)

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      {!show ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          {QUESTIONS.map((qq, qi) => (
            <div key={qq.q.en} style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 24, boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: 'var(--navy-900)', marginBottom: 14 }}>{qi + 1}. {t(qq.q)}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {qq.options.map((o, oi) => (
                  <button key={o.label.en} onClick={() => setAnswers((a) => a.map((v, i) => (i === qi ? oi : v)))} style={{
                    textAlign: 'left', cursor: 'pointer', padding: '12px 16px', borderRadius: 'var(--radius-md)',
                    border: '1.5px solid ' + (answers[qi] === oi ? 'var(--gold-500)' : 'var(--border-default)'),
                    background: answers[qi] === oi ? 'var(--gold-100)' : 'var(--white)',
                    color: 'var(--navy-900)', fontFamily: 'var(--font-body)', fontSize: 14.5, fontWeight: answers[qi] === oi ? 700 : 500,
                  }}>{t(o.label)}</button>
                ))}
              </div>
            </div>
          ))}
          <Button variant="gold" size="lg" disabled={!done} onClick={() => setShow(true)}>{t({ ko: '진단 결과 보기', en: 'See my result' })}</Button>
        </div>
      ) : (
        <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', padding: 32, boxShadow: 'var(--shadow-md)', textAlign: 'center' }}>
          <Compass size={34} strokeWidth={1.6} style={{ color: 'var(--gold-600)', marginBottom: 12 }} />
          <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{t({ ko: '당신의 투자 성향은', en: 'Your investor type is' })}</div>
          <h2 style={{ margin: '6px 0 18px', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 34, letterSpacing: '-0.02em', color: 'var(--navy-900)' }}>{t(profile.type)}</h2>
          <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 10, textAlign: 'left', marginBottom: 22 }}>
            <div style={{ fontSize: 15, color: 'var(--text-body)' }}><b style={{ color: 'var(--navy-900)' }}>{t({ ko: '추천 지역', en: 'Suggested areas' })}:</b> {profile.regions}</div>
            <div style={{ fontSize: 15, color: 'var(--text-body)' }}><b style={{ color: 'var(--navy-900)' }}>{t({ ko: '추천 전략', en: 'Suggested strategy' })}:</b> {t(profile.strategy)}</div>
          </div>
          <div style={{ padding: 12, background: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', marginBottom: 22 }}><DataDisclosure source={SOURCE} level="ai" /></div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="gold" onClick={onEnquire} iconRight={<span style={{ fontSize: 16, lineHeight: 0 }}>→</span>}>{t({ ko: '맞춤 전략 상담받기', en: 'Get a tailored plan' })}</Button>
            <Button variant="outline" onClick={() => { setShow(false); setAnswers([null, null, null]) }}>{t({ ko: '다시 진단', en: 'Retake' })}</Button>
          </div>
        </div>
      )}
    </div>
  )
}

export function AiCenter() {
  const { t } = useLang()
  const [mode, setMode] = useState<'forecast' | 'diagnosis'>('forecast')
  return (
    <>
      <PageHero
        image="/brand/heroes/hero-isometric-district.png"
        height={360}
        eyebrow={t({ ko: 'AI 데이터센터', en: 'AI Data Center' })}
        title={t({ ko: 'AI 기반 투자 인사이트', en: 'AI-driven investment insight' })}
        subtitle={t({ ko: '가치 예측과 투자 성향 진단으로 의사결정을 돕습니다. (참고용·투자 조언 아님)', en: 'Value forecasts and investor-style diagnostics to guide decisions. (For reference, not advice.)' })}
      />
      <Section bg="page">
        <div style={{ display: 'inline-flex', background: 'var(--surface-sunken)', borderRadius: 'var(--radius-full)', padding: 4, marginBottom: 32 }}>
          {(['forecast', 'diagnosis'] as const).map((m) => (
            <button key={m} onClick={() => setMode(m)} style={{
              border: 'none', cursor: 'pointer', padding: '9px 22px', borderRadius: 'var(--radius-full)',
              background: mode === m ? 'var(--navy-700)' : 'transparent', color: mode === m ? '#fff' : 'var(--navy-700)',
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14,
            }}>
              {m === 'forecast' ? t({ ko: '가치 예측', en: 'Value forecast' }) : t({ ko: '투자 성향 진단', en: 'Investor diagnosis' })}
            </button>
          ))}
        </div>
        {mode === 'forecast' ? <ValueForecast /> : <Diagnosis />}
      </Section>
    </>
  )
}
