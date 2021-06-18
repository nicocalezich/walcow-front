<template>

  <section class="src-components-home">
    <h1>test</h1>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'src-components-home',
    props: [],
    mounted () {
      if(!this.$store.state.success){
        this.$router.push('/access')
      }
    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-home {

  }
</style>
