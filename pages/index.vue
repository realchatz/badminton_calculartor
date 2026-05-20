<script setup lang="ts">
const { tubes } = useTubes()

definePageMeta({
  middleware: 'auth'
})

const stats = computed(() => {
  let totalShuttlecocks = 0
  let completedShuttlecocks = 0
  let totalExpected = 0
  let totalPaid = 0
  let totalUnpaidPlayers = 0

  tubes.value.forEach(tube => {
    tube.shuttlecocks.forEach(s => {
      totalShuttlecocks++
      if (s.status === 'Completed') completedShuttlecocks++
      
      const shuttlecockExpected = s.players.length * s.feePerPlayer
      totalExpected += shuttlecockExpected
      
      s.players.forEach(p => {
        if (p.isPaid) {
          totalPaid += s.feePerPlayer
        } else {
          totalUnpaidPlayers++
        }
      })
    })
  })

  return {
    totalTubes: tubes.value.length,
    totalShuttlecocks,
    pendingShuttlecocks: totalShuttlecocks - completedShuttlecocks,
    completedShuttlecocks,
    totalExpected,
    totalPaid,
    totalUnpaid: totalExpected - totalPaid,
    totalUnpaidPlayers
  }
})
</script>

<template>
  <div class="max-w-6xl mx-auto">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p class="text-gray-500">Overview of shuttlecock usage and fee collection.</p>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div class="bg-white p-6 rounded-xl border shadow-sm">
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Tubes</p>
        <p class="text-3xl font-bold text-gray-900">{{ stats.totalTubes }}</p>
      </div>
      <div class="bg-white p-6 rounded-xl border shadow-sm">
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Completed / Total</p>
        <div class="flex items-baseline space-x-2">
          <p class="text-3xl font-bold text-green-600">{{ stats.completedShuttlecocks }}</p>
          <p class="text-xl font-medium text-gray-400">/ {{ stats.totalShuttlecocks }}</p>
        </div>
      </div>
      <div class="bg-white p-6 rounded-xl border shadow-sm">
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Paid</p>
        <p class="text-3xl font-bold text-green-600">{{ stats.totalPaid }} ฿</p>
      </div>
      <div class="bg-white p-6 rounded-xl border shadow-sm border-orange-100 bg-orange-50/30">
        <p class="text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-1">Pending Amount</p>
        <p class="text-3xl font-bold text-orange-600">{{ stats.totalUnpaid }} ฿</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Detailed Stats -->
      <div class="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div class="p-4 border-b bg-gray-50 font-bold text-gray-700">Detailed Statistics</div>
        <div class="p-6 space-y-4">
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Pending Shuttlecocks</span>
            <span class="font-bold text-yellow-600">{{ stats.pendingShuttlecocks }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Total Expected Amount</span>
            <span class="font-bold text-gray-900">{{ stats.totalExpected }} ฿</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Unpaid Players Count</span>
            <span class="font-bold text-red-500">{{ stats.totalUnpaidPlayers }}</span>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div class="p-4 border-b bg-gray-50 font-bold text-gray-700">Quick Actions</div>
        <div class="p-6 grid grid-cols-2 gap-4">
          <NuxtLink 
            to="/tubes" 
            class="flex flex-col items-center justify-center p-4 border rounded-xl hover:bg-indigo-50 hover:border-indigo-200 transition-all group"
          >
            <span class="text-2xl mb-2 group-hover:scale-110 transition-transform">🏸</span>
            <span class="text-sm font-bold text-gray-700">Add Tube</span>
          </NuxtLink>
          <NuxtLink 
            to="/members" 
            class="flex flex-col items-center justify-center p-4 border rounded-xl hover:bg-indigo-50 hover:border-indigo-200 transition-all group"
          >
            <span class="text-2xl mb-2 group-hover:scale-110 transition-transform">👥</span>
            <span class="text-sm font-bold text-gray-700">Add Member</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
