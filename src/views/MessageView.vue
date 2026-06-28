<script setup lang="ts">
const messages = [
  { id: 1, from: '张三', content: '请问这个还卖吗？', time: '10:30' },
  { id: 2, from: '李四', content: '能便宜点吗？', time: '昨天' },
]
</script>

<template>
  <section>
    <h2>消息中心</h2>
    <div v-if="messages.length" class="msg-list">
      <div v-for="msg in messages" :key="msg.id" class="msg-item">
        <strong>{{ msg.from }}</strong>
        <p>{{ msg.content }}</p>
        <span class="time">{{ msg.time }}</span>
      </div>
    </div>
    <p v-else class="empty">暂无消息</p>
  </section>
</template>

<style scoped>
.msg-list {
  margin-top: 16px;
}
.msg-item {
  padding: 12px 0;
  border-bottom: 1px solid #ebeef5;
}
.msg-item p {
  margin: 4px 0;
  color: #666;
}
.time {
  font-size: 12px;
  color: #999;
}
.empty {
  color: #999;
  text-align: center;
  padding: 40px 0;
}
</style>
