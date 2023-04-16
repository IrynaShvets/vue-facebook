<template>
  <header class="flex flex-wrap bg-[#001524]">
    <div class="flex items-center justify-between w-full px-10">
      <nav class="relative flex items-center justify-center">
        <div v-if="authUserName" class="flex items-center justify-center">
          <div class="h-12 w-18">
            <router-link
              to="/"
             
              class="px-3 py-2 flex items-center text-xs font-bold leading-snug text-white hover:opacity-75"
            >
              <img
                class="h-12 w-18"
                src="https://i.gyazo.com/93114b7cff56d5426ec1f3549083e16d.png"
                alt="logo"
              />
              <h2 class="text-[26px]">UkrTie</h2> 
            </router-link>
           
          </div>
          <ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li class="nav-item">
              <div className="group relative text-2xl">
                <router-link
                  to="/profile"
                  active-class="active-link"
                  exact-active-class="exact-active-link"
                  class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                >
                  <svg
                  active-class="active-link"
                  exact-active-class="exact-active-link"
                    class="inline-block w-10 h-10 stroke-current stroke-0 fill-white"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M20.016 15.984v-1.5q0-1.313-2.063-2.156t-3.938-0.844-3.938 0.844-2.063 2.156v1.5h12zM14.016 3.984q-1.219 0-2.109 0.891t-0.891 2.109 0.891 2.109 2.109 0.891 2.109-0.891 0.891-2.109-0.891-2.109-2.109-0.891zM20.016 2.016q0.797 0 1.383 0.586t0.586 1.383v12q0 0.797-0.586 1.406t-1.383 0.609h-12q-0.797 0-1.406-0.609t-0.609-1.406v-12q0-0.797 0.609-1.383t1.406-0.586h12zM3.984 6v14.016h14.016v1.969h-14.016q-0.797 0-1.383-0.586t-0.586-1.383v-14.016h1.969z"
                    ></path>
                  </svg>
                </router-link>
                <ul
                  className="rounded absolute hidden text-gray-700 pt-1 group-hover:block w-56"
                >
                  <li
                    className="bg-gray-600 hover:bg-gray-400  py-2 px-4 cursor-pointer"
                  >
                    <router-link
                      to="/profile"
                      active-class="active-link"
                      exact-active-class="exact-active-link"
                      class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    >
                      Profile
                    </router-link>
                  </li>
                </ul>
              </div>
            </li>
            <li class="nav-item">
              <div className="group relative text-2xl">
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
                <ul
                  className="rounded absolute hidden text-gray-700 pt-1 group-hover:block w-56"
                >
                  <li
                    className="bg-gray-600 hover:bg-gray-400  py-2 px-4 cursor-pointer"
                  >
                    <router-link
                      to="/"
                      active-class="active-link"
                      exact-active-class="exact-active-link"
                      class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    >
                      Home
                    </router-link>
                  </li>
                </ul>
              </div>
            </li>
            <li class="nav-item">
              <div className="group relative text-2xl">
                <router-link
                  to="/common/create"
                  active-class="active-link"
                  exact-active-class="exact-active-link"
                  class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                >
                  <svg
                    class="inline-block w-10 h-10 stroke-current stroke-0 fill-white"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M10 15l-4 4v-4h-4c-1.105 0-2-0.895-2-2v0-10c0-1.1 0.9-2 2-2h16c1.105 0 2 0.895 2 2v0 10c0 1.105-0.895 2-2 2v0h-8zM5 7v2h2v-2h-2zM9 7v2h2v-2h-2zM13 7v2h2v-2h-2z"
                    ></path>
                  </svg>
                </router-link>
                <ul
                  className="rounded absolute hidden text-gray-700 pt-1 group-hover:block w-56"
                >
                  <li
                    className="bg-gray-600 hover:bg-gray-400  py-2 px-4 cursor-pointer"
                  >
                    <router-link
                      to="/common/create"
                      active-class="active-link"
                      exact-active-class="exact-active-link"
                      class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    >
                      Create common
                    </router-link>
                  </li>
                </ul>
              </div>
            </li>
            <li class="nav-item">
              <div className="group relative text-2xl">
                <router-link
                  to="/posts-create"
                  active-class="active-link"
                  exact-active-class="exact-active-link"
                  class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                >
                  <svg
                    class="inline-block w-10 h-10 stroke-current stroke-0 fill-white"
                    viewBox="0 0 32 32"
                  >
                    <path
                      d="M25 21h-3v-1h3v-3h1v3h3v1h-3v3h-1v-3zM20.135 16.83l-2.135-1.83 5.923-5.077-0.808-0.808-8.615 7.385-8.615-7.385-0.808 0.808 5.923 5.077-5.923 5.077 0.808 0.808 5.99-5.135 2.625 2.25 2.625-2.25 2.441 2.093c-0.364 0.811-0.566 1.711-0.566 2.657 0 0.886 0.177 1.73 0.498 2.5h-15.495c-1.114 0-2.004-0.893-2.004-1.994v-12.012c0-1.1 0.897-1.994 2.004-1.994h20.993c1.114 0 2.004 0.893 2.004 1.994v5.18c-0.482-0.114-0.984-0.174-1.5-0.174-2.228 0-4.194 1.121-5.365 2.83v0 0zM25.5 26c3.038 0 5.5-2.462 5.5-5.5s-2.462-5.5-5.5-5.5c-3.038 0-5.5 2.462-5.5 5.5s2.462 5.5 5.5 5.5v0z"
                    ></path>
                  </svg>
                </router-link>
                <ul
                  className="rounded absolute hidden text-gray-700 pt-1 group-hover:block w-56"
                >
                  <li
                    className="bg-gray-600 hover:bg-gray-400  py-2 px-4 cursor-pointer"
                  >
                    <router-link
                      to="/posts-create"
                      active-class="active-link"
                      exact-active-class="exact-active-link"
                      class="px-1 py-1 flex items-center rounded-lg text-xs uppercase font-bold leading-snug text-white hover:text-gray-800"
                    >
                      Create post
                    </router-link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <div class="flex items-center">
            <div v-if="authUserImage" class="flex -space-x-1 overflow-hidden">
              <img
                class="inline-block h-10 w-10 rounded-full"
                :src="authUserImage"
                alt=""
              />
            </div>

            <div v-else class="flex -space-x-1 overflow-hidden">
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
                    <button
                      @click="handleLogout"
                      class="py-1 px-2 rounded bg-dark"
                    >
                      Logout
                    </button>
                  </div>

                  <div else>
                    <ul>
                      <li class="nav-item">
                        <router-link
                          :to="{
                            name: 'userUpdate',
                            params: { id: authUserId },
                          }"
                          class="mainPublic px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-dark hover:opacity-75"
                        >
                          Update profile
                        </router-link>
                      </li>
                      
                    </ul>
                  </div>
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
import { mapState, mapActions } from "pinia";
import { logout } from "../services/auth.service.js";

export default {
  name: "HeaderApp",

  data() {
    return {
      active: false,
    };
  },

  computed: {
    ...mapState(useAuthStore, ["authUserName", "authUserImage", "authUserId"]),
  },

  methods: {
    ...mapActions(useAuthStore, ["deleteState"]),

    handleLogout() {
      logout().then(() => {
        this.deleteState();
        this.$router.push({ name: "login" });
        alert("You have successfully logged out of your account.");
      });
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
