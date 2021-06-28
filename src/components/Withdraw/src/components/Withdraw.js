import axios from "axios"

export default {
  name: 'src-components-deposit',
  props: [],
  mounted() {
    this.balance = this.$store.state.user.fiat
  },
  data() {
    return {
      formData: this.getInicialData(),
      formState: {},
      showPin: false,
      depositDone: false,
      checkingCard: false,
      balance: 0,
      errorMessage: ''
    }
  },
  methods: {
    send() {
      this.checkingCard = true
      try {
       let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "auth-token": window.localStorage.getItem("token"),
        }
      };
      axios.patch("https://walcow-api.herokuapp.com/api/users/withdrawal", {
            value:  this.formData.amount
            }, axiosConfig)
          .then(res => {
            console.log(res)
            this.checkingCard = false
            this.depositDone = true
            this.balance = this.$store.state.user.fiat
          })
          .catch(e => console.log(e))
    } catch (error) {
      console.log(error)
    }

    },
    selectCredit() {
      document.querySelector('#cbox2').checked = false
      document.querySelector('#cbox1').checked = true
    },

    selectDebit() {
      document.querySelector('#cbox1').checked = false
      document.querySelector('#cbox2').checked = true
    },

    getInicialData() {
      return {
        card: ' ',
        pin: ' ',
        amount: ' ',
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
    computed: {}
  }
}

