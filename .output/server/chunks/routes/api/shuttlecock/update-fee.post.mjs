import { b as defineEventHandler, v as readBody, c as createError } from '../../../_/nitro.mjs';
import { d as db, a as shuttlecocks } from '../../../_/db.mjs';
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

const updateFee_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { shuttlecockId, fee } = body;
  if (!shuttlecockId || fee === void 0) {
    throw createError({ statusCode: 400, message: "Missing required fields" });
  }
  await db.update(shuttlecocks).set({
    feePerPlayer: fee,
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  }).where(eq(shuttlecocks.id, shuttlecockId));
  return { success: true };
});

export { updateFee_post as default };
//# sourceMappingURL=update-fee.post.mjs.map
