import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        success: false,
        user: {
            firstname: '',
            lastname: '',
            email: '',
            username: '',
            fiat: 0
        },
        cbus: [],
        cards: []
    },
    actions: {
        access({commit}, canLogin) {
            commit('access', canLogin)
        },
        setUserData({commit}, userData) {
            commit('setUserData', userData)
        },
    },
    mutations: {
        access(state, canLogin) {
            state.success = canLogin
        },
        setUserData(state, userData) {
            state.user.firstname = userData.firstname
            state.user.lastname = userData.lastname
            state.user.email = userData.email
            state.user.username = userData.username
            state.user.fiat = userData.fiat
        }
    }
})