<template>
  <div id="app">
    <router-view class="router-view"></router-view>
  </div>
</template>

<script>
import FooterComponent from './components/footer.vue'
export default {
  name: 'App',
  components: { FooterComponent }
}
</script>

<style>
/* Ajoutez ici vos styles globaux */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.router-view {
  flex: 1 0 auto;
}
</style>
