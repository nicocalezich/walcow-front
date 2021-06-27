<template>

  <section class="src-components-buy">
    <div class="buy-box">
      <vue-form :state="formState" @submit.prevent="send()">
        <br>
        <h1>Sell</h1>
        <!-- crypto -->
        <div class="input-container">
          <validate tag="div">
            <label class="label-type" for="user">I want to sell</label>
            <br>
            <select @click="changeData()" class="buy-inputs" name="cryptocurrency" id="cryptocurrency">
              <option v-for="(c,i) in cryptos" :key="i" :value="i">{{ c.name }}</option>
            </select>
          </validate>
          <label class="label-type"><i>{{ `1 ${this.selectedCrypto} = $${this.priceselectedCrypto} USD` }}</i></label>
        </div>

        <!-- amount -->
        <div class="input-container">
          <validate tag="div">
            <label class="label-type" for="amount">Fraction of {{ this.selectedCrypto }} I want to sell</label>
            <br>
            <input
                class="buy-inputs"
                name="amount"
                id="amount"
                type="number"
                placeholder="Enter amount"
                v-model.trim="formData.amount"
                required
            />
          </validate>
          <br>
        </div>

        <div class="amount-bought-error" v-if="negativeAmount">
          <label><b>Amount is invalid</b></label>
        </div>
        <div class="amount-bought-error" v-else-if="insufficientBalance">
          <label><b>insufficient balance</b></label>
        </div>
        <div v-else class="amount-bought">
          <label>You will sell <b>{{ this.formData.amount }}</b> {{ this.selectedCrypto }} for
            <b>${{ calculateSell }}</b> USD </label>
        </div>

        <div v-if="!sellSuccess">
          <button :disabled="formState.$invalid || this.formData.amount <= 0 || insufficientBalance" type="submit"
                  class="btn btn-light confirm">Confirm sale
          </button>
        </div>
        <div v-else>
          <div class="alert alert-success" role="alert">
            successful sale
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 class="bi bi-check-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path
                  d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
            </svg>
          </div>
          <a type="button" @click="reset()" class="btn btn-light buy-again">Sell again</a>
        </div>

      </vue-form>
    </div>
  </section>

</template>

<script lang="js">

export default {
  name: 'src-components-buy',
  props: {
    crypto: {
      type: String,
      default: ''
    }
  },
  mounted() {
    this.getCryptos()
  },
  data() {
    return {
      formData: this.getInicialData(),
      formState: {},
      cryptos: [],
      cryptosNames: [],
      selectedCrypto: '',
      priceselectedCrypto: 0,
      sellSuccess: false
    }
  },
  //json.market_data.current_price.usd
  methods: {

    getInicialData() {
      return {amount: 0}
    },

    send() {
      let sell = {
        crypto: this.getSelectedCyrptoName(),
        amount: this.formData.amount,
        price: this.calculateSell
      }
      this.sellSuccess = true
      console.log(sell)
    },

    reset() {
      this.sellSuccess = false
      this.formData.amount = 0
    },

    changeData() {
      this.selectedCrypto = this.getSelectedCyrptoName()
      this.priceselectedCrypto = this.getSelectedCryptoPrice()
    },

    async getCryptos() {
      let res = await fetch('https://api.coingecko.com/api/v3/coins')
      let json = await res.json()
      json.map(c => {
        this.cryptos.push(c)
        this.cryptosNames.push(c.name)
      })
      this.setInitialValues()
    },

    setInitialValues() {
      this.selectedCrypto = this.cryptos[0].name
      this.priceselectedCrypto = this.cryptos[0].market_data.current_price.usd
    },

    getSelectedCyrptoName() {
      let e = document.querySelector("#cryptocurrency");
      return e.options[e.selectedIndex].text;
    },

    getSelectedCryptoPrice() {
      let index = this.cryptosNames.indexOf(this.getSelectedCyrptoName())
      return this.cryptos[index].market_data.current_price.usd
    },
  },
  computed: {
    calculateSell() {
      return (this.formData.amount * this.priceselectedCrypto).toFixed(2)
    },

    negativeAmount() {
      return this.formData.amount < 0
    },

    insufficientBalance() {
      return this.formData.amount > this.balance
    }

  }
}

</script>

<style scoped lang="css">

.src-components-buy {
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

.buy-inputs {
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

.buy-again {
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
