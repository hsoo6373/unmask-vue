import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    tags: [],
    countries: [],
    articles: [],
    collection: [],
  },
  getters: {
    getCollection: (state, getters) => {
      for (const element of getters.getTags) {
        let item = {
          name: element.tag,
          type: 'tag',
          article: element.articles,
        }
        console.log(item);
        state.collection.push(item);
      }
      
      for (const element of getters.getCountries) {
        let item = {
          name: element.country,
          type: 'country',
          article: element.articles,
        }
        state.collection.push(item);
      }
      
      return state.collection.sort((a, b) => {
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();
        
        if (nameA < nameB) return -1;
        else if (nameA > nameB) return 1;
        else return 0;
      });
    },
    
    getTags: state => {
      return state.tags;
    },
    
    getCountries: state => {
      return state.countries;
    },
    
    getTagArticles: state => tag => {
      return state.tags.filter(item => item.tag === tag);
    },
    
    getCountryArticles: state => country => {
      return state.countries.filter(item => item.country === country);
    },
    
    getArticle: state => article => {
      return state.articles.find(item =>  item.title === article);
    }
  },
});
