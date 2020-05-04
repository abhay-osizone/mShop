<template>
  <div>
    <v-card-title class="grey darken-3 white--text pa-3">
      <span class="subtitle-1">About Us</span>
      <v-spacer />
      <v-btn height="40" depressed color="primary" @click="navigateToForm()">
        <v-icon left>mdi-plus</v-icon>Edit
      </v-btn>
    </v-card-title>
    <v-card outlined dark tile max-height="100%" max-width="auto">
      <v-card-text class="pa-0">
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  methods: {
    navigateToForm() {
      this.$router.push("/admin/new-product");
    }
  }
};
</script>