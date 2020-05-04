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
                <image-holder v-model="post.featureImage">
                  <div slot="activator">
                    <v-img width="100%" height="250px" v-ripple v-if="!post.featureImage">
                      <span>Click to add avatar</span>
                    </v-img>
                    <v-img
                      width="100%"
                      height="250px"
                      :src="post.featureImage"
                      @mouseover="printData()"
                      alt="avatar"
                      v-ripple
                      v-else
                    />
                  </div>
                </image-holder>
              </v-card>
              <!-- <v-card class="mb-5" dark outlined>
                <picture-input
                  ref="pictureInput"
                  width="1200"
                  height="600"
                  margin="16"
                  accept="image/jpeg, image/png"
                  size="10"
                  button-class="btn"
                  :custom-strings="{
                    upload: '<h1>Bummer!</h1>',
                    drag: 'Drag a 😺 GIF or GTFO'
                  }"
                  @change="onChange"
                ></picture-input>
              </v-card> -->
              <cv-text-input
                class="mb-6"
                label="Post Title"
                helper-text="Optional helper text here; if message is more than one line text should wrap (~100 character count maximum)"
                v-model="post.title"
                placeholder="Enter post title"
              ></cv-text-input>
              <cv-text-area
                class="mb-12"
                label="Excerpt"
                helper-text="Optional helper text here; if message is more than one line text should wrap (~100 character count maximum)"
                v-model="post.excerpt"
                placeholder="Enter a short description about post."
              ></cv-text-area>
              <div class="editor-text">
                <ckeditor :editor="editor" v-model="post.body" :config="editorConfig"></ckeditor>
              </div>
            </template>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ImageHolder from "../../../components/Common/ImageHolder";
import {db} from "../../../plugins/firebase";
import { BlogMessage } from "../../../plugins/message";

export default {
  data() {
    return {
      title: "New Post",
      postId: "",
      post: {
        title: "",
        excerpt: "",
        body: "",
        featureImage:
          "https://admin.hooshmand.net/content/images/2019/09/Hooshmand---Different-Ghost-Hero-and-Feature-Image.jpg",
        created: Date.now(),
        status: 1
      },
      editor: ClassicEditor,
      editorData: "<p>Your post content...</p>",
      editorConfig: {
        // Nop
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
    saveData() {
      if (this.$route.name === "Edit Post") {
        db.collection("Blogs")
          .doc(this.postId)
          .update(this.post)
          .then(() => {
            this.$store.commit("triggerAlert", BlogMessage.updatePost);
          })
          .catch(() => {
            this.$store.commit("triggerAlert", BlogMessage.error);
          });
      } else {
        db.collection("Blogs")
          .add(this.post)
          .then(() => {
            this.$store.commit("triggerAlert", BlogMessage.publishPost);
          })
          .catch(() => {
            this.$store.commit("triggerAlert", BlogMessage.error);
          });
      }
    },
    onChange(image) {
      console.log("New picture selected!");
      if (image) {
        console.log("Picture loaded.");
        this.image = image;
      } else {
        console.log("FileReader API not supported: use the <form>, Luke!");
      }
    }
  },
  activated: function() {
    this.post.title = "";
    this.post.excerpt = "";
    this.post.body = "";
    this.title = "New Post";
    if (this.$route.name === "Edit Post") {
      this.title = "Edit Post";
      this.postId = this.$route.params.id;
      if (this.postId != "") {
        db.collection("Blogs")
          .doc(this.postId)
          .get()
          .then(snap => {
            if (snap.data() == null) {
              this.navigateBack();
            }
            this.post = snap.data();
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
<style>
.editor-text {
  color: black;
}
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
