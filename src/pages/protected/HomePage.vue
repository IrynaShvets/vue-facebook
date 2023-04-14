<template>
  <div class="relative">
    <header-app class="fixed z-10 top-0 left-0 w-screen border-b-2 border-gray-200" />
    <sidebar-home
      class="fixed w-[250px] h-[100%] overflow-y-auto bg-[#001524]"
    />
    <section class="absolute overflow-y-auto top-[80px] w-[70%] right-[5%]">
      <h1>home</h1>

      <button type="button" @click="getPdf">Generete users pdf </button>

    </section>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from "pinia";
import { useAuthStore } from "../../store/auth";

export default {
  name: "HomePage",
  components: {},

  data() {
    return {};
  },

  computed: {
    ...mapState(useAuthStore, ["token"]),
  },

  methods: {
    getPdf() {
      axios.get('http://localhost:80/api/generate/pdf', {
        headers: {
          Authorization: `Bearer ${this.token}`,
        }
      }).then((response) => {
        console.log(response)
      }).catch((errors) => {
        console.error(errors)
      })
    }
  }

};
</script>

<style lang="scss" scoped>
</style>
