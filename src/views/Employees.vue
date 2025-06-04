<template>
  <div class="employees-container">
    <div class="page-header">
      <h1>Gestion des Employés</h1>
      <p class="subtitle">Gérez votre équipe efficacement</p>
    </div>
    
    <!-- Formulaire d'ajout/modification -->
    <div class="form-container">
      <div class="form-header">
        <h2>{{ isEditing ? 'Modifier l\'employé' : 'Ajouter un employé' }}</h2>
        <div class="form-icon">
          <i class="fas fa-user-plus"></i>
        </div>
      </div>
      <form @submit.prevent="handleSubmit" class="employee-form">
        <div class="form-row">
          <div class="form-group">
            <label for="firstName">
              <i class="fas fa-user"></i>
              Prénom
            </label>
            <input 
              type="text" 
              id="firstName" 
              v-model="employeeForm.firstName" 
              required
              placeholder="Entrez le prénom"
            >
          </div>
          
          <div class="form-group">
            <label for="lastName">
              <i class="fas fa-user"></i>
              Nom
            </label>
            <input 
              type="text" 
              id="lastName" 
              v-model="employeeForm.lastName" 
              required
              placeholder="Entrez le nom"
            >
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="email">
              <i class="fas fa-envelope"></i>
              Email
            </label>
            <input 
              type="email" 
              id="email" 
              v-model="employeeForm.email" 
              required
              placeholder="exemple@email.com"
            >
          </div>
          
          <div class="form-group">
            <label for="position">
              <i class="fas fa-briefcase"></i>
              Poste
            </label>
            <input 
              type="text" 
              id="position" 
              v-model="employeeForm.position" 
              required
              placeholder="Entrez le poste"
            >
          </div>
        </div>
        
        <div class="form-actions">
          <button type="submit" class="btn-primary">
            <i :class="isEditing ? 'fas fa-save' : 'fas fa-plus'"></i>
            {{ isEditing ? 'Modifier' : 'Ajouter' }}
          </button>
          <button type="button" @click="resetForm" class="btn-secondary">
            <i class="fas fa-times"></i>
            Annuler
          </button>
        </div>
      </form>
    </div>

    <!-- Liste des employés -->
    <div class="employees-list">
      <div class="list-header">
        <h2>Liste des employés</h2>
        <div class="list-stats">
          <span class="stat-item">
            <i class="fas fa-users"></i>
            {{ employees.length }} employés
          </span>
        </div>
      </div>
      
      <div class="table-responsive">
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
            <tr v-for="employee in employees" :key="employee.id" class="employee-row">
              <td>{{ employee.firstName }}</td>
              <td>{{ employee.lastName }}</td>
              <td>{{ employee.email }}</td>
              <td>{{ employee.position }}</td>
              <td class="actions-cell">
                <button @click="editEmployee(employee)" class="btn-edit" title="Modifier">
                  <i class="fas fa-edit"></i>
                </button>
                <button @click="deleteEmployee(employee.id)" class="btn-delete" title="Supprimer">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #7f8c8d;
  font-size: 1.1rem;
}

.form-container {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
  transition: transform 0.3s ease;
}

.form-container:hover {
  transform: translateY(-5px);
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.form-icon {
  font-size: 2rem;
  color: #4a90e2;
}

.employee-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: #2c3e50;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-group input {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus {
  border-color: #4a90e2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  outline: none;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-primary, .btn-secondary {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #4a90e2;
  color: white;
}

.btn-primary:hover {
  background-color: #357abd;
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: #e74c3c;
  color: white;
}

.btn-secondary:hover {
  background-color: #c0392b;
  transform: translateY(-2px);
}

.employees-list {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.list-stats {
  display: flex;
  gap: 1rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #7f8c8d;
}

.table-responsive {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

th {
  background-color: #f8f9fa;
  color: #2c3e50;
  font-weight: 600;
  padding: 1rem;
  text-align: left;
  border-bottom: 2px solid #e0e0e0;
}

td {
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
  color: #2c3e50;
}

.employee-row:hover {
  background-color: #f8f9fa;
}

.actions-cell {
  display: flex;
  gap: 0.5rem;
}

.btn-edit, .btn-delete {
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-edit {
  background-color: #4a90e2;
  color: white;
}

.btn-delete {
  background-color: #e74c3c;
  color: white;
}

.btn-edit:hover, .btn-delete:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .employees-container {
    padding: 1rem;
  }
  
  .form-container, .employees-list {
    padding: 1rem;
  }
}
</style> 