import { createRouter,createWebHistory,RouteRecordRaw } from 'vue-router'
import Layout from '../Layout/index.vue'

// 路由列表
const routes:Array<RouteRecordRaw> = [
    // 首页路由，直接跳转到dashboard
    {
        path: '/',
        name: 'home',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path:'/dashboard',
                component: () => import('../Layout/Dashboard/index.vue'),
                name: 'dashboard',
                meta: {
                    title: "首页",
                    icon: "HomeFilled"
                }
            }
        ]
    },

    // 登录页面路由
    {
        path: '/login',
        name: 'login',
        component: () => import('../components/Login.vue'),

    },

    // 系统管理页面路由
    {
        path: '/system',
        name: 'system',
        component: Layout,
        meta:{
            title: "系统管理",
            icon: "Tools",
            roles:["sys:manage"],
            parentId:0,
        },
        children: [
            {
                path:'/department',
                component: () => import('../Layout/System/department/department.vue'),
                name: 'department',
                meta: {
                    title: "部门管理",
                    icon: "OfficeBuilding",
                    roles:["sys:dept"],
                },
            },
            {
                path:'/userlevel',
                component: () => import('../Layout/System/user/userlevel.vue'),
                name: 'userlevel',
                meta: {
                    title: "权限管理",
                    icon: "Tools",
                    roles:["sys:level"],
                },
            },
        ]
    },
    // 检查模块界面
    {
        path: '/check',
        name: 'check',
        component: Layout,
        children: [
            {
                path:'/check',
                component: () => import('../Layout/Check/Check.vue'),
                name: 'check',
                meta: {
                    title: "VPN检查",
                    icon: "DocumentChecked"
                }
            }
        ]
    },
    // 白名单添加删除
    {
        path: '/whitelist',
        name: 'whitelist',
        component: Layout,
        children: [
            {
                path:'/whitelist',
                component: () => import('../Layout/whitelist/index.vue'),
                name: 'whitelist',
                meta: {
                    title: "白名单",
                    icon: "Key"
                }
            }
        ]
    }
]

// 创建路由
const router = createRouter({
    history:createWebHistory(),
    routes
})

// 暴露属性
export default router