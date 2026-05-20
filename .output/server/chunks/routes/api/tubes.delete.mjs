import { b as defineEventHandler, v as readBody, c as createError } from '../../_/nitro.mjs';
import { d as db, t as tubes } from '../../_/db.mjs';
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

const tubes_delete = defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body.id) {
    throw createError({ statusCode: 400, message: "ID is required" });
  }
  await db.delete(tubes).where(eq(tubes.id, body.id));
  return { success: true };
});

export { tubes_delete as default };
//# sourceMappingURL=tubes.delete.mjs.map
