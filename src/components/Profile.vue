<template>
  <section class="src-components-profile">
    <h1>Profile</h1>
    <div class="data-container">
      <h5>User data</h5>
      <hr />
      <div class="data">
        <h6>First name</h6>
        <i>{{ this.$store.state.user.firstname }}</i>
        <h6>Last name</h6>
        <i>{{ this.$store.state.user.lastname }}</i>
        <h6>Username</h6>
        <i>{{ this.$store.state.user.username }}</i>
        <h6>Email</h6>
        <i>{{ this.$store.state.user.email }}</i>
      </div>
    </div>
    <div class="data-container">
      <h5>Transactions data</h5>
      <hr />
      <div class="transaction-data-container">
        <Cbus/>
        <Cards/>
      </div>
    </div>
  </section>
</template>

<script lang="js">

import Cbus from "./Cbus";
import Cards from "./Cards";

export default  {
    name: 'src-components-profile',
  components: {Cards, Cbus},
  props: [],
    mounted () {
      this.checkAccess()
    }
}

</script>

<style scoped lang="css">
.src-components-profile {
  padding: 25px;
  background-color: #f5f5f5;
}

.data-container {
  box-shadow: 0px 2px 4px rgb(0 0 0 / 4%);
  padding: 10px;
  margin: 25px 10px;
  background-color: white;
}

.transaction-data-container {
  display: flex;
  margin-top: 10px;
}

.data {
  display: block;
  padding: 15px 25px;
}

h6 {
  margin: 10px 0 0 0;
}

hr {
  margin: 0%;
}

</style>
