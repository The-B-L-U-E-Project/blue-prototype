import { Hono } from 'hono'
import type { HonoEnv } from '../types'

const subjects = new Hono<HonoEnv>()

subjects.get('/', (c) => c.json({ error: 'Not implemented' }, 501))

subjects.get('/:id', (c) => c.json({ error: 'Not implemented' }, 501))

export default subjects
