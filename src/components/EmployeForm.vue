<template>
  <form @submit.prevent="handleSubmit" class="employe-form">
    <div class="form-group">
      <label for="nom">Nom</label>
      <input
        type="text"
        id="nom"
        v-model="formData.nom"
        required
        class="form-control"
        :class="{ 'is-invalid': errors.nom }"
      />
      <div class="invalid-feedback" v-if="errors.nom">{{ errors.nom }}</div>
    </div>

    <div class="form-group">
      <label for="prenom">Prénom</label>
      <input
        type="text"
        id="prenom"
        v-model="formData.prenom"
        required
        class="form-control"
        :class="{ 'is-invalid': errors.prenom }"
      />
      <div class="invalid-feedback" v-if="errors.prenom">{{ errors.prenom }}</div>
    </div>

    <div class="form-group">
      <label for="role">Rôle</label>
      <select
        id="role"
        v-model="formData.role"
        class="form-control"
      >
        <option value="">Sélectionnez un rôle</option>
        <option value="Vendeur">Vendeur</option>
        <option value="Manager">Manager</option>
        <option value="Administrateur">Administrateur</option>
      </select>
    </div>

    <div class="form-group">
      <label for="salaire">Salaire</label>
      <input
        type="number"
        id="salaire"
        v-model="formData.salaire"
        required
        step="0.01"
        min="0"
        class="form-control"
        :class="{ 'is-invalid': errors.salaire }"
      />
      <div class="invalid-feedback" v-if="errors.salaire">{{ errors.salaire }}</div>
    </div>

    <div class="form-group">
      <label for="date_naissance">Date de naissance</label>
      <input
        type="date"
        id="date_naissance"
        v-model="formData.date_naissance"
        class="form-control"
      />
    </div>

    <div class="form-group">
      <label for="adresse">Adresse</label>
      <textarea
        id="adresse"
        v-model="formData.adresse"
        class="form-control"
        rows="2"
      ></textarea>
    </div>

    <div class="form-group">
      <label for="telephone">Téléphone</label>
      <input
        type="tel"
        id="telephone"
        v-model="formData.telephone"
        class="form-control"
        :class="{ 'is-invalid': errors.telephone }"
      />
      <div class="invalid-feedback" v-if="errors.telephone">{{ errors.telephone }}</div>
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        v-model="formData.email"
        required
        class="form-control"
        :class="{ 'is-invalid': errors.email }"
      />
      <div class="invalid-feedback" v-if="errors.email">{{ errors.email }}</div>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive } from 'vue';

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      nom: '',
      prenom: '',
      role: '',
      salaire: 0,
      date_naissance: '',
      adresse: '',
      telephone: '',
      email: ''
    })
  }
});

const emit = defineEmits(['submit']);

const formData = reactive({ ...props.initialData });
const errors = reactive({});

function validateForm() {
  const newErrors = {};
  
  if (!formData.nom) {
    newErrors.nom = 'Le nom est requis';
  } else if (formData.nom.length < 2) {
    newErrors.nom = 'Le nom doit faire au moins 2 caractères';
  }

  if (!formData.prenom) {
    newErrors.prenom = 'Le prénom est requis';
  } else if (formData.prenom.length < 2) {
    newErrors.prenom = 'Le prénom doit faire au moins 2 caractères';
  }

  if (!formData.salaire || formData.salaire < 0) {
    newErrors.salaire = 'Le salaire doit être supérieur à 0';
  }

  if (formData.telephone && !/^[0-9+\s-]{10,}$/.test(formData.telephone)) {
    newErrors.telephone = 'Format de téléphone invalide';
  }

  if (!formData.email) {
    newErrors.email = "L'email est requis";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = "Format d'email invalide";
  }

  Object.assign(errors, newErrors);
  return Object.keys(newErrors).length === 0;
}

function handleSubmit() {
  if (validateForm()) {
    emit('submit', { ...formData });
  }
}

// Exposer les méthodes et données nécessaires
defineExpose({
  formData,
  errors,
  validateForm,
  handleSubmit
});
</script>

<style scoped>
.employe-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-control {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-control:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
}

.form-control.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

label {
  font-weight: 500;
  color: #333;
}
</style> 