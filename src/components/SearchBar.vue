<template>
  <div class="search-bar">
    <el-input
      :model-value="modelValue"
      :placeholder="placeholder"
      clearable
      prefix-icon="Search"
      @input="$emit('update:modelValue', $event)"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue: string; placeholder?: string }>()
defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<style scoped>
.search-bar { margin-bottom: 16px; }
</style>
