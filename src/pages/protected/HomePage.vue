<template>
  <div class="relative">
    <header-app class="fixed z-10 top-0 left-0 w-screen" />
    <sidebar-home
      class="fixed w-[250px] h-[100%] overflow-y-auto bg-[#001524]"
    />
    <section class="absolute overflow-y-auto top-[80px] w-[70%] right-[5%]">
      <h1>home</h1>
    </section>
    <!-- <footer-app class="fixed bottom-0 left-0" /> -->
  </div>
</template>

<script>
export default {
  name: "HomePage",
  components: {},

  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>
