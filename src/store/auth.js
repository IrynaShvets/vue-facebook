import axios from "axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
    userId: "",
    userName: "",
    userEmail: "",
    userImage: null,
    pdf: null,
  }),

  getters: {
    authUserId: (state) => state.userId,
    authUserName: (state) => state.userName,
    authUserEmail: (state) => state.userEmail,
    authUserImage: (state) => state.userImage, 
    getPdf: (state) => state.pdf,    
  },

  actions: {
    setPdf(pdf) {
      this.pdf = pdf;
    },

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

    deleteState() {
      this.token = null;
      this.userId = "";
      this.userName = "";
      this.userEmail = "";
      this.userImage = null;
      this.pdf = null;
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

    getPosts(page = 1, filters = {}, sort = {}) {
      return new Promise((resolve, reject) => {
        axios
          .get("http://localhost:80/api/post/all", {
            params: {
              page: page,
              ...filters,
              ...sort
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
    
  },
  persist: true,
});