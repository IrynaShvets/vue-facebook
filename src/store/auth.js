import axios from "axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
    userName: "",
    userId: "",
    userImage: null,
    userEmail: "",
    userCreated: "",

    post: null,

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
    authUserImage: (state) => state.userImage,
    authUserEmail: (state) => state.userEmail,
    authUserCreated: (state) => state.userCreated,


    allUsers: (state) => state.users,
    allPosts: (state) => state.posts,
    totalPosts: (state) => state.total,
    currentPage: (state) => state.current_page,
    perPage: (state) => state.per_page,
  },

  actions: {

    login(data) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:80/api/login", {
            ...data,
          })
          .then((response) => {
            if (!response) {
              return;
            }
            if (response.status === 200 && response.data.access_token) {
              this.token = response.data.access_token;
              this.userName = response.data.user.name;
              this.userId = response.data.user.id;
              this.userImage = response.data.user.image;
              this.userEmail = response.data.user.email;
              this.userCreated = response.data.user.created_at;
             
              resolve();
              console.log(response);
            }
          })
          .catch((error) => {
            reject(error.response);
          });
      });
    },

    register(data) {
      return new Promise((resolve, reject) => {
        axios
          .post(
            "http://localhost:80/api/register",
            {
              ...data,
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((response) => {
            console.log(response);
            if (!response) {
              return;
            }
            if (response.status === 200 && response.data.access_token) {
              // this.userData = response.data.user;
              this.token = response.data.access_token;
              this.userName = response.data.user.name;
              this.userId = response.data.user.id;
              this.userImage = response.data.user.image;
              this.userEmail = response.data.user.email;
              this.userCreated = response.data.user.created_at;
              
              resolve();
            }
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
            this.userId = "";
            this.userImage = null;
            this.userEmail = "";
            this.userCreated = "";
            this.posts = [];
            this.users = [];
            this.total = null;
            this.current_page = 1;
            this.per_page = 10;
            this.post = null;
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
            console.log(response.data.data);
            // this.token = response.data.access_token;
            // this.userName = response.data.user.name;
            this.posts = response.data.data;
            
            // this.current_page = response.data.meta.current_page;
            // this.per_page = response.data.meta.per_page;
            // this.total = response.data.meta.total;
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
          .post(
            "http://localhost:80/api/post/store",
            {
              ...data,
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${this.token}`,
              },
            }
          )
          .then((response) => {
            if (!response.data) {
              return;
            }
            
            console.log("стор", response)
            // this.token = response.data.access_token;
            // this.userName = response.data.user.name;
            // console.log(response);
            this.post = response.data.post;
            resolve();
            
          })
          .catch((error) => {
            reject(error.response);
          });
      });
    },

    updatePost(data) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `http://localhost:80/api/post/${this.id}/update`,
            {
              ...data,
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${this.token}`,
              },
            }
          )
          .then((response) => {
            if (!response) {
              return;
            }
            
            console.log(response);
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
            console.log(response.data.data);
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
