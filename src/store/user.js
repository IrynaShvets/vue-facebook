import axios from 'axios'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: null,
    token: null,
    name: null,
    email: null,
    image: null,
    
  }),
  actions: {
    setUserDetails(res) {
        console.log('setUserDetails', res.data)
        this.$state.id = res.data.user.id
        this.$state.token = res.data.token
        this.$state.name = res.data.user.name
        this.$state.email = res.data.user.email
    },

    async fetchUser() {
        let res = await axios.get('http://localhost:80/api/users/' + this.$state.id)

        this.$state.id = res.data.user.id
        this.$state.name = res.data.user.name
       
    },

    clearUser() {
        this.$state.id = null
        this.$state.token = null
        this.$state.name = null
        this.$state.email = null
        this.$state.image = null
    }
  },
  
})