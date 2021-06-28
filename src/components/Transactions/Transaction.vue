<template>

  <section class="src-components-transaction">
    <div class="transaction-box">
      <div class="transaction-box-buttons">
        <router-link to="/transaction/buy">
          <button id="buy" @click="selectBuy()" class="btn btn-light confirm">Buy</button>
        </router-link>
        <router-link to="/transaction/sell">
          <button id="sell" @click="selectSell()" class="btn btn-light confirm">Sell</button>
        </router-link>
      </div>
      <router-view></router-view>
    </div>
  </section>

</template>

<script lang="js">

export default {
  name: 'src-components-transaction',
  props: [],
  mounted() {
    this.checkSelectedComponent()
  },
  beforeUpdate() {
    this.checkSelectedComponent()
  },
  data() {
    return {}
  },
  methods: {

    checkSelectedComponent() {
      console.log("CHECK: " + this.$route.path)
      if (this.$route.path === '/transaction/buy') {
        document.querySelector('#buy').style.borderBottom = '2px solid #ffc107'
        document.querySelector('#sell').style.borderBottom = 'none'
      } else if (this.$route.path === '/transaction/sell') {
        document.querySelector('#sell').style.borderBottom = '2px solid #ffc107'
        document.querySelector('#buy').style.borderBottom = 'none'
      }
    },

    selectBuy() {
      document.querySelector('#buy').style.borderBottom = '2px solid #ffc107'
      document.querySelector('#sell').style.borderBottom = 'none'
    },

    selectSell() {
      document.querySelector('#sell').style.borderBottom = '2px solid #ffc107'
      document.querySelector('#buy').style.borderBottom = 'none'
    },

    computed: {}
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
  place-content: center;
  justify-content: center;
  align-self: center;
  background-color: #f5f5f5 !important;

}

.transaction-box {
  background-color: #fff;
  color: #fff;
  text-align: center;
  width: 40vw;
  padding-bottom: 20px;
  box-shadow: 0px 2px 4px rgb(0 0 0 / 4%);
}

.transaction-box-buttons {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
}

button:hover {
  border-bottom: 2px solid #ffc107;
}

.transaction-box form {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.transaction-box-buttons a {
  width: 50%
}

.transaction-box-buttons a button {
  width: 100%;
  box-shadow: none !important;
}

</style>
