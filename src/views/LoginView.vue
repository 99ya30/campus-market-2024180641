<script setup lang="ts"></script>

<template>
  <section>
    <h2>登录</h2>
    <form class="form">
      <div class="field">
        <label>账号</label>
        <input type="text" placeholder="请输入学号/邮箱" />
      </div>
      <div class="field">
        <label>密码</label>
        <input type="password" placeholder="请输入密码" />
      </div>
      <button type="button" class="submit">登录</button>
    </form>
    <p class="tip">
      还没有账号？<router-link to="/register">立即注册</router-link>
    </p>
  </section>
</template>

<style scoped>
.form {
  max-width: 360px;
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
.field input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}
.submit {
  width: 100%;
  padding: 10px;
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
.tip {
  margin-top: 16px;
  text-align: center;
  color: #666;
}
.tip a {
  color: #409eff;
  text-decoration: none;
}
</style>
