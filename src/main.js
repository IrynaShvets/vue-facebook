import { createApp, markRaw  } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import '@ocrv/vue-tailwind-pagination/styles';
import Notifications from '@kyvg/vue3-notification';
import './main.css';
import HeaderApp from './components/HeaderApp.vue';
import FooterApp from './components/FooterApp.vue';
import SidebarHome from "./components/SidebarHome.vue";
import router from "./router";


import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '8c4393f463578f382ff0',
    cluster: 'eu',
    encrypted: true,
});

const app = createApp(App);
const pinia = createPinia();

pinia.use(({ store }) => {
    store.router = markRaw(router)
})

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

pinia.use(piniaPluginPersistedstate)

app.component('header-app', HeaderApp);
app.component('footer-app', FooterApp);
app.component('sidebar-home', SidebarHome);

app.use(Notifications).use(pinia).use(router).mount('#app');