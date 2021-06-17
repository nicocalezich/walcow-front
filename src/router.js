import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Home from './components/Home.vue'

Vue.use(VueRouter)
export const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: "/", redirect: "/access"},
        {path: "/access",
        components: {
            default: Login,
            login: Login,
            register: Register
          }},
        {path: "/register", component: Register},
        {path: "/home", component: Home}
    ]
})