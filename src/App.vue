<template>
  
  <router-view />
  
</template>

<script>
import {useAuthStore} from "@/store/auth.js";
import { mapState } from "pinia";

export default {
  name: "App",
  components: {},

  data() {
    return {
      

      // user: {
      //   name: localStorage.getItem("user"),
      // }
    };
  },

  computed: {
    ...mapState(useAuthStore, ["accountId", "user"]),
  },

  // onMounted(async () => {
  //   await checkUser()
  //     .then((data) => {
  //        isLoading.value = true;
  //         if (data) {
  //         setUser(data);
  //         setAuth(true);
  //        } else {
  //        router.push({ name: 'Login' });
  //         }
  //      })
  //      .finally((isLoading.value = false));
  //      }),

  mounted() {
    // const authStore = useAuthStore();
    // authStore.getUsers();

    // localStorage.getItem("user")

  }

 };
</script>
<style></style>