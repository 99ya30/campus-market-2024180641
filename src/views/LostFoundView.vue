<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Refresh } from '@element-plus/icons-vue'
import { getLostFounds, type LostFoundItem } from '@/api/lostFound'
import ItemCard from '@/components/ItemCard.vue'
import EmptyState from '@/components/EmptyState.vue'

const items = ref<LostFoundItem[]>([])
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  try {
    const res = await getLostFounds()
    items.value = res.data
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section>
    <h2>失物招领</h2>
    <p class="desc">发布和查看失物与招领信息，互帮互助</p>

    <div v-if="loading" class="loading-mask">
      <el-icon class="is-loading" :size="28"><Refresh /></el-icon>
      <span>加载中...</span>
    </div>

    <EmptyState v-else-if="items.length === 0" text="暂无失物招领信息" />

    <div v-else class="lost-list">
      <ItemCard v-for="item in items" :key="item.id" :item="item" />
    </div>
  </section>
</template>

<style scoped>
.desc { color: #909399; margin-bottom: 16px; }
.lost-list { display: flex; flex-direction: column; gap: 0; }
.loading-mask { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 64px 0; color: #999; }
</style>
