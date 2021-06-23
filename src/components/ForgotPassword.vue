<template>

  <section class="src-components-forgot-password">
    <div class="container">
      <vue-form :state="formState" @submit.prevent="enviar()">
        <h1>Recover password</h1>

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
        </div>

        <button
          type="submit"
          :disabled="formState.$invalid"
          class="btn btn-light"
        >
          <b>Send email</b>
        </button>

        <br/>
        <div class="redirect">     
          <router-link to="/access/login"><a href="#">Back to log in</a></router-link>                          
        </div>
        <br/>
      </vue-form>
    </div>
  </section>

</template>

<script lang="js">


  export default  {
    name: 'src-components-forgot-password',
    props: [],
    mounted () {

    },
    data () {
      return {
        formData: this.getInicialData(),
        formState: {}
      }
    },
    methods: {
      getInicialData(){
        return{
          email: '',
        }
      },

      enviar(){
        console.log({...this.formData})

        this.$router.push({
            name: 'otp',
            params:{
              email: this.formData.email,
              toRouter: 'recover'
            }
        });

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

.container {
  margin-top: -2.5rem;
}
</style>
