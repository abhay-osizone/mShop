<template>
  <div>
    <v-card-title class="grey darken-3 white--text pa-3">
      <span class="subtitle-1">Coupon</span>
      <v-spacer />
      <v-btn height="40" depressed color="primary" @click="navigateToForm()">
        <v-icon left>mdi-plus</v-icon>Add New
      </v-btn>
    </v-card-title>
    <div class="fixed-frame">
      <v-row>
        <v-col md="8" lg="6" offset-md="2" offset-lg="3">
          <v-card outlined dark>
            <div v-for="item in coupons" :key="item.name">
              <v-list-item>
                <v-list-item-avatar>
                  <v-icon :class="getIconClass(item.status)" v-text="'mdi-ticket-percent'"></v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="item.code"></v-list-item-title>
                </v-list-item-content>
                <v-spacer class="space">
                  <v-chip
                    label
                    class="ma-2"
                    :color="(item.fixed)? 'green': 'blue'"
                    text-color="white"
                  >{{ item.offer }} {{ (item.fixed)? 'Rs. OFF': '% OFF' }}</v-chip>
                </v-spacer>
                <v-list-item-action>
                  <v-row>
                    <v-btn @click="editCoupon(item.id)" icon>
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
        <v-card-title class="subtitle-1">Are you sure you want to delete this coupon?</v-card-title>
        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="green darken-1" text @click="dialog.status = false">No</v-btn>
          <v-btn color="red darken-1" text @click="deleteCoupon(dialog.id)">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="formDialog" persistent max-width="490px">
      <v-card>
        <v-card-title>
          <span class="subtitle">New coupon</span>
        </v-card-title>
        <v-card-text class="mb-0">
          <v-container>
            <v-row>
              <v-row class="px-2">
                <v-text-field
                  v-model="coupon.code"
                  outlined
                  dense
                  single-line
                  placeholder="Coupon Code*"
                  required
                ></v-text-field>
              </v-row>
              <v-row class="px-2">
                <v-text-field
                  v-model="coupon.offer"
                  outlined
                  dense
                  single-line
                  placeholder="Offer"
                  required
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-btn-toggle v-model="coupon.fixed" mandatory>
                  <v-btn height="42px" value="false">
                    <span class="hidden-sm-and-down">Percent</span>
                    <v-icon right>mdi-percent</v-icon>
                  </v-btn>
                  <v-btn height="42px" value="true">
                    <span class="hidden-sm-and-down">Amount</span>
                    <v-icon right>mdi-money</v-icon>
                  </v-btn>
                </v-btn-toggle>
              </v-row>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="formDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="saveCoupon()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { db } from "../../../plugins/firebase";
import { CouponMessage } from "../../../plugins/message";

export default {
  data: () => ({
    coupon: {
      code: "",
      offer: 0,
      fixed: false,
      status: 1
    },
    formDialog: false,
    dialog: {
      status: false,
      id: ""
    }
  }),
  methods: {
    deleteCoupon(id) {
      this.dialog.status = false;
      db.collection("Coupons")
        .doc(id)
        .delete()
        .then(() => {
          this.$store.commit("triggerAlert", CouponMessage.deleteCoupon);
        })
        .catch(() => {
          this.$store.commit("triggerAlert", CouponMessage.error);
        });
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
      this.formDialog = true;
    },
    editPost(catId) {
      this.$router.push({ name: "Edit Category", params: { id: catId } });
    },
    saveCoupon() {
      db.collection("Coupons")
        .add(this.coupon)
        .then(() => {
          this.$store.commit("triggerAlert", CouponMessage.createdCoupon);
        })
        .catch(err => {
          console.log(err);
          this.$store.commit("triggerAlert", CouponMessage.error);
        });
    }
  },
  computed: {
    coupons() {
      return this.$store.state.coupons;
    }
  },
  created: function() {
    this.$store.dispatch("bindCoupons");
  }
};
</script>

<style scoped>
.space {
  flex-grow: 0.1 !important;
}
</style>