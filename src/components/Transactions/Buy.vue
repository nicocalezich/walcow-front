<template>

  <section class="src-components-buy">
     <vue-form :state="formState" @submit.prevent="enviar()">
        <h1>Buy</h1>
        <!-- user -->
        <validate tag="div">
          <label for="user">I want to buy</label>
          <br>
          <select
            name="cryptocurrency"
            id="cryptocurrency"
            type="text"
            placeholder="Enter username"
            v-model.trim="formData.username"
            required
          />
          
        </validate>

        <!-- amount -->
        <validate tag="div">
          <label for="amount">I want to spend</label>
          <br>
          <input
            name="amount"
            id="amount"
            type="number"
            placeholder="Enter amount"
            v-model.trim="formData.amount"
            required
          />
        </validate>
       
        <br>
        <br>
      </vue-form>
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
  .src-components-buy {

  }



  .container input {
  margin-bottom: 10px;
  margin-top: 10px;
  border: none;
  border-bottom: 1px solid #fff;
  background: transparent;
  outline: none;
  color: #fff;
}


</style>
