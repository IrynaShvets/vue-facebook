<template>
  <div class="relative">
    <header-app
      class="fixed z-10 top-0 left-0 w-screen border-b-2 border-white"
    />
    <sidebar-home
      class="fixed w-[250px] h-[100%] overflow-y-auto bg-[#001524]"
    />

    <section class="absolute overflow-y-auto top-[80px] right-[20%]">
      <div>
        <form @click.prevent="getUsersList">
          <input
            type="text"
            name="searchQuery"
            class="w-[500px] h-[42px] py-4 px-6 border-0 outline-0"
            v-model="searchQuery"
            placeholder="Search users"
          />

          <button type="submit">Search</button>
        </form>
      </div>
      <h1 class="text-gray-900">All Users</h1>
      <ul v-if="users">
        <li v-for="user in users" :id="user.id" :key="user.id" class="mb-10">
          <div class="overflow-hidden bg-white shadow sm:rounded-lg">
            <div class="flex items-center px-4 py-5 sm:px-6">
              <div v-if="user.image">
                <img
                  class="w-[70px] h-[70px] rounded-[50%] align-middle border-slate-900 border-2"
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
                <h3 class="font-medium text-gray-500">{{ user.name }}</h3>
                <h2 class="mt-1 text-gray-900">{{ user.email }}</h2>
              </div>
            </div>

            <div class="flex">
              <router-link
                :to="{ name: 'user', params: { id: user.id } }"
                class="flex flex-1 items-center p-2 border-r-2 border-white bg-indigo-200 hover:bg-indigo-500 text-gray-800 hover:text-white transition-colors"
              >
                <span>More info about user</span>
              </router-link>

              <button
                type="button"
                @click="addFriendToList(user.id)"
                id="user.id"
                class="flex flex-1 items-center p-2 bg-indigo-200 hover:bg-indigo-500 text-gray-800 hover:text-white transition-colors"
              >
                Add friend
              </button>
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
import axios from 'axios';
import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "../../store/auth";

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
    };
  },

  computed: {
    ...mapState(useAuthStore, ["getToken", "authUserId"]),

    // generateGetUsersList (id) {
    //   return this.addFriendToList(id)
    // },
  },

  methods: {
    ...mapActions(useAuthStore, ["getUsers"]),

    onPageClick(event) {
      this.currentPage = event;
      this.getUsersList();
    },

    getUsersList() {
      this.getUsers(this.currentPage, { name: this.searchQuery }).then(
        (response) => {
          this.users = response.data;
          this.pagination = response.meta;
        }
      );
    },

    addFriendToList(id) {
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
            if (id === this.authUserId) {
              alert("You don't need to add myself to your friends list.");
              
            }
            if (id !== this.authUserId) {
               this.friends = response.data.data;
               
               this.friends.map((el) => {
                if (el.id === id) {
                  alert("You have added this user to your friends list already.");
                  return;
               }})

            alert("You have added this user to your friends list.");
            // return response.data;
            }
            // console.log(this.friends)
           
          })
          .catch((error) => {
            console.log(error);
          });
    },
  },

  mounted() {
    this.getUsersList();
  },
};
</script>
  
  <style lang="scss" scoped>
</style>
  