<template>

  <el-upload
  drag
  action="http://localhost:8080/upload"
  :on-success="handleSuccess"
  >
  <el-icon class="el-icon--upload"><upload-filled /></el-icon>
  <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
  </div>
  <template #tip>
      <div class="el-upload__tip">
          请直接上传.dat的VPN账户数据文件，花名册文件可以是.xlsx或.csv
      </div>
  </template>
  </el-upload>

</template>
  
<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
const actionUrl=import.meta.env.VITE_BASE_URL+"/upload"
const handleSuccess = (response: any, file: any) => {
  // 处理上传成功后的逻辑
  ElMessage({
    showClose: true,
    message: '文件上传成功.',
    type: 'success',
  })
};
</script>

<style>

</style>