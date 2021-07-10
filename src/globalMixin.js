import Vue from 'vue';
import axios from "axios"

var accesMixin = {

    mounted () {
        //console.log('mounted -> Mixin global')
    },
    methods: {
        checkAccess() {         
            let token = window.localStorage.getItem('token');
            if (!token) {
                this.$router.push('/access').then(() => alert('You must login to continue'));
                return;
            }

            if (this.$store.state.user.username === "") {
                fetch('https://walcow-api.herokuapp.com/api/users/data', {
                    method: 'POST',
                    body: JSON.stringify({
                        "token": window.localStorage.getItem('token')
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(r => {
                    r.json().then(u => {

                        console.log('Response: ', u);

                        if (u.success){
                            this.$store.dispatch('access', u.success);
                            this.$store.dispatch('setUserData', u.result);
                        }
                        else {
                            window.localStorage.removeItem('token');
                            this.$router.push('/access').then(() => alert('You must login to continue'));
                        }

                    })
                }).catch(e => {
                    console.log('Error: ', e);
                })
            }
            
        },

        updateData(){
            fetch('https://walcow-api.herokuapp.com/api/users/data', {
                method: 'POST',
                body: JSON.stringify({
                    "token": window.localStorage.getItem('token')
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(r => {
                r.json().then(u =>  this.$store.dispatch('setUserData', u.result))
            }).catch(e => {
                console.log('Error: ', e);
            })
        },

        async getCbusAndCards(){
            let res = await axios.get("https://walcow-api.herokuapp.com/api/users/cbus", {
                headers: {
                  'auth-token': localStorage.getItem('token')
                }
              })
              this.$store.state.user.cbus = res.data.result

              let res2 = await axios.get("https://walcow-api.herokuapp.com/api/users/cards", {
                headers: {
                  'auth-token': localStorage.getItem('token')
                }
              })
              this.$store.state.user.cards = res2.data.result
        }
    },

    computed: {
        getBalance(){
            return this.$store.state.user.fiat
        }
    }
}

Vue.mixin(accesMixin);
