import axios from 'axios';
import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        usersState: {},
        user: {},
        token: null,
    }),
    getters: {
        users: (state) => state.usersState,
    },
    actions: {
        getUsers() {
            axios.get('http://localhost:80/api/user', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                } 
            })
                .then((response) => {
                    if (response.status !== 200) {
                        localStorage.setItem('token', null);
                    } else {
                        this.user = response.data.data;
                    }
                })
        },
        login(data) {
            axios.post('http://localhost:80/api/login', {
                ...data
            }).then((response) => {
                this.token = response.data.access_token;
                this.user= response.data.user;
                localStorage.setItem('token', this.token);
            })
        },
        logout() {
            axios.post('http://localhost:80/api/logout')
            .then(() => {
                this.user = {};
                this.token = null;
                localStorage.setItem('token', null);
            })
        }
    }
})