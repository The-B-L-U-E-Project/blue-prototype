import { Hono } from 'hono'
import type { HonoEnv } from '../types'

const walkthroughs = new Hono<HonoEnv>()

walkthroughs.get('/:id', (c) => c.json({ error: 'Not implemented' }, 501))

export default walkthroughs
