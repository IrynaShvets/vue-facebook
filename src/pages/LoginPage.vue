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
              required
              v-model="email"
            />
            <!-- <span class="text-danger" v-if="errors">
              {{ errors[0] }}
            </span> -->
          </div>

          <div class="flex flex-col gap-2 mb-4">
            <label for="password" class="required">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              class="form-input"
              required
              v-model="password"
            />
            <!-- <span class="text-danger" v-if="errors">
              {{ errors[0] }}
            </span> -->
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
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "../store/auth";
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
      errors: [],
    };
  },

  computed: {
    ...mapState(useAuthStore, ["users"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["getUsers", "login"]),

    handleSubmit() {
      const userData = {
        'email': this.email,
        'password': this.password,
      };
      this.login(userData);
    }
  },
  mounted() {
    this.getUsers();
  }
  
};
</script>

<style lang="scss" scoped>
</style>

  