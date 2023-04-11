<template>
  <div class="flex pt-20">
    <div class="h-[100%] px-6">
      <div class="flex">
        <div class="h-12 w-18 mr-4">
          <img
            class="h-12 w-18"
            src="https://i.gyazo.com/a750aebc78cc83d92b39a2932b9023bc.png"
            alt="users"
          />
        </div>
        <div>
          <button
          class="text-white text-xl px-4 py-2 mb-3 border-b-2 border-b-white"
          @click="$router.push('users')"
        >
          All Users
        </button>
        </div>
      </div>

      <div class="flex">
        <div class="h-12 w-18 mr-4">
          <img
            class="h-12 w-18"
            src="https://i.gyazo.com/cae8a2d2b7330e5842a77667a9bf5a07.png"
            alt="posts"
          />
        </div>
        <div>
          <button
          class="text-white text-xl px-4 py-2 mb-3 border-b-2 border-b-white"
          @click="$router.push('posts')"
        >
          All Posts
        </button>
        </div>
      </div>

      <div class="flex">
        <div class="h-12 w-18 mr-4">
          <img
            class="h-12 w-18"
            src="https://i.gyazo.com/cae8a2d2b7330e5842a77667a9bf5a07.png"
            alt="posts"
          />
        </div>
        <div>
          <button
          class="text-white text-xl px-4 py-2 mb-3 border-b-2 border-b-white"
          @click="$router.push('friends')"
        >
          All Friends
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