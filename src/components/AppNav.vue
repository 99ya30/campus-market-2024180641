<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

interface NavItem { path: string; label: string; icon: string }
const navItems: NavItem[] = [
  { path: '/', label: '首页', icon: '🏠' },
  { path: '/trade', label: '二手', icon: '🛍️' },
  { path: '/lost-found', label: '失物', icon: '🔍' },
  { path: '/group-buy', label: '拼单', icon: '👥' },
  { path: '/errand', label: '跑腿', icon: '🏃' },
  { path: '/publish', label: '发布', icon: '✏️' },
  { path: '/message', label: '消息', icon: '💬' },
  { path: '/user', label: '我的', icon: '👤' },
]

function isActive(path: string): boolean {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<template>
  <nav class="app-nav">
    <router-link
      v-for="item in navItems"
      :key="item.path"
      :to="item.path"
      class="nav-item"
      :class="{ active: isActive(item.path) }"
    >
      <span class="nav-icon">{{ item.icon }}</span>
      <span class="nav-label">{{ item.label }}</span>
    </router-link>
  </nav>
</template>

<style scoped>
.app-nav { width: 160px; flex-shrink: 0; }
.nav-item { display: flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: 6px; font-size: 14px; color: #606266; text-decoration: none; transition: all 0.15s; margin-bottom: 4px; }
.nav-item:hover { background: #ecf5ff; color: #409eff; }
.nav-item.active { background: #ecf5ff; color: #409eff; font-weight: 600; }
.nav-icon { font-size: 18px; }
</style>
