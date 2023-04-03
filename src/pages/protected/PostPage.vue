<template>
  <header-app />
    <container-app>
   
        <div>
            <h1>Post page</h1>
        </div>
    </container-app>
    <footer-app />
</template>

<script>
import ContainerApp from "../../shared/ContainerApp.vue";

export default {
    name: 'PostPage',
    components: {
      ContainerApp,
    },
    data() {
      return {
       
      };
    },
}
</script>

<style lang="scss" scoped>

</style>