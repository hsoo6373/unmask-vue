<template>
  <div class="landing-page">
    <h1 :style="hoverStyle" @mouseover="mouseover" @mouseleave="mouseleave">Unmask</h1>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LandingPage',
  data: function() {
    return {
      borderOpacity: 0.5,
      tags: []
    }
  },
  mounted: function() {
    this.getTags();
  },
  methods: {
    mouseover: function() {
      this.borderOpacity = 1;
    },
    mouseleave: function() {
      this.borderOpacity = 0.5;
    },
    getTags() {
      axios({
        method: 'get',
        url: `${process.env.VUE_APP_API_HOST}/tags/`,
        auth: {
          username: process.env.VUE_APP_API_USERNAME,
          password: process.env.VUE_APP_API_PASSWORD,
        }
      }).then(response => this.tags = response.data)
    },
    getCountries() {
      axios({
        method: 'get',
        url: `${process.env.VUE_APP_API_HOST}/countries/`,
        auth: {
          username: process.env.VUE_APP_API_USERNAME,
          password: process.env.VUE_APP_API_PASSWORD,
        }
      })
    }
  }, 
  computed: {
    hoverStyle: function() {
      return {
        border: `1px solid rgba(255, 255, 255, ${this.borderOpacity})`
      }
    }
  }
}
</script>

<style scoped lang='scss'>
@import "~@/assets/scss/_typo.scss";

h1 {
  font-size: 2em;
  font-family: CustomY78;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  padding: 0 2rem;
}

.landing-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
