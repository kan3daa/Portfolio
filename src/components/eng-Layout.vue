<script setup lang="ts">
const birthDate = new Date('2006-10-30');
const today = new Date();
let age = today.getFullYear() - birthDate.getFullYear();
const birthdayPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
if (!birthdayPassed) {
  age--;
}
</script>

<template>
  <div>
    <div>
      <h1>Hello.</h1>
      <h2>My name is Matias Sanches Da Silva.</h2>
    </div>
    <p>
      I have {{age}} and I am a student at <a href="https://www.gastonberger.fr/">Gaston Berger</a> in the BTS program for IT Services for Organizations, specializing in Software Solutions and Business Applications ||
      <a href="https://www.onisep.fr/ressources/univers-formation/formations/post-bac/bts-services-informatiques-aux-organisations-option-b-solutions-logicielles-et-applications-metiers">SIO SLAM</a>.
    </p>
    <p>
      Outside of my student life, I enjoy <a href="https://letterboxd.com/kan3da_movie/list/fav/">old films</a> and video games (Soulsborne & Silent Hill are my favorites).
      <br>
      food, watching UFC/Boxing, reading books, manga, and manhwa...


    </p>
  </div>
</template>

<style scoped>
h1 {
  font-size: 4.5em;
  font-weight: 700;
  margin-bottom: 0;
}
h2 {
  font-size: 2.2em;
  font-weight: 700;
  letter-spacing: -1.5px;
}
p {
  font-size: 1.3em;
  font-weight: 300;
  line-height: 1.4;
  max-width: 28em;
}
a {
  text-decoration: none;
  white-space: nowrap;
  color: #121314;
  position: relative;
}
a:after {
  content: '';
  position: absolute;
  z-index: -1;
  top: 66%;
  left: -0.1em;
  right: -0.1em;
  bottom: 0;
  transition: top 200ms cubic-bezier(0, 0.8, 0.13, 1);
  background-color: rgba(22, 22, 27, 0.51);
}
a:hover:after {
  top: 0;
}


</style>
