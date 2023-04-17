<template>
  <div>
    <header-app />
    <container-app>
      <section class="">
        <div>
          <div class="flex items-center px-4 py-5 sm:px-6">
            <div v-if="image">
              <img
                class="w-[270px] h-[270px] rounded-[100%] align-middle"
                :src="image"
                :alt="name"
              />
            </div>

            <div class="ml-10">
              <h3 class="text-[34px] text-gray-900">{{ name }}</h3>
              <h2 class="text-[24px] mt-1 text-gray-900">{{ email }}</h2>
              <p class="text-[24px] mt-1 text-gray-900">{{ created_at }}</p>
            </div>
          </div>
        </div>
      </section>
      <div class="border-white border-b-2"></div>
      <section class="py-[40px]">
        <h2 class="text-[20px] mb-6">My friends</h2>
        <ul v-if="friends" class="grid grid-cols-5 gap-4">
          <li
            v-for="friend in friends"
            :key="friend.id"
            class="flex items-center p-2 w-[220px] h-[70px] bg-white shadow-[10px_10px_8px_2px_rgba(0,0,0,0.3)] hover:scale-[1.05] hover:transition hover:duration-700 hover:ease-in-out"
          >
            <div v-if="friend.image">
              <img
                class="w-[60px] h-[60px] rounded-[100%] align-middle"
                :src="friend.image"
                :alt="friend.name"
              />
            </div>
            <p>{{ friend.name }}</p>
          </li>
        </ul>
      </section>

      <div class="border-white border-b-2"></div>

      <section class="py-[40px]">
        <h2 class="text-[20px] mb-6">My communities</h2>
        <ul v-if="commons" class="grid grid-cols-4 gap-4">
          <li
            v-for="common in commons"
            :key="common.id"
            class="flex items-center cursor-pointer relative text-2xl bg-red-200 p-2 w-[280px] h-[auto] shadow-[10px_10px_8px_2px_rgba(0,0,0,0.3)] hover:scale-[1.05] hover:transition hover:duration-700 hover:ease-in-out"
          >
            
              <p>{{ common.title }}</p>
              <button type="button" @click="deleteCommon(common.id)" class="absolute top-2 right-[40px]">
          <svg
                class="inline-block w-7 h-7 stroke-current stroke-0 fill-black hover:fill-[#00000070]"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21 5c0.276 0 0.525 0.111 0.707 0.293s0.293 0.431 0.293 0.707v12c0 0.276-0.111 0.525-0.293 0.707s-0.431 0.293-0.707 0.293h-12.546l-6.125-7 6.125-7zM21 3h-13c-0.3 0-0.568 0.132-0.753 0.341l-7 8c-0.333 0.38-0.326 0.942 0 1.317l7 8c0.198 0.226 0.474 0.341 0.753 0.342h13c0.828 0 1.58-0.337 2.121-0.879s0.879-1.293 0.879-2.121v-12c0-0.828-0.337-1.58-0.879-2.121s-1.293-0.879-2.121-0.879zM11.293 9.707l2.293 2.293-2.293 2.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l2.293-2.293 2.293 2.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-2.293-2.293 2.293-2.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-2.293 2.293-2.293-2.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"
                ></path>
              </svg>
          </button>

            <router-link
              :to="{ name: 'common', params: { id: common.id }  }"
              class="absolute top-2 right-[10px]"
            >
              <svg
                class="inline-block w-7 h-7 stroke-current stroke-0 fill-black hover:fill-[#00000070]"
                viewBox="0 0 24 24"
              >
                <path
                  d="M14 12c0-0.552-0.225-1.053-0.586-1.414s-0.862-0.586-1.414-0.586-1.053 0.225-1.414 0.586-0.586 0.862-0.586 1.414 0.225 1.053 0.586 1.414 0.862 0.586 1.414 0.586 1.053-0.225 1.414-0.586 0.586-0.862 0.586-1.414zM14 5c0-0.552-0.225-1.053-0.586-1.414s-0.862-0.586-1.414-0.586-1.053 0.225-1.414 0.586-0.586 0.862-0.586 1.414 0.225 1.053 0.586 1.414 0.862 0.586 1.414 0.586 1.053-0.225 1.414-0.586 0.586-0.862 0.586-1.414zM14 19c0-0.552-0.225-1.053-0.586-1.414s-0.862-0.586-1.414-0.586-1.053 0.225-1.414 0.586-0.586 0.862-0.586 1.414 0.225 1.053 0.586 1.414 0.862 0.586 1.414 0.586 1.053-0.225 1.414-0.586 0.586-0.862 0.586-1.414z"
                ></path>
              </svg>
            </router-link>
          </li>
        </ul>
      </section>

      <div class="border-white border-b-2"></div>

      <section class="py-[40px]">
        <h2 class="text-[20px] mb-6">My posts</h2>
        <ul v-if="posts" class="grid grid-cols-2 gap-10">
          <li
            v-for="post in posts"
            :key="post.id"
            class="relative flex items-center cursor-pointer rounded w-[540px] h-[350px] shadow-[10px_10px_8px_2px_rgba(0,0,0,0.3)]"
          >
            
          <button type="button" @click="deletePost(post.id)" class="absolute top-2 right-[70px]">
          <svg
                class="inline-block w-7 h-7 stroke-current stroke-0 fill-black hover:fill-[#00000070]"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21 5c0.276 0 0.525 0.111 0.707 0.293s0.293 0.431 0.293 0.707v12c0 0.276-0.111 0.525-0.293 0.707s-0.431 0.293-0.707 0.293h-12.546l-6.125-7 6.125-7zM21 3h-13c-0.3 0-0.568 0.132-0.753 0.341l-7 8c-0.333 0.38-0.326 0.942 0 1.317l7 8c0.198 0.226 0.474 0.341 0.753 0.342h13c0.828 0 1.58-0.337 2.121-0.879s0.879-1.293 0.879-2.121v-12c0-0.828-0.337-1.58-0.879-2.121s-1.293-0.879-2.121-0.879zM11.293 9.707l2.293 2.293-2.293 2.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l2.293-2.293 2.293 2.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-2.293-2.293 2.293-2.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-2.293 2.293-2.293-2.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"
                ></path>
              </svg>
          </button>

            <router-link
              :to="{ name: 'postUpdate', params: { id: post.id } }"
              class="absolute top-2 right-[40px]"
            >
              <svg
                class="inline-block w-6 h-6 stroke-current stroke-0 fill-black hover:fill-[#00000070]"
                viewBox="0 0 20 20"
              >
                <path
                  d="M12.3 3.7l4 4-12.3 12.3h-4v-4l12.3-12.3zM13.7 2.3l2.3-2.3 4 4-2.3 2.3-4-4z"
                ></path>
              </svg>
            </router-link>

            <router-link
              :to="{ name: 'post', params: { id: post.id } }"
              class="absolute top-2 right-[10px]"
            >
              <svg
                class="inline-block w-7 h-7 stroke-current stroke-0 fill-black hover:fill-[#00000070]"
                viewBox="0 0 24 24"
              >
                <path
                  d="M14 12c0-0.552-0.225-1.053-0.586-1.414s-0.862-0.586-1.414-0.586-1.053 0.225-1.414 0.586-0.586 0.862-0.586 1.414 0.225 1.053 0.586 1.414 0.862 0.586 1.414 0.586 1.053-0.225 1.414-0.586 0.586-0.862 0.586-1.414zM14 5c0-0.552-0.225-1.053-0.586-1.414s-0.862-0.586-1.414-0.586-1.053 0.225-1.414 0.586-0.586 0.862-0.586 1.414 0.225 1.053 0.586 1.414 0.862 0.586 1.414 0.586 1.053-0.225 1.414-0.586 0.586-0.862 0.586-1.414zM14 19c0-0.552-0.225-1.053-0.586-1.414s-0.862-0.586-1.414-0.586-1.053 0.225-1.414 0.586-0.586 0.862-0.586 1.414 0.225 1.053 0.586 1.414 0.862 0.586 1.414 0.586 1.053-0.225 1.414-0.586 0.586-0.862 0.586-1.414z"
                ></path>
              </svg>
            </router-link>
            <div v-if="post.image">
              <img
                class="w-[540px] h-[350px]"
                :src="post.image"
                :alt="post.title"
              />
            </div>
            <div
              class="absolute bottom-0 right-0 left-0 h-[auto] w-[100%] p-2 bg-[#00000050]"
            >
              <p class="text-white">{{ post.title }}</p>
            </div>
          </li>
        </ul>
      </section>
    </container-app>

    <footer-app class="" />
  </div>
</template>
  
  <script>
import { mapState } from "pinia";
import axios from "axios";
import { useAuthStore } from "../../store/auth";
import ContainerApp from "../../shared/ContainerApp.vue";

export default {
  name: "ProfilePage",

  components: {
    ContainerApp,
  },

  data() {
    return {
      id: "",
      email: "",
      name: "",
      image: "",
      created_at: "",
      friends: [],
      posts: [],
      commons: [],
    };
  },

  computed: {
    ...mapState(useAuthStore, ["token", "authUserId"]),
  },

  methods: {
    getUser() {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://localhost:80/api/users/${this.authUserId}`, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((response) => {
            if (!response) {
              return;
            }
            this.id = response.data.data.id;
            this.email = response.data.data.email;
            this.name = response.data.data.name;
            this.image = response.data.data.image;
            this.created_at = response.data.data.created_at;
            this.friends = response.data.data.friends;
            this.posts = response.data.data.posts;
            this.commons = response.data.data.commons;
            resolve();
          })
          .catch((error) => {
            reject(error.response);
          });
      });
    },

    deletePost(id) {
      axios
        .delete(`http://localhost:80/api/post/${id}/delete`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          if (!response) {
            return;
          }
          this.getUser();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deleteCommon(id) {
      axios
        .delete(`http://localhost:80/api/common/${id}/delete`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          if (!response) {
            return;
          }
          this.commons = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  mounted() {
    this.getUser();
  },
};
</script>
  
  <style>
</style>