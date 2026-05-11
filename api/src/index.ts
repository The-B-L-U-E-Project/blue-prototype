import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { supabaseMiddleware } from './middleware/auth.middleware'
import type { HonoEnv } from './types'
import subjects from './routes/subjects'
import walkthroughs from './routes/walkthroughs'
import guides from './routes/guides'

const app = new Hono<HonoEnv>()
  .use((c, next) => cors({ origin: c.env.APP_URL })(c, next))
  .use(supabaseMiddleware())
  .get('/', (c) => c.json({ ok: true }))

  .route('/subjects', subjects)
  .route('/walkthroughs', walkthroughs)
  .route('/guides', guides)

export default app
export type AppType = typeof app
