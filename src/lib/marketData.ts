import { supabase } from './supabaseClient'

/** Aggregated DLD area metrics (snapshot imported from data.dubaitoday.org). */
export interface AreaSummary {
  month: string
  area_name: string
  transaction_count: number
  median_value_aed: number
  price_per_sqm: number
  ready_count: number
  offplan_count: number
  liquidity: number
  premium: number
  affordable: number
  value_growth_pct: number | null
  as_of: string
  period_start: string | null
  period_end: string | null
  source: string
  source_url: string
}

/** Approximate centroids (lat, lng) for mapping DLD communities. */
export const AREA_COORDS: Record<string, [number, number]> = {
  'Jumeirah Village Circle': [25.058, 55.207],
  'Jumeirah Village Triangle': [25.05, 55.18],
  'Business Bay': [25.187, 55.265],
  'Business Park': [25.01, 55.19],
  'Al Yelayiss 1': [24.93, 55.22],
  'Al Yelayiss 5': [24.92, 55.2],
  'Dubai Land Residence Complex': [25.038, 55.301],
  'Madinat Al Mataar': [24.896, 55.161],
  "Me'aisem Second": [25.04, 55.18],
  Majan: [25.052, 55.269],
  'Palm Deira': [25.3, 55.33],
  'Dubai Sports City': [25.035, 55.218],
  'Dubai Production City': [25.0, 55.19],
  'Burj Khalifa': [25.197, 55.274],
  'Motor City': [25.045, 55.238],
  'Jabal Ali First': [25.001, 55.103],
  'Al Khairan First': [25.2, 55.34],
  'Al Satwa': [25.225, 55.27],
  'Dubai Investment Park First': [24.972, 55.178],
  'International City Ph 2 & 3': [25.165, 55.408],
  'Al Hebiah Fifth': [25.03, 55.225],
  'City Of Arabia': [25.048, 55.272],
  Arjan: [25.061, 55.238],
}

export async function fetchMarketAreas(): Promise<AreaSummary[]> {
  if (!supabase) return []
  const { data } = await supabase
    .from('market_area_summary')
    .select('*')
    .order('transaction_count', { ascending: false })
  return (data as AreaSummary[]) ?? []
}

/** AED 745000 -> "AED 0.75M" / "AED 745K". */
export function fmtAed(v: number | null | undefined): string {
  if (v == null) return '—'
  if (v >= 1_000_000) return `AED ${(v / 1_000_000).toFixed(2)}M`
  if (v >= 1_000) return `AED ${Math.round(v / 1_000)}K`
  return `AED ${v}`
}

export function offplanRatio(a: AreaSummary): number {
  const total = (a.ready_count ?? 0) + (a.offplan_count ?? 0)
  return total > 0 ? Math.round((a.offplan_count / total) * 100) : 0
}
