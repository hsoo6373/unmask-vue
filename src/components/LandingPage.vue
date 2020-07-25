<template>
  <div class="landing-page">
    <h1 :style="hoverStyle" @mouseover="mouseover" @mouseleave="mouseleave">Unmask</h1>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  data: function() {
    return {
      borderOpacity: 0.5,
    }
  },
  methods: {
    mouseover: function() {
      this.borderOpacity = 1;
    },
    mouseleave: function() {
      this.borderOpacity = 0.5;
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
@import "~@/assets/scss/_typo.scss";

h1 {
  font-size: 2em;
  font-family: CustomY78;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  padding: 0 2rem;
}

.hover {
  border: 1px solid #fff;
}
</style>
