import { supabase } from './supabaseClient'
import type { Localized } from '../i18n/LanguageContext'

export type ListingType = 'sale' | 'rent' | 'offplan' | 'investment'

export const LISTING_TYPES: { key: ListingType; label: Localized<string> }[] = [
  { key: 'sale', label: { ko: '매매', en: 'Sale' } },
  { key: 'rent', label: { ko: '임대', en: 'Rent' } },
  { key: 'offplan', label: { ko: '분양', en: 'Off-plan' } },
  { key: 'investment', label: { ko: '투자매물', en: 'Investment' } },
]

/** Shape consumed by PropertyCard / detail (slug as id). */
export interface Listing {
  id: string
  type: ListingType
  image: string
  gallery: string[]
  title: string
  location: string
  community: string
  developer?: string
  price: string
  priceNote: string
  beds?: number | null
  baths?: number | null
  area: string
  badges: string[]
  summary: Localized<string>
  highlights: Localized<string>[]
}

/** Raw DB row (admin). */
export interface PropertyRow {
  id: string
  status: 'draft' | 'published' | 'archived'
  listing_type: ListingType
  property_type: string | null
  slug: string
  title: string
  location: string | null
  community: string | null
  developer: string | null
  price_label: string | null
  price_note: string | null
  beds: number | null
  baths: number | null
  area: string | null
  badges: string[]
  summary_ko: string | null
  summary_en: string | null
  highlights_ko: string[]
  highlights_en: string[]
  cover_image_url: string | null
  image_urls: string[]
  sort_order: number
  created_at: string
}

function toListing(r: PropertyRow): Listing {
  const hk = r.highlights_ko ?? []
  const he = r.highlights_en ?? []
  const n = Math.max(hk.length, he.length)
  const highlights: Localized<string>[] = Array.from({ length: n }, (_, i) => ({
    ko: hk[i] ?? he[i] ?? '',
    en: he[i] ?? hk[i] ?? '',
  }))
  return {
    id: r.slug,
    type: r.listing_type,
    image: r.cover_image_url ?? '',
    gallery: r.image_urls?.length ? r.image_urls : r.cover_image_url ? [r.cover_image_url] : [],
    title: r.title,
    location: r.location ?? '',
    community: r.community ?? '',
    developer: r.developer ?? undefined,
    price: r.price_label ?? '',
    priceNote: r.price_note ?? '',
    beds: r.beds,
    baths: r.baths,
    area: r.area ?? '',
    badges: r.badges ?? [],
    summary: { ko: r.summary_ko ?? '', en: r.summary_en ?? '' },
    highlights,
  }
}

/** Published listings for the public site. */
export async function fetchListings(): Promise<Listing[]> {
  if (!supabase) return []
  const { data } = await supabase.from('properties').select('*').eq('status', 'published').order('sort_order')
  return ((data as PropertyRow[]) ?? []).map(toListing)
}

export async function fetchListingBySlug(slug: string): Promise<Listing | null> {
  if (!supabase) return null
  const { data } = await supabase.from('properties').select('*').eq('slug', slug).maybeSingle()
  return data ? toListing(data as PropertyRow) : null
}

/* ---- Admin ---- */
export async function fetchAllProperties(): Promise<PropertyRow[]> {
  if (!supabase) return []
  const { data } = await supabase.from('properties').select('*').order('sort_order')
  return (data as PropertyRow[]) ?? []
}

export type PropertyInput = Omit<PropertyRow, 'id' | 'created_at'> & { id?: string }

export async function saveProperty(row: PropertyInput): Promise<{ ok: boolean; error?: string }> {
  if (!supabase) return { ok: false, error: 'Supabase not configured' }
  const { id, ...rest } = row
  const res = id
    ? await supabase.from('properties').update(rest).eq('id', id)
    : await supabase.from('properties').insert(rest)
  return res.error ? { ok: false, error: res.error.message } : { ok: true }
}

export async function deleteProperty(id: string): Promise<{ ok: boolean; error?: string }> {
  if (!supabase) return { ok: false, error: 'Supabase not configured' }
  const { error } = await supabase.from('properties').delete().eq('id', id)
  return error ? { ok: false, error: error.message } : { ok: true }
}
