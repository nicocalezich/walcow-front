<template>
  <div class="data">
    <h6 class="data-title">Yours credit & debit cards</h6>
    <input
        type="number"
        id="input"
        v-model="inputCards"
        placeholder="Add new card"
    />
    <button
        class="add-cbu"
        @click="addCard"
        :disabled="!validCard || !this.inputCards > 0"
    >
      <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-plus-lg"
          viewBox="0 0 16 16"
      >
        <path
            d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"
        />
      </svg>
    </button>
    <div
        v-show="!validCard"
        class="alert alert-danger error"
        role="alert"
    >
      Invalid card number
    </div>
    <div
        v-show="!this.cards.length"
        class="alert alert-danger no-data"
        role="alert"
    >
      <i>No cards added</i>
    </div>
    <div class="cbu" v-for="(card, i) in this.cards" :key="i">
      {{
        card
      }}
      <button class="delete-cbu" @click="deleteCard(card)">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-x-lg"
            viewBox="0 0 16 16"
        >
          <path
              d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
<script lang="js">

import axios from "axios";

export default {
  name: 'Cards',
  props: {},
  data() {
    return {
      cards: [],
      inputCards: ''
    }
  },
  mounted() {
    this.getCards()
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
    addCard() {
      let data = {
        number: this.inputCards
      }
      this.inputCards = ''
      try {
        axios.post("https://walcow-api.herokuapp.com/api/users/cards", data, {
          headers: {
            'auth-token': localStorage.getItem('token')
          }
        }).then(() => {
          this.cards.push(data.number)
        })
      } catch (error) {
        console.log(error)
      }
    },
    deleteCard(number) {
      axios.delete("https://walcow-api.herokuapp.com/api/users/cards/" + number, {
        headers: {
          'auth-token': localStorage.getItem('token')
        }
      }).then((d) => {
        this.cards = d.data.result
      })
    }
  },
  computed: {
    validCard() {
      const max_digit = 20
      return this.inputCards.length <= max_digit
    }
  }
}
</script>
<style scoped lang="css">

.data {
  display: block;
  padding: 15px 25px;
}

h6 {
  margin: 10px 0 0 0;
}

.data-title {
  margin-bottom: 15px;
}

hr {
  margin: 0%;
}

.error {
  text-align: left;
  color: red;
  background-color: transparent;
  border: none;
  padding: 10px 0px;
  margin: 0px !important;
}

.no-data {
  text-align: center;
  color: rgb(98, 98, 98);
  background-color: transparent;
  border: none;
  padding: 35px 0px;
  margin: 0px !important;
}

.cbu {
  margin: 10px 0;
  padding: 10px 5px;
  background-color: #ebebeb;
  box-shadow: 0px 2px 4px rgb(0 0 0 / 4%);
  border-radius: 10px;
}

.add-cbu {
  border: none;
  background: none;
  color: black;
}

.delete-cbu {
  border: none;
  background: none;
  color: red;
}

#input {
  border: none;
  border-bottom: 1px solid black;
}
</style>