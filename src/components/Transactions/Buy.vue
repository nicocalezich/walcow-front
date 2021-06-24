<template>

  <section>
    <div class="buy-box">
     <vue-form :state="formState" @submit.prevent="enviar()">
        <h1>Buy</h1>
        <!-- user -->
        <div class="input-container">
          <validate tag="div">   
            <label class="label-type" for="user">I want to buy</label>
            <br>
            <select class="buy-inputs" name="cryptocurrency" id="cryptocurrency">
              <option selected value="1">Value 1</option>
              <option value="2">Value 2</option>
            </select>
          </validate>
        </div>

        <!-- amount -->
        <div class="input-container">
          <validate tag="div">
            <label for="amount">I want to spend</label>
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
  margin-bottom: 10px;
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
</style>
