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
                  Create post
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
      <footer-app class="fixed bottom-0 left-0 right-0"/>
    </div>
  </template>
   
  <script>
  import ContainerApp from "../../shared/ContainerApp.vue";
  import { mapState, mapActions } from "pinia";
  import { useAuthStore } from "../../store/auth";
  
  export default {
    name: "CreatePostPage",
    components: {
      ContainerApp,
    },
  
    data() {
      return {
        title: "",
        
        
        errors: {
          title: "",
         
        },
       
        errorsStatus: "",
        
      };
    },
  
    computed: {
      ...mapState(useAuthStore, ["userToken", "authUserId"]),
    },
  
    methods: {
      ...mapActions(useAuthStore, ["createCommon"]),
  
      handleSubmit() {
        const commonData = {
          title: this.title,
          
        };
  
        this.createCommon(commonData)
          .then(() => {
            
            this.$router.push({ name: "home" });
          })
          .catch((errors) => {
  
              console.log(errors)
        });
      },
    },
  };
  </script>
  
  <style lang="scss" scoped></style>