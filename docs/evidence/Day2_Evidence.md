# Day2 多页面布局与路由导航

## 新增页面

| 页面 | 文件路径 | 说明 |
|------|----------|------|
| 首页 | `src/views/HomeView.vue` | 包含看板统计信息（商品总数、今日发布、在线用户、成交笔数） |
| 列表页 | `src/views/ListView.vue` | 商品列表，每项可跳转详情页 |
| 详情页 | `src/views/DetailView.vue` | 根据路由参数 `:id` 显示商品详情 |
| 发布页 | `src/views/PublishView.vue` | 发布表单（名称、价格、描述） |
| 消息页 | `src/views/MessageView.vue` | 消息列表展示 |
| 个人中心 | `src/views/ProfileView.vue` | 用户信息与快捷入口 |
| 登录页 | `src/views/LoginView.vue` | 登录表单（扩展页面） |

## 路由设计

路由配置文件：`src/router/index.ts`

采用 `createWebHistory` 模式，共 7 条路由：

| 路径 | 组件 | 加载方式 | 说明 |
|------|------|----------|------|
| `/` | `HomeView` | 直接导入 | 首页/看板 |
| `/list` | `ListView` | 懒加载 | 商品列表 |
| `/detail/:id` | `DetailView` | 懒加载 | 商品详情，`id` 为路由参数 |
| `/publish` | `PublishView` | 懒加载 | 发布商品 |
| `/message` | `MessageView` | 懒加载 | 消息中心 |
| `/profile` | `ProfileView` | 懒加载 | 个人中心 |
| `/login` | `LoginView` | 懒加载 | 登录页 |

除首页外均使用懒加载（`() => import(...)`），以优化首屏加载性能。

## 导航实现

`App.vue` 顶部导航栏包含 5 个入口：首页、列表、发布、消息、我的。

使用 `<router-link>` 实现原生导航跳转，未使用 Element Plus（项目未安装该依赖）。

## 进阶功能

1. **看板统计**：首页展示 4 项静态统计卡片（商品总数 128、今日发布 12、在线用户 36、成交笔数 89）
2. **列表→详情传参**：列表页通过 `/detail/${item.id}` 跳转，详情页通过 `route.params.id` 获取参数

## 遇到的问题

- 无重大问题。路由配置与视图文件一一对应，导航结构清晰。

## AI 协作记录

- 本次任务由 AI（opencode）辅助完成页面骨架搭建和路由配置
- AI 生成了各页面的基础模板和样式
- 导航结构由 AI 提出方案后确认实现
