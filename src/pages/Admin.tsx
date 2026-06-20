import { useEffect, useState, useCallback } from 'react'
import { Inbox, Plane, Lock, LogOut, RefreshCw } from 'lucide-react'
import type { Session } from '@supabase/supabase-js'
import { Section } from '../components/sections/Section'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { useLang, type Localized } from '../i18n/LanguageContext'
import { authConfigured, getSession, onAuthChange, signInWithPassword, sendOtp, verifyOtp, signOut, checkRole, type AdminRole } from '../lib/auth'
import {
  fetchEnquiries, fetchTourRequests, updateLeadStatus,
  type EnquiryRow, type TourRow, type LeadStatus,
} from '../lib/leads'

const STATUS: Record<LeadStatus, { label: Localized<string>; tone: 'gold' | 'sea' | 'success' }> = {
  new: { label: { ko: '신규', en: 'New' }, tone: 'gold' },
  progress: { label: { ko: '연락중', en: 'In progress' }, tone: 'sea' },
  done: { label: { ko: '완료', en: 'Done' }, tone: 'success' },
}

const field: React.CSSProperties = {
  width: '100%', height: 46, padding: '0 14px', borderRadius: 'var(--radius-md)',
  border: '1.5px solid var(--border-default)', background: 'var(--white)',
  fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-strong)',
}

/* ---------------- Login ---------------- */
function Login() {
  const { t } = useLang()
  const [mode, setMode] = useState<'password' | 'otp'>('password')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  const doPassword = async () => {
    setErr(''); setBusy(true)
    const { error } = await signInWithPassword(email.trim(), password)
    setBusy(false)
    if (error) setErr(t({ ko: '로그인 실패: 이메일/비밀번호를 확인하세요.', en: 'Login failed: check email/password.' }))
  }
  const doSendOtp = async () => {
    setErr(''); setBusy(true)
    const { error } = await sendOtp(email.trim())
    setBusy(false)
    if (error) setErr(t({ ko: '코드 전송 실패. 잠시 후 다시 시도하세요.', en: 'Failed to send code. Try again shortly.' }))
    else setOtpSent(true)
  }
  const doVerify = async () => {
    setErr(''); setBusy(true)
    const { error } = await verifyOtp(email.trim(), otp.trim())
    setBusy(false)
    if (error) setErr(t({ ko: '코드가 올바르지 않습니다.', en: 'Invalid code.' }))
  }

  return (
    <Section bg="page">
      <div style={{ maxWidth: 420, margin: '0 auto', background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', padding: 32, boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 6 }}>
          <Lock size={20} style={{ color: 'var(--gold-600)' }} />
          <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: 'var(--navy-900)' }}>{t({ ko: '어드민 로그인', en: 'Admin login' })}</h1>
        </div>
        <p style={{ margin: '0 0 22px', fontSize: 13.5, color: 'var(--text-muted)' }}>{t({ ko: '허용된 관리자만 접근할 수 있습니다.', en: 'Restricted to allowlisted admins.' })}</p>

        <div style={{ display: 'inline-flex', background: 'var(--surface-sunken)', borderRadius: 'var(--radius-full)', padding: 4, marginBottom: 18 }}>
          {(['password', 'otp'] as const).map((m) => (
            <button key={m} onClick={() => { setMode(m); setErr('') }} style={{
              border: 'none', cursor: 'pointer', padding: '7px 16px', borderRadius: 'var(--radius-full)',
              background: mode === m ? 'var(--navy-700)' : 'transparent', color: mode === m ? '#fff' : 'var(--navy-700)',
              fontWeight: 600, fontSize: 13,
            }}>{m === 'password' ? t({ ko: '비밀번호', en: 'Password' }) : t({ ko: '이메일 코드', en: 'Email code' })}</button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input style={field} type="email" placeholder={t({ ko: '이메일', en: 'Email' })} value={email} onChange={(e) => setEmail(e.target.value)} />
          {mode === 'password' ? (
            <>
              <input style={field} type="password" placeholder={t({ ko: '비밀번호', en: 'Password' })} value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && doPassword()} />
              <Button variant="gold" size="lg" fullWidth disabled={busy} onClick={doPassword}>{busy ? '…' : t({ ko: '로그인', en: 'Sign in' })}</Button>
            </>
          ) : !otpSent ? (
            <Button variant="gold" size="lg" fullWidth disabled={busy || !email} onClick={doSendOtp}>{busy ? '…' : t({ ko: '인증 코드 받기', en: 'Send code' })}</Button>
          ) : (
            <>
              <input style={field} inputMode="numeric" placeholder={t({ ko: '6자리 코드', en: '6-digit code' })} value={otp} onChange={(e) => setOtp(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && doVerify()} />
              <Button variant="gold" size="lg" fullWidth disabled={busy} onClick={doVerify}>{busy ? '…' : t({ ko: '코드 확인', en: 'Verify code' })}</Button>
            </>
          )}
          {err && <p style={{ margin: 0, fontSize: 13, color: 'var(--status-danger)' }}>{err}</p>}
        </div>
      </div>
    </Section>
  )
}

/* ---------------- Dashboard ---------------- */
function StatusSelect({ value, onChange }: { value: LeadStatus; onChange: (s: LeadStatus) => void }) {
  const { t } = useLang()
  return (
    <select value={value} onChange={(e) => onChange(e.target.value as LeadStatus)} style={{
      fontFamily: 'var(--font-body)', fontSize: 12.5, fontWeight: 600, padding: '4px 8px',
      borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-default)', background: 'var(--white)', cursor: 'pointer',
    }}>
      {(['new', 'progress', 'done'] as LeadStatus[]).map((s) => <option key={s} value={s}>{t(STATUS[s].label)}</option>)}
    </select>
  )
}

function Dashboard({ email, role }: { email: string; role: AdminRole }) {
  const { t } = useLang()
  const [tab, setTab] = useState<'enquiries' | 'tours'>('enquiries')
  const [enquiries, setEnquiries] = useState<EnquiryRow[]>([])
  const [tours, setTours] = useState<TourRow[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    const [e, tr] = await Promise.all([fetchEnquiries(), fetchTourRequests()])
    setEnquiries(e); setTours(tr); setLoading(false)
  }, [])
  useEffect(() => { void load() }, [load])

  const setEnqStatus = async (id: string, status: LeadStatus) => {
    setEnquiries((rows) => rows.map((r) => (r.id === id ? { ...r, status } : r)))
    await updateLeadStatus('enquiries', id, status)
  }
  const setTourStatus = async (id: string, status: LeadStatus) => {
    setTours((rows) => rows.map((r) => (r.id === id ? { ...r, status } : r)))
    await updateLeadStatus('tour_requests', id, status)
  }
  const fmt = (d: string) => d.slice(0, 16).replace('T', ' ')

  const th: React.CSSProperties = { padding: '11px 14px', fontWeight: 600, whiteSpace: 'nowrap' }
  const td: React.CSSProperties = { padding: '12px 14px', fontSize: 13.5, color: 'var(--navy-900)', verticalAlign: 'top' }

  return (
    <Section bg="page">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(24px, 3vw, 32px)', color: 'var(--navy-900)' }}>{t({ ko: '어드민 콘솔', en: 'Admin Console' })}</h1>
          <Badge tone={role === 'owner' ? 'gold' : 'navy'} solid>
            {role === 'owner' ? t({ ko: '소유자', en: 'Owner' }) : t({ ko: '관리자', en: 'Admin' })}
          </Badge>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{email}</span>
          <Button variant="ghost" size="sm" onClick={() => void load()} iconLeft={<RefreshCw size={14} />}>{t({ ko: '새로고침', en: 'Refresh' })}</Button>
          <Button variant="outline" size="sm" onClick={() => void signOut()} iconLeft={<LogOut size={14} />}>{t({ ko: '로그아웃', en: 'Sign out' })}</Button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, margin: '18px 0 22px' }}>
        {([['enquiries', Inbox, t({ ko: '문의', en: 'Enquiries' }), enquiries.length], ['tours', Plane, t({ ko: '투어신청', en: 'Tours' }), tours.length]] as const).map(([key, Icon, label, count]) => (
          <button key={key} onClick={() => setTab(key)} style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            border: '1.5px solid ' + (tab === key ? 'var(--navy-700)' : 'var(--border-default)'),
            background: tab === key ? 'var(--navy-700)' : 'var(--surface-card)', color: tab === key ? '#fff' : 'var(--navy-700)',
            fontWeight: 600, fontSize: 13.5, padding: '9px 16px', borderRadius: 'var(--radius-md)', cursor: 'pointer',
          }}>
            <Icon size={15} /> {label} <span style={{ fontFamily: 'var(--font-mono)', opacity: 0.8 }}>{count}</span>
          </button>
        ))}
      </div>

      <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ overflowX: 'auto' }}>
          {loading ? (
            <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)' }}>{t({ ko: '불러오는 중…', en: 'Loading…' })}</div>
          ) : tab === 'enquiries' ? (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)', minWidth: 720 }}>
              <thead><tr style={{ textAlign: 'left', background: 'var(--surface-sunken)', color: 'var(--text-muted)', fontSize: 12.5 }}>
                <th style={th}>{t({ ko: '일시', en: 'Date' })}</th><th style={th}>{t({ ko: '이름', en: 'Name' })}</th><th style={th}>{t({ ko: '연락처', en: 'Phone' })}</th><th style={th}>{t({ ko: '이메일', en: 'Email' })}</th><th style={th}>{t({ ko: '유입', en: 'Source' })}</th><th style={th}>{t({ ko: '메시지', en: 'Message' })}</th><th style={th}>{t({ ko: '상태', en: 'Status' })}</th>
              </tr></thead>
              <tbody>
                {enquiries.length === 0 ? (
                  <tr><td style={{ ...td, textAlign: 'center', color: 'var(--text-muted)' }} colSpan={7}>{t({ ko: '문의가 없습니다.', en: 'No enquiries yet.' })}</td></tr>
                ) : enquiries.map((r) => (
                  <tr key={r.id} style={{ borderTop: '1px solid var(--border-subtle)' }}>
                    <td style={{ ...td, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{fmt(r.created_at)}</td>
                    <td style={{ ...td, fontWeight: 600 }}>{r.name}</td>
                    <td style={{ ...td, fontFamily: 'var(--font-mono)', fontSize: 12.5 }}>{r.phone}</td>
                    <td style={td}>{r.email}</td>
                    <td style={{ ...td, fontFamily: 'var(--font-mono)', fontSize: 12 }}>{r.source_page}</td>
                    <td style={{ ...td, maxWidth: 220 }}>{r.message}</td>
                    <td style={td}><StatusSelect value={r.status} onChange={(s) => void setEnqStatus(r.id, s)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)', minWidth: 820 }}>
              <thead><tr style={{ textAlign: 'left', background: 'var(--surface-sunken)', color: 'var(--text-muted)', fontSize: 12.5 }}>
                <th style={th}>{t({ ko: '일시', en: 'Date' })}</th><th style={th}>{t({ ko: '이름', en: 'Name' })}</th><th style={th}>{t({ ko: '연락처', en: 'Phone' })}</th><th style={th}>{t({ ko: '예산(AED)', en: 'Budget' })}</th><th style={th}>{t({ ko: '투어월', en: 'Month' })}</th><th style={th}>{t({ ko: '인원', en: 'Pax' })}</th><th style={th}>{t({ ko: '관심지역', en: 'Areas' })}</th><th style={th}>{t({ ko: '상태', en: 'Status' })}</th>
              </tr></thead>
              <tbody>
                {tours.length === 0 ? (
                  <tr><td style={{ ...td, textAlign: 'center', color: 'var(--text-muted)' }} colSpan={8}>{t({ ko: '투어 신청이 없습니다.', en: 'No tour requests yet.' })}</td></tr>
                ) : tours.map((r) => (
                  <tr key={r.id} style={{ borderTop: '1px solid var(--border-subtle)' }}>
                    <td style={{ ...td, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{fmt(r.created_at)}</td>
                    <td style={{ ...td, fontWeight: 600 }}>{r.name}</td>
                    <td style={{ ...td, fontFamily: 'var(--font-mono)', fontSize: 12.5 }}>{r.phone}</td>
                    <td style={{ ...td, fontFamily: 'var(--font-mono)', fontSize: 12.5 }}>{r.budget_min?.toLocaleString()}–{r.budget_max?.toLocaleString()}</td>
                    <td style={{ ...td, fontFamily: 'var(--font-mono)', fontSize: 12.5 }}>{r.tour_month}</td>
                    <td style={{ ...td, fontFamily: 'var(--font-mono)' }}>{r.participants}</td>
                    <td style={{ ...td, maxWidth: 200, fontSize: 12.5 }}>{r.regions?.join(', ')}</td>
                    <td style={td}><StatusSelect value={r.status} onChange={(s) => void setTourStatus(r.id, s)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Section>
  )
}

/* ---------------- Page ---------------- */
export function Admin() {
  const { t } = useLang()
  const [session, setSession] = useState<Session | null>(null)
  const [role, setRole] = useState<AdminRole | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let active = true
    getSession().then(async (s) => {
      if (!active) return
      setSession(s)
      setRole(s ? await checkRole() : null)
      setReady(true)
    })
    const unsub = onAuthChange(async (s) => {
      setSession(s)
      setRole(s ? await checkRole() : null)
      setReady(true)
    })
    return () => { active = false; unsub() }
  }, [])

  if (!authConfigured) {
    return <Section bg="page"><p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>{t({ ko: 'Supabase 설정이 필요합니다.', en: 'Supabase is not configured.' })}</p></Section>
  }
  if (!ready) {
    return <Section bg="page"><p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>{t({ ko: '확인 중…', en: 'Checking…' })}</p></Section>
  }
  if (!session) return <Login />
  if (!role) {
    return (
      <Section bg="page">
        <div style={{ maxWidth: 420, margin: '0 auto', textAlign: 'center', background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', padding: 40 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--navy-900)', margin: '0 0 10px' }}>{t({ ko: '접근 권한이 없습니다', en: 'Not authorized' })}</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: '0 0 22px' }}>{t({ ko: '이 계정은 관리자 목록에 없습니다.', en: 'This account is not on the admin allowlist.' })}</p>
          <Button variant="outline" onClick={() => void signOut()} iconLeft={<LogOut size={14} />}>{t({ ko: '로그아웃', en: 'Sign out' })}</Button>
        </div>
      </Section>
    )
  }
  return <Dashboard email={session.user.email ?? ''} role={role} />
}
