import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from './components/LandingPage.vue'
import TagPage from './components/TagPage.vue'
import ArticlePage from './components/ArticlePage.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: LandingPage },
        { path: '/tags', component: TagPage },
        { path: '/articles', component: ArticlePage },
    ]
});