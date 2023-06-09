import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// 引入 ElementPlus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')
  console.log("当前是"+env.NODE_ENV+"环境，当前环境服务器地址："+env.VITE_BASIC_URL)
  return {
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
          // 配置跨域的服务器ip 使用vite环境变量控制
          target: env.VITE_BASIC_URL,
  
          changeOrigin:true,
        }
      }
    }
  }
})


// // https://vitejs.dev/config/
// export default defineConfig({

  // plugins: [
  //   vue(),

  //   //ElementPlus按需导入
  //   AutoImport({
  //     resolvers: [ElementPlusResolver()],
  //   }),
  //   Components({
  //     resolvers: [ElementPlusResolver()],
  //   }),
  // ],
  
  // //配置server基础自定义设置
  // server:{
  //   host: '0.0.0.0',
  //   port: 3000,
  //   open: true,
  //   // 配置跨域  
  //   proxy:{
  //     '/api':{
  //       // 配置跨域的服务器ip 使用vite环境变量控制
  //       target:'http://localhost:8080',

  //       changeOrigin:true,
  //     }
  //   }
  // }
// })
