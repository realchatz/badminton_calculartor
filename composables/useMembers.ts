import type { Member } from '~/types/badminton'

export const useMembers = () => {
  const members = useState<Member[]>('members', () => [])

  const fetchMembers = async () => {
    const { data } = await useFetch<Member[]>('/api/members')
    if (data.value) {
      members.value = data.value
    }
  }

  const addMember = async (name: string) => {
    if (!name.trim()) return
    
    // Optimistic check
    const exists = members.value.some(m => m.name.toLowerCase() === name.toLowerCase())
    if (exists) {
      alert('Member with this name already exists.')
      return
    }

    try {
      await $fetch('/api/members', {
        method: 'POST',
        body: { name: name.trim() }
      })
      await fetchMembers()
    } catch (e: any) {
      alert(e.message || 'Failed to add member')
    }
  }

  const deleteMember = async (id: string) => {
    try {
      await $fetch('/api/members', {
        method: 'DELETE',
        body: { id }
      })
      await fetchMembers()
    } catch (e: any) {
      alert(e.message || 'Failed to delete member')
    }
  }

  return {
    members,
    fetchMembers,
    addMember,
    deleteMember
  }
}
