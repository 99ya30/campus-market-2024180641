<template>
  <el-form-item :label="label" :prop="prop" :required="required">
    <slot />
    <template #error v-if="error">
      <span class="form-field-error">{{ error }}</span>
    </template>
  </el-form-item>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  prop?: string
  required?: boolean
  error?: string
}>()
</script>

<style scoped>
.form-field-error {
  color: #f56c6c;
  font-size: 12px;
}
</style>
