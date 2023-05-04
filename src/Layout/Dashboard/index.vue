<script setup lang='ts'>
import { reactive, toRefs } from 'vue'
import { gethotList } from '../../api/article/article'


// 定义变量组state,tableData只为其中一个参数
//tableData接收类型为对象{}和数组[]
const state = reactive<{ tableData: {}[] }>({
    tableData: []
})
// toRefs vue延续响应式写法, 把tableData从上面的类型参数变成实体
const { tableData } = toRefs(state);

// 获取文章列表
const getlist = () =>{
gethotList().then(r => {
    if(r.code === 200){
        tableData.value = r.data
    }
})
}

</script>
<template>
    hello,dashboards
    <el-button @click="getlist">文章列表</el-button>

    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="id" width="180" />
        <el-table-column prop="title" label="title" width="180" />
        <el-table-column prop="viewCount" label="viewCount" />
    </el-table>
</template>
<style lang='scss' scoped></style>