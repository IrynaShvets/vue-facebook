import axios from 'axios';
axios.defaults.baseURL = process.env.VUE_APP_ROOT_API;
axios.defaults.withCredentials = true;

