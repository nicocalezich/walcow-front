<template>

  <section class="src-components-navbar">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link to="/home">
        <a class="navbar-brand banner" href="#">
          <img src="../assets/banner-navbar-2 copia.png" width="125" height="30" alt=""
          class="d-inline-block align-top">
        </a>
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/home">
              <a class="nav-link" href="#" id="home"
                 aria-haspopup="true" aria-expanded="false">
                Overview
              </a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/transaction/buy">
              <a class="nav-link" href="#" id="compra"
                 aria-haspopup="true" aria-expanded="false">
                Buy
              </a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/transaction/sell">
              <a class="nav-link" href="#" id="venta"
                 aria-haspopup="true" aria-expanded="false">
                Sell
              </a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/deposit">
              <a class="nav-link" href="#">
                Deposit
              </a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/withdraw">
              <a class="nav-link" href="#">
                Withdraw
              </a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/markets">
              <a class="nav-link" href="#">
                Markets
              </a>
            </router-link>
          </li>
          
        </ul>
      </div>
       <span class="navbar-text">
          <a href="#" class="right-li">
              Welcome, {{this.$store.state.user.firstname.charAt(0).toUpperCase() + this.$store.state.user.firstname.slice(1)}}
          </a>
        </span>
        <span class="navbar-text">
            <a @click="logout()" class="right-li"  href="#" style="color: #d40101 !important">
              Log out
            </a>
        </span> 
    </nav>
  </section>

</template>

<script lang="js">

export default {
  name: 'src-components-navbar',
  props: [],
  mounted() {

  },
  data() {
    return {}
  },
  methods: {

    logout() {
      window.localStorage.removeItem('token')
      this.$store.dispatch('access', false)
      this.$router.push('/access')
    }

  },
  computed: {}
}

</script>

<style scoped lang="css">
nav {
  padding: 10px;
}

nav a {
  text-decoration: none;
}

.right-li{
  padding: 0 15px;
}

</style>
