import { createApp } from 'vue';
import App from './App.vue'; // Assurez-vous que ce chemin est correct
import router from './routes/index.js'; // Assurez-vous que ce chemin est correct
import 'bootstrap/dist/css/bootstrap.min.css'; // Assurez-vous que ce chemin est correct
import '@fortawesome/fontawesome-free/css/all.css';

createApp(App)
  .use(router) // Si vous utilisez Vue Router
  .mount('#app');