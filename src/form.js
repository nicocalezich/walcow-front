import Vue from 'vue'
import VueForm from 'vue-form'

let options = {
    validators:{
        'in-between-spaces': function(value){
            return !value.includes(' ')
        },
        'have-letter': function(value){
            return !value.test(/^[A-Za-z]+$/)             
        }
    }

}

Vue.use(VueForm, options)