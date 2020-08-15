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
      return state.tags.find(item => item.tag === tag).articles;      
    },
    
    getArticlesByCountry: state => country => {
      country = clean(country);
      return state.countries.find(item => item.country === country).articles;
    },
    
    getArticleByName: state => article => state.articles.find(item =>  item.title === clean(article)),
    
    getRecordings: state => index => {
      console.log(index);
      if (audioIndex >= _.size(state.recordings)) {
        audioIndex = 0;
      }
      return state.recordings[audioIndex++];
    },
    
    isTag: state => tag => {
      if (_.find(state.tags, { tag })) {
        return true;
      }
    },
    
    isCountry: state => country => {
      console.log(country)
      if (_.find(state.countries, { country: country })) {
        return true;
      }
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
    
    setAudio(state, recordings) {
      this.recording_index = 0;
      state.recordings = _.shuffle(recordings);
    },
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
    },
    
    setAudio({commit, state}, params) {
      if (_.isEmpty(params)) {
        commit('setAudio', _.map(state.articles, item => item.speech));
      } 
      else if (params.article) {
        commit('setAudio', _.map(_.filter(state.articles, item => item.title === clean(params.article)), item => item.speech));
      }
      else if (params.tag) {
        let tag = clean(params.tag);
        if (_.some(state.articles, item => _.includes(item.tags, tag))) {
          commit('setAudio', _.map(_.filter(state.articles, item => _.includes(item.tags, tag)), item => item.speech))
        }
        else {
          commit('setAudio', _.map(_.filter(state.articles, item => item.country === tag), item => item.speech));
        }
      }
    },
  },
});

function clean(strclean) {
  return strclean.replace('-', ' ');
}