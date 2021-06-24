<template>

  <section class="src-components-sell">
        <vue-form :state="formState" @submit.prevent="enviar()">
        <h1>Sell</h1>
        <!-- user -->
        <validate tag="div">
          <label for="user">I want to sell</label>
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
    name: 'src-components-sell',
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
  .src-components-sell {

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
