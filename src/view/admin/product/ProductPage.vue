<template>
  <div>
    <v-card-title class="grey darken-3 white--text pa-3">
      <span class="subtitle-1">Product</span>
      <v-spacer />
        <div class="mr-2">
          <v-text-field
          dense
          flat
          outlined
          solo-inverted
          clearable
          hide-details
          prepend-inner-icon="mdi-magnify"
          label="Search order"
          class="hidden-sm-and-down"
        />
        </div>
      <v-btn height="40" depressed color="primary" @click="navigateToForm()">
        <v-icon left>mdi-plus</v-icon>New Product
      </v-btn>
    </v-card-title>
    <v-card outlined dark tile>
        <ProductList/>
    </v-card>
  </div>
</template>

<script>
  import ProductList from '@/components/Product/ProductList';
  export default {
    components: {
      ProductList,
    },
    methods:{
      navigateToForm(){
        this.$router.push('/admin/new-product');
      }
    }
  }
</script>