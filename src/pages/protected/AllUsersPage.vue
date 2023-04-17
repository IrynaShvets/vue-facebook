<template>
  <div class="relative">
    <header-app
      class="fixed z-10 top-0 left-0 w-screen border-b-2 border-white"
    />
    <sidebar-home
      class="fixed w-[250px] h-[100%] overflow-y-auto bg-[#001524]"
    />

    <section class="absolute overflow-y-auto left-[290px] top-[80px] right-[0]">
      <div class="">
        <form @click.prevent="getUsersList" class="relative mr-[40px]">
          <input
            type="text"
            name="searchQuery"
            class="w-[100%] h-[42px] py-4 px-6 border-0 outline-0"
            v-model="searchQuery"
            placeholder="Search users"
          />

          <button type="submit" class="w-[170px] h-[100%] absolute right-[0] transition-all duration-500 bg-gradient-to-br to-white via-black from-yellow-400 bg-size-200 hover:bg-right-bottom text-gray-800 hover:text-white">Search</button>
        </form>
      </div>
      <h1 class="text-gray-900">All Users</h1>


      <ul v-if="users" class="mr-[40px]">
        <li v-for="user in users" :id="user.id" :key="user.id" class="mb-10">
          <div
            v-if="user.id !== authUserId"
            class="flex items-center justify-between overflow-hidden bg-white shadow sm:rounded-lg"
          >
            <div class="flex items-center px-4 py-5 sm:px-6">
              <div v-if="user.image">
                <img
                  class="w-[100px] h-[100px] rounded-[50%] align-middle border-slate-900 border-2"
                  :src="user.image"
                  :alt="user.name"
                />
              </div>

              <div v-else>
                <img
                  class="w-[70px] h-[70px] rounded-[50%] align-middle"
                  src="https://i.gyazo.com/50c000c0e4715eba3a2d778c01ac1c5c.png"
                  :alt="user.name"
                />
              </div>

              <div class="ml-10">
                <h3 class="font-medium text-[30px] text-gray-500">{{ user.name }}</h3>
                <h2 class="mt-1 text-gray-900">{{ user.email }}</h2>
              </div>
            </div>

            <div class="flex">
              <router-link
                :to="{ name: 'user', params: { id: user.id } }"
                class="flex flex-1 items-center rounded transition-all duration-500 bg-gradient-to-br to-white via-black from-yellow-500 bg-size-200 hover:bg-right-bottom p-2 border-r-2 border-white text-gray-800 hover:text-white"
              >
                <span>More info about user</span>
              </router-link>

              <div>
                <span v-if="myFriend(user.id)">My friend </span>
                <button
                  v-else
                  type="button"
                  @click="addFriendToList(user.id)"
                  id="user.id"
                  class="flex flex-1 items-center rounded p-2 transition-all duration-500 bg-gradient-to-br to-white via-black from-yellow-500 bg-size-200 hover:bg-right-bottom text-gray-800 hover:text-white"
                >
                  Add friend
                </button>
              </div>
            </div>
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
import axios from "axios";
import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "../../store/auth";
// import { getListFriends } from "../../services/user.service";

export default {
  name: "AllUsersPage",
  components: {
    VueTailwindPagination,
  },

  data() {
    return {
      searchQuery: "",
      users: null,
      userId: "",
      pagination: null,
      currentPage: 1,
      friends: [],
      existIndex: null,
    };
  },

  computed: {
    ...mapState(useAuthStore, ["getToken", "authUserId"]),
  },

  methods: {
    ...mapActions(useAuthStore, ["getUsers"]),

    onPageClick(event) {
      this.currentPage = event;
      this.getUsersList();
    },
    myFriend(id) {
      let index = this.friends.findIndex(friend => friend.id === id);
      return index !== -1;
    },
    getUsersList() {
      this.getUsers(this.currentPage, { name: this.searchQuery }).then(
        (response) => {
          this.users = response.data;
          this.pagination = response.meta;
        }
      );
    },

    getFriends() {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://localhost:80/api/users/${this.authUserId}`, {
            headers: {
              Authorization: `Bearer ${this.getToken}`,
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

    addFriendToList(id) {
      this.existIndex = this.friends.findIndex((el) => el.id === id);

      if (this.existIndex !== -1) {
        alert("You have added this user to your friends list already.");
      }
      if (this.existIndex === -1) {
        alert("You have successfully added a friend.");
      }

      axios
        .post(`http://localhost:80/api/friend/${id}`, null, {
          headers: {
            Authorization: `Bearer ${this.getToken}`,
          },
        })
        .then((response) => {
          if (!response.data.data) {
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
    this.getUsersList();
    // getListFriends();
    this.getFriends();
  },
};
</script>
  
  <style lang="scss" scoped>
</style>
  