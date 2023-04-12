<template>
  <div class="relative">
    <header-app
      class="fixed z-10 top-0 left-0 w-screen border-b-2 border-b-white"
    />
    <sidebar-home
      class="fixed w-[250px] h-[100%] overflow-y-auto bg-[#001524]"
    />
    <section class="absolute overflow-y-auto left-[270px] top-[80px] right-[0]">
      <h1 class="text-[30px]">Friends</h1>
      <ul v-if="friends" class="mr-[20px]">
        <li
          v-for="friend in friends"
          :key="friend.id"
          class="flex items-center justify-between h-[70px] bg-[#78290fa2] mb-3 p-4 rounded hover:bg-[#78290f] hover:text-white"
        >
          <div class="">
            <p>{{ friend.name }}</p>
          </div>
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
    ...mapState(useAuthStore, ["getToken", "authUserId"]),
  },



  methods: {
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

    deleteFriend(id) {
      
        axios
          .delete(`http://localhost:80/api/friend/${id}`, {
            headers: {
              Authorization: `Bearer ${this.getToken}`,
            },
          })
          .then((response) => {
            if (!response) {
                return;
            }
            
            this.friends = response.data.data;
            console.log(response.data.data)
            //alert("Do you want to delete friend?");
          })
          .catch((error) => {
            console.log(error);
          });
    },
  },

  mounted() {
    this.getFriends();
    // this.deleteFriend();
  },
};
</script>

<style lang="scss" scoped>
</style>