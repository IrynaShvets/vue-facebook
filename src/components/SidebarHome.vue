<template>
  <div class="flex">
    <div class="w-[20%] h-[100vh] p-10 bg-[#001524]">
      <div>
        <button class="bg-white px-4 py-2 mb-3" @click="$router.push('users')">All Users</button>
      </div>
      <div>
        <button class="bg-white px-4 py-2" @click="$router.push('posts')">All Posts</button>
      </div>
    </div>

    <div class="absolute top-12 right-0">
    <div class="w-[80%] p-10">
      <p>вміст</p>
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
    return {
      active: false,
    };
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