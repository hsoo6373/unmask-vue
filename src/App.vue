<template>
  <router-view></router-view>
</template>

<script>
import axios from './articleAPI.js'
export default {
  name: 'App',
  created: function() {
      this.getTags();
      this.getCountries();
      this.getArticles();
  },
  methods: {
      getTags: function() { axios().get('/tags/').then(response => this.$store.state.tags = response.data) },
      getCountries: function() { axios().get('/countries/').then(response => this.$store.state.countries = response.data) },
      getArticles: function() { axios().get('/articles/').then(response => this.$store.state.articles = response.data) },
  },
}
</script>

<style lang='scss'>
* { 
  box-sizing: box-border;
  margin: 0;
  padding: 0;
  color: white;
  background: black;

  &::selection {
    color: red;
  }
}

body {
  min-height: 100vh;
  line-height: 1.3;

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
