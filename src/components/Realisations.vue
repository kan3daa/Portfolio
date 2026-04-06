<script setup lang="ts">
import { ref } from 'vue';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

type CompLevel = '✓' | '△' | '—';

interface SubCompetence {
  label: string;
  level: CompLevel;
  indicator: string;
  proofSuggestion: string;
}

interface CompetenceDetail {
  id: keyof Task['competences'];
  name: string;
  level: CompLevel;
  subCompetences: SubCompetence[];
}

interface Proof {
  title: string;
  type: 'document' | 'code' | 'screen' | 'screenshot' | 'diagram' | 'video';
  content?: string;
  linkedCompetence?: string;
  linkedCompetences?: string[];
}

interface Task {
  id: number;
  name: string;
  period: string;
  competences: {
    patrimoine: CompLevel;
    incidents: CompLevel;
    presenceEnLigne: CompLevel;
    modeProjet: CompLevel;
    miseADispo: CompLevel;
    devPro: CompLevel;
  };
  competenceDetails: CompetenceDetail[];
  description: string;
  technologies: string[];
  proofs: Proof[];
}

const uploadedUrls = ref<Record<string, string[]>>(
  JSON.parse(localStorage.getItem('proofUrls') ?? '{}')
);
const uploadingKey = ref<string | null>(null);
const lightboxUrl = ref<string | null>(null);
const editMode = ref(false);


const getProofKey = (taskId: number, proofIndex: number) =>
  `task_${taskId}_proof_${proofIndex}`;

const getProofFiles = (taskId: number, proofIndex: number): string[] => {
  const key = getProofKey(taskId, proofIndex);
  return uploadedUrls.value[key] ?? [];
};

const isImage = (url: string) => /\.(png|jpe?g|gif|webp|svg)$/i.test(url);
const openLightbox = (url: string) => { lightboxUrl.value = url; };
const closeLightbox = () => { lightboxUrl.value = null; };

const handleImageUpload = async (taskId: number, proofIndex: number, event: Event) => {
  const input = event.target as HTMLInputElement;
  const files = Array.from(input.files ?? []);
  if (!files.length) return;
  const key = getProofKey(taskId, proofIndex);
  uploadingKey.value = key;
  const urls: string[] = [...(uploadedUrls.value[key] ?? [])];
  for (const file of files) {
    const ext = file.name.split('.').pop();
    const path = `${key}_${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from('proofs').upload(path, file, { upsert: true });
    if (error) { console.error(error.message); continue; }
    const { data } = supabase.storage.from('proofs').getPublicUrl(path);
    urls.push(data.publicUrl);
  }
  uploadedUrls.value[key] = urls;
  localStorage.setItem('proofUrls', JSON.stringify(uploadedUrls.value));
  uploadingKey.value = null;
};

const handleDrop = async (taskId: number, proofIndex: number, event: DragEvent) => {
  const files = Array.from(event.dataTransfer?.files ?? []);
  if (!files.length) return;
  const key = getProofKey(taskId, proofIndex);
  uploadingKey.value = key;
  const urls: string[] = [...(uploadedUrls.value[key] ?? [])];
  for (const file of files) {
    const ext = file.name.split('.').pop();
    const path = `${key}_${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from('proofs').upload(path, file, { upsert: true });
    if (error) { console.error(error.message); continue; }
    const { data } = supabase.storage.from('proofs').getPublicUrl(path);
    urls.push(data.publicUrl);
  }
  uploadedUrls.value[key] = urls;
  localStorage.setItem('proofUrls', JSON.stringify(uploadedUrls.value));
  uploadingKey.value = null;
};

const removeProofFile = async (taskId: number, proofIndex: number, fileUrl: string) => {
  const key = getProofKey(taskId, proofIndex);
  const path = fileUrl.split('/proofs/')[1];
  await supabase.storage.from('proofs').remove([path]);
  uploadedUrls.value[key] = (uploadedUrls.value[key] ?? []).filter(u => u !== fileUrl);
  localStorage.setItem('proofUrls', JSON.stringify(uploadedUrls.value));
};

const loadUrlsFromSupabase = async () => {
  const { data, error } = await supabase.storage.from('proofs').list('', { limit: 1000 });
  if (error) { console.error('Erreur lors du chargement des fichiers Supabase :', error.message); return; }
  if (!data || data.length === 0) return;
  const rebuilt: Record<string, string[]> = {};
  for (const file of data) {
    const match = file.name.match(/^(task_\d+_proof_\d+)_/);
    if (!match) continue;
    const key = match[1];
    const { data: urlData } = supabase.storage.from('proofs').getPublicUrl(file.name);
    if (!rebuilt[key]) rebuilt[key] = [];
    rebuilt[key].push(urlData.publicUrl);
  }
  uploadedUrls.value = rebuilt;
  localStorage.setItem('proofUrls', JSON.stringify(rebuilt));
};

loadUrlsFromSupabase();

const tasks: Task[] = [
  {
    id: 1,
    name: "AP1 – Site web assos (backend + frontend + données)",
    period: "2024 - 2025",
    competences: {
      patrimoine: "✓", incidents: "✓", presenceEnLigne: "✓",
      modeProjet: "✓", miseADispo: "✓", devPro: "✓",
    },
    description: "Développement complet d'un site web pour une association incluant backend, frontend et gestion de base de données.",
    technologies: ["Next.js", "React", "Node.js / Backend", "MySQL", "Tests d'intégration", "Déploiement"],
    competenceDetails: [
      {
        id: "patrimoine",
        name: "Gérer le patrimoine informatique",
        level: "✓",
        subCompetences: [
          { label: "Recenser et identifier les ressources numériques", level: "✓", indicator: "Le recensement est exhaustif via un outil de gestion des actifs", proofSuggestion: "Schéma d'architecture / inventaire des ressources (serveur, BDD, dépôt Git)" },
          { label: "Mettre en place et vérifier les niveaux d'habilitation associés à un service", level: "✓", indicator: "Les droits correspondent aux habilitations des acteurs", proofSuggestion: "Capture de la page d'administration avec les rôles utilisateurs" },
          { label: "Vérifier les conditions de la continuité d'un service informatique", level: "✓", indicator: "Conditions de continuité vérifiées", proofSuggestion: "Documentation de déploiement / procédure de reprise" },
          { label: "Gérer des sauvegardes", level: "✓", indicator: "Sauvegardes réalisées, restaurations testées", proofSuggestion: "Script de sauvegarde BDD ou procédure documentée" },
          { label: "Vérifier le respect des règles d'utilisation des ressources numériques", level: "✓", indicator: "Écarts détectés et signalés", proofSuggestion: "README avec contraintes d'utilisation du projet" }
        ]
      },
      {
        id: "incidents",
        name: "Répondre aux incidents et demandes",
        level: "✓",
        subCompetences: [
          { label: "Collecter, suivre et orienter des demandes", level: "✓", indicator: "Demandes collectées et suivies", proofSuggestion: "Compte rendu de réunion avec liste des demandes traitées" },
          { label: "Traiter des demandes concernant les applications", level: "✓", indicator: "Solution trouvée et mise en oeuvre", proofSuggestion: "Liste des correctifs apportés suite aux retours utilisateurs" }
        ]
      },
      {
        id: "presenceEnLigne",
        name: "Développer la présence en ligne",
        level: "✓",
        subCompetences: [
          { label: "Participer à la valorisation de l'image de l'organisation sur les médias numériques en tenant compte du cadre juridique et des enjeux économiques", level: "✓", indicator: "Image conforme aux attentes, enjeux économiques identifiés", proofSuggestion: "Screenshots du site public, charte graphique" },
          { label: "Participer à l'évolution d'un site Web exploitant les données de l'organisation", level: "✓", indicator: "Site évolué conformément au besoin", proofSuggestion: "Historique Git / changelog / comparaison avant-après" }
        ]
      },
      {
        id: "modeProjet",
        name: "Travailler en mode projet",
        level: "✓",
        subCompetences: [
          { label: "Analyser les objectifs et les modalités d'organisation d'un projet", level: "✓", indicator: "Objectifs et modalités explicités", proofSuggestion: "Cahier des charges ou spécifications fonctionnelles + diagramme UML acteurs/cas d'utilisation" },
          { label: "Planifier les activités", level: "✓", indicator: "Activités planifiées selon une méthodologie, découpage réaliste", proofSuggestion: "Calendrier effectif détaillé avec jalons, livrables et dates réelles" },
          { label: "Évaluer les indicateurs de suivi d'un projet et analyser les écarts", level: "✓", indicator: "Compte rendu clair, écarts justifiés", proofSuggestion: "Compte rendu de réunion ou bilan de projet" }
        ]
      },
      {
        id: "miseADispo",
        name: "Mettre à disposition un service informatique",
        level: "✓",
        subCompetences: [
          { label: "Réaliser les tests d'intégration et d'acceptation d'un service", level: "✓", indicator: "Tests pertinents rédigés et effectués, rapport produit", proofSuggestion: "Rapport de tests d'intégration avec résultats" },
          { label: "Déployer un service", level: "✓", indicator: "Service déployé opérationnel", proofSuggestion: "Procédure de déploiement documentée, URL du site live" },
          { label: "Accompagner les utilisateurs dans la mise en place d'un service", level: "✓", indicator: "Support disponible, modalités d'accompagnement définies", proofSuggestion: "Guide utilisateur / README accessible aux membres de l'association" }
        ]
      },
      {
        id: "devPro",
        name: "Organiser son développement professionnel",
        level: "✓",
        subCompetences: [
          { label: "Mettre en place son environnement d'apprentissage personnel", level: "✓", indicator: "Ressources identifiées et exploitées pour monter en compétence sur React", proofSuggestion: "Liste des outils de veille utilisés (MDN, React.dev, Dev.to, Node Weekly, JS Weekly)" },
          { label: "Mettre en œuvre des outils et stratégies de veille informationnelle", level: "✓", indicator: "Veille active sur React/JS pendant le développement", proofSuggestion: "Journal de veille React/JS avec sources consultées pendant AP1" },
          { label: "Développer son projet professionnel", level: "✓", indicator: "Utilisation de React dans le projet AP1 (composants, hooks, intégration frontend)", proofSuggestion: "Extraits de code React utilisés dans le projet – composants, useState, appels API" },
          { label: "Gérer son identité professionnelle", level: "✓", indicator: "Présence en ligne professionnelle structurée autour du projet AP1", proofSuggestion: "Portfolio en ligne ou profil GitHub avec le projet AP1 documenté et visible" }
        ]
      }
    ],
    proofs: [
      { title: "Diagramme de cas d'utilisation (UML)", type: "diagram", linkedCompetence: "Analyser les objectifs et les modalités d'organisation d'un projet" },
      { title: "Page d'administration (rôles et habilitations)", type: "screen", linkedCompetence: "Mettre en place et vérifier les niveaux d'habilitation associés à un service" },
      { title: "Schéma base de données (MCD/MPD)", type: "code", linkedCompetence: "Recenser et identifier les ressources numériques" },
      { title: "Screenshots du site public (frontend)", type: "screen", linkedCompetence: "Participer à la valorisation de l'image de l'organisation sur les médias numériques en tenant compte du cadre juridique et des enjeux économiques" },
      { title: "Cahier des charges / spécifications fonctionnelles", type: "document", linkedCompetence: "Analyser les objectifs et les modalités d'organisation d'un projet" },
      { title: "Rapport de tests d'intégration", type: "document", linkedCompetence: "Réaliser les tests d'intégration et d'acceptation d'un service" },
      { title: "Procédure de déploiement documentée + URL du site live", type: "screen", linkedCompetence: "Déployer un service" },
      { title: "Guide utilisateur / README association", type: "document", linkedCompetence: "Accompagner les utilisateurs dans la mise en place d'un service" },
      { title: "Proposition technique – infrastructure et coûts (VPS, hébergement, domaine)", type: "document", linkedCompetence: "Recenser et identifier les ressources numériques" },
      { title: "Calendrier effectif détaillé", type: "document", linkedCompetence: "Planifier les activités" },
      { title: "Documentation de déploiement / procédure de reprise", type: "document", linkedCompetence: "Vérifier les conditions de la continuité d'un service informatique" },
      { title: "Script de sauvegarde BDD", type: "code", linkedCompetence: "Gérer des sauvegardes" },
      { title: "Historique Git / comparaison avant-après", type: "screenshot", linkedCompetence: "Participer à l'évolution d'un site Web exploitant les données de l'organisation" },
      { title: "Compte rendu de réunion ou bilan de projet", type: "document", linkedCompetence: "Évaluer les indicateurs de suivi d'un projet et analyser les écarts" },
      { title: "Liste des correctifs apportés suite aux retours utilisateurs", type: "document", linkedCompetence: "Traiter des demandes concernant les applications" },
      { title: "Liste des outils de veille utilisés (MDN, React.dev, Dev.to, newsletters)", type: "document", linkedCompetence: "Mettre en place son environnement d'apprentissage personnel" },
      { title: "Extraits de code React – composants et hooks utilisés dans AP1", type: "code", linkedCompetence: "Développer son projet professionnel" },
      { title: "Portfolio / profil GitHub avec AP1 documenté", type: "screenshot", linkedCompetence: "Gérer son identité professionnelle" },
    ]
  },
  {
    id: 2,
    name: "Stage 1 – Visual Inventory (Django)",
    period: "5 Janvier 2026 - 14 Février 2026",
    competences: {
      patrimoine: "✓", incidents: "✓", presenceEnLigne: "—",
      modeProjet: "✓", miseADispo: "✓", devPro: "✓",
    },
    description: "Contribution à un projet open source Django pour la gestion d'inventaire. Dockerisation de Visual Inventory via Docker et Docker Compose, après auto-formation sur la documentation officielle et des projets d'entraînement.",
    technologies: ["Django", "Typescript", "Git", "Docker", "Docker Compose", "Open Source"],
    competenceDetails: [
      {
        id: "patrimoine",
        name: "Gérer le patrimoine informatique",
        level: "✓",
        subCompetences: [
          { label: "Exploiter des référentiels, normes et standards adoptés par le prestataire informatique", level: "✓", indicator: "Référentiels mobilisés de façon pertinente", proofSuggestion: "Respect des conventions de code du projet open source (CONTRIBUTING.md, PEP8)" },
          { label: "Recenser et identifier les ressources numériques", level: "✓", indicator: "Recensement exhaustif", proofSuggestion: "Schéma d'architecture du projet / README du dépôt" }
        ]
      },
      {
        id: "incidents",
        name: "Répondre aux incidents et demandes",
        level: "✓",
        subCompetences: [
          { label: "Collecter, suivre et orienter des demandes", level: "✓", indicator: "Demandes prises en compte, diagnostiquées", proofSuggestion: "Captures des Issues GitHub ouvertes/fermées par toi" },
          { label: "Traiter des demandes concernant les applications", level: "✓", indicator: "Solution trouvée et mise en oeuvre", proofSuggestion: "Pull Requests avec description du correctif apporté" }
        ]
      },
      {
        id: "modeProjet",
        name: "Travailler en mode projet",
        level: "✓",
        subCompetences: [
          { label: "Analyser les objectifs et les modalités d'organisation d'un projet", level: "✓", indicator: "Objectifs explicités", proofSuggestion: "Description des tickets / user stories traités" },
          { label: "Planifier les activités", level: "✓", indicator: "Activités planifiées, ressources mobilisées", proofSuggestion: "Board GitHub Projects / kanban pendant le stage" }
        ]
      },
      {
        id: "miseADispo",
        name: "Mettre à disposition un service informatique",
        level: "✓",
        subCompetences: [
          { label: "Déployer un service", level: "✓", indicator: "Service déployé opérationnel", proofSuggestion: "Screenshot du déploiement Docker / Docker Compose" },
        ]
      },
      {
        id: "devPro",
        name: "Organiser son développement professionnel",
        level: "✓",
        subCompetences: [
          { label: "Mettre en place son environnement d'apprentissage personnel", level: "✓", indicator: "Démarche d'auto-formation structurée avant application sur projet réel", proofSuggestion: "Notes de lecture de la documentation Docker et Docker Compose officielle, liste des ressources consultées" },
          { label: "Développer son projet professionnel", level: "✓", indicator: "Compétences acquises sur Docker/Compose et appliquées au projet Visual Inventory", proofSuggestion: "Projets d'entraînement Docker réalisés avant le stage, puis intégration au projet open source" },
          { label: "Mettre en œuvre des outils et stratégies de veille informationnelle", level: "✓", indicator: "Sources techniques identifiées et exploitées", proofSuggestion: "Références consultées : documentation officielle Docker, guides DevOps, CONTRIBUTING.md du projet" },
          { label: "Gérer son identité professionnelle", level: "✓", indicator: "Contribution open source visible et référencée publiquement", proofSuggestion: "Profil GitHub avec contributions au dépôt Visual Inventory (commits, PR fusionnées)" }
        ]
      }
    ],
    proofs: [
      { title: "Commits Git sur le dépôt open source", type: "screenshot", linkedCompetence: "Exploiter des référentiels, normes et standards adoptés par le prestataire informatique" },
      { title: "README / schéma d'architecture du dépôt", type: "document", linkedCompetence: "Recenser et identifier les ressources numériques" },
      { title: "Issues GitHub ouvertes/fermées", type: "screenshot", linkedCompetence: "Collecter, suivre et orienter des demandes" },
      { title: "Pull Requests avec description du correctif", type: "screenshot", linkedCompetence: "Traiter des demandes concernant les applications" },
      { title: "Description des tickets / user stories traités", type: "document", linkedCompetence: "Analyser les objectifs et les modalités d'organisation d'un projet" },
      { title: "Board GitHub Projects / kanban du stage", type: "screenshot", linkedCompetence: "Planifier les activités" },
      { title: "Dockerfile annoté et docker-compose.yml documenté", type: "code", linkedCompetence: "Déployer un service" },
      { title: "Notes d'apprentissage Docker et ressources consultées", type: "document", linkedCompetence: "Mettre en place son environnement d'apprentissage personnel" },
      { title: "Projets d'entraînement Docker réalisés", type: "screenshot", linkedCompetence: "Développer son projet professionnel" },
      { title: "Liste des références de veille (docs Docker, guides DevOps)", type: "document", linkedCompetence: "Mettre en œuvre des outils et stratégies de veille informationnelle" },
      { title: "Profil GitHub – contributions au dépôt Visual Inventory", type: "screenshot", linkedCompetence: "Gérer son identité professionnelle" },
    ]
  },
  {
    id: 7,
    name: "Stage 1 – Gandalf AI (sécu/prompt injection)",
    period: "5 Janvier 2026 - 14 Février 2026",
    competences: {
      patrimoine: "—", incidents: "—", presenceEnLigne: "—",
      modeProjet: "—", miseADispo: "—", devPro: "✓",
    },
    description: "Sensibilisation à la sécurité et aux risques de prompt injection dans les systèmes d'IA.",
    technologies: ["IA", "Cybersécurité", "Prompt injection", "Bonnes pratiques"],
    competenceDetails: [
      {
        id: "devPro",
        name: "Organiser son développement professionnel",
        level: "✓",
        subCompetences: [
          { label: "Mettre en œuvre des outils et stratégies de veille informationnelle", level: "✓", indicator: "Veille sur techniques émergentes", proofSuggestion: "Document de synthèse sur les risques IA / prompt injection avec sources OWASP LLM Top 10" },
          { label: "Développer son projet professionnel", level: "✓", indicator: "Compétences renforcées sur la sécurité IA", proofSuggestion: "Screenshots des niveaux Gandalf réussis, analyse des méthodes utilisées" },
          { label: "Gérer son identité professionnelle", level: "✓", indicator: "Démarche de veille sécurité IA documentée et partageable", proofSuggestion: "Article ou note de veille publiée sur GitHub/portfolio sur les risques prompt injection" }
        ]
      }
    ],
    proofs: [
      { title: "Synthèse des risques prompt injection (OWASP LLM Top 10)", type: "document", linkedCompetence: "Mettre en œuvre des outils et stratégies de veille informationnelle" },
      { title: "Screenshots des niveaux Gandalf réussis", type: "screenshot", linkedCompetence: "Développer son projet professionnel" },
      { title: "Analyse des méthodes utilisées pour contourner les filtres IA", type: "document", linkedCompetence: "Développer son projet professionnel" },
      { title: "Note de veille sécurité IA publiée sur GitHub/portfolio", type: "document", linkedCompetence: "Gérer son identité professionnelle" },
    ]
  },
  {
      id: 9,
      name: "AP2 – Cash-cash (Next.js + PostgreSQL)",
      period: "2025 - 2026",
      competences: {
        patrimoine: "✓", incidents: "✓", presenceEnLigne: "—",
        modeProjet: "✓", miseADispo: "✓", devPro: "✓",
      },
      description: "Développement en équipe de 3 d'une application web de gestion des interventions pour la société CashCash (vendeur de terminaux point de vente). Rôles : gérant d'agence (back office) et technicien (front office). Authentification sécurisée, base de données PostgreSQL administrée via pgAdmin, modélisation préalable par MCD.",
      technologies: ["Next.js", "React", "PostgreSQL", "pgAdmin", "MCD", "Cycle en V / SCRUM"],
      competenceDetails: [
        {
          id: "patrimoine",
          name: "Gérer le patrimoine informatique",
          level: "✓",
          subCompetences: [
            { label: "Mettre en place et vérifier les niveaux d'habilitation associés à un service", level: "✓", indicator: "Rôles gérant d'agence / technicien distincts avec droits différenciés", proofSuggestion: "Capture du système d'authentification + code de gestion des permissions" },
            { label: "Gérer des sauvegardes", level: "✓", indicator: "Sauvegardes réalisées via pgAdmin, restaurations testées", proofSuggestion: "Procédure de sauvegarde/restauration PostgreSQL via pgAdmin" }
          ]
        },
        {
          id: "incidents",
          name: "Répondre aux incidents et demandes",
          level: "✓",
          subCompetences: [
            { label: "Collecter, suivre et orienter des demandes", level: "✓", indicator: "Demandes collectées et suivies en équipe", proofSuggestion: "Board de suivi des tâches avec tickets traités (GitHub Projects ou équivalent)" },
            { label: "Traiter des demandes concernant les applications", level: "✓", indicator: "Correctifs apportés suite aux retours de tests", proofSuggestion: "Liste des bugs corrigés avec description des correctifs apportés" }
          ]
        },
        {
          id: "modeProjet",
          name: "Travailler en mode projet",
          level: "✓",
          subCompetences: [
            { label: "Analyser les objectifs et les modalités d'organisation d'un projet", level: "✓", indicator: "Objectifs et modalités explicités + diagramme UML", proofSuggestion: "Diagramme de cas d'utilisation UML gérant/technicien + MCD de la base de données" },
            { label: "Planifier les activités", level: "✓", indicator: "Planning prévisionnel avec jalons respectés", proofSuggestion: "Planning SCRUM ou Gantt du projet" },
            { label: "Évaluer les indicateurs de suivi d'un projet et analyser les écarts", level: "✓", indicator: "Écarts constatés et justifiés", proofSuggestion: "Bilan de projet avec analyse des écarts" }
          ]
        },
        {
          id: "miseADispo",
          name: "Mettre à disposition un service informatique",
          level: "✓",
          subCompetences: [
            { label: "Réaliser les tests d'intégration et d'acceptation d'un service", level: "✓", indicator: "Rapport de tests rédigé et effectué", proofSuggestion: "Rapport de recette / fichier de tests fonctionnels" },
            { label: "Déployer un service", level: "✓", indicator: "Application web déployée et opérationnelle", proofSuggestion: "Procédure de déploiment" },
            { label: "Accompagner les utilisateurs dans la mise en place d'un service", level: "✓", indicator: "Documentation disponible pour gérants et techniciens", proofSuggestion: "Guide utilisateur gérant d'agence et technicien" }
          ]
        },
        {
          id: "devPro",
          name: "Organiser son développement professionnel",
          level: "✓",
          subCompetences: [
            { label: "Mettre en place son environnement d'apprentissage personnel", level: "✓", indicator: "Ressources identifiées pour Next.js et PostgreSQL", proofSuggestion: "Liste des ressources consultées (docs officielles Next.js, PostgreSQL)" },
            { label: "Mettre en œuvre des outils et stratégies de veille informationnelle", level: "✓", indicator: "Veille formalisée et partagée en équipe", proofSuggestion: "Comparatif solutions collaboratives retenu par l'équipe avec choix argumenté" },
            { label: "Développer son projet professionnel", level: "✓", indicator: "PostgreSQL et Next.js découverts et appliquées au projet", proofSuggestion: "Extraits de code Next.js + requêtes PostgreSQL réalisées dans le projet" },
            { label: "Gérer son identité professionnelle", level: "✓", indicator: "Projet CashCash valorisé dans le portfolio", proofSuggestion: "Fiche projet CashCash dans le portfolio avec captures et description du rôle tenu" }
          ]
        }
      ],
      proofs: [
        { title: "MCD de la base de données CashCash", type: "diagram", linkedCompetence: "Analyser les objectifs et les modalités d'organisation d'un projet" },
        { title: "Diagramme de cas d'utilisation UML (gérant / technicien)", type: "diagram", linkedCompetence: "Analyser les objectifs et les modalités d'organisation d'un projet" },
        { title: "Script SQL de création de la base PostgreSQL", type: "code", linkedCompetence: "Analyser les objectifs et les modalités d'organisation d'un projet" },
        { title: "Système d'authentification – captures rôles gérant/technicien", type: "screenshot", linkedCompetence: "Mettre en place et vérifier les niveaux d'habilitation associés à un service" },
        { title: "Procédure de sauvegarde/restauration PostgreSQL via pgAdmin", type: "document", linkedCompetence: "Gérer des sauvegardes" },
        { title: "Planning SCRUM ou Gantt du projet", type: "diagram", linkedCompetence: "Planifier les activités" },
        { title: "Bilan de projet avec analyse des écarts", type: "document", linkedCompetence: "Évaluer les indicateurs de suivi d'un projet et analyser les écarts" },
        { title: "Issues GitHub fermées – tickets traités et bugs corrigés", type: "screenshot", linkedCompetences: ["Collecter, suivre et orienter des demandes","Traiter des demandes concernant les applications"] },
        { title: "Rapport de recette / tests fonctionnels", type: "document", linkedCompetence: "Réaliser les tests d'intégration et d'acceptation d'un service" },
        { title: "Procédure de déploiement", type: "document", linkedCompetence: "Déployer un service" },
        { title: "Guide utilisateur gérant d'agence et technicien", type: "document", linkedCompetence: "Accompagner les utilisateurs dans la mise en place d'un service" },
        { title: "Comparatif solutions collaboratives + choix argumenté", type: "document", linkedCompetence: "Mettre en œuvre des outils et stratégies de veille informationnelle" },
        { title: "Liste des ressources consultées (Next.js, PostgreSQL)", type: "document", linkedCompetence: "Mettre en place son environnement d'apprentissage personnel" },
        { title: "Extraits de code Next.js + requêtes PostgreSQL du projet", type: "code", linkedCompetence: "Développer son projet professionnel" },
        { title: "Fiche projet CashCash dans le portfolio", type: "screenshot", linkedCompetence: "Gérer son identité professionnelle" },
      ]
  },
  {
    id: 10,
    name: "Stage 2 – Redesign site web (AP1)",
    period: "Janvier 2026",
    competences: {
      patrimoine: "—", incidents: "✓", presenceEnLigne: "✓",
      modeProjet: "✓", miseADispo: "✓", devPro: "—",
    },
    description: "Refonte complète du site web développé en AP1 avec amélioration du SEO et de la visibilité en ligne.",
    technologies: ["Web design", "SEO", "CSS", "UX/UI"],
    competenceDetails: [
      {
        id: "incidents",
        name: "Répondre aux incidents et demandes",
        level: "✓",
        subCompetences: [
          { label: "Traiter des demandes concernant les applications", level: "✓", indicator: "Solution trouvée et mise en oeuvre", proofSuggestion: "Liste des problèmes identifiés sur l'ancien site + correctifs apportés" },
          { label: "Collecter, suivre et orienter des demandes", level: "✓", indicator: "Demandes correctement diagnostiquées", proofSuggestion: "Tickets / liste des besoins client documentés" }
        ]
      },
      {
        id: "presenceEnLigne",
        name: "Développer la présence en ligne",
        level: "✓",
        subCompetences: [
          { label: "Participer à la valorisation de l'image de l'organisation sur les médias numériques en tenant compte du cadre juridique et des enjeux économiques", level: "✓", indicator: "Image conforme, enjeux juridiques respectés", proofSuggestion: "Comparaison screenshots avant/après redesign" },
          { label: "Participer à l'évolution d'un site Web exploitant les données de l'organisation", level: "✓", indicator: "Site évolué conformément au besoin", proofSuggestion: "Historique Git des modifications + démo" },
          { label: "Référencer les services en ligne de l'organisation et mesurer leur visibilité", level: "✓", indicator: "Visibilité mesurée, URL mise à jour sur fiche Google", proofSuggestion: "Screenshot recherche Google – site indexé en position 5 (chiffonniers.net)" }
        ]
      },
      {
        id: "modeProjet",
        name: "Travailler en mode projet",
        level: "✓",
        subCompetences: [
          { label: "Analyser les objectifs et les modalités d'organisation d'un projet", level: "✓", indicator: "Objectifs et modalités explicités", proofSuggestion: "Tickets / besoins clients et objectifs du redesign documentés" },
          { label: "Planifier les activités", level: "✓", indicator: "Activités planifiées, étapes respectées", proofSuggestion: "Planning du redesign (analyse → maquette → dev → recette → mise en ligne)" }
        ]
      },
      {
        id: "miseADispo",
        name: "Mettre à disposition un service informatique",
        level: "✓",
        subCompetences: [
          { label: "Déployer un service", level: "✓", indicator: "Service déployé opérationnel", proofSuggestion: "Site redesigné en production accessible sur chiffonniers.net" },
          { label: "Réaliser les tests d'intégration et d'acceptation d'un service", level: "✓", indicator: "Tests réalisés sur multi-résolutions", proofSuggestion: "Screenshots responsive validés sur mobile, tablette et desktop" }
        ]
      }
    ],
    proofs: [
      { title: "Tickets / besoins clients et objectifs du redesign documentés", type: "document", linkedCompetences: ["Collecter, suivre et orienter des demandes", "Analyser les objectifs et les modalités d'organisation d'un projet"] },
      { title: "Liste des correctifs apportés sur l'ancien site", type: "document", linkedCompetence: "Traiter des demandes concernant les applications" },
      { title: "Comparaison design avant/après redesign", type: "screenshot", linkedCompetence: "Participer à la valorisation de l'image de l'organisation sur les médias numériques en tenant compte du cadre juridique et des enjeux économiques" },
      { title: "Historique Git des modifications + démo live", type: "screenshot", linkedCompetence: "Participer à l'évolution d'un site Web exploitant les données de l'organisation" },
      { title: "Visibilité Google – site indexé (chiffonniers.net)", type: "screenshot", linkedCompetence: "Référencer les services en ligne de l'organisation et mesurer leur visibilité" },
      { title: "Planning du redesign (analyse → maquette → dev → recette → mise en ligne)", type: "document", linkedCompetence: "Planifier les activités" },
      { title: "Site redesigné en production – chiffonniers.net", type: "screenshot", linkedCompetence: "Déployer un service" },
      { title: "Screenshots responsive (mobile, tablette, desktop)", type: "screenshot", linkedCompetence: "Réaliser les tests d'intégration et d'acceptation d'un service" },
    ]
  },
  {
    id: 11,
    name: "Stage 2 – App pointage bénévoles (JavaFX)",
    period: "08 Janvier 2026",
    competences: {
      patrimoine: "✓", incidents: "✓", presenceEnLigne: "—",
      modeProjet: "✓", miseADispo: "✓", devPro: "—",
    },
    description: "Application desktop JavaFX pour la gestion du pointage des bénévoles avec système d'habilitations et export Excel.",
    technologies: ["JavaFX", "Java", "SQLite", "Desktop app", "Export Excel"],
    competenceDetails: [
      {
        id: "patrimoine",
        name: "Gérer le patrimoine informatique",
        level: "✓",
        subCompetences: [
          { label: "Mettre en place et vérifier les niveaux d'habilitation associés à un service", level: "✓", indicator: "Droits correspondant aux habilitations", proofSuggestion: "Captures du système de rôles (admin/bénévole) dans l'app" },
          { label: "Gérer des sauvegardes", level: "✓", indicator: "Sauvegardes réalisées, restaurations testées et opérationnelles", proofSuggestion: "Procédure de sauvegarde/restauration documentée + export Excel généré" },
          { label: "Vérifier les conditions de la continuité d'un service informatique", level: "✓", indicator: "Continuité de service vérifiée", proofSuggestion: "Test de restauration documenté" }
        ]
      },
      {
        id: "incidents",
        name: "Répondre aux incidents et demandes",
        level: "✓",
        subCompetences: [
          { label: "Traiter des demandes concernant les applications", level: "✓", indicator: "Solution mise en oeuvre, compte rendu clair", proofSuggestion: "Journal des demandes utilisateurs et corrections apportées" }
        ]
      },
      {
        id: "modeProjet",
        name: "Travailler en mode projet",
        level: "✓",
        subCompetences: [
          { label: "Analyser les objectifs et les modalités d'organisation d'un projet", level: "✓", indicator: "Analyse des besoins pertinente", proofSuggestion: "Cahier des charges / analyse des besoins de l'association" },
          { label: "Planifier les activités", level: "✓", indicator: "Découpage réaliste, livrables conformes", proofSuggestion: "Planning de développement" }
        ]
      },
      {
        id: "miseADispo",
        name: "Mettre à disposition un service informatique",
        level: "✓",
        subCompetences: [
          { label: "Réaliser les tests d'intégration et d'acceptation d'un service", level: "✓", indicator: "Tests rédigés et effectués", proofSuggestion: "Plan de tests fonctionnels (pointage, droits, sauvegarde)" },
          { label: "Déployer un service", level: "✓", indicator: "Service déployé opérationnel", proofSuggestion: "Procédure d'installation sur poste bénévole" },
          { label: "Accompagner les utilisateurs dans la mise en place d'un service", level: "✓", indicator: "Guide disponible", proofSuggestion: "Guide utilisateur de l'application" }
        ]
      }
    ],
    proofs: [
      { title: "Cahier des charges de l'association", type: "document", linkedCompetence: "Analyser les objectifs et les modalités d'organisation d'un projet" },
      { title: "Planning de développement JavaFX", type: "document", linkedCompetence: "Planifier les activités" },
      { title: "Screenshots système de rôles (admin/bénévole)", type: "screenshot", linkedCompetence: "Mettre en place et vérifier les niveaux d'habilitation associés à un service" },
      { title: "Procédure de sauvegarde/restauration + export Excel généré", type: "document", linkedCompetence: "Gérer des sauvegardes" },
      { title: "Test de restauration documenté", type: "document", linkedCompetence: "Vérifier les conditions de la continuité d'un service informatique" },
      { title: "Journal des demandes utilisateurs et corrections apportées", type: "document", linkedCompetence: "Traiter des demandes concernant les applications" },
      { title: "Plan de tests fonctionnels (pointage, droits, sauvegarde)", type: "document", linkedCompetence: "Réaliser les tests d'intégration et d'acceptation d'un service" },
      { title: "Procédure d'installation sur poste bénévole", type: "document", linkedCompetence: "Déployer un service" },
      { title: "Guide utilisateur de l'application", type: "document", linkedCompetence: "Accompagner les utilisateurs dans la mise en place d'un service" },
    ]
  },
  {
    id: 12,
    name: "Stage 2 – App scan OCR/ISBN (Python OpenCV)",
    period: "30 Janvier 2026",
    competences: {
      patrimoine: "—", incidents: "—", presenceEnLigne: "—",
      modeProjet: "✓", miseADispo: "✓", devPro: "—",
    },
    description: "Application de reconnaissance optique de caractères (OCR) pour scanner et identifier les codes ISBN des livres.",
    technologies: ["Python", "OpenCV", "Tesseract OCR", "API ISBN", "Traitement d'image"],
    competenceDetails: [
      {
        id: "modeProjet",
        name: "Travailler en mode projet",
        level: "✓",
        subCompetences: [
          { label: "Analyser les objectifs et les modalités d'organisation d'un projet", level: "✓", indicator: "Analyse des besoins pertinente", proofSuggestion: "Expression du besoin : contexte d'utilisation (bibliothèque association)" },
          { label: "Planifier les activités", level: "✓", indicator: "Activités planifiées", proofSuggestion: "Planning : acquisition image, prétraitement, OCR, API, affichage" }
        ]
      },
      {
        id: "miseADispo",
        name: "Mettre à disposition un service informatique",
        level: "✓",
        subCompetences: [
          { label: "Réaliser les tests d'intégration et d'acceptation d'un service", level: "✓", indicator: "Tests de reconnaissance évalués, rapport produit", proofSuggestion: "Tableau de résultats de reconnaissance (taux de succès OCR sur échantillon)" },
          { label: "Accompagner les utilisateurs dans la mise en place d'un service", level: "✓", indicator: "Documentation disponible", proofSuggestion: "Documentation des dépendances (requirements.txt), guide d'installation" }
        ]
      }
    ],
    proofs: [
      { title: "Expression du besoin / contexte d'utilisation (bibliothèque asso)", type: "document", linkedCompetence: "Analyser les objectifs et les modalités d'organisation d'un projet" },
      { title: "Planning technique (acquisition → prétraitement → OCR → API → affichage)", type: "document", linkedCompetence: "Planifier les activités" },
      { title: "Code Python/OpenCV commenté", type: "code", linkedCompetence: "Planifier les activités" },
      { title: "Tableau taux de réussite OCR sur échantillon de livres", type: "screenshot", linkedCompetence: "Réaliser les tests d'intégration et d'acceptation d'un service" },
      { title: "Guide d'installation (requirements.txt + README)", type: "document", linkedCompetence: "Accompagner les utilisateurs dans la mise en place d'un service" },
    ]
  }
];


// ── Mode édition ──────────────────────────────────────────
const editingTask = ref<Task | null>(null);
const editingTaskIndex = ref<number | null>(null);

const startEditTask = (task: Task, index: number) => {
  editingTask.value = JSON.parse(JSON.stringify(task)); // deep clone
  editingTaskIndex.value = index;
};

const saveEditTask = () => {
  if (editingTask.value === null || editingTaskIndex.value === null) return;
  tasks[editingTaskIndex.value] = editingTask.value;
  editingTask.value = null;
  editingTaskIndex.value = null;
};

const cancelEditTask = () => {
  editingTask.value = null;
  editingTaskIndex.value = null;
};

const addProofToEditing = () => {
  if (!editingTask.value) return;
  editingTask.value.proofs.push({
    title: '',
    type: 'document',
    linkedCompetence: '',
  });
};

const removeProofFromEditing = (index: number) => {
  if (!editingTask.value) return;
  editingTask.value.proofs.splice(index, 1);
};

const selectedTask = ref<Task | null>(null);
const showProofs = ref(false);
const expandedCompetence = ref<string | null>(null);
const selectedCompetenceKey = ref<keyof Task['competences'] | null>(null);

const openCompetenceModal = (id: keyof Task['competences']) => {
  selectedCompetenceKey.value = id;
  document.body.style.overflow = 'hidden';
};

const closeCompetenceModal = () => {
  selectedCompetenceKey.value = null;
  document.body.style.overflow = 'auto';
};

const getAggregatedSubCompetences = (compId: keyof Task['competences']) => {
  const seen = new Set<string>();
  const result: { sub: SubCompetence; taskName: string }[] = [];
  for (const task of tasks) {
    const detail = task.competenceDetails.find(d => d.id === compId);
    if (!detail) continue;
    for (const sub of detail.subCompetences) {
      if (!seen.has(sub.label)) {
        seen.add(sub.label);
        result.push({ sub, taskName: task.name });
      }
    }
  }
  return result;
};

const openModal = (task: Task) => {
  selectedTask.value = task;
  showProofs.value = false;
  expandedCompetence.value = null;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  selectedTask.value = null;
  showProofs.value = false;
  expandedCompetence.value = null;
  document.body.style.overflow = 'auto';
};

const toggleProofs = () => { showProofs.value = !showProofs.value; };

const toggleCompetence = (id: string) => {
  expandedCompetence.value = expandedCompetence.value === id ? null : id;
};

const getCompetenceIcon = (value: CompLevel) => {
  if (value === '✓') return { icon: '✓', class: 'full' };
  if (value === '△') return { icon: '△', class: 'partial' };
  return { icon: '—', class: 'none' };
};

const getDetailForCompetence = (task: Task, id: string): CompetenceDetail | undefined => {
  return task.competenceDetails.find(d => d.id === id);
};

const allCompetenceKeys: { id: keyof Task['competences']; name: string }[] = [
  { id: 'patrimoine', name: 'Gérer le patrimoine informatique' },
  { id: 'incidents', name: 'Répondre aux incidents et demandes' },
  { id: 'presenceEnLigne', name: 'Développer la présence en ligne' },
  { id: 'modeProjet', name: 'Travailler en mode projet' },
  { id: 'miseADispo', name: 'Mettre à disposition un service' },
  { id: 'devPro', name: 'Organiser son développement professionnel' },
];
</script>

<template>
  <div class="realisation-container">
    <div class="page-header">
      <div>
        <h2>Réalisations</h2>
        <p class="intro">Tableau de compétences BTS SIO SLAM – E5</p>
      </div>
      <button @click="editMode = !editMode" :class="['btn-edit-mode', { active: editMode }]">
        {{ editMode ? 'Quitter l\'édition' : 'Mode édition' }}
      </button>
    </div>

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
            <th colspan="6" class="bloc-header">Bloc 1 – Commun</th>
          </tr>
          <tr>
            <th></th>
            <th v-for="comp in allCompetenceKeys" :key="comp.id" class="competence-header"
                style="cursor:pointer; user-select:none;" @click="openCompetenceModal(comp.id)">
              {{ comp.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id" @click="openModal(task)" class="task-row">
            <td class="task-name">{{ task.name }}</td>
            <td v-for="comp in allCompetenceKeys" :key="comp.id"
                :class="['competence-cell', getCompetenceIcon(task.competences[comp.id]).class]">
              {{ getCompetenceIcon(task.competences[comp.id]).icon }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal tâche -->
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
              <h3>Compétences couvertes</h3>
              <div class="competences-accordion">
                <div v-for="comp in allCompetenceKeys" :key="comp.id"
                    class="accordion-item"
                    :class="getCompetenceIcon(selectedTask.competences[comp.id]).class">
                  <button class="accordion-header"
                          @click="toggleCompetence(comp.id)"
                          :disabled="selectedTask.competences[comp.id] === '—'">
                    <div class="accordion-title">
                      <span :class="['badge', getCompetenceIcon(selectedTask.competences[comp.id]).class]">
                        {{ getCompetenceIcon(selectedTask.competences[comp.id]).icon }}
                      </span>
                      <span>{{ comp.name }}</span>
                    </div>
                    <svg v-if="selectedTask.competences[comp.id] !== '—'"
                        width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2"
                        :class="{ rotated: expandedCompetence === comp.id }">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  <Transition name="slide">
                    <div v-if="expandedCompetence === comp.id && getDetailForCompetence(selectedTask, comp.id)"
                        class="accordion-body">
                      <div v-for="(sub, idx) in getDetailForCompetence(selectedTask, comp.id)!.subCompetences"
                          :key="idx" class="sub-competence">
                        <div class="sub-header">
                          <span :class="['sub-badge', getCompetenceIcon(sub.level).class]">
                            {{ getCompetenceIcon(sub.level).icon }}
                          </span>
                          <strong>{{ sub.label }}</strong>
                        </div>
                        <div class="sub-indicator">
                          <span class="label-tag">Indicateur attendu :</span> {{ sub.indicator }}
                        </div>
                        <div class="sub-proof">
                          <span class="label-tag">Preuve à montrer :</span> {{ sub.proofSuggestion }}
                        </div>
                      </div>
                    </div>
                  </Transition>
                </div>
              </div>
            </section>

            <section class="section proofs-section">
              <div class="proofs-header">
                <button @click="toggleProofs" class="proofs-toggle">
                  <span>{{ showProofs ? 'Masquer les preuves' : 'Voir les preuves' }}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      stroke-width="2" :class="{ rotated: showProofs }">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </div>

              <Transition name="slide">
                <div v-if="showProofs" class="proofs-list">
                  <div v-for="(proof, index) in selectedTask.proofs" :key="index" class="proof-item">
                    <div class="proof-icon">
                      <svg v-if="proof.type === 'document'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
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
                      <div v-if="proof.linkedCompetence || proof.linkedCompetences?.length" class="proof-linked">
                        Couvre :
                        <span v-if="proof.linkedCompetences">{{ proof.linkedCompetences.join(' · ') }}</span>
                        <span v-else>{{ proof.linkedCompetence }}</span>
                      </div>

                      <!-- Fichiers existants -->
                      <div v-if="getProofFiles(selectedTask.id, index).length" class="proof-files">
                        <div v-for="(url, fi) in getProofFiles(selectedTask.id, index)" :key="fi" class="proof-file-item">
                          <img v-if="isImage(url)" :src="url" :alt="proof.title"
                                @click="openLightbox(url)" class="proof-thumb" />
                          <template v-else>
                            <a :href="url" target="_blank" class="proof-file-link">
                              <svg class="folder-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 7C3 5.9 3.9 5 5 5h4l2 2h8c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V7z"/>
                                <line x1="3" y1="11" x2="21" y2="11" stroke-width="0.5"/>
                              </svg>
                              <span class="folder-label">{{ proof.title }}</span>
                            </a>
                          </template>
                          <button v-if="editMode" @click.stop="removeProofFile(selectedTask.id, index, url)" class="btn-remove-file">
                            Supprimer
                          </button>
                        </div>
                        <label v-if="editMode" class="btn-upload-replace">
                          Ajouter un fichier
                          <input type="file" multiple hidden @change="handleImageUpload(selectedTask.id, index, $event)" />
                        </label>
                      </div>

                      <!-- Zone upload si vide -->
                      <div v-else-if="uploadingKey === getProofKey(selectedTask.id, index)" class="proof-uploading">
                        Upload en cours...
                      </div>

                      <div v-else class="proof-upload-zone"
                           @dragover.prevent
                           @drop.prevent="handleDrop(selectedTask.id, index, $event)">
                        <label class="proof-upload-label">
                          <span>Déposer ou cliquer pour uploader</span>
                          <input type="file" multiple hidden @change="handleImageUpload(selectedTask.id, index, $event)" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
            </section>
          </article>
        </div>
      </div>
    </Transition>

    <!-- Modal compétence globale -->
    <Transition name="modal">
      <div v-if="selectedCompetenceKey" class="modal-overlay" @click="closeCompetenceModal">
        <div class="modal-container" @click.stop>
          <button class="modal-close" @click="closeCompetenceModal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <article class="modal-content">
            <div class="modal-header">
              <h1 class="task-title">
                {{ allCompetenceKeys.find(c => c.id === selectedCompetenceKey)?.name }}
              </h1>
              <div class="task-period">Référentiel BTS SIO SLAM – Bloc 1 commun</div>
            </div>
            <section class="section">
              <h3>Sous-compétences à valider</h3>
              <div class="competences-accordion">
                <div v-for="({ sub, taskName }, idx) in getAggregatedSubCompetences(selectedCompetenceKey!)"
                    :key="idx" class="sub-competence"
                    :style="{ borderLeft: `4px solid ${sub.level === '✓' ? '#22c55e' : sub.level === '△' ? '#f59e0b' : '#d1d5db'}` }">
                  <div class="sub-header">
                    <span :class="['sub-badge', getCompetenceIcon(sub.level).class]">
                      {{ getCompetenceIcon(sub.level).icon }}
                    </span>
                    <strong>{{ sub.label }}</strong>
                  </div>
                  <div class="sub-indicator"><span class="label-tag">Indicateur attendu :</span> {{ sub.indicator }}</div>
                  <div class="sub-proof"><span class="label-tag">Preuve à montrer :</span> {{ sub.proofSuggestion }}</div>
                  <div style="font-size:0.78em; color:#999; margin-top:0.3rem;">Validé dans : {{ taskName }}</div>
                </div>
              </div>
            </section>
          </article>
        </div>
      </div>
    </Transition>

    <!-- Lightbox -->
    <Transition name="modal">
      <div v-if="lightboxUrl" class="lightbox-overlay" @click="closeLightbox">
        <div class="lightbox-container" @click.stop>
          <button class="lightbox-close" @click="closeLightbox">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <img :src="lightboxUrl" alt="Preuve agrandie" class="lightbox-img" />
        </div>
      </div>
    </Transition>

  </div>
</template>

  <style scoped>
  .realisation-container { max-width: auto; margin: 0 auto; padding: 1rem; }
  h2 { margin-left: 4rem; font-size: 3em; font-weight: 500; margin-bottom: 0.5rem; font-family: "Helvetica", serif; }
  .intro { margin-left: 4rem; font-size: 1.2em; font-weight: 300; color: #666; margin-bottom: 2rem; }
  .legend { display: flex; gap: 2rem; margin-bottom: 2rem; padding: 1rem; background: #f8f8f8; border-left: 4px solid #000; }
  .legend-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.9em; }
  .legend .icon { font-weight: 700; font-size: 1.2em; }
  .table-wrapper { overflow-x: auto; margin-bottom: 3rem; border: 1px solid #b9b9b9; }
  .competence-table { width: 100%; border-collapse: collapse; background: #fff; font-size: 0.9em; }
  .competence-table thead { background: #000; color: #fff; position: sticky; top: 0; z-index: 10; }
  .competence-table th { padding: 1rem 0.75rem; text-align: left; font-weight: 600; border: 1px solid #333; }
  .bloc-header { text-align: center; font-size: 1.1em; background: #111; }
  .task-column { min-width: 300px; position: sticky; left: 0; background: #000; z-index: 11; }
  .competence-header { font-size: 0.85em; min-width: 100px; text-align: center; }
  .task-row { cursor: pointer; transition: background 0.2s; }
  .task-row:hover { background: #f8f8f8; }
  .task-row:nth-child(even) { background: #fafafa; }
  .task-row:nth-child(even):hover { background: #f0f0f0; }
  .task-name { padding: 1rem; font-weight: 500; border: 1px solid #ddd; position: sticky; left: 0; background: inherit; }
  .competence-cell { padding: 1rem; text-align: center; border: 1px solid #ddd; font-weight: 700; font-size: 1.2em; }
  .competence-cell.full { color: #22c55e; background: #f0fdf4; }
  .competence-cell.partial { color: #f59e0b; background: #fffbeb; }
  .competence-cell.none { color: #9ca3af; background: #f9fafb; }
  .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); display: flex; justify-content: center; align-items: flex-start; z-index: 300; overflow-y: auto; padding: 2rem 1rem; }
  .modal-container { background: #fff; max-width: 900px; width: 100%; position: relative; margin: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
  .modal-close { position: sticky; top: 1rem; right: 1rem; float: right; background: #000; color: #fff; border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; z-index: 10; margin: 1rem 1rem 0 0; }
  .modal-close:hover { background: #333; }
  .modal-content { padding: 3rem; }
  .modal-header { border-bottom: 2px solid #000; padding-bottom: 1.5rem; margin-bottom: 2rem; }
  .task-title { font-size: 2em; font-weight: 700; line-height: 1.2; margin: 0 0 1rem 0; font-family: "Helvetica", sans-serif; }
  .task-period { font-size: 0.9em; color: #666; text-transform: uppercase; letter-spacing: 0.05em; }
  .section { margin: 2.5rem 0; }
  .section h3 { font-size: 1.5em; font-weight: 700; margin-bottom: 1rem; font-family: "Helvetica", sans-serif; }
  .section p { font-size: 1.1em; line-height: 1.7; color: #333; margin: 0; }
  .tech-tags { display: flex; flex-wrap: wrap; gap: 0.75rem; }
  .tech-tag { background: #000; color: #fff; padding: 0.5rem 1rem; font-size: 0.85em; font-weight: 500; border-radius: 4px; }
  .competences-accordion { display: flex; flex-direction: column; gap: 0.5rem; }
  .accordion-item { border: 1px solid #e0e0e0; border-radius: 4px; overflow: hidden; }
  .accordion-item.full { border-left: 4px solid #22c55e; }
  .accordion-item.partial { border-left: 4px solid #f59e0b; }
  .accordion-item.none { border-left: 4px solid #d1d5db; opacity: 0.6; }
  .accordion-header { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 0.9rem 1rem; background: #fafafa; border: none; cursor: pointer; text-align: left; font-size: 0.95em; transition: background 0.2s; }
  .accordion-header:hover:not(:disabled) { background: #f0f0f0; }
  .accordion-header:disabled { cursor: default; }
  .accordion-title { display: flex; align-items: center; gap: 0.75rem; }
  .accordion-header svg { transition: transform 0.3s; flex-shrink: 0; }
  .accordion-header svg.rotated { transform: rotate(180deg); }
  .badge { font-size: 1.1em; font-weight: 700; width: 28px; text-align: center; }
  .badge.full { color: #22c55e; }
  .badge.partial { color: #f59e0b; }
  .badge.none { color: #9ca3af; }
  .accordion-body { padding: 0.5rem 1rem 1rem 1rem; background: #fff; display: flex; flex-direction: column; gap: 0.75rem; }
  .sub-competence { padding: 0.75rem; border: 1px solid #f0f0f0; border-radius: 4px; background: #fafafa; }
  .sub-header { display: flex; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.4rem; font-size: 0.9em; }
  .sub-badge { font-size: 1em; font-weight: 700; flex-shrink: 0; }
  .sub-badge.full { color: #22c55e; }
  .sub-badge.partial { color: #f59e0b; }
  .sub-badge.none { color: #9ca3af; }
  .sub-indicator { font-size: 0.85em; color: #555; margin-bottom: 0.3rem; line-height: 1.5; }
  .sub-proof { font-size: 0.85em; color: #2563eb; line-height: 1.5; }
  .label-tag { font-weight: 600; color: #333; }
  .proofs-section { border-top: 2px solid #e0e0e0; padding-top: 2rem; }
  .proofs-header { display: flex; gap: 0.75rem; align-items: stretch; }
  .proofs-toggle { all: unset; display: flex; align-items: center; gap: 0.75rem; cursor: pointer; padding: 1rem 1.5rem; background: #000; color: #fff; font-weight: 600; transition: background 0.2s; flex: 1; justify-content: space-between; box-sizing: border-box; }
  .proofs-toggle:hover { background: #333; }
  .proofs-toggle svg { transition: transform 0.3s; }
  .proofs-toggle svg.rotated { transform: rotate(180deg); }
  .edit-toggle { all: unset; cursor: pointer; padding: 1rem 1.25rem; border: 2px solid #000; color: #000; font-weight: 600; font-size: 0.9em; transition: all 0.2s; white-space: nowrap; box-sizing: border-box; }
  .edit-toggle:hover { background: #f0f0f0; }
  .edit-toggle.active { background: #000; color: #fff; }
  .proofs-list { margin-top: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
  .proof-item { display: flex; gap: 1rem; padding: 1rem; border: 1px solid #e0e0e0; border-radius: 4px; background: #fafafa; }
  .proof-icon { flex-shrink: 0; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: #fff; border: 1px solid #e0e0e0; border-radius: 4px; }
  .proof-content { flex: 1; min-width: 0; }
  .proof-title { font-weight: 600; margin-bottom: 0.25rem; }
  .proof-type { font-size: 0.85em; color: #666; text-transform: capitalize; margin-bottom: 0.25rem; }
  .proof-linked { font-size: 0.8em; color: #2563eb; margin-bottom: 0.5rem; font-style: italic; }
  .proof-image { margin-top: 0.5rem; }
  .proof-placeholder { font-size: 0.9em; color: #999; font-style: italic; padding: 0.5rem; background: #fff; border: 1px dashed #ddd; border-radius: 4px; }
  .proof-uploading { font-size: 0.9em; color: #666; font-style: italic; padding: 0.5rem; background: #fff; border: 1px dashed #999; border-radius: 4px; animation: pulse 1s infinite; }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
  .remove-img-btn { all: unset; margin-top: 0.5rem; display: inline-block; cursor: pointer; font-size: 0.8em; color: #dc2626; border-bottom: 1px solid #dc2626; }
  .remove-img-btn:hover { color: #b91c1c; }
  .upload-zone { margin-top: 0.5rem; border: 2px dashed #999; border-radius: 4px; background: #fff; transition: border-color 0.2s, background 0.2s; }
  .upload-zone:hover { border-color: #000; background: #f8f8f8; }
  .upload-label { display: flex; align-items: center; justify-content: center; padding: 1.25rem; cursor: pointer; font-size: 0.85em; color: #666; text-align: center; }
  .upload-input { display: none; }
  .proof-thumb { max-width: 100%; height: auto; border: 1px solid #ddd; border-radius: 4px; display: block; cursor: zoom-in; transition: opacity 0.2s; }
  .proof-thumb:hover { opacity: 0.8; }
  .lightbox-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.93); display: flex; align-items: center; justify-content: center; z-index: 500; padding: 2rem; }
  .lightbox-container { position: relative; display: flex; align-items: center; justify-content: center; }
  .lightbox-img { max-width: 90vw; max-height: 88vh; object-fit: contain; border-radius: 4px; box-shadow: 0 0 60px rgba(0,0,0,0.5); }
  .lightbox-close { position: absolute; top: -2.5rem; right: 0; background: transparent; border: none; color: #fff; cursor: pointer; display: flex; align-items: center; opacity: 0.8; transition: opacity 0.2s; }
  .lightbox-close:hover { opacity: 1; }
  .modal-enter-active, .modal-leave-active { transition: opacity 0.3s ease; }
  .modal-enter-from, .modal-leave-to { opacity: 0; }
  .modal-enter-active .modal-container, .modal-leave-active .modal-container { transition: transform 0.3s ease; }
  .modal-enter-from .modal-container, .modal-leave-to .modal-container { transform: scale(0.95); }
  .slide-enter-active, .slide-leave-active { transition: all 0.3s ease; }
  .slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-10px); }
  @media (max-width: 768px) {
    .realisation-container { padding: 1rem; }
    h2 { font-size: 2em; margin-left: 0; }
    .intro { margin-left: 0; }
    .legend { flex-direction: column; gap: 0.5rem; }
    .competence-table { font-size: 0.75em; }
    .task-column { min-width: 200px; }
    .competence-header { min-width: 80px; font-size: 0.75em; }
    .modal-content { padding: 2rem 1.5rem; }
    .task-title { font-size: 1.5em; }
    .proofs-header { flex-direction: column; }
  }
  .proof-file-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-decoration: none;
  width: 80px;
  background: none;
  border: none;
  padding: 0;
}

.folder-icon {
  width: 10em;
  height: 10em;
  fill: #444;
  stroke: none;
  transition: fill 0.2s;
}

.proof-file-link:hover .folder-icon {
  fill: #666;
}

.folder-label {
  font-size: 0.7rem;
  color: #888;
  text-align: center;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-ext-badge {
  font-size: 0.6rem;
  font-weight: 700;
  background: #222;
  color: #fff;
  padding: 1px 5px;
  border-radius: 3px;
  letter-spacing: 0.05em;
}


  </style>
