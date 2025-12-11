<script setup lang="ts">
import Home from "./components/Home.vue";
import Stage from "./components/Stage.vue";
import Realisations from "./components/Realisations.vue";
import Veille from "./components/Veille.vue";
</script>

<template>
  <Home/>
  <Stage/>
  <Realisations/>
  <Veille/>

</template>

<style scoped>
h1 {
  font-size: 15em;
  font-weight: 700;
  margin: 0;
  font-family: "exmouth", serif;
}
h2 {
  font-weight: 300;
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


