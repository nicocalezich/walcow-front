import axios from "axios"

export default {
    name: 'src-components-deposit',
    props: [],
    mounted() {
        this.checkAccess()
        this.balance = this.getFiat()
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
            balance: 0,
            message: '',
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

        getFiat() {
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
        insufficientFiat() {
            return this.formData.amount > this.balance
        }
    }

}

