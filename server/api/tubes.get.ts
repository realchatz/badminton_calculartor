import { db } from '../utils/db'

export default defineEventHandler(async (event) => {
  const allTubes = await db.query.tubes.findMany({
    with: {
      shuttlecocks: {
        with: {
          players: true
        }
      }
    },
    orderBy: (tubes, { desc }) => [desc(tubes.createdAt)]
  })
  
  return allTubes
})
