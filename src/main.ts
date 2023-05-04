import { createApp } from 'vue'
import App from './App.vue'
// 新增路由
import router from './router'
// 新增vuex
import { store,key } from './store'
// 新增elementPlus 图标和 css
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
const app = createApp(App)
// 新增.use(router)
app.use(router).use(store,key).mount('#app')

// 新增使用elementPlus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}