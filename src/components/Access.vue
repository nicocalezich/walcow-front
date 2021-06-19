<template>
  <section class="src-components-access">
    <div class="container">
        <div class="access-box">
            <img class="banner" src="../assets/banner-3.jpg" alt="banner">
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
            <!--Aca se insertan los componentes login y register -->
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

#options button:hover {
  background-color: rgb(189, 200, 200);
}

.banner {
    height: 85px;
    width: 87px;
    border-radius: 50%;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 1;
    top: -3rem;
}

@media screen and (max-width: 1024px){



}




</style>
