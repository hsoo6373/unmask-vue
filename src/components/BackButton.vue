<template>
  <p @click="goToPreviousPage" class="back-button">X</p>
</template>

<script>
import { router } from '../routes.js'
import _ from 'lodash'
export default {
  name: 'BackButton',
  methods: {
    goToPreviousPage: function() {
      if (_.isEmpty(this.$route.params)) {
        router.push({ name: 'home' });
      }
      else if (this.$route.params.article) {
        let tag = this.$route.params.tag;
        let country = this.$route.params.country;
        if (tag) {
          router.push({ name: 'tag', params: { tag } });
        }
        if (country) {
          router.push({ name: 'country', params: { country }});
        }
      }
      else {
        router.push({ name: 'tags' });
      }
    }  
  },
}
</script>

<style scoped lang='scss'>
@import "~@/assets/scss/_typo.scss";

.back-button {
  font-family: "CustomY78";
  color: red;
  position: fixed;
  color: darkblue;
  right: 2%;
  top: 0;
  transform: translateX(-2%);
  font-size: 4em;
  z-index: 100;
  cursor: pointer;
}
</style>