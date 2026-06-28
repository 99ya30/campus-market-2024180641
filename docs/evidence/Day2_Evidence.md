# Day2 多页面布局与路由导航

## 新增页面

本日共创建 12 个页面组件，覆盖校园轻集市核心业务：

| 页面 | 文件路径 | 路由路径 | 说明 |
|------|----------|----------|------|
| 首页 | `src/views/HomeView.vue` | `/` | 平台入口，展示欢迎信息与业务分类入口 |
| 二手交易 | `src/views/TradeView.vue` | `/trade` | 二手商品列表，展示闲置物品卡片 |
| 失物招领 | `src/views/LostFoundView.vue` | `/lost-found` | 失物与招领信息列表 |
| 拼单搭子 | `src/views/GroupBuyView.vue` | `/group-buy` | 拼单、搭子、组队信息列表 |
| 跑腿委托 | `src/views/ErrandView.vue` | `/errand` | 跑腿任务与委托信息列表 |
| 信息详情 | `src/views/DetailView.vue` | `/item/:id` | 动态路由，展示各类信息详情 |
| 发布页面 | `src/views/PublishView.vue` | `/publish` | 用于发布二手、失物、拼单或跑腿信息 |
| 消息页面 | `src/views/MessageView.vue` | `/message` | 展示私信与系统通知 |
| 个人中心 | `src/views/UserCenterView.vue` | `/user` | 展示用户资料、发布与收藏入口 |
| 身份创建 | `src/views/IdentityView.vue` | `/identity` | 角色选择页面（扩展） |
| 趋势看板 | `src/views/BoardView.vue` | `/board` | 数据统计展示（扩展） |
| 安全提醒 | `src/views/SafetyView.vue` | `/safety` | 安全交易指南（扩展） |

## 路由设计

路由配置文件：`src/router/index.ts`

采用 `createWebHistory` 模式，按模块分组，共 12 条路由：

| 路径 | 组件 | 加载方式 | 分组 |
|------|------|----------|------|
| `/` | `HomeView` | 直接导入 | 首页 |
| `/trade` | `TradeView` | 懒加载 | 集市业务 |
| `/lost-found` | `LostFoundView` | 懒加载 | 集市业务 |
| `/group-buy` | `GroupBuyView` | 懒加载 | 集市业务 |
| `/errand` | `ErrandView` | 懒加载 | 集市业务 |
| `/item/:id` | `DetailView` | 懒加载 | 集市业务 |
| `/user` | `UserCenterView` | 懒加载 | 用户相关 |
| `/identity` | `IdentityView` | 懒加载 | 用户相关 |
| `/publish` | `PublishView` | 懒加载 | 互动 |
| `/message` | `MessageView` | 懒加载 | 互动 |
| `/board` | `BoardView` | 懒加载 | 辅助 |
| `/safety` | `SafetyView` | 懒加载 | 辅助 |

路由路径语义清晰，命名统一。详情页使用动态路由 `/item/:id`，支持从列表页携带参数跳转。

## 公共布局

在 `src/components/` 下创建了三个公共布局组件：

| 组件 | 文件 | 职责 |
|------|------|------|
| `AppLayout.vue` | `src/components/AppLayout.vue` | 整体页面布局容器，组合 Header 和 Nav |
| `AppHeader.vue` | `src/components/AppHeader.vue` | 顶部区域，显示 Logo 和用户头像 |
| `AppNav.vue` | `src/components/AppNav.vue` | 侧边导航菜单，支持路由高亮 |

`App.vue` 已简化为仅引用 `<AppLayout />`，页面结构与布局逻辑完全分离。

## 导航实现

`AppNav.vue` 包含 8 个导航入口：首页、二手、失物、拼单、跑腿、发布、消息、我的。

使用 `<router-link>` 实现跳转，通过 `useRoute().path` 匹配当前路由实现高亮。

## 遇到的问题

1. **命名对齐**：项目初期创建的 `ListView.vue`、`ProfileView.vue` 等文件命名与 Day2 文档要求的 `TradeView.vue`、`UserCenterView.vue` 不一致。已按文档规范补充新文件，旧文件保留作为业务迭代参考。
2. **Element Plus 集成**：中期引入 Element Plus 后，需要保持与原有原生样式的兼容，通过 `scoped` 样式隔离解决。
3. **路由冲突**：多个页面可能共用详情组件，通过动态路由 `/item/:id` 统一处理。

## AI 协作记录

- 页面骨架由 AI（opencode）辅助生成基础模板和样式
- 路由配置文件由 AI 生成初版，手动按模块分组和添加 `meta.title`
- 公共布局组件由 AI 生成初始版本，人工调整了导航高亮逻辑和布局间距
- 所有 AI 生成代码均经过人工审查：确认页面命名与业务对应、路由路径语义正确、组件职责分离合理
