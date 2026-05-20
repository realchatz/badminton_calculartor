import { db } from '../utils/db'
import { tubes } from '../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (!body.id) {
    throw createError({ statusCode: 400, message: 'ID is required' })
  }

  await db.delete(tubes).where(eq(tubes.id, body.id))
  return { success: true }
})
