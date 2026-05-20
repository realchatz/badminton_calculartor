import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'

export const members = sqliteTable('members', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
})

export const tubes = sqliteTable('tubes', {
  id: text('id').primaryKey(),
  tubeNo: integer('tube_no').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
})

export const tubesRelations = relations(tubes, ({ many }) => ({
  shuttlecocks: many(shuttlecocks),
}))

export const shuttlecocks = sqliteTable('shuttlecocks', {
  id: text('id').primaryKey(),
  tubeId: text('tube_id').notNull().references(() => tubes.id, { onDelete: 'cascade' }),
  shuttlecockNo: integer('shuttlecock_no').notNull(),
  feePerPlayer: real('fee_per_player').notNull().default(20),
  status: text('status').notNull().default('Pending'), // 'Pending' | 'Completed'
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
})

export const shuttlecocksRelations = relations(shuttlecocks, ({ one, many }) => ({
  tube: one(tubes, {
    fields: [shuttlecocks.tubeId],
    references: [tubes.id],
  }),
  players: many(shuttlecockPlayers),
}))

export const shuttlecockPlayers = sqliteTable('shuttlecock_players', {
  id: text('id').primaryKey(),
  shuttlecockId: text('shuttlecock_id').notNull().references(() => shuttlecocks.id, { onDelete: 'cascade' }),
  memberId: text('member_id').notNull().references(() => members.id),
  memberName: text('member_name').notNull(),
  isPaid: integer('is_paid', { mode: 'boolean' }).notNull().default(false),
  paidAt: text('paid_at'),
})

export const shuttlecockPlayersRelations = relations(shuttlecockPlayers, ({ one }) => ({
  shuttlecock: one(shuttlecocks, {
    fields: [shuttlecockPlayers.shuttlecockId],
    references: [shuttlecocks.id],
  }),
  member: one(members, {
    fields: [shuttlecockPlayers.memberId],
    references: [members.id],
  }),
}))
