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
    getCollection: (state) => {
      return state.collection.sort((a, b) => {
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();
        
        if (nameA < nameB) return -1;
        else if (nameA > nameB) return 1;
        else return 0;
      });
    },
    
    getTags: state => state.tags,
    
    getCountries: state => state.countries,
    
    getTagArticles: state => tag => state.tags.filter(item => item.tag === tag),
    
    getCountryArticles: state => country => state.countries.filter(item => item.country === country),
    
    getArticle: state => article => state.articles.find(item =>  item.title === article),
    
    getRandomRecording: state => state.articles[Math.floor(Math.random() * state.articles.length)].speech
  },
  mutations: {
    tags(state, axiosResponse) {
      state.tags = appendToArray('tag', axiosResponse);
      state.collection = state.countries.concat(state.tags);
    },
    
    countries(state, axiosResponse) {
      state.countries = appendToArray('country', axiosResponse);
      state.collection = state.tags.concat(state.countries);
    },
    
    articles(state, axiosResponse) {
      state.articles = axiosResponse;
    },
  }
});

function appendToArray(stateKey, axiosResponse) {
  let responseArray = [];
  axiosResponse.forEach(element => {
    let responseObj = {
      name: element[stateKey],
      articles: element.articles,
    };
    responseArray.push(responseObj);
  });
  return responseArray;
}