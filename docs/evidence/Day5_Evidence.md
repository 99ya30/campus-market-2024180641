# Day5 状态管理与用户中心

## 一、今日任务概览

| 任务 | 描述 | 状态 |
|------|------|------|
| Task 1 | 创建用户状态 Store | ✅ |
| Task 2 | 创建收藏状态 Store | ✅ |
| Task 3 | 完善个人中心页面 | ✅ |
| Task 4 | 实现跨页面状态使用 | ✅ |
| Task 5 | 完成证据记录 | ✅ |

## 二、Store 设计

### 2.1 用户状态 Store（user.ts）

**设计文件：** `src/stores/user.ts`

**管理状态：**
- `name` — 用户姓名
- `college` — 所属学院
- `grade` — 年级
- `campus` — 所属校区
- `avatar` — 头像 URL

**Getters：**
- `displayName` — 显示名称
- `isLoggedIn` — 登录状态（当前固定返回 true）

**Actions：**
- `setUser(info)` — 更新用户信息

**设计理由：** 用户信息需要在导航栏、发布页面、个人中心等多个位置使用，是典型的跨页面共享状态，适合放入 Pinia Store。

### 2.2 收藏状态 Store（favorite.ts）

**设计文件：** `src/stores/favorite.ts`

**管理状态：**
- `items` — 收藏列表，存储 `{ type, id }` 对象数组

**Getters：**
- `count` — 收藏总数

**Actions：**
- `isFavorited(type, id)` — 判断是否已收藏
- `toggle(type, id)` — 收藏/取消收藏
- `getByType(type)` — 按类型获取收藏项

**设计理由：** 收藏状态需要在列表页（收藏/取消收藏）和个人中心页（展示收藏列表）同时使用，适合放入 Pinia Store。

### 2.3 状态边界说明

**放入 Store 的状态：**
- 当前用户信息（user Store）
- 收藏列表（favorite Store）

**未放入 Store 的状态：**
- 表单输入数据（如 PublishView 的 `form`）— 只属于当前页面
- 接口返回的列表数据（如 TradeView 的 `items`）— 只在当前页面使用
- 表单校验错误信息 — 只属于当前表单页面
- 页面加载状态（loading）— 只属于当前页面

## 三、跨页面状态使用

### 3.1 导航栏显示用户信息（AppHeader.vue）

`src/components/AppHeader.vue` 引入 `useUserStore()`，显示用户姓名、学院和头像：
- 左侧显示用户姓名 + 学院
- 右侧显示用户头像，点击跳转个人中心

### 3.2 发布页面使用当前用户（PublishView.vue）

Day4 中 `publisher` 使用固定值 `"我"`，Day5 改为从 `userStore` 读取：
- 所有四类业务的 `publisher` 字段改为 `user.name`
- `college` 和 `avatar` 也同步使用 Store 中的值

### 3.3 列表页面添加收藏（TradeView.vue）

`src/views/TradeView.vue` 引入 `useFavoriteStore()`：
- 每个 ItemCard 右下角增加收藏按钮
- 已收藏显示红色实心心形，未收藏显示灰色空心心形
- 点击切换收藏/取消收藏状态

### 3.4 个人中心展示状态（UserCenterView.vue）

从两个 Store 读取数据：
- `userStore` — 显示用户资料（姓名、学院、年级、校区、头像）
- `favoriteStore` — 展示收藏列表（按时间线排列）
- 收藏数量动态显示在统计区域

## 四、AI 协作记录

### 4.1 AI 辅助完成内容

- Pinia Store 的基础结构（defineStore + state + getter + action）
- Composition API 风格的 Store 写法
- 收藏 Store 的 toggle / isFavorited 等操作方法
- 个人中心页面的布局结构（用户资料卡片 + 统计数字 + 收藏列表 + 菜单列表）

### 4.2 人工调整内容

- 将 Store 拆分为 `user.ts` 和 `favorite.ts` 两个独立文件，职责分离
- 调整 AppHeader 显示样式（姓名 + 学院两行展示）
- 在 ItemCard 中添加了 `@click.stop` 防止收藏按钮点击触发卡片跳转
- 添加了 `typeLabel()` 函数将收藏类型映射为中文
- 保留部分数据的页面本地状态（如 UserCenterView 的 `stats` 对象），明确区分"跨页面共享"和"页面本地"的边界

### 4.3 关键决策

- 使用 Composition API（setup）风格的 Pinia Store，而非 Options API，与 Vue 组件风格一致
- 收藏数据仅保存在前端内存中，刷新后丢失（Day5 可接受的范围）
- 用户信息使用模拟数据，不依赖后端登录接口

## 五、测试记录

### 5.1 测试步骤

1. 启动 Mock 服务 + 前端服务
2. 导航栏：确认显示用户姓名和头像
3. 发布页面：确认提交时 `publisher` 为用户姓名
4. 二手交易页：点击收藏按钮，确认图标切换
5. 个人中心：确认用户资料显示正确
6. 个人中心：确认收藏数量动态更新

### 5.2 测试结果

| 测试项 | 结果 | 说明 |
|--------|------|------|
| 导航栏显示用户 | ✅ | 显示"陈小星" + "计算机科学与技术学院" |
| 发布页使用用户 | ✅ | POST 数据中 publisher 为用户姓名 |
| 收藏/取消收藏 | ✅ | 图标颜色切换，再次点击取消 |
| 个人用户资料 | ✅ | 姓名、学院、年级、校区完整显示 |
| 个人收藏列表 | ✅ | 显示已收藏的类型和跳转链接 |
| 收藏数量联动 | ✅ | 个人中心统计与收藏列表一致 |

## 六、文件变更清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/stores/user.ts` | 新增 | 用户状态 Store（Composition API） |
| `src/stores/favorite.ts` | 新增 | 收藏状态 Store |
| `src/stores/.gitkeep` | 删除 | 已由正式文件取代 |
| `src/components/AppHeader.vue` | 修改 | 引入 userStore 显示用户信息 |
| `src/components/ItemCard.vue` | 修改 | 添加默认插槽 + @click.stop |
| `src/views/TradeView.vue` | 修改 | 引入 favoriteStore 添加收藏按钮 |
| `src/views/PublishView.vue` | 修改 | publisher/college/avatar 从 userStore 读取 |
| `src/views/UserCenterView.vue` | 修改 | 用户资料 + 收藏列表全部使用 Pinia |
| `docs/evidence/Day5_Evidence.md` | 新增 | 本日证据卡 |
