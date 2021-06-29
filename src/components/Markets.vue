<template lang="html">
  <section>
    <div class="container-fluid general balance">
      <p class="text-black-50">Markets</p>
      <table class="table table-hover table-responsive">
        <thead class="thead">
        <tr>
          <th scope="col">Cryptocurrency</th>
          <th scope="col">Price</th>
          <th scope="col">Variation 24h</th>
          <th scope="col">Market cap</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(c,i) in cryptos" :key="i">
          <td>
            <img :src=c.image.thumb alt="">
            {{ c.name }}
          </td>
          <td>
            {{
              c.market_data.current_price.usd.toLocaleString('en-US', {
                style: 'currency', currency: 'USD', minimumFractionDigits: 6
              })
            }}
          </td>
          <td :style="checkVariation(c.market_data.price_change_percentage_24h)">
            {{addPlus(c.market_data.price_change_percentage_24h)}}{{c.market_data.price_change_percentage_24h.toFixed(4)}}%
          </td>
          <td>
            {{
              (c.market_data.market_cap.usd).toLocaleString('en-US', {
                style: 'currency', currency: 'USD', minimumFractionDigits: 6
              })
            }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script lang="js">

export default {
  name: 'src-components-markets',
  components: {
    //Navbar
  },
  props: [],
  mounted() {
    this.$store.dispatch('checkAccess')
    this.getCryptos()
  },
  data() {
    return {
      cryptos: []
    }
  },
  methods: {
    async getCryptos() {
      let res = await fetch('https://api.coingecko.com/api/v3/coins')
      let json = await res.json()
      json.map(c => {
        this.cryptos.push(c)
      })
    },

    checkVariation(value){
      if(value > 0){
        return {color: '#1D9D3A'}
      }
      else if(value < 0){
         return {color: '#DA3113'}
      }
      else{
        return {color: 'black'}
      }
    },

  addPlus(value){
    let simbol = ''
      if (value > 0){
        simbol =  '+'
      }
    return simbol
    }
  },

  computed: {}
}


</script>

<style scoped lang="css">
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

.balance {
  width: 95%;
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
</style>
