<template>
    <div>
      <header-app />
      <container-app>
        <div
          class="flex min-h-full items-center justify-center p-4 sm:px-6 lg:px-8"
        >
          <div class="w-full rounded">
            <form @submit.prevent="handleSubmit" novalidate>
              <div class="flex flex-col w-full">
                <img
                  class="mx-auto h-[100px] w-auto"
                  src="https://i.gyazo.com/93114b7cff56d5426ec1f3549083e16d.png"
                  alt="Your Company"
                />
                <h2
                  class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
                >
                  Update user
                </h2>
  
                <div class="flex flex-col gap-2 mb-4">
                  <label for="name" class="required">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    class="form-input"
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
                    type="text"
                    class="form-input"
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
  
                <div class="border-t h-[1px] my-4"></div>
  
                <div>
                  <button
                    type="submit"
                    class="group relative flex w-full bg-indigo-600 hover:bg-indigo-500 justify-center rounded-md text-gray-900 px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </container-app>
      <footer-app />
    </div>
  </template>
     
    <script>
  import ContainerApp from "../../shared/ContainerApp.vue";
  import axios from "axios";
  import { mapState, mapActions } from "pinia";
  import { useAuthStore } from "../../store/auth";
  export default {
    name: "UpdatePostPage",
    components: {
      ContainerApp,
    },
    data() {
      return {
        id: "",
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
        success: "",
        errorsStatus: "",
        image_file: "",
      };
    },
    computed: {
      ...mapState(useAuthStore, [
        "token",
        "authUserId",
        "authUserName",
        "authUserEmail",
        "authUserPassword",
        "authUserImage",
      ]),
    },
    methods: {
      ...mapActions(useAuthStore, ["updatePost"]),
      imagePreview(e) {
        this.image = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(this.image);
        reader.onload = (e) => {
          this.image_file = e.target.result;
        };
      },
      getUser() {
        return new Promise((resolve, reject) => {
          axios
            .get(`http://localhost:80/api/users/${this.authUserId}`, {
              headers: {
                Authorization: `Bearer ${this.token}`,
              },
            })
            .then((response) => {
              if (!response) {
                return;
              }
              this.id = response.data.data.id;
              this.email = response.data.data.email;
              this.name = response.data.data.name;
              
              resolve();
            })
            .catch((error) => {
              reject(error.response);
            });
        });
      },
        handleSubmit() {
          const userData = {
          name: this.name,
          email: this.email,
        };
        return new Promise((resolve, reject) => {
          axios
            .put(`http://localhost:80/api/users/${this.$route.params.id}`, { ...userData}, {
              headers: {
                Authorization: `Bearer ${this.token}`,
              },
            })
            .then((response) => {
              if (!response) {
                return;
              }
              this.email = response.data.data.email;
              this.name = response.data.data.name;
              
              resolve();
            })
            .catch((errors) => {
              
            reject(errors.response);
            });
        });
      },
    },
    mounted() {
      this.getUser();
    },
  };
  </script>
    
    <style lang="scss" scoped></style>