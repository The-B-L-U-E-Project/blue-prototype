import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Context, MiddlewareHandler } from 'hono'
import type { Database } from '../database.types'
import type { HonoEnv } from '../types'

declare module 'hono' {
  interface ContextVariableMap {
    supabase: SupabaseClient<Database>
  }
}

export const supabaseMiddleware = (): MiddlewareHandler<HonoEnv> => async (c, next) => {
  const token = c.req.header('Authorization')?.replace('Bearer ', '')

  const supabase = createClient<Database>(c.env.SUPABASE_URL, c.env.SUPABASE_ANON_KEY, {
    global: {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    },
    auth: { persistSession: false, autoRefreshToken: false },
  })

  c.set('supabase', supabase)
  await next()
}

export const getAuthenticatedUser = async (c: Context) => {
  const supabase = c.get('supabase')
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error: error?.message ?? null }
}

// Bypasses RLS — use only in webhooks / admin routes
export const getServiceSupabase = (c: Context<HonoEnv>) =>
  createClient<Database>(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
