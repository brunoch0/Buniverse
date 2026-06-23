import { supabase } from './supabaseClient'

const BUCKET = 'property-images'

/** Uploads an image to Supabase Storage and returns its public URL. */
export async function uploadPropertyImage(file: File): Promise<{ url?: string; error?: string }> {
  if (!supabase) return { error: 'Supabase not configured' }
  if (!file.type.startsWith('image/')) return { error: 'Not an image file' }
  if (file.size > 10 * 1024 * 1024) return { error: 'Image too large (max 10MB)' }

  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '')
  const rand = Math.random().toString(36).slice(2, 10)
  const path = `${Date.now()}-${rand}.${ext}`

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    upsert: false,
    contentType: file.type,
    cacheControl: '3600',
  })
  if (error) return { error: error.message }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return { url: data.publicUrl }
}
