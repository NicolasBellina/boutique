import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/home.vue'; // Assurez-vous que le chemin et la casse du fichier sont corrects
import Products from '../pages/products.vue'; // Importez le composant pour la page des produits
import Employees from '../pages/employes.vue'; // Importez le composant pour la page des employés
import Contact from '../pages/contact.vue'; // Importez le composant pour la page de contact
import NotFound from '../pages/404.vue'; // Importez le composant pour la page 404
import FormPage from '../views/FormPage.vue';

const routes = [
  {
    path: '/',
    name: 'Formulaire',
    component: FormPage,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
  },
  {
    path: '/employes',
    name: 'Employees',
    component: Employees,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  {
    path: '/:catchAll(.*)', // Route pour gérer les pages non trouvées
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;