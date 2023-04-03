<template>
  <header-app />
  <container-app>
    <div class="p-6 text-center">
      <h1 >All information about posts</h1>
    </div>
    <div class="bg-blue-900 w-[200px] h-[auto] rounded flex items-center">
      <router-link
      to="/posts-create"
      class="px-3 py-2 uppercase font-bold leading-snug text-white hover:opacity-75"
    >
      Post Create
    </router-link>
    </div>
  </container-app>
</template>

<script>
import ContainerApp from "../../shared/ContainerApp.vue";

export default {
  name: "PostPage",
  components: {
    ContainerApp,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>