<template>
  <div id="app">
    <LuHeader></LuHeader>
    <router-view></router-view>
    <LuFooter></LuFooter>
  </div>
</template>

<script>
import LuHeader from './components/Header'
import LuFooter from './components/Footer'

export default {
  name: 'app',
  components: {LuHeader, LuFooter}
}
</script>

<style>
  *,
  *::before,
  *::after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .wrapper{
    margin: 0 auto;
    max-width: 1140px;
  }
  .sm-wrapper{
    margin: 0 auto;
    max-width: 640px;
  }
  .xm-wrapper{
    margin: 0 auto;
    max-width: 320px;
  }
  html{
    font-size: 10px;
  }
  body{
    font-size: 1.4rem;
  }
</style>
