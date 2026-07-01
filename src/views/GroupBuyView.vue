<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getGroupBuys, type GroupBuyItem } from '@/api/groupBuy'
import { useFavoriteStore } from '@/stores/favorite'
import ItemCard from '@/components/ItemCard.vue'
import LoadingState from '@/components/LoadingState.vue'
import ErrorState from '@/components/ErrorState.vue'
import EmptyState from '@/components/EmptyState.vue'
import SearchBar from '@/components/SearchBar.vue'

const fav = useFavoriteStore()
const allItems = ref<GroupBuyItem[]>([])
const loading = ref(false)
const error = ref(false)
const keyword = ref('')

const items = computed(() => {
  if (!keyword.value) return allItems.value
  const k = keyword.value.toLowerCase()
  return allItems.value.filter(
    i => i.title.toLowerCase().includes(k) || i.location.toLowerCase().includes(k) || i.description.toLowerCase().includes(k)
  )
})

async function fetchData() {
  loading.value = true
  error.value = false
  try {
    const res = await getGroupBuys()
    allItems.value = res.data
  } catch {
    error.value = true
    allItems.value = []
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)
</script>

<template>
  <section>
    <h2>拼单搭子</h2>
    <p class="desc">找人一起拼单、拼车、拼饭，省钱又热闹</p>

    <SearchBar v-model="keyword" placeholder="搜索拼单标题、地点…" />

    <LoadingState v-if="loading" text="正在加载拼单数据…" />
    <ErrorState v-else-if="error" text="数据加载失败，请检查 Mock 服务" :on-retry="fetchData" />
    <EmptyState v-else-if="items.length === 0" :text="keyword ? '没有找到匹配的拼单信息' : '暂无拼单信息'" />
    <div v-else class="group-list">
      <ItemCard v-for="item in items" :key="item.id" :item="item" />
    </div>
  </section>
</template>

<style scoped>
.desc { color: #909399; margin-bottom: 16px; }
.group-list { display: flex; flex-direction: column; gap: 0; }
</style>
