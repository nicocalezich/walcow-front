<template>

  <section class="src-components-sell">
    <div class="sell-box">
      <vue-form :state="formState" @submit.prevent="send()">
        <br>
        <h1>Sell</h1>
        <!-- crypto -->
        <div class="input-container">
          <validate tag="div">
            <label class="label-type">I want to sell</label>
            <br>
            <select @change="changeData()" class="sell-inputs" name="cryptocurrency" id="cryptocurrency">
              <option v-for="(c,i) in cryptos" :key="i" :value="c.tokenData.id" :selected="crypto === c.tokenData.id">
                {{ c.tokenData.name }}
              </option>
            </select>
          </validate>
          <label class="label-type">
            <i>
              1 {{ selectedCryptoName }} = ${{ selectedCryptoPrice }} USD
            </i>
          </label>
        </div>
        <!-- amount -->
        <div class="input-container">
          <validate tag="div">
            <label class="label-type" for="amount">Amount of {{ this.selectedCryptoName }} I want to sell</label>
            <br>
            <input
                class="sell-inputs"
                name="amount"
                id="amount"
                type="number"
                placeholder="Enter amount"
                v-model.trim="formData.amount"
                required
            />
            <label class="label-type"><i>You own {{ selectedCryptoQuantity }} {{ selectedCryptoName }}
              (${{ selectedCryptoQuantityToUSD.toFixed(2) }})</i></label>
          </validate>
        </div>
        <div class="amount-bought-error" v-if="negativeAmount">
          <label><b>Amount is invalid</b></label>
        </div>
        <div class="amount-bought-error" v-else-if="insufficientBalance">
          <label><b>Invalid amount of {{selectedCryptoName}}</b></label>
        </div>
        <div v-else class="amount-bought">
          <label>You will sell <b>{{ this.formData.amount }}</b> {{ this.selectedCryptoName }} for
            <b>${{ calculateSell }}</b> USD </label>
        </div>

        <div v-if="!sellSuccess">
          <button :disabled="formState.$invalid || this.formData.amount <= 0 || insufficientBalance" type="submit"
                  class="btn btn-light confirm">Confirm sale
          </button>
        </div>
        <div v-else>
          <div class="alert alert-success" role="alert">
            Successful sale
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 class="bi bi-check-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path
                  d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
            </svg>
          </div>
          <a type="button" @click="reset()" class="btn btn-light sell-again">Go home</a>
        </div>
      </vue-form>
    </div>
  </section>

</template>

<script lang="js">

export default {
  name: 'src-components-sell',
  props: {
    crypto: {
      type: String,
      default: ''
    }
  },
  mounted() {
    this.checkAccess()
    this.getCryptos().then(() => this.setInitialValues())
  },
  data() {
    return {
      formData: this.getInicialData(),
      formState: {},
      cryptos: [],
      selectedCrypto: this.crypto ? this.crypto : '',
      selectedCryptoName: '',
      sellSuccess: false,
      selectedCryptoPrice: 0,
      selectedCryptoQuantity: 0,
      selectedCryptoQuantityToUSD: 0
    }
  },
  methods: {
    getInicialData() {
      return {amount: 0}
    },

    send() {
      let body = {
        token: this.selectedCrypto,
        quantity: this.formData.amount,
        amount: this.calculateSell
      }
      let myHeaders = new Headers();
      myHeaders.append("Auth-Token", localStorage.getItem('token'));
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify(body);

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("https://walcow-api.herokuapp.com/api/wallets/sell", requestOptions)
          .then(() => this.sellSuccess = true,
          )
          .catch(error => console.error(error));
    },
    reset() {
      this.sellSuccess = false
      this.formData.amount = 0
      this.$router.push('/home')
    },
    changeData() {
      this.selectedCrypto = this.getSelectedCryptoValue()
      this.setPrice(this.selectedCrypto)
      this.setCryptoName(this.selectedCrypto)
      this.setCryptoQuantity(this.selectedCrypto)
      this.setCryptoQuantityToUsd(this.selectedCrypto)
    },
    async getCryptos() {
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
        this.cryptos.push(w)
      }
    },
    async getPrice(token) {
      let result = await fetch('https://walcow-api.herokuapp.com/api/tokens/price/' + token)
      let json = await result.json()
      return json.result.price
    },
    setPrice(id) {
      let crypto = this.cryptos.find(o => o.tokenData.id === id)
      this.selectedCryptoPrice = crypto.tokenData.market_data.current_price.usd
    },
    setCryptoName(id) {
      let crypto = this.cryptos.find(o => o.tokenData.id === id)
      this.selectedCryptoName = crypto.tokenData.name
    },
    setCryptoQuantity(id) {
      let crypto = this.cryptos.find(o => o.tokenData.id === id)
      this.selectedCryptoQuantity = crypto.quantity
    },
    setCryptoQuantityToUsd(id) {
      let crypto = this.cryptos.find(o => o.tokenData.id === id)
      this.selectedCryptoQuantityToUSD = crypto.quantity * crypto.tokenPrice
    },
    async setInitialValues() {
      this.selectedCrypto = this.crypto ? this.crypto : this.cryptos[0].tokenData.id
      this.setPrice(this.selectedCrypto)
      this.setCryptoName(this.selectedCrypto)
      this.setCryptoQuantity(this.selectedCrypto)
      this.setCryptoQuantityToUsd(this.selectedCrypto)
    },
    getSelectedCryptoValue() {
      let e = document.querySelector("#cryptocurrency");
      return e.options[e.selectedIndex].value;
    },
  },
  computed: {
    calculateSell() {
      return this.selectedCryptoPrice && this.formData.amount ? (this.formData.amount * this.selectedCryptoPrice).toFixed(2) : 0
    },

    negativeAmount() {
      return this.formData.amount < 0
    },

    insufficientBalance() {
      return this.formData.amount > this.selectedCryptoQuantity
    }
  }
}

</script>

<style scoped lang="css">

.src-components-sell {
  background-color: #fff;
  box-shadow: 0px 2px 4px rgb(0 0 0 / 4%);
}

h1 {
  color: black;
}

.amount-bought {
  color: black;
}

.amount-bought-error {
  color: red;
}

.sell-inputs {
  width: 90%;
  margin-bottom: 0px;
  margin-top: 10px;
  border: none;
  border-bottom: 1px solid black;
  background: transparent;
  outline: none;
}

.input-container {
  padding: 15px;
}

.label-type {
  width: 90%;
  text-align: left;
  font-size: 12px;
  color: black;
}

.confirm {
  width: 75%;
  margin-top: 15px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  text-align: center;
  background-color: #ffc107;
}

.confirm:hover {
  background-color: #eec038;
}

.alert {
  margin: 18px 0px;
}

.sell-again {
  font-size: 15px;
  background-color: white;
  padding: 0px;
  margin: 0px;
  box-shadow: none;
  border-bottom: 2px solid #ffc107;
}

option {
  font-size: 17px;
}

/* width */
*::-webkit-scrollbar {
  width: 5px;
}

/* Track */
*::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
*::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
*::-webkit-scrollbar-thumb:hover {
  background: #555;
}

</style>
