<template>
  <h1>MyApp</h1>

  <div>Welcome to the micro frontends demo</div>

  <div class="container">
    <App1 />
    <App2 />
  </div>
</template>

<script setup>
import { defineAsyncComponent } from "vue";

import App1 from "microfrontend1/App";
import App2 from "microfrontend2/App";
</script>

<style scoped>
.container {
  margin-top: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  gap: 10px;
}
</style>
