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

const removePlayer_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { shuttlecockId, playerId } = body;
  if (!shuttlecockId || !playerId) {
    throw createError({ statusCode: 400, message: "Missing required fields" });
  }
  await db.transaction(async (tx) => {
    await tx.delete(shuttlecockPlayers).where(eq(shuttlecockPlayers.id, playerId));
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

export { removePlayer_post as default };
//# sourceMappingURL=remove-player.post.mjs.map
