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
    
    getArticlesByTag: state => tag => {
      if (_.some(state.tags, {tag})) {
        return state.tags.find(item => item.tag === tag).articles;
      }
      else if (_.some(state.countries, {country: tag})) {
        return state.countries.find(item => item.country === tag).articles;
      }
    },
    
    getArticleByName: state => article => state.articles.find(item =>  item.title === article),
    
    getRandomRecording: state => query => {
      if (_.size(query) === 0) {
        return _.sample(state.articles).speech;
      }
      else if (_.some(state.articles, item => _.includes(item.tags, query.tag))) {
        return _.sample(_.filter(state.articles, item => _.includes(item.tags, query.tag))).speech
      }
      else if (_.some(state.articles, {country: query.tag})) {
        return _.sample(_.filter(state.articles, item => item.country === query.tag)).speech
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
  state.collection = _.map(_.concat(state.tags, state.countries), item => item.tag || item.country);
}