import { b as defineEventHandler, v as readBody, c as createError } from '../../_/nitro.mjs';
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

const members_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body.name) {
    throw createError({ statusCode: 400, message: "Name is required" });
  }
  const newMember = {
    id: crypto.randomUUID(),
    name: body.name,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  await db.insert(members).values(newMember);
  return newMember;
});

export { members_post as default };
//# sourceMappingURL=members.post.mjs.map
