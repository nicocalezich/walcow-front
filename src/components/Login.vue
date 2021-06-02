<template>

  <section class="src-components-login">
    <div class="container">
    <vue-form :state="formState" @submit.prevent="enviar()">
      <h1>Login</h1>
      <!-- user -->
      <validate tag="div">
        <label for="user">User</label>
        <input
          name="user"
          id="user"
          type="text"
          placeholder="Enter user"
          v-model.trim="formData.user"
          required
        >      
        <field-messages name="user" show="$dirty">
          <div slot="required" class="alert alert-danger mt-1">Debe ingresar su usuario</div>
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
          <div slot="required" class="alert alert-danger mt-1">Debe ingresar su contraseña</div>
        </field-messages>
      </validate> 
      <!-- btn ingresar -->
      <button type="submit" :disabled="formState.$invalid" class="btn btn-light">login</button>
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
          user: '',
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
</style>
