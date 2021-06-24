<template>
  <section class="src-components-login">
    <div class="container">
      <vue-form :state="formState" @submit.prevent="enviar()">
        <h1>Log in</h1>
        <!-- user -->
        <validate tag="div">
          <label for="user">Username</label>
          <input
            name="username"
            id="username"
            type="text"
            placeholder="Enter username"
            v-model.trim="formData.username"
            required
          />
          <field-messages name="username" show="$dirty">
            <div slot="required" class="alert alert-danger error">
              Enter your username
            </div>
          </field-messages>
        </validate>

        <!-- password -->
        <validate tag="div">
          <label for="password">Password</label>
          <input
            name="password"
            id="password"
            type="password"
            placeholder="Enter password"
            v-model.trim="formData.password"
            required
          />
          <field-messages name="password" show="$dirty">
            <div slot="required" class="alert alert-danger error">
              Enter your password
            </div>
          </field-messages>
        </validate>
        <!-- btn ingresar -->
        <button
          type="submit"
          :disabled="formState.$invalid"
          class="btn btn-light"
        >
          <b>Log in</b>
        </button>
        <br>
          <div class="redirect">     
            <router-link to="/access/register"><a href="#">Don't have an account? Sign up here</a></router-link>                          
          </div>
          <div class="redirect">     
            <router-link to="/access/forgot"><a href="#">I forgot my password</a></router-link>                          
          </div>
        <div class="alert alert-danger error mt-3 invalid-credentials" v-if="invalidCredentials">
          {{this.errorMessage}}
        </div>
        
      </vue-form>
    </div>
  </section>
</template>

<script lang="js">
  import axios from "axios";
  export default  {
    name: 'src-components-login',
    props: [],
    mounted () {

    },
    data () {
      return {
        formData: this.getInicialData(),
        formState: {},
        invalidCredentials: false,
        errorMessage: ''
      }
    },
    methods: {
       getInicialData(){
        return{
          username: '',
          password: '', 
        }
      },
       enviar(){
        let credentials = {
          username: this.formData.username,
          password: this.formData.password
        }
        try {
          axios.post(process.env.url + "/api/users/login", credentials)
          .then(res =>{
            this.invalidCredentials = !res.data.canLogin;
            this.errorMessage = res.data.message
            if(res.data.canLogin){
             this.$store.dispatch('access', res.data.canLogin)
             this.$router.push('/home')
            }
          })
        } catch (error) {
          console.log(error)
        }
        this.formData = this.getInicialData()
        this.formState._reset()
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
  margin-top: 20px;
  font-size: 17px;
}

.container h1 {
  padding: 0px;
  margin: 0px;
  display: block;
  text-align: center;
}

.container input {
  width: 100%;
  margin-bottom: 10px;
  margin-top: 10px;
  border: none;
  border-bottom: 1px solid #fff;
  background: transparent;
  outline: none;
  color: #fff;
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

.error {
  text-align: left;
  color: red;
  background-color: transparent;
  border: none;
  padding: 0px 20px;
}

.redirect{
  text-align: center;
}

.redirect :hover{
  border-bottom: 1px solid;
}

.redirect a{
  text-decoration: none;
  color: rgb(255, 255, 255);
}

.invalid-credentials{
  font-size: 21px;
}

.src-components-login .container form {
  padding: 15px 80px;
}

.container {
  margin-top: -2.5rem;
}

</style>

