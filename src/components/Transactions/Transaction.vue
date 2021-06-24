<template>

  <section class="src-components-transaction">
       <div class="container">
        <div class="transaction-box">
           <router-link to="/transaction/buy"><button>Buy</button></router-link>
           <router-link to="/transaction/sell"><button>Sell</button></router-link>
          <router-view></router-view>      
        </div>
    </div>    
  </section>

</template>

<script lang="js">

  export default  {
    name: 'src-components-transaction',
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
 .src-components-transaction {
  width: 100vw;
  height: 100vh;
  background-size: cover;
  font-family: "Montserrat", sans-serif;
  display: flex;
  align-items: center;
}
.src-components-access .container {
  margin: 0 auto;
}
.transaction-box {
  background: #000000aa;
  color: #fff;
  text-align: center;
}

.transaction-box button{ 
  width: 200px;
}

.transaction-box form {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

</style>
