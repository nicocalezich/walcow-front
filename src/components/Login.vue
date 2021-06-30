<template>
  <section class="src-components-login">
    <div class="container">
      <vue-form :state="formState" @submit.prevent="enviar()">
        <h1>Log in</h1>
        <!-- user -->
        <validate tag="div">
          <label for="user">Username</label>
          <input
              :class="{'invalid-credential-inputs': this.invalidCredentials}"
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
          <label for="password">Password <svg v-show="isHidden" @click="showPassword()" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
          </svg>
          <svg v-show="!isHidden" @click="hidePassword()" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
        </svg>

          </label>
          <input
              :class="{'invalid-credential-inputs': this.invalidCredentials}"
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
        <div v-show="waitingResponse" class="preloader-container">
          <Preloader/>
        </div>
        <br>
        <div class="redirect">
          <router-link to="/access/register"><a href="#">Don't have an account? Sign up here</a></router-link>
        </div>
        <div class="redirect">
          <router-link class="forgot-pass" to="/access/forgot"><a href="#"><i>I forgot my password</i></a></router-link>
        </div>
        <div class="alert alert-danger error mt-3 invalid-credentials" v-if="invalidCredentials">
          {{ this.errorMessage }}
        </div>
      </vue-form>
    </div>
  </section>
</template>

<script lang="js">
import axios from "axios"
import Preloader from './Preloader.vue'

export default {
  name: 'src-components-login',
  props: [],
  mounted() {},
  components: {
    Preloader
  },

  data() {
    return {
      formData: this.getInicialData(),
      formState: {},
      invalidCredentials: false,
      errorMessage: '',
      isHidden: true,
      waitingResponse: false
    }
  },
  methods: {
    getInicialData() {
      return {
        username: '',
        password: '',
      }
    },
    enviar() {
      this.waitingResponse = true
      let credentials = {
        username: this.formData.username,
        password: this.formData.password
      }
      try {
        axios.post("https://walcow-api.herokuapp.com/api/users/login", credentials)
            .then(res => {
              if (res.data.success) {
                this.waitingResponse = false
                window.localStorage.setItem('token', res.data.result.token)
                this.$store.dispatch('setUserData', res.data.result)
                this.$store.dispatch('access', res.data.success)
                this.$router.push('/home')          
              } else {

                this.invalidCredentials = true

                if (res.data.result.token) {
                  this.errorMessage = 'The email is not validated'
                }
                else {
                  this.errorMessage = res.data.result
                }

              }
            })
      } catch (error) {
        console.log(error)
      }
      this.formData = this.getInicialData()
      this.formState._reset()
    },
  showPassword(){
    this.isHidden = false
     document.querySelector('#password').type = 'text'
  },
  hidePassword(){
     this.isHidden = true
      document.querySelector('#password').type = 'password'
  }
  },
  computed: {}
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

.redirect {
  text-align: center;
}

.redirect :hover {
  border-bottom: 1px solid;
}

.redirect a {
  text-decoration: none;
  color: rgb(255, 255, 255);
}

.invalid-credentials {
  font-size: 21px;
  text-align: center;
}

.src-components-login .container form {
  padding: 15px 80px;
}

.container {
  margin-top: -2.5rem;
}

.forgot-pass {
  font-size: 13px;
}

.invalid-credential-inputs{
  border: 1px solid red !important;
  border-radius: 15px;
  padding: 6px;
}

.preloader-container{
  width: 96%;
}

</style>

