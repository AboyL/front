<template>
  <div>
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div>
      <router-link to="/vue">去vue</router-link>
    </div>
    <router-link to="/umi">去umi</router-link>
    <router-view></router-view>
    <div id="vue" ></div>
    <div id="umi" ></div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
