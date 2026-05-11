import { hc } from 'hono/client'
import type { AppType } from 'api'
import { supabase } from '@/lib/supabase'

const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:8787'

export const api = hc<AppType>(API_BASE, {
  async headers() {
    const { data: { session } } = await supabase.auth.getSession()
    return session?.access_token
      ? { Authorization: `Bearer ${session.access_token}` }
      : {}
  },
})
