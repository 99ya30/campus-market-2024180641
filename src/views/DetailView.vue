<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <section>
    <h2>商品详情</h2>
    <p>商品 ID：{{ route.params.id }}</p>
    <p class="placeholder">详细商品信息展示区域</p>
    <router-link to="/list" class="back">← 返回列表</router-link>
  </section>
</template>

<style scoped>
.placeholder {
  color: #999;
  padding: 40px 0;
}
.back {
  color: #409eff;
  text-decoration: none;
}
</style>
