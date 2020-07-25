<template>
    <LandingPage/>
</template>

<script>
import LandingPage from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    LandingPage
  }
}
</script>

<style>
* {
  box-sizing: box-border;
  margin: 0;
  padding: 0;
  color: white;
  background: black;
}

body {
  min-height: 100vh;
  line-height: 1.6;

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
