<template>

  <section class="src-components-recover-password">
    <div class="container">
      <vue-form :state="formState" @submit.prevent="send()">
        <h1>Set new password</h1>
        <!-- password -->
        <div class="formRow">
          <validate tag="div">
            <label for="password">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              placeholder="Enter password"
              v-model.trim="formData.password"
              required
              minlength="8"
              have-letter
              have-number
            />
            <field-messages name="password" show="$dirty">
              <div slot="required" class="alert alert-danger error">
                Enter a password
              </div>
              <div v-if="!equalPasswords()" class="alert alert-danger error">
                Passwords must match
              </div>
              <div slot="minlength" class="alert alert-danger error">
                Password must have at least 8 characteres
              </div>
              <div slot="have-letter" class="alert alert-danger error">
                Password must have at least 1 letter
              </div>
              <div slot="have-number" class="alert alert-danger error">
                Password must have at least 1 number
              </div>
            </field-messages>
          </validate>
          <!-- confirm password -->
          <validate tag="div">
            <label for="confirmpassword">Confirm password</label>
            <input
              name="confirmpassword"
              id="confirmpassword"
              type="password"
              placeholder="Confirm password"
              v-model.trim="formData.confirmpassword"
              required
            />
            <field-messages name="confirmpassword" show="$dirty">
              <div slot="required" class="alert alert-danger error">
                Confirm the password
              </div>
              <div v-if="!equalPasswords()" class="alert alert-danger error">
                Passwords must match
              </div>
            </field-messages>
          </validate>
        </div>
        <!-- btn ingresar -->
        <button
          type="submit"
          :disabled="formState.$invalid || !equalPasswords()"
          class="btn btn-light"
        >
          <b>Set password</b>
        </button>
        <br>
          <div v-show="changedSuccess" class="password-success">
            <p>password changed successfully</p>
          </div>
          <div class="redirect">     
            <router-link to="/access/login"><a href="#">back to log in</a></router-link>                          
          </div>
          <br>
      </vue-form>
    </div>  
  </section>

</template>

<script lang="js">
import axios from "axios";

  export default  {
    name: 'src-components-recover-password',
   props: ['email'],
    mounted () {
      if (this.email == undefined){
        console.log('email undefined', this.email);
        this.$router.push('/access/forgot');
      }
    },
    data () {
      return {
        formData: this.getInicialData(),
        formState: {},
        changedSuccess: false
      }
    },
    methods: {
      getInicialData(){
        return{
          password: '',
          confirmpassword: ''
        }
      },
      equalPasswords(){
        return this.formData.password === this.formData.confirmpassword
      },
       send(){
        console.log({...this.formData})
     
        let newPassword = {
          password: this.formData.password,
        }
        
        try {
          axios.post(process.env.url + "/api/users/recover", newPassword)
          .then(res => {
           console.log(res)
          })
        } catch (error) {
          console.log(error)
        }
        
        this.changedSuccess = true
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
  padding: 0px;
  margin: 0px !important;
}

.formRow {
  width: 100%;
  display: flex;
}
.formRow div {
  width: 100%;
  margin: 5px 20px;
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

.src-components-register .container form {
  padding: 15px 80px;
}

.password-success{
  text-align: center;
  color: rgb(93, 233, 93);
  font-size: 20px;
  
}
</style>
