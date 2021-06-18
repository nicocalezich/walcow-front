import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './components/Login.vue'
import Access from './components/Access.vue'
import Register from './components/Register.vue'
import Home from './components/Home.vue'

Vue.use(VueRouter)
export const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: "/", redirect: "/access"},
        {path: "/access",
        component: Access,
        children: [
            {
                path: "",
                name: 'login',
                component: Login                
            },            
            {
                path: "login",
                name: 'login',
                component: Login                
            },
            {
                path: "register",
                name: "register",
                component: Register
            }
        ]
        },
        {path: "/home", component: Home}
    ]
})