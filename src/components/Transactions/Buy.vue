<template>

  <section>
    <div class="buy-box">
     <vue-form :state="formState" @submit.prevent="enviar()">
       <br>
        <h1>Buy</h1>
        <!-- user -->
        <div class="input-container">
          <validate tag="div">        
            <label class="label-type" for="user">I want to buy</label>     
            <br>
            <select class="buy-inputs" name="cryptocurrency" id="cryptocurrency">
              <option selected value="1">Bitcoin</option>
              <option value="1">Etherum</option>
              <option value="2">ADA</option>
              <option value="3">Dogecoin</option>
              <option value="4">Cowcoin</option>
            </select>
          </validate>
        </div>

        <!-- amount -->
        <div class="input-container">
          <validate tag="div">
            <label class="label-type" for="amount">I want to spend </label>
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
        <div>
          <label>You will buy 0.2321 BITCOIN </label>
        </div>
        <br>
        <div>
          <button>Confirm transaction</button>
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

    },
    data () {
      return {
        formData: '',
        formState: {},

      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped lang="css">

.buy-inputs{
  width: 90%;
  margin-bottom: 0px;
  margin-top: 10px;
  border: none;
  border-bottom: 1px solid #fff;
  background: transparent;
  outline: none;
  color: #fff;
}

.input-container{
  padding: 15px;
}

.label-type{
  width: 90%;
  text-align: left;
  font-size: 12px;
}

</style>
