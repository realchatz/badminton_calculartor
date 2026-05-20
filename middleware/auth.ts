export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user, fetchUser } = useAuth()
  
  // If user state is empty, try to fetch it from session
  if (!user.value) {
    await fetchUser()
  }

  const adminPaths = ['/', '/tubes', '/members']
  const isLoginPage = to.path === '/login'

  // If trying to access Admin pages
  if (adminPaths.includes(to.path)) {
    if (!user.value || user.value.role !== 'admin') {
      return navigateTo('/fees')
    }
  }

  // If logged in as admin and trying to access login page
  if (user.value?.role === 'admin' && isLoginPage) {
    return navigateTo('/')
  }
})
