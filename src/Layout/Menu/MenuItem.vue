<script setup lang="ts">
//引入父组件数据
defineProps(['menuList'])
</script>

<template> 
    <!-- 菜单模板，获取数据后循环打印渲染菜单,用路径当key值，不会出错 -->
    <template v-for="menu in menuList" :key="menu.path">

        <!-- 如果菜单中还有子菜单>0个，使用此模板 -->
        <el-sub-menu v-if="menu.children && menu.children.length > 0" :index="menu.path">
            <template #title>
                <!-- 名字图标引入 -->
                <el-icon>
                    <component :is="menu.meta.icon" class="icon"></component>
                </el-icon>
                <span>{{ menu.meta.title }}</span>
            </template>

            <!-- 子菜单直接递归迭代显示 -->
            <menu-item :menuList="menu.children"></menu-item>
        </el-sub-menu>

        <!-- 如果没有子菜单的目录，使用此模板 -->
        <el-menu-item v-else :index="menu.path">
            <!-- 名字图标引入 -->
            <el-icon>
                <component :is="menu.meta.icon" class="icon"></component>
            </el-icon>
            <template #title>{{ menu.meta.title }}</template>
        </el-menu-item>
    </template>
</template>


<style lang="scss" scoped>

</style>
 