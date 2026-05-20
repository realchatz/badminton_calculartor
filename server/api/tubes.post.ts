import { db } from '../utils/db'
import { tubes, shuttlecocks } from '../database/schema'
import { count } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const tubeId = crypto.randomUUID()
  
  // Get current count for tubeNo
  const [{ value: tubeCount }] = await db.select({ value: count() }).from(tubes)
  const tubeNo = (tubeCount || 0) + 1
  
  const now = new Date().toISOString()
  
  await db.transaction(async (tx) => {
    await tx.insert(tubes).values({
      id: tubeId,
      tubeNo,
      createdAt: now,
      updatedAt: now
    })

    const shuttlecockValues = Array.from({ length: 12 }, (_, i) => ({
      id: crypto.randomUUID(),
      tubeId,
      shuttlecockNo: i + 1,
      feePerPlayer: 20,
      status: 'Pending',
      createdAt: now,
      updatedAt: now
    }))

    await tx.insert(shuttlecocks).values(shuttlecockValues)
  })

  return { id: tubeId }
})
