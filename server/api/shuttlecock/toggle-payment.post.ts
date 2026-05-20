import { db } from '../../utils/db'
import { shuttlecocks, shuttlecockPlayers } from '../../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { shuttlecockId, playerId } = body

  if (!shuttlecockId || !playerId) {
    throw createError({ statusCode: 400, message: 'Missing required fields' })
  }

  const player = await db.query.shuttlecockPlayers.findFirst({
    where: eq(shuttlecockPlayers.id, playerId)
  })

  if (!player) {
    throw createError({ statusCode: 404, message: 'Player not found' })
  }

  const newIsPaid = !player.isPaid

  await db.transaction(async (tx) => {
    await tx.update(shuttlecockPlayers)
      .set({ 
        isPaid: newIsPaid,
        paidAt: newIsPaid ? new Date().toISOString() : null
      })
      .where(eq(shuttlecockPlayers.id, playerId))
    
    // Refresh players and update status
    const players = await tx.query.shuttlecockPlayers.findMany({
      where: eq(shuttlecockPlayers.shuttlecockId, shuttlecockId)
    })
    
    const allPaid = players.length === 4 && players.every(p => p.isPaid)
    
    await tx.update(shuttlecocks)
      .set({ 
        status: allPaid ? 'Completed' : 'Pending',
        updatedAt: new Date().toISOString()
      })
      .where(eq(shuttlecocks.id, shuttlecockId))
  })

  return { success: true }
})
