export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password } = body

  // Hardcoded Admin Credentials
  const ADMIN_USERNAME = 'chatsbp102'
  const ADMIN_PASSWORD = 'chatsbp102'

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const adminUser = {
      id: 'admin-id',
      name: 'Administrator',
      role: 'admin'
    }

    // Set session cookie
    setCookie(event, 'auth_session', JSON.stringify(adminUser), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/'
    })

    return adminUser
  }

  throw createError({ statusCode: 401, message: 'Invalid credentials' })
})
