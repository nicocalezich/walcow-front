import Vue from 'vue'
import VueForm from 'vue-form'

let options = {
    validators:{
        'in-between-spaces': function(value){
            return !value.includes(' ')
        },
        'have-letter': function(value){
            const regExp = /[a-zA-Z]/g
            let hasLetter = regExp.test(value)? true : false
            return hasLetter            
        },
        'have-number': function(value){
            const regex = /\d/; 
            let hasNumber = regex.test(value)? true : false
            return hasNumber
        },
        'is-positive': function(value){
            return value > 0
        },
    }

}

Vue.use(VueForm, options)