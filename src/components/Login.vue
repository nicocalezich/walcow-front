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
        >      
        <field-messages name="username" show="$dirty">
          <div slot="required" class="alert alert-danger error">Enter your username</div>
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
        >
        <field-messages name="password" show="$dirty">
          <div slot="required" class="alert alert-danger error">Enter your password</div>
        </field-messages>
      </validate> 
      <!-- btn ingresar -->
      <button type="submit" :disabled="formState.$invalid" class="btn btn-light"><b>log in</b></button>
     </vue-form>
    </div>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'src-components-login',
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
       getInicialData(){
        return{
          username: '',
          password: ''
        }
      },
       enviar(){
        console.log({...this.formData})
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

.error{
  text-align: center;
  color: red;
  background-color: transparent;
  border: none;
  padding: 0px;
}

</style>
