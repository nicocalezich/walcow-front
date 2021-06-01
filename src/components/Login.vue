<template>

  <section class="src-components-login">
    <div class="container">
    <form method="post">
      <h1>Login</h1>
      <!-- user -->
      <label for="user">User</label>
      <input name="contra" class="form-control" id="user" type="text" placeholder="Enter user" required>        
      <!-- password -->
      <label for="password">Password</label>
      <input name="contra" class="form-control" id="password" type="password" placeholder="Enter password" required>
      <!-- btn ingresar -->
      <button type="submit">login</button>
    </form>
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
