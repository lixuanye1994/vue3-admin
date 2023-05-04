vue3+ts+vite



课程地址：https://www.bilibili.com/video/BV1SP4y187r2

一.新建工程

npm init vite@latest  --使用vite构建

npm inti vue@latest --使用vue构建



二.安装vue-router

1.npm install vue-router@4

2.src新建目录router，新建index.ts

~~~typescript
import { createRouter,createWebHistory,RouteRecordRaw } from 'vue-router'
import Layout from '../components/HelloWorld.vue'

//路由列表
const routes:Array<RouteRecordRaw> = [
    {
        path:'/',
        name:'home',
        component:Layout
    }
]

//创建路由
const router = createRouter({
    history:createWebHistory(),
    routes
})

//暴露属性
export default router
~~~

3.在main.ts中使用路由

~~~typescript
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
//新增路由
import router from './router'

//新增.use(router)
createApp(App).use(router).mount('#app')
~~~

三.安装vuex “全局模式保存变量等”

1.安装

```typescript
npm install vuex@next --save
```

2.src下新建目录store，新建index.ts

~~~typescript
// store.ts
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface State {
  count: number
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    count: 0
  }
})

// 定义自己的 `useStore` 组合式函数
export function useStore () {
  return baseUseStore(key)
}
~~~

3.main.ts使用vuex

~~~typescript
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 新增路由
import router from './router'
// 新增vuex
import { store,key } from './store'

// 新增.use(router)
createApp(App).use(router).use(store,key).mount('#app')
~~~

4.题外话：tsconfig.json 里配置

~~~typescript
 // ts排除文件node_modules
 "exclude": ["node_modules"]
~~~

四.安装ESlint 代码检查工具

~~~typescript
npm install -save-dev eslint eslint-plugin-vue
~~~

五.安装sass

~~~ty
npm install -D sass sass-loader
~~~

