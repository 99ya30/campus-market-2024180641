<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getErrands, type ErrandItem } from '@/api/errand'
import { useFavoriteStore } from '@/stores/favorite'
import ItemCard from '@/components/ItemCard.vue'
import LoadingState from '@/components/LoadingState.vue'
import ErrorState from '@/components/ErrorState.vue'
import EmptyState from '@/components/EmptyState.vue'
import SearchBar from '@/components/SearchBar.vue'

const fav = useFavoriteStore()
const allItems = ref<ErrandItem[]>([])
const loading = ref(false)
const error = ref(false)
const keyword = ref('')

const items = computed(() => {
  if (!keyword.value) return allItems.value
  const k = keyword.value.toLowerCase()
  return allItems.value.filter(
    i => i.title.toLowerCase().includes(k) || i.pickupLocation.toLowerCase().includes(k) || i.deliveryLocation.toLowerCase().includes(k) || i.description.toLowerCase().includes(k)
  )
})

async function fetchData() {
  loading.value = true
  error.value = false
  try {
    const res = await getErrands()
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
    <h2>跑腿委托</h2>
    <p class="desc">发布跑腿任务或接单赚取酬劳</p>

    <SearchBar v-model="keyword" placeholder="搜索跑腿任务、地点…" />

    <LoadingState v-if="loading" text="正在加载跑腿委托数据…" />
    <ErrorState v-else-if="error" text="数据加载失败，请检查 Mock 服务" :on-retry="fetchData" />
    <EmptyState v-else-if="items.length === 0" :text="keyword ? '没有找到匹配的跑腿任务' : '暂无跑腿委托信息'" />
    <div v-else class="errand-list">
      <ItemCard v-for="item in items" :key="item.id" :item="item" />
    </div>
  </section>
</template>

<style scoped>
.desc { color: #909399; margin-bottom: 16px; }
.errand-list { display: flex; flex-direction: column; gap: 0; }
</style>
