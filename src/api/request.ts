import service from './service'
import type { InternalAxiosRequestConfig } from 'axios'
 
// 服务器返回数据的格式
interface Result<T = {}> {
    code: number,
    message: string,
    data: T
  }

// 自定义返回类型
export type PromiseRes<T> = Promise<Result<T>>


// 封装请求方法
export const http = {
    get<T=any>(url: string, config?: InternalAxiosRequestConfig) : PromiseRes<T> {
      return service.get(url, config)
    },
   
    post<T=any>(url: string, data?: object, config?: InternalAxiosRequestConfig) :PromiseRes<T> {
      return service.post(url, data, config)
    },
   
    put<T=any>(url: string, data?: object, config?: InternalAxiosRequestConfig) :PromiseRes<T> {
      return service.put(url, data, config)
    },
   
    delete<T=any>(url: string, config?: InternalAxiosRequestConfig) : PromiseRes<T> {
      return service.delete(url, config)
    }
  }