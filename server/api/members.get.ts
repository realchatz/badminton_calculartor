import { db } from '../utils/db'
import { members } from '../database/schema'

export default defineEventHandler(async (event) => {
  return await db.select().from(members).all()
})
