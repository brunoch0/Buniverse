import { useEffect, useState } from 'react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Avatar } from '../components/ui/Avatar'
import { Badge } from '../components/ui/Badge'
import { useLang } from '../i18n/LanguageContext'

export function EnquiryModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLang()
  const [sent, setSent] = useState(false)
  useEffect(() => {
    if (open) setSent(false)
  }, [open])
  if (!open) return null
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        background: 'rgba(12,20,48,0.55)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        fontFamily: 'var(--font-body)',
        animation: 'bunFade 200ms ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(480px, 100%)',
          background: 'var(--surface-card)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xl)',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '22px 28px', background: 'var(--navy-900)', display: 'flex', alignItems: 'center', gap: 14 }}>
          <Avatar src="/brand/avatars/avatar-businessman.png" name="Chae Hyun-min" size={52} ring />
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>{t({ ko: '채현민 대표', en: 'Chae Hyun-min, CEO' })}</div>
            <div style={{ color: 'var(--text-on-navy-muted)', fontSize: 13 }}>
              {t({ ko: '뷰니버스 · 두바이 부동산·비즈니스 전문', en: 'Buniverse · Dubai real estate & business' })}
            </div>
          </div>
        </div>
        {sent ? (
          <div style={{ padding: '44px 28px', textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--gold-100)', color: 'var(--gold-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 26 }}>✓</div>
            <h3 style={{ margin: '0 0 8px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: 'var(--navy-900)' }}>
              {t({ ko: '문의가 접수되었습니다', en: 'Request received' })}
            </h3>
            <p style={{ margin: '0 0 24px', color: 'var(--text-body)', fontSize: 15 }}>
              {t({ ko: '담당 어드바이저가 곧 연락드리겠습니다.', en: 'An advisor will reach out to you shortly.' })}
            </p>
            <Button variant="primary" fullWidth onClick={onClose}>
              {t({ ko: '확인', en: 'Done' })}
            </Button>
          </div>
        ) : (
          <div style={{ padding: 28 }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              <Badge tone="gold" solid>{t({ ko: '무료 상담', en: 'Private viewing' })}</Badge>
              <Badge tone="navy">{t({ ko: '부담 없음', en: 'No obligation' })}</Badge>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Input label={t({ ko: '이름', en: 'Full name' })} placeholder={t({ ko: '홍길동', en: 'e.g. John Smith' })} />
              <Input label={t({ ko: '연락처', en: 'Phone' })} placeholder={t({ ko: '010-0000-0000', en: '+971 ...' })} />
              <Input label={t({ ko: '이메일', en: 'Email' })} type="email" placeholder="you@email.com" />
            </div>
            <div style={{ marginTop: 24 }}>
              <Button variant="gold" size="lg" fullWidth onClick={() => setSent(true)}>
                {t({ ko: '상담 신청하기', en: 'Request viewing' })}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
