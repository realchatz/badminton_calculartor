import { db } from '../utils/db'
import { members } from '../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (!body.name) {
    throw createError({ statusCode: 400, message: 'Name is required' })
  }

  const newMember = {
    id: crypto.randomUUID(),
    name: body.name,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  await db.insert(members).values(newMember)
  return newMember
})
