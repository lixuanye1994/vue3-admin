<script setup lang="ts">
import { LoginApi } from '../api/user/login';
import router from '../router'
import { ElMessage } from "element-plus"


// 具体业务逻辑在实现中编写
const logintest = () => {
  LoginApi({
    username:'sg',
    password:'1234',
  }).then((r) => {
    if (r.code === 200) {
      router.push('/')
      ElMessage.success(`Code: ${r.code}, Message: 登录成功`);
    }
  })
}


</script>

<template>
  <el-button type="default" @click="logintest">登录</el-button>
</template>

<style scoped></style>
