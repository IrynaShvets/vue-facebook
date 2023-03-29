<template>
  <div>
    <container-app>
      <form @submit.prevent="handleSubmit" novalidate>
        <div class="flex flex-col mx-auto md:w-96 w-full">
          <h1 class="text-2xl font-bold mb-4 text-center">Login</h1>

          <div class="flex flex-col gap-2 mb-4">
            <label for="email" class="required">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              class="form-input"
              autocomplete="email"
              required
              v-model="email"
            />
          </div>

          <div class="flex flex-col gap-2 mb-4">
            <label for="password" class="required">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              class="form-input"
              autocomplete="new-password"
              required
              v-model="password"
            />
          </div>

          <div class="border-t h-[1px] my-6"></div>

          <div class="flex flex-col gap-2">
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </div>
      </form>
    </container-app>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useAuthStore } from "../store/auth";
import axios from "axios";
import ContainerApp from "../shared/ContainerApp.vue";

export default {
  name: "LoginPage",

  components: {
    ContainerApp,
  },

  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    ...mapActions(useAuthStore, ["setUser"]),

    async handleSubmit() {
      try {
        const response = await axios.post("login", {
          email: this.email,
          password: this.password,
        });
        console.log(response);

        axios.defaults.headers.common["Authorization"] =
          "Bearer" + response.user.token;
        this.setUser(response);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

  