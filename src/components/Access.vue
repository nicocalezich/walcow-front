<template>
  <section class="src-components-access">    
    <div class="container">
        <div class="access-box">
            <img class="banner" src="../assets/banner-3.jpg" alt="banner">
            <div class="row" id="options">
                <router-link class="col-6" to="/Login">
                    <button class="btn btn-light"><b>Log in</b></button>
                </router-link>
                <router-link class="col-6" to="/Register">
                    <button class="btn btn-light"><b>Sing up</b></button>
                </router-link>
            </div>
            <!--Aca se insertan los componentes login y register -->     
            <router-view></router-view>
        </div>  
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

*{
    margin: 0%;
}

.src-components-access{
    width: 100vw;
    height: 100vh;
    background-image: url("../assets/access-background-2.jpg");
    background-size: cover;
    font-family: 'Montserrat', sans-serif;
}

.access-box {
    width: 320px;
    background: #000000AA;
    color: #fff;  
    padding: 70px 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    display: inline-block;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
}

#options {
    display: flex;
    text-align: center;
    padding: 12px 5px;
    margin-top: -15px;
    margin-bottom: 10px;
}

#options button {
    width: 120px;
    padding: 7px;
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
