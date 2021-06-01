<template>

  <section class="src-components-register">
    <div class="container">
      <form method="post">
      <h1>Register</h1>
      <!-- firstname -->
      <label for="firstname">First name</label>
      <input name="firstname" class="form-control" id="firstname" type="text" placeholder="Enter first name" required>        
      <!-- lastname -->
      <label for="lastname">Last name</label>
      <input name="lastname" class="form-control" id="lastname" type="text" placeholder="Enter last name" required> 
      <!-- email -->
      <label for="email">Email</label>
      <input name="email" class="form-control" id="email" type="email" placeholder="Enter email" required> 
      <!-- password -->
      <label for="password">Password</label>
      <input name="password" class="form-control" id="password" type="password" placeholder="Enter password" required>
      <!-- confirm password -->
      <label for="confirmpassword">Confirm password</label>
      <input name="confirmpassword" class="form-control" id="confirmpassword" type="password" placeholder="Enter confirm password" required>
      <!-- btn ingresar -->
      <button type="submit">Register</button>
    </form>
    </div>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'src-components-register',
    props: [],
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {

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
