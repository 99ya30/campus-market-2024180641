<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Refresh } from '@element-plus/icons-vue'
import { getTrades, type TradeItem } from '@/api/trade'
import ItemCard from '@/components/ItemCard.vue'
import EmptyState from '@/components/EmptyState.vue'

const items = ref<TradeItem[]>([])
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  try {
    const res = await getTrades()
    items.value = res.data
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section>
    <h2>二手交易</h2>
    <p class="desc">浏览校园闲置好物，发现实惠宝贝</p>

    <div v-if="loading" class="loading-mask">
      <el-icon class="is-loading" :size="28"><Refresh /></el-icon>
      <span>加载中...</span>
    </div>

    <EmptyState v-else-if="items.length === 0" text="暂无二手交易信息" />

    <div v-else class="trade-list">
      <ItemCard v-for="item in items" :key="item.id" :item="item" />
    </div>
  </section>
</template>

<style scoped>
.desc { color: #909399; margin-bottom: 16px; }
.trade-list { display: flex; flex-direction: column; gap: 0; }
.loading-mask { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 64px 0; color: #999; }
</style>
