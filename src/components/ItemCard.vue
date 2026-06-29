<template>
  <div class="item-card" @click="$router.push(`/item/${item.id}`)">
    <div class="card-image" v-if="item.image">
      <el-image :src="item.image" fit="cover" />
    </div>
    <div class="card-body">
      <h3 class="card-title">{{ item.title }}</h3>
      <div class="card-meta">
        <span class="card-price" v-if="(item as any).price !== undefined">
          ¥{{ (item as any).price }}
        </span>
        <span class="card-reward" v-else-if="(item as any).reward !== undefined">
          酬劳 ¥{{ (item as any).reward }}
        </span>
        <span class="card-info">{{ item.publisher }}</span>
        <span v-if="(item as any).campus" class="card-info">{{ (item as any).campus }}</span>
      </div>
      <div class="card-extras">
        <span v-if="(item as any).condition" class="card-tag">{{ (item as any).condition }}</span>
        <span v-if="(item as any).category" class="card-tag">{{ (item as any).category }}</span>
        <span v-if="(item as any).currentCount !== undefined" class="card-tag">
          {{ (item as any).currentCount }}/{{ (item as any).targetCount }} 人
        </span>
        <span v-if="(item as any).type === 'lost'" class="card-tag tag-lost">寻物</span>
        <span v-else-if="(item as any).type === 'found'" class="card-tag tag-found">拾到</span>
        <span class="card-time">{{ item.publishedAt }}</span>
      </div>
    </div>
    <div class="card-status" :class="item.status">
      {{ statusLabel(item.status) }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  item: Record<string, any>
}>()

function statusLabel(s: string): string {
  if (s === 'open') return '进行中'
  if (s === 'closed') return '已关闭'
  if (s === 'done') return '已完成'
  return s
}
</script>

<style scoped>
.item-card {
  display: flex;
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 1px 4px rgba(0,0,0,.08);
  cursor: pointer;
  transition: box-shadow .2s;
  position: relative;
}
.item-card:hover {
  box-shadow: 0 2px 12px rgba(0,0,0,.12);
}
.card-image {
  width: 140px;
  min-height: 105px;
  border-radius: 6px;
  overflow: hidden;
  margin-right: 16px;
  flex-shrink: 0;
}
.card-image .el-image {
  width: 100%;
  height: 100%;
}
.card-body {
  flex: 1;
  min-width: 0;
}
.card-title {
  margin: 0 0 8px;
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-meta {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 8px;
  font-size: 13px;
}
.card-price,
.card-reward {
  color: #e6a23c;
  font-weight: 700;
  font-size: 16px;
}
.card-info {
  color: #666;
}
.card-extras {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
}
.card-tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  background: #f5f5f5;
  color: #666;
}
.tag-lost {
  background: #fef0f0;
  color: #f56c6c;
}
.tag-found {
  background: #f0f9eb;
  color: #67c23a;
}
.card-time {
  font-size: 12px;
  color: #999;
  margin-left: auto;
}
.card-status {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 2px 10px;
  border-radius: 4px;
  font-size: 12px;
}
.card-status.open {
  background: #e6f7ff;
  color: #1890ff;
}
.card-status.closed {
  background: #f5f5f5;
  color: #999;
}
.card-status.done {
  background: #f0f9eb;
  color: #67c23a;
}
</style>
