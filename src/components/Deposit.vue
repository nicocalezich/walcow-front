<template>

  <section class="src-components-deposit">
      <vue-form :state="formState" @submit.prevent="enviar()">
        <div class="depositContainer">
        <div class="deposit__input">
            <validate tag="div">        
              <label>Credit card number</label>
              <input type="number" class="buy-inputs" name="creditcard" required v-model.trim="formData.creditcard"/>
            </validate>
          </div>
          <div class="deposit__input">
            <validate tag="div">        
              <label>Credit card expired</label>
              <input type="number" class="buy-inputs" name="expired" required v-model.trim="formData.expired"/>
            </validate>
          </div>
          <div class="deposit__input">
            <validate tag="div">        
              <label>Credit card pin</label>
              <input type="number" class="buy-inputs" name="pin" required v-model.trim="formData.pin"/>
            </validate>
          </div>
           <div class="deposit__input">
            <validate tag="div">        
              <label>Amount</label>
              <input type="number" class="buy-inputs" name="amount" id="amount" required v-model.trim="formData.amount"/>
            </validate>
          </div>
          <div class="deposit__button">
            <button :disabled="formState.$invalid">Confirmar</button>
          </div>
        </div>
      </vue-form>
  </section>

</template>

<script lang="js">
 import axios from "axios";

  export default  {
    name: 'src-components-deposit',
    props: [],
    mounted () {

    },
    data () {
      return {
        formData: this.getInicialData(),
        formState: {},
      }
    },
    methods: {
      enviar(){
        try {     
         let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "auth-token": window.localStorage.getItem("token"),
          }
        };
        axios.post("https://walcow-api.herokuapp.com/api/users/deposit", {
          value:  this.formData.amount
        }, axiosConfig)
            .then(res => {
              this.invalidCredentials = !res.data.success;
              this.errorMessage = res.data.message
              if (res.data.success) {
                window.localStorage.setItem('token', res.data.user.token)
                this.$store.dispatch('access', res.data.success)
                this.$router.push('/home')
              }
            }) 
      } catch (error) {
        console.log(error)
      }
      },
      getInicialData() {
        return {
          amount: '',
        }
    },
    computed: {

    }
  }
}


</script>

<style scoped lang="css">
  .src-components-deposit {
    width: 100vw;
    height: 100vh;
    background-size: cover;
    font-family: "Montserrat", sans-serif;
    display: flex;
    align-items: center;
    place-content: center;
    justify-content: center;
    align-self: center;
  }
  .depositContainer {
    padding: 25px;
    background-color: antiquewhite;
    margin: 30px;
    display: flex;
    flex-direction: column;
  }
  .deposit__input > div
  {
    display:flex;
    flex-direction: column;

  }
   .deposit__input > div label
  {
   margin: 10px 0;
  }
  .deposit__button button{
  display: block;
  width: 100%;
  margin-top: 15px;
  border-radius: 20px;
  border:none;
  cursor:pointer
  }
  .deposit__button button:hover {
    background-color: rgb(189, 200, 200);
  }
</style>
