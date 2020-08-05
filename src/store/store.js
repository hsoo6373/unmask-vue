import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    tags: [],
    countries: [],
    articles: [],
    collection: [],
  },
  getters: {
    getCollection: state  => state.collection.sort(),
    
    getTags: state => state.tags,
    
    getCountries: state => state.countries,
    
    getTagArticles: state => tag => state.tags.find(item => item.tag === tag),
    
    getCountryArticles: state => country => state.countries.find(item => item.country === country),
    
    getArticles: state => state.articles,
    
    getArticle: state => article => state.articles.find(item =>  item.title === article),
    
    getRandomRecording: state => article => {
      if (article === undefined) {
        return _.sample(state.articles).speech;
      } 
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
  }
});

function mapCollection(state) {
  const temp = state.tags.concat(state.countries);
  return _.map(temp, function(item) {
    return item.tag || item.country;
  });
}