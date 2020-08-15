<template>
  <div v-click-outside="goToPreviousPage" class="article-page">
    <PollyAudio></PollyAudio>
    <BackButton></BackButton>
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
import { router } from '../routes.js'
import PollyAudio from './PollyAudio';
import BackButton from './BackButton';
export default {
  name: 'IndividualArticle',
  components: {
    PollyAudio,
    BackButton,
  },
  methods: {
    goToPreviousPage: function() {
      router.push({ name: 'tag', params: { tag: this.$route.params.tag } });
    }  
  },
  computed: {
    title: function() {
      return this.$route.params.article.replace('-', ' ');
    }
  }
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
  
  h1 {
    font-size: 5em;
  }
}
</style>