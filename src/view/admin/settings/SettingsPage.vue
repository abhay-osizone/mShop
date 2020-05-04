<template>
  <div>
    <v-card-title class="grey darken-3 white--text pa-3">
      <span class="subtitle-1">Settings</span>
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
          label="Search setting"
          class="hidden-sm-and-down"
        />
        </div>
    </v-card-title>
    <v-card outlined dark tile max-height="100%" max-width="auto">
      <v-card-text class="pa-0">

      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  export default {
    methods:{
      navigateToForm(){
        this.$router.push('/admin/new-product');
      }
    }
  }
</script>