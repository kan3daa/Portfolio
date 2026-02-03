<script setup lang="ts">
import {computed} from 'vue'

const birthDate = new Date('2006-10-30');

const age = computed(() => {
  const today = new Date(); // recalcul chaque fois que c'est lu
  let a = today.getFullYear() - birthDate.getFullYear();
  const birthdayPassed =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
  if (!birthdayPassed) a--;
  return a;
});

</script>

<template>
  <div class="portfolio-container">
    <h1>Portfolio</h1>
    
    <div class="content-section">
      <h2>Présentation</h2>
      <p>
        je m'appelle <strong>Matias Sanches Da Silva</strong> j'ai <strong>{{ age }} ans </strong> et je suis étudiant à
        <a href="https://www.gastonberger.fr/" target="_blank">Gaston Berger</a> en BTS Services Informatiques aux Organisations, <br> option
        Solutions Logicielles et Applications Métiers |
        <a href="https://www.onisep.fr/ressources/univers-formation/formations/post-bac/bts-services-informatiques-aux-organisations-option-b-solutions-logicielles-et-applications-metiers" target="_blank">SIO
          SLAM</a>.
      </p>
      <p>
        En dehors de ma vie étudiante, j'aime
        <a href="https://letterboxd.com/kan3da_movie/list/fav/" target="_blank">les films</a> et les jeux vidéo <br> (Soulsborne & Silent
        Hill sont mes préférés).<br>
        La nourriture, regarder l'UFC/boxe, lire des livres, des mangas et des manhwas...
      </p>
    </div>

    <div class="content-section">
      <h2>Parcours</h2>
      <div class="timeline">
        <div class="timeline-item">
          <div class="timeline-period">2021-2022</div>
          <div class="timeline-content">
            <h4>Classe de seconde professionnelle</h4>
            <p>
              Métiers des transitions numérique et énergétique -
              <a href="https://www.onisep.fr/ressources/univers-formation/formations/lycees/classe-de-2de-professionnelle-metiers-des-transitions-numerique-et-energetique" target="_blank">TSN</a>
            </p>
          </div>
        </div>
        
        <div class="timeline-item">
          <div class="timeline-period">2022-2024</div>
          <div class="timeline-content">
            <h4>Bac Professionnel Systèmes Numériques</h4>
            <p>
              Classe de première & terminale professionnelle Systèmes Numériques -
              <a href="https://sti.eduscol.education.fr/formations/bac-pro/bac-pro-systemes-numeriques-sn" target="_blank">SN</a>
            </p>
            <div class="mention-badge">Mention Très Bien</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.portfolio-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  font-size: 15em;
  font-weight: 700;
  margin: 0 0 2rem 0;
  font-family: "exmouth", serif;
}

h2 {
font-size: 3em;
font-weight: 700;
margin-bottom: 0.5rem;
font-family: "Helvitica", serif;
} 

h4 {
  font-size: 1.4em;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.content-section {
  margin-bottom: 5rem;
}

p {
  font-size: 1.2em;
  font-weight: 300;
  line-height: 1.6;
  max-width: 100%;
  margin: 1.5rem 0;
}

a {
  color: #121314;
  text-decoration: underline;
  transition: color 0.2s;
}

a:hover {
  color: #000;
}

a:visited {
  color: #551A8B;
}

/* Timeline Styles */
.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #000;
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;
  padding-left: 2rem;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -2rem;
  top: 0.5rem;
  width: 12px;
  height: 12px;
  background: #000;
  border-radius: 50%;
  transform: translateX(-5px);
}

.timeline-period {
  font-size: 0.95em;
  font-weight: 600;
  color: #666;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.timeline-content h4 {
  margin-top: 0.5rem;
}

.timeline-content p {
  margin: 0.75rem 0;
}

.mention-badge {
  display: inline-block;
  background: #000;
  color: #fff;
  padding: 0.5rem 1rem;
  font-size: 0.9em;
  font-weight: 600;
  margin-top: 1rem;
  letter-spacing: 0.05em;
}

/* Responsive */
@media (max-width: 768px) {
  .portfolio-container {
    padding: 1rem;
  }

  h1 {
    font-size: 8em;
  }

  h2 {
    font-size: 2em;
  }

  p {
    font-size: 1.1em;
  }

  .timeline {
    padding-left: 1.5rem;
  }

  .timeline-item {
    padding-left: 1.5rem;
  }
}
</style>