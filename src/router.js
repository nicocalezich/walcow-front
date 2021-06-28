import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/Login.vue'
import Access from './components/Access.vue'
import Register from './components/Register.vue'
import Home from './components/Home'
import Forgot from './components/ForgotPassword.vue'
import AccessOtp from './components/AccessOtp.vue'
import RecoverPassword from './components/RecoverPassword.vue'
import ConfirmEmail from './components/ConfirmEmail.vue'
import Transaction from './components/Transactions/Transaction.vue'
import Buy from './components/Transactions/Buy.vue'
import Sell from './components/Transactions/Sell.vue'
import Markets from "./components/Markets"
import Deposit from "./components/Deposit"
import Withdraw from './components/Withdraw/index.vue'


Vue.use(VueRouter)
export const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: "/", redirect: "/access"},
        {
            path: "/access",
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
                },
                {
                    path: "confirm-email/:token",
                    name: 'confirmEmail',
                    component: ConfirmEmail,
                    props: true
                }
            ]
        },
        {path: "/home", component: Home},
        {path: "/deposit", component: Deposit},
        {path: "/withdraw", component: Withdraw},
        {path: "/markets", component: Markets},
        {
            path: "/transaction",
            component: Transaction,
            children: [
                {
                    path: "buy",
                    name: 'buy',
                    component: Buy,
                    props(route) {
                        return {crypto: route.query.crypto}
                    }
                },
                {
                    path: "sell",
                    name: 'sell',
                    component: Sell,
                    props(route) {
                        return {crypto: route.query.crypto}
                    }
                }

            ]
        },
    ]
})