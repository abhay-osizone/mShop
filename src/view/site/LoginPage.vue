<template>
  <v-app id="inspire">
    <v-parallax
    class="fill-height"
      height="100%"
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="9"
            md="3"
          >
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <v-img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQM2eJnuCImGsQq4SSgqSi-Zf32yoey5_xw8dc2R_ORyfVSxlI&usqp=CAU" height="60px" contain></v-img>
                <div class="ma-5">
                  <h3 class="title text-center light-blue--text text--darken-4">Login To Your Panel</h3>
                  <v-spacer/>
                  <p class="caption text-center black--text ">Lorem Ipsum is simply dummy text of the printing and typesetting.</p>
                </div>
                <v-form class="md-1">
                  <v-text-field
                    
                    clearable
                    single-line
                    outlined
                    label="Username"
                    name="username"
                    type="text"
                    prepend-inner-icon="mdi-help-circle"
                  />

                  <v-text-field
                    
                    single-line
                    outlined
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    prepend-inner-icon="mdi-lock"
                  />
                </v-form>
                <v-row class="d-flex pa-2">
                  <v-btn depressed x-large block href="/admin" color="primary">Primary</v-btn>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    </v-parallax>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
  }
</script>
<style scoped>
.v-input__slot{
  margin-bottom: 0%;
}
</style>