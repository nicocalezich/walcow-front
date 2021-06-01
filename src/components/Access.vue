<template>

  <section class="src-components-access">
     <div class="login-box">
        <!-- banner y opciones -->
        <img class="banner" src="../assets/banner.png" alt="banner">
        <div class="options">
            <button class="option">Login</button>
            <button class="option">Register</button>
        </div>
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
    name: 'src-components-access',
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

 .login-box {
    width: 320px;
    height: 360px;
    background: #000000AA;
    color: #fff;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    padding: 70px 30px;
}

.options{
    display: flex;
}

.banner {
    height: 85px;
    width: 87px;
    border-radius: 50%;
    position: absolute;
    top: -9%;
    left: calc(50% - 50px);
}

.option{
    border-radius: 0% !important;
}

.login-box label {
    padding: 0px;
    margin: 0px;
    display: block;
    margin-top: 20px;
    font-size: 17px;
}

.login-box h1 {
    padding: 0px;
    margin: 0px;
    display: block;
    text-align: center;
}

.login-box input {
    width: 100%;
    margin-bottom: 10px;
    margin-top: 10px;
    border: none;
    border-bottom: 1px solid #fff;
    background: transparent;
    outline: none;
    color: #fff;
}

.login-box button {
    display: block;
    width: 100%;
    margin-top: 15px;
    border-radius: 20px;
}

</style>
