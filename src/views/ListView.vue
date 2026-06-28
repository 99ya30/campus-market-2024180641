<script setup lang="ts">
const items = [
  { id: 1, name: '高等数学教材', price: '25.00' },
  { id: 2, name: '机械键盘', price: '120.00' },
  { id: 3, name: '羽毛球拍', price: '80.00' },
  { id: 4, name: '台灯', price: '35.00' },
  { id: 5, name: '移动电源', price: '60.00' },
]
</script>

<template>
  <section>
    <h2>商品列表</h2>
    <div class="list">
      <div v-for="item in items" :key="item.id" class="card">
        <h3>{{ item.name }}</h3>
        <p class="price">¥{{ item.price }}</p>
        <router-link :to="`/detail/${item.id}`" class="link">查看详情</router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 16px;
}
.card {
  padding: 16px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  background: #fff;
}
.card h3 {
  margin: 0 0 8px;
  font-size: 16px;
}
.price {
  color: #f56c6c;
  font-weight: 600;
  font-size: 18px;
}
.link {
  display: inline-block;
  margin-top: 8px;
  color: #409eff;
  text-decoration: none;
}
.link:hover {
  text-decoration: underline;
}
</style>
