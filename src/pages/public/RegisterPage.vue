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
                Sign up your account
              </h2>

              <div class="border-t h-[1px] my-4"></div>

              <div>
                <div>
                  <label>Image</label>
                  <input
                    ref="image"
                    id="image"
                    type="file"
                    name="image"
                    accept="image/*"
                    style="border: none"
                    @change="imagePreview($event)"
                  />
                </div>
                <div v-if="image_file">
                  <img
                    :src="image_file"
                    class="inline-block h-10 w-10 rounded-full"
                    alt="Preview"
                  />
                </div>
              </div>
              <span class="text-[#ff0012]" v-if="errors.image">
                {{ errors.image.toString() }}
              </span>
              <span class="text-[#ff0012]" v-if="errorsStatus">
                {{ errorsStatus.toString() }}
              </span>

              <div class="flex flex-col gap-2 mb-4">
                <label for="name" class="required">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  class="form-input border-0 focus:border-0 outline-0 focus:outline-0"
                  required
                  v-model="name"
                />
                <span class="text-[#ff0012]" v-if="errors.name">
                  {{ errors.name.toString() }}
                </span>
                <span class="text-[#ff0012]" v-if="errorsStatus">
                  {{ errorsStatus.toString() }}
                </span>
              </div>

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
                <router-link to="/login" class="">
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
                  Sign up
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
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "../../store/auth";
import { register } from "../../services/auth.service.js";
import ContainerApp from "../../shared/ContainerApp.vue";

export default {
  name: "LoginPage",

  components: {
    ContainerApp,
  },

  data() {
    return {
      name: "",
      email: "",
      password: "",
      image: "",
      errors: {
        name: "",
        email: "",
        password: "",
        image: "",
      },
      errorsStatus: [],
      image_file: "",
    };
  },

  computed: {
    ...mapState(useAuthStore, ["users"]),
  },

  methods: {
    ...mapActions(useAuthStore, [
      "setToken",
      "setUserName",
      "setUserImage",
      "setUserEmail",
      "setUserId",
    ]),

    imagePreview(e) {
      this.image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.image);
      reader.onload = (e) => {
        this.image_file = e.target.result;
      };
    },

    handleSubmit() {
      const userData = {
        name: this.name,
        email: this.email,
        password: this.password,
        image: this.image,
      };

      register(userData)
        .then((response) => {
          if (response.access_token) {
            this.setToken(response.access_token);
            this.setUserName(response.user.name);
            this.setUserEmail(response.user.email);
            this.setUserImage(response.user.image);
            this.setUserId(response.user.id);
            this.$router.push({ name: "home" });
          }
        })
        .catch((errors) => {
          if (errors.status) {
            switch (errors.status) {
              case 400:
                this.errors.name = errors.data.errors.name;
                this.errors.email = errors.data.errors.email;
                this.errors.password = errors.data.errors.password;
                this.errors.image = errors.data.errors.image;
                break;

              case 401:
                this.errors.name = errors.data.errors.name;
                this.errors.email = errors.data.errors.email;
                this.errors.password = errors.data.errors.password;
                this.errors.image = errors.data.errors.image;
                break;

              case 422:
                this.errors.name = errors.data.errors.name;
                this.errors.email = errors.data.errors.email;
                this.errors.password = errors.data.errors.password;
                this.errors.image = errors.data.errors.image;
                break;

              case 500:
                this.errors.name = errors.statusText;
                this.errors.email = errors.statusText;
                this.errors.password = errors.statusText;
                this.errors.image = errors.statusText;
                break;

              default:
                this.errorsStatus = "Another validation error";
            }
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
