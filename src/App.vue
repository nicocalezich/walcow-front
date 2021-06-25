<template>
  <div id="app">
    <div v-if="this.$store.state.success">
     <Navbar/>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

import Navbar from './components/Navbar.vue'


export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');
</style>
