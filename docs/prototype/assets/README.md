# 校园轻集市 - 高保真原型设计说明

## 项目概述

校园轻集市是一个面向高校校园的 PC 端 Web App，涵盖二手交易、失物招领、拼单搭子、跑腿委托、消息沟通、个人中心、管理审核等核心业务。

## 图片来源

原型中使用的高清图片来自 Unsplash 公开图片库：
- `images.unsplash.com` — 商品图、物品图、人物头像
- 所有图片使用 `fit=crop` 参数确保比例统一

## 技术栈（原型层）

| 技术 | 用途 |
|------|------|
| HTML5 | 页面结构 |
| Tailwind CSS (CDN) | 原子化样式辅助 |
| Vue 3 (CDN) | 组件化与数据绑定 |
| Element Plus (CDN) | UI 组件库风格 |
| Element Plus Icons (CDN) | 图标库 |

## 设计规范

| 项目 | 值 |
|------|------|
| 主色 | `#409eff` |
| 背景色 | `#f0f2f5` |
| 卡片底色 | `#ffffff` |
| 卡片圆角 | `8px` |
| 卡片阴影 | `0 2px 12px rgba(0,0,0,0.06)` |
| 最大内容宽度 | `1280px` |
| 布局适配 | PC 端 1440px 宽屏 |

## 后续迁移到 Vue3 + Vite + TypeScript + Element Plus 建议

1. **组件拆分**：每个 HTML 页面中的 `<style>` 可对应 `.vue` 文件的 `<style scoped>`
2. **公共样式**：`assets/common.css` 中的 CSS 变量可直接迁移到 `:root` 或全局样式文件
3. **路由系统**：每个 HTML 页面对应一个 Vue 路由页面，使用 Vue Router 替换 `<a>` 跳转
4. **状态管理**：各页面的响应式数据（如搜索框、筛选条件）使用 Pinia 管理
5. **组件复用**：`ProductCard`、`UserRow`、`Tag`、`FilterBar` 等可提取为通用组件
6. **API 层**：静态数据替换为 axios 请求，使用 `request.ts` 统一封装

## 文件清单

共计 22 个页面 + 2 个资源文件：

```
index.html             原型入口页面
home.html              首页 / 信息流
category.html          分类浏览
item-detail.html       二手商品详情
lost-detail.html       失物招领详情
group-detail.html      拼单搭子详情
task-detail.html       跑腿委托详情
publish.html           发布选择页
publish-item.html      发布二手商品
publish-lost.html      发布失物招领
publish-group.html     发布拼单搭子
publish-task.html      发布跑腿委托
messages.html          消息列表
chat.html              聊天详情
profile.html           个人中心
my-posts.html          我的发布
favorites.html         我的收藏
settings.html          账号设置
login.html             登录
register.html          注册
admin-dashboard.html   管理端首页
admin-review.html      信息审核
assets/common.css      公共样式
assets/README.md       本说明文件
```
