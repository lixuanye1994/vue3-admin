import Axios from "axios"
import { ElMessage, ElLoading } from "element-plus"
import { showLoading,hideLoading } from "../utils/loading"

const baseURL = import.meta.env.VITE_BASIC_URL
const Myaxios = Axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json;chartset=UTF-8"
  },
  timeout: 20000, // 请求超时 20s
})


// 前置拦截器（发起请求之前的拦截）
Myaxios.interceptors.request.use(config => {
  console.log(baseURL)
  showLoading

  // 发送请求后 加载loading....转2秒
  // const Loading = ElLoading.service({
  //   lock: true,
  //   text: 'Loading',
  //   background: 'rgba(0, 0, 0, 0.7)',
  // })
  // setTimeout(() => {
  //   Loading.close()
  // }, 1000)
  // TODO list
  // 首次登陆可以无需操作任何事情
  // 登录之后需要操作token，在每次发送请求之前把本地token提取出来携带到请求中
  return config;
},
  (error) => {
    return Promise.reject(error);
  }
);

// 后置拦截器（获取到响应时的拦截）
Myaxios.interceptors.response.use(response => {
  hideLoading
  
  // 拦截返回的code如果不是===200,判定自定义报错信息
  const { code, msg } = response.data

  if (code != 200) {
    ElMessage.error(`Code: ${code}, Message: ${msg}`);
    console.error(`[服务器给咱反馈报错了]`, response);
  } else {
      // 读取code 为 200 成功的标签 显示
      // ElMessage.success(`Code: ${code}, Message: ${msg}`);
  }

  console.log(response.data)
  return response.data;

},
  (error) => {
    if (error.response && error.response.data) {
      const code = error.response.status;
      const msg = error.response.data.message;
      ElMessage.error(`Code: ${code}, Message: ${msg}`);
      console.error(`[网络好像连接失败了]`, error.response);
    } else {
      ElMessage.error(`${error}`);
    }
    return Promise.reject(error);
  }
);


export default Myaxios