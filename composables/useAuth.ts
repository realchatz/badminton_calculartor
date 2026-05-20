export interface User {
  id: string
  name: string
  role: 'admin' | 'member'
}

export const useAuth = () => {
  const user = useState<User | null>('auth_user', () => null)
  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  const fetchUser = async () => {
    try {
      const data = await $fetch<User | null>('/api/auth/me')
      user.value = data
    } catch (e) {
      user.value = null
    }
  }

  const login = async (username: string, password: string) => {
    try {
      const data = await $fetch<User>('/api/auth/login', {
        method: 'POST',
        body: { username, password }
      })
      user.value = data
      return { success: true }
    } catch (e: any) {
      return { success: false, message: e.data?.message || 'Login failed' }
    }
  }

  const logout = async () => {
    try {
      await $fetch('/api/auth/logout', { method: 'POST' })
      user.value = null
      navigateTo('/login')
    } catch (e) {
      console.error('Logout failed', e)
    }
  }

  return {
    user,
    isAuthenticated,
    isAdmin,
    fetchUser,
    login,
    logout
  }
}
