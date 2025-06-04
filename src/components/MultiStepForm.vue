<template>
  <div class="form-container">
    <div class="steps-indicator">
      <div 
        v-for="(step, index) in steps" 
        :key="index"
        :class="['step', { active: currentStep >= index }]"
      >
        {{ index + 1 }}
      </div>
    </div>

    <transition name="slide" mode="out-in">
      <div :key="currentStep" class="form-step">
        <!-- Étape 1 : Informations personnelles -->
        <div v-if="currentStep === 0">
          <h3>Informations personnelles</h3>
          <div class="form-group">
            <label>Nom</label>
            <input v-model="formData.nom" type="text" class="form-control">
          </div>
          <div class="form-group">
            <label>Prénom</label>
            <input v-model="formData.prenom" type="text" class="form-control">
          </div>
        </div>

        <!-- Étape 2 : Contact -->
        <div v-if="currentStep === 1">
          <h3>Contact</h3>
          <div class="form-group">
            <label>Email</label>
            <input v-model="formData.email" type="email" class="form-control">
          </div>
          <div class="form-group">
            <label>Mot de passe</label>
            <input v-model="formData.password" type="password" class="form-control">
          </div>
        </div>

        <!-- Étape 3 : Confirmation -->
        <div v-if="currentStep === 2">
          <h3>Confirmation</h3>
          <div class="summary">
            <p><strong>Nom:</strong> {{ formData.nom }}</p>
            <p><strong>Prénom:</strong> {{ formData.prenom }}</p>
            <p><strong>Email:</strong> {{ formData.email }}</p>
            <p><strong>Téléphone:</strong> {{ formData.telephone }}</p>
          </div>
        </div>
      </div>
    </transition>

    <div class="form-buttons">
      <button 
        v-if="currentStep > 0" 
        @click="prevStep" 
        class="btn btn-secondary"
      >
        Précédent
      </button>
      <button 
        v-if="currentStep < steps.length - 1" 
        @click="nextStep" 
        class="btn btn-primary"
      >
        Suivant
      </button>
      <button 
        v-if="currentStep === steps.length - 1" 
        @click="submitForm" 
        class="btn btn-success"
      >
        Soumettre
      </button>
    </div>
  </div>
</template>

<script>
import { authService } from '../services/authService'

export default {
  name: 'MultiStepForm',
  data() {
    return {
      currentStep: 0,
      steps: ['Informations', 'Contact', 'Confirmation'],
      formData: {
        nom: '',
        prenom: '',
        email: '',
        password: '',
        telephone: ''
      }
    }
  },
  methods: {
    nextStep() {
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++
      }
    },
    prevStep() {
      if (this.currentStep > 0) {
        this.currentStep--
      }
    },
    async submitForm() {
      try {
        // Envoyer uniquement email et password pour l'authentification
        const authData = {
          email: this.formData.email,
          password: this.formData.password
        }

        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(authData)
        })

        if (!response.ok) {
          throw new Error('Email ou mot de passe incorrect')
        }

        const data = await response.json()
        
        // Sauvegarder le token et les données utilisateur
        authService.setAuth(data.token, {
          prenom: this.formData.prenom,
          nom: this.formData.nom,
          email: this.formData.email
        })

        // Rediriger vers la page d'accueil
        this.$router.push('/home')
      } catch (error) {
        console.error('Erreur lors de la soumission:', error)
        alert(error.message || 'Une erreur est survenue lors de la connexion')
      }
    }
  }
}
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.steps-indicator {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 1rem;
}

.step {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #6c757d;
}

.step.active {
  background: #4a90e2;
  color: white;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #495057;
}

.form-control {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.btn-primary {
  background: #4a90e2;
  color: white;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-success {
  background: #28a745;
  color: white;
}

.summary {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
}

/* Transitions */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style> 