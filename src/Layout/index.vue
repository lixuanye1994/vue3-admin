<script setup lang="ts">
import Header from "./Header/Header.vue"
import Menu from "./Menu/AsideMenuBar.vue"
import Footer from "./Footer/Footer.vue"
import Tabs from "./Menu/Tabs/Tabs.vue";

</script>


<template>
    <div class="layout">
      <el-container class="container">
        <el-aside width="auto" class="aside">
          <Menu></Menu>
        </el-aside>
        <el-container>
          <el-header class="header">
            <Header></Header>
          </el-header>
          <el-main class="main">
            <Tabs></Tabs>
            <router-view></router-view>
          </el-main>
          <el-footer class="footer">
            <Footer></Footer>
          </el-footer>
        </el-container>
      </el-container>
    </div>
</template>


<style lang="scss" scoped>
.layout{
  height: 100%;
  .container{
    height: 100%;
  }
  .aside{
    height: 100%;
    background-color: #545c64;
    overflow-y:hidden;
    box-shadow: 0px 0px 10px 3px #00000055;
    z-index: 1;

  }
  .header{
    height:50px;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    align-items: center;
  }
  .main{
    height: 100%;
    background-color: ghostwhite;
  }
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
