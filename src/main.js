import Vue from 'vue'
import App from './App.vue'
import { router } from './routes.js'
import { store } from './store/store.js'
import axios from './articleAPI.js'

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    mounted: function() {
        this.getTags();
        this.getCountries();
    },
    methods: {
        getTags: function() { axios().get('/tags/').then(response => this.$store.state.tags = response.data) },
        getCountries: function() { axios().get('/countries/').then(response => this.$store.state.countries = response.data) },
    },
    render: h => h(App),
}).$mount('#app')
