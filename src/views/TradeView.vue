<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { StarFilled, Star } from '@element-plus/icons-vue'
import { getTrades, type TradeItem } from '@/api/trade'
import { useFavoriteStore } from '@/stores/favorite'
import ItemCard from '@/components/ItemCard.vue'
import LoadingState from '@/components/LoadingState.vue'
import ErrorState from '@/components/ErrorState.vue'
import EmptyState from '@/components/EmptyState.vue'
import SearchBar from '@/components/SearchBar.vue'

const fav = useFavoriteStore()
const allItems = ref<TradeItem[]>([])
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
    const res = await getTrades()
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
    <h2>二手交易</h2>
    <p class="desc">浏览校园闲置好物，发现实惠宝贝</p>

    <SearchBar v-model="keyword" placeholder="搜索二手商品标题、地点…" />

    <LoadingState v-if="loading" text="正在加载二手交易数据…" />
    <ErrorState v-else-if="error" text="数据加载失败，请检查 Mock 服务是否已启动" :on-retry="fetchData" />
    <EmptyState v-else-if="items.length === 0" :text="keyword ? '没有找到匹配的二手商品' : '暂无二手交易信息'" />
    <div v-else class="trade-list">
      <ItemCard v-for="item in items" :key="item.id" :item="item">
        <el-button
          :type="fav.isFavorited('trade', item.id) ? 'danger' : 'default'"
          :icon="fav.isFavorited('trade', item.id) ? StarFilled : Star"
          size="small"
          circle
          @click="fav.toggle('trade', item.id)"
        />
      </ItemCard>
    </div>
  </section>
</template>

<style scoped>
.desc { color: #909399; margin-bottom: 16px; }
.trade-list { display: flex; flex-direction: column; gap: 0; }
</style>
