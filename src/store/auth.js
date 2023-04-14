import axios from "axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
    user: {},
    userName: "",
    userId: "",
    userImage: null,
    userEmail: "",
    userPassword: "",
    userCreated: "",

    postId: null,
    postTitle: null,
    postDescription: null,
    postImage: null,
    postBody: null,

    post: null,
    common: null,
  }),

  getters: {
    authUserName: (state) => state.userName,
    authUserId: (state) => state.userId,
    authUserImage: (state) => state.userImage,
    authUserEmail: (state) => state.userEmail,
    authUserPassword: (state) => state.userPassword,
    authUserCreated: (state) => state.userCreated,

    getToken: (state) => state.token,
    
  },

  actions: {
    setToken(token) {
      this.token = token;
    },

    setUserName(userName) {
      this.userName = userName;
    },

    setUserImage(userImage) {
      this.userImage = userImage;
    },

    setUserId(userId) {
      this.userId = userId;
    },

    setUserEmail(userEmail) {
      this.userEmail = userEmail;
    },

    setUserPassword(userPassword) {
      this.userPassword = userPassword;
    },

    setUserCreated(userCreated) {
      this.userCreated = userCreated;
    },

    deleteState() {
      this.userName = "";
      this.token = null;
      this.userId = "";
      this.userImage = null;
      this.userEmail = "";
      this.userPassword = "";
      this.userCreated = "";
      this.post = null;
      this.friends = null;
      this.common = null;
    },

    getUsers(page = 1, filters = {}) {
      return new Promise((resolve, reject) => {
        axios
          .get("http://localhost:80/api/users", {
            params: {
              page: page,
              ...filters
            },
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((response) => {
            if (!response) {
              reject();
            }
            resolve(response.data);
          })
          .catch((error) => {
            reject(error.response);
          });
      });
    },

    getPosts(page = 1, filters = {}) {
      return new Promise((resolve, reject) => {
        axios
          .get("http://localhost:80/api/post/all", {
            params: {
              page: page,
              ...filters
            },
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((response) => {
            if (!response) {
              reject();
            }
            resolve(response.data);
          })
          .catch((error) => {
            reject(error.response);
          });
      });
    },

    getCommons() {
      return new Promise((resolve, reject) => {
        axios
          .get("http://localhost:80/api/common", {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((response) => {
            if (!response) {
              reject();
            }
            resolve(response.data);
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
            this.post = response.data.post;
            resolve();
            
          })
          .catch((error) => {
            reject(error.response);
          });
      });
    },

    createCommon(data) {
      return new Promise((resolve, reject) => {
        axios
          .post(
            "http://localhost:80/api/common",
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
            this.common = response.data.common;
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
            `http://localhost:80/api/post/${this.getPostById}/update`,
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
            this.post = response.data.post;
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