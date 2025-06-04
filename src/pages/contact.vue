<template>
    <div class="d-flex flex-column h-100" :class="{ 'bg-dark text-white': isAdmin }">
      <HeaderComponent />
  
      <main class="flex-shrink-0">
        <div class="container mt-4">
          <h1>Contactez-nous</h1>
          <!-- Contenu de contact ici -->
        </div>
      </main>
  
      <FooterComponent />
    </div>
  </template>
  
  <script>
  import HeaderComponent from '../components/header.vue';
  import FooterComponent from '../components/footer.vue';
  
  export default {
    name: 'Contact',
    components: {
      HeaderComponent,
      FooterComponent,
    },
    data() {
      return {
        isAdmin: false, // Remplacez par la logique appropriée pour déterminer si l'utilisateur est admin
      };
    },
  };
  </script>
  
  <style scoped>
  /* Ajoutez ici vos styles spécifiques au composant si nécessaire */
  body {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  main {
    flex: 1;
  }
  </style>