<template>
  <v-app class="grey darken-4">
    <v-navigation-drawer
      mini-variant
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      dark
    >
      <v-list class="pa-0">
        <v-list-item-group v-model="model">
          <template v-for="item in items">
            <v-list-item :key="item.text" link @click="navigate(item.route)">
              <v-tooltip dark :nudge-right="10" right>
                <template v-slot:activator="{ on }">
                  <v-list-item-action v-on="on">
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-action>
                </template>
                <span>{{ item.text }}</span>
              </v-tooltip>

              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container class="fill-weight pa-0" fluid>
        <!-- Load Dynamic Content Here -->
        <keep-alive>
          <router-view />
        </keep-alive>
      </v-container>
    </v-content>
    <AlertBar
      :timeout="alerts.timeout"
      :text="alerts.text"
      :color="alerts.color"
      :snackbar="alerts.snackbar"
    />
  </v-app>
</template>

<script>
import AlertBar from "../../components/Alert/AlertBar";
import {BlogMessage} from "../../plugins/message"

export default {
  data: () => {
    return {
      model: 0,
      dialog: false,
      drawer: null,
      items: [
        { icon: "mdi-menu", text: "", route: "" },
        { icon: "mdi-view-dashboard", text: "Dashboard", route: "dashboard" },
        { icon: "mdi-cart", text: "Orders", route: "order" },
        { icon: "mdi-cards", text: "Products", route: "product" },
        { icon: "mdi-view-list", text: "Category", route: "category" },
        { icon: "mdi-ticket-percent", text: "Coupon", route: "coupon" },
        { icon: "mdi-account-multiple", text: "Customer", route: "customer" },
        { icon: "mdi-blogger", text: "Blog", route: "blog" },
        { icon: "mdi-bell", text: "Notification", route: "notification" },
        { icon: "mdi-asterisk", text: "Settings", route: "settings" },
        {
          icon: "mdi-android-debug-bridge",
          text: "App Downloads",
          route: "app"
        },
        { icon: "mdi-help-circle", text: "About", route: "about" },
        { icon: "mdi-account-circle", text: "Profile", route: "profile" },
        { icon: "mdi-logout", text: "Logout", route: "" }
      ]
    };
  },
  created: function(){
    this.$store.commit('triggerAlert', BlogMessage.updatePost);
  },
  components: {
    AlertBar
  },
  computed: {
    alerts() {
      return this.$store.state.alerts;
    }
  },
  methods: {
    navigate(route) {
      this.$router.push("/admin/" + route);
    }
  }
};
</script>

<style>
.v-list-item {
  min-height: 58px;
}
html {
  overflow: hidden;
}
</style>