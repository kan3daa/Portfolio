<script setup lang="ts">
import { ref } from 'vue';
import AdminAP1 from '../assets/IMG/AP1/AdminAP1.png';
import ReadmeAP1 from '../assets/IMG/AP1/ReadmeAP1.png';
import testAP1 from '../assets/IMG/AP1/testAP1.png';
import dataBaseAP1 from '../assets/IMG/AP1/dataBaseAP1.png';
import deploimAP1 from '../assets/IMG/AP1/deploimAP1.png';

interface Task {
  id: number;
  name: string;
  period: string;
  competences: {
    patrimoine: string;
    incidents: string;
    presenceEnLigne: string;
    modeProjet: string;
    miseADispo: string;
    devPro: string;
    conception: string;
    maintenance: string;
  };
  description: string;
  technologies: string[];
  proofs: {
    title: string;
    type: string;
    content?: string;
  }[];
}

const selectedTask = ref<Task | null>(null);
const showProofs = ref(false);

const tasks: Task[] = [
  {
    id: 1,
    name: "AP1 – Site web assos (backend + frontend + données)",
    period: "Dates à préciser",
    competences: {
      patrimoine: "✓",
      incidents: "△",
      presenceEnLigne: "✓",
      modeProjet: "✓",
      miseADispo: "✓",
      devPro: "△",
      conception: "✓",
      maintenance: "✓"
    },
    description: "Développement complet d'un site web pour une association incluant backend, frontend et gestion de base de données.",
    technologies: ["Backend", "Frontend", "Base de données", "Tests", "Déploiement"],
    proofs: [
      { title: "Front-end", type: "document" },
      { title: "Page d'administration", type: "screen", content: AdminAP1 },
      { title: "Base de données", type: "code", content: dataBaseAP1 },
      { title: "Procédure de déploiement", type: "screen", content: deploimAP1 },
      { title: "Tests d'intégration", type: "code", content: testAP1 },
      { title: "Documentation utilisateur", type: "document", content: ReadmeAP1 },
    ]
  },
  {
    id: 2,
    name: "Stage 1 – Visual Inventory (Django)",
    period: "5 Janvier 2026 - 14 Février 2026",
    competences: {
      patrimoine: "✓",
      incidents: "△",
      presenceEnLigne: "—",
      modeProjet: "✓",
      miseADispo: "✓",
      devPro: "△",
      conception: "✓",
      maintenance: "△"
    },
    description: "Contribution à un projet open source Django pour la gestion d'inventaire. Mise en place de CI/CD et respect des standards de développement.",
    technologies: ["Django", "Python", "Git", "CI/CD", "Open Source"],
    proofs: [
      { title: "Commits Git", type: "code" },
      { title: "Documentation du projet", type: "document" },
      { title: "Issues et corrections", type: "screenshot" }
    ]
  },
  {
    id: 3,
    name: "Stage 1 – Docker (multi-stage)",
    period: "5 Janvier 2026 - 14 Février 2026",
    competences: {
      patrimoine: "✓",
      incidents: "△",
      presenceEnLigne: "—",
      modeProjet: "△",
      miseADispo: "✓",
      devPro: "△",
      conception: "△",
      maintenance: "—"
    },
    description: "Dockerisation de projets avec multi-stage build pour optimiser les images et garantir la reproductibilité des environnements.",
    technologies: ["Docker", "Multi-stage build", "Containerisation"],
    proofs: [
      { title: "Dockerfiles multi-stage", type: "code" },
      { title: "Documentation d'installation", type: "document" },
      { title: "Comparaison taille images", type: "screenshot" }
    ]
  },
  {
    id: 4,
    name: "Stage 1 – Docker-compose Visual Inventory",
    period: "5 Janvier 2026 - 14 Février 2026",
    competences: {
      patrimoine: "✓",
      incidents: "△",
      presenceEnLigne: "—",
      modeProjet: "△",
      miseADispo: "✓",
      devPro: "△",
      conception: "△",
      maintenance: "—"
    },
    description: "Configuration Docker Compose pour orchestrer plusieurs services de Visual Inventory (base de données, application, redis, etc.).",
    technologies: ["Docker Compose", "Orchestration", "Multi-services"],
    proofs: [
      { title: "Fichier docker-compose.yml", type: "code" },
      { title: "Procédures de lancement/arrêt", type: "document" },
      { title: "Architecture des services", type: "diagram" }
    ]
  },
  {
    id: 5,
    name: "Stage 1 – Frontend React TSX (PRV)",
    period: "5 Janvier 2026 - 14 Février 2026",
    competences: {
      patrimoine: "△",
      incidents: "△",
      presenceEnLigne: "△",
      modeProjet: "✓",
      miseADispo: "△",
      devPro: "△",
      conception: "✓",
      maintenance: "△"
    },
    description: "Développement d'une interface frontend moderne en React avec TypeScript pour le projet PRV.",
    technologies: ["React", "TypeScript", "TSX", "Tests d'acceptation"],
    proofs: [
      { title: "Code source React/TSX", type: "code" },
      { title: "Tests d'acceptation", type: "code" },
      { title: "Captures d'écran de l'interface", type: "screenshot" }
    ]
  },
  {
    id: 6,
    name: "Stage 1 – Veille React/JS",
    period: "5 Janvier 2026 - 14 Février 2026",
    competences: {
      patrimoine: "—",
      incidents: "—",
      presenceEnLigne: "—",
      modeProjet: "—",
      miseADispo: "—",
      devPro: "✓",
      conception: "—",
      maintenance: "—"
    },
    description: "Mise en place d'une veille technologique sur React et JavaScript avec synthèse des sources et création d'un environnement d'apprentissage.",
    technologies: ["React", "JavaScript", "Veille technologique"],
    proofs: [
      { title: "Journal de veille", type: "document" },
      { title: "Sources et flux RSS", type: "document" },
      { title: "Synthèses d'articles", type: "document" }
    ]
  },
  {
    id: 7,
    name: "Stage 1 – Gandalf AI (sécu/prompt injection)",
    period: "5 Janvier 2026 - 14 Février 2026",
    competences: {
      patrimoine: "—",
      incidents: "—",
      presenceEnLigne: "—",
      modeProjet: "△",
      miseADispo: "—",
      devPro: "✓",
      conception: "—",
      maintenance: "△"
    },
    description: "Sensibilisation à la sécurité et aux risques de prompt injection dans les systèmes d'IA.",
    technologies: ["IA", "Cybersécurité", "Prompt injection", "Bonnes pratiques"],
    proofs: [
      { title: "Documentation des risques", type: "document" },
      { title: "Exemples d'injections", type: "screenshot" },
      { title: "Bonnes pratiques de sécurité", type: "document" }
    ]
  },
  {
    id: 8,
    name: "Stage 1 – Arduino Snake (LED matrix)",
    period: "5 Janvier 2026 - 14 Février 2026",
    competences: {
      patrimoine: "△",
      incidents: "—",
      presenceEnLigne: "—",
      modeProjet: "✓",
      miseADispo: "△",
      devPro: "△",
      conception: "△",
      maintenance: "—"
    },
    description: "Développement d'un jeu Snake sur matrice LED avec Arduino, incluant la gestion du projet et les tests.",
    technologies: ["Arduino", "C++", "Matrice LED", "Hardware"],
    proofs: [
      { title: "Code Arduino", type: "code" },
      { title: "Schéma électronique", type: "diagram" },
      { title: "Vidéo de démonstration", type: "video" },
      { title: "Documentation matériel", type: "document" }
    ]
  },
  {
    id: 9,
    name: "AP2 – Cash-cash (Java + Next.js)",
    period: "Dates à préciser",
    competences: {
      patrimoine: "✓",
      incidents: "△",
      presenceEnLigne: "△",
      modeProjet: "✓",
      miseADispo: "✓",
      devPro: "△",
      conception: "✓",
      maintenance: "✓"
    },
    description: "Application de gestion financière avec backend Java et frontend Next.js, incluant un système de rôles et d'habilitations.",
    technologies: ["Java", "Next.js", "React", "Gestion de projet", "Authentification"],
    proofs: [
      { title: "Backlog projet", type: "document" },
      { title: "Documentation technique complète", type: "document" },
      { title: "Système d'habilitations", type: "code" },
      { title: "Tests et recette", type: "document" }
    ]
  },
  {
    id: 10,
    name: "Stage 2 – Redesign site web (AP1)",
    period: "Dates à préciser",
    competences: {
      patrimoine: "△",
      incidents: "✓",
      presenceEnLigne: "✓",
      modeProjet: "✓",
      miseADispo: "✓",
      devPro: "△",
      conception: "✓",
      maintenance: "△"
    },
    description: "Refonte complète du site web développé en AP1 avec amélioration du SEO et de la visibilité en ligne.",
    technologies: ["Web design", "SEO", "Référencement", "UX/UI"],
    proofs: [
      { title: "Avant/Après design", type: "screenshot"},
      { title: "Rapport SEO", type: "document" },
      { title: "Mesures de visibilité", type: "screenshot" },
      { title: "Documentation utilisateur", type: "document" }
    ]
  },
  {
    id: 11,
    name: "Stage 2 – App pointage bénévoles (JavaFX)",
    period: "08 Janvier 2026",
    competences: {
      patrimoine: "✓",
      incidents: "✓",
      presenceEnLigne: "△",
      modeProjet: "✓",
      miseADispo: "✓",
      devPro: "△",
      conception: "✓",
      maintenance: "✓"
    },
    description: "Application desktop JavaFX pour la gestion du pointage des bénévoles avec système d'habilitations et sauvegardes automatiques.",
    technologies: ["JavaFX", "Java", "Base de données", "Desktop app", "Sauvegardes"],
    proofs: [
      { title: "Code source JavaFX", type: "code" },
      { title: "Système d'habilitations", type: "code" },
      { title: "Procédure de sauvegarde/restauration", type: "document" },
      { title: "Guide utilisateur", type: "document" }
    ]
  },
  {
    id: 12,
    name: "Stage 2 - App scan OCR/ISBN (Python OpenCV)",
    period: "30 Janvier 2026",
    competences: {
      patrimoine: "△",
      incidents: "△",
      presenceEnLigne: "—",
      modeProjet: "✓",
      miseADispo: "△",
      devPro: "△",
      conception: "✓",
      maintenance: "✓"
    },
    description: "Application de reconnaissance optique de caractères (OCR) pour scanner et identifier les codes ISBN des livres.",
    technologies: ["Python", "OpenCV", "OCR", "Traitement d'image", "API ISBN"],
    proofs: [
      { title: "Code Python/OpenCV", type: "code" },
      { title: "Tests de reconnaissance", type: "screenshot" },
      { title: "Gestion base de données ISBN", type: "code" },
      { title: "Documentation technique", type: "document" }
    ]
  }
];

const openModal = (task: Task) => {
  selectedTask.value = task;
  showProofs.value = false;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  selectedTask.value = null;
  showProofs.value = false;
  document.body.style.overflow = 'auto';
};

const toggleProofs = () => {
  showProofs.value = !showProofs.value;
};

const getCompetenceIcon = (value: string) => {
  if (value === '✓') return { icon: '✓', class: 'full' };
  if (value === '△') return { icon: '△', class: 'partial' };
  return { icon: '—', class: 'none' };
};
</script>

<template>
  <div class="realisation-container">
    <h2>Réalisations</h2>
    <p class="intro">Tableau de compétences BTS SIO SLAM</p>

    <div class="legend">
      <span class="legend-item"><span class="icon full">✓</span> Couvre bien</span>
      <span class="legend-item"><span class="icon partial">△</span> Couvre partiellement</span>
      <span class="legend-item"><span class="icon none">—</span> Ne couvre pas</span>
    </div>

    <div class="table-wrapper">
      <table class="competence-table">
        <thead>
          <tr>
            <th class="task-column">Tâche / Réalisation</th>
            <th colspan="6" class="bloc-header">Bloc 1 - Commun</th>
            <th colspan="2" class="bloc-header">Bloc 2 - SLAM</th>
          </tr>
          <tr>
            <th></th>
            <th class="competence-header">Gérer patrimoine</th>
            <th class="competence-header">Incidents / demandes</th>
            <th class="competence-header">Présence en ligne</th>
            <th class="competence-header">Mode projet</th>
            <th class="competence-header">Mise à dispo</th>
            <th class="competence-header">Dév. pro</th>
            <th class="competence-header">Conception / dév</th>
            <th class="competence-header">Maintenance / données</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id" @click="openModal(task)" class="task-row">
            <td class="task-name">{{ task.name }}</td>
            <td :class="['competence-cell', getCompetenceIcon(task.competences.patrimoine).class]">
              {{ getCompetenceIcon(task.competences.patrimoine).icon }}
            </td>
            <td :class="['competence-cell', getCompetenceIcon(task.competences.incidents).class]">
              {{ getCompetenceIcon(task.competences.incidents).icon }}
            </td>
            <td :class="['competence-cell', getCompetenceIcon(task.competences.presenceEnLigne).class]">
              {{ getCompetenceIcon(task.competences.presenceEnLigne).icon }}
            </td>
            <td :class="['competence-cell', getCompetenceIcon(task.competences.modeProjet).class]">
              {{ getCompetenceIcon(task.competences.modeProjet).icon }}
            </td>
            <td :class="['competence-cell', getCompetenceIcon(task.competences.miseADispo).class]">
              {{ getCompetenceIcon(task.competences.miseADispo).icon }}
            </td>
            <td :class="['competence-cell', getCompetenceIcon(task.competences.devPro).class]">
              {{ getCompetenceIcon(task.competences.devPro).icon }}
            </td>
            <td :class="['competence-cell', getCompetenceIcon(task.competences.conception).class]">
              {{ getCompetenceIcon(task.competences.conception).icon }}
            </td>
            <td :class="['competence-cell', getCompetenceIcon(task.competences.maintenance).class]">
              {{ getCompetenceIcon(task.competences.maintenance).icon }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <Transition name="modal">
      <div v-if="selectedTask" class="modal-overlay" @click="closeModal">
        <div class="modal-container" @click.stop>
          <button class="modal-close" @click="closeModal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <article class="modal-content">
            <div class="modal-header">
              <h1 class="task-title">{{ selectedTask.name }}</h1>
              <div class="task-period">{{ selectedTask.period }}</div>
            </div>

            <section class="section">
              <h3>Description</h3>
              <p>{{ selectedTask.description }}</p>
            </section>

            <section class="section">
              <h3>Technologies utilisées</h3>
              <div class="tech-tags">
                <span v-for="(tech, index) in selectedTask.technologies" :key="index" class="tech-tag">
                  {{ tech }}
                </span>
              </div>
            </section>

            <section class="section">
              <h3>Couverture des compétences</h3>
              <div class="competences-grid">
                <div class="competence-item">
                  <span class="competence-label">Gérer patrimoine</span>
                  <span :class="['competence-value', getCompetenceIcon(selectedTask.competences.patrimoine).class]">
                    {{ getCompetenceIcon(selectedTask.competences.patrimoine).icon }}
                  </span>
                </div>
                <div class="competence-item">
                  <span class="competence-label">Incidents / demandes</span>
                  <span :class="['competence-value', getCompetenceIcon(selectedTask.competences.incidents).class]">
                    {{ getCompetenceIcon(selectedTask.competences.incidents).icon }}
                  </span>
                </div>
                <div class="competence-item">
                  <span class="competence-label">Présence en ligne</span>
                  <span :class="['competence-value', getCompetenceIcon(selectedTask.competences.presenceEnLigne).class]">
                    {{ getCompetenceIcon(selectedTask.competences.presenceEnLigne).icon }}
                  </span>
                </div>
                <div class="competence-item">
                  <span class="competence-label">Mode projet</span>
                  <span :class="['competence-value', getCompetenceIcon(selectedTask.competences.modeProjet).class]">
                    {{ getCompetenceIcon(selectedTask.competences.modeProjet).icon }}
                  </span>
                </div>
                <div class="competence-item">
                  <span class="competence-label">Mise à disposition</span>
                  <span :class="['competence-value', getCompetenceIcon(selectedTask.competences.miseADispo).class]">
                    {{ getCompetenceIcon(selectedTask.competences.miseADispo).icon }}
                  </span>
                </div>
                <div class="competence-item">
                  <span class="competence-label">Développement pro</span>
                  <span :class="['competence-value', getCompetenceIcon(selectedTask.competences.devPro).class]">
                    {{ getCompetenceIcon(selectedTask.competences.devPro).icon }}
                  </span>
                </div>
                <div class="competence-item">
                  <span class="competence-label">Conception / développement</span>
                  <span :class="['competence-value', getCompetenceIcon(selectedTask.competences.conception).class]">
                    {{ getCompetenceIcon(selectedTask.competences.conception).icon }}
                  </span>
                </div>
                <div class="competence-item">
                  <span class="competence-label">Maintenance / données</span>
                  <span :class="['competence-value', getCompetenceIcon(selectedTask.competences.maintenance).class]">
                    {{ getCompetenceIcon(selectedTask.competences.maintenance).icon }}
                  </span>
                </div>
              </div>
            </section>

            <section class="section proofs-section">
              <button @click="toggleProofs" class="proofs-toggle">
                <span>{{ showProofs ? 'Masquer les preuves' : 'Voir les preuves' }}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :class="{ rotated: showProofs }">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

              <Transition name="slide">
                <div v-if="showProofs" class="proofs-list">
                  <div v-for="(proof, index) in selectedTask.proofs" :key="index" class="proof-item">
                    <div class="proof-icon">
                      <svg v-if="proof.type === 'document'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                      <svg v-else-if="proof.type === 'code'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                      </svg>
                      <svg v-else-if="proof.type === 'screenshot' || proof.type === 'screen'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                      </svg>
                      <svg v-else-if="proof.type === 'diagram'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                      </svg>
                      <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="23 7 16 12 23 17 23 7"></polygon>
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                      </svg>
                    </div>
                    <div class="proof-content">
                      <div class="proof-title">{{ proof.title }}</div>
                      <div class="proof-type">{{ proof.type }}</div>
                      <div v-if="proof.content" class="proof-image">
                        <img :src="proof.content" :alt="proof.title" />
                      </div>
                      <div v-else class="proof-placeholder">Preuve à ajouter</div>
                    </div>
                  </div>
                </div>
              </Transition>
            </section>
          </article>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.realisation-container {
  max-width: auto;
  margin: 0 auto;
  padding: 1rem;
}

h2 {
  margin-left: 4rem;
  font-size: 3em;
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-family: "Helvetica", serif;
}

.intro {
  margin-left: 4rem;
  font-size: 1.2em;
  font-weight: 300;
  color: #666;
  margin-bottom: 2rem;
}

.legend {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f8f8f8;
  border-left: 4px solid #000;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9em;
}

.legend .icon {
  font-weight: 700;
  font-size: 1.2em;
}

.table-wrapper {
  overflow-x: auto;
  margin-bottom: 3rem;
  border: 1px solid #b9b9b9;
}

.competence-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  font-size: 0.9em;
}

.competence-table thead {
  background: #000;
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
}

.competence-table th {
  padding: 1rem 0.75rem;
  text-align: left;
  font-weight: 600;
  border: 1px solid #333;
}

.bloc-header {
  text-align: center;
  font-size: 1.1em;
  background: #111111;
}

.task-column {
  min-width: 300px;
  position: sticky;
  left: 0;
  background: #000;
  z-index: 11;
}

.competence-header {
  font-size: 0.85em;
  min-width: 100px;
  text-align: center;
}

.task-row {
  cursor: pointer;
  transition: background 0.2s;
}

.task-row:hover {
  background: #f8f8f8;
}

.task-row:nth-child(even) {
  background: #fafafa;
}

.task-row:nth-child(even):hover {
  background: #f0f0f0;
}

.task-name {
  padding: 1rem;
  font-weight: 500;
  border: 1px solid #ddd;
  position: sticky;
  left: 0;
  background: inherit;
}

.competence-cell {
  padding: 1rem;
  text-align: center;
  border: 1px solid #ddd;
  font-weight: 700;
  font-size: 1.2em;
}

.competence-cell.full {
  color: #22c55e;
  background: #f0fdf4;
}

.competence-cell.partial {
  color: #f59e0b;
  background: #fffbeb;
}

.competence-cell.none {
  color: #9ca3af;
  background: #f9fafb;
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
  padding-bottom: 1.5rem;
  margin-bottom: 2rem;
}

.task-title {
  font-size: 2em;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 1rem 0;
  font-family: "Helvetica", sans-serif;
}

.task-period {
  font-size: 0.9em;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.section {
  margin: 2.5rem 0;
}

.section h3 {
  font-size: 1.5em;
  font-weight: 700;
  margin-bottom: 1rem;
  font-family: "Helvetica", sans-serif;
}

.section p {
  font-size: 1.1em;
  line-height: 1.7;
  color: #333;
  margin: 0;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tech-tag {
  background: #000;
  color: #fff;
  padding: 0.5rem 1rem;
  font-size: 0.85em;
  font-weight: 500;
  border-radius: 4px;
}

.competences-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.competence-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.competence-label {
  font-size: 0.9em;
  color: #333;
}

.competence-value {
  font-size: 1.5em;
  font-weight: 700;
}

.competence-value.full {
  color: #22c55e;
}

.competence-value.partial {
  color: #f59e0b;
}

.competence-value.none {
  color: #9ca3af;
}

.proofs-section {
  border-top: 2px solid #e0e0e0;
  padding-top: 2rem;
}

.proofs-toggle {
  all: unset;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 1rem 1.5rem;
  background: #000;
  color: #fff;
  font-weight: 600;
  transition: background 0.2s;
  width: 100%;
  justify-content: space-between;
}

.proofs-toggle:hover {
  background: #333;
}

.proofs-toggle svg {
  transition: transform 0.3s;
}

.proofs-toggle svg.rotated {
  transform: rotate(180deg);
}

.proofs-list {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.proof-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background: #fafafa;
}

.proof-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.proof-content {
  flex: 1;
}

.proof-title {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.proof-type {
  font-size: 0.85em;
  color: #666;
  text-transform: capitalize;
  margin-bottom: 0.5rem;
}

.proof-image {
  margin-top: 0.5rem;
}

.proof-image img {
  max-width: 100%;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.proof-placeholder {
  font-size: 0.9em;
  color: #999;
  font-style: italic;
  padding: 0.5rem;
  background: #fff;
  border: 1px dashed #ddd;
  border-radius: 4px;
}

/* Transitions */
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

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive */
@media (max-width: 768px) {
  .realisation-container {
    padding: 1rem;
  }

  h2 {
    font-size: 2em;
  }

  .legend {
    flex-direction: column;
    gap: 0.5rem;
  }

  .competence-table {
    font-size: 0.75em;
  }

  .task-column {
    min-width: 200px;
  }

  .competence-header {
    min-width: 80px;
    font-size: 0.75em;
  }

  .modal-content {
    padding: 2rem 1.5rem;
  }

  .task-title {
    font-size: 1.5em;
  }

  .competences-grid {
    grid-template-columns: 1fr;
  }
}
</style>