<template>
  <div id="app">
    <router-link to="/mine">mine</router-link>
    <router-link to="/home/5">home</router-link>
    <router-link to="/news">news</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name:'App',
  data(){
    return{
      text:'路由query传值'
    }
  }
}
</script>

<style>

</style>
