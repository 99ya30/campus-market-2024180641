<script setup lang="ts"></script>

<template>
  <div class="app">
    <header>
      <h1>校园轻集市</h1>
      <nav>
        <router-link to="/">首页</router-link>
        <router-link to="/list">列表</router-link>
        <router-link to="/publish">发布</router-link>
        <router-link to="/message">消息</router-link>
        <router-link to="/profile">我的</router-link>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app {
  max-width: 960px;
  margin: 0 auto;
  padding: 16px;
}
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 1px solid #e4e7ed;
  margin-bottom: 24px;
}
header h1 {
  margin: 0;
  font-size: 22px;
}
nav {
  display: flex;
  gap: 12px;
}
nav a {
  color: #333;
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
}
nav a:hover {
  background: #ecf5ff;
  color: #409eff;
}
</style>
