<template>
    <div>
        home
        <p @click='click'>{{$route.params.id}}</p>
        <router-link to="/home/5/son1">son1</router-link>
        <router-link to="/home/5/son2">son2</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  name:'Home',
  methods:{
    click(){
      this.axios.post('/MattrioEcModel/SelectLongCarIntface/getManufacture',this.Qs.stringify({brand_id:'luosheng'}))
      .then(function (response) {
          console.log(response);
      })
      .catch(function (error) {
          console.log(error);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
