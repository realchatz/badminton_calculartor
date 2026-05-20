import { db } from '../utils/db'
import { members } from '../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (!body.id) {
    throw createError({ statusCode: 400, message: 'ID is required' })
  }

  await db.delete(members).where(eq(members.id, body.id))
  return { success: true }
})
