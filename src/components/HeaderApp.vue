<template>
  <header class="flex flex-wrap bg-[#001524]">
    <div class="flex items-center justify-between w-full px-10">
      <div class="h-12 w-18">
        <img
          class="h-12 w-18"
          src="https://i.gyazo.com/93114b7cff56d5426ec1f3549083e16d.png"
          alt="Your Company"
        />
      </div>

      <nav class="relative flex items-center justify-center">
        <div
          v-if="authUserName"
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
                <svg
                  class="inline-block w-10 h-10 stroke-current stroke-0 fill-white"
                  viewBox="0 0 32 32"
                >
                  <path
                    d="M32 18.451l-16-12.42-16 12.42v-5.064l16-12.42 16 12.42zM28 18v12h-8v-8h-8v8h-8v-12l12-9z"
                  ></path>
                </svg>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/posts"
                active-class="active-link"
                exact-active-class="exact-active-link"
                class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
              >
                <svg
                  class="inline-block w-10 h-10 stroke-current stroke-0 fill-white"
                  viewBox="0 0 32 32"
                >
                  <path
                    d="M11.293 19l-3.293-2.8v-8.198c0-0.558 0.448-1.002 1-1.002h15c0.545 0 1 0.449 1 1.002v8.198l-3.333 2.8h-10.374zM12.469 20l1.783 1.516h4.42l1.805-1.516h-8.007zM22.185 20.127l-2.185 1.873 5.923 5.077-0.808 0.808-5.996-5.139-5.223 0.023-0.021-0.018-5.99 5.135-0.808-0.808 5.923-5.077-2.185-1.873-3.815-3.227v-5.54l-3 2.64v14.006c0 1.101 0.89 1.994 2.004 1.994h20.993c1.107 0 2.004-0.895 2.004-1.994v-14.006l-3-2.64v5.54l-3.815 3.227zM19.909 6l-3.409-3-3.409 3h6.818zM10 10v1h13v-1h-13zM10 13v1h13v-1h-13zM10 16v1h13v-1h-13z"
                  ></path>
                </svg>
              </router-link>
            </li>
          </ul>

          <div class="flex -space-x-1 overflow-hidden">
            <img
              class="inline-block h-10 w-10 rounded-full"
              src="https://i.gyazo.com/50c000c0e4715eba3a2d778c01ac1c5c.png"
              alt=""
            />
          </div>

          <div v-if="authUserName">
            <span class="text-white">{{ authUserName }}</span>
          </div>

          <div class="flex flex-col relative">
            <button class="py-1 px-4" @click="active = !active">
              <svg
                class="inline-block w-10 h-10 stroke-current stroke-0 fill-white"
                viewBox="0 0 44 32"
              >
                <path
                  d="M0 6h28v6h-28v-6zM0 14h28v6h-28v-6zM0 22h28v6h-28v-6z"
                ></path>
                <path d="M31 14l6 6 6-6z"></path>
              </svg>
            </button>

            <div class="absolute top-12 right-0" v-show="active">
              <div class="w-[200px] h-auto bg-white">
                <div>
                  <button @click="handleLogout" class="py-1 px-2 rounded bg-dark">
                    Logout
                  </button>
                </div>

                <div else>
                  <ul>
                    <li class="nav-item">
                      <router-link
                        to="/register"
                        class="mainPublic px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-dark hover:opacity-75"
                      >
                        Register
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/login"
                        class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-dark hover:opacity-75"
                      >
                        Login
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import { useAuthStore } from "@/store/auth";
import { mapActions, mapState } from "pinia";

export default {
  name: "HeaderApp",

  data() {
    return {
      active: false,
    };
  },

  computed: {
    ...mapState(useAuthStore, ["authUserName"]),
  },

  methods: {
    ...mapActions(useAuthStore, ["logout"]),

    handleLogout() {
      if (this.logout()) {
        this.logout();
        this.$router.push({ name: "login" });
        alert("You have successfully logged out of your account.");
      }
    },
  },

};
</script>

<style>
.active {
  color: #78290f;
}
.exact-active-link {
  color: #78290f;
  font-weight: bold;
}
</style>
