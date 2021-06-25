<template lang="html">
  <section>
    <div class="container-fluid general balance">
      <p class="text-black-50">Mercados</p>
      <table class="table table-hover table-responsive">
        <thead class="thead">
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Precio</th>
          <th scope="col">Total</th>
          <th scope="col">Acciones</th>
        </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>
  </section>
</template>

<script lang="js">

//import Navbar from "./Navbar";

export default {
  name: 'src-components-markets',
  components: {
    //Navbar
  },
  props: [],
  mounted() {
    this.getCryptos()
  },
  data() {
    return {
      cp: []
    }
  },
  methods: {
    async getCryptos() {
      let res = await fetch('https://api.coingecko.com/api/v3/coins')
      let json = await res.json()
      json.map(c => {
        this.cryptos.push(c)
      })
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
