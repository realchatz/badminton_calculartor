import { db } from '../../utils/db'
import { shuttlecocks } from '../../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { shuttlecockId, fee } = body

  if (!shuttlecockId || fee === undefined) {
    throw createError({ statusCode: 400, message: 'Missing required fields' })
  }

  await db.update(shuttlecocks)
    .set({ 
      feePerPlayer: fee,
      updatedAt: new Date().toISOString()
    })
    .where(eq(shuttlecocks.id, shuttlecockId))

  return { success: true }
})
