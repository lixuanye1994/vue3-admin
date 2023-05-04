import { PromiseRes,http } from '../request'
import { hotList } from './type'


// 获取热门文章列表，空参可以直接获取
export const gethotList = () => http.get('/article/hotList')
