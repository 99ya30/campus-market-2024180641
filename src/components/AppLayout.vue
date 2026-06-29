<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import AppNav from './AppNav.vue'
</script>

<template>
  <div class="app-layout">
    <AppHeader />
    <div class="layout-body">
      <AppNav />
      <main class="layout-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-layout { min-height: 100vh; display: flex; flex-direction: column; background: #f0f2f5; }
.layout-body { display: flex; flex: 1; max-width: 1280px; width: 100%; margin: 0 auto; padding: 20px 24px; gap: 24px; }
.layout-content { flex: 1; min-width: 0; }
</style>
