<script setup lang="ts">
const stats = [
  { label: '商品总数', value: 1286, color: '#409eff' },
  { label: '今日发布', value: 48, color: '#67c23a' },
  { label: '本周交易', value: 256, color: '#e6a23c' },
  { label: '活跃用户', value: 326, color: '#f56c6c' },
  { label: '失物找回', value: 18, color: '#909399' },
]
</script>

<template>
  <section>
    <h2>趋势看板</h2>
    <p class="desc">校园轻集市实时数据概览</p>
    <div class="stats-grid">
      <div v-for="s in stats" :key="s.label" class="stat-card">
        <span class="stat-value" :style="{ color: s.color }">{{ s.value }}</span>
        <span class="stat-label">{{ s.label }}</span>
      </div>
    </div>
    <div class="chart-placeholder">
      <h4>本周发布趋势</h4>
      <div class="bar-chart">
        <div v-for="i in 7" :key="i" class="bar" :style="{ height: (20 + Math.random() * 60) + 'px' }"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.desc { color: #909399; margin-bottom: 20px; }
.stats-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; margin-bottom: 24px; }
.stat-card { display: flex; flex-direction: column; align-items: center; padding: 24px 16px; background: #fff; border: 1px solid #ebeef5; border-radius: 8px; }
.stat-value { font-size: 28px; font-weight: 700; }
.stat-label { margin-top: 6px; font-size: 13px; color: #909399; }
.chart-placeholder { background: #fff; border: 1px solid #ebeef5; border-radius: 8px; padding: 24px; }
.chart-placeholder h4 { margin: 0 0 16px; font-size: 15px; }
.bar-chart { display: flex; align-items: flex-end; gap: 12px; height: 120px; }
.bar { flex: 1; background: linear-gradient(to top, #409eff, #66b1ff); border-radius: 4px 4px 0 0; min-height: 20px; }
</style>
