<template>

  <section class="src-components-access-otp">

    <div class="container">
      <br/>
      <h1>OTP Validation</h1>
      
      <label>Insert received OTP in your email</label>
      <div class="otp-row">
        <InputOtp 
          v-for="(item, i) in cantOTP"
          :key="i"
          :value="otpValues[i]"
          :focus="activeInput === i"
          @on-focus="handleOnFocus(i)"
          @on-change="handleOnChange"
          @on-blur="handleOnBlur"
          @on-keydown="handleDelete"
        />
      </div>
      <div class="otp-row">
        <button
          class="btn btn-light"
          @click="clearOTP"
        >
          <b>Clear OTP</b>
        </button>
        <button
          class="btn btn-light"
          @click="sendEmail"
        >
          <b>Resend Email</b>
        </button>
      </div>

      <button
        :disabled="this.isIncomplete"
        @click="redirectTo"
        class="btn btn-light"
      >
        <b>Validate</b>
      </button>
      <br/>
    </div>

  </section>

</template>

<script lang="js">

  import axios from 'axios'
  import InputOtp from './InputOtp.vue'

  export default  {
    name: 'src-components-access-otp',
    props: ['email', 'toRouter'],
    components: {
      InputOtp
    },
    mounted () {
      //this.sendEmail()
      this.checkMinParameters();

    },
    data () {
      return {
        cantOTP:  4,
        activeInput: 0,
        isIncomplete: true,
        otpValues: []
      }
    },
    methods: {
      checkMinParameters(){
        if (this.email == undefined || this.toRouter == undefined){
          this.$router.push('/access/forgot');
        }
      },
      checkOTP(){
        this.isIncomplete = !(this.otpValues.join('').length === this.cantOTP);
      },
      clearOTP(){
        console.log('Cleaning OTP...');
        this.otpValues = [];
        this.checkOTP();
      },
      sendEmail(){
        try {
          axios.post("http://localhost:4000/api/users/otp", this.email)
          .then(res => {
            console.log('Sended', res);
          })
        } catch (error) {
          console.log(error)
        }
        alert('Email has been sent')


      },
      redirectTo(){
        this.$router.push({
          name: this.toRouter,
          params: {
            email: this.email
          }
        });
      },
      focusInput(input) {
        this.activeInput = Math.max(Math.min(this.cantOTP - 1, input), 0);
      },
      // Focus on next input
      focusNextInput() {
        this.focusInput(this.activeInput + 1);
      },
      focusPreviousInput() {
        this.focusInput(this.activeInput - 1);
      },

      handleOnChange(newValue){ 
        this.otpValues[this.activeInput] = newValue;
        this.focusNextInput();
        this.checkOTP();
      },
      handleOnFocus(index) {
        this.activeInput = index;
      },
      handleOnBlur() {
        this.activeInput = -1;
      },
      handleDelete(){
        this.otpValues[this.activeInput] = '';
        this.focusPreviousInput();
        console.log('on-delete');
        this.checkOTP();

      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">

.otp-row {
  display: flex; 
  flex-direction: row;
  background: transparent;
  outline: none;
  color: #fff;
}

.otp-row button {
 margin: 5px;
}


.container label {
  padding: 0px;
  margin: 0px;
  display: block;
  margin-top: 20px;
  font-size: 17px;
}

.container h1 {
  padding: 0px;
  margin: 0px;
  display: block;
  text-align: center;
}

.container input {
  width: 100%;
  margin-bottom: 10px;
  margin-top: 10px;
  border: none;
  border-bottom: 1px solid #fff;
  background: transparent;
  outline: none;
  color: #fff;
}

.container button {
  display: block;
  width: 100%;
  margin-top: 15px;
  border-radius: 20px;
}

.container button:hover {
  background-color: rgb(189, 200, 200);
}

.error {
  text-align: left;
  color: red;
  background-color: transparent;
  border: none;
  padding: 0px;
  margin: 0px !important;
}

.formRow {
  width: 100%;
  display: flex;
}
.formRow div {
  width: 100%;
  margin: 5px 20px;
}

.redirect{
  text-align: center;
}

.redirect :hover{
  border-bottom: 1px solid;
}

.redirect a{
  text-decoration: none;
  color: rgb(255, 255, 255);
}

.src-components-register .container form {
  padding: 15px 80px;
}

.container {
  margin-top: -2.5rem;
}
</style>
