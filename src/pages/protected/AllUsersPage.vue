<template>
  <div class="relative">
    <header-app class="fixed z-10 top-0 left-0 w-screen" />
    <sidebar-home
      class="fixed w-[250px] h-[100%] overflow-y-auto bg-[#001524]"
    />

    <section class="absolute overflow-y-auto top-[80px] right-[20%]">
      <div>
        <input
          type="text"
          name="searchQuery"
          class="w-[500px] h-[42px] py-4 px-6 border-0 outline-0"
          v-model="searchQuery"
          placeholder="Search users"
        />
      </div>
      <h1 class="text-gray-900">All Users</h1>
      <ul v-if="searchedUsers">
        <li v-for="user in searchedUsers" :id="user.id" :key="user.id" class="mb-10">
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

            <router-link
              :to="{ name: 'user', params: { id: user.id } }"
              class="flex flex-1 items-center p-2 bg-indigo-200 hover:bg-indigo-500 text-gray-800 hover:text-white transition-colors"
            >
              <span>More info about user</span>
            </router-link>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>
  
<script>
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "../../store/auth";

export default {
  name: "AllUsersPage",
  components: {
    
  },

  data() {
    return {
      searchQuery: "",
    };
  },

  computed: {
    ...mapState(useAuthStore, [
      "userToken",
      "allUsers",
      // "currentPage",
      // "perPage",
      // "totalPosts",
    ]),

    searchedUsers() {
      return this.allUsers.filter(({ name }) =>
        [name].some((val) => val.toLowerCase().includes(this.searchQuery))
      );
    },
  },

  methods: {
    ...mapActions(useAuthStore, ["getUsers"]),
  },

  mounted() {
    this.getUsers();
  },
};
</script>
  
  <style lang="scss" scoped>
</style>
  