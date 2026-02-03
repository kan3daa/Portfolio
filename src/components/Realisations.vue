<script setup lang="ts">

import RealCard from "./realCard.vue";
</script>

<template>
  <div class="realisation-container">
    <h2>Réalisations</h2>
    <RealCard/>
  </div>
</template>

<style scoped>
.realisation-container {
max-width: 1200px;
margin: 0 auto;
padding: 1rem;
}

h2 {
font-size: 3em;
font-weight: 700;
margin-bottom: 0.5rem;
font-family: "Helvitica", serif;
}

h4 {
  font-size: 1.3em;
  font-weight: 400;
  margin-bottom: -1em;
}

p {
  font-size: 1.2em;
  font-weight: 300;
  line-height: 1.4;
  max-width: 28em;
  margin: 2em 0;
}

</style>