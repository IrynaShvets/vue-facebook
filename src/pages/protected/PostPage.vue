<template>
  <div>
    <header-app />
    <section class="p-20">
      <h1 class="text-gray-900 text-[40px]">Post</h1>

      <div>
        <div class="flex px-4 py-5 sm:px-6">
          <div v-show="image">
            <img
              class="w-[570px] h-[auto] align-middle border-yellow-500 border-2"
              :src="image"
              alt="post"
            />
          </div>

          <div class="ml-10">
            <h3 class="font-medium text-[25px] text-gray-500">Title post: {{ title }}</h3>
            <h2 class="mt-1 text-gray-900">Description post: {{ description }}</h2>
            <p class="mt-1 text-gray-900">Post created: {{ created_at }}</p>
            <p class="mt-1 text-gray-900">Text post: {{ body }}</p>
            <p class="mt-1 text-gray-900">Author post: {{ userName }}</p>
          </div>
        </div>

      </div>
    </section>
    <footer-app class="fixed bottom-0 left-0 right-0" />
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useAuthStore } from "../../store/auth";
import axios from "axios";

export default {
  name: "PostPage",

  data() {
    return {
      id: "",
      title: "",
      description: "",
      body: "",
      image: "",
      created_at: "",
      userName: "",
    };
  },

  computed: {
    ...mapState(useAuthStore, ["posts", "token"]),
  },

  methods: {
    getPost() {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://localhost:80/api/post/${this.$route.params.id}/show`, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((response) => {
            if (!response) {
              return;
            }
            this.id = response.data.data.id;
            this.title = response.data.data.title;
            this.description = response.data.data.description;
            this.body = response.data.data.body;
            this.image = response.data.data.image;
            this.created_at = response.data.data.created_at;
            this.userName = response.data.data.user.name;
           
            resolve();
          })
          .catch((error) => {
            reject(error.response);
          });
      });
    },
  },

  mounted() {
    this.getPost();
  }
};
</script>

<style>
</style>