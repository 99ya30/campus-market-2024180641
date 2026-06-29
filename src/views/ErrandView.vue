<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Refresh } from '@element-plus/icons-vue'
import { getErrands, type ErrandItem } from '@/api/errand'
import ItemCard from '@/components/ItemCard.vue'
import EmptyState from '@/components/EmptyState.vue'

const items = ref<ErrandItem[]>([])
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  try {
    const res = await getErrands()
    items.value = res.data
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section>
    <h2>跑腿委托</h2>
    <p class="desc">发布跑腿任务或接单赚取酬劳</p>

    <div v-if="loading" class="loading-mask">
      <el-icon class="is-loading" :size="28"><Refresh /></el-icon>
      <span>加载中...</span>
    </div>

    <EmptyState v-else-if="items.length === 0" text="暂无跑腿委托信息" />

    <div v-else class="errand-list">
      <ItemCard v-for="item in items" :key="item.id" :item="item" />
    </div>
  </section>
</template>

<style scoped>
.desc { color: #909399; margin-bottom: 16px; }
.errand-list { display: flex; flex-direction: column; gap: 0; }
.loading-mask { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 64px 0; color: #999; }
</style>
