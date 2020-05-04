<template>
  <div>
    <v-card-title class="grey darken-3 white--text pa-3">
      <v-btn class="mr-2" text icon @click="navigateBack()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <span class="subtitle-1">{{ title }}</span>
      <v-spacer />
      <v-btn height="40" depressed color="secondary" class="mr-2" @click="navigateToForm()">
        <v-icon left>mdi-content-save-settings</v-icon>Draft
      </v-btn>
      <v-btn height="40" depressed color="primary" @click="saveData()">
        <v-icon left>mdi-web</v-icon>Publish
      </v-btn>
    </v-card-title>

    <v-card outlined dark tile class="fixed-frame">
      <v-card-text class="pa-0">
        <!-- Component Goes here -->
        <v-row>
          <v-col md="8" lg="6" sm="10" offset-sm="1" offset-md="2" offset-lg="3">
            <template>
              <v-card class="mb-8" dark outlined>
                <image-holder v-model="category.banner">
                  <div slot="activator">
                    <v-img width="100%" height="250px" v-ripple v-if="!category.banner">
                      <span>Click to add avatar</span>
                    </v-img>
                    <v-img
                      width="100%"
                      height="250px"
                      :src="category.banner"
                      @mouseover="printData()"
                      alt="avatar"
                      v-ripple
                      v-else
                    />
                  </div>
                </image-holder>
              </v-card>
              <cv-text-input
                class="mb-6"
                label="Category name"
                helper-text="Optional helper text here; if message is more than one line text should wrap (~100 character count maximum)"
                v-model="category.name"
                placeholder="Optional placeholder text"
              ></cv-text-input>
              <cv-text-input
                class="mb-6"
                label="Category slug"
                helper-text="Optional helper text here; if message is more than one line text should wrap (~100 character count maximum)"
                v-model="category.slug"
                placeholder="Optional placeholder text"
              ></cv-text-input>
              <cv-text-area
                label="Category Description"
                helper-text="Optional helper text here; if message is more than one line text should wrap (~100 character count maximum)"
                v-model="category.description"
                placeholder="Optional placeholder text"
              ></cv-text-area>
            </template>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { db, storageRef } from "../../../plugins/firebase";
import { CategoryMessage } from "../../../plugins/message";
import ImageHolder from "../../../components/Common/ImageHolder";

export default {
  data() {
    return {
      title: "New Category",
      catId: "",
      category: {
        name: "",
        description: "",
        slug: "",
        banner: null,
        created: Date.now(),
        status: 1
      }
    };
  },
  components: {
    ImageHolder
  },
  methods: {
    navigateBack() {
      this.$router.go(-1);
    },
    printData() {
      console.log(this.category.banner);
    },
    saveData() {
      if (this.$route.name === "Edit Category") {
        db.collection("Category")
          .doc(this.catId)
          .update(this.category)
          .then(() => {
            this.$store.commit("triggerAlert", CategoryMessage.updateCategory);
          })
          .catch(() => {
            this.$store.commit("triggerAlert", CategoryMessage.error);
          });
      } else {
        db.collection("Category")
          .add(this.category)
          .then(() => {
            this.$store.commit("triggerAlert", CategoryMessage.publishCategory);
          })
          .catch(() => {
            this.$store.commit("triggerAlert", CategoryMessage.error);
          });
      }
    },
    onChange(image) {
      if (image) {
        console.log("Picture loaded." + image);
        storageRef
          .child("category")
          .child(Date.now() + ".jpg")
          .putString(image, "data_url")
          .then(async function(snap) {
            let url = await snap.ref.getDownloadURL();
            this.category.banner = url;
            console.log("Uploaded a data_url string!" + url);
          });
      } else {
        console.log("FileReader API not supported: use the <form>, Luke!");
      }
    }
  },
  activated: function() {
    this.category.name = "";
    this.category.description = "";
    this.category.slug = "";
    this.category.banner = null;
    this.title = "New Category";
    if (this.$route.name === "Edit Category") {
      this.title = "Edit Category";
      this.catId = this.$route.params.id;
      if (this.catId != "") {
        db.collection("Category")
          .doc(this.catId)
          .get()
          .then(snap => {
            if (snap.data() == null) {
              this.navigateBack();
            }
            this.category = snap.data();
          })
          .catch(err => {
            this.navigateBack();
            console.log(err);
          });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.cv-text-input{
  background-color: transparent;
}
</style>