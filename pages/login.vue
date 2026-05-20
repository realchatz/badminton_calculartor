<script setup lang="ts">
const { login, user } = useAuth()
const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

definePageMeta({
  layout: false
})

onMounted(() => {
  if (user.value?.role === 'admin') {
    navigateTo('/')
  }
})

const handleLogin = async () => {
  error.value = ''
  loading.value = true
  const result = await login(username.value, password.value)
  loading.value = false
  
  if (result.success) {
    navigateTo('/')
  } else {
    error.value = result.message || 'Login failed'
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
      <div>
        <h1 class="text-center text-3xl font-extrabold text-indigo-600">Admin Portal</h1>
        <p class="mt-2 text-center text-sm text-gray-600">
          Please sign in to manage fees
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="username" class="sr-only">Username (Full Name)</label>
            <input
              v-model="username"
              id="username"
              name="username"
              type="text"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Username (Full Name)"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              v-model="password"
              id="password"
              name="password"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        <div v-if="error" class="text-red-500 text-sm text-center font-medium">
          {{ error }}
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50"
          >
            <span v-if="loading">Signing in...</span>
            <span v-else>Sign in</span>
          </button>
        </div>
      </form>
      
      <div class="text-center mt-4">
        <p class="text-xs text-gray-400 uppercase tracking-widest">Admin credentials required</p>
      </div>
    </div>
  </div>
</template>
