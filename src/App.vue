<template>
  <router-view />
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useAuthStore } from "./store/auth";

export default {
  name: "App",
  components: {},

  computed: {
    ...mapState(useAuthStore, ["authUserId"]),
  },
  
  methods: {
    ...mapActions(useAuthStore, ["setPdf"]),

    listen() {
      let channel = window.Echo.channel(`pdf.${this.authUserId}`);
      channel.listen(".send-pdf", (data) => {
        
        console.log('msg', data.pdf);
        this.setPdf(data.pdf)
      
      });
    },
  },

  mounted() {
    this.listen()
  }

 };
</script>
<style></style>