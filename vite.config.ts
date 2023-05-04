import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 引入 ElementPlus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    //ElementPlus按需导入
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  
  //配置server基础自定义设置
  server:{
    host: '0.0.0.0',
    port: 3000,
    open: true,
    // 配置跨域  
    proxy:{
      '/api':{
        target:"http://localhost:7777",
        changeOrigin:true,
      }
    }
  }
})
