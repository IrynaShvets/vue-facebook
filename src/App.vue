<template>
  <router-view />
  <!-- <pdf-app :pdf="pdf"></pdf-app> -->
</template>

<script>
import { mapState } from "pinia";
import { useAuthStore } from "./store/auth";

export default {
  name: "App",
  components: {},


  // data() {
  //   return {
  //     pdf: null,
  //   };
  // },


  computed: {
    ...mapState(useAuthStore, ["authUserId"]),
  },
  
  methods: {

    listen() {
      let channel = window.Echo.channel(`pdf.${this.authUserId}`);
      channel.listen(".send-pdf", (data) => {
        
        console.log('msg', data.pdf);
        // this.setPdf(data.pdf)
       this.pdf = data.pdf;
       console.log(this.pdf);
      });
    },
  },

  mounted() {
    this.listen()
  }

 };
</script>
<style></style>