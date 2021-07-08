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
         <router-link to="/profile">
          <a href="#" class="right-li">
              Welcome, {{ username | capitalize }}
          </a>
           </router-link>
        </span>
        <span class="navbar-text">
            <a @click="logout()" class="right-li"  href="#" style="color: #d91818 !important">
              Log out <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                        <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                      </svg>
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
  computed: {
    username(){
      return this.$store.state.user.firstname || '';
    }
  }
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
