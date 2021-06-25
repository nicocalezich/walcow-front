import Vue from 'vue'
import Vuex from 'vuex'
import {router} from './router'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        success: false,
        user: {
            firstname: '',
            lastname: '',
            email: '',
            username: ''
        }
    },
    actions: {
        access({commit}, canLogin) {
            commit('access', canLogin)
        },
        checkAccess({commit}) {
            commit('checkAccess')
        },
        setUserData({commit}, userData) {
            commit('setUserData', userData)
        }
    },
    mutations: {
        access(state, canLogin) {
            state.success = canLogin
        },
        checkAccess: function (state) {
            if (!window.localStorage.getItem('token')) {
                router.push('/access').then(() => alert('You must login to continue'))
            } else {
                fetch('https://walcow-api.herokuapp.com/api/users/data', {
                    method: 'POST',
                    body: JSON.stringify({
                        "token": window.localStorage.getItem('token')
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(r => {
                    r.json().then(u => this.setUserData(state, u.message))
                })
            }
        },
        setUserData(state, userData) {
            state.user.firstname = userData.firstname
            state.user.lastname = userData.lastname
            state.user.email = userData.email
            state.user.username = userData.username
        }
    }
})