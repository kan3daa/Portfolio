<script setup lang="ts">
import { ref } from 'vue'

interface Stage {
  id: string;
  name: string;
  fullName: string;
  sector: string;
  location: string;
  website: string;
  period: string;
  description: string;
  role: string;
  missions: string[];
  skills: string[];
  tasks: string[];
  logo?: string;
}

const openCitc = ref(false)
const openEmmaus = ref(false)

const stages: Record<string, Stage> = {
  citc: {
    id: 'citc',
    name: 'CITC',
    fullName: 'IOT Cluster',
    sector: 'Internet des Objets (IoT), Innovation technologique, Connectivité',
    location: 'Euratechnologie, Hauts-de-France',
    website: 'https://iotcluster.fr',
    period: '19 Mai 2025 - 27 Juin 2025',
    description: "L'IOT Cluster est un acteur clé de l'Internet des Objets (IoT) basé à Lille, réunissant des entreprises, des startups et des institutions autour de projets technologiques innovants. L'objectif de l'IOT Cluster est d'accompagner les entreprises dans leur transition numérique en proposant des solutions IoT qui optimisent les processus industriels, la gestion des données, la mobilité, et la santé. L'IOT Cluster œuvre dans des secteurs variés, notamment l'industrie, la santé, l'agriculture, et les Smart Cities, en développant des produits connectés et des plateformes de données intelligentes.",
    role: 'Développeur',
    missions: [
      "Développement et intégration de solutions IoT : Participation à la conception de dispositifs connectés pour des entreprises partenaires",
      "Analyse des données : Traitement des données issues des capteurs IoT et création de rapports pour optimiser les processus métier",
      "Prototypage de produits connectés : Développement de prototypes en utilisant des plateformes IoT et réalisation de tests pour valider les solutions",
      "Support technique : Aide aux entreprises partenaires pour la mise en œuvre de leurs solutions IoT et gestion des retours techniques"
    ],
    skills: [
      "Développement IoT : Utilisation de technologies comme Python, JavaScript, et des protocoles de communication IoT (MQTT, HTTP)",
      "Analyse de données : Travail avec des outils comme SQL, et des bases de données pour exploiter les données IoT",
      "Gestion de projets : Collaboration avec des équipes techniques sur des projets web, IoT."
    ],
    tasks: [
      "Snake sur tableau serpentin (Arduino)",
      "Gandalf - Sensibilisation sécurité/prompt injection",
      "Visual Inventory - Contribution open source Django",
      "Documentation et mise en pratique Docker",
      "Dockerisation de projets",
      "Docker Visual Inventory avec multi-stage build",
      "Docker Compose Visual Inventory",
      "Frontend projet PRV (React TSX)",
      "Création et mise à jour du portfolio",
      "Veille technologique React/JavaScript"
    ]
  },
  emmaus: {
    id: 'emmaus',
    name: 'Emmaüs Wambrechies',
    fullName: 'Emmaüs Wambrechies - Les Chiffonniers de la Lys',
    sector: 'Économie sociale et solidaire, Réemploi, Action sociale',
    location: 'Wambrechies, Hauts-de-France',
    website: 'https://www.chiffonniers.net',
    period: '5 Janvier 2026 - 14 Février 2026',
    description: "Emmaüs Wambrechies, également connu sous le nom des Chiffonniers Batisseurs, est une association de l'économie sociale et solidaire qui œuvre pour l'insertion par l'emploi et la lutte contre l'exclusion. L'association collecte, trie et revend des objets de seconde main, tout en offrant un accompagnement social à des personnes en difficulté. Elle participe activement à la réduction des déchets et à la promotion du réemploi dans une démarche environnementale et solidaire.",
    role: 'Développeur web et gestion de projet',
    missions: [
      "Redesign du site web : Refonte complète du site internet pour améliorer l'image de l'association et la visibilité en ligne",
      "Développement d'un logiciel de pointage bénévoles : Création d'une application de gestion du temps et des présences pour faciliter le suivi des bénévoles",
      "Optimisation SEO : Mise en place de techniques de référencement pour améliorer la présence en ligne",
      "Accompagnement des utilisateurs : Formation et support aux équipes de l'association sur les nouveaux outils numériques"
    ],
    skills: [
      "Développement web : Utilisation de NextJs, TypeScript, et Tailwind CSS pour le redesign du site",
      "Développement applicatif : Conception et administration d'un logiciel de pointage avec JavaFx et SQLite et logiciel de scanner ISBN en Python (OpenCv, )",
      "UX/UI Design : Amélioration de l'expérience utilisateur et de l'interface graphique",
      "SEO et visibilité en ligne : Aide à la gestion de la page Google My Business",
    ],
    tasks: [
      "Redesign complet du site web de l'association",
      "Développement du logiciel de pointage des bénévoles",
      "Développement du logiciel de scanner - Ocr des bénévoles",
      "Mise en place de système d'habilitations (admin/bénévole)",
      "Implémentation de sauvegardes et restauration",
      "Accompagnement et formation des utilisateurs",
      "Optimisation SEO et mesure de visibilité",
    ]
  }
}

const openModal = (stageId: string) => {
  if (stageId === 'citc') {
    openCitc.value = true
  } else {
    openEmmaus.value = true
  }
  document.body.style.overflow = 'hidden'
}

const closeModal = (stageId: string) => {
  if (stageId === 'citc') {
    openCitc.value = false
  } else {
    openEmmaus.value = false
  }
  document.body.style.overflow = 'auto'
}
</script>

<template>
  <div class="stage-container">
    <h2>Stages</h2>
    <p class="intro">Découvrez mes expériences professionnelles et les compétences acquises</p>
    
    <div class="buttons-container">
      <button @click="openModal('citc')" class="stage-button">
        <span class="stage-name">{{ stages.citc.name }}</span>
        <span class="stage-period">{{ stages.citc.period }}</span>
      </button>
      
      <button @click="openModal('emmaus')" class="stage-button">
        <span class="stage-name">{{ stages.emmaus.name }}</span>
        <span class="stage-period">{{ stages.emmaus.period }}</span>
      </button>
    </div>

    <!-- Modal CITC -->
    <Transition name="modal">
      <div v-if="openCitc" class="modal-overlay" @click="closeModal('citc')">
        <div class="modal-container" @click.stop>
          <button class="modal-close" @click="closeModal('citc')">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <article class="modal-content">
            <div class="modal-header">
              <div class="header-top">
                <h1 class="company-name">{{ stages.citc.fullName }}</h1>
                <a :href="stages.citc.website" target="_blank" class="website-link">
                  {{ stages.citc.website.replace('https://', '') }}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
              
              <div class="meta-info">
                <div class="meta-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span>{{ stages.citc.period }}</span>
                </div>
                <div class="meta-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>{{ stages.citc.location }}</span>
                </div>
                <div class="meta-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>{{ stages.citc.role }}</span>
                </div>
              </div>
              
              <div class="sector-tag">{{ stages.citc.sector }}</div>
            </div>

            <section class="section">
              <h3>À propos de l'entreprise</h3>
              <p class="description">{{ stages.citc.description }}</p>
            </section>

            <section class="section">
              <h3>Missions principales</h3>
              <ul class="missions-list">
                <li v-for="(mission, index) in stages.citc.missions" :key="index">
                  {{ mission }}
                </li>
              </ul>
            </section>

            <section class="section">
              <h3>Compétences développées</h3>
              <ul class="skills-list">
                <li v-for="(skill, index) in stages.citc.skills" :key="index">
                  {{ skill }}
                </li>
              </ul>
            </section>

            <section class="section">
              <h3>Réalisations techniques</h3>
              <div class="tasks-grid">
                <div v-for="(task, index) in stages.citc.tasks" :key="index" class="task-card">
                  <span>{{ task }}</span>
                </div>
              </div>
            </section>
          </article>
        </div>
      </div>
    </Transition>

    <!-- Modal Emmaüs -->
    <Transition name="modal">
      <div v-if="openEmmaus" class="modal-overlay" @click="closeModal('emmaus')">
        <div class="modal-container" @click.stop>
          <button class="modal-close" @click="closeModal('emmaus')">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <article class="modal-content">
            <div class="modal-header">
              <div class="header-top">
                <h1 class="company-name">{{ stages.emmaus.fullName }}</h1>
                <a :href="stages.emmaus.website" target="_blank" class="website-link">
                  {{ stages.emmaus.website.replace('https://', '').replace('www.', '') }}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
              
              <div class="meta-info">
                <div class="meta-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span>{{ stages.emmaus.period }}</span>
                </div>
                <div class="meta-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>{{ stages.emmaus.location }}</span>
                </div>
                <div class="meta-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>{{ stages.emmaus.role }}</span>
                </div>
              </div>
              
              <div class="sector-tag">{{ stages.emmaus.sector }}</div>
            </div>

            <section class="section">
              <h3>À propos de l'association</h3>
              <p class="description">{{ stages.emmaus.description }}</p>
            </section>

            <section class="section">
              <h3>Missions principales</h3>
              <ul class="missions-list">
                <li v-for="(mission, index) in stages.emmaus.missions" :key="index">
                  {{ mission }}
                </li>
              </ul>
            </section>

            <section class="section">
              <h3>Compétences développées</h3>
              <ul class="skills-list">
                <li v-for="(skill, index) in stages.emmaus.skills" :key="index">
                  {{ skill }}
                </li>
              </ul>
            </section>

            <section class="section">
              <h3>Réalisations techniques</h3>
              <div class="tasks-grid">
                <div v-for="(task, index) in stages.emmaus.tasks" :key="index" class="task-card">
                  <span>{{ task }}</span>
                </div>
              </div>
            </section>
          </article>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.stage-container {
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

.intro {
  font-size: 1.2em;
  font-weight: 300;
  color: #666;
  margin-bottom: 3rem;
  max-width: 100%;
}

.buttons-container {
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
  margin-top: 3rem;
}

.stage-button {
  all: unset;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
  padding: 2rem 3rem;
  transition: all 0.3s ease;
  background: #fff;
  min-width: 300px;
}

.stage-button:hover {
  background: #000;
  color: #fff;
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.stage-name {
  font-size: 2em;
  font-weight: 700;
  font-family: "Helvetica", serif;
  margin-bottom: 0.5rem;
}

.stage-period {
  font-size: 1em;
  font-weight: 300;
  opacity: 0.7;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 1000;
  overflow-y: auto;
  padding: 2rem 1rem;
}

.modal-container {
  background: #fff;
  max-width: 900px;
  width: 100%;
  position: relative;
  margin: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-close {
  position: sticky;
  top: 1rem;
  right: 1rem;
  float: right;
  background: #000;
  color: #fff;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  z-index: 10;
  margin: 1rem 1rem 0 0;
}

.modal-close:hover {
  background: #333;
}

.modal-content {
  padding: 3rem;
}

.modal-header {
  border-bottom: 2px solid #000;
  padding-bottom: 2rem;
  margin-bottom: 2rem;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.company-name {
  font-size: 2.5em;
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
  font-family: "Helvetica", serif;
  flex: 1;
}

.website-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #000;
  text-decoration: none;
  font-size: 0.9em;
  padding: 0.5rem 1rem;
  border: 1px solid #000;
  transition: all 0.2s;
}

.website-link:hover {
  background: #000;
  color: #fff;
}

.meta-info {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95em;
  color: #333;
}

.sector-tag {
  display: inline-block;
  background: #f0f0f0;
  padding: 0.75rem 1.5rem;
  font-size: 0.85em;
  font-weight: 500;
  color: #333;
  margin-top: 1rem;
}

.section {
  margin: 2.5rem 0;
}

.section h3 {
  font-size: 1.6em;
  font-weight: 700;
  margin-bottom: 1rem;
  font-family: "Helvetica", serif;
}

.description {
  font-size: 1.1em;
  line-height: 1.8;
  color: #333;
  margin: 0;
  max-width: 100%;
}

.missions-list,
.skills-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.missions-list li,
.skills-list li {
  font-size: 1.05em;
  line-height: 1.7;
  color: #333;
  padding-left: 1.5rem;
  position: relative;
  margin-bottom: 1rem;
}

.missions-list li::before {
  content: "→";
  position: absolute;
  left: 0;
  font-weight: 700;
}

.skills-list li::before {
  content: "✓";
  position: absolute;
  left: 0;
  font-weight: 700;
  color: #000;
}

.tasks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.task-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #f8f8f8;
  border-left: 3px solid #000;
  font-size: 0.95em;
  transition: all 0.2s;
}

.task-card:hover {
  background: #f0f0f0;
  transform: translateX(5px);
}

.task-icon {
  font-size: 1.3em;
  flex-shrink: 0;
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.95);
}

/* Responsive */
@media (max-width: 768px) {
  .stage-container {
    padding: 1rem;
  }
  
  .buttons-container {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .stage-button {
    min-width: 100%;
    padding: 1.5rem;
  }
  
  .modal-content {
    padding: 2rem 1.5rem;
  }
  
  .company-name {
    font-size: 1.8em;
  }
  
  .meta-info {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .tasks-grid {
    grid-template-columns: 1fr;
  }
}
</style>