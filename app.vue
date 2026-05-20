<script setup lang="ts">
const { user, logout, fetchUser } = useAuth()
const { fetchMembers } = useMembers()
const { fetchTubes } = useTubes()

definePageMeta({
  middleware: 'auth'
})

onMounted(async () => {
  await fetchUser()
  // Fetch data for everyone (including public users)
  fetchMembers()
  fetchTubes()
})

// Watch for user changes to refetch data if needed (e.g. login/logout)
watch(user, () => {
  fetchMembers()
  fetchTubes()
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-white border-b sticky top-0 z-10">
      <div class="container mx-auto px-4 h-16 flex items-center justify-between">
        <h1 class="text-xl font-bold text-indigo-600">Badminton Fee</h1>
        <div class="flex items-center space-x-6">
          <nav class="hidden md:flex space-x-6">
            <template v-if="user?.role === 'admin'">
              <NuxtLink to="/" class="text-gray-600 hover:text-indigo-600 font-medium">Dashboard</NuxtLink>
              <NuxtLink to="/tubes" class="text-gray-600 hover:text-indigo-600 font-medium">Tubes</NuxtLink>
              <NuxtLink to="/members" class="text-gray-600 hover:text-indigo-600 font-medium">Members</NuxtLink>
            </template>
            <template v-else>
              <NuxtLink to="/fees" class="text-gray-600 hover:text-indigo-600 font-medium">Check My Fee</NuxtLink>
              <NuxtLink v-if="!user" to="/login" class="text-gray-400 hover:text-indigo-600 font-medium">Admin Portal</NuxtLink>
            </template>
          </nav>
          <div v-if="user" class="flex items-center space-x-4">
            <button 
              @click="logout" 
              class="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all font-bold text-sm"
            >
              <span>Logout</span>
              <span class="text-lg">🚪</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-grow container mx-auto px-4 py-8">
      <NuxtPage />
    </main>

    <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center h-16 px-4 z-10">
      <template v-if="user?.role === 'admin'">
        <NuxtLink to="/" class="flex flex-col items-center text-xs font-medium text-gray-500 hover:text-indigo-600">
          <span class="w-6 h-6 mb-1 text-center">📊</span>
          Dashboard
        </NuxtLink>
        <NuxtLink to="/tubes" class="flex flex-col items-center text-xs font-medium text-gray-500 hover:text-indigo-600">
          <span class="w-6 h-6 mb-1 text-center">🏸</span>
          Tubes
        </NuxtLink>
        <NuxtLink to="/members" class="flex flex-col items-center text-xs font-medium text-gray-500 hover:text-indigo-600">
          <span class="w-6 h-6 mb-1 text-center">👥</span>
          Members
        </NuxtLink>
      </template>
      <template v-else>
        <NuxtLink to="/fees" class="flex flex-col items-center text-xs font-medium text-gray-500 hover:text-indigo-600">
          <span class="w-6 h-6 mb-1 text-center">💰</span>
          Check My Fee
        </NuxtLink>
        <NuxtLink v-if="!user" to="/login" class="flex flex-col items-center text-xs font-medium text-gray-400 hover:text-indigo-600">
          <span class="w-6 h-6 mb-1 text-center">🔐</span>
          Admin
        </NuxtLink>
      </template>
    </nav>
    
    <!-- Add padding to bottom on mobile to account for fixed nav -->
    <div class="h-16 md:hidden"></div>
  </div>
</template>

<style>
.router-link-active {
  @apply text-indigo-600;
}
</style>
