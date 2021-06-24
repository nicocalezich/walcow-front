import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './components/Login.vue'
import Access from './components/Access.vue'
import Register from './components/Register.vue'
import Home from './components/Home.vue'
import Profile from "./components/Profile/Profile";
import Forgot from './components/ForgotPassword.vue'
import AccessOtp from './components/AccessOtp.vue'
import RecoverPassword from './components/RecoverPassword.vue'

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
            },
            {
                path: "forgot",
                name: "forgot",
                component: Forgot
            },
            {
                path: "otp",
                name: "otp",
                component: AccessOtp,
                props: true
            },
            {
                path: "recover",
                name: "recover",
                component: RecoverPassword,
                props: true
            }
        ]
        },
        {path: "/home", component: Home},
        {path: "/profile", component: Profile}
    ]
})