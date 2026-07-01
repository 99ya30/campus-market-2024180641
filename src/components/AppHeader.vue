<template>
  <header class="app-header">
    <div class="header-inner">
      <router-link to="/" class="logo">🏫 校园轻集市</router-link>
      <div class="header-right">
        <div class="user-info">
          <span class="user-name" v-if="user.isLoggedIn">{{ user.name }}</span>
          <span class="user-college">{{ user.college }}</span>
        </div>
        <router-link to="/user" class="user-link">
          <el-avatar :size="32" :src="user.avatar" />
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
const user = useUserStore()
</script>

<style scoped>
.app-header { background: #fff; border-bottom: 1px solid #e4e7ed; height: 56px; display: flex; align-items: center; position: sticky; top: 0; z-index: 100; }
.header-inner { max-width: 1280px; width: 100%; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; }
.logo { font-size: 18px; font-weight: 700; color: #409eff; text-decoration: none; }
.header-right { display: flex; align-items: center; gap: 12px; }
.user-info { text-align: right; line-height: 1.3; }
.user-name { font-size: 13px; font-weight: 600; color: #303133; display: block; }
.user-college { font-size: 11px; color: #909399; display: block; }
.user-link { display: flex; align-items: center; }
</style>
