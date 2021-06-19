<template>
  <section>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">
        <img src="../../assets/banner-3.jpg" width="30" height="30" alt="" class="d-inline-block align-top">
        Walcow
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="compra" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">
              Comprar cripto
            </a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="mercados" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">
              Mercados
            </a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="wallet" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">
              Billetera
            </a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="orders" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">
              Órdenes
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container-fluid general">

      <h1 class="my-3">Visión general</h1>
      <button class="btn btn-warning transactions">Depositar</button>
      <button class="btn btn-light transactions">Transferir</button>
      <button class="btn btn-light transactions">Retirar</button>
      <a href="#" class="actions">Historial de transacciones</a>
    </div>
    <div class="container-fluid general balance">
      <p class="text-black-50">Balance aproximado</p>
      <h2>$1800.00</h2>
    </div>
    <div class="container-fluid general balance">
      <p class="text-black-50">Balance de criptomonedas</p>
      <table class="table table-hover table-responsive">
        <thead class="thead">
        <tr>
          <th scope="col">Moneda</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Total USD</th>
          <th scope="col">Acciones</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            <div class="cripto">
              <img src="../../assets/eth.png" style="margin-right: 5px; float: left" alt="">
              <div>
                <span>ETH</span>
                <br>
                <a href="" class="cripto-link">Ethereum</a>
              </div>
            </div>
          </td>
          <td>0.50</td>
          <td>$1500</td>
          <td>
            <a href="#" class="actions">Comprar</a>
            <a href="#" class="actions">Depositar</a>
            <a href="#" class="actions">Retirar</a>
          </td>
        </tr>
        <tr>
          <td>
            <div class="cripto">
              <img src="../../assets/btc_png.png" style="margin-right: 5px; float: left" alt="">
              <div>
                <span>BTC</span>
                <br>
                <a href="" class="cripto-link">Bitcoin</a>
              </div>
            </div>
          </td>
          <td>0.2</td>
          <td>$25000</td>
          <td>
            <a href="#" class="actions">Comprar</a>
            <a href="#" class="actions">Depositar</a>
            <a href="#" class="actions">Retirar</a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Profile"
}
</script>

<style scoped>
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

.transactions {
  margin-right: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: rgb(234 236 239) 0 0 0 1px inset;
}

a {
  color: rgb(112, 122, 138);
}

.actions {
  color: #ffc107;
  margin-right: 0.6rem !important;
  vertical-align: top;
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

.cripto-link {
  font-size: 12px !important;
}

</style>