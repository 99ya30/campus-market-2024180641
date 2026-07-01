# 校园轻集市

## 1. 项目简介

"校园轻集市"是一个面向高校校园生活场景的 PC 端 Web App，主要支持二手交易、失物招领、拼单搭子、跑腿委托等功能。本项目为 7 天 Vue 3 前端工程实训的最终成果。

## 2. 技术栈

- **Vue 3** — Composition API + `<script setup>`
- **Vite** — 构建工具，极速 HMR
- **TypeScript** — 类型安全的 JavaScript 超集
- **Vue Router** — 单页应用路由，History 模式
- **Pinia** — Vue 3 官方状态管理
- **Axios** — HTTP 请求库
- **JSON Server** — Mock 后端接口
- **Element Plus** — UI 组件库
- **ESLint + Oxlint** — 代码检查
- **vue-tsc** — 类型检查

## 3. 核心功能

| 功能模块 | 说明 |
|---|---|
| 首页与导航 | 顶部导航栏 + 底部 Tab 导航，四个业务入口 |
| 二手交易 | 商品列表展示，支持关键字搜索和收藏 |
| 失物招领 | 失物/招领列表，支持类型筛选和关键字搜索 |
| 拼单搭子 | 拼单列表，支持关键字搜索 |
| 跑腿委托 | 委托列表，支持关键字搜索 |
| 信息发布 | 类型切换表单，字段校验，POST 提交 |
| 用户中心 | 用户资料展示，收藏列表管理 |
| 状态反馈 | 加载中、空数据、错误重试三种状态 |

## 4. 项目运行

```bash
# 安装依赖
npm install

# 启动 Mock 服务（端口 3001）
npm run mock

# 新开终端，启动前端项目（端口 5173）
npm run dev

# 类型检查
npm run type-check

# 构建项目
npm run build
```

> 注意：Mock 服务和前端服务必须同时运行。

## 5. 项目目录说明

```
campus-market-2024180641/
├── db.json                    # Mock 数据（4 类业务，共 21 条记录）
├── CHECK_REPORT.md            # 检测报告
├── README.md                  # 本文件
├── src/
│   ├── api/                   # 接口请求模块
│   │   ├── http.ts            # Axios 实例
│   │   ├── trade.ts           # 二手交易 API
│   │   ├── lostFound.ts       # 失物招领 API
│   │   ├── groupBuy.ts        # 拼单搭子 API
│   │   └── errand.ts          # 跑腿委托 API
│   ├── components/            # 公共组件
│   │   ├── AppHeader.vue      # 顶部导航栏
│   │   ├── AppLayout.vue      # 页面布局容器
│   │   ├── AppNav.vue         # 底部导航栏
│   │   ├── ItemCard.vue       # 信息卡片
│   │   ├── EmptyState.vue     # 空状态提示
│   │   ├── FormField.vue      # 表单字段组件
│   │   ├── LoadingState.vue   # 加载状态
│   │   ├── ErrorState.vue     # 错误状态（含重试）
│   │   └── SearchBar.vue      # 搜索框
│   ├── router/
│   │   └── index.ts           # 12 条路由，4 组业务
│   ├── stores/
│   │   ├── user.ts            # 用户状态（模拟登录）
│   │   └── favorite.ts        # 收藏状态（内存）
│   └── views/
│       ├── HomeView.vue       # 首页
│       ├── TradeView.vue      # 二手交易
│       ├── LostFoundView.vue  # 失物招领
│       ├── GroupBuyView.vue   # 拼单搭子
│       ├── ErrandView.vue     # 跑腿委托
│       ├── PublishView.vue    # 信息发布
│       ├── MessageView.vue    # 消息中心
│       └── UserCenterView.vue # 用户中心
├── docs/
│   ├── ai/
│   │   └── AI_Collaboration_Card.md  # AI 协作记录
│   ├── evidence/              # 每日证据卡（Day1—Day7）
│   └── prototype/             # HTML 页面原型（22 页）
├── package.json
├── vite.config.ts
└── tsconfig*.json
```

## 6. 每日开发记录

| 天数 | 主题 | 核心产出 |
|---|---|---|
| Day1 | 项目启动与业务梳理 | 页面清单，业务场景分析 |
| Day2 | 页面骨架与路由导航 | 12 条路由，17 个 .vue 文件，公共布局 |
| Day3 | Mock 数据与列表渲染 | db.json，4 个 API 模块，ItemCard 组件 |
| Day4 | 发布表单与数据新增 | 类型切换表单，字段校验，POST 提交 |
| Day5 | 状态管理与用户中心 | Pinia store，收藏功能，用户资料 |
| Day6 | 交互优化与体验完善 | 加载/错误/空状态，搜索筛选，代码清理 |
| Day7 | 综合验收与项目展示 | README，AI 复盘，最终检查，证据归档 |

## 7. AI 协作说明

本项目开发过程中使用 AI Coding 工具辅助完成页面骨架设计、Mock 数据建模、接口封装、表单设计、状态管理和交互优化。开发者对 AI 生成内容进行了人工审查、修改和取舍，具体过程记录在 `docs/evidence/` 和 `docs/ai/` 中。

## 8. 项目不足与改进方向

- 使用 JSON Server 模拟后端，非真实服务器
- 用户状态为 Pinia 模拟，无真实登录认证
- 收藏数据存储在内存中，刷新后丢失
- 未实现图片上传功能
- 搜索功能仅前端关键字过滤，无后端分页搜索
- 页面样式仍有优化空间
