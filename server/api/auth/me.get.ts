export default defineEventHandler(async (event) => {
  const session = getCookie(event, 'auth_session')
  if (!session) {
    return null
  }
  try {
    return JSON.parse(session)
  } catch (e) {
    return null
  }
})
