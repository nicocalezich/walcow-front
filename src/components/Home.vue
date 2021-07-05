<template>
  <section>
    <div class="container-fluid general">
      <h1 class="my-1">Overview</h1>
      <ul class="transactions">
        <li class="tr_li">
          <router-link :to="{path: 'deposit'}">
            <button class="btn btn-warning">Deposit</button>
          </router-link>
        </li>
        <router-link :to="{path: 'withdraw'}">
          <li class="tr_li">
            <button class="btn btn-warning">Withdraw</button>
          </li>
         </router-link>
      </ul>
    </div>
    <div class="container-fluid general balance fiat-balance">
      <div>
        <p class="text-black-50">Balance</p>
        <h2>${{ totalInUSD ? totalInUSD : 0 | globalFixed }}</h2>
        <pre>≈ {{ totalInUSD && bitcoinPrice ? totalInUSD / bitcoinPrice : 0 }} BTC</pre>
      </div>
      <div id="fiat">
        <p class="text-black-50">Fiat</p>
        <h2>${{getBalance | globalFixed}}</h2>
      </div>
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
              <img :src="w.tokenData.image.thumb" style="margin-right: 5px; margin-top:2.5px; float: left" alt="">
              <div>
                <span>{{w.tokenData.symbol.toUpperCase()}}</span>
                <br>
                <a href="" class="cripto-link">{{ w.tokenData.name }}</a>
              </div>
            </div>
          </td>
          <td>{{ w.quantity }} {{ w.tokenData.symbol.toUpperCase() }}</td>
          <td>${{ (w.quantity * w.tokenPrice) | globalFixed }}</td>
          <td>
            <router-link :to="{path: '/transaction/buy', query: {crypto: w.token}}">
              <a href="#" class="actions">Buy</a>
            </router-link>
            <router-link :to="{path: '/transaction/sell', query: {crypto: w.token}}">
              <a href="#" class="actions">Sell</a>
            </router-link>
            <router-link :to="{path: '/withdraw'}">
              <a href="#" class="actions">Withdraw</a>
            </router-link>
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
    this.checkAccess()
    this.setBitcoinPrice()
    this.calculateTotal()
    this.setWallets()
  },
  props: {},
  methods: {
    async setBitcoinPrice() {
      let result = await fetch('https://walcow-api.herokuapp.com/api/tokens/price/bitcoin')
      let json = await result.json()
      this.bitcoinPrice = json.result.price
    },
    async calculateTotal() {
      let result = await fetch('https://walcow-api.herokuapp.com/api/wallets/total', {
        headers: {
          'auth-token': window.localStorage.token
        }
      })
      let json = await result.json()
      this.totalInUSD = json.result
      this.totalInBTC = this.totalInUSD / this.bitcoinPrice
    },
    async setWallets() {
      let result = await fetch('https://walcow-api.herokuapp.com/api/wallets', {
        headers: {
          'auth-token': window.localStorage.token
        }
      })
      let json = await result.json()
      let wallets = json.result
      for (const w of wallets) {
        let result = await fetch('https://walcow-api.herokuapp.com/api/tokens/' + w.token)
        w.tokenData = await result.json()
        w.tokenPrice = await this.getPrice(w.token)
        this.wallets.push(w)
      }
    },
    async getPrice(token) {
      let result = await fetch('https://walcow-api.herokuapp.com/api/tokens/price/' + token)
      let json = await result.json()
      return json.result.price
    }
  },
  data() {
    return {
      bitcoinPrice: 0,
      wallets: [],
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

.fiat-balance{
  display: flex !important;
}

.fiat-balance #fiat{
  padding: 0 100px;
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