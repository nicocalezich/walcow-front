<template>

  <section class="src-components-sell">
       <div class="buy-box">
     <vue-form :state="formState" @submit.prevent="enviar()">
       <br>
        <h1>Sell</h1>
        <!-- user -->
        <div class="input-container">
          <validate tag="div">        
            <label class="label-type" for="user">I want to sell</label>     
            <br>
            <select class="buy-inputs" name="cryptocurrency" id="cryptocurrency">
              <option selected value="1">Bitcoin</option>
              <option value="1">Etherum</option>
              <option value="2">ADA</option>
              <option value="3">Dogecoin</option>
              <option value="4">Cowcoin</option>
            </select>
          </validate>
           <label class="label-type"><i>1 btc = ${{this.criptoPrice}} USD </i></label>
        </div>

        <!-- amount -->
        <div class="input-container">
          <validate tag="div">
            <label class="label-type" for="amount">I want to obtain</label>
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
        </div>
        <div class="amount-bought-error" v-if="this.formData.amount < 0">
          <label><b>Amount is invalid</b></label>
        </div>
        <div v-else class="amount-bought">
          <label>You will sell <b>{{calculatePurchase}}</b> Bitcoin for U$S {{this.formData.amount}}</label>
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
    name: 'src-components-sell',
    props: [],
    mounted () {

    },
    data () {
      return {
        formData: this.getInicialData(),
        formState: {},
        balance: 2520,
        criptoPrice: 0,
        cp: []

      }
    },
    methods: {
   getInicialData(){
        return {amount: 0}
      },

      enviar(){
        console.log(this.formData.amount)
      },

      async getCryptos() {
        let res = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
        let json = await res.json()
        this.criptoPrice = json.market_data.current_price.usd
        json.map(c => {
          this.cp.push(c)
        })
      }

    },
    computed: {
      calculatePurchase(){
        return (this.formData.amount / this.criptoPrice).toFixed(8)
      }
    }
}


</script>

<style scoped lang="css">
.src-components-sell{
background-color: #fff;
box-shadow: 0px 2px 4px rgb(0 0 0 / 4%);
}

h1{
  color:black;
}

.amount-bought{
  color: black;
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
