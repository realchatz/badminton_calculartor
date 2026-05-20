import type { ShuttlecockTube } from '~/types/badminton'

export const useTubes = () => {
  const tubes = useState<ShuttlecockTube[]>('tubes', () => [])

  const fetchTubes = async () => {
    const { data } = await useFetch<ShuttlecockTube[]>('/api/tubes')
    if (data.value) {
      tubes.value = data.value
    }
  }

  const createTube = async () => {
    try {
      await $fetch('/api/tubes', { method: 'POST' })
      await fetchTubes()
    } catch (e: any) {
      alert(e.message || 'Failed to create tube')
    }
  }

  const deleteTube = async (id: string) => {
    try {
      await $fetch('/api/tubes', {
        method: 'DELETE',
        body: { id }
      })
      await fetchTubes()
    } catch (e: any) {
      alert(e.message || 'Failed to delete tube')
    }
  }

  const addPlayerToShuttlecock = async (tubeId: string, shuttlecockId: string, memberId: string, memberName: string) => {
    try {
      await $fetch('/api/shuttlecock/add-player', {
        method: 'POST',
        body: { shuttlecockId, memberId, memberName }
      })
      await fetchTubes()
    } catch (e: any) {
      alert(e.message || 'Failed to add player')
    }
  }

  const removePlayerFromShuttlecock = async (tubeId: string, shuttlecockId: string, playerId: string) => {
    try {
      await $fetch('/api/shuttlecock/remove-player', {
        method: 'POST',
        body: { shuttlecockId, playerId }
      })
      await fetchTubes()
    } catch (e: any) {
      alert(e.message || 'Failed to remove player')
    }
  }

  const togglePaymentStatus = async (tubeId: string, shuttlecockId: string, playerId: string) => {
    try {
      await $fetch('/api/shuttlecock/toggle-payment', {
        method: 'POST',
        body: { shuttlecockId, playerId }
      })
      await fetchTubes()
    } catch (e: any) {
      alert(e.message || 'Failed to toggle payment status')
    }
  }

  const updateShuttlecockFee = async (tubeId: string, shuttlecockId: string, fee: number) => {
    try {
      await $fetch('/api/shuttlecock/update-fee', {
        method: 'POST',
        body: { shuttlecockId, fee }
      })
      await fetchTubes()
    } catch (e: any) {
      alert(e.message || 'Failed to update fee')
    }
  }

  return {
    tubes,
    fetchTubes,
    createTube,
    deleteTube,
    addPlayerToShuttlecock,
    removePlayerFromShuttlecock,
    togglePaymentStatus,
    updateShuttlecockFee
  }
}
