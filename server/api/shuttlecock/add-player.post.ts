import { db } from '../../utils/db'
import { shuttlecocks, shuttlecockPlayers } from '../../database/schema'
import { eq, and } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { shuttlecockId, memberId, memberName } = body

  if (!shuttlecockId || !memberId || !memberName) {
    throw createError({ statusCode: 400, message: 'Missing required fields' })
  }

  const shuttlecock = await db.query.shuttlecocks.findFirst({
    where: eq(shuttlecocks.id, shuttlecockId),
    with: { players: true }
  })

  if (!shuttlecock) {
    throw createError({ statusCode: 404, message: 'Shuttlecock not found' })
  }

  if (shuttlecock.players.length >= 4) {
    throw createError({ statusCode: 400, message: 'Maximum 4 players allowed' })
  }

  const newPlayer = {
    id: crypto.randomUUID(),
    shuttlecockId,
    memberId,
    memberName,
    isPaid: false,
  }

  await db.transaction(async (tx) => {
    await tx.insert(shuttlecockPlayers).values(newPlayer)
    
    // Update shuttlecock status if needed (though it can't be completed with < 4 players, 
    // but just to be safe if business rules change)
    const updatedPlayers = [...shuttlecock.players, newPlayer]
    const allPaid = updatedPlayers.length === 4 && updatedPlayers.every(p => p.isPaid)
    
    await tx.update(shuttlecocks)
      .set({ 
        status: allPaid ? 'Completed' : 'Pending',
        updatedAt: new Date().toISOString()
      })
      .where(eq(shuttlecocks.id, shuttlecockId))
  })

  return newPlayer
})
