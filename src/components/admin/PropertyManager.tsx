import { useCallback, useEffect, useRef, useState } from 'react'
import { Plus, Pencil, Trash2, Upload, X } from 'lucide-react'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { useLang } from '../../i18n/LanguageContext'
import { fetchAllProperties, saveProperty, deleteProperty, LISTING_TYPES, type PropertyRow, type PropertyInput, type ListingType } from '../../lib/properties'
import { uploadPropertyImage } from '../../lib/storage'

const field: React.CSSProperties = {
  width: '100%', minHeight: 42, padding: '0 12px', borderRadius: 'var(--radius-md)',
  border: '1.5px solid var(--border-default)', background: 'var(--white)',
  fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-strong)',
}
const labelStyle: React.CSSProperties = { fontSize: 12.5, fontWeight: 600, color: 'var(--navy-800)', marginBottom: 6, display: 'block' }
const STATUS_TONE: Record<string, 'gold' | 'success' | 'neutral'> = { draft: 'gold', published: 'success', archived: 'neutral' }

// Module-level so inputs don't remount on every keystroke (which would drop focus / values).
function LabeledInput({ label, value, onChange, placeholder, type = 'text' }: { label: string; value: string | number | null; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input style={{ ...field, height: 42 }} type={type} value={value ?? ''} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  )
}

function LabeledArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <textarea style={{ ...field, height: 70, padding: 10 }} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}

/** Upload one or more images to Supabase Storage; calls onUploaded(url) per file. */
function ImageUploader({ label, multiple, onUploaded }: { label: string; multiple?: boolean; onUploaded: (url: string) => void }) {
  const ref = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  const pick = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setErr(''); setBusy(true)
    for (const file of Array.from(files)) {
      const res = await uploadPropertyImage(file)
      if (res.url) onUploaded(res.url)
      else setErr(res.error || 'Upload failed')
    }
    setBusy(false)
    if (ref.current) ref.current.value = ''
  }

  return (
    <div style={{ marginTop: 8 }}>
      <input ref={ref} type="file" accept="image/*" multiple={multiple} style={{ display: 'none' }} onChange={(e) => void pick(e.target.files)} />
      <button
        type="button"
        onClick={() => ref.current?.click()}
        disabled={busy}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 7, cursor: busy ? 'wait' : 'pointer',
          border: '1.5px dashed var(--border-default)', background: 'var(--surface-sunken)', color: 'var(--navy-700)',
          fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, padding: '8px 14px', borderRadius: 'var(--radius-md)',
        }}
      >
        <Upload size={15} /> {busy ? '업로드 중…' : label}
      </button>
      {err && <span style={{ marginLeft: 10, fontSize: 12, color: 'var(--status-danger)' }}>{err}</span>}
    </div>
  )
}

function Thumbs({ urls, onRemove }: { urls: string[]; onRemove?: (i: number) => void }) {
  if (urls.length === 0) return null
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
      {urls.map((u, i) => (
        <div key={i} style={{ position: 'relative', width: 70, height: 50, borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
          <img src={u} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          {onRemove && (
            <button type="button" onClick={() => onRemove(i)} style={{ position: 'absolute', top: 2, right: 2, width: 18, height: 18, borderRadius: '50%', border: 'none', background: 'rgba(12,20,48,0.7)', color: '#fff', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
              <X size={11} />
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

function emptyInput(): PropertyInput {
  return {
    status: 'published', listing_type: 'sale', property_type: 'apartment', slug: '', title: '',
    location: '', community: '', developer: '', price_label: '', price_note: '',
    beds: null, baths: null, area: '', badges: [], summary_ko: '', summary_en: '',
    highlights_ko: [], highlights_en: [], cover_image_url: '', image_urls: [], sort_order: 0,
  }
}

const lines = (s: string) => s.split('\n').map((x) => x.trim()).filter(Boolean)
const csv = (s: string) => s.split(',').map((x) => x.trim()).filter(Boolean)

function PropertyForm({ initial, onClose, onSaved }: { initial: PropertyInput; onClose: () => void; onSaved: () => void }) {
  const { t } = useLang()
  const [f, setF] = useState<PropertyInput>(initial)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const set = <K extends keyof PropertyInput>(k: K, v: PropertyInput[K]) => setF((p) => ({ ...p, [k]: v }))

  const save = async () => {
    setErr('')
    if (!f.slug.trim() || !f.title.trim()) { setErr(t({ ko: 'slug과 제목은 필수입니다.', en: 'Slug and title are required.' })); return }
    setBusy(true)
    const res = await saveProperty(f)
    setBusy(false)
    if (res.ok) onSaved()
    else setErr(res.error ?? t({ ko: '저장 실패', en: 'Save failed' }))
  }

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(12,20,48,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '40px 20px', overflowY: 'auto' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 'min(720px, 100%)', background: 'var(--surface-card)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xl)', padding: 28 }}>
        <h3 style={{ margin: '0 0 18px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: 'var(--navy-900)' }}>
          {f.id ? t({ ko: '매물 수정', en: 'Edit listing' }) : t({ ko: '새 매물', en: 'New listing' })}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
          <div>
            <label style={labelStyle}>{t({ ko: '상태', en: 'Status' })}</label>
            <select style={{ ...field, height: 42 }} value={f.status} onChange={(e) => set('status', e.target.value as PropertyInput['status'])}>
              <option value="published">published</option><option value="draft">draft</option><option value="archived">archived</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>{t({ ko: '거래유형', en: 'Type' })}</label>
            <select style={{ ...field, height: 42 }} value={f.listing_type} onChange={(e) => set('listing_type', e.target.value as ListingType)}>
              {LISTING_TYPES.map((lt) => <option key={lt.key} value={lt.key}>{t(lt.label)}</option>)}
            </select>
          </div>
          <LabeledInput label={t({ ko: '부동산 유형', en: 'Property type' })} value={f.property_type} onChange={(v) => set('property_type', v)} placeholder="apartment / villa / office …" />
          <LabeledInput label="slug *" value={f.slug} onChange={(v) => set('slug', v)} placeholder="palm-signature-villa" />
          <LabeledInput label={t({ ko: '제목 *', en: 'Title *' })} value={f.title} onChange={(v) => set('title', v)} />
          <LabeledInput label={t({ ko: '위치', en: 'Location' })} value={f.location} onChange={(v) => set('location', v)} />
          <LabeledInput label={t({ ko: '커뮤니티', en: 'Community' })} value={f.community} onChange={(v) => set('community', v)} />
          <LabeledInput label={t({ ko: '개발사', en: 'Developer' })} value={f.developer} onChange={(v) => set('developer', v)} />
          <LabeledInput label={t({ ko: '가격', en: 'Price' })} value={f.price_label} onChange={(v) => set('price_label', v)} placeholder="AED 32.0M" />
          <LabeledInput label={t({ ko: '가격 비고', en: 'Price note' })} value={f.price_note} onChange={(v) => set('price_note', v)} placeholder="· freehold" />
          <LabeledInput label={t({ ko: '침실', en: 'Beds' })} type="number" value={f.beds} onChange={(v) => set('beds', v === '' ? null : Number(v))} />
          <LabeledInput label={t({ ko: '욕실', en: 'Baths' })} type="number" value={f.baths} onChange={(v) => set('baths', v === '' ? null : Number(v))} />
          <LabeledInput label={t({ ko: '면적', en: 'Area' })} value={f.area} onChange={(v) => set('area', v)} placeholder="8,200 ft²" />
          <LabeledInput label={t({ ko: '정렬 순서', en: 'Sort order' })} type="number" value={f.sort_order} onChange={(v) => set('sort_order', Number(v) || 0)} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 14, marginTop: 14 }}>
          <LabeledInput label={t({ ko: '배지 (쉼표 구분)', en: 'Badges (comma)' })} value={f.badges.join(', ')} onChange={(v) => set('badges', csv(v))} placeholder="추천, Beachfront" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
            <LabeledArea label={t({ ko: '요약 (한)', en: 'Summary (KO)' })} value={f.summary_ko ?? ''} onChange={(v) => set('summary_ko', v)} />
            <LabeledArea label={t({ ko: '요약 (영)', en: 'Summary (EN)' })} value={f.summary_en ?? ''} onChange={(v) => set('summary_en', v)} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
            <LabeledArea label={t({ ko: '핵심포인트 (한, 줄바꿈)', en: 'Highlights (KO, lines)' })} value={f.highlights_ko.join('\n')} onChange={(v) => set('highlights_ko', lines(v))} />
            <LabeledArea label={t({ ko: '핵심포인트 (영, 줄바꿈)', en: 'Highlights (EN, lines)' })} value={f.highlights_en.join('\n')} onChange={(v) => set('highlights_en', lines(v))} />
          </div>
          <div>
            <LabeledInput label={t({ ko: '대표 이미지 URL', en: 'Cover image URL' })} value={f.cover_image_url} onChange={(v) => set('cover_image_url', v)} placeholder="/brand/heroes/...png 또는 https://..." />
            <ImageUploader label={t({ ko: '대표 이미지 업로드', en: 'Upload cover image' })} onUploaded={(url) => set('cover_image_url', url)} />
            <Thumbs urls={f.cover_image_url ? [f.cover_image_url] : []} onRemove={() => set('cover_image_url', '')} />
          </div>
          <div>
            <LabeledArea label={t({ ko: '갤러리 이미지 URL (줄바꿈)', en: 'Gallery image URLs (lines)' })} value={f.image_urls.join('\n')} onChange={(v) => set('image_urls', lines(v))} />
            <ImageUploader label={t({ ko: '갤러리 이미지 추가', en: 'Add gallery images' })} multiple onUploaded={(url) => setF((p) => ({ ...p, image_urls: [...p.image_urls, url] }))} />
            <Thumbs urls={f.image_urls} onRemove={(i) => setF((p) => ({ ...p, image_urls: p.image_urls.filter((_, j) => j !== i) }))} />
          </div>
        </div>

        {err && <p style={{ margin: '14px 0 0', fontSize: 13, color: 'var(--status-danger)' }}>{err}</p>}
        <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
          <Button variant="outline" fullWidth onClick={onClose}>{t({ ko: '취소', en: 'Cancel' })}</Button>
          <Button variant="gold" fullWidth disabled={busy} onClick={save}>{busy ? '…' : t({ ko: '저장', en: 'Save' })}</Button>
        </div>
      </div>
    </div>
  )
}

export function PropertyManager() {
  const { t } = useLang()
  const [rows, setRows] = useState<PropertyRow[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<PropertyInput | null>(null)

  const load = useCallback(async () => { setLoading(true); setRows(await fetchAllProperties()); setLoading(false) }, [])
  useEffect(() => { void load() }, [load])

  const remove = async (r: PropertyRow) => {
    if (!confirm(t({ ko: `"${r.title}" 매물을 삭제할까요?`, en: `Delete "${r.title}"?` }))) return
    await deleteProperty(r.id)
    void load()
  }

  const th: React.CSSProperties = { padding: '11px 14px', fontWeight: 600, whiteSpace: 'nowrap' }
  const td: React.CSSProperties = { padding: '12px 14px', fontSize: 13.5, color: 'var(--navy-900)' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
        <Button variant="gold" size="sm" iconLeft={<Plus size={15} />} onClick={() => setEditing(emptyInput())}>{t({ ko: '새 매물', en: 'New listing' })}</Button>
      </div>
      <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', overflowX: 'auto' }}>
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>{t({ ko: '불러오는 중…', en: 'Loading…' })}</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)', minWidth: 720 }}>
            <thead><tr style={{ textAlign: 'left', background: 'var(--surface-sunken)', color: 'var(--text-muted)', fontSize: 12.5 }}>
              <th style={th}>{t({ ko: '제목', en: 'Title' })}</th><th style={th}>{t({ ko: '유형', en: 'Type' })}</th><th style={th}>{t({ ko: '지역', en: 'Area' })}</th><th style={th}>{t({ ko: '가격', en: 'Price' })}</th><th style={th}>{t({ ko: '상태', en: 'Status' })}</th><th style={th}></th>
            </tr></thead>
            <tbody>
              {rows.length === 0 ? (
                <tr><td style={{ ...td, textAlign: 'center', color: 'var(--text-muted)' }} colSpan={6}>{t({ ko: '매물이 없습니다.', en: 'No listings.' })}</td></tr>
              ) : rows.map((r) => (
                <tr key={r.id} style={{ borderTop: '1px solid var(--border-subtle)' }}>
                  <td style={{ ...td, fontWeight: 600 }}>{r.title}<div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{r.slug}</div></td>
                  <td style={td}>{t(LISTING_TYPES.find((l) => l.key === r.listing_type)?.label ?? { ko: r.listing_type, en: r.listing_type })}</td>
                  <td style={td}>{r.location}</td>
                  <td style={{ ...td, fontFamily: 'var(--font-mono)', fontSize: 12.5 }}>{r.price_label}</td>
                  <td style={td}><Badge tone={STATUS_TONE[r.status]} solid={r.status === 'published'}>{r.status}</Badge></td>
                  <td style={{ ...td, whiteSpace: 'nowrap' }}>
                    <button onClick={() => setEditing(r)} title="edit" style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--navy-600)', padding: 6 }}><Pencil size={16} /></button>
                    <button onClick={() => void remove(r)} title="delete" style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--status-danger)', padding: 6 }}><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {editing && <PropertyForm initial={editing} onClose={() => setEditing(null)} onSaved={() => { setEditing(null); void load() }} />}
    </div>
  )
}
