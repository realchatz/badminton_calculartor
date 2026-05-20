import { b as defineEventHandler } from '../../_/nitro.mjs';
import { d as db } from '../../_/db.mjs';
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

const tubes_get = defineEventHandler(async (event) => {
  const allTubes = await db.query.tubes.findMany({
    with: {
      shuttlecocks: {
        with: {
          players: true
        }
      }
    },
    orderBy: (tubes, { desc }) => [desc(tubes.createdAt)]
  });
  return allTubes;
});

export { tubes_get as default };
//# sourceMappingURL=tubes.get.mjs.map
