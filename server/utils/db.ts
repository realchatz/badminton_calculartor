import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from '../database/schema'

const client = createClient({
  url: process.env.DATABASE_URL || 'file:badminton.db',
})

export const db = drizzle(client, { schema })
