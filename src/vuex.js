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
        addNewCbu({commit}, cbu){
            commit('pushCbu', cbu)
        },
        addNewCard({commit}, card){
            commit('pushCard', card)
        },
        deleteCbu({commit}, index){
            commit('deleteCbu', index)
        },
        deleteCard({commit}, index){
            commit('deleteCard', index)
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
        },

        pushCbu(state,cbu){
            state.cbus.push(cbu)
        },

        pushCard(state,card){
            state.cards.push(card)
        },

        deleteCbu(state,index){
            state.cbus.splice(index,1)
        },

        deleteCard(state,index){
            state.cards.splice(index,1)
        }


    }
})