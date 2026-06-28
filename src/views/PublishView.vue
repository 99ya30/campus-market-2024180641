<script setup lang="ts"></script>

<template>
  <section>
    <h2>发布商品</h2>
    <form class="form">
      <div class="field">
        <label>商品名称</label>
        <input type="text" placeholder="请输入商品名称" />
      </div>
      <div class="field">
        <label>商品价格</label>
        <input type="number" placeholder="请输入价格" />
      </div>
      <div class="field">
        <label>商品描述</label>
        <textarea placeholder="请描述您的商品"></textarea>
      </div>
      <button type="button" class="submit">发布</button>
    </form>
  </section>
</template>

<style scoped>
.form {
  max-width: 480px;
  margin-top: 16px;
}
.field {
  margin-bottom: 16px;
}
.field label {
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
}
.field input,
.field textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}
.field textarea {
  height: 100px;
  resize: vertical;
}
.submit {
  padding: 10px 24px;
  background: #409eff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}
.submit:hover {
  background: #66b1ff;
}
</style>
