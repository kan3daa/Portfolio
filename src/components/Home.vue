<script setup lang="ts">
import { computed } from 'vue'

const birthDate = new Date('2006-10-30');
const today = new Date();

const age = computed(() => {
  let a = today.getFullYear() - birthDate.getFullYear();
  const birthdayPassed =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
  if (!birthdayPassed) a--;
  return a;
});
</script>

<template>
  <div>
    <Menu />

    <div class="top_info">
      <div>
      </div>
      <h1>Portfolio</h1>
      <p>
        J'ai {{ age }} ans et je suis étudiant à
        <a href="https://www.gastonberger.fr/">Gaston Berger</a> en BTS Services Informatiques aux Organisations, option Solutions Logicielles et Applications Métiers |
        <a href="https://www.onisep.fr/ressources/univers-formation/formations/post-bac/bts-services-informatiques-aux-organisations-option-b-solutions-logicielles-et-applications-metiers">SIO SLAM</a>.
      </p>
      <p>
        En dehors de ma vie étudiante, j'aime
        <a href="https://letterboxd.com/kan3da_movie/list/fav/">les films</a> et les jeux vidéo (Soulsborne & Silent Hill sont mes préférés).<br>
        La nourriture, regarder l'UFC/boxe, lire des livres, des mangas et des manhwas...
      </p>
    </div>

    <div class="self_info">
      <h2>Parcours</h2>
      <div>
        <p>
          Classe de seconde professionnelle métiers des transitions numérique et énergétique -
          <a href="https://www.onisep.fr/ressources/univers-formation/formations/lycees/classe-de-2de-professionnelle-metiers-des-transitions-numerique-et-energetique">TSN</a> | 2021-2022
        </p>
        <p>
          Classe de première & terminale professionnelle Systèmes Numériques -
          <a href="https://sti.eduscol.education.fr/formations/bac-pro/bac-pro-systemes-numeriques-sn">SN</a> | 2022-2024 | Bac Mention Très Bien
        </p>
      </div>
    </div>
  </div>
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