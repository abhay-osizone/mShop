<template>
  <div>
    <v-card-title class="grey darken-3 white--text pa-3">
      <span class="subtitle-1">Category</span>
      <v-spacer />
      <v-btn height="40" depressed color="primary" @click="navigateToForm()">
        <v-icon left>mdi-plus</v-icon>Add New
      </v-btn>
    </v-card-title>
    <div class="fixed-frame">
      <v-row>
        <v-col md="8" lg="6" offset-md="2" offset-lg="3">
          <v-card outlined dark>
            <div v-for="item in category" :key="item.id">
              <v-list-item>
                <v-list-item-avatar>
                  <v-icon :class="getIconClass(item.status)" v-text="getIcon(item.status)"></v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item-content>

                <v-spacer class="space">
                  <v-chip
                    label
                    class="ma-2"
                    color="green"
                    text-color="white"
                  >{{ item.product }} Product</v-chip>
                </v-spacer>

                <v-list-item-action>
                  <v-row>
                    <v-btn @click="editPost(item.id)" icon>
                      <v-icon color="grey lighten-1">mdi-pen</v-icon>
                    </v-btn>
                    <v-btn @click="openDialog(item.id)" icon>
                      <v-icon color="grey lighten-1">mdi-delete</v-icon>
                    </v-btn>
                  </v-row>
                </v-list-item-action>
              </v-list-item>
              <v-divider></v-divider>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <v-dialog overlay-color="black" overlay-opacity=".9" v-model="dialog.status" max-width="420">
      <v-card>
        <v-card-title class="subtitle-1">Are you sure you want to delete this category?</v-card-title>
        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="green darken-1" text @click="dialog.status = false">No</v-btn>
          <v-btn color="red darken-1" text @click="deleteCategory(dialog.id)">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { db } from "../../../plugins/firebase";
import { CategoryMessage } from "../../../plugins/message";

export default {
  data: () => ({
    items2: [
      {
        icon: "mdi-check",
        iconClass: "green white--text",
        product: 36,
        title: "Man Fashions",
        subtitle: "Jan 20, 2014"
      },
      {
        icon: "mdi-information",
        iconClass: "grey white--text",
        product: 20,
        title: "Women Fashions",
        subtitle: "Jan 10, 2014"
      },
      {
        icon: "mdi-check",
        iconClass: "green white--text",
        product: 6,
        title: "School Bags",
        subtitle: "Jan 20, 2014"
      },
      {
        icon: "mdi-check",
        iconClass: "green white--text",
        product: 74,
        title: "Electronic Gagets",
        subtitle: "Jan 10, 2014"
      },
      {
        icon: "mdi-information",
        iconClass: "grey white--text",
        product: 48,
        title: "Mobile Phone",
        subtitle: "Jan 20, 2014"
      },
      {
        icon: "mdi-check",
        iconClass: "green white--text",
        product: 10,
        title: "Kitchen Applicence",
        subtitle: "Jan 10, 2014"
      }
    ],

    dialog: {
      status: false,
      id: ""
    }
  }),
  methods: {
    deleteCategory(id) {
      this.dialog.status = false;
      db.collection("Category")
        .doc(id)
        .delete()
        .then(() => {
          this.$store.commit("triggerAlert", CategoryMessage.deleteCategory);
        })
        .catch(() => {
          this.$store.commit("triggerAlert", CategoryMessage.error);
        });
    },
    getIcon(status) {
      if (status === 0) {
        return "mdi-information";
      } else {
        return "mdi-check";
      }
    },
    getIconClass(status) {
      if (status === 0) {
        return "grey white--text";
      } else {
        return "green white--text";
      }
    },
    openDialog(pid) {
      this.dialog.status = true;
      this.dialog.id = pid;
    },
    navigateToForm() {
      this.$router.push("/admin/new-category");
    },
    editPost(catId) {
      this.$router.push({ name: "Edit Category", params: { id: catId } });
    }
  },
  computed: {
    category() {
      return this.$store.state.category;
    }
  },
  created: function() {
    this.$store.dispatch("bindCategory");
  }
};
</script>

<style scoped>
.space {
  flex-grow: 0.1 !important;
}
</style>