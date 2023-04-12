<template>
    <div>
      <header-app />
      <section
        class="bg-gradient-to-r from-indigo-700 from-10% via-sky-700 via-30% to-emerald-700 to-90%"
      >
        <div>
          <div class="flex items-center px-4 py-5 sm:px-6">
            <div v-if="image">
              <img
                class="w-[270px] h-[270px] rounded-[100%] align-middle border-red-900 border-2"
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
  
        <h2>Friends</h2>
        <ul v-if="friends">
          <li v-for="friend in friends" :key="friend.id">
            <div class="flex-initial w-3/5">
              <p>Name: {{ friend.name }}</p>
            </div>
            
  
          </li>
        </ul>
       
      </section>
      <footer-app class="fixed bottom-0 left-0 right-0" />
    </div>
  </template>
  
  <script>
  import { mapState } from "pinia";
  import { useAuthStore } from "../../store/auth";
  import axios from "axios";
  
  export default {
    name: "ProfilePage",
  
    data() {
      return {
        id: "",
        email: "",
        name: "",
        image: "",
        created_at: "",
        friends: [],
      };
    },
  
    computed: {
      ...mapState(useAuthStore, ["getToken", "authUserId"]),
    },
  
    methods: {
      getUser() {
        return new Promise((resolve, reject) => {
          axios
            .get(`http://localhost:80/api/users/${this.authUserId}`, {
              headers: {
                Authorization: `Bearer ${this.getToken}`,
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
              console.log();
  
              resolve();
            })
            .catch((error) => {
              reject(error.response);
            });
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