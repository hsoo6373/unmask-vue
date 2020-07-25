<template>
  <div class="tag-page">
    <ul>
      <li 
        v-for="tag in tags" 
        :key="tag.tag"
      >
        {{ tag.tag }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TagPage',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
@import "~@/assets/scss/_typo.scss";

h1 {
  font-size: 3em;
  font-family: CustomY78;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
