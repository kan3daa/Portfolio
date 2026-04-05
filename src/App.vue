<script setup lang="ts">
import Home from '@/components/Home.vue'
import Stage from '@/components/Stage.vue'
import Realisations from '@/components/Realisations.vue'
import Veille from '@/components/Veille.vue'
import CustomCursor from './components/CustomCursor.vue';
</script>

<template>
  <CustomCursor />
  <Home />
  <Stage />
  <Realisations />
  <Veille />
</template>

<style>
* {
  cursor: none !important;
}
</style>