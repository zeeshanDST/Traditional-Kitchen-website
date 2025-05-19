// src/main.js

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
// ✅ Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// ✅ Other Vendor CSS
import './assets/css/plugins/font-awesome.min.css';
// import './assets/css/plugins/swiper.min.css';
import './assets/css/plugins/datepicker.css';
import './assets/css/plugins/mapbox-style.css';
import './assets/css/plugins/fancybox.min.css';

// ✅ Your Main Project CSS
import './assets/css/style.css';

// ✅ Bootstrap JS (includes popper)
import 'bootstrap';

// ✅ Vendor JS Plugins
import './assets/js/plugins/jquery.min.js';
import './assets/js/plugins/smooth-scroll.js';
import './assets/js/plugins/swup.min.js';
// import './assets/js/plugins/swiper.min.js';
import './assets/js/plugins/datepicker.js';
import './assets/js/plugins/isotope.js';
// import './assets/js/plugins/sticky.js';
import './assets/js/plugins/mapbox.min.js';
import './assets/js/plugins/fancybox.min.js';

// ✅ Your Main Project JS
import './assets/js/main.js';

// ✅ Create App
const app = createApp(App);

app.use(createPinia());
app.use(router);
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(Toast)
app.mount('#app');
