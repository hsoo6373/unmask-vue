<template>
  <article class="unmask-article">
    <div class="article-encapsulation">
      <h1>{{ article.title }}</h1>
      <!--Video for the audiowave-->
      <!--<video src=""></video>--> 
    </div>
    <p>{{ article.typedjs }}</p>
  </article>
</template>

<script>
export default {
  name: 'UnmaskArticle',
  props: {
    article: {
      type: Object,
      required: true,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
@import "~@/assets/scss/_typo.scss";
</style>
