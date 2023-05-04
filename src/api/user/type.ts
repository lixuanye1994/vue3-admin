
/* 登录接口参数接口定义 */
export interface LoginData {
    username: string,
    password: string,
}

/* 登录接口返回值类型 */
export interface LoginRes {
    code:number,
    data:{
        token:string
    }
    message:string
}

/* 用户信息接口返回值类型 */
export interface UserInfoRes {
    // 暂空
}