import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { sqliteTable, text, real, integer } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

const members = sqliteTable("members", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull()
});
const tubes = sqliteTable("tubes", {
  id: text("id").primaryKey(),
  tubeNo: integer("tube_no").notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull()
});
const tubesRelations = relations(tubes, ({ many }) => ({
  shuttlecocks: many(shuttlecocks)
}));
const shuttlecocks = sqliteTable("shuttlecocks", {
  id: text("id").primaryKey(),
  tubeId: text("tube_id").notNull().references(() => tubes.id, { onDelete: "cascade" }),
  shuttlecockNo: integer("shuttlecock_no").notNull(),
  feePerPlayer: real("fee_per_player").notNull().default(20),
  status: text("status").notNull().default("Pending"),
  // 'Pending' | 'Completed'
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull()
});
const shuttlecocksRelations = relations(shuttlecocks, ({ one, many }) => ({
  tube: one(tubes, {
    fields: [shuttlecocks.tubeId],
    references: [tubes.id]
  }),
  players: many(shuttlecockPlayers)
}));
const shuttlecockPlayers = sqliteTable("shuttlecock_players", {
  id: text("id").primaryKey(),
  shuttlecockId: text("shuttlecock_id").notNull().references(() => shuttlecocks.id, { onDelete: "cascade" }),
  memberId: text("member_id").notNull().references(() => members.id),
  memberName: text("member_name").notNull(),
  isPaid: integer("is_paid", { mode: "boolean" }).notNull().default(false),
  paidAt: text("paid_at")
});
const shuttlecockPlayersRelations = relations(shuttlecockPlayers, ({ one }) => ({
  shuttlecock: one(shuttlecocks, {
    fields: [shuttlecockPlayers.shuttlecockId],
    references: [shuttlecocks.id]
  }),
  member: one(members, {
    fields: [shuttlecockPlayers.memberId],
    references: [members.id]
  })
}));

const schema = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  members: members,
  shuttlecockPlayers: shuttlecockPlayers,
  shuttlecockPlayersRelations: shuttlecockPlayersRelations,
  shuttlecocks: shuttlecocks,
  shuttlecocksRelations: shuttlecocksRelations,
  tubes: tubes,
  tubesRelations: tubesRelations
}, Symbol.toStringTag, { value: 'Module' }));

const client = createClient({
  url: "file:badminton.db"
});
const db = drizzle(client, { schema });

export { shuttlecocks as a, db as d, members as m, shuttlecockPlayers as s, tubes as t };
//# sourceMappingURL=db.mjs.map
