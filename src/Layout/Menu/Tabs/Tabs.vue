<script setup lang='ts'>

import { ref,computed,watch,onMounted } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import { store } from '../../../store';
import { Tabs } from '../../../store/tabs';


// 引入路由，vuex定义的选项卡全局属性
const route = useRoute()
const router = useRouter()
const tabList = computed(()=>{
    return store.getters['getTabList']
})

// 当前激活的路由地址赋值给当前激活的选项卡
const activeTab = ref('')
const setActiveTab = ()=>{
    activeTab.value = route.path
}

const addTab = ()=>{
    // 点击菜单路由访问页面时添加选项卡
    const {path,meta} = route
        // 通过Vuex全局属性
    const tab:Tabs = {
            path:path,
            title:meta.title as string,
    }
    // 从当前的路由中获取path 和title
    store.commit('addTabs',tab)
}

// 点击选项卡跳转路由
const clickBtn = (tab:any) =>{

    //console.log(tab)
    //控制台查看tab里面的字典属性为 props
    const {props} = tab
    //console.log(props)
    //用router.push跳转路由props.name是路径
    router.push({path:props.name})
}

// 手动删除选项卡
const removeTab = (targetName: string) => {
    if(targetName === '/dashboard'){
        return
    }  
    // 选项卡数据列表
    const tabs = tabList.value
    // 当前激活的选项卡
    let activeName = activeTab.value
    if (activeName === targetName) {
    tabs.forEach((tab:Tabs, index:number) => {
      if (tab.path === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.path
        }
      }
    })
  }
  // 重新设置当前激活的选项卡
  activeTab.value = activeName
  // 重新设置选项卡全局属性里的数组内容
  store.commit('reTabs',tabs.filter((tab:Tabs) => tab.path !== targetName))
  //store.state.tabList = tabs.filter((tab:Tabs) => tab.path !== targetName)
  // 删除后跳转路由
  router.push({path:activeName})
}


// 监听路径变化,把变化后的路由再赋值给选项卡
watch(()=>route.path,()=>{
    setActiveTab();
    addTab();
})


// 解决刷新后数据丢失
const refreshTab = ()=>{
  window.addEventListener('beforeunload',()=>{
      sessionStorage.setItem("tabsView",JSON.stringify(tabList.value))
  })
  let tabSesson = sessionStorage.getItem("tabsView")
  if(tabSesson){
    let oldTabs = JSON.parse(tabSesson)
    if(oldTabs.length > 0){
      // reTabs功能 重置菜单
      store.commit('reTabs',oldTabs)
      //store.state.tabList = oldTabs
    }
  }
}

// 生命周期函数
onMounted(()=>{
    setActiveTab(); 
    addTab();
    refreshTab();
})


</script>
<template>
    <el-tabs
    v-model="activeTab"
    @tab-click="clickBtn"
    type="card"
    class="demo-tabs"
    closable
    @tab-remove="removeTab"
    >
    <el-tab-pane
      v-for="item in tabList"
      :key="item.path"
      :label="item.title"
      :name="item.path"
    >
      {{ item.content }}
    </el-tab-pane>
  </el-tabs>
</template>
<style lang='scss' scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>