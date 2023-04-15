<template>
  <div>
    <header-app />
    <section class="p-20">
      <h1 class="text-gray-900 text-[40px]">Common</h1>

      <div>
        <div class="flex px-4 py-5 sm:px-6">
          <div v-show="image">
            <img
              class="w-[570px] h-[auto] align-middle border-yellow-500 border-2"
              :src="image"
              alt="post"
            />
          </div>

          <div class="ml-10">
            <h3 class="font-medium text-[25px] text-gray-500">
              Title common: {{ title }}
            </h3>

            <ul v-if="users" class="mr-[40px]">
              <li
                v-for="user in users"
                :id="user.id"
                :key="user.id"
                class="mb-10"
              >
                <div
                 
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
                      <h3 class="font-medium text-[30px] text-gray-500">
                        {{ user.name }}
                      </h3>
                      <h2 class="mt-1 text-gray-900">{{ user.email }}</h2>
                    </div>
                  </div>

                 
                </div>
              </li>
            </ul>
            
          </div>
        </div>
      </div>
    </section>
    <footer-app class="fixed bottom-0 left-0 right-0" />
  </div>
</template>
  
  <script>
import { mapState } from "pinia";
import { useAuthStore } from "../../store/auth";
import axios from "axios";

export default {
  name: "CommonPage",

  data() {
    return {
      users: null,
      title: "",
    };
  },

  computed: {
    ...mapState(useAuthStore, ["token"]),
  },

  methods: {
    getCommon() {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://localhost:80/api/common/${this.$route.params.id}/show`, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((response) => {
            if (!response) {
              return;
            }
            this.title = response.data.data.title;
            this.users = response.data.data.users;
            //   this.id = response.data.data.id;
            //   this.name = response.data.data.name;
            //   this.email = response.data.data.email;
            //   this.image = response.data.data.image;
            console.log(response);
            resolve();
          })
          .catch((error) => {
            reject(error.response);
          });
      });
    },
  },

  mounted() {
    this.getCommon();
  },
};
</script>
  
  <style>
</style>