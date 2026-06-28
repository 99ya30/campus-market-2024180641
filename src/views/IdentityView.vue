<script setup lang="ts">
</script>

<template>
  <section>
    <h2>身份创建</h2>
    <p>请选择你的角色以开启校园轻集市之旅</p>
    <div class="role-cards">
      <div class="role-card">
        <span class="role-icon">🛍️</span>
        <h3>买家</h3>
        <p>浏览和购买校园好物</p>
      </div>
      <div class="role-card">
        <span class="role-icon">📦</span>
        <h3>卖家</h3>
        <p>发布闲置物品出售</p>
      </div>
      <div class="role-card">
        <span class="role-icon">🤝</span>
        <h3>搭子</h3>
        <p>参与拼单与跑腿</p>
      </div>
    </div>
    <button class="btn btn-primary">确认身份</button>
  </section>
</template>

<style scoped>
.role-cards { display: flex; gap: 20px; margin: 20px 0; }
.role-card { flex: 1; text-align: center; padding: 32px 16px; border: 1px solid #e4e7ed; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
.role-card:hover { border-color: #409eff; box-shadow: 0 4px 12px rgba(64,158,255,0.12); }
.role-icon { font-size: 36px; display: block; margin-bottom: 8px; }
.role-card h3 { margin: 0 0 4px; font-size: 16px; }
.role-card p { margin: 0; font-size: 13px; color: #909399; }
</style>
