<template>
  <div>
    <header-app />
    <container-app>
      <div
        class="flex min-h-full items-center justify-center p-4 sm:px-6 lg:px-8"
      >
        <div class="w-full rounded">
          <div v-if="success" class="text-dark">
                <button type="button"></button>
                <strong>{{success}}</strong>
            </div>

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
                Update post
              </h2>

              <div class="flex flex-col gap-2 mb-4">
                <label for="title" class="required">Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  class="form-input"
                  required
                  v-model="title"
                />
                <span class="text-[#ff0012]" v-if="errors.title">
                  {{ errors.title.toString() }}
                </span>
                <span class="text-[#ff0012]" v-if="errorsStatus">
                  {{ errorsStatus.toString() }}
                </span>
              </div>

              <input type="hidden" id="user_id" name="user_id" v-model="authUserId">

              <div class="flex flex-col gap-2 mb-4">
                <label for="description" class="required">Description</label>
                <textarea
                  id="description"
                  name="description"
                  type="text"
                  class="form-input"
                  required
                  v-model="description"
                ></textarea>
                <span class="text-[#ff0012]" v-if="errors.description">
                  {{ errors.description.toString() }}
                </span>
                <span class="text-[#ff0012]" v-if="errorsStatus">
                  {{ errorsStatus.toString() }}
                </span>
              </div>

              <div class="flex flex-col gap-2 mb-4">
                <label for="body" class="required">Body</label>
                <textarea
                  id="body"
                  name="body"
                  type="text"
                  class="form-input"
                  required
                  v-model="body"
                ></textarea>
                <span class="text-[#ff0012]" v-if="errors.body">
                  {{ errors.body.toString() }}
                </span>
                <span class="text-[#ff0012]" v-if="errorsStatus">
                  {{ errorsStatus.toString() }}
                </span>
              </div>

              <div class="text-center bg-white">
                <svg
                  class="mx-auto h-12 w-12 text-gray-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <div class="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    for="image"
                    class="relative cursor-pointer rounded-md bg-indigo-600 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      ref="image"
                      id="image"
                      type="file"
                      name="image"
                      accept="image/*"
                      style="border: none"
                      @change="imagePreview($event)"
                    />
                  </label>
                  <p class="pl-1">or drag and drop</p>

                  <!-- <div v-if="image">
                    <img v-bind:src="image" width="100" height="100"/>
                  </div> -->

                </div>
                <div v-if="image_file">
                  <img
                    :src="image_file"
                    
                    class="inline-block h-10 w-10 rounded-full"
                    
                    alt="Preview"
                  />
                </div>
                <p class="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
              <span class="text-[#ff0012]" v-if="errors.image">
                  {{ errors.image.toString() }}
                </span>
                <span class="text-[#ff0012]" v-if="errorsStatus">
                  {{ errorsStatus.toString() }}
                </span>

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
                  Save
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
import { mapState, mapActions } from "pinia";
import { useAuthStore } from "../../store/auth";

export default {
  name: "UpdatePostPage",
  components: {
    ContainerApp,
  },

  data() {
    return {
      title: "",
      description: "",
      body: "",
      image: "",
      user_id: "",
      errors: {
        title: "",
        description: "",
        body: "",
        user_id: "",
        image: "",
      },
      success: '',
      errorsStatus: "",
      image_file: "",
    };
  },

  computed: {
    ...mapState(useAuthStore, ["userToken", "authUserId"]),
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

    handleSubmit() {
      
      const postData = {
        title: this.title,
        description: this.description,
        body: this.body,
        user_id: this.authUserId,
        image: this.image,
      };
      this.updatePost(postData)
        .then((response) => {
         console.log(response)
          // this.success = response.data.success;
          this.$router.push({ name: "posts" });
        })
        .catch((errors) => {
          console.log(errors);
          if (errors?.status) {
            switch (errors.status) {
            case 400:
              this.errors.title = errors.data.error.title;
              this.errors.description = errors.data.error.description;
              this.errors.body = errors.data.error.body;
              this.errors.user_id = errors.data.error.user_id;
              this.errors.image = errors.data.error.image;
              break;

            case 401:
              this.errors.title = errors.data.message;
              this.errors.description = errors.data.message;
              this.errors.body = errors.data.message;
              this.errors.user_id = errors.data.message;
              this.errors.image = errors.data.message;
              break;

            case 422:
              this.errors.title = errors.data.errors.title;
              this.errors.description = errors.data.errors.description;
              this.errors.body = errors.data.errors.body;
              this.errors.user_id = errors.data.errors.user_id;
              this.errors.image = errors.data.errors.image;
              break;

            case 500:
              this.errors.title = errors.statusText;
              this.errors.description = errors.statusText;
              this.errors.body = errors.statusText;
              this.errors.user_id = errors.statusText;
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