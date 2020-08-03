<template>
  <div id="list" class="tag-page">
    <PollyAudio></PollyAudio>
    <template v-for="repeat in infiniteCounter">
    <ul :key="repeat">
      <h1 :style="{ fontSize: '4em'}">{{ repeat }}</h1>
      <li v-for="(item, index) in collection" :key="`${repeat} - ${item.name}`">
        <span :class="assignClass(index, repeat)">{{ item.name }}</span>
      </li>
    </ul>
    </template>
    <observer @intersect="intersecting"></observer>
  </div>
</template>

<script>
import Observer from './Observer';
import PollyAudio from './PollyAudio';

export default {
  name: 'TagPage',
  data: function() {
    return {
      infiniteCounter: 1,
    }
  },
  components: {
    Observer,
    PollyAudio,
  },
  methods: {
    assignClass: function(index, repeat) {
      return {
        evenRepeatEven: index % 2 === 0 && repeat % 2 === 0,
        evenRepeatOdd: index % 2 === 1 && repeat % 2 === 0,
        oddRepeatEven: index % 2 === 0 && repeat % 2 === 1,
        oddRepeatOdd: index % 2 === 1 && repeat % 2 === 1,
      }
    },
    intersecting: function() {
      this.infiniteCounter++;
    },
  },
  computed: {
    collection: function() {
      return this.$store.getters.getCollection;
    },
  }
}
</script>

<style scoped lang='scss'>
@import "~@/assets/scss/_typo.scss";

.tag-page {
  font-family: "CustomY78";
  width: 90%;
}

ul {
  background: none;
  list-style: none;
  font-size: 2em;
  display: flex;
  flex-direction: rows;
  justify-content: space-around;
  flex-wrap: wrap;
  position: relative;
  
  h1 {
    font-size: 2em;
    width: 100%;
    text-align: center;
    color: #302f2f;
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  li { 
    margin: 4% 2%;
    z-index: 2;
    background: none;
    
    .oddRepeatEven {
      color: white;
      &::selection {
        color: purple;
      }
    }
    
    .oddRepeatOdd {
      color: yellow;
      &::selection {
        color: red;
      }
    }
    
    .evenRepeatEven {
      color: purple;
      &::selection {
        color: white;
      }
    }
    
    .evenRepeatOdd {
      color: red;
      &::selection {
        color: yellow;
      }
    }
    
    span {
      background: none;
      z-index: 2;
      display: block;
      text-align: center;
      cursor: pointer;
      transition: transform .2s;
      
      &:hover {
        transform: scale(1.25);
      }
    }
    
  }
}

</style>
