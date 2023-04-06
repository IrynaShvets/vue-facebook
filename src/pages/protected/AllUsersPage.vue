<template>
  <div class="relative">
    <header-app class="fixed z-10 top-0 left-0 w-screen" />
    <sidebar-home class="fixed w-[250px] h-[100%] overflow-y-auto bg-[#001524]"/>
    
        <section class="absolute overflow-y-auto top-[80px] right-[20%]">
          <h1 class="text-gray-900">All Users</h1>
          <ul v-if="userToken && allUsers">
            <li
              v-for="user in allUsers"
              :id="user.id"
              :key="user.id"
              class="mb-10"
            >
              <div class="overflow-hidden bg-white shadow sm:rounded-lg">
                <div class="flex items-center px-4 py-5 sm:px-6">

                  <div v-if="user.image">
                     <img
                     class="w-[70px] h-[70px] rounded-[50%] align-middle border-slate-900 border-2"
                      :src="user.image"
                      :alt="user.title"
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
              </div>
            </li>
          </ul>

          <div class="my-20">
            <VueTailwindPagination
              :current="currentPage"
              :total="totalPosts"
              :per-page="perPage"
              @page-changed="onPageClick($event)"
              text-before-input="Go to page"
              text-after-input="Forward"
            />
          </div>
        </section>
      
    <footer-app class="fixed bottom-0 left-0"/>
  </div>
</template>
  
  <script>
// import ContainerApp from "../../shared/ContainerApp.vue";
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "../../store/auth";
import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";

export default {
  name: "AllUsersPage",
  components: {
    
    VueTailwindPagination,
  },

  data() {
    return {};
  },

  computed: {
    ...mapState(useAuthStore, [
      "userToken",
      "allUsers",
      "currentPage",
      "perPage",
      "totalPosts",
    ]),
  },

  methods: {
    ...mapActions(useAuthStore, ["getUsers"]),

    onPageClick(event) {
      this.currentPage = event;
      this.getUsers(this.currentPage);
    },
  },

  mounted() {
    this.getUsers();
    console.log(this.getUsers())
  },
};
</script>
  
  <style lang="scss" scoped>
</style>
  