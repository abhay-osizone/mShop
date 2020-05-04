<template>
  <v-card
    outlined
    dark
    tile
    max-height="100%"
    max-width="auto"
  >
    <v-card-title
      class="grey darken-3 white--text pa-3"
    >
        <v-btn class="mr-2" text icon @click="navigateBack()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-breadcrumbs class="pa-1 white--text" :items="items" divider="-"></v-breadcrumbs>
      <v-spacer/>
      <v-btn
        outlined
        color="white"
        dark
        depressed
        class="mr-1"
        @click="save()"
      >
        Publish
      </v-btn>
      <v-btn
        outlined
        color="white"
        dark
        depressed
        @click="interval == null ? start() : stop()"
      >
        Draft
      </v-btn>
    </v-card-title>
    <v-card-text class="pa-0">
      
    </v-card-text>
  </v-card>
</template>

<script>
  import {db} from '@/plugins/firebase'
  export default {
      data: () => ({
      items: [
        {
          text: 'Dashboard',
          disabled: false,
          href: '/admin/dashboard',
        },
        {
          text: 'Product',
          disabled: false,
          href: '/admin/product',
        },
        {
          text: 'New Product',
          disabled: true,
          href: '/admin/product/new-product',
        },
      ],
    }),
    components: {
    },
    methods: {
      navigateBack(){
        this.$router.go(-1)
      },
      save(){
        this.$store.state.products.forEach(pro => {
          db.collection('mProduct').add({
              'name': pro.name,
              'category': pro.category,
              'price': pro.price,
              'stock': pro.stock,
              'status': pro.status,
              'created': db.FieldValue.serverTimestamp(),
          }).catch(err=>{
          console.log(err);
        })
        });
        console.log('complete');
      }
      
    },
  }
</script>