<template>
<keep-alive>
    <v-data-table
    show-select
    :headers="headers"
    :items="products"
    :footer-props="footerProps"
    :options="options"
    class="elevation-0"
    
  >
  <template v-slot:item.name="{ item }">
      <v-list-item class="pa-0">
        <v-card flat light class="mr-3 my-1">
          <v-img src="https://picsum.photos/200/400?random" class="img-circle" aspect-ratio="1" height="43" width="43"></v-img>
        </v-card>

        <v-list-item-content>
          <v-list-item-title v-text="item.name"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
  </template>

    <template v-slot:item.category="{ item }">
      <v-chip :color="getColor(item.category)" dark>{{ item.category }}</v-chip>
    </template>
    <template v-slot:item.status="{ item }">
      <v-chip :color="getStatus(item.status)" dark small label>{{ (item.status!=1)? 'DRAFT': 'PUBLISHED' }}</v-chip>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        medium
        @click="editItem(item)"
        color="info"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        class="mx-3"
        medium
        @click="deleteItem(item)"
        color="error"
      >
        mdi-delete
      </v-icon>
      <v-icon
        medium
        @click="deleteItem(item)"
        color="success"
      >
        mdi-information
      </v-icon>
    </template>
    
  </v-data-table>
</keep-alive>
</template>

<script>
  export default {
    data () {
      return {
        options: {'page': 1, 'itemsPerPage': 12},
        footerProps: {'disable-items-per-page': true, 'items-per-page-text': '', 'items-per-page-options': []},
        headers: [
          {
            text: 'Title',
            align: 'start',
            sortable: true,
            value: 'name',
          },
          { text: 'Price', value: 'price' },
          { text: 'Category', value: 'category' },
          { text: 'Stock', value: 'stock' },
          { text: 'Status', value: 'status' },
          { text: 'Created', value: 'created' },
          { text: 'Actions', value: 'actions', sortable: false, align: 'end'},
        ],
      }
    },
    methods: {
      getColor (category) {
        if (category > 400) return 'red'
        else if (category > 200) return 'orange'
        else return 'green'
      },
      getStatus(status){
          switch(status){
            case 0:
              return 'yello';
            default:
              return 'green'
          }
      },
      editItem(){

      },
      deleteItem(){
          
      }
    },
    computed:{
      products(){
        return this.$store.state.products
      },
    },
    created: function() {
      this.$store.dispatch('bindProducts')
    }
  }
</script>

<style>
.v-data-footer{
  padding: 10px;
}
</style>