import { supabase } from './supabaseClient'
import type { Session } from '@supabase/supabase-js'

export const authConfigured = !!supabase

export async function signInWithPassword(email: string, password: string) {
  if (!supabase) return { error: 'Supabase not configured' }
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  return { error: error?.message }
}

export async function sendOtp(email: string) {
  if (!supabase) return { error: 'Supabase not configured' }
  const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: true } })
  return { error: error?.message }
}

export async function verifyOtp(email: string, token: string) {
  if (!supabase) return { error: 'Supabase not configured' }
  const { error } = await supabase.auth.verifyOtp({ email, token, type: 'email' })
  return { error: error?.message }
}

export async function signOut() {
  await supabase?.auth.signOut()
}

export async function getSession(): Promise<Session | null> {
  if (!supabase) return null
  const { data } = await supabase.auth.getSession()
  return data.session
}

/** Returns true if the current user is allowlisted as admin (owner or admin). */
export async function checkIsAdmin(): Promise<boolean> {
  if (!supabase) return false
  const { data, error } = await supabase.rpc('is_admin')
  if (error) return false
  return data === true
}

export type AdminRole = 'owner' | 'admin'

/** Resolve the current user's role: owner (full access) or admin. */
export async function checkRole(): Promise<AdminRole | null> {
  if (!supabase) return null
  const [{ data: admin }, { data: owner }] = await Promise.all([
    supabase.rpc('is_admin'),
    supabase.rpc('is_owner'),
  ])
  if (owner === true) return 'owner'
  if (admin === true) return 'admin'
  return null
}

export function onAuthChange(cb: (session: Session | null) => void) {
  if (!supabase) return () => {}
  const { data } = supabase.auth.onAuthStateChange((_e, session) => cb(session))
  return () => data.subscription.unsubscribe()
}
