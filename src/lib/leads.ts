import { supabase } from './supabaseClient'

export interface EnquiryInput {
  name: string
  phone?: string
  email?: string
  message?: string
  source_page?: string
  lang?: string
}

export interface TourRequestInput {
  name: string
  phone: string
  email: string
  lang?: string
  residence_country?: string
  budget_min?: number | null
  budget_max?: number | null
  regions?: string[]
  developers?: string[]
  asset_types?: string[]
  purpose?: string
  tour_month?: string
  participants?: number | null
  contact_channel?: string
  message?: string
}

export interface SubmitResult {
  ok: boolean
  error?: string
}

const NOT_CONFIGURED = 'Supabase is not configured (missing env).'

export async function submitEnquiry(input: EnquiryInput): Promise<SubmitResult> {
  if (!supabase) return { ok: false, error: NOT_CONFIGURED }
  const { error } = await supabase.from('enquiries').insert({
    name: input.name,
    phone: input.phone ?? null,
    email: input.email ?? null,
    message: input.message ?? null,
    source_page: input.source_page ?? null,
    lang: input.lang ?? 'ko',
  })
  return error ? { ok: false, error: error.message } : { ok: true }
}

export type LeadStatus = 'new' | 'progress' | 'done'

export interface EnquiryRow {
  id: string
  created_at: string
  name: string
  phone: string | null
  email: string | null
  message: string | null
  source_page: string | null
  lang: string
  status: LeadStatus
}

export interface TourRow {
  id: string
  created_at: string
  name: string
  phone: string
  email: string
  residence_country: string | null
  budget_min: number | null
  budget_max: number | null
  regions: string[]
  developers: string[]
  asset_types: string[]
  purpose: string | null
  tour_month: string | null
  participants: number | null
  contact_channel: string | null
  message: string | null
  status: LeadStatus
}

export async function fetchEnquiries(): Promise<EnquiryRow[]> {
  if (!supabase) return []
  const { data } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false })
  return (data as EnquiryRow[]) ?? []
}

export async function fetchTourRequests(): Promise<TourRow[]> {
  if (!supabase) return []
  const { data } = await supabase.from('tour_requests').select('*').order('created_at', { ascending: false })
  return (data as TourRow[]) ?? []
}

export async function updateLeadStatus(table: 'enquiries' | 'tour_requests', id: string, status: LeadStatus): Promise<SubmitResult> {
  if (!supabase) return { ok: false, error: NOT_CONFIGURED }
  const { error } = await supabase.from(table).update({ status }).eq('id', id)
  return error ? { ok: false, error: error.message } : { ok: true }
}

export async function submitTourRequest(input: TourRequestInput): Promise<SubmitResult> {
  if (!supabase) return { ok: false, error: NOT_CONFIGURED }
  const { error } = await supabase.from('tour_requests').insert({
    name: input.name,
    phone: input.phone,
    email: input.email,
    lang: input.lang ?? 'ko',
    residence_country: input.residence_country ?? null,
    budget_min: input.budget_min ?? null,
    budget_max: input.budget_max ?? null,
    regions: input.regions ?? [],
    developers: input.developers ?? [],
    asset_types: input.asset_types ?? [],
    purpose: input.purpose ?? null,
    tour_month: input.tour_month ?? null,
    participants: input.participants ?? null,
    contact_channel: input.contact_channel ?? null,
    message: input.message ?? null,
  })
  return error ? { ok: false, error: error.message } : { ok: true }
}
