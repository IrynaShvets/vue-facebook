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
    userCreated: "",
    post: null,
    posts: [],
    users: [],
    total: null,
    current_page: 1,
    per_page: 10,
  }),

  getters: {
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

    getPostById: (state) => {
      return (postId) => state.posts.find((post) => post.id === postId)
    },
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

    setUserCreated(userCreated) {
      this.userCreated = userCreated;
    },

    deleteState() {
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
    },

    // getPosts() {
    //   return new Promise((resolve, reject) => {
    //     axios
    //       .get("http://localhost:80/api/post/all", {
    //         headers: {
    //           Authorization: `Bearer ${this.token}`,
    //         },
    //       })
    //       .then((response) => {
    //         if (!response) {
    //           return;
    //         }
    //         console.log(response.data.data);
    //         // this.token = response.data.access_token;
    //         // this.userName = response.data.user.name;
    //         this.posts = response.data.data;
            
    //         // this.current_page = response.data.meta.current_page;
    //         // this.per_page = response.data.meta.per_page;
    //         // this.total = response.data.meta.total;
    //         resolve();
    //       })
    //       .catch((error) => {
    //         reject(error.response);
    //       });
    //   });
    // },

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
            `http://localhost:80/api/post/${this.getPostById()}/update`,
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
