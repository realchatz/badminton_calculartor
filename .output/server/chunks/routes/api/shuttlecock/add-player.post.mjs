import { b as defineEventHandler, v as readBody, c as createError } from '../../../_/nitro.mjs';
import { d as db, a as shuttlecocks, s as shuttlecockPlayers } from '../../../_/db.mjs';
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

const addPlayer_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { shuttlecockId, memberId, memberName } = body;
  if (!shuttlecockId || !memberId || !memberName) {
    throw createError({ statusCode: 400, message: "Missing required fields" });
  }
  const shuttlecock = await db.query.shuttlecocks.findFirst({
    where: eq(shuttlecocks.id, shuttlecockId),
    with: { players: true }
  });
  if (!shuttlecock) {
    throw createError({ statusCode: 404, message: "Shuttlecock not found" });
  }
  if (shuttlecock.players.length >= 4) {
    throw createError({ statusCode: 400, message: "Maximum 4 players allowed" });
  }
  if (shuttlecock.players.some((p) => p.memberId === memberId)) {
    throw createError({ statusCode: 400, message: "Member already added" });
  }
  const newPlayer = {
    id: crypto.randomUUID(),
    shuttlecockId,
    memberId,
    memberName,
    isPaid: false
  };
  await db.transaction(async (tx) => {
    await tx.insert(shuttlecockPlayers).values(newPlayer);
    const updatedPlayers = [...shuttlecock.players, newPlayer];
    const allPaid = updatedPlayers.length === 4 && updatedPlayers.every((p) => p.isPaid);
    await tx.update(shuttlecocks).set({
      status: allPaid ? "Completed" : "Pending",
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    }).where(eq(shuttlecocks.id, shuttlecockId));
  });
  return newPlayer;
});

export { addPlayer_post as default };
//# sourceMappingURL=add-player.post.mjs.map
