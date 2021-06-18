import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        success: false,
        user: {
            firstname: '',
            lastname: '',
            emaiil: '',
            username: ''
        }
    },
    actions : {
        access({commit},canLogin) {
            commit('changeState',canLogin)
        } 
    },
    mutations : {
        changeState(state,canLogin) {
            state.success = canLogin                
        }
    }
})