<template>
  <h1>{{source}}</h1>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      pageName:'HOME PAGE'
    }),
    beforeCreate:{

    },
    methods:{
      loadDataFormFirebase(){

      }
    }
  }
</script>

<style scoped>
.v-list-item{
  min-height: 50px;
}
</style>