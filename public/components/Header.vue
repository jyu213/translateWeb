<template>
  <header class="header">
    <div class="wrapper">
      <el-row :gutter="10">
        <el-col :xs="6" :sm="6" :md="6" :lg="6">
          <h1 class="logo-font">LU</h1>
        </el-col>
        <el-col :xs="18" :sm="18" :md="18" :lg="18">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1"><router-link to="list">文章</router-link></el-menu-item>
            <el-menu-item index="1"><router-link to="upload">推荐</router-link></el-menu-item>

            <el-menu-item v-if="username === ''" index="2"><router-link to="login">登录</router-link></el-menu-item>
            <el-menu-item v-else index="2"><router-link to="my">{{username}}</router-link></el-menu-item>
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
        console.log(key, keyPath)
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
  .logo-font{
    color: #FE864A;
    font-size: 40px;
    font-family: sans-serif;
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

