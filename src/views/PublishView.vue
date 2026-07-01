<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { createTrade } from '@/api/trade'
import { createLostFound } from '@/api/lostFound'
import { createGroupBuy } from '@/api/groupBuy'
import { createErrand } from '@/api/errand'

const router = useRouter()
const user = useUserStore()

type PublishType = 'secondhand' | 'lost' | 'group' | 'task'

const publishType = ref<PublishType | null>(null)
const submitting = ref(false)

const typeOptions = [
  { value: 'secondhand' as const, icon: '🛍️', label: '二手商品', desc: '出售闲置教材、数码产品等' },
  { value: 'lost' as const, icon: '🔍', label: '失物招领', desc: '发布丢失或拾到的物品' },
  { value: 'group' as const, icon: '👥', label: '拼单搭子', desc: '找人一起拼单、拼车' },
  { value: 'task' as const, icon: '🏃', label: '跑腿委托', desc: '找人帮忙取快递、带饭' },
]

const formRef = ref<FormInstance>()

interface PublishForm {
  title: string
  campus: string
  location: string
  description: string
  tags: string[]
  price: number | null
  condition: string
  lostType: string
  eventTime: string
  features: string
  peopleCount: number | null
  deadline: string
  reward: number | null
  destination: string
  expectTime: string
}

const form = reactive<PublishForm>({
  title: '',
  campus: '',
  location: '',
  description: '',
  tags: [],
  price: null,
  condition: '',
  lostType: 'lost',
  eventTime: '',
  features: '',
  peopleCount: null,
  deadline: '',
  reward: null,
  destination: '',
  expectTime: '',
})

const rules: FormRules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  campus: [{ required: true, message: '请选择校区', trigger: 'change' }],
  location: [{ required: true, message: '请输入具体地点', trigger: 'blur' }],
  description: [{ required: true, message: '请输入详细描述', trigger: 'blur' }],
  price: [
    { required: true, message: '请输入价格', trigger: 'blur' },
    { type: 'number', min: 0.01, message: '价格必须大于 0', trigger: 'blur' },
  ],
  reward: [
    { required: true, message: '请输入酬劳', trigger: 'blur' },
    { type: 'number', min: 0.01, message: '酬劳必须大于 0', trigger: 'blur' },
  ],
  peopleCount: [
    { required: true, message: '请输入人数', trigger: 'blur' },
    { type: 'number', min: 1, message: '人数必须大于 0', trigger: 'blur' },
  ],
  deadline: [{ required: true, message: '请选择截止时间', trigger: 'change' }],
  features: [{ required: true, message: '请描述物品特征', trigger: 'blur' }],
  destination: [{ required: true, message: '请输入送达地点', trigger: 'blur' }],
  expectTime: [{ required: true, message: '请选择期望完成时间', trigger: 'change' }],
}

function selectType(type: PublishType) {
  publishType.value = type
  nextTick(() => formRef.value?.clearValidate())
}

function formatTime(d: unknown): string {
  if (!d) return ''
  if (typeof d === 'string') return d
  try {
    return new Date(d as string).toLocaleString('zh-CN', { hour12: false })
  } catch {
    return String(d)
  }
}

async function handleSubmit() {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return

  submitting.value = true
  const now = new Date().toLocaleString('zh-CN', { hour12: false })

  try {
    const t = publishType.value
    if (t === 'secondhand') {
      await createTrade({
        title: form.title,
        price: form.price ?? 0,
        category: '',
        condition: form.condition,
        publisher: user.name,
        college: user.college,
        avatar: user.avatar,
        campus: form.campus,
        location: form.location,
        image: '',
        publishedAt: now,
        status: 'open',
        tags: form.tags,
        description: form.description,
      })
    } else if (t === 'lost') {
      await createLostFound({
        type: form.lostType as 'lost' | 'found',
        title: form.title,
        itemName: form.features,
        location: form.location,
        occurredAt: formatTime(form.eventTime) || now,
        contact: '',
        publisher: user.name,
        college: user.college,
        avatar: user.avatar,
        image: '',
        publishedAt: now,
        status: 'open',
        description: form.description,
      })
    } else if (t === 'group') {
      await createGroupBuy({
        title: form.title,
        type: '',
        targetCount: form.peopleCount ?? 1,
        currentCount: 1,
        deadline: formatTime(form.deadline) || now,
        location: form.location,
        campus: form.campus,
        publisher: user.name,
        college: user.college,
        avatar: user.avatar,
        publishedAt: now,
        status: 'open',
        description: form.description,
      })
    } else if (t === 'task') {
      await createErrand({
        title: form.title,
        reward: form.reward ?? 0,
        pickupLocation: form.location,
        deliveryLocation: form.destination,
        deadline: formatTime(form.expectTime) || now,
        campus: form.campus,
        publisher: user.name,
        college: user.college,
        avatar: user.avatar,
        publishedAt: now,
        status: 'open',
        description: form.description,
      })
    }

    ElMessage.success('发布成功！')
    const routeMap: Record<PublishType, string> = {
      secondhand: '/trade',
      lost: '/lost-found',
      group: '/group-buy',
      task: '/errand',
    }
    router.push(routeMap[t!])
  } catch {
    ElMessage.error('发布失败，请检查 Mock 服务是否已启动')
  } finally {
    submitting.value = false
  }
}

function resetForm() {
  formRef.value?.resetFields()
}
</script>

<template>
  <div class="publish">
    <h2 class="page-title">发布信息</h2>

    <!-- 类型选择 -->
    <div v-if="!publishType" class="type-select">
      <p class="type-hint">请选择要发布的类型</p>
      <div class="type-grid">
        <div
          v-for="opt in typeOptions"
          :key="opt.value"
          class="type-card"
          @click="selectType(opt.value)"
        >
          <span class="type-icon">{{ opt.icon }}</span>
          <span class="type-label">{{ opt.label }}</span>
          <span class="type-desc">{{ opt.desc }}</span>
        </div>
      </div>
    </div>

    <!-- 发布表单 -->
    <div v-else class="form-wrapper">
      <div class="form-header">
        <el-button text @click="publishType = null">← 返回选择类型</el-button>
        <span class="form-type-label">{{ typeOptions.find(t => t.value === publishType)?.label }}发布</span>
      </div>

      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-position="top"
        size="large"
        class="publish-form"
        @submit.prevent="handleSubmit"
      >
        <!-- 通用字段 -->
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入信息标题" maxlength="50" show-word-limit />
        </el-form-item>

        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="校区" prop="campus">
              <el-select v-model="form.campus" placeholder="请选择校区" style="width: 100%">
                <el-option label="东校区" value="东校区" />
                <el-option label="西校区" value="西校区" />
                <el-option label="南校区" value="南校区" />
                <el-option label="北校区" value="北校区" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="具体地点" prop="location">
              <el-input v-model="form.location" placeholder="如：3 号宿舍楼下" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="详细描述" prop="description">
          <el-input
            v-model="form.description"
            type="textarea"
            :rows="4"
            placeholder="请详细描述信息内容，包括使用情况、交易方式等"
            maxlength="500"
            show-word-limit
          />
        </el-form-item>

        <el-form-item label="标签">
          <el-select v-model="form.tags" multiple placeholder="添加标签（可选）" style="width: 100%">
            <el-option label="可小刀" value="可小刀" />
            <el-option label="可换物" value="可换物" />
            <el-option label="全新" value="全新" />
            <el-option label="急需" value="急需" />
            <el-option label="仅限校内" value="仅限校内" />
          </el-select>
        </el-form-item>

        <el-divider />

        <!-- 动态专属字段 -->
        <h3 class="section-title">专属信息</h3>

        <!-- 二手商品 -->
        <template v-if="publishType === 'secondhand'">
          <el-row :gutter="16">
            <el-col :span="12">
              <el-form-item label="价格 (¥)" prop="price">
                <el-input-number v-model="form.price" :min="0.01" :precision="2" :step="10" style="width: 100%" placeholder="请输入价格" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="成色">
                <el-select v-model="form.condition" placeholder="请选择成色" style="width: 100%">
                  <el-option label="全新" value="全新" />
                  <el-option label="九五新" value="九五新" />
                  <el-option label="九成新" value="九成新" />
                  <el-option label="八成新" value="八成新" />
                  <el-option label="七成新及以下" value="七成新及以下" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </template>

        <!-- 失物招领 -->
        <template v-if="publishType === 'lost'">
          <el-form-item label="类型">
            <el-radio-group v-model="form.lostType">
              <el-radio value="lost">我丢东西了</el-radio>
              <el-radio value="found">我捡到东西了</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-row :gutter="16">
            <el-col :span="12">
              <el-form-item label="发生时间" prop="eventTime">
                <el-date-picker v-model="form.eventTime" type="datetime" placeholder="选择时间" style="width: 100%" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="物品特征" prop="features">
                <el-input v-model="form.features" placeholder="颜色、品牌、标记等" />
              </el-form-item>
            </el-col>
          </el-row>
        </template>

        <!-- 拼单搭子 -->
        <template v-if="publishType === 'group'">
          <el-row :gutter="16">
            <el-col :span="12">
              <el-form-item label="需要人数" prop="peopleCount">
                <el-input-number v-model="form.peopleCount" :min="1" :max="50" style="width: 100%" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="截止时间" prop="deadline">
                <el-date-picker v-model="form.deadline" type="datetime" placeholder="选择截止时间" style="width: 100%" />
              </el-form-item>
            </el-col>
          </el-row>
        </template>

        <!-- 跑腿委托 -->
        <template v-if="publishType === 'task'">
          <el-row :gutter="16">
            <el-col :span="12">
              <el-form-item label="酬劳 (¥)" prop="reward">
                <el-input-number v-model="form.reward" :min="0.01" :precision="2" :step="5" style="width: 100%" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="送达地点" prop="destination">
                <el-input v-model="form.destination" placeholder="如：6 栋宿舍 302" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="期望完成时间" prop="expectTime">
            <el-date-picker v-model="form.expectTime" type="datetime" placeholder="选择期望完成时间" style="width: 100%" />
          </el-form-item>
        </template>

        <el-divider />

        <!-- 提交 -->
        <div class="form-actions">
          <el-button type="primary" size="large" native-type="submit" :loading="submitting">提交发布</el-button>
          <el-button size="large" @click="resetForm" :disabled="submitting">重置</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.publish {
  max-width: 720px;
  margin: 0 auto;
}
.page-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
}

/* 类型选择 */
.type-select {
  text-align: center;
}
.type-hint {
  color: #909399;
  margin-bottom: 24px;
  font-size: 15px;
}
.type-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
.type-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 20px;
  background: #fff;
  border: 2px solid #ebeef5;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.25s;
}
.type-card:hover {
  border-color: #409eff;
  box-shadow: 0 8px 24px rgba(64, 158, 255, 0.15);
  transform: translateY(-3px);
}
.type-icon {
  font-size: 40px;
  margin-bottom: 8px;
}
.type-label {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}
.type-desc {
  font-size: 13px;
  color: #909399;
  margin-top: 4px;
}

/* 表单 */
.form-wrapper {
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  padding: 24px;
}
.form-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #ebeef5;
}
.form-type-label {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}
.publish-form {
  max-width: 640px;
}
.section-title {
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 16px;
  color: #303133;
}
.form-actions {
  display: flex;
  gap: 12px;
}
</style>
