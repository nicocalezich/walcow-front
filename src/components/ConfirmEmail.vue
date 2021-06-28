<template lang="html">

  <label>Holiwi</label>

</template>

<script lang="js">

import axios from "axios";


  export default  {
    name: 'src-components-confirm-email',
    props: ['token'],
    mounted () {

      if(!this.token) {
        this.$router.push('/access');
      }

      this.sendToConfirm();


    },
    data () {
      return {
        confirmedUser: false,
        errorMessage: '',
      }
    },
    methods: {
      sendToConfirm(){
        let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "auth-token": this.token,
          }
        };

        axios.patch("http://walcow-api.herokuapp.com/api/users/validate-email",{}, axiosConfig)
            .then(res => {
              console.log(res);

            })
            .catch(err => {
              console.log(err);


            });

      }
    },
    computed: {

    }
}


</script>

<style scoped lang="scss">

</style>
