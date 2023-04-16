<template>
  <div class="relative">
    <header-app class="fixed z-10 top-0 left-0 w-screen border-b-2 border-white" />

    <div class="bg-[#001524] flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
      <!-- <div class="flex sm:items-center justify-between  border-b-2 border-gray-200">
        <div class="flex items-center pt-8 space-x-4">
          <div class="flex flex-col leading-tight">
            <div class="text-2xl mt-1 flex items-center">
              <span class="text-gray-700 mr-3">Name</span>
            </div>
          </div>
        </div>
      </div> -->

      <div class="overflow-y-auto pt-10 pb-6 scroll-m-8 md:scroll-m-0">
        <ul v-if="messages" class="mr-[20px]">
          <li v-for="message in messages" :key="message.id" class="">

            <div class="flex">
              <p class="text-[#a7cdf8] mr-2">{{ message.created_at }} </p> 
              <p class="text-[#ecaf5f] text-[18px]">{{ message.sender }}</p>
            </div>
              
            <div class="inline-block bg-[#a7cdf8] w-[auto] px-4 rounded-lg">
            <p class="text-[#001524]">{{ message.message }}</p>
            </div>
           
          </li>
        </ul>
      </div>

      <div class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
        <div class="relative flex">
          <input v-model="message" type="text" placeholder="Message" @keyup.enter="sendMessage"
            class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-full py-3" />

          <div class="absolute right-0 items-center inset-y-0 hidden sm:flex">
            <button @click="sendMessage()" type="button"
              class="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                class="h-6 w-6 transform rotate-90">
                <path
                  d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z">
                </path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "pinia";
import { useAuthStore } from "../../store/auth";

export default {
  name: "ChatPage",

  data() {
    let receiver_id = this.$route.params.id;

    return {
      messages: null,
      message: "",
      receiver_id: receiver_id,
      errors: {
        message: "",
      },
      errorsStatus: [],
    };
  },

  created() {
    this.listen();
  },

  computed: {
    ...mapState(useAuthStore, ["getToken", "authUserId"]),
  },

  methods: {
    sendMessage() {

      let user_message = {
        receiver_id: this.receiver_id,
        message: this.message,
      };
      // this.messages.value.push(user_message);
      axios
        .post(
          "http://localhost:80/api/chat/send",
            user_message,
          {
            headers: {
              Authorization: `Bearer ${this.getToken}`,
            },
          }
        )
        .then((response) => {
          if (!response) {
            return;
          }
          this.message = '';
          this.messages.push(response.data.data);
          // console.log(response.receiver);

        })
        .catch((errors) => {
console.log(errors)
          // if (errors.status) {
          //   switch (errors.status) {
          //     case 400:
          //       this.errors.message = errors.data.errors.message;
          //       break;

          //     case 401:
          //       this.errors.message = errors.data.errors.message;
          //       break;

          //     case 422:
          //       this.errors.message = errors.data.errors.message;
          //       break;

          //     case 500:
          //       this.errors.name = errors.statusText;
          //       break;

          //     default:
          //       this.errorsStatus = "Another validation error";
          //   }
          // }
        });

    },

    getMessages() {
      axios
        .get(`http://localhost:80/api/chat/${this.receiver_id}`, {
          headers: {
            Authorization: `Bearer ${this.getToken}`,
          },
        })
        .then((response) => {
          if (!response) {
            return response;
          }
          this.messages = response.data.data
          // console.log(response.data.data)
        })
        .catch((errors) => {
          console.log(errors)
        });
    },

    listen() {
      let channel = window.Echo.channel(`chat.${this.authUserId}`);
      channel.listen(".new-message", (data) => {
        this.messages.push({
          sender: data.sender,
          message: data.message,
          created_at: data.created_at
        });
        console.log('msg', data);
        // this.message = message;
        // console.log(this.message);
// this.messages.value.push({   //         message: this.message,   
      //       });
        
      });
    },
  },

  mounted() {
    this.getMessages();
  },
};
</script>

<style lang="scss" scoped></style>