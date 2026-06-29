import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    /* ===== 首页 ===== */
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: '首页' },
    },

    /* ===== 集市业务页面 ===== */
    {
      path: '/trade',
      name: 'trade',
      component: () => import('@/views/TradeView.vue'),
      meta: { title: '二手交易' },
    },
    {
      path: '/lost-found',
      name: 'lost-found',
      component: () => import('@/views/LostFoundView.vue'),
      meta: { title: '失物招领' },
    },
    {
      path: '/group-buy',
      name: 'group-buy',
      component: () => import('@/views/GroupBuyView.vue'),
      meta: { title: '拼单搭子' },
    },
    {
      path: '/errand',
      name: 'errand',
      component: () => import('@/views/ErrandView.vue'),
      meta: { title: '跑腿委托' },
    },
    {
      path: '/item/:id',
      name: 'item-detail',
      component: () => import('@/views/DetailView.vue'),
      meta: { title: '信息详情' },
    },

    /* ===== 用户相关 ===== */
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/UserCenterView.vue'),
      meta: { title: '个人中心' },
    },
    {
      path: '/identity',
      name: 'identity',
      component: () => import('@/views/IdentityView.vue'),
      meta: { title: '身份创建' },
    },

    /* ===== 互动 ===== */
    {
      path: '/publish',
      name: 'publish',
      component: () => import('@/views/PublishView.vue'),
      meta: { title: '信息发布' },
    },
    {
      path: '/message',
      name: 'message',
      component: () => import('@/views/MessageView.vue'),
      meta: { title: '消息中心' },
    },

    /* ===== 辅助页面 ===== */
    {
      path: '/board',
      name: 'board',
      component: () => import('@/views/BoardView.vue'),
      meta: { title: '趋势看板' },
    },
    {
      path: '/safety',
      name: 'safety',
      component: () => import('@/views/SafetyView.vue'),
      meta: { title: '安全提醒' },
    },
  ],
})

export default router
