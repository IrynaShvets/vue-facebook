<template>
  <div class="relative">
    <header-app
      class="fixed z-10 top-0 left-0 w-screen border-b-2 border-gray-200"
    />
    <sidebar-home
      class="fixed flex justify-center w-[250px] h-[100%] overflow-y-auto bg-[#001524]"
    />
    <section class="absolute overflow-y-auto top-[80px] w-[70%] right-[5%]">
      <h1 class="text-[36px] mb-4">UkrTie</h1> 

      <button type="button" @click="getPdf" class="h-[auto] w-[auto] px-4 py-2 bg-gray-700 text-white mr-4">Generete users pdf</button>

      <button type="button" @click="openModal(pdf)" class="h-[auto] w-[auto] px-4 py-2 bg-gray-700 text-white">Show pdf</button>
      <div v-show="showModal">
        <div
          class="fixed top-0 bottom-0 left-0 right-0 flex justify-center z-[100] bg-[#000000da]"
        >
          <div
            class="relative bg-white h-[100%] w-[80%] p-5 rounded-lg"
            @click.stop
          >
            <button type="button" @click="closeModal" class="p-2 border-0 bg-white absolute right-2 top-2">
              <svg
                class="inline-block w-5 h-5 stroke-current stroke-0 fill-gray"
                viewBox="0 0 32 32"
              >
                <path
                  d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"
                ></path>
              </svg>
            </button>
            <embed :src="pdf" width="100%" height="100%" type='application/pdf'>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "pinia";
import { useAuthStore } from "../../store/auth";

export default {
  name: "HomePage",
  components: {},

  data() {
    return {
      showModal: false,
    };
  },

  computed: {
    ...mapState(useAuthStore, ["token", "pdf"]),
  },

  methods: {

    getPdf() {
      axios
        .get("http://localhost:80/api/generate/pdf", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((errors) => {
          console.error(errors);
        });
    },

    openModal(pdf) {
      this.showModal = true;
      this.pdf = pdf;
    },

    closeModal() {
      this.showModal = false;
    },
  },

};
</script>

<style lang="scss" scoped>
</style>
