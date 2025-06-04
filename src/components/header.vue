<template>
  <header class="navbar navbar-expand-lg">
    <div class="container">
      <router-link class="navbar-brand" to="/home">
        <span class="brand-text">BOUTIQUE</span>
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/employes" active-class="active">
              <i class="fas fa-users"></i> Employés
            </router-link>
          </li>
        </ul>
        <div class="nav-right">
          <button class="btn btn-outline-light" @click="logout" v-if="isAuthenticated">
            <i class="fas fa-sign-out-alt"></i> Déconnexion
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { authService } from '../services/authService'

export default {
  name: 'HeaderComponent',
  data() {
    return {
      isAuthenticated: false
    }
  },
  created() {
    this.isAuthenticated = authService.isAuthenticated()
  },
  methods: {
    logout() {
      authService.logout()
      this.isAuthenticated = false
      this.$router.replace('/')
    }
  }
}
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: white !important;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.navbar-brand:hover {
  transform: scale(1.05);
}

.brand-text {
  background: linear-gradient(45deg, #fff, #e0e0e0);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-link {
  color: rgba(255, 255, 255, 0.9) !important;
  font-weight: 500;
  padding: 0.5rem 1rem !important;
  margin: 0 0.2rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white !important;
}

.nav-link.active {
  background: rgba(255, 255, 255, 0.2);
  color: white !important;
}

.nav-link i {
  margin-right: 0.5rem;
}

.nav-right {
  display: flex;
  align-items: center;
}

.btn-outline-light {
  border: 2px solid rgba(255, 255, 255, 0.5);
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
}

.btn-outline-light:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: white;
}

.navbar-toggler {
  border-color: rgba(255, 255, 255, 0.5);
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.75%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

@media (max-width: 991.98px) {
  .navbar-collapse {
    background: rgba(44, 62, 80, 0.95);
    padding: 1rem;
    border-radius: 8px;
    margin-top: 1rem;
  }
  
  .nav-right {
    margin-top: 1rem;
    justify-content: center;
  }
}
</style>