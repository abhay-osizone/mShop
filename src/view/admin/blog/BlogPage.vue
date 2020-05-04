<template>
  <div>
    <v-card-title class="grey darken-3 white--text pa-3">
      <span class="subtitle-1">Blog & News</span>
      <v-spacer />
      <v-text-field
        dense
        flat
        outlined
        solo-inverted
        clearable
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search article"
        class="hidden-sm-and-down"
      />
      <v-spacer />
      <v-btn height="40" depressed color="primary" @click="navigateToForm()">
        <v-icon left>mdi-plus</v-icon>New Post
      </v-btn>
    </v-card-title>

    <v-card outlined dark tile class="fixed-frame">
      <v-card-text class="pa-0">
        <!-- Component Goes here -->
        <v-row>
          <v-col md="8" lg="6" offset-md="2" offset-lg="3">
            <template>
              <div class="ma-5" v-for="post in blogs" :key="post.id">
                <v-card class="mx-auto" outlined>
                  <v-img
                    class="white--text align-end"
                    height="200px"
                    v-bind:src="post.featureImage"
                  ></v-img>
                  <v-card-title>{{post.title}}</v-card-title>

                  <v-card-text class="text--white">
                    <p>{{ post.excerpt }}</p>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      large
                      color="white"
                      outlined
                      text
                      height="48"
                    >{{ post.created | moment("D MMMM YYYY h:mm a") }}</v-btn>
                    <v-spacer />
                    <v-btn-toggle>
                      <v-btn>
                        <v-icon>mdi-share</v-icon>
                      </v-btn>
                      <v-btn @click="editPost(post.id)">
                        <v-icon>mdi-pen</v-icon>
                      </v-btn>
                      <v-btn @click="openDialog(post.id)">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-btn-toggle>
                  </v-card-actions>
                </v-card>
              </div>
            </template>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-dialog overlay-color="black" overlay-opacity=".9" v-model="dialog.status" max-width="420">
      <v-card>
        <v-card-title class="subtitle-1">Are you sure you want to delete this post?</v-card-title>
        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="green darken-1" text @click="dialog.status = false">No</v-btn>
          <v-btn color="red darken-1" text @click="deletePost(dialog.id)">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {db} from "../../../plugins/firebase";
import { BlogMessage } from "../../../plugins/message";

export default {
  data() {
    return {
      dialog: {
        status: false,
        id: '',
      }
    };
  },
  methods: {
    openDialog(pid){
        this.dialog.status=true;
        this.dialog.id = pid;
    },
    navigateToForm() {
      this.$router.push("/admin/new-post");
    },
    deletePost(id) {
      this.dialog.status = false;
      db.collection("Blogs")
        .doc(id)
        .delete()
        .then(() => {
          this.$store.commit("triggerAlert", BlogMessage.deletePost);
        })
        .catch(() => {
          this.$store.commit("triggerAlert", BlogMessage.error);
        });
    },
    editPost(pid) {
      this.$router.push({ name: "Edit Post", params: { id: pid } });
    }
  },
  computed: {
    blogs() {
      return this.$store.state.blogs;
    }
  },
  created: function() {
    this.$store.dispatch("bindBlogs");
  }
};
</script>
<style>
.fixed-frame {
  z-index: 0;
  position: fixed;
  top: 64px;
  width: 100%;
  left: 0px;
  bottom: 0px;
  overflow-y: scroll;
  overflow-x: hidden;
}
::-webkit-scrollbar {
  width: 15px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #424242;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
