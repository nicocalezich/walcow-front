<template>

  <section class="src-components-access">
     <div class="access-box">
        <!-- banner y opciones -->
        <img class="banner" src="../assets/banner.png" alt="banner">
        <div class="row" id="options">
            <router-link class="col-md-6" to="/Login">
                <a>Login</a>
            </router-link>
            <router-link class="col-md-6" to="/Register">
                <a>Register</a>
            </router-link>
        </div>      
         <router-view></router-view>
      </div>  
  </section>

</template>

<script lang="js">

import Login from './Login.vue'

  export default  {
    name: 'src-components-access',
    props: [],
    mounted () {
        Login
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

 .access-box {
    width: 320px;
    height: 400px;
    background: #000000AA;
    color: #fff;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    padding: 70px 30px;
}

#options a{
    text-decoration: none;
    color: white;
    padding: 10px;
}

#options {
    display: flex;
    text-align: center;
    
}

.banner {
    height: 85px;
    width: 87px;
    border-radius: 50%;
    position: absolute;
    top: -9%;
    left: calc(50% - 50px);
}


</style>
