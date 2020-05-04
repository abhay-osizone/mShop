<template>
  <v-snackbar v-model="snackbar" :timeout="timeout" :color="color">
    {{ text }}
    <v-btn color="white" text @click="snackbar = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    snackbar: Boolean,
    text: String,
    color: String,
    timeout: Number,
  },
};
</script>