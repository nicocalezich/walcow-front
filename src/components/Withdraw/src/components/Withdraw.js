import axios from "axios"

export default {
  name: 'src-components-deposit',
  props: [],
  mounted() {
    this.checkAccess()
    this.balance = this.getFiat()
  },
  data() {
    return {
      formData: this.getInicialData(),
      formState: {},
      showPin: false,
      depositDone: false,
      checkingCard: false,
      balance: 0,
      message: '',
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
        axios.patch("https://walcow-api.herokuapp.com/api/users/withdrawal", 
          {value: this.formData.amount},
          axiosConfig)
        .then(res => {
          console.log(res)
          this.message = res.message
        })
        .catch(e => console.log(e))
      } catch (error) {
        console.log(error)
      }
      this.checkingCard = false
      this.depositDone = true
      this.updateData()
    },

    getFiat(){
      return this.$store.state.user.fiat
    },

    getInicialData() {
      return {
        amount: 0,
      }
    },
    
    reset() {
      this.depositDone = false
      this.formData.amount = 0
    }
  },
    computed: {
      insufficientFiat(){
        return this.formData.amount > this.balance 
      }
    }
  
}

