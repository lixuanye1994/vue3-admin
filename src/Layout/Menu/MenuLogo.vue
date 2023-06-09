<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '../../store'

const store = useStore()
const isCollapse = computed(()=>{
    return store.getters['getCollapse']

}) 
</script>

<template>
    <div class="logo">
        <img src="/vite.svg" alt="Vite logo" />
        <span v-if="!isCollapse">IT小站</span>
        
    </div>
</template>

<style lang="scss" scoped>
.logo{
    height: 50px;
    line-height: 50px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    background-color: #fff800;
    img{
        width: 32px;
        height: 32px;
        margin-right: 12px;
    }
}


</style>