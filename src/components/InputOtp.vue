<template>

    <input 
      ref="input"
      type="number"
      min="0"
      max="9"
      maxlength="1"
      pattern="[0-9]"
      v-model="numeritoInput"
      placeholder="0"
      class="otp-input"
      @input="handleOnChange"
      @focus="handleOnFocus"
      @blur="handleOnBlur"
      @keydown="handleOnKeyDown"

    />

</template>

<script lang="js">

  export default  {
    name: 'src-components-input-otp',
    props: ['focus', 'value'],
    mounted () {

    },
    watch: {
      value(newValue, oldValue) {
        if (newValue != oldValue) {
          this.numeritoInput = newValue;
        }
      },
      focus(newFocusValue, oldFocusValue) {
        if (oldFocusValue !== newFocusValue && (this.$refs.input && this.focus)) {
          this.$refs.input.focus();
          this.$refs.input.select();
        }
      }
    },
    data () {
      return {
        numeritoInput: this.value || '',
      }
    },
    methods: {
      handleOnChange(){
        if (this.numeritoInput.length > 1) {
          this.numeritoInput = this.numeritoInput.slice(0,1);
        }
        console.log('Emit on-change');
        return this.$emit('on-change', this.numeritoInput);
      },

      handleOnFocus() {
        this.$refs.input.select();
        return this.$emit('on-focus');
      },
      handleOnBlur() {
        return this.$emit('on-blur');
      },

      handleOnKeyDown(event) {
        const keyEvent = (event) || window.event;
        const charCode = (keyEvent.which) ? keyEvent.which : keyEvent.keyCode;

        if (charCode === 46 || charCode === 8){
          this.$emit('on-keydown');
          this.numeritoInput = '';
          keyEvent.preventDefault();
        }

      }

    },
    computed: {

    }
}


</script>

<style scoped lang="css">

  .otp-input {
    width: 40px;
    height: 40px;
    padding: 5px;
    margin: 0 2px;
    font-size: 20px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    text-align: center;
  }
  .otp-input::-webkit-inner-spin-button,
  .otp-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

</style>
