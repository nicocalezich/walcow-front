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
            fiat: 0,
            cbus: [],
            cards: []
        }
    },
    actions: {
        access({ commit }, canLogin) {
            commit('access', canLogin)
        },
        setUserData({ commit }, userData) {
            commit('setUserData', userData)
        },
        incrementBalance({commit}, amount){
            commit('incrementBalance', amount)
        },

        decrementBalance({commit}, amount){
            commit('decrementBalance', amount)
        }
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
            state.user.cbus = userData.cbus
            state.user.cards = userData.cards
        },
        incrementBalance(state,amount){
            state.user.fiat += amount
        },
        decrementBalance(state,amount){
            state.user.fiat -= amount
            console.log(state.user.fiat)
        }
    }
})