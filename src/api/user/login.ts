import { http } from '../../api/request'
import type { LoginData, LoginRes, UserInfoRes } from './type'


/**
 * 登录
 */
export const LoginApi = async (data: LoginData):Promise<LoginRes> => http.post('/login', data)

/**
 * 获取登录用户信息
 */
export const getUserInfo = () => {
  return http.get<UserInfoRes>('/user/userInfo')
}