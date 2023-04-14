<template>
  <router-view />
</template>

<script>
import { mapState } from "pinia";
import { useAuthStore } from "./store/auth";

export default {
  name: "App",
  components: {},

  data() {
    return {
      
    };
  },

  computed: {
    ...mapState(useAuthStore, ["authUserId"]),
  },
  
  methods: {
    listen() {
      let channel = window.Echo.channel(`pdf.${this.authUserId}`);
      channel.listen(".send-pdf", (data) => {
        
        console.log('msg', data);
       
      });
    },
  },

  mounted() {
    this.listen()
  }

 };
</script>
<style></style>