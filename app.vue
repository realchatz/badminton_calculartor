<script setup lang="ts">
const { fetchMembers } = useMembers()
const { fetchTubes } = useTubes()

onMounted(() => {
  fetchMembers()
  fetchTubes()
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-white border-b sticky top-0 z-10">
      <div class="container mx-auto px-4 h-16 flex items-center justify-between">
        <h1 class="text-xl font-bold text-indigo-600">Badminton Fee</h1>
        <nav class="hidden md:flex space-x-6">
          <NuxtLink to="/" class="text-gray-600 hover:text-indigo-600 font-medium">Dashboard</NuxtLink>
          <NuxtLink to="/tubes" class="text-gray-600 hover:text-indigo-600 font-medium">Tubes</NuxtLink>
          <NuxtLink to="/members" class="text-gray-600 hover:text-indigo-600 font-medium">Members</NuxtLink>
        </nav>
      </div>
    </header>

    <main class="flex-grow container mx-auto px-4 py-8">
      <NuxtPage />
    </main>

    <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center h-16 px-4 z-10">
      <NuxtLink to="/" class="flex flex-col items-center text-xs font-medium text-gray-500 hover:text-indigo-600">
        <span class="w-6 h-6 mb-1">📊</span>
        Dashboard
      </NuxtLink>
      <NuxtLink to="/tubes" class="flex flex-col items-center text-xs font-medium text-gray-500 hover:text-indigo-600">
        <span class="w-6 h-6 mb-1">🏸</span>
        Tubes
      </NuxtLink>
      <NuxtLink to="/members" class="flex flex-col items-center text-xs font-medium text-gray-500 hover:text-indigo-600">
        <span class="w-6 h-6 mb-1">👥</span>
        Members
      </NuxtLink>
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
