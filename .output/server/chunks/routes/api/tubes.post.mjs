import { b as defineEventHandler } from '../../_/nitro.mjs';
import { d as db, t as tubes, a as shuttlecocks } from '../../_/db.mjs';
import { count } from 'drizzle-orm';
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

const tubes_post = defineEventHandler(async (event) => {
  const tubeId = crypto.randomUUID();
  const [{ value: tubeCount }] = await db.select({ value: count() }).from(tubes);
  const tubeNo = (tubeCount || 0) + 1;
  const now = (/* @__PURE__ */ new Date()).toISOString();
  await db.transaction(async (tx) => {
    await tx.insert(tubes).values({
      id: tubeId,
      tubeNo,
      createdAt: now,
      updatedAt: now
    });
    const shuttlecockValues = Array.from({ length: 12 }, (_, i) => ({
      id: crypto.randomUUID(),
      tubeId,
      shuttlecockNo: i + 1,
      feePerPlayer: 20,
      status: "Pending",
      createdAt: now,
      updatedAt: now
    }));
    await tx.insert(shuttlecocks).values(shuttlecockValues);
  });
  return { id: tubeId };
});

export { tubes_post as default };
//# sourceMappingURL=tubes.post.mjs.map
