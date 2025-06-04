<template>
  <div class="home">
    <h1>Bienvenue dans votre espace de gestion</h1>
    <div class="cards-container">
      <EmployeeCard />
    </div>
  </div>
</template>

<script>
import EmployeeCard from '../components/EmployeeCard.vue'

export default {
  name: 'Home',
  components: {
    EmployeeCard
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
  text-align: center;
}

h1 {
  color: #333;
  margin-bottom: 40px;
}

.cards-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}
</style> 