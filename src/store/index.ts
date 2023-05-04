// 官方模板
// store.ts
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { Tabs } from './tabs'

// 定义接口
export interface myState {
  count: number,
  collapse: boolean,
  tabList:Array<Tabs>,
}

// 定义key,key里面固定写法InjectionKey<接口名字>
export const key: InjectionKey<Store<myState>> = Symbol()

// 创建实例，此处的数据暴露给main.ts
export const store = createStore<myState>({
    // vuex 核心概念-state：数据源头data
  state: {
    count: 100,
    collapse:false,
    tabList:[
      // 标签选项卡默认放首页在数组里
      {path: '/dashboard', title: '首页'}],
  },
    // vuex 核心概念-mutations：事务提交，使用commit触发Mutation操作变更数据源
  mutations:{
    setCount(state:myState,count:number){
        state.count = count;
    },
    // 设置collapse
    setCollapse:(state:myState,collapse:boolean)=>{
       state.collapse = collapse;
    },
    // 设置标签页面
    addTabs:(state:myState,tab:Tabs)=>{
      // 判断是否存在标签页，不存在则放入菜单数组
      if(state.tabList.some(item => item.path === tab.path))return;
      state.tabList.push(tab)
    },
    reTabs:(state:myState,tabList)=>{
      state.tabList = tabList
    }
  },
    // vuex 核心概念-getters：加工数据形成新的数据，返回的时mutations中变更的结果
  getters:{
    getCount(state:myState){
        return state.count;
    },
    getCollapse:(state:myState)=>{
        return state.collapse;
    },
    getTabList:(state:myState)=>{
      return state.tabList;
    },
  }
})

// 定义自己的 useStore 组合式函数，外部使用时直接import { useStore } from '../store'
export function useStore () {
  return baseUseStore(key)
}