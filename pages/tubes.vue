<script setup lang="ts">
const { tubes, createTube } = useTubes()
</script>

<template>
  <div class="max-w-6xl mx-auto">
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Shuttlecock Tubes</h1>
        <p class="text-gray-500">Manage tubes and track shuttlecock usage.</p>
      </div>
      <button 
        @click="createTube"
        class="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-indigo-700 transition-all shadow-md active:scale-95 flex items-center justify-center space-x-2"
      >
        <span>+ Add New Tube</span>
      </button>
    </div>

    <div class="space-y-6">
      <TubeCard 
        v-for="tube in [...tubes].reverse()" 
        :key="tube.id" 
        :tube="tube" 
      />
      
      <div v-if="tubes.length === 0" class="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-16 text-center">
        <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <span class="text-4xl text-gray-400">🏸</span>
        </div>
        <h2 class="text-xl font-bold text-gray-900 mb-2">No tubes created yet</h2>
        <p class="text-gray-500 mb-8 max-w-sm mx-auto">Create your first shuttlecock tube to start tracking usage and collecting fees.</p>
        <button 
          @click="createTube"
          class="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
        >
          Create First Tube
        </button>
      </div>
    </div>
  </div>
</template>
