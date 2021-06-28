<template>

  <div class="container">
    <h1>OTP Validation</h1>
    <br/>
    <div v-if="confirmedUser" class="text-center">
    <div>
      <img class="icon icons8-Star-Filled" src="https://cdn.icon-icons.com/icons2/1506/PNG/512/emblemok_103757.png" width="100" height="100">
      <label> 
          User confirmation OK!  
      </label>
      </div>
    </div>
    <div v-if="hasError" class="text-center">
      <img class="icon icons8-Star-Filled" src="https://img2.freepng.es/20180320/btw/kisspng-area-trademark-symbol-brand-sign-error-5ab0d7e1e44023.2850921615215390419349.jpg" width="100" height="100">
      <label>{{errorMessage}}</label>
    </div>


    <button
      @click="redirectTo"
      class="btn btn-light"
    >
      <b>OK</b>
    </button>
    <br/>
  </div>


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
        hasError: false,
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

              if(res.data.success) {
                this.confirmedUser = true;
              }
              else {
                this.confirmedUser = false;
                this.errorMessage = res.data.message;
                this.hasError = true;
              }

            })
            .catch(err => {
              console.log('Error to show:', err);
              this.errorMessage = err.message;
              this.hasError = true;

            });

      },

      redirectTo(){
        this.$router.push({
          name: 'login',
        });
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">

.container label {
  padding: 0px;
  margin: 0px;
  display: block;
  margin-top: 5px;
  font-size: 17px;
}

.container h1 {
  padding: 0px;
  margin: 0px;
  display: block;
  text-align: center;
}

.container button {
  display: block;
  width: 100%;
  margin-top: 15px;
  border-radius: 20px;
}

.container button:hover {
  background-color: rgb(189, 200, 200);
}


</style>
