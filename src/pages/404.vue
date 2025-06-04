<template>
    <div :class="['d-flex', 'flex-column', 'h-100', isAdmin ? 'bg-dark text-white' : '']">
      <Header /> <!-- Inclure le composant Header -->
      <main class="flex-shrink-0">
        <div class="container mt-4">
          <h1>404 - Page non trouvée</h1>
          <p>La page que vous recherchez n'existe pas.</p>
          <router-link to="/" class="btn btn-primary">Retour à l'accueil</router-link>
        </div>
      </main>
      <Footer /> <!-- Inclure le composant Footer -->
    </div>
  </template>
  
  <script>
  import Header from '../components/Header.vue';
  import Footer from '../components/Footer.vue';
  
  export default {
    components: {
      Header,
      Footer
    },
    computed: {
      isAdmin() {
        // Remplacez ceci par votre logique pour déterminer si l'utilisateur est un admin
        return false; // Exemple par défaut
      }
    }
  }
  </script>
  
  <style scoped>
  body {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  </style>