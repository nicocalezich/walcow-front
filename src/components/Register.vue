<template>
  <section class="src-components-register">
    <div class="container">
      <vue-form :state="formState" @submit.prevent="enviar()">
        <h1>Sign up</h1>
        <!-- firstname -->
        <div class="formRow">
          <validate tag="div">
            <label for="firstname">First name</label>
            <input
                name="firstname"
                id="firstname"
                type="text"
                placeholder="Enter first name"
                v-model.trim="formData.firstname"
                required
                autocomplete="off"
            />
            <field-messages name="firstname" show="$dirty">
              <div slot="required" class="alert alert-danger error">
                Enter your first name
              </div>
            </field-messages>
          </validate>
          <!-- lastname -->
          <validate tag="div">
            <label for="lastname">Last name</label>
            <input
                name="lastname"
                id="lastname"
                type="text"
                placeholder="Enter last name"
                v-model.trim="formData.lastname"
                required
            />
            <field-messages name="lastname" show="$dirty">
              <div slot="required" class="alert alert-danger error">
                Enter your last name
              </div>
            </field-messages>
          </validate>
        </div>
        <!-- email -->
        <div class="formRow">
          <validate tag="div">
            <label for="email">Email</label>
            <input
                name="email"
                id="email"
                type="email"
                placeholder="Enter email"
                v-model.trim="formData.email"
                required
            />
            <field-messages name="email" show="$dirty">
              <div slot="required" class="alert alert-danger error">
                Enter your mail
              </div>
              <div slot="email" class="alert alert-danger error">
                Enter a valid email
              </div>
            </field-messages>
          </validate>
          <!-- user -->
          <validate tag="div">
            <label for="username">Username</label>
            <input
                name="username"
                id="username"
                type="text"
                placeholder="Enter username"
                v-model.trim="formData.username"
                required
                in-between-spaces
            />
            <field-messages name="username" show="$dirty">
              <div slot="required" class="alert alert-danger error">
                Enter a username
              </div>
              <div slot="in-between-spaces" class="alert alert-danger error">
                Username cannot have in-between spaces
              </div>
            </field-messages>
          </validate>
        </div>
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
          <b>Sign up</b>
        </button>
        <br>
        <div class="redirect">
          <router-link to="/access/login"><a href="#">Already registered? back to log in</a></router-link>
        </div>

      </vue-form>
    </div>
  </section>
</template>

<script lang="js">

export default {
  name: 'src-components-register',
  props: [],
  mounted() {

  },
  data() {
    return {
      formData: this.getInicialData(),
      formState: {}
    }
  },
  methods: {
    getInicialData() {
      return {
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        password: '',
        confirmpassword: ''
      }
    },
    equalPasswords() {
      return this.formData.password === this.formData.confirmpassword
    },
    enviar() {
      let credentials = {
        username: this.formData.username,
        password: this.formData.password,
        email: this.formData.email,
        firstname: this.formData.firstname,
        lastname: this.formData.lastname,
      }
      try {
        fetch('http://localhost:4000/api/users/register', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(r => {
          r.json().then(u => {
            console.log('response')
            console.log(u)
            if (u.success) {
              this.$store.dispatch('access', u.success)
              this.$router.push('/home')
            }
          })
        })
      } catch (error) {
        console.log(error)
      }
      this.formData = this.getInicialData()
      this.formState._reset()
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

.src-components-register .container form {
  padding: 15px 80px;
}

.container {
  margin-top: -2.5rem;
}

</style>
