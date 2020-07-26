<template>
  <div class="landing-page">
    <h1 :class="glitch" data-text="Unmask" :style="hoverStyle" @mouseover="mouseover" @mouseleave="mouseleave" @click="glitchPlay">Unmask</h1>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LandingPage',
  data: function() {
    return {
      borderOpacity: 0.5,
      tags: [],
      countries: [],
      clicked: false,
    }
  },
  mounted: function() {
    this.getTags();
    this.getCountries();
  },
  methods: {
    mouseover: function() {
      this.borderOpacity = 1;
    },
    mouseleave: function() {
      this.borderOpacity = 0.5;
    },
    getTags: function() {
      axios({
        method: 'get',
        url: `${process.env.VUE_APP_API_HOST}/tags/`,
        auth: {
          username: process.env.VUE_APP_API_USERNAME,
          password: process.env.VUE_APP_API_PASSWORD,
        }
      }).then(response => this.tags = response.data);
    },
    getCountries: function() {
      axios({
        method: 'get',
        url: `${process.env.VUE_APP_API_HOST}/countries/`,
        auth: {
          username: process.env.VUE_APP_API_USERNAME,
          password: process.env.VUE_APP_API_PASSWORD,
        }
      }).then(response => this.countries = response.data);
    },
    glitchPlay: function() {
      var audio = new Audio(require('../assets/audio/glitch.mp3'));
      this.clicked = true;
      audio.play();
      audio.onended = () => {
        this.clicked = false;
      };
    },
    
  }, 
  computed: {
    hoverStyle: function() {
      return {
        border: `1px solid rgba(255, 255, 255, ${this.borderOpacity})`
      }
    },
    collection: function() {
      var collectionAttr = [];
      for (const element of this.tags) {
        let newAttr = {
          title: element.tag,
          type: 'tag',
          article: element.articles,
        };
        collectionAttr.push(newAttr);
      }
      for (const element of this.countries) {
        let newAttr = {
          title: element.country,
          type: 'country',
          article: element.articles,
        };
        collectionAttr.push(newAttr);
      }
      return collectionAttr;
    },
    glitch: function() {
      return {
        glitch: this.clicked,
      }
    }
  }
}
</script>

<style scoped lang='scss'>
@import "~@/assets/scss/_typo.scss";
@import "~@/assets/scss/_glitch.scss";

h1 {
  font-size: 2em;
  font-family: CustomY78;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  padding: 0 2rem;
  letter-spacing: .2em;
}

.landing-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
