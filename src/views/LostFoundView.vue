<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getLostFounds, type LostFoundItem } from '@/api/lostFound'
import { useFavoriteStore } from '@/stores/favorite'
import ItemCard from '@/components/ItemCard.vue'
import LoadingState from '@/components/LoadingState.vue'
import ErrorState from '@/components/ErrorState.vue'
import EmptyState from '@/components/EmptyState.vue'
import SearchBar from '@/components/SearchBar.vue'

const fav = useFavoriteStore()
const allItems = ref<LostFoundItem[]>([])
const loading = ref(false)
const error = ref(false)
const keyword = ref('')
const typeFilter = ref<string>('')

const items = computed(() => {
  let list = allItems.value
  const k = keyword.value.toLowerCase()
  if (k) {
    list = list.filter(i => i.title.toLowerCase().includes(k) || i.itemName.toLowerCase().includes(k) || i.description.toLowerCase().includes(k))
  }
  if (typeFilter.value) {
    list = list.filter(i => i.type === typeFilter.value)
  }
  return list
})

async function fetchData() {
  loading.value = true
  error.value = false
  try {
    const res = await getLostFounds()
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
    <h2>失物招领</h2>
    <p class="desc">发布和查看失物与招领信息，互帮互助</p>

    <SearchBar v-model="keyword" placeholder="搜索物品名称、地点…" />

    <div class="filter-bar">
      <el-radio-group v-model="typeFilter" size="small">
        <el-radio-button value="">全部</el-radio-button>
        <el-radio-button value="lost">丢失</el-radio-button>
        <el-radio-button value="found">拾到</el-radio-button>
      </el-radio-group>
    </div>

    <LoadingState v-if="loading" text="正在加载失物招领数据…" />
    <ErrorState v-else-if="error" text="数据加载失败，请检查 Mock 服务" :on-retry="fetchData" />
    <EmptyState v-else-if="items.length === 0" :text="keyword || typeFilter ? '没有找到匹配的记录' : '暂无失物招领信息'" />
    <div v-else class="lost-list">
      <ItemCard v-for="item in items" :key="item.id" :item="item" />
    </div>
  </section>
</template>

<style scoped>
.desc { color: #909399; margin-bottom: 16px; }
.lost-list { display: flex; flex-direction: column; gap: 0; }
.filter-bar { margin-bottom: 16px; }
</style>
