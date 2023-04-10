<template>
  <div class="relative">
    <header-app class="fixed z-10 top-0 left-0 w-screen" />
    <sidebar-home
      class="fixed w-[250px] h-[100%] overflow-y-auto bg-[#001524]"
    />

    <section class="absolute overflow-y-auto top-[80px] w-[70%] right-[5%]">
      <div>
        <form @click.prevent="getPostsList">
          <input
          type="text"
          name="searchQuery"
          class="w-[500px] h-[42px] py-4 px-6 border-0 outline-0"
          v-model="searchQuery"
          placeholder="Search posts"
        />

        <button type="submit">Search</button>
        </form>
        
      </div>
      <h1 class="text-gray-900">All posts</h1>
      <ul v-if="posts">
        <li
          v-for="post in posts"
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

      <div class="my-20">
            <VueTailwindPagination
              v-if="pagination"
              :current="pagination.current_page"
              :total="pagination.total"
              :per-page="pagination.per_page"
              @page-changed="onPageClick($event)"
              text-before-input="Go to page"
              text-after-input="Forward"
            />
          </div>
    </section>
  </div>
</template>
  
<script>
import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "../../store/auth";

export default {
  name: "AllPostsPage",
  components: {
    VueTailwindPagination,
  },

  data() {
    return {
      searchQuery: "",
      posts:  null,
      pagination: null,
      currentPage: 1,
    };
  },
 
  computed: {
    ...mapState(useAuthStore, ["userToken"]),
  },

  methods: {
    ...mapActions(useAuthStore, ["getPosts"]),

    onPageClick(event) {
      this.currentPage = event;
      this.getPostsList();
    },

    getPostsList() {
      this.getPosts(this.currentPage, {title: this.searchQuery}).then((response) => {
        this.posts = response.data;
        this.pagination = response.meta;
      });
    }
  },

  mounted() {
    this.getPostsList();
  },

};
</script>
  
  <style lang="scss" scoped>
</style>
  