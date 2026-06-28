<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Star, StarFilled, ChatDotRound } from '@element-plus/icons-vue'

const route = useRoute()
const isFavorited = ref(false)

type ItemType = 'secondhand' | 'lost' | 'group' | 'task'

const itemType = ref<ItemType>('secondhand')

const typeOptions = [
  { label: '二手商品', value: 'secondhand' as const },
  { label: '失物招领', value: 'lost' as const },
  { label: '拼单搭子', value: 'group' as const },
  { label: '跑腿委托', value: 'task' as const },
]

const typeTagMap: Record<ItemType, { label: string; type: 'primary' | 'warning' | 'success' | 'info' }> = {
  secondhand: { label: '二手', type: 'primary' },
  lost: { label: '失物', type: 'warning' },
  group: { label: '拼单', type: 'success' },
  task: { label: '跑腿', type: 'info' },
}

const typeStatusMap: Record<ItemType, { label: string; type: 'success' | 'warning' | 'danger' | 'info' }> = {
  secondhand: { label: '在售', type: 'success' },
  lost: { label: '待认领', type: 'warning' },
  group: { label: '进行中', type: 'warning' },
  task: { label: '待接单', type: 'info' },
}
</script>

<template>
  <div class="detail">
    <div class="detail-card">
      <!-- 顶部信息图 -->
      <div class="image-area">
        <div class="image-placeholder">
          <span class="placeholder-icon">🖼️</span>
          <span class="placeholder-text">信息图片</span>
        </div>
      </div>

      <!-- 标题/标签/状态/时间 -->
      <div class="header-area">
        <h1 class="detail-title">
          <template v-if="itemType === 'secondhand'">出闲置教材《软件工程导论》，九成新</template>
          <template v-else-if="itemType === 'lost'">拾到校园卡一张，请失主联系</template>
          <template v-else-if="itemType === 'group'">东区食堂三楼拼奶茶，还差 2 人</template>
          <template v-else>求帮取快递到 6 栋宿舍，酬谢 15 元</template>
        </h1>
        <div class="header-tags">
          <el-tag :type="typeTagMap[itemType].type" size="small">{{ typeTagMap[itemType].label }}</el-tag>
          <el-tag :type="typeStatusMap[itemType].type" size="small" effect="light" round>{{ typeStatusMap[itemType].label }}</el-tag>
          <span class="publish-time">2026-06-28 10:30</span>
        </div>
      </div>

      <!-- 校区/地点/发布人 -->
      <div class="info-row">
        <div class="info-item">
          <span class="info-icon">📍</span>
          <div>
            <span class="info-label">校区</span>
            <span class="info-value">东校区</span>
          </div>
        </div>
        <div class="info-item">
          <span class="info-icon">📌</span>
          <div>
            <span class="info-label">地点</span>
            <span class="info-value">
              <template v-if="itemType === 'secondhand'">3 号宿舍楼下</template>
              <template v-else-if="itemType === 'lost'">西区食堂二楼</template>
              <template v-else-if="itemType === 'group'">东区食堂三楼</template>
              <template v-else>北门快递站 → 6 栋宿舍</template>
            </span>
          </div>
        </div>
        <div class="info-item publisher">
          <el-avatar :size="36" src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&h=80&fit=crop&crop=face" />
          <div>
            <span class="info-label">发布人</span>
            <span class="info-value">张同学 · 信息学院</span>
          </div>
        </div>
      </div>

      <el-divider />

      <!-- 类型化字段区 -->
      <div class="type-fields">
        <!-- 二手：价格/成色/砍价入口 -->
        <template v-if="itemType === 'secondhand'">
          <div class="field-row price-row">
            <span class="field-label">价格</span>
            <span class="field-value price">25.00</span>
          </div>
          <div class="field-row">
            <span class="field-label">成色</span>
            <span class="field-value"><el-tag type="primary" size="small" effect="plain">九成新</el-tag></span>
          </div>
          <div class="field-row">
            <span class="field-label">砍价</span>
            <span class="field-value"><el-button type="primary" link>联系卖家议价</el-button></span>
          </div>
        </template>

        <!-- 失物：丢失/拾获地点、时间、特征 -->
        <template v-else-if="itemType === 'lost'">
          <div class="field-row">
            <span class="field-label">类型</span>
            <span class="field-value"><el-tag type="warning" size="small" effect="plain">拾到物品</el-tag></span>
          </div>
          <div class="field-row">
            <span class="field-label">拾获地点</span>
            <span class="field-value">西区食堂二楼靠窗位置</span>
          </div>
          <div class="field-row">
            <span class="field-label">拾获时间</span>
            <span class="field-value">2026-06-28 11:00</span>
          </div>
          <div class="field-row">
            <span class="field-label">物品特征</span>
            <span class="field-value">蓝色卡套，卡号 2024****061，背面写有"计科 2406"</span>
          </div>
          <div class="field-row">
            <span class="field-label">当前保管</span>
            <span class="field-value">3 号楼一楼值班室</span>
          </div>
        </template>

        <!-- 拼单：人数/截止时间 -->
        <template v-else-if="itemType === 'group'">
          <div class="field-row">
            <span class="field-label">已有人数</span>
            <span class="field-value"><span class="count-num">3</span> / 5 人</span>
          </div>
          <div class="field-row">
            <span class="field-label">进度</span>
            <span class="field-value progress-cell">
              <el-progress :percentage="60" :stroke-width="8" striped striped-flow style="width: 200px" />
            </span>
          </div>
          <div class="field-row">
            <span class="field-label">截止时间</span>
            <span class="field-value">2026-06-28 18:00（今日）</span>
          </div>
          <div class="field-row">
            <span class="field-label">集合地点</span>
            <span class="field-value">东区食堂三楼</span>
          </div>
        </template>

        <!-- 跑腿：酬劳/任务地点/期望时间 -->
        <template v-else>
          <div class="field-row price-row">
            <span class="field-label">酬劳</span>
            <span class="field-value price">15.00</span>
          </div>
          <div class="field-row">
            <span class="field-label">出发地点</span>
            <span class="field-value">北门快递站</span>
          </div>
          <div class="field-row">
            <span class="field-label">送达地点</span>
            <span class="field-value">6 栋宿舍 302</span>
          </div>
          <div class="field-row">
            <span class="field-label">期望完成时间</span>
            <span class="field-value">2026-06-28 20:00 前</span>
          </div>
          <div class="field-row">
            <span class="field-label">物品信息</span>
            <span class="field-value">中通快递 · 鞋盒大小 · 取件码 6-28-3047</span>
          </div>
        </template>
      </div>

      <el-divider />

      <!-- 类型切换（调试用） -->
      <div class="type-switcher">
        <span class="switcher-label">切换类型：</span>
        <el-radio-group v-model="itemType" size="small">
          <el-radio-button v-for="opt in typeOptions" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </el-radio-button>
        </el-radio-group>
      </div>
    </div>

    <!-- 底部按钮 -->
    <div class="bottom-actions">
      <div class="action-inner">
        <el-button
          :type="isFavorited ? 'warning' : 'default'"
          :icon="isFavorited ? StarFilled : Star"
          size="large"
          @click="isFavorited = !isFavorited"
        >
          {{ isFavorited ? '已收藏' : '收藏' }}
        </el-button>
        <el-button type="primary" :icon="ChatDotRound" size="large" @click="$router.push('/message')">
          联系发布者
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail {
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 80px;
}
.detail-card {
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  overflow: hidden;
}

/* 图片区 */
.image-area {
  padding: 20px;
}
.image-placeholder {
  width: 100%;
  height: 260px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7ed 100%);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.placeholder-icon {
  font-size: 40px;
}
.placeholder-text {
  font-size: 14px;
  color: #909399;
}

/* 标题区 */
.header-area {
  padding: 0 20px;
}
.detail-title {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
}
.header-tags {
  display: flex;
  align-items: center;
  gap: 8px;
}
.publish-time {
  font-size: 13px;
  color: #909399;
  margin-left: auto;
}

/* 信息行 */
.info-row {
  display: flex;
  gap: 24px;
  padding: 16px 20px;
  flex-wrap: wrap;
}
.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
}
.info-icon {
  font-size: 18px;
}
.info-label {
  display: block;
  font-size: 12px;
  color: #909399;
  line-height: 1.2;
}
.info-value {
  font-size: 14px;
  color: #303133;
}
.publisher .info-value {
  font-size: 13px;
}

/* 类型字段区 */
.type-fields {
  padding: 0 20px 20px;
}
.field-row {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f5f7fa;
  gap: 16px;
}
.field-row:last-child {
  border-bottom: none;
}
.field-label {
  width: 100px;
  font-size: 13px;
  color: #909399;
  flex-shrink: 0;
}
.field-value {
  font-size: 14px;
  color: #303133;
  display: flex;
  align-items: center;
  gap: 8px;
}
.field-value.price {
  color: #f56c6c;
  font-weight: 700;
  font-size: 22px;
}
.field-value.price::before {
  content: '¥';
  font-size: 16px;
}
.price-row .field-label {
  color: #303133;
  font-weight: 500;
}
.count-num {
  color: #409eff;
  font-weight: 700;
  font-size: 18px;
}
.progress-cell {
  flex: 1;
}

/* 类型切换（调试） */
.type-switcher {
  padding: 0 20px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.switcher-label {
  font-size: 13px;
  color: #909399;
  white-space: nowrap;
}

/* 底部按钮 */
.bottom-actions {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 800px;
  background: #fff;
  border-top: 1px solid #ebeef5;
  padding: 12px 20px;
  z-index: 100;
}
.action-inner {
  display: flex;
  gap: 12px;
}
.action-inner .el-button {
  flex: 1;
}
</style>
