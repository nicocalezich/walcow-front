import Vue from 'vue';



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

                        if (u.success){
                            this.$store.dispatch('setUserData', u.result);
                        }
                        else {
                            window.localStorage.removeItem('token');
                            this.$router.push('/access').then(() => alert('You must login to continue'));
                        }

                    })
                }).catch(e => {
                    console.log('Error: ', e);
                    window.localStorage.removeItem('token');
                    this.$router.push('/access').then(() => alert('You must login to continue'));
                })
            }
        },
    }
}

Vue.mixin(accesMixin);
