<script setup lang="ts"></script>

<template>
  <section>
    <h2>个人中心</h2>
    <div class="info-card">
      <div class="avatar"></div>
      <p class="username">未登录</p>
      <router-link to="/login" class="btn">去登录</router-link>
    </div>
    <div class="menu">
      <router-link to="/list" class="menu-item">我的商品</router-link>
      <router-link to="/message" class="menu-item">我的消息</router-link>
    </div>
  </section>
</template>

<style scoped>
.info-card {
  text-align: center;
  padding: 32px 0;
}
.avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #dcdfe6;
  margin: 0 auto 12px;
}
.username {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
}
.btn {
  display: inline-block;
  padding: 8px 24px;
  background: #409eff;
  color: #fff;
  border-radius: 4px;
  text-decoration: none;
  font-size: 14px;
}
.menu {
  border-top: 1px solid #ebeef5;
}
.menu-item {
  display: block;
  padding: 14px 0;
  color: #333;
  text-decoration: none;
  border-bottom: 1px solid #ebeef5;
}
.menu-item:hover {
  color: #409eff;
}
</style>
