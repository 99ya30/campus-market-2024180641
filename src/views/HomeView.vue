<script setup lang="ts">
const nickname = '陈小星'
const favCount = 23
const unreadCount = 3

interface Entry {
  icon: string
  title: string
  desc: string
  route: string
}

const entries: Entry[] = [
  { icon: '🛍️', title: '二手交易', desc: '闲置好物等你来淘', route: '/list' },
  { icon: '🔍', title: '失物招领', desc: '找回丢失的物品', route: '/list' },
  { icon: '👥', title: '拼单搭子', desc: '一起拼更划算', route: '/list' },
  { icon: '🏃', title: '跑腿委托', desc: '有事你说话', route: '/list' },
]

interface Item {
  id: number
  title: string
  tag: string
  tagType: 'primary' | 'success' | 'warning' | 'info' | 'danger'
  time: string
}

const items: Item[] = [
  { id: 1, title: '出闲置教材《软件工程导论》，九成新', tag: '二手', tagType: 'primary', time: '10 分钟前' },
  { id: 2, title: '东区食堂三楼拼奶茶，还差 2 人', tag: '拼单', tagType: 'success', time: '30 分钟前' },
  { id: 3, title: '拾到校园卡一张，请失主联系', tag: '失物', tagType: 'warning', time: '1 小时前' },
  { id: 4, title: '求帮取快递到 6 栋宿舍，酬谢 15 元', tag: '跑腿', tagType: 'info', time: '2 小时前' },
  { id: 5, title: 'IKBC 机械键盘红轴 87 键', tag: '二手', tagType: 'primary', time: '3 小时前' },
]
</script>

<template>
  <div class="home">
    <!-- 顶部欢迎栏 -->
    <div class="welcome-bar">
      <div class="welcome-text">
        <h2>你好，{{ nickname }} 👋</h2>
        <p>今天有什么想看看的？</p>
      </div>
      <div class="welcome-stats">
        <div class="stat-item">
          <el-badge :value="favCount" :max="99" class="stat-badge">
            <span class="stat-icon">❤️</span>
          </el-badge>
          <span class="stat-label">收藏</span>
        </div>
        <div class="stat-item">
          <el-badge :value="unreadCount" :max="99" class="stat-badge">
            <span class="stat-icon">💬</span>
          </el-badge>
          <span class="stat-label">未读</span>
        </div>
      </div>
    </div>

    <!-- 四类业务入口 -->
    <el-row :gutter="16" class="entry-row">
      <el-col v-for="e in entries" :key="e.title" :span="6">
        <router-link :to="e.route" class="entry-card">
          <span class="entry-icon">{{ e.icon }}</span>
          <span class="entry-title">{{ e.title }}</span>
          <span class="entry-desc">{{ e.desc }}</span>
        </router-link>
      </el-col>
    </el-row>

    <!-- 最新信息列表 -->
    <div class="section-header">
      <h3>最新信息</h3>
      <router-link to="/list" class="more">查看更多</router-link>
    </div>
    <el-card shadow="never" class="list-card">
      <div v-for="item in items" :key="item.id" class="list-item">
        <el-tag :type="item.tagType" size="small" effect="plain">{{ item.tag }}</el-tag>
        <router-link :to="`/item/${item.id}`" class="item-title">{{ item.title }}</router-link>
        <span class="item-time">{{ item.time }}</span>
      </div>
    </el-card>

    <!-- 底部快捷导航 -->
    <div class="bottom-nav">
      <router-link to="/list" class="nav-item">
        <span class="nav-icon">📋</span>
        <span class="nav-label">列表</span>
      </router-link>
      <router-link to="/publish" class="nav-item">
        <span class="nav-icon">✏️</span>
        <span class="nav-label">发布</span>
      </router-link>
      <router-link to="/message" class="nav-item">
        <span class="nav-icon">💬</span>
        <span class="nav-label">消息</span>
        <el-badge :value="unreadCount" :max="99" class="nav-badge" />
      </router-link>
      <router-link to="/profile" class="nav-item">
        <span class="nav-icon">👤</span>
        <span class="nav-label">个人</span>
      </router-link>
      <router-link to="/board" class="nav-item">
        <span class="nav-icon">📊</span>
        <span class="nav-label">看板</span>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
}

/* 欢迎栏 */
.welcome-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.welcome-text h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
}
.welcome-text p {
  margin: 4px 0 0;
  font-size: 14px;
  color: #909399;
}
.welcome-stats {
  display: flex;
  gap: 20px;
}
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.stat-icon {
  font-size: 22px;
}
.stat-badge :deep(.el-badge__content) {
  font-size: 11px;
}
.stat-label {
  font-size: 12px;
  color: #909399;
}

/* 业务入口 */
.entry-row {
  margin-bottom: 24px !important;
}
.entry-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 12px;
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s;
}
.entry-card:hover {
  border-color: #409eff;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.12);
  transform: translateY(-2px);
}
.entry-icon {
  font-size: 32px;
  margin-bottom: 8px;
}
.entry-title {
  font-size: 15px;
  font-weight: 600;
  color: #303133;
}
.entry-desc {
  font-size: 12px;
  color: #909399;
  margin-top: 2px;
}

/* 最新信息 */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.section-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}
.more {
  font-size: 13px;
  color: #409eff;
  text-decoration: none;
}
.more:hover {
  color: #66b1ff;
}
.list-card {
  margin-bottom: 80px;
}
.list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f5f7fa;
}
.list-item:last-child {
  border-bottom: none;
}
.item-title {
  flex: 1;
  font-size: 14px;
  color: #303133;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item-title:hover {
  color: #409eff;
}
.item-time {
  font-size: 12px;
  color: #909399;
  white-space: nowrap;
}

/* 底部导航 */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 800px;
  display: flex;
  background: #fff;
  border-top: 1px solid #ebeef5;
  padding: 8px 0;
  z-index: 100;
}
.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  text-decoration: none;
  color: #909399;
  position: relative;
  transition: color 0.2s;
}
.nav-item:hover {
  color: #409eff;
}
.nav-icon {
  font-size: 20px;
}
.nav-label {
  font-size: 11px;
}
.nav-badge {
  position: absolute;
  top: -4px;
  right: 50%;
  margin-right: -28px;
}
.nav-badge :deep(.el-badge__content) {
  font-size: 10px;
  height: 16px;
  line-height: 16px;
  padding: 0 5px;
}
</style>
