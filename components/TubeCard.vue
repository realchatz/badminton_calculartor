<script setup lang="ts">
import type { ShuttlecockTube } from '~/types/badminton'

const props = defineProps<{
  tube: ShuttlecockTube
}>()

const { deleteTube } = useTubes()

const isExpanded = ref(false)
const filterStatus = ref<'All' | 'Pending' | 'Completed'>('All')

const filteredShuttlecocks = computed(() => {
  if (filterStatus.value === 'All') return props.tube.shuttlecocks
  return props.tube.shuttlecocks.filter(s => s.status === filterStatus.value)
})

const completedCount = computed(() => props.tube.shuttlecocks.filter(s => s.status === 'Completed').length)

const confirmDelete = () => {
  if (confirm(`Are you sure you want to delete Tube #${props.tube.tubeNo}?`)) {
    deleteTube(props.tube.id)
  }
}
</script>

<template>
  <div class="bg-white border rounded-xl shadow-sm overflow-hidden">
    <div 
      class="p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
      @click="isExpanded = !isExpanded"
    >
      <div class="flex items-center space-x-4 mb-4 md:mb-0">
        <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl">
          {{ tube.tubeNo }}
        </div>
        <div>
          <h2 class="text-lg font-bold text-gray-900">Tube #{{ tube.tubeNo }}</h2>
          <p class="text-sm text-gray-500">Created: {{ new Date(tube.createdAt).toLocaleDateString() }}</p>
        </div>
      </div>

      <div class="flex items-center space-x-6">
        <div class="text-center">
          <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Progress</p>
          <p class="text-lg font-bold text-gray-900">{{ completedCount }} / 12</p>
        </div>
        <div class="h-8 w-px bg-gray-200"></div>
        <button 
          @click.stop="confirmDelete"
          class="p-2 text-gray-400 hover:text-red-500 transition-colors"
          title="Delete Tube"
        >
          🗑️
        </button>
        <span :class="['transform transition-transform text-xl', isExpanded ? 'rotate-180' : '']">
          ↓
        </span>
      </div>
    </div>

    <div v-if="isExpanded" class="border-t bg-gray-50 p-4 md:p-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
        <div class="flex space-x-2">
          <button 
            v-for="status in (['All', 'Pending', 'Completed'] as const)" 
            :key="status"
            @click="filterStatus = status"
            :class="[
              'px-3 py-1.5 rounded-md text-xs font-bold transition-all',
              filterStatus === status ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-600 border hover:bg-gray-50'
            ]"
          >
            {{ status }}
          </button>
        </div>
        <p class="text-xs text-gray-500 font-medium">
          Showing {{ filteredShuttlecocks.length }} shuttlecocks
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <ShuttlecockCard 
          v-for="shuttlecock in filteredShuttlecocks" 
          :key="shuttlecock.id"
          :tube="tube"
          :shuttlecock="shuttlecock"
        />
      </div>
    </div>
  </div>
</template>
