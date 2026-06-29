<script setup lang="ts">
</script>

<template>
  <header class="app-header">
    <div class="header-inner">
      <router-link to="/" class="logo">🏫 校园轻集市</router-link>
      <div class="header-right">
        <router-link to="/user" class="user-link">
          <el-avatar :size="32" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face" />
        </router-link>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header { background: #fff; border-bottom: 1px solid #e4e7ed; height: 56px; display: flex; align-items: center; position: sticky; top: 0; z-index: 100; }
.header-inner { max-width: 1280px; width: 100%; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; }
.logo { font-size: 18px; font-weight: 700; color: #409eff; text-decoration: none; }
.user-link { display: flex; align-items: center; }
</style>
