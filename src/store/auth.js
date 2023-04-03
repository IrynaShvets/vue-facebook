import axios from "axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  id: 'loginStatus',
  state: () => ({
    usersState: {},
    account: {
      id: "",
      name: "",
      email: "",
    },
      token: null,
    user: "",
    isLoggedIn: false,
    posts: [],
    
    total: null,
      current_page: 1,
      per_page: 10,
    
  }),

  getters: {
    
    users: (state) => state.usersState,
    accountId: (state) => state.account.id,
    accountName: (state) => state.account.name,
    accountEmail: (state) => state.account.email,
    isAuth: (state) => state.user !== null
  },

  actions: {
    getUsers() {
      return new Promise((resolve, reject) => {
        axios
          .get(
            "http://localhost:80/api/user", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((response) => {
            if (response.status !== 200) {
              localStorage.setItem("token", null);
            } else {
              this.account.id = response.data.data.id;
              this.account.name = response.data.data.name;
              this.account.email = response.data.data.email;
            }
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
            this.token = response.data.access_token;
            this.user = response.data.user.name;
            localStorage.setItem("token", this.token);
            localStorage.setItem("user", this.user);

            this.isLoggedIn = true
            console.log("Login", this.isLoggedIn)
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
              'Content-Type': 'multipart/form-data'
            },
          })
          .then((response) => {
            this.token = response.data.access_token;
            this.user = response.data.user.name;
            localStorage.setItem("token", this.token);
            localStorage.setItem("user", this.user);

            this.isLoggedIn = true
            console.log("Register", this.isLoggedIn)
            resolve();
          })
          .catch((error) => {
            reject(error.response);
          });
      });
    },

    logout() {
      return new Promise((resolve, reject) => {
       axios.post("http://localhost:80/api/logout").then(() => {
        this.user = {};
      this.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.isLoggedIn = false
      console.log("Logout", this.isLoggedIn)
       }).catch((error) => {
        reject(error.response);
      });
    });
    },

    getPosts() {
      return new Promise((resolve, reject) => {
        axios
          .get(
            "http://localhost:80/api/post/all", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((response) => {
            if (!response) {
              return;
            } 
            this.posts = response.data.data;
            this.current_page = response.data.meta.current_page;
            this.per_page = response.data.meta.per_page;
            this.total = response.data.meta.total;
            this.isLoggedIn = true
            resolve();
          })
          .catch((error) => {
            reject(error.response);
          });
      });
    },

  },
});
