<template>
  <nav class="navbar">
    <div class="nav-brand">
      <router-link to="/home">Mon Application</router-link>
    </div>
    
    <div class="nav-links">
      <router-link to="/home">Accueil</router-link>
      <router-link to="/products">Produits</router-link>
      <router-link to="/employes">Employés</router-link>
      <router-link to="/commercials">Commerciaux</router-link>
      <router-link to="/contact">Contact</router-link>
    </div>

    <div class="nav-auth">
      <template v-if="isAuthenticated">
        <span class="user-info">
          Bonjour, {{ userData?.prenom }}
        </span>
        <button @click="logout" class="btn-logout">
          Déconnexion
        </button>
      </template>
      <template v-else>
        <router-link to="/" class="btn-login">
          Connexion
        </router-link>
      </template>
    </div>
  </nav>
</template>

<script>
import { authService } from '@/services/authService'

export default {
  name: 'NavBar',
  data() {
    return {
      userData: null
    }
  },
  computed: {
    isAuthenticated() {
      return authService.isAuthenticated()
    }
  },
  created() {
    this.userData = authService.getUser()
  },
  methods: {
    logout() {
      authService.logout()
      this.userData = null
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-brand a {
  font-size: 1.5rem;
  font-weight: bold;
  color: #4a90e2;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-links a {
  color: #495057;
  text-decoration: none;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #4a90e2;
}

.nav-auth {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info {
  color: #495057;
}

.btn-logout, .btn-login {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  font-weight: 500;
}

.btn-logout {
  background-color: #dc3545;
  color: white;
}

.btn-login {
  background-color: #4a90e2;
  color: white;
}

.btn-logout:hover {
  background-color: #c82333;
}

.btn-login:hover {
  background-color: #357abd;
}
</style> 