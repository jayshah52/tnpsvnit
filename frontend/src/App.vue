<template>

  <div id="app">
    <Navbar/>
    <div id="nav">
    </div>
    <router-view/>
  </div>

</template>

<script>

  import Navbar from "./components/layout/Navbar";
  import axios from "axios";
  export default {
    name: "App",
    components:{
      Navbar
    },
    beforeCreate() {
      this.$store.commit('initStore')
      if (this.$store.state.token){
        axios.defaults.headers.common['Authorization'] = this.$store.state.token
      }
      else{
        axios.defaults.headers.common['Authorization'] = ''
      }
    }
  }
</script>

<style lang="scss">
//#app {
//  font-family: Avenir, Helvetica, Arial, sans-serif;
//  -webkit-font-smoothing: antialiased;
//  -moz-osx-font-smoothing: grayscale;
//  text-align: center;
//  color: #2c3e50;
//}
//
//#nav {
//  padding: 30px;
//
//  a {
//    font-weight: bold;
//    color: #2c3e50;
//
//    &.router-link-exact-active {
//      color: #42b983;
//    }
//  }
//}
@import "../node_modules/bulma";
</style>
