# Day3 Mock 数据建模与列表渲染

## 一、今日任务概览

| 任务 | 描述 | 状态 |
|------|------|------|
| Task 1 | 设计 Mock 数据模型（db.json） | ✅ |
| Task 2 | 启动 JSON Server | ✅ |
| Task 3 | 封装 Axios 请求 | ✅ |
| Task 4 | 页面列表渲染 | ✅ |
| Task 5 | 完成证据记录 | ✅ |

## 二、Mock 数据模型设计

### 2.1 我的设计思路

根据"校园轻集市"四类业务——二手交易、失物招领、拼单搭子、跑腿委托——分别设计贴合校园场景的数据结构。

**字段设计原则：**
- 字段命名统一采用 camelCase
- 每类数据包含 `id`、`title`、`publisher`、`avatar`、`college`、`publishedAt`、`status` 等公共字段
- 每类数据包含各自的业务特有字段（如 `price`、`reward`、`targetCount` 等）
- `status` 统一使用 `open` / `closed` / `done` 区分状态
- `type` 字段按需使用（如失物招领的 `lost` / `found`、拼单的 `food` / `transport` / `sports`）
- 图片使用 Unsplash 占位图

**数据量：** 每类业务 5-6 条，共 21 条 Mock 数据。

### 2.2 AI 辅助生成数据

使用 Vue3 + Vite + TypeScript + Vue Router + Pinia + Axios + JSON Server 技术栈，由 AI 协助生成：
- db.json 四类业务数据结构与校园场景数据
- Axios 基础封装
- 业务 API 模块拆分
- 列表页面渲染与 ItemCard 通用组件

### 2.3 我的设计与 AI 设计对比

| 对比项 | 我的设计 | AI 设计（调整前） |
|--------|----------|-------------------|
| 字段命名 | camelCase 统一命名 | 同左 |
| 状态字段 | `open` / `closed` / `done` | 同左 |
| 数据场景 | 校园日常场景：教材、键盘、羽毛球拍、校园卡、拼奶茶、取快递等 | 同左，但需人工确认场景是否真实 |
| 特有字段 | 按业务区分：`price`、`condition`、`reward`、`targetCount`、`pickupLocation` 等 | 同左 |
| 字段完整度 | 确保页面渲染所需字段齐全 | AI 可能导致字段遗漏，需补充 `avatar`、`college` 等展示字段 |

**最终调整：** 保留 AI 生成的四类数据结构框架，补充了 `avatar`、`college`、`description` 等字段；将每类数据从 3 条扩展到 5-6 条；统一图片字段为 `image`。

### 2.4 数据模型概览

```json
{
  "trades": [
    { "id", "title", "price", "category", "condition", "publisher",
      "college", "avatar", "campus", "location", "image",
      "publishedAt", "status", "tags", "description" }
  ],
  "lostFounds": [
    { "id", "type", "title", "itemName", "location", "occurredAt",
      "contact", "publisher", "college", "avatar", "image",
      "publishedAt", "status", "description" }
  ],
  "groupBuys": [
    { "id", "title", "type", "targetCount", "currentCount",
      "deadline", "location", "campus", "publisher", "college",
      "avatar", "publishedAt", "status", "description" }
  ],
  "errands": [
    { "id", "title", "reward", "pickupLocation", "deliveryLocation",
      "deadline", "campus", "publisher", "college", "avatar",
      "publishedAt", "status", "description" }
  ]
}
```

## 三、技术实现

### 3.1 依赖安装

```bash
pnpm add axios
pnpm add -D json-server@0.17.4
```

### 3.2 JSON Server 配置

在 `package.json` 中添加：
```json
"mock": "json-server --watch db.json --port 3001"
```

### 3.3 Axios 封装

`src/api/http.ts`：创建 Axios 实例，baseURL 指向 `http://localhost:3001`。

### 3.4 业务 API 模块

| 文件 | 导出接口 | 对应数据 |
|------|----------|----------|
| `src/api/trade.ts` | `getTrades()` | `/trades` |
| `src/api/lostFound.ts` | `getLostFounds()` | `/lostFounds` |
| `src/api/groupBuy.ts` | `getGroupBuys()` | `/groupBuys` |
| `src/api/errand.ts` | `getErrands()` | `/errands` |

### 3.5 通用组件

- **ItemCard.vue**：通用列表卡片，适配四类业务数据展示；点击跳转 `/item/:id`
- **EmptyState.vue**：无数据占位组件，接收 `text` prop

### 3.6 页面数据驱动

四个核心业务页面统一模式：
1. `onMounted` 中调用对应 API
2. 异步获取数据绑定到 `items` ref
3. 展示 loading → 空状态 → 数据列表

| 页面 | API | 状态 |
|------|-----|------|
| TradeView | `getTrades()` | ✅ |
| LostFoundView | `getLostFounds()` | ✅ |
| GroupBuyView | `getGroupBuys()` | ✅ |
| ErrandView | `getErrands()` | ✅ |

## 四、项目构建验证

- TypeScript 类型检查：`vue-tsc --build` ✅
- 项目构建：`vite build` ✅

## 五、文件变更清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `db.json` | 新增 | Mock 数据（4 类，21 条） |
| `package.json` | 修改 | 添加 `mock` 脚本 |
| `src/api/http.ts` | 新增 | Axios 实例 |
| `src/api/trade.ts` | 新增 | 二手交易 API + 类型 |
| `src/api/lostFound.ts` | 新增 | 失物招领 API + 类型 |
| `src/api/groupBuy.ts` | 新增 | 拼单搭子 API + 类型 |
| `src/api/errand.ts` | 新增 | 跑腿委托 API + 类型 |
| `src/api/.gitkeep` | 删除 | 已由正式文件取代 |
| `src/components/ItemCard.vue` | 新增 | 通用列表卡片 |
| `src/components/EmptyState.vue` | 新增 | 空状态组件 |
| `src/views/TradeView.vue` | 修改 | 数据驱动列表 |
| `src/views/LostFoundView.vue` | 修改 | 数据驱动列表 |
| `src/views/GroupBuyView.vue` | 修改 | 数据驱动列表 |
| `src/views/ErrandView.vue` | 修改 | 数据驱动列表 |
| `docs/evidence/Day3_Evidence.md` | 新增 | 本日证据卡 |
