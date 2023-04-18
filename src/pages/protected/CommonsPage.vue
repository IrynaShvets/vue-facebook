<template>
    <div class="relative">
      <header-app
        class="fixed z-10 top-0 left-0 w-screen border-b-2 border-white"
      />
      <sidebar-home
      class="fixed flex justify-center w-[250px] h-[100%] overflow-y-auto bg-[#001524]"
    />
    <section class="absolute overflow-y-auto top-[80px] w-[70%] right-[5%]">

        <h1 class="text-gray-900">All Community</h1>
        <ul v-if="commons" class="mr-[40px]">
          <li v-for="common in commons" :id="common.id" :key="common.id" class="mb-10">
            <div
              
              class="flex items-center justify-between overflow-hidden bg-white shadow sm:rounded-lg"
            >
              <div class="flex items-center px-4 py-5 sm:px-6">
  
                <div class="ml-10">
                  <h3 class="font-medium text-[30px] text-gray-500">{{ common.title }}</h3>
                
                </div>
              </div>
  
              <div class="flex">
                <router-link
                  :to="{ name: 'common', params: { id: common.id } }"
                  class="flex flex-1 items-center rounded transition-all duration-500 bg-gradient-to-br to-white via-black from-yellow-500 bg-size-200 hover:bg-right-bottom p-2 border-r-2 border-white text-gray-800 hover:text-white"
                >
                  <span>More info about community</span>
                </router-link>
                </div>
  
                <div>
                  <button
                    type="button"
                    @click="addCommonToList(common.id)"
                    id="common.id"
                    class="flex flex-1 items-center rounded p-2 transition-all duration-500 bg-gradient-to-br to-white via-black from-yellow-500 bg-size-200 hover:bg-right-bottom text-gray-800 hover:text-white"
                  >
                    Add common
                  </button>
                </div>

              </div>
            
          </li>
        </ul>
      </section>
    </div>
  </template>
    
  <script>
  import axios from "axios";
  import { mapState, mapActions } from "pinia";
  import { useAuthStore } from "../../store/auth";
  
  export default {
    name: "CommonsPage",
    components: {
      
    },
  
    data() {
      return {
        
        commons: null,
        existIndex: "",
      };
    },
  
    computed: {
      ...mapState(useAuthStore, ["token", "authUserId"]),
    },
  
    methods: {
      ...mapActions(useAuthStore, ["createCommon", "getCommons"]),
  
    getCommonsList() {
      this.getCommons().then(
        (response) => {
          this.commons = response.data;
          console.log(response)
        }
      );
    },

    addCommonToList(id) {
      this.existIndex = this.commons.findIndex((el) => el.id === id);

      if (this.existIndex !== -1) {
        alert("No need to join this community, you are in it.");
      }
      if (this.existIndex === -1) {
        alert("You have successfully joined the community.");
      }

      axios
        .post(`http://localhost:80/api/common/${id}`, null, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          if (!response.data.data) {
            return;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    },
  
    mounted() {
        this.getCommonsList();
    },
  };
  </script>
    
    <style lang="scss" scoped>
  </style>
    