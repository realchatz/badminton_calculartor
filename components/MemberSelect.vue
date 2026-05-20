<script setup lang="ts">
const { members, addMember } = useMembers()
const emit = defineEmits(['select'])

const showAddForm = ref(false)
const newMemberName = ref('')

const selectMember = (member: any) => {
  emit('select', member)
}

const addNewMember = () => {
  if (newMemberName.value.trim()) {
    addMember(newMemberName.value.trim())
    const member = members.value.find(m => m.name.toLowerCase() === newMemberName.value.trim().toLowerCase())
    if (member) {
      selectMember(member)
    }
    newMemberName.value = ''
    showAddForm.value = false
  }
}
</script>

<template>
  <div class="relative group">
    <div v-if="!showAddForm" class="space-y-2">
      <div class="max-h-48 overflow-y-auto border rounded-md divide-y bg-white">
        <button
          v-for="member in members"
          :key="member.id"
          @click="selectMember(member)"
          class="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-sm"
        >
          {{ member.name }}
        </button>
        <div v-if="members.length === 0" class="px-4 py-2 text-sm text-gray-500 italic">
          No members found.
        </div>
      </div>
      <button
        @click="showAddForm = true"
        class="w-full text-center px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 rounded-md transition-colors"
      >
        + Add New Member
      </button>
    </div>

    <div v-else class="space-y-2 p-2 border rounded-md bg-white shadow-sm">
      <input
        v-model="newMemberName"
        type="text"
        placeholder="Enter name..."
        class="w-full px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        @keyup.enter="addNewMember"
      />
      <div class="flex space-x-2">
        <button
          @click="addNewMember"
          class="flex-1 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700"
        >
          Add & Select
        </button>
        <button
          @click="showAddForm = false"
          class="px-3 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
