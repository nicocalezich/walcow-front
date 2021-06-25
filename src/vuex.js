import Vue from 'vue'
import Vuex from 'vuex'
import { router } from './router'

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
        },
        checkAccess({commit}) {
            commit('redirect')
        }
    },
    mutations : {
        changeState(state,canLogin) {
            state.success = canLogin                
        },
        redirect() {
            if (!window.localStorage.getItem('token')) {
                router.push('/access')
                alert('You must login to continue')
            }
        },
    }
})