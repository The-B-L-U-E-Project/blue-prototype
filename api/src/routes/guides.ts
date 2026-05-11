import { Hono } from 'hono'
import { getAuthenticatedUser } from '../middleware/auth.middleware'
import type { HonoEnv } from '../types'

const guides = new Hono<HonoEnv>()

guides.get('/:id', (c) => c.json({ error: 'Not implemented' }, 501))

guides.post('/', async (c) => {
  const { user } = await getAuthenticatedUser(c)
  if (!user) return c.json({ error: 'Unauthorized' }, 401)
  return c.json({ error: 'Not implemented' }, 501)
})

guides.patch('/:id', async (c) => {
  const { user } = await getAuthenticatedUser(c)
  if (!user) return c.json({ error: 'Unauthorized' }, 401)
  return c.json({ error: 'Not implemented' }, 501)
})

guides.post('/:id/submit', async (c) => {
  const { user } = await getAuthenticatedUser(c)
  if (!user) return c.json({ error: 'Unauthorized' }, 401)
  return c.json({ error: 'Not implemented' }, 501)
})

guides.delete('/:id', async (c) => {
  const { user } = await getAuthenticatedUser(c)
  if (!user) return c.json({ error: 'Unauthorized' }, 401)
  return c.json({ error: 'Not implemented' }, 501)
})

guides.get('/:id/methods', (c) => c.json({ error: 'Not implemented' }, 501))

guides.get('/:id/methods/:methodId', (c) => c.json({ error: 'Not implemented' }, 501))

guides.post('/:id/methods', async (c) => {
  const { user } = await getAuthenticatedUser(c)
  if (!user) return c.json({ error: 'Unauthorized' }, 401)
  return c.json({ error: 'Not implemented' }, 501)
})

guides.patch('/:id/methods/:methodId', async (c) => {
  const { user } = await getAuthenticatedUser(c)
  if (!user) return c.json({ error: 'Unauthorized' }, 401)
  return c.json({ error: 'Not implemented' }, 501)
})

guides.delete('/:id/methods/:methodId', async (c) => {
  const { user } = await getAuthenticatedUser(c)
  if (!user) return c.json({ error: 'Unauthorized' }, 401)
  return c.json({ error: 'Not implemented' }, 501)
})

export default guides
