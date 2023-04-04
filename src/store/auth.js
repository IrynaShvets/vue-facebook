import axios from "axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  
  state: () => ({
    
    token: null,
    userName: "",
    userId: "",

    posts: [],
    users: [],

    total: null,
    current_page: 1,
    per_page: 10,

  }),

  getters: {
    userToken: (state) => state.token,
    authUserName: (state) => state.userName,
    authUserId: (state) => state.userId,

    allUsers: (state) => state.users,
    allPosts: (state) => state.posts,
    totalPosts: (state) => state.total,
    currentPage: (state) => state.current_page,
    perPage: (state) => state.per_page,

  },

  actions: {
    // getUser() {
    //   return new Promise((resolve, reject) => {
    //     axios
    //       .get("http://localhost:80/api/user", {
    //         headers: {
    //           Authorization: `Bearer ${this.token}`,
    //         },
    //       })
    //       .then((response) => {
    //           this.account.id = response.data.data.id;
    //           this.account.name = response.data.data.name;
    //           this.account.email = response.data.data.email;
    //           console.log(response)
    //           resolve();
    //       })
    //       .catch((error) => {
    //         reject(error.response);
    //       });
    //   });
    // },

    login(data) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:80/api/login", {
            ...data,
          })
          .then((response) => {
            if (response.data.access_token) {
              this.token = response.data.access_token;
              this.userName = response.data.user.name;
              this.userId = response.data.user.id;
          
              console.log(response)
            }
            resolve();
          })
          .catch((error) => {
            reject(error.response);
          });
      });
    },

    register(data) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:80/api/register", {
            ...data,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.token = response.data.access_token;
            this.userName = response.data.user.name;
            resolve();
          })
          .catch((error) => {
            reject(error.response);
          });
      });
    },

    logout() {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:80/api/logout")
          .then(() => {
            this.userName = "";
            this.token = null;
            this.account = {};
    
            resolve();
          })
          .catch((error) => {
            reject(error.response);
          });
      });
    },

    getPosts() {
      return new Promise((resolve, reject) => {
        axios
          .get("http://localhost:80/api/post/all", {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((response) => {
            if (!response) {
              return;
            }
            console.log(response.data.data)
            this.posts = response.data.data;
            this.current_page = response.data.meta.current_page;
            this.per_page = response.data.meta.per_page;
            this.total = response.data.meta.total;
            resolve();
          })
          .catch((error) => {
            reject(error.response);
          });
      });
    },

    createPost(data) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:80/api/post/store", {
            ...data,
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": `Bearer ${this.token}`,
            },
          })
          .then((response) => {
            if (!response) {
              return;
            }
            console.log(response)
            resolve();
          })
          .catch((error) => {
            reject(error.response);
          });
      });
    },

    getUsers() {
      return new Promise((resolve, reject) => {
        axios
          .get("http://localhost:80/api/users", {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((response) => {
            if (!response) {
              return;
            }
            console.log(response.data.data)
            this.users = response.data.data;
            this.current_page = response.data.meta.current_page;
            this.per_page = response.data.meta.per_page;
            this.total = response.data.meta.total;
            resolve();
          })
          .catch((error) => {
            reject(error.response);
          });
      });
    },


  },
  persist: true,
});
