<template>
  <div class="employee-card" @click="navigateToEmployees">
    <div class="card-content">
      <i class="fas fa-users employee-icon"></i>
      <h3>Gestion des Employés</h3>
      <p>Cliquez pour accéder à la liste des employés</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmployeeCard',
  methods: {
    navigateToEmployees() {
      this.$router.push('/employes');
    }
  }
}
</script>

<style scoped>
.employee-card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  max-width: 300px;
  margin: 20px auto;
}

.employee-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.card-content {
  text-align: center;
}

.employee-icon {
  font-size: 48px;
  color: #4a90e2;
  margin-bottom: 15px;
}

h3 {
  margin: 10px 0;
  color: #333;
}

p {
  color: #666;
  margin: 0;
}
</style> 