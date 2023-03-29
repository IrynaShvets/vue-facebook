import axios from 'axios';

const user = JSON.parse(window.localStorage.getItem('user'));

axios.defaults.baseURL = process.env.VUE_APP_ROOT_API;

if (user) {
   axios.defaults.headers.common['Authorization'] = 'Bearer' + user.token;
}
