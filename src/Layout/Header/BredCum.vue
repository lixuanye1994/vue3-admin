<script setup lang='ts'>
import { ref,Ref,watch  } from 'vue'
import { RouteLocationMatched, useRoute } from 'vue-router'

// 定义面包屑导航数据
const tabs :Ref<RouteLocationMatched[]> = ref([])
// 获取当前路由
const route = useRoute()
const getBredcurm = ()=>{
  // 获取所有meta和title
  let mached = route.matched.filter(item => item.meta && item.meta.title)
  // 判断第一个节点是不是首页，如果不是构建首页
  // 首页和其他主菜单为同级关系
  const first = mached[0];
  if(first.path !== '/dashboard'){
        mached = [{
          path: '/dashboard',
          meta:{
            title:'首页'
          }
        } as any].concat(mached);
  }
  tabs.value = mached;
}
getBredcurm();
watch(()=>route.path,()=>getBredcurm());

</script>

<template> 
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="item in tabs" :to="{ path: item.path }">{{ item.meta.title }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>
  


<style lang='scss' scoped>

</style>