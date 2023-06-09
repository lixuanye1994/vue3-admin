<script setup lang='ts'>
import { reactive, toRefs } from 'vue'
import { ElMessage } from "element-plus"
import { getdownload,get_check_employees,get_check_device,get_check_repeat } from '../../api/check/check'
import upload from '../../components/upload.vue';


// 定义变量组state,tableData只为其中一个参数
//tableData接收类型为对象{}和数组[]
const state = reactive<{ tableData: {}[] }>({
    tableData: []
})
// toRefs vue延续响应式写法, 把tableData从上面的类型参数变成实体
const { tableData } = toRefs(state);

// 获取检查结果返回内容
const getlist = () =>{
    get_check_employees().then(r => {
    if(r.code === 200){
        tableData.value = r.data
    }
})
}

const getlist2 = () =>{
    get_check_device().then(r => {
    if(r.code === 200){
        tableData.value = r.data
    }
})
}

const getlist3 = () =>{
    get_check_repeat().then(r => {
    if(r.code === 200){
        tableData.value = r.data
    }
})
}

// 下载
const exceldownload = () =>{
    getdownload().then(r => {
    if(r.code === 200){
       const url = r.data
       ElMessage({
            showClose: true,
            message: '文件解析完成,正在下载',
            type: 'success',
        })
       window.location.href = url
    }
})
} 

</script>
<template>
    <el-card class="card" shadow="always"><upload></upload></el-card>
    
    <el-card shadow="always">
        <el-button @click="getlist">分析非公司人员信息</el-button>
        <el-button @click="getlist3">分析一人多设备信息</el-button>
        <el-button @click="getlist2">分析非公司设备</el-button>
        <el-button @click="exceldownload" type="primary"><img class="excel" src="Excel.png"/>下载Excel文件</el-button>

        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="employeeId" label="工号" width="180" />
            <el-table-column prop="hashId" label="硬件特征码"  />
            <el-table-column prop="macAddress" label="MAC地址" width="180"/>
            <el-table-column prop="computerName" label="电脑名称" width="180"/>
            <el-table-column prop="name" label="姓名" width="90"/>
            <el-table-column prop="reason" label="开通理由" width="240"/>
            <el-table-column prop="updateTime" label="白名单上传时间"/>
            
        </el-table>
    </el-card>
</template>
<style lang='scss' scoped>
.card{
  margin-bottom: 15px;
}
.excel{
    width: 15PX;
    height: 15PX;
    margin-right: 5px;
}
</style>