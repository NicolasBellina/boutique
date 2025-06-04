<template>
  <div class="form-page">
    <h2>Formulaire d'inscription</h2>
    <MultiStepForm />
  </div>
</template>

<script>
import MultiStepForm from '@/components/MultiStepForm.vue'

export default {
  name: 'FormPage',
  components: {
    MultiStepForm
  }
}
</script>

<style scoped>
.form-page {
  padding: 2rem;
  min-height: 100vh;
  background-color: #f8f9fa;
}

h2 {
  text-align: center;
  color: #343a40;
  margin-bottom: 2rem;
}
</style> 