<template>
  <div v-click-outside="goToPreviousPage" class="article-page">
    <h1>Hello</h1>
  </div>
</template>

<script>
import { router } from '../routes.js'
export default {
  name: 'IndividualArticle',
  data: function() {
    return {
    }
  },
  methods: {
    goToPreviousPage: function() {
      router.push({ name: 'tag', params: { tag: this.$route.params.tag } });
    }  
  },
}
</script>

<style scoped lang='scss'>
@import "~@/assets/scss/_typo.scss";

.article-page {
  font-family: "CustomY78";
  margin-left: 5%;
  margin-right: 5%;
}

div {
  border: 1px solid blue;
}
</style>