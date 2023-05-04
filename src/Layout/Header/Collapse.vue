<script setup lang='ts'>
import { ref,computed } from 'vue'
import { Expand, Fold } from "@element-plus/icons-vue"
import { useStore } from '../../store';

const store = useStore()
const status = computed(()=>{
    return store.getters['getCollapse']
}) 

const change = ()=>{
    store.commit('setCollapse',!status.value)
}


</script>
<template>
    <el-icon @click="change" class="fa-icons">
        <component class="icons" :is="status ? Expand : Fold"/>
    </el-icon>
    
</template>
<style lang='scss' scoped>

.fa-icons{
    display: flex;
    align-items: center;
    font-size: 25px;
    cursor: pointer;
    margin-right: 15px;
}
</style>