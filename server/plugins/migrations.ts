import { db } from '../utils/db'
import { sql } from 'drizzle-orm'

export default defineNitroPlugin(async (nitroApp) => {
  console.log('Running database migrations...')
  
  try {
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS members (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
    `)

    await db.run(sql`
      CREATE TABLE IF NOT EXISTS tubes (
        id TEXT PRIMARY KEY,
        tube_no INTEGER NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
    `)

    await db.run(sql`
      CREATE TABLE IF NOT EXISTS shuttlecocks (
        id TEXT PRIMARY KEY,
        tube_id TEXT NOT NULL REFERENCES tubes(id) ON DELETE CASCADE,
        shuttlecock_no INTEGER NOT NULL,
        fee_per_player REAL NOT NULL DEFAULT 20,
        status TEXT NOT NULL DEFAULT 'Pending',
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
    `)

    await db.run(sql`
      CREATE TABLE IF NOT EXISTS shuttlecock_players (
        id TEXT PRIMARY KEY,
        shuttlecock_id TEXT NOT NULL REFERENCES shuttlecocks(id) ON DELETE CASCADE,
        member_id TEXT NOT NULL REFERENCES members(id),
        member_name TEXT NOT NULL,
        is_paid INTEGER NOT NULL DEFAULT 0,
        paid_at TEXT
      );
    `)

    console.log('Database migrations completed successfully.')
  } catch (error) {
    console.error('Database migration failed:', error)
  }
})
