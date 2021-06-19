<template>
  <section class="src-components-access">    
    <div class="container">
        <div class="access-box">
            <img class="banner" src="../assets/banner-3.jpg" alt="banner">
            <!--
            <div class="row" id="options">
                <div class="col-6">
                    <router-link to="/access/login">
                    <button @click="setLogin()" id="login"  class="btn btn-light"><b>Log in</b></button>
                    </router-link>
                </div>
                <div class="col-6">
                    <router-link to="/access/register">
                    <button @click="setSignup()" id="singup" class="btn btn-light"><b>Sign up</b></button>
                    </router-link>
                </div>
            </div>
            -->
            <!-- Aca se insertan los componentes login y register -->     
            <router-view></router-view>      
        </div>
       
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

    methods:{
     },
    computed: {

    }
}

</script>

<style scoped lang="css">
* {
  margin: 0;
}

.src-components-access {
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/access-background-2.jpg");
  background-size: cover;
  font-family: "Montserrat", sans-serif;
  display: flex;
  align-items: center;
}
.src-components-access .container {
  margin: 0 auto;
}
.access-box {
  background: #000000aa;
  color: #fff;
}

.access-box form {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

#options button {
  width: 160px;
  padding: 7px;
}

#options button:hover {
  background-color: rgb(189, 200, 200);
}

.banner {
  height: 85px;
  width: 87px;
  border-radius: 50%;
  text-align: center;
  z-index: 1;
  position: relative;
  top: -2rem;
  left: 47%;
}

@media (max-width: 768px) {
  .access-box {
    padding: 10px;
  }

}
</style>
