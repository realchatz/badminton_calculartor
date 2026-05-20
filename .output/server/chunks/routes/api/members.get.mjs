import { b as defineEventHandler } from '../../_/nitro.mjs';
import { d as db, m as members } from '../../_/db.mjs';
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
import 'drizzle-orm';

const members_get = defineEventHandler(async (event) => {
  return await db.select().from(members).all();
});

export { members_get as default };
//# sourceMappingURL=members.get.mjs.map
