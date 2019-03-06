<template>
    <div>
        home
        <p>{{$route.params.id}}</p>
        <router-link to="/home/5/son1">son1</router-link>
        <router-link to="/home/5/son2">son2</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  name:'Home'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
