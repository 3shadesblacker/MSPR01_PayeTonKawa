<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template >
  <div class="flex flex-column full-width full-height">
    <header class="flex justify-space-between align-items-center">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="25" height="25" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
      </nav>
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
header{
  background-color: white;
  padding: 1rem;
  position: sticky;
  top: 0;
  z-index: 1;
}

</style>
