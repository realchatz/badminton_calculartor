<script setup lang="ts">
import type { Shuttlecock, ShuttlecockTube } from '~/types/badminton'

const props = defineProps<{
  tube: ShuttlecockTube
  shuttlecock: Shuttlecock
}>()

const { addPlayerToShuttlecock, removePlayerFromShuttlecock, togglePaymentStatus, updateShuttlecockFee } = useTubes()

const showPlayerSelect = ref(false)
const editingFee = ref(false)
const localFee = ref(props.shuttlecock.feePerPlayer)

const handleAddPlayer = (member: any) => {
  addPlayerToShuttlecock(props.tube.id, props.shuttlecock.id, member.id, member.name)
  showPlayerSelect.value = false
}

const saveFee = () => {
  updateShuttlecockFee(props.tube.id, props.shuttlecock.id, localFee.value)
  editingFee.value = false
}
</script>

<template>
  <div class="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
    <div class="flex justify-between items-start mb-4">
      <div>
        <h3 class="font-bold text-gray-700">Shuttlecock #{{ shuttlecock.shuttlecockNo }}</h3>
        <span 
          :class="[
            'text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full',
            shuttlecock.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
          ]"
        >
          {{ shuttlecock.status }}
        </span>
      </div>
      
      <div class="text-right">
        <div v-if="!editingFee" @click="editingFee = true" class="cursor-pointer group">
          <span class="text-sm font-semibold text-gray-900">{{ shuttlecock.feePerPlayer }} ฿</span>
          <span class="text-[10px] block text-gray-400 group-hover:text-indigo-600 italic">Edit Fee</span>
        </div>
        <div v-else class="flex items-center space-x-1">
          <input 
            v-model.number="localFee" 
            type="number" 
            class="w-16 px-1 py-0.5 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
            @keyup.enter="saveFee"
          />
          <button @click="saveFee" class="text-indigo-600 hover:text-indigo-800">
            <span class="text-xs font-bold">✓</span>
          </button>
        </div>
      </div>
    </div>

    <div class="space-y-2 mb-4">
      <div v-for="player in shuttlecock.players" :key="player.id" class="flex items-center justify-between bg-gray-50 p-2 rounded text-sm">
        <div class="flex items-center space-x-2">
          <button 
            @click="togglePaymentStatus(tube.id, shuttlecock.id, player.id)"
            :class="[
              'w-5 h-5 rounded flex items-center justify-center border transition-colors',
              player.isPaid ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300 text-transparent'
            ]"
          >
            <span class="text-[10px]">✓</span>
          </button>
          <span :class="{'line-through text-gray-400': player.isPaid, 'text-gray-700 font-medium': !player.isPaid}">
            {{ player.memberName }}
          </span>
        </div>
        <button 
          @click="removePlayerFromShuttlecock(tube.id, shuttlecock.id, player.id)"
          class="text-gray-400 hover:text-red-500 transition-colors"
        >
          <span class="text-lg leading-none">&times;</span>
        </button>
      </div>
      
      <div v-if="shuttlecock.players.length < 4">
        <button 
          v-if="!showPlayerSelect"
          @click="showPlayerSelect = true"
          class="w-full py-2 border-2 border-dashed border-gray-200 rounded text-gray-400 hover:border-indigo-300 hover:text-indigo-500 transition-all text-xs font-medium"
        >
          + Add Player ({{ shuttlecock.players.length }}/4)
        </button>
        <div v-else class="mt-2">
          <div class="flex justify-between items-center mb-1">
            <span class="text-[10px] font-bold text-gray-400 uppercase">Select Member</span>
            <button @click="showPlayerSelect = false" class="text-[10px] text-gray-400 hover:text-gray-600">Cancel</button>
          </div>
          <MemberSelect @select="handleAddPlayer" />
        </div>
      </div>
      <div v-else class="text-center py-2 bg-gray-100 rounded text-[10px] font-bold text-gray-400 uppercase tracking-widest">
        Full (4/4)
      </div>
    </div>

    <div class="pt-3 border-t flex justify-between items-center">
      <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Expected</span>
      <span class="text-sm font-bold text-gray-900">{{ shuttlecock.players.length * shuttlecock.feePerPlayer }} ฿</span>
    </div>
  </div>
</template>
