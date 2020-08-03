import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from './components/LandingPage.vue'
import TagPage from './components/TagPage.vue'
import ArticlePage from './components/ArticlePage.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes: [
        { name: 'home', path: '/', component: LandingPage },
        { name: 'tags', path: '/tags', component: TagPage },
        { name: 'tag', path: '/tags/:tag', component: TagPage },
        { name: 'article', path: '/tags/:tag-name/:article', component: TagPage },
        { path: '*', redirect: { name: 'home' } },
    ]
});