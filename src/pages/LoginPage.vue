<template>
  <div>
    <container-app>
      <form @submit.prevent="handleSubmit" novalidate>
        <div class="flex flex-col mx-auto md:w-96 w-full">
          <h1 class="text-2xl font-bold mb-4 text-center">Login</h1>
          <span class="text-[#ff0012]" v-if="errorsStatus">
            {{ (errorsStatus).toString() }}
          </span>
          <div class="flex flex-col gap-2 mb-4">
            <label for="email" class="required">Email</label>
            <input id="email" name="email" type="email" class="form-input" required v-model="email" />
            <span class="text-[#ff0012]" v-if="errors.email">
              {{ (errors.email).toString() }}
            </span>
          </div>

          <div class="flex flex-col gap-2 mb-4">
            <label for="password" class="required">Password</label>
            <input id="password" name="password" type="password" class="form-input" required v-model="password" />
            <span class="text-[#ff0012]" v-if="errors.password">
              {{ (errors.password).toString() }}
            </span>
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
      errors: {
        email: "",
        password: "",
      },
      errorsStatus: []
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
      this.login(userData).then(() => { this.$router.push({ name: "posts" }); }).catch((errors) => {

        switch (errors.status) {
          case 400:
            this.errorsStatus = 'API | Nothing to display, data Not Found';
            break

          case 401:
            localStorage.removeItem('token')
            this.errorsStatus = 'API | Please login again or Session Expired'
            break

          case 403:
            this.errorsStatus = 'API | Access denied or data Not Found'
            break

          case 404:
            this.errorsStatus = 'API | Dataset not found or data Not Found'
            break

          case 422:
            this.errorsStatus = 'API | Validation error. Unprocessable Content'
            this.errors.email = errors.data.errors.email;
            this.errors.password = errors.data.errors.password;
            break

          default:
            this.errorsStatus = 'Another validation error'
        }
      });
    }
  },
  mounted() {
    this.getUsers();
  }

};
</script>

<style lang="scss" scoped>
</style>

  