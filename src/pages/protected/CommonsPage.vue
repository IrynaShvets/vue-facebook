<template>
    <div class="relative">
      <header-app
        class="fixed z-10 top-0 left-0 w-screen border-b-2 border-white"
      />
      <sidebar-home
        class="fixed w-[250px] h-[100%] overflow-y-auto bg-[#001524]"
      />
  
      <section class="absolute overflow-y-auto left-[290px] top-[80px] right-[0]">

        <h1 class="text-gray-900">All Community</h1>
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
                  <button
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
  
        
      </section>
    </div>
  </template>
    
  <script>
//   import axios from "axios";
  import { mapState, mapActions } from "pinia";
  import { useAuthStore } from "../../store/auth";
  // import { getListFriends } from "../../services/user.service";
  
  export default {
    name: "CommonsPage",
    components: {
      
    },
  
    data() {
      return {
        
        commons: null,
        
        
      };
    },
  
    computed: {
      ...mapState(useAuthStore, ["getToken", "authUserId"]),
    },
  
    methods: {
      ...mapActions(useAuthStore, ["createCommon", "getCommons"]),
  
     

    getCommonsList() {
      this.getCommons().then(
        (response) => {
          this.commons = response.data;
          
        }
      );
    },
    },
  
    mounted() {
      
      // getListFriends();
      //yfна отримання списку своїх комуніті +  пост на додавання себе до комуніті  так як френдс
    },
  };
  </script>
    
    <style lang="scss" scoped>
  </style>
    