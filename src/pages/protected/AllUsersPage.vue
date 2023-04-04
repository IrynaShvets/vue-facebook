<template>
  <div>
    <header-app />
    <container-app>
      <main>
        <section>
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
                  <img
                    src="https://i.gyazo.com/50c000c0e4715eba3a2d778c01ac1c5c.png"
                    alt="{{ user.name }}"
                    width="70"
                    height="auto"
                  />

                  <div class="ml-10">
                    <h3 class="font-medium text-gray-500">user name</h3>
                    <h2 class="mt-1 text-gray-900">{{ user.name }}</h2>
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
      </main>
    </container-app>
    <footer-app />
  </div>
</template>
  
  <script>
import ContainerApp from "../../shared/ContainerApp.vue";
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "../../store/auth";
import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";

export default {
  name: "AllUsersPage",
  components: {
    ContainerApp,
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
  },
};
</script>
  
  <style lang="scss" scoped>
</style>
  