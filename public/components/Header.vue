<template>
  <header class="header">
    <div class="wrapper">
      <el-row :gutter="10">
        <el-col :xs="6" :sm="6" :md="6" :lg="6">
          <h1><img class="logo" src="../assets/logo.png" /></h1>
        </el-col>
        <el-col :xs="18" :sm="18" :md="18" :lg="18">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1"><a href="#list" target="_blank">列表</a></el-menu-item>
            <el-menu-item index="2"><a href="#user" target="_blank">个人中心 {{username}}</a></el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </header>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        activeIndex: '1'
      };
    },
    computed: mapGetters({
      username: 'username'
    }),
    created () {
      this.$store.dispatch('getUser')
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
  .header{
    height: 60px;
    line-height: 60px;
    background: #58B7FF;
  }
  .logo{
    position: relative;
    top: 10px;
    width: 40px; height: 40px;
  }
  .el-col {
  }
  .el-menu{
    float: right;
    background: none;
  }
  .el-menu-item{
    color: #fff;
    opacity: 0.8;
    font-size: 1.6rem;
  }
  .el-menu--horizontal .el-menu-item:hover{
    background: none;
  }
  .el-menu-item a{
    text-decoration: none;
  }
  .el-menu-item.is-active{
    color: #fff;
    opacity: 1;
  }
</style>

