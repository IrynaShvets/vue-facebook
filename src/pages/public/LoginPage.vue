<template>
  <div>
    <container-app>
      <div
        class="flex min-h-full items-center justify-center p-4 sm:px-6 lg:px-8"
      >
        <div class="w-full max-w-md -y-8 bg-[#d1866de8] p-6 rounded">
          <form @submit.prevent="handleSubmit" novalidate>
            <div class="flex flex-col mx-auto md:w-96 w-full">
              <img
                class="mx-auto h-12 w-auto"
                src="https://i.gyazo.com/93114b7cff56d5426ec1f3549083e16d.png"
                alt="Your Company"
              />
              <h2
                class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
              >
                Sign in to your account
              </h2>

              <div class="flex flex-col gap-2 mb-4">
                <label for="email" class="required">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  class="form-input border-0 focus:border-0 outline-0 focus:outline-0"
                  required
                  v-model="email"
                />
                <span class="text-[#ff0012]" v-if="errors.email">
                  {{ errors.email.toString() }}
                </span>
                <span class="text-[#ff0012]" v-if="errorsStatus">
                  {{ errorsStatus.toString() }}
                </span>
              </div>

              <div class="flex flex-col gap-2">
                <label for="password" class="required">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  class="form-input border-0 focus:border-0 outline-0 focus:outline-0"
                  required
                  v-model="password"
                  autocomplete="on"
                />
                <span class="text-[#ff0012]" v-if="errors.password">
                  {{ errors.password.toString() }}
                </span>
                <span class="text-[#ff0012]" v-if="errorsStatus">
                  {{ errorsStatus.toString() }}
                </span>
              </div>

              <div class="border-t h-[1px] my-4"></div>

              <div class="text-sm mb-4">
                <router-link to="/register" class="">
                  <span
                    class="font-medium text-indigo-600 hover:text-indigo-500"
                    >Do you already have an account?</span
                  >
                </router-link>
              </div>

              <div>
                <button
                  type="submit"
                  class="group relative flex w-full bg-indigo-600 hover:bg-indigo-500 justify-center rounded-md text-gray-900 px-3 py-2 text-sm font-semibold border-0 focus:border-0 outline-0 focus:outline-0"
                >
                  <span
                    class="absolute inset-y-0 left-0 flex items-center pl-3"
                  >
                    <img
                      class="h-5 w-5"
                      src="https://i.gyazo.com/93114b7cff56d5426ec1f3549083e16d.png"
                      alt="Your Company"
                    />
                  </span>
                  Sign in
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </container-app>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useAuthStore } from "../../store/auth";
import { login } from "../../services/auth.service.js";
import ContainerApp from "../../shared/ContainerApp.vue";

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
      errorsStatus: [],
    };
  },

  methods: {
    ...mapActions(useAuthStore, [
      "setToken",
      "setUserName",
      "setUserEmail",
      "setUserImage",
      "setUserId",
    ]),

    handleSubmit() {
      const userData = {
        email: this.email,
        password: this.password,
      };

      login(userData)
        .then((response) => {
          if (response.access_token) {
            this.setToken(response.access_token);
            this.setUserName(response.user.name);
            this.setUserEmail(response.user.email);
            this.setUserId(response.user.id);
            this.setUserImage(response.user.image);
            this.$router.push({ name: "home" });
          }
        })
        .catch((errors) => {
          switch (errors.status) {
            case 401:
              this.errors.email = errors.data.errors.email;
              this.errors.password = errors.data.errors.password;
              break;

            case 422:
              this.errors.email = errors.data.errors.email;
              this.errors.password = errors.data.errors.password;
              break;

            default:
              this.errorsStatus = "Another validation error";
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
