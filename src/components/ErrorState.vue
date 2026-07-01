<template>
  <div class="error-state">
    <el-icon :size="48" color="#f56c6c"><WarningFilled /></el-icon>
    <p class="error-text">{{ text }}</p>
    <el-button v-if="onRetry" type="primary" size="small" @click="onRetry">重新加载</el-button>
  </div>
</template>

<script setup lang="ts">
import { WarningFilled } from '@element-plus/icons-vue'
defineProps<{ text?: string; onRetry?: () => void }>()
</script>

<style scoped>
.error-state { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 64px 0; }
.error-text { margin: 16px 0; font-size: 14px; color: #f56c6c; }
</style>
