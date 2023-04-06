<template>
  <div class="relative">
    <header-app class="fixed z-10 top-0 left-0 w-screen" />
    <sidebar-home class="fixed w-[250px] h-[100%] overflow-y-auto bg-[#001524]"/>
   
        <section class="absolute overflow-y-auto top-[80px] w-[70%] right-[5%]">
          <h1 class="text-gray-900">All posts</h1>
          <ul v-if="userToken && allPosts">
            <li
              v-for="post in allPosts"
              :id="post.id"
              :key="post.id"
              class="mb-10"
            >
              <div class="overflow-hidden bg-white shadow sm:rounded-lg">
                <div class="flex items-center justify-center px-4 py-5 sm:px-6">
                  <div v-if="post.image">
                     <img
                      :src="'http://localhost:80/storage/' +post.image"
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
                      class="bg-gradient-to-r from-indigo-800 to-yellow-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                    >
                      <dt class="text-sm font-medium text-[#ffecd1]">
                        Post description
                      </dt>
                      <dd
                        class="mt-1 text-sm text-[#ffecd1] sm:col-span-2 sm:mt-0"
                      >
                        {{ post.description }}
                      </dd>
                    </div>
                    <div
                      class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                    >
                      <dt class="text-sm font-medium text-dark-500">
                        Post body
                      </dt>
                      <dd
                        class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"
                      >
                        {{ post.body }}
                      </dd>
                    </div>
                    <div
                      class="bg-gradient-to-r from-indigo-800 to-yellow-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                    >
                      <dt class="text-sm font-medium text-[#ffecd1]">
                        Post created
                      </dt>
                      <dd
                        class="mt-1 text-sm text-[#ffecd1] sm:col-span-2 sm:mt-0"
                      >
                        {{ post.created_at }}
                      </dd>
                    </div>
                    <div
                      class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                    >
                      <dt class="text-sm font-medium text-gray-500">
                        User post
                      </dt>
                      <dd
                        v-if="post.user"
                        class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"
                      >
                        {{ post.user.name }}
                      </dd>
                    </div>
                  </dl>
                </div>

                <router-link :to="'/post-update/' + post.id"
                class="flex flex-1 items-center p-2 bg-indigo-200 hover:bg-purple-500 text-gray-800 hover:text-white transition-colors">
                <svg class="inline-block w-5 h-5 stroke-current stroke-0 fill-gray mr-2" viewBox="0 0 20 20">
                  <path
                    d="M3.828 9l6.071-6.071-1.414-1.414-8.485 8.485 8.485 8.485 1.414-1.414-6.071-6.071h16.172v-2h-16.172z">
                  </path>
                </svg>
                <span>More info</span>
              </router-link>
              </div>
            </li>
          </ul>

          <!-- <div class="my-20">
            <VueTailwindPagination
              :current="currentPage"
              :total="totalPosts"
              :per-page="perPage"
              @page-changed="onPageClick($event)"
              text-before-input="Go to page"
              text-after-input="Forward"
            />
          </div> -->
        </section>
      
    <footer-app class="fixed bottom-0 left-0"/>
  </div>
</template>
  
<script>

import { mapActions, mapState } from "pinia";
import { useAuthStore } from "../../store/auth";
// import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";

export default {
  name: "AllPostsPage",
  components: {
    // VueTailwindPagination,
  },

  data() {
    return {      
    };
  },

  computed: {
    ...mapState(useAuthStore, [
      "userToken",
      "allPosts",
      // "currentPage",
      // "perPage",
      // "totalPosts",
    ]),
  },

  methods: {
    ...mapActions(useAuthStore, ["getPosts"]),

    onPageClick(event) {
      this.currentPage = event;
      this.getPosts(this.currentPage);
    },
  },

  mounted() {
    this.getPosts();
  },
};
</script>
  
  <style lang="scss" scoped>
</style>
  