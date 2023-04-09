<template>
  <div class="relative">
    <header-app class="fixed z-10 top-0 left-0 w-screen" />
    <sidebar-home
      class="fixed w-[250px] h-[100%] overflow-y-auto bg-[#001524]"
    />

    <section class="absolute overflow-y-auto top-[80px] w-[70%] right-[5%]">
      <div>
        <input
          type="text"
          name="searchQuery"
          class="w-[500px] h-[42px] py-4 px-6 border-0 outline-0"
          v-model="searchQuery"
          placeholder="Search posts"
        />
      </div>
      <h1 class="text-gray-900">All posts</h1>
      <ul v-if="searchedPosts">
        <li
          v-for="post in searchedPosts"
          :id="post.id"
          :key="post.id"
          class="mb-10"
        >
          <div class="overflow-hidden bg-white shadow sm:rounded-lg">
            <div class="flex items-center justify-center px-4 py-5 sm:px-6">
              <div v-if="post.image">
                <img
                  :src="post.image"
                  :alt="post.title"
                  width="380"
                  height="auto"
                />
              </div>

              <div v-else>
                <img
                  src="https://i.gyazo.com/da1cfd20878c36a3a53d5b9b4caf36d9.png"
                  :alt="post.title"
                  width="380"
                  height="auto"
                />
              </div>

              <div class="ml-10">
                <h3 class="font-medium text-gray-500">Post title</h3>
                <h2 class="mt-1 text-gray-900">{{ post.title }}</h2>
              </div>
            </div>
            <div class="border-t border-gray-200">
              <dl>
                <div
                  class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                >
                  <dt class="text-sm font-medium text-gray-500">User post</dt>
                  <dd
                    v-if="post.user"
                    class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"
                  >
                    {{ post.user.name }}
                  </dd>
                </div>
              </dl>
            </div>

            <router-link
              :to="{ name: 'post', params: { id: post.id } }"
              class="flex flex-1 items-center p-2 bg-indigo-200 hover:bg-indigo-500 text-gray-800 hover:text-white transition-colors"
            >
              <span>More info about post</span>
            </router-link>

            <router-link
              :to="{ name: 'postUpdate', params: { id: post.id } }"
              class="mainPublic px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-dark hover:opacity-75"
            >
              Update post
            </router-link>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>
  
<script>
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "../../store/auth";
import axios from "axios";

export default {
  name: "AllPostsPage",
  components: {},

  data() {
    return {
      searchQuery: "",
    };
  },
 
  computed: {
    ...mapState(useAuthStore, ["userToken", "allPosts"]),

    searchedPosts() {
      return this.allPosts.filter(({ title }) =>
        [title].some((val) => val.toLowerCase().includes(this.searchQuery))
      );
    },
  },

  methods: {
    ...mapActions(useAuthStore, ["getPosts"]),

    filterPosts() {
      return new Promise((resolve, reject) => {
        axios
          .get("http://localhost:80/api/posts/filter", {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((response) => {
            if (!response) {
              return;
            }

            console.log(response);
            resolve();
          })
          .catch((error) => {
            reject(error.response);
          });
      });
    },
  },

  mounted() {
    this.filterPosts();

    this.getPosts();
  },
};
</script>
  
  <style lang="scss" scoped>
</style>
  