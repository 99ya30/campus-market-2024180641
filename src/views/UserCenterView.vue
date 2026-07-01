<template>
  <section>
    <h2>个人中心</h2>
    <div class="profile-card">
      <el-avatar :size="72" :src="user.avatar" />
      <h3>{{ user.name }}</h3>
      <p class="user-info">{{ user.college }} · {{ user.grade }} · {{ user.campus }}</p>
      <div class="stats">
        <div class="stat"><span class="num">{{ stats.publishCount }}</span><span class="lbl">发布</span></div>
        <div class="stat"><span class="num">{{ stats.tradeCount }}</span><span class="lbl">成交</span></div>
        <div class="stat"><span class="num">{{ fav.count }}</span><span class="lbl">收藏</span></div>
      </div>
    </div>

    <el-divider content-position="left">我的收藏</el-divider>
    <div class="fav-section">
      <template v-if="fav.items.length === 0">
        <EmptyState text="还没有收藏任何内容" />
      </template>
      <el-timeline v-else>
        <el-timeline-item
          v-for="(f, i) in fav.items"
          :key="i"
          :timestamp="'收藏 #' + f.id"
          placement="top"
        >
          <span class="fav-type">{{ typeLabel(f.type) }}</span>
          <router-link :to="`/item/${f.id}`" class="fav-link">查看详情 →</router-link>
        </el-timeline-item>
      </el-timeline>
    </div>

    <div class="menu">
      <router-link to="/publish" class="menu-item">📦 我的发布</router-link>
      <router-link to="/message" class="menu-item">💬 我的消息</router-link>
      <router-link to="/" class="menu-item">⚙️ 账号设置</router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useFavoriteStore } from '@/stores/favorite'
import EmptyState from '@/components/EmptyState.vue'

const user = useUserStore()
const fav = useFavoriteStore()

const stats = {
  publishCount: 5,
  tradeCount: 3,
}

function typeLabel(t: string): string {
  const map: Record<string, string> = {
    trade: '二手交易',
    lost: '失物招领',
    group: '拼单搭子',
    errand: '跑腿委托',
  }
  return map[t] || t
}
</script>

<style scoped>
.profile-card { text-align: center; background: #fff; border: 1px solid #ebeef5; border-radius: 8px; padding: 32px; margin-bottom: 20px; }
.profile-card h3 { margin: 12px 0 4px; font-size: 18px; }
.user-info { font-size: 14px; color: #909399; margin: 0 0 16px; }
.stats { display: flex; justify-content: center; gap: 32px; }
.stat { text-align: center; }
.num { display: block; font-size: 22px; font-weight: 700; color: #409eff; }
.lbl { font-size: 13px; color: #909399; }
.fav-section { margin-bottom: 20px; }
.fav-type { font-weight: 600; margin-right: 12px; }
.fav-link { font-size: 13px; color: #409eff; text-decoration: none; }
.fav-link:hover { text-decoration: underline; }
.menu { background: #fff; border: 1px solid #ebeef5; border-radius: 8px; overflow: hidden; }
.menu-item { display: block; padding: 14px 20px; border-bottom: 1px solid #f5f7fa; font-size: 14px; color: #303133; text-decoration: none; }
.menu-item:last-child { border-bottom: none; }
.menu-item:hover { background: #ecf5ff; color: #409eff; }
</style>
