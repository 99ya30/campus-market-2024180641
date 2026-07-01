import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'campus-market-favorites'

function load(): { type: string; id: number }[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export const useFavoriteStore = defineStore('favorite', () => {
  const items = ref<{ type: string; id: number }[]>(load())

  watch(items, (v) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(v))
  }, { deep: true })

  const count = computed(() => items.value.length)

  function isFavorited(type: string, id: number): boolean {
    return items.value.some(i => i.type === type && i.id === id)
  }

  function toggle(type: string, id: number) {
    const idx = items.value.findIndex(i => i.type === type && i.id === id)
    if (idx >= 0) {
      items.value.splice(idx, 1)
    } else {
      items.value.push({ type, id })
    }
  }

  function getByType(type: string) {
    return items.value.filter(i => i.type === type)
  }

  return { items, count, isFavorited, toggle, getByType }
})
