<template>

  <section  class="src-components-buy">
    <div class="buy-box">
     <vue-form :state="formState" @submit.prevent="send()">
       <br>
        <h1>Buy</h1>
        <!-- user -->
        <div class="input-container">
          <validate tag="div">        
            <label class="label-type" for="user">I want to buy</label>     
            <br>
            <select @click="changeData()" class="buy-inputs" name="cryptocurrency" id="cryptocurrency">
              <option v-for="(c,i) in cryptos" :key="i" :value="i">{{c.name}}</option>
            </select>
          </validate>
           <label class="label-type"><i>{{`1 ${this.selectedCrypto} = $${this.priceselectedCrypto} USD`}}</i></label>
        </div>

        <!-- amount -->
        <div class="input-container">
          <validate tag="div">
            <label class="label-type" for="amount">I want to spend</label>
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
            <label class="label-type"><i>current balance $2,520</i></label>
          </validate>
        </div>
        <div class="amount-bought-error" v-if="this.formData.amount < 0">
          <label><b>Amount is invalid</b></label>
        </div>
        <div v-else class="amount-bought">
          <label>You will buy <b>{{calculatePurchase}}</b> {{this.selectedCrypto}}</label>
        </div>
        <br>
        <div>
          <button :disabled="formState.$invalid || this.formData.amount <= 0" type="submit" class="btn btn-light confirm">Confirm transaction</button>
        </div>
      </vue-form>
    </div>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'src-components-buy',
    props: [],
    mounted () {
      this.getCryptos()
    },
    data () {
      return {
        formData: this.getInicialData(),
        formState: {},
        balance: 2520,
        criptoPrice: 2,
        cryptos: [],
        cryptosNames: [],
        selectedCrypto: '',
        priceselectedCrypto: 0
      }
    },
    //json.market_data.current_price.usd
    methods: {

      getInicialData(){
        return {amount: 0}
      },

      send(){
        console.log(this.getSelectedCyrptoName(),this.formData.amount)
      },

      changeData(){
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

      setInitialValues(){
        this.selectedCrypto = this.cryptos[0].name
        this.priceselectedCrypto = this.cryptos[0].market_data.current_price.usd 
      },

      getSelectedCyrptoName(){
        let e = document.querySelector("#cryptocurrency");
        return e.options[e.selectedIndex].text;
      },

      getSelectedCryptoPrice(){
        let index = this.cryptosNames.indexOf(this.getSelectedCyrptoName())
        return this.cryptos[index].market_data.current_price.usd
        },
    },
    computed: {
      calculatePurchase(){
        return (this.formData.amount / this.priceselectedCrypto).toFixed(8)
      }
       
    }
    
}


</script>

<style scoped lang="css">

.src-components-buy{
background-color: #fff;
box-shadow: 0px 2px 4px rgb(0 0 0 / 4%);
}

h1{
  color:black;
}

.amount-bought{
  color: black;
}

.amount-bought-error{
  color: red;
}

.buy-inputs{
  width: 90%;
  margin-bottom: 0px;
  margin-top: 10px;
  border: none;
  border-bottom: 1px solid black;
  background: transparent;
  outline: none;
}

.input-container{
  padding: 15px;
}

.label-type{
  width: 90%;
  text-align: left;
  font-size: 12px;
  color: black;
}

.confirm{
  width: 75%;
  margin-top: 15px;
  border-radius: 20px;
  border:none;
  cursor:pointer;
  text-align: center;

}

button{ 
  background-color: #ffc107;
}


</style>
