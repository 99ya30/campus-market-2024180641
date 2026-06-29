<script setup lang="ts">
const user = { name: '陈小星', college: '计算机科学与技术学院', grade: '大三', campus: '东校区' }
const stats = { posts: 12, trades: 8, favorites: 23 }
</script>

<template>
  <section>
    <h2>个人中心</h2>
    <div class="profile-card">
      <el-avatar :size="72" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&h=160&fit=crop&crop=face" />
      <h3>{{ user.name }}</h3>
      <p class="user-info">{{ user.college }} · {{ user.grade }} · {{ user.campus }}</p>
      <div class="stats">
        <div class="stat"><span class="num">{{ stats.posts }}</span><span class="lbl">发布</span></div>
        <div class="stat"><span class="num">{{ stats.trades }}</span><span class="lbl">成交</span></div>
        <div class="stat"><span class="num">{{ stats.favorites }}</span><span class="lbl">收藏</span></div>
      </div>
    </div>
    <div class="menu">
      <router-link to="/publish" class="menu-item">📦 我的发布</router-link>
      <router-link to="/message" class="menu-item">💬 我的消息</router-link>
      <router-link to="/" class="menu-item">❤️ 我的收藏</router-link>
      <router-link to="/" class="menu-item">⚙️ 账号设置</router-link>
    </div>
  </section>
</template>

<style scoped>
.profile-card { text-align: center; background: #fff; border: 1px solid #ebeef5; border-radius: 8px; padding: 32px; margin-bottom: 20px; }
.profile-card h3 { margin: 12px 0 4px; font-size: 18px; }
.user-info { font-size: 14px; color: #909399; margin: 0 0 16px; }
.stats { display: flex; justify-content: center; gap: 32px; }
.stat { text-align: center; }
.num { display: block; font-size: 22px; font-weight: 700; color: #409eff; }
.lbl { font-size: 13px; color: #909399; }
.menu { background: #fff; border: 1px solid #ebeef5; border-radius: 8px; overflow: hidden; }
.menu-item { display: block; padding: 14px 20px; border-bottom: 1px solid #f5f7fa; font-size: 14px; color: #303133; text-decoration: none; }
.menu-item:last-child { border-bottom: none; }
.menu-item:hover { background: #ecf5ff; color: #409eff; }
</style>
