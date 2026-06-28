import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    /* ===== 集市模块 ===== */
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: '今日集市' },
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('@/views/ListView.vue'),
      meta: { title: '集市列表' },
    },
    {
      path: '/item/:id',
      name: 'item-detail',
      component: () => import('@/views/DetailView.vue'),
      meta: { title: '信息详情' },
    },

    /* ===== 用户模块 ===== */
    {
      path: '/identity',
      name: 'identity',
      component: () => import('@/views/IdentityView.vue'),
      meta: { title: '身份创建' },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
      meta: { title: '个人中心' },
    },

    /* ===== 互动模块 ===== */
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

    /* ===== 信息模块 ===== */
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
