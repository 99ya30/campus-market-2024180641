# Day4 发布表单与数据新增

## 一、今日任务概览

| 任务 | 描述 | 状态 |
|------|------|------|
| Task 1 | 设计发布类型（四类业务） | ✅ |
| Task 2 | 设计发布表单（类型切换动态字段） | ✅ |
| Task 3 | 实现表单校验（必填+数值规则） | ✅ |
| Task 4 | 提交新增数据（Axios POST + 页面跳转） | ✅ |
| Task 5 | 完成证据记录 | ✅ |

## 二、表单字段设计

### 2.1 字段设计说明

根据"校园轻集市"四类业务的不同需求，设计了"通用字段 + 专属字段"的表单结构：

**通用字段（所有类型）：**
- `title`（标题）- 必填，最多 50 字
- `campus`（校区）- 必填，选择东/西/南/北校区
- `location`（具体地点）- 必填
- `description`（详细描述）- 必填，最多 500 字
- `tags`（标签）- 可选，多选标签

**专属字段（按类型切换）：**

| 发布类型 | 专属字段 | 说明 |
|---------|---------|------|
| 二手交易 | `price`（价格）、`condition`（成色） | 价格 > 0，成色选择题 |
| 失物招领 | `lostType`（丢失/拾到）、`eventTime`（时间）、`features`（物品特征） | 单选类型，时间选择器 |
| 拼单搭子 | `peopleCount`（目标人数）、`deadline`（截止时间） | 人数 ≥ 1，时间选择器 |
| 跑腿委托 | `reward`（酬劳）、`destination`（送达地点）、`expectTime`（期望时间） | 酬劳 > 0，时间选择器 |

**字段设计理由：**
- `title` 是最核心的展示信息，必须让用户清晰表达意图
- `campus` + `location` 帮助确定交易/任务的位置，校园场景下必不可少
- `description` 提供足够的详情空间
- 专属字段针对每类业务的核心需求：二手交易需要价格和成色，失物招领需要区分丢失/拾到，拼单需要人数和截止时间，跑腿需要酬劳和送达位置

### 2.2 与前序数据的对应关系

表单提交的字段映射到 `db.json` 中对应集合的字段结构。例如二手交易表单的 `price` + `condition` 对应 `trades` 集合中的 `price` + `condition` 字段。

## 三、表单校验设计

### 3.1 校验规则

| 字段 | 校验规则 | 原因 |
|------|---------|------|
| `title` | 必填 | 核心展示字段 |
| `campus` | 必填 | 确定业务发生范围 |
| `location` | 必填 | 具体位置信息 |
| `description` | 必填 | 足够的内容描述 |
| `price` | 必填 + 数值 > 0 | 价格是交易核心 |
| `reward` | 必填 + 数值 > 0 | 酬劳是委托核心 |
| `peopleCount` | 必填 + 整数 ≥ 1 | 拼单人数合理区间 |
| `deadline` | 必填 | 拼单有截止时间 |
| `features` | 必填 | 物品特征帮助辨认 |
| `destination` | 必填 | 送达位置必须明确 |
| `expectTime` | 必填 | 委托有期望完成时间 |

### 3.2 校验实现方式

使用 Element Plus `el-form` 的 `FormRules` 机制，在失去焦点（`blur`）和选项变更（`change`）时触发校验。

## 四、数据提交流程

```
用户填写表单 → 点击"提交发布" → validate() 校验
  ├─ 校验失败 → 显示错误提示 → 阻止提交
  └─ 校验成功 → 构建业务数据对象 → axios.post()
       ├─ POST 成功 → ElMessage.success() → router.push(对应列表页)
       └─ POST 失败 → ElMessage.error("请检查 Mock 服务")
```

### 4.1 API 新增方法

在 Day3 的 API 模块基础上补充了 4 个 POST 方法：

| 文件 | 新增方法 | 端点 |
|------|---------|------|
| `src/api/trade.ts` | `createTrade()` | POST `/trades` |
| `src/api/lostFound.ts` | `createLostFound()` | POST `/lostFounds` |
| `src/api/groupBuy.ts` | `createGroupBuy()` | POST `/groupBuys` |
| `src/api/errand.ts` | `createErrand()` | POST `/errands` |

### 4.2 数据映射

表单的通用字段（title、campus、location、description）映射到所有类型。
专属字段（price、condition、reward、peopleCount 等）按类型映射。
`publisher` 暂时使用固定值 `"我"`，`status` 默认为 `"open"`，`publishedAt` 为当前时间。

### 4.3 提交后行为

- 成功：显示成功消息 → 自动跳转到对应列表页（/trade、/lost-found、/group-buy、/errand）
- 失败：显示错误消息，提示检查 JSON Server 是否已启动

## 五、AI 协作记录

### 5.1 AI 辅助完成内容

- 发布表单的 Vue 结构（类型选择卡片 + el-form 动态字段）
- Element Plus 组件的使用（el-input、el-select、el-date-picker、el-input-number）
- FormRules 校验规则的配置
- `handleSubmit` 中异步 validate 调用模式
- 数据映射到 API 字段的逻辑框架

### 5.2 人工调整内容

- 调整了数据映射逻辑，确保每个字段与 db.json 字段名称一致
- 补充了 `formatTime()` 工具函数处理日期格式
- 添加了 `submitting` 状态防止重复提交
- 修正了 `validate()` 的 Promise 链调用方式
- 为提交按钮添加了 `native-type="submit"` 和 `@submit.prevent` 处理表单默认提交行为
- 添加了失败情况的用户提示

### 5.3 关键决策

- 使用"类型切换表单"而非"统一简化表单"，更好地贴合四类业务差异
- 表单字段采用一个统一对象存储（而非多个独立对象），便于教学理解
- 校验规则按字段声明，不同业务类型共享同一 rules 对象，通过 `el-form-item` 的 `prop` 绑定

## 六、测试记录

### 6.1 测试环境

- Mock 服务：http://localhost:3001
- 前端服务：http://localhost:5173

### 6.2 测试步骤

1. 启动 Mock 服务：`pnpm run mock --port 3001`
2. 启动前端服务：`pnpm run dev`
3. 浏览器打开 `/publish`
4. 依次测试四类业务发布

### 6.3 测试结果

| 发布类型 | 测试字段 | 结果 | 验证方式 |
|---------|---------|------|---------|
| 二手交易 | 标题+价格+成色+地点+描述 | ✅ | 跳转 /trade 查看列表 |
| 失物招领 | 标题+丢失/拾到+时间+特征 | ✅ | 跳转 /lost-found 查看列表 |
| 拼单搭子 | 标题+人数+截止时间+地点 | ✅ | 跳转 /group-buy 查看列表 |
| 跑腿委托 | 标题+酬劳+送达地点+时间 | ✅ | 跳转 /errand 查看列表 |

所有四类业务发布均成功，JSON Server 返回 201，db.json 文件中新增了对应记录。

## 七、文件变更清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/api/trade.ts` | 修改 | 新增 `createTrade()` POST 方法 |
| `src/api/lostFound.ts` | 修改 | 新增 `createLostFound()` POST 方法 |
| `src/api/groupBuy.ts` | 修改 | 新增 `createGroupBuy()` POST 方法 |
| `src/api/errand.ts` | 修改 | 新增 `createErrand()` POST 方法 |
| `src/components/FormField.vue` | 新增 | 统一表单项组件（包裹 el-form-item） |
| `src/views/PublishView.vue` | 修改 | 表单校验、POST 提交、页面跳转 |
| `docs/evidence/Day4_Evidence.md` | 新增 | 本日证据卡 |
