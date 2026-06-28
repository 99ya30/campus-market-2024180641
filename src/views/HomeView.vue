<script setup lang="ts">
const stats = [
  { label: '商品总数', value: 128 },
  { label: '今日发布', value: 12 },
  { label: '在线用户', value: 36 },
  { label: '成交笔数', value: 89 },
]
</script>

<template>
  <section>
    <h2>欢迎来到校园轻集市</h2>
    <div class="stats-grid">
      <div v-for="s in stats" :key="s.label" class="stat-card">
        <span class="stat-value">{{ s.value }}</span>
        <span class="stat-label">{{ s.label }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
  margin-top: 20px;
}
.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
  background: #f5f7fa;
  border-radius: 8px;
}
.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #409eff;
}
.stat-label {
  margin-top: 8px;
  font-size: 14px;
  color: #666;
}
</style>
