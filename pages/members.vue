<script setup lang="ts">
const { members, addMember, deleteMember } = useMembers()
const { tubes, togglePaymentStatus } = useTubes()

const newMemberName = ref('')
const searchQuery = ref('')
const expandedMemberId = ref<string | null>(null)

const filteredMembers = computed(() => {
  if (!searchQuery.value) return members.value
  return members.value.filter(m => m.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
})

const handleAddMember = () => {
  if (newMemberName.value.trim()) {
    addMember(newMemberName.value.trim())
    newMemberName.value = ''
  }
}

const handleDelete = (id: string, name: string) => {
  if (confirm(`Are you sure you want to delete member "${name}"? This will not remove them from existing shuttlecock records but they won't be selectable for new ones.`)) {
    deleteMember(id)
  }
}

const getMemberUnpaidRecords = (memberId: string) => {
  const records: any[] = []
  tubes.value.forEach(tube => {
    tube.shuttlecocks.forEach(s => {
      s.players.forEach(p => {
        if (p.memberId === memberId && !p.isPaid) {
          records.push({
            tubeId: tube.id,
            tubeNo: tube.tubeNo,
            shuttlecockId: s.id,
            shuttlecockNo: s.shuttlecockNo,
            playerId: p.id,
            fee: s.feePerPlayer
          })
        }
      })
    })
  })
  return records
}

const getMemberOutstandingAmount = (memberId: string) => {
  let total = 0
  tubes.value.forEach(tube => {
    tube.shuttlecocks.forEach(s => {
      s.players.forEach(p => {
        if (p.memberId === memberId && !p.isPaid) {
          total += s.feePerPlayer
        }
      })
    })
  })
  return total
}

const toggleExpand = (id: string) => {
  expandedMemberId.value = expandedMemberId.value === id ? null : id
}
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Member Management</h1>
        <p class="text-gray-500">Manage your badminton group members.</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Add Member Section -->
      <div class="lg:col-span-1">
        <div class="bg-white border rounded-xl p-6 shadow-sm sticky top-24">
          <h2 class="text-lg font-bold text-gray-900 mb-4">Add New Member</h2>
          <form @submit.prevent="handleAddMember" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                v-model="newMemberName"
                type="text" 
                placeholder="e.g. John Doe"
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                required
              />
            </div>
            <button 
              type="submit"
              class="w-full py-2.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-md active:scale-95"
            >
              Add Member
            </button>
          </form>
        </div>
      </div>

      <!-- Member List Section -->
      <div class="lg:col-span-2">
        <div class="bg-white border rounded-xl shadow-sm overflow-hidden">
          <div class="p-4 border-b bg-gray-50">
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Search members..."
                class="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all bg-white"
              />
            </div>
          </div>

          <div class="divide-y max-h-[600px] overflow-y-auto">
            <div 
              v-for="member in filteredMembers" 
              :key="member.id"
              class="flex flex-col hover:bg-gray-50 transition-colors"
            >
              <div 
                class="p-4 flex items-center justify-between cursor-pointer"
                @click="toggleExpand(member.id)"
              >
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-bold uppercase">
                    {{ member.name.charAt(0) }}
                  </div>
                  <div>
                    <div class="flex items-center space-x-2">
                      <p class="font-bold text-gray-900">{{ member.name }}</p>
                      <span 
                        v-if="getMemberOutstandingAmount(member.id) > 0"
                        class="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded-full"
                      >
                        Outstanding: {{ getMemberOutstandingAmount(member.id) }} ฿
                      </span>
                    </div>
                    <p class="text-[10px] text-gray-400 uppercase tracking-widest">Added {{ new Date(member.createdAt).toLocaleDateString() }}</p>
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <span :class="['transform transition-transform', expandedMemberId === member.id ? 'rotate-180' : '']">
                    ↓
                  </span>
                  <button 
                    @click.stop="handleDelete(member.id, member.name)"
                    class="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete Member"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <!-- Expanded History Section -->
              <div v-if="expandedMemberId === member.id" class="px-4 pb-4 bg-gray-50 border-t">
                <div class="pt-4">
                  <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Outstanding Payments</h3>
                  <div v-if="getMemberUnpaidRecords(member.id).length > 0" class="space-y-2">
                    <div 
                      v-for="record in getMemberUnpaidRecords(member.id)" 
                      :key="record.shuttlecockId"
                      class="flex items-center justify-between bg-white p-3 rounded-lg border shadow-sm"
                    >
                      <div class="flex items-center space-x-4">
                        <div class="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-bold text-gray-500">
                          T{{ record.tubeNo }}
                        </div>
                        <div>
                          <p class="text-sm font-bold text-gray-700">Shuttlecock #{{ record.shuttlecockNo }}</p>
                          <p class="text-[10px] text-gray-400">Amount: {{ record.fee }} ฿</p>
                        </div>
                      </div>
                      <button 
                        @click="togglePaymentStatus(record.tubeId, record.shuttlecockId, record.playerId)"
                        class="px-3 py-1.5 bg-green-50 text-green-600 text-xs font-bold rounded-md hover:bg-green-600 hover:text-white transition-all shadow-sm border border-green-100"
                      >
                        Mark Paid
                      </button>
                    </div>
                  </div>
                  <div v-else class="py-4 text-center text-gray-500 italic text-sm">
                    No outstanding payments. All caught up! 🎉
                  </div>
                </div>
              </div>
            </div>
            
            <div v-if="filteredMembers.length === 0" class="p-12 text-center text-gray-500">
              <p class="text-4xl mb-4">👥</p>
              <p v-if="searchQuery">No members match your search.</p>
              <p v-else>No members added yet. Add your first member to get started!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
