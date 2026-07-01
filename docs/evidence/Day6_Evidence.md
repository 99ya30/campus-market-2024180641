# Day6 交互优化与体验完善

## 一、今日任务概览

| 任务 | 描述 | 状态 |
|------|------|------|
| Task 1 | 完善列表状态（loading / empty / error） | ✅ |
| Task 2 | 增加搜索筛选（关键词搜索 + 类型筛选） | ✅ |
| Task 3 | 优化发布体验（表单反馈、校验清除） | ✅ |
| Task 4 | 整理组件代码（抽取复用组件） | ✅ |
| Task 5 | 完成证据记录 | ✅

## 二、优化内容

### 2.1 新增组件

| 组件 | 说明 |
|------|------|
| `LoadingState.vue` | 加载中状态，含 Loading 图标和自定义文字 |
| `ErrorState.vue` | 请求失败状态，含警告图标、错误文字和"重新加载"按钮 |
| `SearchBar.vue` | 搜索输入框，支持 v-model 双向绑定和自定义占位符 |

### 2.2 列表页面状态完善

所有四个核心列表页面统一了状态处理逻辑，判断顺序为：

```
loading → error → empty → list
```

| 页面 | loading | error（含重试） | empty（区分搜索/无数据） | search |
|------|---------|----------------|-------------------------|--------|
| TradeView | ✅ | ✅ | ✅ | ✅ 标题/地点/描述 |
| LostFoundView | ✅ | ✅ | ✅ | ✅ 标题/物品名称 + 类型筛选 |
| GroupBuyView | ✅ | ✅ | ✅ | ✅ 标题/地点/描述 |
| ErrandView | ✅ | ✅ | ✅ | ✅ 标题/取件/送达地点 |

### 2.3 搜索筛选优化

- **TradeView**：关键词搜索标题、地点、描述
- **LostFoundView**：关键词搜索 + `el-radio-group` 类型筛选（全部/丢失/拾到）
- **GroupBuyView**：关键词搜索标题、地点、描述
- **ErrandView**：关键词搜索标题、取件地点、送达地点、描述

所有搜索使用 `computed` 属性实现即时过滤，未匹配时显示"没有找到匹配的…"提示。

### 2.4 发布表单体验优化

- `selectType()` 切换发布类型后自动清除校验状态（`clearValidate()`）
- 类型切换使用 `nextTick` 确保 DOM 更新后再清除校验
- 提交按钮保持 `loading` 状态防止重复提交
- 提交成功/失败均有 Element Plus `ElMessage` 反馈

### 2.5 代码整理

- 删除了各页面中的内联 loading 样式，统一使用 `LoadingState.vue` 组件
- `SearchBar.vue` 抽取为独立组件，可在多页面复用
- 修复了 `HomeView.vue` 导航入口路由（`/list` → `/trade` 等正确路由）
- `HomeView.vue` 欢迎昵称改用 userStore 读取

## 三、问题修复记录

| 问题 | 原因 | 修复方式 |
|------|------|---------|
| 首页快捷入口指向 `/list`（路由不存在） | 早期开发遗留 | 改为 `/trade` `/lost-found` `/group-buy` `/errand` |
| SearchBar 编译报错 `Property 'query'` | v-model 绑定未定义变量 | 改用 `:model-value` + `@input` emit |
| 发布类型切换后校验残留 | 没有清除校验状态 | 添加 `nextTick` + `clearValidate()` |
| HomeView 昵称硬编码 | 未使用 userStore | 改用 `user.name` 读取 |

## 四、AI 协作记录

### 4.1 AI 辅助完成内容

- LoadingState / ErrorState / SearchBar 三个组件的基础结构
- 列表页面的 loading / empty / error 状态判断模板
- 搜索关键字的 computed 过滤逻辑
- LostFoundView 的类型筛选 radio-group

### 4.2 人工调整内容

- SearchBar 修复 v-model 绑定方式（`:model-value` + `@input` emit）
- 统一所有页面的状态判断顺序（loading → error → empty → list）
- 空状态文字区分"搜索无结果"和"暂无数据"
- 筛选时 reset error 状态（`error.value = false`）
- 发布页面添加 `nextTick` 确保 `clearValidate()` 正确执行
- HomeView 路由修复和 store 接入

## 五、完整功能走查记录

走查顺序和结果：

| 步骤 | 操作 | 预期 | 结果 |
|------|------|------|------|
| 1 | 打开首页 | 显示昵称"陈小星"，4 个快捷入口 | ✅ |
| 2 | 点击二手交易 | 数据加载，显示 LoadingState 后展示列表 | ✅ |
| 3 | 搜索框输入"键盘" | 列表过滤为仅包含键盘的商品 | ✅ |
| 4 | 点击收藏按钮 | 图标变为红色实心 | ✅ |
| 5 | 进入个人中心 | 显示用户资料 + 收藏数量和列表 | ✅ |
| 6 | 返回取消收藏 | 图标变回灰色空心 | ✅ |
| 7 | 打开发布/拼单搭子 | 填写信息，提交 | ✅ 跳转到 /group-buy |
| 8 | 列表确认新增 | 新数据出现在列表 | ✅ |
| 9 | 暂停 Mock，刷新列表 | 显示 ErrorState + 重新加载按钮 | ✅ |
| 10 | 恢复 Mock，点重试 | 数据重新加载 | ✅ |

## 六、文件变更清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/components/LoadingState.vue` | 新增 | 加载状态组件 |
| `src/components/ErrorState.vue` | 新增 | 错误状态组件（含重试按钮） |
| `src/components/SearchBar.vue` | 新增 | 搜索框组件 |
| `src/views/TradeView.vue` | 修改 | loading + error + search + favorite |
| `src/views/LostFoundView.vue` | 修改 | loading + error + search + 类型筛选 |
| `src/views/GroupBuyView.vue` | 修改 | loading + error + search |
| `src/views/ErrandView.vue` | 修改 | loading + error + search |
| `src/views/PublishView.vue` | 修改 | 类型切换清除校验 |
| `src/views/HomeView.vue` | 修改 | 路由修复 + store 接入 |
| `docs/evidence/Day6_Evidence.md` | 新增 | 本日证据卡 |
