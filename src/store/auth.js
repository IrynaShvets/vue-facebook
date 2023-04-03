import axios from "axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  id: "loginStatus",
  state: () => ({
    account: {
      id: "",
      name: "",
      email: "",
    },

    token: null,
    userName: "",

    posts: [],

    total: null,
    current_page: 1,
    per_page: 10,
  }),

  getters: {
    userToken: (state) => state.token,
    authUserName: (state) => state.userName,

    accountId: (state) => state.account.id,
    accountName: (state) => state.account.name,
    accountEmail: (state) => state.account.email,
  },

  actions: {
    getUser() {
      return new Promise((resolve, reject) => {
        axios
          .get("http://localhost:80/api/user", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
              this.account.id = response.data.data.id;
              this.account.name = response.data.data.name;
              this.account.email = response.data.data.email;
              resolve();
          })
          .catch((error) => {
            reject(error.response);
          });
      });
    },

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

              console.log(this.token)
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
            this.posts = [];
    
            resolve();
          })
          .catch((error) => {
            console.log(error)
            reject(error.response);
          });
      });
    },

    getPosts() {
      return new Promise((resolve, reject) => {
        axios
          .get("http://localhost:80/api/post/all", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            if (!response) {
              return;
            }
            this.posts = response.data.data;
            this.current_page = response.data.meta.current_page;
            this.per_page = response.data.meta.per_page;
            this.total = response.data.meta.total;
            console.log(response);
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
