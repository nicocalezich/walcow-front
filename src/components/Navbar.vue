<template>

  <section class="src-components-navbar">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">
        <img src="../assets/banner-3.jpg" width="30" height="30" alt="" class="d-inline-block align-top">
        Walcow
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="compra" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">
              Comprar cripto
            </a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="mercados" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">
              Mercados
            </a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="wallet" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">
              Billetera
            </a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="orders" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">
              Órdenes
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'src-components-navbar',
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
  nav{
    padding: 10px;
  }
</style>
