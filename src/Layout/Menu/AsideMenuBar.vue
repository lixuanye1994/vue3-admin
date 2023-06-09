<script setup lang="ts">
import { reactive,computed } from 'vue'
import { useRoute } from 'vue-router'
import MenuItem from './MenuItem.vue'
import { useStore } from '../../store'
import MenuLogo from './MenuLogo.vue'

const store = useStore()
const isCollapse = computed(()=>{
    return store.getters['getCollapse']

}) 
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

/*
 * 刷新页面菜单聚焦任然在当前打开路径
 * useRoute() 获取当前路由
 * computed( 监听route中的path路径属性 ) 返回path
 * 
 */
const route = useRoute();
const activeIdex= computed(()=>{
    const {path} = route;
    return path;
})
let menuList= reactive([
    {
        path:'/dashboard',
        component:'Layout',
        meta:{
            title:"首页",
            icon:"HomeFilled",
            roles:["home:home"]
        },
        children:[]
    },
    {
        path:'/system',
        component:'Layout',
        alwaysShow:true,
        meta:{
            title:"系统管理",
            icon:"Grid",
            roles:["sys:manage"],
            parentId:0,
        },
        children:[
            {
                path:'/department',
                component:'/system/department/department',
                alwaysShow:false,
                meta:{
                    title:"部门管理",
                    icon:"OfficeBuilding",
                    roles:["sys:dept"],
                    parentId:11,
                }
            },
            {
                path:'/userlevel',
                component:'/system/user/userlevel',
                alwaysShow:false,
                meta:{
                    title:"权限管理",
                    icon:"Tools",
                    roles:["sys:level"],
                    parentId:12,
                }
            },
        ]
    },
    {
        path:'/check',
        component:'Layout',
        meta:{
            title:"VPN检查",
            icon:"DocumentChecked",
            roles:["che:check"],
            parentId:0,
        }
    },
    {
        path:'/whitelist',
        component:'Layout',
        meta:{
            title:"白名单",
            icon:"Key",
            roles:["che:whitelist"],
            parentId:0,
        }
    }
]);

</script>

<template>
    <el-menu
      :default-active="activeIdex"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
      router
      active-text-color="#ffd04b"
      background-color="#545c64"
      text-color="#fff"
    >
    <MenuLogo></MenuLogo>
    <MenuItem :menuList="menuList"></MenuItem>
    </el-menu>
</template>

<style lang="scss" scoped>

.el-menu{
    border-right: none;
    height: 100%;

}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}


</style>
