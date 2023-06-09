<template>
  <el-dialog :before-close="close" :model-value="props.dialogFormVisible" title="白名单操作">
    <el-form :model="ruleForm" label-width="120px" class="demo-ruleForm" :size="formSize"
      status-icon style="max-width: 460px">
      <el-form-item label="唯一ID" prop="id">
        <el-input v-model="newForm.id" disabled />
      </el-form-item>
      <el-form-item label="特征码" prop="hashId">
        <el-input v-model="newForm.hashId" />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="newForm.name" />
      </el-form-item>
      <el-form-item label="工号" prop="employeeId">
        <el-input v-model="newForm.employeeId" />
      </el-form-item>
      <el-form-item label="开通理由" prop="reason">
        <el-input v-model="newForm.reason" />
      </el-form-item>
      <el-form-item label="计算机名" prop="computerName">
        <el-input v-model="newForm.computerName" />
      </el-form-item>

      <el-form-item label="白名单类型" prop="type">
        <el-select v-model="newForm.type" placeholder="请选择类型">
          <el-option label="非公司设备白名单" value="checkDevice" />
          <el-option label="单人多设备白名单" value="checkRepeat" />
          <el-option label="非公司员工白名单" value="checkEmployees" />
        </el-select>
      </el-form-item>
      <el-form-item label="上传时间" required>
        <el-col :span="11">
          <el-form-item prop="updateTime">
            <el-date-picker v-model="newForm.updateTime" type="datetime" label="当前时间" placeholder="当前时间" disabled />
          </el-form-item>
        </el-col>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="success" @click="submitForm">创建/修改</el-button>
        <el-button type="primary" @click="close">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>
  
<script lang="ts" setup>
import { reactive, ref, toRefs, watch } from 'vue'
import { rData } from "../../api/whitelist/type"
import { createWhite, editWhite } from "../../api/whitelist/whitelist"
import { ElMessage } from "element-plus"
// 从父组件传递数据过来使用defineProps()
const props = defineProps<{
  // 父组件默认显示未
  dialogFormVisible: boolean
  ruleForm: rData
}>();


// defineEmits()传参数给父组件
const emit = defineEmits<{
  (event: 'close',r?:'reload'): void
}>()
const close = (r?:'reload') => {
  emit('close',r)
}

const formSize = ref('default')

const state = reactive<{
  newForm: rData
}>({
  newForm: {}
})

// toRefs vue延续响应式写法, state从上面的类型参数变成实体
const { newForm } = toRefs(state);

watch(() => props.ruleForm, () => {
  newForm.value = { ...props.ruleForm }
})


const submitForm = ()=>{
  if(newForm.value.id){
    editWhite(newForm.value.id, newForm.value).then(res => {
        if (res.code === 200) {
          ElMessage({
            showClose: true,
            message: '修改成功',
            type: 'success',
          })
          close('reload')
        }
      })
  }else{
    createWhite(newForm.value).then(res => {
        if (res.code === 200) {
          ElMessage({
            showClose: true,
            message: '创建成功',
            type: 'success',
          })
          close('reload')
        }
      })
  }
}

</script>
    