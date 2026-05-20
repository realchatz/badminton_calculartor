import { b as defineEventHandler, v as readBody, c as createError } from '../../../_/nitro.mjs';
import { d as db, s as shuttlecockPlayers, a as shuttlecocks } from '../../../_/db.mjs';
import { eq } from 'drizzle-orm';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'drizzle-orm/libsql';
import '@libsql/client';
import 'drizzle-orm/sqlite-core';

const togglePayment_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { shuttlecockId, playerId } = body;
  if (!shuttlecockId || !playerId) {
    throw createError({ statusCode: 400, message: "Missing required fields" });
  }
  const player = await db.query.shuttlecockPlayers.findFirst({
    where: eq(shuttlecockPlayers.id, playerId)
  });
  if (!player) {
    throw createError({ statusCode: 404, message: "Player not found" });
  }
  const newIsPaid = !player.isPaid;
  await db.transaction(async (tx) => {
    await tx.update(shuttlecockPlayers).set({
      isPaid: newIsPaid,
      paidAt: newIsPaid ? (/* @__PURE__ */ new Date()).toISOString() : null
    }).where(eq(shuttlecockPlayers.id, playerId));
    const players = await tx.query.shuttlecockPlayers.findMany({
      where: eq(shuttlecockPlayers.shuttlecockId, shuttlecockId)
    });
    const allPaid = players.length === 4 && players.every((p) => p.isPaid);
    await tx.update(shuttlecocks).set({
      status: allPaid ? "Completed" : "Pending",
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    }).where(eq(shuttlecocks.id, shuttlecockId));
  });
  return { success: true };
});

export { togglePayment_post as default };
//# sourceMappingURL=toggle-payment.post.mjs.map
