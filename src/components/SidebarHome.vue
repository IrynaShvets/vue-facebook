<template>
  <div class="flex pt-24">
    <div class="h-[100%]">
      <div class="flex">
        <div 
        class="flex items-center justify-center h-12 w-18 px-4 py-2 mb-5">
          <svg
            class="inline-block w-7 h-7 mr-4 stroke-current stroke-0 fill-white"
            viewBox="0 0 36 32"
          >
            <path
              d="M24 24.082v-1.649c2.203-1.241 4-4.337 4-7.432 0-4.971 0-9-6-9s-6 4.029-6 9c0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h28c0-4.030-5.216-7.364-12-7.918z"
            ></path>
            <path
              d="M10.225 24.854c1.728-1.13 3.877-1.989 6.243-2.513-0.47-0.556-0.897-1.176-1.265-1.844-0.95-1.726-1.453-3.627-1.453-5.497 0-2.689 0-5.228 0.956-7.305 0.928-2.016 2.598-3.265 4.976-3.734-0.529-2.39-1.936-3.961-5.682-3.961-6 0-6 4.029-6 9 0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h8.719c0.454-0.403 0.956-0.787 1.506-1.146z"
            ></path>
          </svg>
        <button
        class="text-white text-xl border-0 focus:border-0 outline-0 focus:outline-0"
          @click="$router.push('users')"
        >
          Users
        </button>
         </div>
      </div>

      <div class="flex">
        <div class="h-12 w-18 px-4 py-2 mb-5">
          <svg
            class="inline-block w-8 h-8 mr-4 stroke-current stroke-0 fill-white"
            viewBox="0 0 32 32"
          >
            <path
              d="M11.293 19l-3.293-2.8v-8.198c0-0.558 0.448-1.002 1-1.002h15c0.545 0 1 0.449 1 1.002v8.198l-3.333 2.8h-10.374zM12.469 20l1.783 1.516h4.42l1.805-1.516h-8.007zM22.185 20.127l-2.185 1.873 5.923 5.077-0.808 0.808-5.996-5.139-5.223 0.023-0.021-0.018-5.99 5.135-0.808-0.808 5.923-5.077-2.185-1.873-3.815-3.227v-5.54l-3 2.64v14.006c0 1.101 0.89 1.994 2.004 1.994h20.993c1.107 0 2.004-0.895 2.004-1.994v-14.006l-3-2.64v5.54l-3.815 3.227zM19.909 6l-3.409-3-3.409 3h6.818zM10 10v1h13v-1h-13zM10 13v1h13v-1h-13zM10 16v1h13v-1h-13z"
            ></path>
          </svg>
       
          <button
            class="text-white text-xl border-0 focus:border-0 outline-0 focus:outline-0"
            @click="$router.push('posts')"
          >
            Posts
          </button>
        </div>
      </div>

      <div class="flex">
        <div class="h-12 w-18 px-4 py-2 mb-5">
          <svg
            class="inline-block w-7 h-7 mr-4 stroke-current stroke-0 fill-white"
            viewBox="0 0 30 28"
          >
            <path
              d="M9.266 14c-1.625 0.047-3.094 0.75-4.141 2h-2.094c-1.563 0-3.031-0.75-3.031-2.484 0-1.266-0.047-5.516 1.937-5.516 0.328 0 1.953 1.328 4.062 1.328 0.719 0 1.406-0.125 2.078-0.359-0.047 0.344-0.078 0.688-0.078 1.031 0 1.422 0.453 2.828 1.266 4zM26 23.953c0 2.531-1.672 4.047-4.172 4.047h-13.656c-2.5 0-4.172-1.516-4.172-4.047 0-3.531 0.828-8.953 5.406-8.953 0.531 0 2.469 2.172 5.594 2.172s5.063-2.172 5.594-2.172c4.578 0 5.406 5.422 5.406 8.953zM10 4c0 2.203-1.797 4-4 4s-4-1.797-4-4 1.797-4 4-4 4 1.797 4 4zM21 10c0 3.313-2.688 6-6 6s-6-2.688-6-6 2.688-6 6-6 6 2.688 6 6zM30 13.516c0 1.734-1.469 2.484-3.031 2.484h-2.094c-1.047-1.25-2.516-1.953-4.141-2 0.812-1.172 1.266-2.578 1.266-4 0-0.344-0.031-0.688-0.078-1.031 0.672 0.234 1.359 0.359 2.078 0.359 2.109 0 3.734-1.328 4.062-1.328 1.984 0 1.937 4.25 1.937 5.516zM28 4c0 2.203-1.797 4-4 4s-4-1.797-4-4 1.797-4 4-4 4 1.797 4 4z"
            ></path>
          </svg>
       
          <button
            class="text-white text-xl border-0 focus:border-0 outline-0 focus:outline-0"
            @click="$router.push('friends')"
          >
            Friends
          </button>
        </div>
      </div>

      <div class="flex">
        <div class="h-12 w-18 px-4 py-2 mb-5">
          <svg
            class="inline-block w-7 h-7 mr-4  stroke-current stroke-0 fill-white"
            viewBox="0 0 20 20"
          >
          <path d="M7 8c-2.209 0-4-1.791-4-4s1.791-4 4-4v0c2.209 0 4 1.791 4 4s-1.791 4-4 4v0zM7 9c2.15 0 4.2 0.4 6.1 1.090l-1.1 5.91h-1.25l-0.75 4h-6l-0.75-4h-1.25l-1.1-5.91c1.813-0.684 3.909-1.083 6.097-1.090h0.003zM15.31 9.17c1.32 0.18 2.59 0.48 3.8 0.92l-1.11 5.91h-1.25l-0.75 4h-3.96l0.37-2h1.25l1.65-8.83zM13 0c0.010-0 0.022-0 0.034-0 2.209 0 4 1.791 4 4s-1.791 4-4 4c-0.49 0-0.958-0.088-1.392-0.249l0.028 0.009c0.832-1.017 1.336-2.329 1.336-3.76s-0.504-2.743-1.344-3.771l0.008 0.011c0.43-0.14 0.86-0.24 1.33-0.24z"></path>

          </svg>
       
          <button
            class="text-white text-xl border-0 focus:border-0 outline-0 focus:outline-0"
            @click="$router.push('commons')"
          >
            Community
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { useAuthStore } from "@/store/auth";
import { mapState } from "pinia";

export default {
  name: "HeaderApp",

  data() {
    return {};
  },

  computed: {
    ...mapState(useAuthStore, ["authUserName"]),
  },

  mounted() {},
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