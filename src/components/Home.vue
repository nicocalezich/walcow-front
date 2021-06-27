<template>
  <section>
    <div class="container-fluid general">
      <h1 class="my-1">Overview</h1>
      <ul class="transactions">
        <li class="tr_li">
          <button class="btn btn-warning">Deposit</button>
        </li>
        <li class="tr_li">
          <button class="btn btn-light">Transfer</button>
        </li>
        <li class="tr_li">
          <button class="btn btn-light">Withdraw</button>
        </li>
        <li class="tr_li">
          <a href="#" class="actions">Transaction history</a>
        </li>
      </ul>
    </div>
    <div class="container-fluid general balance">
      <p class="text-black-50">Balance</p>
      <h2>${{ totalInUSD }}</h2>
      <pre>≈ {{ totalInUSD / bitcoinPrice }} BTC</pre>
    </div>
    <div class="container-fluid general balance">
      <p class="text-black-50">My wallet</p>
      <table class="table table-hover table-responsive">
        <thead class="thead">
        <tr>
          <th scope="col">Cryptocurrency</th>
          <th scope="col">Amount</th>
          <th scope="col">Total</th>
          <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(w, i) in wallets" :key="i">
          <td>
            <div class="cripto">
              <img :src="w.token.logo" style="margin-right: 5px; float: left" alt="">
              <div>
                <span>{{ w.token.code }}</span>
                <br>
                <a href="" class="cripto-link">{{ w.token.name }}</a>
              </div>
            </div>
          </td>
          <td>{{ w.quantity }} {{ w.token.code }}</td>
          <td>${{ w.quantity * w.token.price }}</td>
          <td>
            <router-link :to="{path: '/transaction/buy/' + w.token.code}">
              <a href="#" class="actions">Buy</a>
            </router-link>
             <router-link :to="{path: '/transaction/sell/' + w.token.code}">
              <a href="#" class="actions">Sell</a>
            </router-link>
            <a href="#" class="actions">Withdraw</a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div>
    </div>
  </section>
</template>

<script>

export default {
  name: "Home",
  components: {},
  mounted() {
    this.$store.dispatch('checkAccess')
    this.setBitcoinPrice()
    this.calculateTotal()
  },
  props: {
    user: {
      token: "416c3a405ba1c59b0a3366ab31e02fe21fd1a047",
      fiat: 1000,
      username: "nicocalezich",
      email: "ncalezich@gmail.com",
      firstname: "Nicolás",
      lastname: "Calezich",
      wallets: [
        "60ca9cd60d840344243c537b",
        "60ca9cd60d840344243c537c"
      ]
    },
  },
  methods: {
    async setBitcoinPrice() {
      let result = await fetch('https://walcow-api.herokuapp.com/api/tokens/price/bitcoin')
      let json = await result.json()
      console.log(json)
      this.bitcoinPrice = json.result.price
    },
    calculateTotal() {
      this.wallets.map(w => {
        this.totalInUSD += w.quantity * w.token.price
      })
      this.totalInBTC = this.totalInUSD / this.bitcoinPrice
    }
  },
  data() {
    return {
      bitcoinPrice: 0,
      wallets: [
        {
          "id": "60ca9cd60d840344243c537b",
          "token": {
            "id": "1289031290319023",
            "code": "BTC",
            "name": "Bitcoin",
            "logo": require("../assets/btc_png.png"),
            "btcRelation": 1,
            "price": 25000
          },
          "quantity": 10
        },
        {
          "id": "60ca9cd60d840344243c537c",
          "token": {
            "id": "1289031290319023",
            "code": "ETH",
            "name": "Ethereum",
            "logo": require("../assets/eth.png"),
            "btcRelation": 0.0647,
            "price": 4000
          },
          "quantity": 40
        }
      ],
      totalInUSD: 0,
      totalInBTC: 0
    }
  }
}
</script>

<style scoped>
section {
  background-color: #f5f5f5 !important;
}

.general {
  background-color: white;
  line-height: 1.25;
  box-shadow: 0px 2px 4px rgb(0 0 0 / 4%);
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 24px;
}

.tr_li {
  margin-right: 1.5rem;
  box-shadow: rgb(234 236 239) 0 0 0 1px inset;
}

a {
  color: rgb(112, 122, 138);
}

.actions {
  color: #ffc107;
  margin-right: 0.6rem !important;
  vertical-align: top;
}

.balance {
  width: 95%;
}

.thead {
  background-color: rgb(245, 245, 245)
}

th {
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-size: 12px;
  color: rgb(112, 122, 138);
}

td {
  font-size: 14px;
  vertical-align: middle;
}

.cripto-link {
  font-size: 12px !important;
}

.transactions {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  list-style: none;
  padding: 5px;
}

</style>