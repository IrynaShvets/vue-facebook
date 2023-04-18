<template>
  <div class="relative">
    <header-app
      class="fixed z-10 top-0 left-0 w-screen border-b-2 border-b-white"
    />
    <sidebar-home
      class="fixed flex justify-center w-[250px] h-[100%] overflow-y-auto bg-[#001524]"
    />
    <section class="absolute overflow-y-auto top-[80px] w-[70%] right-[5%]">
      <h1 class="text-[30px]">Friends</h1>
      <ul v-if="friends" class="mr-[20px]">
        <li v-for="friend in friends" :key="friend.id" class="mb-10">
          <div
            class="flex items-center justify-between bg-[#02051160] shadow sm:rounded-lg px-4 py-5 sm:px-6"
          >
            <div class="flex items-center">
              <div v-if="friend.image">
                <img
                  class="w-[100px] h-[100px] rounded-[50%] align-middle border-slate-900 border-2"
                  :src="friend.image"
                  :alt="friend.name"
                />
              </div>

              <div v-else>
                <img
                  class="w-[70px] h-[70px] rounded-[50%] align-middle"
                  src="https://i.gyazo.com/50c000c0e4715eba3a2d778c01ac1c5c.png"
                  :alt="friend.name"
                />
              </div>

              <div class="ml-10">
                <h3 class="font-medium text-[30px] text-gray-500">
                  {{ friend.name }}
                </h3>
                <h2 class="mt-1 text-gray-900">{{ friend.email }}</h2>
              </div>
            </div>

            <div class="flex items-center">
              <span
                @click="redirectChat(friend.id)"
                class="w-[100px] h-[auto] text-[22px] mr-2 rounded py-2 px-4 transition-all duration-500 bg-gradient-to-br to-white via-black from-blue-400 bg-size-200 hover:bg-right-bottom text-gray-800 hover:text-white"
                >Chat</span
              >
              <button type="button" @click="deleteFriend(friend.id)">
                <svg
                  class="inline-block w-7 h-7 stroke-current stroke-0 fill-black hover:fill-white"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M18 7v13c0 0.276-0.111 0.525-0.293 0.707s-0.431 0.293-0.707 0.293h-10c-0.276 0-0.525-0.111-0.707-0.293s-0.293-0.431-0.293-0.707v-13zM17 5v-1c0-0.828-0.337-1.58-0.879-2.121s-1.293-0.879-2.121-0.879h-4c-0.828 0-1.58 0.337-2.121 0.879s-0.879 1.293-0.879 2.121v1h-4c-0.552 0-1 0.448-1 1s0.448 1 1 1h1v13c0 0.828 0.337 1.58 0.879 2.121s1.293 0.879 2.121 0.879h10c0.828 0 1.58-0.337 2.121-0.879s0.879-1.293 0.879-2.121v-13h1c0.552 0 1-0.448 1-1s-0.448-1-1-1zM9 5v-1c0-0.276 0.111-0.525 0.293-0.707s0.431-0.293 0.707-0.293h4c0.276 0 0.525 0.111 0.707 0.293s0.293 0.431 0.293 0.707v1zM9 11v6c0 0.552 0.448 1 1 1s1-0.448 1-1v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1zM13 11v6c0 0.552 0.448 1 1 1s1-0.448 1-1v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useAuthStore } from "../../store/auth";
import axios from "axios";

export default {
  name: "FriendsPage",

  data() {
    return {
      friends: [],
      id: null,
    };
  },

  computed: {
    ...mapState(useAuthStore, ["token", "authUserId"]),
  },

  methods: {
    redirectChat(id) {
      this.$router.push({
        name: "chat",
        params: {
          id: id,
        },
      });
    },

    getFriends() {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://localhost:80/api/users/${this.authUserId}`, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((response) => {
            if (!response) {
              reject(response);
            }
            this.friends = response.data.data.friends;
            resolve();
          })
          .catch((error) => {
            reject(error.response);
          });
      });
    },

    deleteFriend(id) {
      axios
        .delete(`http://localhost:80/api/friend/${id}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          if (!response) {
            return;
          }
          this.friends = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  mounted() {
    this.getFriends();
  },
};
</script>

<style lang="scss" scoped>
</style>