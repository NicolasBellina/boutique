<template>
  <div class="employees-container">
    <h1>Gestion des Employés</h1>
    
    <!-- Formulaire d'ajout/modification -->
    <div class="form-container">
      <h2>{{ isEditing ? 'Modifier l\'employé' : 'Ajouter un employé' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="firstName">Prénom</label>
          <input type="text" id="firstName" v-model="employeeForm.firstName" required>
        </div>
        
        <div class="form-group">
          <label for="lastName">Nom</label>
          <input type="text" id="lastName" v-model="employeeForm.lastName" required>
        </div>
        
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="employeeForm.email" required>
        </div>
        
        <div class="form-group">
          <label for="position">Poste</label>
          <input type="text" id="position" v-model="employeeForm.position" required>
        </div>
        
        <button type="submit" class="btn-primary">
          {{ isEditing ? 'Modifier' : 'Ajouter' }}
        </button>
        <button type="button" @click="resetForm" class="btn-secondary">
          Annuler
        </button>
      </form>
    </div>

    <!-- Liste des employés -->
    <div class="employees-list">
      <h2>Liste des employés</h2>
      <table>
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Poste</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in employees" :key="employee.id">
            <td>{{ employee.firstName }}</td>
            <td>{{ employee.lastName }}</td>
            <td>{{ employee.email }}</td>
            <td>{{ employee.position }}</td>
            <td>
              <button @click="editEmployee(employee)" class="btn-edit">
                Modifier
              </button>
              <button @click="deleteEmployee(employee.id)" class="btn-delete">
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import employeeService from '../services/api/employeeService';

export default {
  name: 'Employees',
  data() {
    return {
      employees: [],
      employeeForm: {
        firstName: '',
        lastName: '',
        email: '',
        position: ''
      },
      isEditing: false,
      currentEmployeeId: null
    };
  },
  methods: {
    async loadEmployees() {
      try {
        this.employees = await employeeService.getAllEmployees();
      } catch (error) {
        console.error('Erreur lors du chargement des employés:', error);
      }
    },
    async handleSubmit() {
      try {
        if (this.isEditing) {
          await employeeService.updateEmployee(this.currentEmployeeId, this.employeeForm);
        } else {
          await employeeService.createEmployee(this.employeeForm);
        }
        this.resetForm();
        this.loadEmployees();
      } catch (error) {
        console.error('Erreur lors de la sauvegarde de l\'employé:', error);
      }
    },
    editEmployee(employee) {
      this.employeeForm = { ...employee };
      this.isEditing = true;
      this.currentEmployeeId = employee.id;
    },
    async deleteEmployee(id) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
        try {
          await employeeService.deleteEmployee(id);
          this.loadEmployees();
        } catch (error) {
          console.error('Erreur lors de la suppression de l\'employé:', error);
        }
      }
    },
    resetForm() {
      this.employeeForm = {
        firstName: '',
        lastName: '',
        email: '',
        position: ''
      };
      this.isEditing = false;
      this.currentEmployeeId = null;
    }
  },
  mounted() {
    this.loadEmployees();
  }
};
</script>

<style scoped>
.employees-container {
  padding: 20px;
}

.form-container {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.btn-primary {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

.btn-secondary {
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.employees-list table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.employees-list th,
.employees-list td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.btn-edit {
  background-color: #2196F3;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
}

.btn-delete {
  background-color: #f44336;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style> 