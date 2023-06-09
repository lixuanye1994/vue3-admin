import { PromiseRes,http } from '../request'


// 获取匹配的非公司员工信息
export const get_check_employees = () => http.get('/check_employees')

// 获取匹配的非公司员工信息
export const get_check_device = () => http.get('/check_device')

// 获取匹配的非公司员工信息
export const get_check_repeat = () => http.get('/check_repeat')

export const getdownload= () =>http.get('/download')