<template>
    <div class="d-flex flex-column h-100" :class="{ 'bg-dark text-white': isAdmin }">
      <HeaderComponent />
  
      <!-- Contenu principal -->
      <main class="flex-shrink-0">
        <div class="container mt-4">
          <div class="row justify-content-center mt-4">
            <div class="col-md-4">
              <EmployeeCard />
            </div>
          </div>
        </div>
      </main>
  
      <FooterComponent />
    </div>
  </template>
  
  <script>
  import HeaderComponent from '../components/header.vue';
  import FooterComponent from '../components/footer.vue';
  import EmployeeCard from '../components/EmployeeCard.vue';
  
  export default {
    name: 'Home',
    components: {
      HeaderComponent,
      FooterComponent,
      EmployeeCard
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