export type Bindings = {
  SUPABASE_URL: string
  SUPABASE_ANON_KEY: string
  SUPABASE_SERVICE_ROLE_KEY: string
  APP_URL: string
}

export type HonoEnv = { Bindings: Bindings }
