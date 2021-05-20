import Vue from 'vue'
import VueRouter from 'vue-router'

//Falta agregar los import de los componentes "import x from './components/componente.vue'"

Vue.use(VueRouter)
export const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: "", component: null},
        {path: "", component: null},
        {path: "", component: null},
        {path: "", component: null}
    ]
})