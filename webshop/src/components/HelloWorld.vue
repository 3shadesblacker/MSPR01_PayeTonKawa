<script setup lang="ts">
import {useFetch} from "./tools/useFetch"

// const {data, error} = useFetch(new URL('http://51.38.237.216:3000/login'))

</script>

<template>
  <div v-if="error">{{ error }}</div>
  <div v-else-if="data">{{ data }}</div>
  <div v-else>Loading...</div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
