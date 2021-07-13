<template>

  <section class="src-components-deposit">
    <vue-form :state="formState" @submit.prevent="send()">
      <div class="depositContainer">
        <h1>Deposit</h1>
        <div v-if="this.cards.length" class="deposit__input">
          <validate tag="div">
            <label>Card number</label>
            <select class="deposit-inputs" name="card">
              <option v-for="(card,i) in this.cards" :key="i">{{ card }}</option>
            </select>
            <field-messages name="card" show="$dirty">
              <div slot="required" class="alert alert-danger mt-1 error"><b>Must complete this field</b></div>
            </field-messages>
          </validate>
          <div>
            <div class="type-card">
              <label @click="selectCredit()" id="label-cbox1"><input type="checkbox" checked=true id="cbox1">Credit
                card</label>
              <label @click="selectDebit()" id="label-cbox2"><input type="checkbox" id="cbox2">Debit card</label>
            </div>
          </div>
        </div>
        <div v-else>
          <i>No credit o debit card registered,</i> add
          <router-link to="/profile"><b>here</b></router-link>
        </div>

        <div class="deposit__input">
          <div>
            <label>Card expiration date</label>
            <input type="date" class="deposit-inputs" name="expired" required/>
          </div>
        </div>
        <div class="deposit__input">
          <validate tag="div">
            <label>Card pin
              <svg @click="hide()" v-show="showPin" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                   fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                <path
                    d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
              </svg>
              <svg @click="show()" v-show="!showPin" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                   fill="currentColor"
                   class="bi bi-eye-slash" viewBox="0 0 16 16">
                <path
                    d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                <path
                    d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                <path
                    d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
              </svg>
            </label>
            <input
                id="pin"
                type="password"
                class="deposit-inputs"
                name="pin"
                maxlength="4"
                required
                is-positive
                v-model.trim="formData.pin"/>
            <field-messages name="pin" show="$dirty">
              <div slot="required" class="alert alert-danger mt-1 error"><b>Must complete this field</b></div>
              <div slot="is-positive" class="alert alert-danger mt-1 error"><b>Invalid pin</b></div>
            </field-messages>
          </validate>
        </div>
        <div class="deposit__input">
          <validate tag="div">
            <label>Amount (USD)</label>
            <input
                type="number"
                class="deposit-inputs"
                name="amount"
                id="amount"
                required
                is-positive
                v-model.trim="formData.amount"
            />
            <field-messages name="amount" show="$dirty">
              <div slot="required" class="alert alert-danger mt-1 error"><b>Must complete this field</b></div>
              <div slot="is-positive" class="alert alert-danger mt-1 error"><b>Invalid amount</b></div>
            </field-messages>
          </validate>
        </div>
        <div v-if="!depositDone && !checkingCard" class="deposit__button">
          <button class="btn btn-light" :disabled="formState.$invalid || !this.cards.length" type="submit">
            Confirm deposit
          </button>
        </div>
        <div v-else-if="checkingCard">
          <div class="alert alert-warning mt-3" role="alert">
            transaction in progress, please wait...
          </div>
        </div>
        <div v-else>
          <div class="alert alert-success mt-3 success" role="alert">
            successful deposit
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 class="bi bi-check-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path
                  d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
            </svg>
          </div>
          <div class="container-deposit-again">
            <a type="button" @click="reset()" class="btn btn-light deposit-again">Deposit again</a>
          </div>
        </div>

      </div>
    </vue-form>
  </section>

</template>

<script lang="js">
import axios from "axios";

export default {
  name: 'src-components-deposit',
  props: [],
  mounted() {
    this.checkAccess()
    this.getCards()
    this.getCbus()
  },
  data() {
    return {
      formData: this.getInicialData(),
      formState: {},
      showPin: false,
      depositDone: false,
      checkingCard: false,
      cards: [],
      cbus: []
    }
  },
  methods: {
    async getCards() {
      let res = await axios.get("https://walcow-api.herokuapp.com/api/users/cards", {
        headers: {
          'auth-token': localStorage.getItem('token')
        }
      })
      this.cards = res.data.result
    },
    async getCbus() {
      let res = await axios.get("https://walcow-api.herokuapp.com/api/users/cbus", {
        headers: {
          'auth-token': localStorage.getItem('token')
        }
      })
      this.cbus = res.data.result
    },
    send() {
      this.checkingCard = true
      try {
        let axiosConfig = {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "auth-token": window.localStorage.getItem("token"),
          }
        };
        axios.patch("https://walcow-api.herokuapp.com/api/users/deposit", {
          value: this.formData.amount
        }, axiosConfig)
            .then(res => {
              console.log(res.data)
              this.checkingCard = false
              this.depositDone = true
            })
            .catch(e => console.log(e))
      } catch (error) {
        console.log(error)
      }
    },
    selectCredit() {
      document.querySelector('#cbox1').checked = true
      document.querySelector('#cbox2').checked = false
    },

    selectDebit() {
      document.querySelector('#cbox1').checked = false
      document.querySelector('#cbox2').checked = true
    },

    getInicialData() {
      return {
        card: '',
        pin: '',
        amount: '',
      }
    },
    hide() {
      this.showPin = false
      document.querySelector('#pin').type = 'password'
    },

    show() {
      this.showPin = true
      document.querySelector('#pin').type = 'number'
    },

    reset() {
      this.depositDone = false
      this.formData.amount = 0
    },
  }
}


</script>

<style scoped lang="css">
.src-components-deposit {
  width: 100vw;
  height: 100vh;
  background-size: cover;
  font-family: "Montserrat", sans-serif;
  display: flex;
  align-items: center;
  place-content: center;
  justify-content: center;
  align-self: center;
  background-color: #f5f5f5;
}

.src-components-deposit a {
  text-align: center;
}

.depositContainer {
  padding: 25px;
  background-color: rgb(253, 253, 253);
  margin: 30px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 4px rgb(0 0 0 / 4%);
}

.deposit__input > div {
  width: 20rem;
  display: flex;
  flex-direction: column;
}

.deposit-inputs {
  margin-bottom: 5px;
  margin-top: 10px;
  border: none;
  border-bottom: 1px solid black;
  background: transparent;
  outline: none;
}

.type-card {
  margin-top: -10px;
}

.type-card #cbox1 {
  margin: 0 2px;
}

.type-card #cbox2 {
  margin: 0 2px;
}

.type-card #label-cbox1 {
  font-size: 13px;
}

.type-card #label-cbox2 {
  margin: 0 20px;
  font-size: 12px;
}

.deposit__input > div label {
  margin: 15px 0 2px 0;
}

.deposit__button button {
  width: 100%;
  padding: 7px;
  margin-top: 15px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  text-align: center;
  background-color: #ffc107;
}

.deposit__button button:hover {
  background-color: #eec038;
}

.error {
  text-align: center;
  color: red;
  background-color: transparent;
  border: none;
  padding: 0px 20px;
}

.container-deposit-again {
  text-align: center;
}

.deposit-again {
  font-size: 15px;
  background-color: white;
  padding: 0px;
  box-shadow: none;
  border-bottom: 2px solid #ffc107;
}

.success {
  text-align: center;
}
</style>
