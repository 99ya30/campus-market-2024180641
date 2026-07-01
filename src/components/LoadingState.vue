<template>
  <div class="loading-state">
    <el-icon class="is-loading" :size="32"><Refresh /></el-icon>
    <p class="loading-text">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
import { Refresh } from '@element-plus/icons-vue'
defineProps<{ text?: string }>()
</script>

<style scoped>
.loading-state { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 64px 0; color: #999; }
.loading-text { margin-top: 12px; font-size: 14px; }
</style>
