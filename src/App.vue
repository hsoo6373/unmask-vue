<template>
  <router-view></router-view>
</template>

<script>
import axios from './assets/javascript/articleAPI.js'

export default {
  name: 'App',
  created: function() {
    this.setTags();
    this.setCountries();
    this.setArticles();
  },
  methods: {
    setTags: function() { axios().get('/tags/').then(response => this.$store.commit('tags', response.data)) },
    setCountries: function() { axios().get('/countries/').then(response => this.$store.commit('countries', response.data)) },
    setArticles: function() { axios().get('/articles/').then(response => this.$store.commit('articles', response.data)) },
  },
  watch: {
    $route: function(to, from) {
      console.log(to.params, from);
      this.$store.commit('recordings', to.params);
    }
  }
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
