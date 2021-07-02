<template>

  <section class="src-components-profile">
    <h1>Profile</h1>
    <div class="data-container">
        <h5>User data</h5>
        <div class="cbus">
          <p>Frist name:</p>
          <p>Last name:</p>
          <p>Username:</p>
          <p>Email:</p>
        </div>
    </div>
    <div class="data-container">
      <h5>Transactions data</h5>
      <div class="transaction-data-container">
        <div class="cbus">
          <h6>Yours CBUs</h6>
          <p>2464353243432</p>
          <p>2464353243432</p>
          <p>2464353243432</p>
          <p>2464353243432</p>
        </div> 
         <div class="cbus">
          <h6> Yours credit & debit cards</h6>
          <p>2464353243432</p>
          <p>2464353243432</p>
          <p>2464353243432</p>
          <p>2464353243432</p>
        </div> 
      </div>
    </div>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'src-components-profile',
    props: [],
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-profile {
    padding: 25px;
    background-color: #f5f5f5;
  }

  .data-container{
    box-shadow: 0px 2px 4px rgb(0 0 0 / 4%);
    padding: 10px;
    margin: 25px 10px;
    background-color: white;
  
  }

  .transaction-data-container{
    display: flex;
  }

  .cbus{
    display: block;
    padding: 15px 25px;
  }
</style>
