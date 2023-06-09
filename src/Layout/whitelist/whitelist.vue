<script setup lang='ts'>
import { reactive, toRefs } from 'vue'
import { ElMessage } from "element-plus"

import { selectAll } from "../../api/whitelist/whitelist"
import whitelistedit from './whitelistedit.vue'
import { rData } from "../../api/whitelist/type"
import { deleteWhite } from "../../api/whitelist/whitelist"

// 格式化时间
const nowtime = (time:any):string =>{ 
    const date = new Date(time);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hour = ('0' + date.getHours()).slice(-2);
    const minute = ('0' + date.getMinutes()).slice(-2);
    const second = ('0' + date.getSeconds()).slice(-2);
    return (
      // 例： 2023-06-01 11:00:00
      year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
    )
  }
  //获取到当前时间戳
const now:any = new Date().getTime(); 


// 定义变量组state,tableData只为其中一个参数
//tableData接收类型为对象{}和数组[]
const state = reactive<{
  tableData: {}[],
  dialogFormVisible: boolean,
  rowData: rData
}>({
  tableData: [],
  dialogFormVisible: false,
  rowData: {}
})
// toRefs vue延续响应式写法, 把tableData从上面的类型参数变成实体
const { tableData, rowData, dialogFormVisible } = toRefs(state);

// 获取检查结果返回内容
const getlist = () => {
  selectAll().then(r => {
    if (r.code === 200) {
      tableData.value = r.data
    }
  })
}

const editwhitelist = (row: {}) => {
  dialogFormVisible.value = true
  if(!rowData.value.id){
    rowData.value={
      updateTime:nowtime(now)
    }
    console.log(nowtime(now))
  }else{
    rowData.value = row
  }
}

const deletewhitelist = (row: {}) => {
  rowData.value = row
  deleteWhite(rowData.value.id).then(res => {
    if (res.code === 200) {
          ElMessage({
            showClose: true,
            message: '修改成功',
            type: 'success',
          })
          getlist()
        }
      })
}
  



// 子组件要关闭弹框时传提示过来
const dialogFormVisibleClose = (r?:'reload') => {
  dialogFormVisible.value = false
  rowData.value = {}
  if(r==='reload'){
    getlist()
  }
}


getlist()

</script>
<template>
  <el-button type="primary" @click="editwhitelist">新建白名单</el-button>
  <whitelistedit :dialogFormVisible="dialogFormVisible" @close="dialogFormVisibleClose" :ruleForm="rowData">
  </whitelistedit>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="唯一ID" width="80" />
    <el-table-column prop="hashId" label="硬件特征码" width="340" />
    <el-table-column prop="name" label="姓名" width="80" />
    <el-table-column prop="employeeId" label="工号" width="90" />
    <el-table-column prop="computerName" label="电脑名称" width="180" />
    <el-table-column prop="reason" label="开通理由" width="200" />
    <el-table-column prop="type" label="白名单类型" width="180" />
    <el-table-column prop="updateTime" label="白名单上传时间" />
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button type="primary" @click="editwhitelist(row)">编辑</el-button>
        <el-button type="danger" @click="deletewhitelist(row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<style lang='scss' scoped>
.card {
  margin-bottom: 15px;
}

.excel {
  width: 15PX;
  height: 15PX;
  margin-right: 5px;
}
</style>