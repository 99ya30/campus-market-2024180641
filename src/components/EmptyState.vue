<template>
  <div class="empty-state">
    <el-icon :size="64" color="#d9d9d9"><icon-box /></el-icon>
    <p class="empty-text">{{ text }}</p>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { Box as iconBox } from '@element-plus/icons-vue'
defineProps<{ text?: string }>()
</script>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 0;
  color: #999;
}
.empty-text {
  margin-top: 16px;
  font-size: 14px;
}
</style>
