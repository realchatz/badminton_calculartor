<script setup lang="ts">
import generatePayload from 'promptpay-qr'
import QrcodeVue from 'qrcode.vue'

const { members } = useMembers()
const { tubes } = useTubes()
const config = useRuntimeConfig()

const selectedMemberId = ref('')

const selectedMember = computed(() => {
  return members.value.find(m => m.id === selectedMemberId.value)
})

const outstandingAmount = computed(() => {
  if (!selectedMemberId.value) return 0
  let total = 0
  tubes.value.forEach(tube => {
    tube.shuttlecocks.forEach(s => {
      s.players.forEach(p => {
        if (p.memberId === selectedMemberId.value && !p.isPaid) {
          total += s.feePerPlayer
        }
      })
    })
  })
  return total
})

const unpaidRecords = computed(() => {
  if (!selectedMemberId.value) return []
  const records: any[] = []
  tubes.value.forEach(tube => {
    tube.shuttlecocks.forEach(s => {
      s.players.forEach(p => {
        if (p.memberId === selectedMemberId.value && !p.isPaid) {
          records.push({
            tubeNo: tube.tubeNo,
            shuttlecockNo: s.shuttlecockNo,
            fee: s.feePerPlayer
          })
        }
      })
    })
  })
  return records
})

const qrPayload = computed(() => {
  if (outstandingAmount.value <= 0) return ''
  return generatePayload(config.public.promptPayId, { amount: outstandingAmount.value })
})
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <div class="mb-8 text-center px-4">
      <h1 class="text-3xl font-extrabold text-indigo-600 mb-2">Check My Badminton Fee</h1>
      <p class="text-gray-500">Select your name to view outstanding balance and QR code.</p>
    </div>

    <div class="px-4 space-y-6">
      <!-- Member Selector -->
      <div class="bg-white border rounded-2xl p-6 shadow-sm">
        <label class="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Who are you?</label>
        <select 
          v-model="selectedMemberId"
          class="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50 font-bold text-gray-700 appearance-none cursor-pointer"
        >
          <option value="" disabled>Select your name...</option>
          <option v-for="member in members" :key="member.id" :value="member.id">
            {{ member.name }}
          </option>
        </select>
      </div>

      <template v-if="selectedMemberId">
        <!-- Total Card -->
        <div class="bg-white border rounded-2xl p-8 shadow-sm text-center">
          <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Total Outstanding for {{ selectedMember?.name }}</p>
          <p :class="['text-5xl font-black mb-4', outstandingAmount > 0 ? 'text-red-600' : 'text-green-600']">
            {{ outstandingAmount }} ฿
          </p>
          
          <div v-if="outstandingAmount > 0" class="space-y-6">
            <div class="flex justify-center p-4 bg-white border-4 border-indigo-50 rounded-2xl inline-block mx-auto">
              <qrcode-vue :value="qrPayload" :size="200" level="M" />
            </div>
            <div class="bg-indigo-50 p-4 rounded-xl">
              <p class="text-sm font-bold text-indigo-700 mb-1">PromptPay ID: {{ config.public.promptPayId }}</p>
              <p class="text-xs text-indigo-500 italic">Scan to pay exactly {{ outstandingAmount }} Baht</p>
            </div>
          </div>
          <div v-else class="py-12">
            <span class="text-6xl mb-4 block">🎉</span>
            <p class="text-lg font-bold text-gray-800">You are all paid up!</p>
            <p class="text-sm text-gray-400">Thank you for your timely payments, {{ selectedMember?.name }}.</p>
          </div>
        </div>

        <!-- Detail List -->
        <div v-if="unpaidRecords.length > 0" class="bg-white border rounded-2xl overflow-hidden shadow-sm">
          <div class="p-4 border-b bg-gray-50 font-bold text-gray-700">Payment Details</div>
          <div class="divide-y max-h-96 overflow-y-auto">
            <div 
              v-for="(record, index) in unpaidRecords" 
              :key="index"
              class="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div class="flex items-center space-x-4">
                <div class="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 font-bold">
                  T{{ record.tubeNo }}
                </div>
                <div>
                  <p class="font-bold text-gray-900">Shuttlecock #{{ record.shuttlecockNo }}</p>
                  <p class="text-xs text-gray-400">Tube #{{ record.tubeNo }}</p>
                </div>
              </div>
              <p class="font-bold text-gray-900">{{ record.fee }} ฿</p>
            </div>
          </div>
        </div>
      </template>
      
      <div v-else class="text-center py-20 text-gray-300">
        <p class="text-6xl mb-4">🏸</p>
        <p class="font-bold">Select your name above to see your status</p>
      </div>
    </div>
  </div>
</template>
