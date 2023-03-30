<template>
  <header class="flex flex-wrap py-2 bg-[#8fad88]">
    <div class="flex items-center justify-between w-full px-10">
      <div>
        <nav
          class="relative flex items-center justify-center px-2 py-3 rounded"
        >
          <div
            else
            class="container px-4 mx-auto flex flex-wrap items-center justify-between"
          >
            <ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li class="nav-item">
                <router-link
                  to="/"
                  active-class="active-link"
                  exact-active-class="exact-active-link"
                  class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                >
                  Facebook
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/register"
                  active-class="active-link"
                  exact-active-class="exact-active-link"
                  class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                >
                  Register
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/login"
                  active-class="active-link"
                  exact-active-class="exact-active-link"
                  class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                >
                  Login
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/posts"
                  active-class="active-link"
                  exact-active-class="exact-active-link"
                  class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                >
                  Posts
                </router-link>
              </li>
            </ul>
          </div>
        </nav>

        <div v-if="user">
          <span>{{ user.name }}</span>
        </div>

        <div>
          <button @click="logout" class="py-1 px-2 rounded bg-white">
            Logout
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
  
<script>
import { useAuthStore } from "@/store/auth";
import { mapState, mapActions } from "pinia";

export default {
  name: "HeaderApp",

  data() {
    return {};
  },

  computed: {
    ...mapState(useAuthStore, ["user"]),
  },

  methods: {
    ...mapActions(useAuthStore, ["logout"]),

    logout() {

      const store = useAuthStore();
      store.logout();
      this.$router.push({ name: "login" });

      alert("You have successfully logged out of your account.");
    },
  },
};
</script>

<style>
.active {
  color: #1b4079;
}
.exact-active-link {
  color: #1b4079;
  font-weight: bold;
}
</style>