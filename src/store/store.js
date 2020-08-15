import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import axios from '../assets/javascript/articleAPI.js'
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
      tag = clean(tag);
      if (_.some(state.tags, {tag})) {
        return state.tags.find(item => item.tag === tag).articles;
      }
      else if (_.some(state.countries, {country: tag})) {
        return state.countries.find(item => item.country === tag).articles;
      }
    },
    
    getArticleByName: state => article => state.articles.find(item =>  item.title === clean(article)),
    
    getRecordings: state => index => {
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
    setTags(state, axiosResponse) {
      state.tags = axiosResponse;
    },
    
    setCountries(state, axiosResponse) {
      state.countries = axiosResponse;
    },
    
    setArticles(state, axiosResponse) {
      state.articles = axiosResponse;
    },
    
    setCollection(state) {
      state.collection = _.map(_.concat(state.tags, state.countries), item => item.tag || item.country)
    },
    
    recordings(state, params) {
      this.recording_index = 0;
      
      if (_.isEmpty(params)) {
        state.recordings = _.map(_.shuffle(state.articles), item => item.speech);
        return;
      }
      
      if (params.article) {
        state.recordings = _.map(_.filter(state.articles, item => item.title === clean(params.article)), item => item.speech)
      }
      
      else if (params.tag) {
        let tag = clean(params.tag);
        if (_.some(state.articles, item => _.includes(item.tags, tag))) {
          state.recordings = _.map(_.shuffle(_.filter(state.articles, item => _.includes(item.tags, tag))), item => item.speech);
        } 
        else if (_.some(state.articles, {country: tag})) {
          state.recordings = _.map(_.shuffle(_.filter(state.articles, item => item.country === tag)), item => item.speech);
        }
      }
    }
  },
  
  actions: {
    async setData({commit}) {
      let tagResponse = await axios().get('/tags/');
      commit('setTags', tagResponse.data);
      
      let countryResponse = await axios().get('/countries/');
      commit('setCountries', countryResponse.data);
      
      commit('setCollection');
      
      let articleResponse = await axios().get('/articles/');
      commit('setArticles', articleResponse.data)
    }
  },
});

function clean(strclean) {
  return strclean.replace('-', ' ');
}