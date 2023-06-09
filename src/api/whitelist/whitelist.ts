import { PromiseRes,http } from '../request'
import { rData } from "./type"


// 查询白名单
export const selectAll = () => http.get('/whitelist/selectAll')


// 编辑白名单
export const editWhite = (id:number,data:rData) => http.post('/whitelist/update/'+id,data)

// 新建白名单
export const createWhite = (data:rData) => http.post('/whitelist/insert',data)

// 删除白名单
export const deleteWhite = (data:any) => http.post('/whitelist/delete',data)