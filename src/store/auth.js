import axios from 'axios';
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    id: null,
    token: null,
    email: null,
  }),

  actions: {
    setUser(res) {
        console.log(res.data)
        this.state.id = res.data.user.id;
        this.state.token = res.data.token;
        this.state.email = res.data.email;
    },
    
    async fetchUser() {
        let res = await axios.get('user' + this.state.id);
        this.state.id = res.data.user.id;
        this.state.token = res.data.token;
        this.state.email = res.data.email;
    }
  },
  persist: true,
});
