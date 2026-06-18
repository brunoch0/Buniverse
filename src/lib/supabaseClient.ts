import { createClient } from '@supabase/supabase-js'

// Buniverse Supabase project: tovxutyvbkljcxuifxgj
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

/**
 * Shared browser Supabase client.
 * Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in `.env.local`.
 * Stays null until env vars are provided so the marketing site renders
 * without a backend during brand review.
 */
export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null
