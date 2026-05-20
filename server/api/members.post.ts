import { db } from '../utils/db'
import { members } from '../database/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (!body.name) {
    throw createError({ statusCode: 400, message: 'Name is required' })
  }

  const now = new Date().toISOString()
  const newMember = {
    id: crypto.randomUUID(),
    name: body.name,
    createdAt: now,
    updatedAt: now,
  }

  await db.insert(members).values(newMember)
  return newMember
})
