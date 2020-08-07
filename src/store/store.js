import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
Vue.use(Vuex);

let audioIndex = 0;

export const store = new Vuex.Store({
  state: {
    tags: [],
    countries: [],
    articles: [],
    collection: [],
    recordings: [],
  },
  getters: {
    getCollection: state  => state.collection.sort(),
    
    getArticlesByTag: state => tag => {
      tag = tag.replace('-', ' ');
      if (_.some(state.tags, {tag})) {
        return state.tags.find(item => item.tag === tag).articles;
      }
      else if (_.some(state.countries, {country: tag})) {
        return state.countries.find(item => item.country === tag).articles;
      }
    },
    
    getArticleByName: state => article => state.articles.find(item =>  item.title === article.replace('-', ' ')),
    
    getRecordings: state => index => {
      console.log(index);
      if (audioIndex >= _.size(state.recordings)) {
        audioIndex = 0;
      }
      return state.recordings[audioIndex++];
    },
    
    isTag: state => tag => {
      if (_.includes(state.collection, tag)) return true;
    }
  },
  mutations: {
    tags(state, axiosResponse) {
      state.tags = axiosResponse 
      mapCollection(state);
    },
    
    countries(state, axiosResponse) {
      state.countries = axiosResponse; 
      mapCollection(state);
    },
    
    articles(state, axiosResponse) {
      state.articles = axiosResponse;
    },
    
    recordings(state, params) {
      this.recording_index = 0;
      
      if (_.isEmpty(params)) {
        state.recordings = _.map(_.shuffle(state.articles), item => item.speech);
        return;
      }
      
      let tag = params.tag.replace('-', ' ');
      if (_.some(state.articles, item => _.includes(item.tags, tag))) {
        state.recordings = _.map(_.shuffle(_.filter(state.articles, item => _.includes(item.tags, tag))), item => item.speech);
      }
      else if (_.some(state.articles, {country: tag})) { 
        state.recordings = _.map(_.shuffle(_.filter(state.articles, item => item.country === tag)), item => item.speech);
      }
    }
  }
});

function mapCollection(state) {
  state.collection = _.map(_.concat(state.tags, state.countries), item => item.tag || item.country);
}