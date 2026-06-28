<script setup lang="ts">
import { ref } from 'vue'

const keyword = ref('')
const typeFilter = ref('')
const campusFilter = ref('')
const statusFilter = ref('')
const sortBy = ref('time')

interface CardItem {
  id: number
  title: string
  price: string
  campus: string
  status: string
  statusType: 'success' | 'warning' | 'info' | 'danger'
  tag: string
  tagType: 'primary' | 'success' | 'warning' | 'info' | 'danger'
  time: string
}

const items: CardItem[] = [
  { id: 1, title: '出闲置教材《软件工程导论》，九成新', price: '25.00', campus: '东校区', status: '在售', statusType: 'success', tag: '二手', tagType: 'primary', time: '10 分钟前' },
  { id: 2, title: 'IKBC 机械键盘 红轴 87 键 白色背光', price: '120.00', campus: '西校区', status: '在售', statusType: 'success', tag: '二手', tagType: 'primary', time: '1 小时前' },
  { id: 3, title: '东区食堂三楼拼奶茶，还差 2 人', price: '12.00', campus: '东校区', status: '进行中', statusType: 'warning', tag: '拼单', tagType: 'success', time: '30 分钟前' },
  { id: 4, title: '拾到校园卡一张，请失主联系', price: '', campus: '西校区', status: '待认领', statusType: 'warning', tag: '失物', tagType: 'warning', time: '1 小时前' },
  { id: 5, title: '求帮取快递到 6 栋宿舍，酬谢 15 元', price: '15.00', campus: '东校区', status: '进行中', statusType: 'warning', tag: '跑腿', tagType: 'info', time: '2 小时前' },
  { id: 6, title: '尤尼克斯羽毛球拍 附球包三只装', price: '80.00', campus: '南校区', status: '在售', statusType: 'success', tag: '二手', tagType: 'primary', time: '3 小时前' },
  { id: 7, title: '周五下午拼车去高铁站，还差 2 人', price: '20.00', campus: '北校区', status: '进行中', statusType: 'warning', tag: '拼单', tagType: 'success', time: '4 小时前' },
  { id: 8, title: '西门打印店附近丢失黑色耳机盒', price: '', campus: '西校区', status: '待找回', statusType: 'danger', tag: '失物', tagType: 'warning', time: '5 小时前' },
]

const showEmpty = ref(false)
</script>

<template>
  <div class="market-list">
    <h2 class="page-title">集市列表</h2>

    <!-- 顶部搜索框 -->
    <el-input
      v-model="keyword"
      placeholder="搜索商品、失物、拼单、跑腿..."
      size="large"
      clearable
      class="search-box"
    >
      <template #prefix>
        <el-icon><Search /></el-icon>
      </template>
    </el-input>

    <!-- 筛选区 -->
    <div class="filter-bar">
      <div class="filter-group">
        <span class="filter-label">类型</span>
        <el-select v-model="typeFilter" placeholder="全部" size="default" style="width: 120px">
          <el-option label="全部" value="" />
          <el-option label="二手" value="secondhand" />
          <el-option label="失物" value="lost" />
          <el-option label="拼单" value="group" />
          <el-option label="跑腿" value="task" />
        </el-select>
      </div>
      <div class="filter-group">
        <span class="filter-label">校区</span>
        <el-select v-model="campusFilter" placeholder="全部校区" size="default" style="width: 120px">
          <el-option label="全部校区" value="" />
          <el-option label="东校区" value="east" />
          <el-option label="西校区" value="west" />
          <el-option label="南校区" value="south" />
          <el-option label="北校区" value="north" />
        </el-select>
      </div>
      <div class="filter-group">
        <span class="filter-label">状态</span>
        <el-select v-model="statusFilter" placeholder="全部状态" size="default" style="width: 120px">
          <el-option label="全部状态" value="" />
          <el-option label="在售" value="active" />
          <el-option label="进行中" value="ongoing" />
          <el-option label="已完成" value="done" />
        </el-select>
      </div>
      <div class="filter-group">
        <span class="filter-label">排序</span>
        <el-radio-group v-model="sortBy" size="default">
          <el-radio-button value="time">时间倒序</el-radio-button>
          <el-radio-button value="hot">热度</el-radio-button>
          <el-radio-button value="price">价格</el-radio-button>
        </el-radio-group>
      </div>
    </div>

    <!-- 信息卡片列表 -->
    <div v-if="!showEmpty" class="card-list">
      <div
        v-for="item in items"
        :key="item.id"
        class="card-item"
        @click="$router.push(`/item/${item.id}`)"
      >
        <div class="card-top">
          <el-tag :type="item.tagType" size="small" effect="plain">{{ item.tag }}</el-tag>
          <span class="card-status">
            <el-tag :type="item.statusType" size="small" effect="light" round>{{ item.status }}</el-tag>
          </span>
        </div>
        <h3 class="card-title">{{ item.title }}</h3>
        <div class="card-meta">
          <span v-if="item.price" class="card-price">¥{{ item.price }}</span>
          <span v-else class="card-price no-price">暂无标价</span>
          <span class="card-campus">📍 {{ item.campus }}</span>
          <span class="card-time">{{ item.time }}</span>
        </div>
      </div>
    </div>

    <!-- 空数据状态 -->
    <div v-else class="empty-state">
      <el-empty description="暂无相关集市信息">
        <el-button type="primary" @click="showEmpty = false">查看全部</el-button>
      </el-empty>
    </div>

    <!-- 切换展示（方便调试查看空状态） -->
    <div class="toggle-bar">
      <el-button size="small" text @click="showEmpty = !showEmpty">
        {{ showEmpty ? '显示列表' : '显示空状态' }}
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.market-list {
  max-width: 800px;
  margin: 0 auto;
}
.page-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
}

/* 搜索框 */
.search-box {
  margin-bottom: 16px;
}

/* 筛选栏 */
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  margin-bottom: 20px;
}
.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
}
.filter-label {
  font-size: 13px;
  color: #909399;
  white-space: nowrap;
}

/* 卡片列表 */
.card-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.card-item {
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  padding: 16px 20px;
  cursor: pointer;
  transition: all 0.2s;
}
.card-item:hover {
  border-color: #409eff;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.10);
  transform: translateY(-1px);
}
.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.card-title {
  margin: 0 0 10px;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.4;
  color: #303133;
}
.card-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 13px;
}
.card-price {
  color: #f56c6c;
  font-weight: 600;
  font-size: 16px;
}
.card-price::before {
  content: '¥';
}
.card-price.no-price {
  color: #909399;
  font-weight: 400;
  font-size: 13px;
}
.card-price.no-price::before {
  content: '';
}
.card-campus,
.card-time {
  color: #909399;
}

/* 空状态 */
.empty-state {
  padding: 60px 0;
}

/* 调试切换 */
.toggle-bar {
  text-align: center;
  margin-top: 20px;
  opacity: 0.5;
}
</style>
