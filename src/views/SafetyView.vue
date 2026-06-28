<script setup lang="ts">
const tips = [
  { icon: '🔒', title: '保护个人信息', desc: '不要向陌生人透露学生证号、银行卡密码等敏感信息。' },
  { icon: '📍', title: '选择公共场所交易', desc: '建议在食堂、图书馆、教学楼大厅等校内公共场所当面交易。' },
  { icon: '💰', title: '警惕预付定金', desc: '对要求提前支付定金、押金的行为保持警惕，谨防诈骗。' },
  { icon: '📱', title: '保留聊天记录', desc: '所有交易沟通尽量在平台内进行，保留完整的聊天记录。' },
  { icon: '🚫', title: '拒绝违禁品', desc: '严禁交易违禁品、假冒伪劣商品，一经发现将封号处理。' },
  { icon: '🆘', title: '遇到问题及时举报', desc: '如遇诈骗、骚扰等行为，请立即联系管理员或向平台举报。' },
]
</script>

<template>
  <section>
    <h2>安全提醒</h2>
    <p class="desc">保障你的交易安全，让校园交易更放心</p>
    <div class="tip-grid">
      <div v-for="tip in tips" :key="tip.title" class="tip-card">
        <span class="tip-icon">{{ tip.icon }}</span>
        <h3>{{ tip.title }}</h3>
        <p>{{ tip.desc }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.desc { color: #909399; margin-bottom: 20px; }
.tip-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.tip-card { background: #fff; border: 1px solid #ebeef5; border-radius: 8px; padding: 24px; transition: box-shadow 0.2s; }
.tip-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
.tip-icon { font-size: 32px; display: block; margin-bottom: 8px; }
.tip-card h3 { margin: 0 0 6px; font-size: 16px; }
.tip-card p { margin: 0; font-size: 13px; color: #606266; line-height: 1.6; }
</style>
