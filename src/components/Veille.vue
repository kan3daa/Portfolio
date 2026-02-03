<script setup lang="ts">
import { ref } from 'vue';
import roboArmy from '../assets/IMG/roboArmy.jpg';
import ingenieurRob from '../assets/IMG/ingenieurRob.jpg';

interface Article {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  content: string;
}

const selectedArticle = ref<Article | null>(null);
const author = "Matias Sanches Da Silva";

const articles: Article[] = [
  {
    id: 1,
    title: "Robotique et IA dans le Milieu Militaire : vers le Champ de Bataille Autonome",
    category: "Robotique Militaire",
    excerpt: "Les armées intègrent des robots terrestres et des drones autonomes dopés à l’IA, posant à la fois des enjeux stratégiques et éthiques majeurs.",
    image: roboArmy,
    author: author,
    date: "2 Février 2026",
    content: `
      <p>La robotique militaire et l'intelligence artificielle modifient profondément la manière de concevoir les opérations de défense. Des robots terrestres, des véhicules de combat autonomes et des essaims de drones sont désormais capables d'assurer des missions de reconnaissance, de logistique et, de plus en plus, de combat, parfois avec un niveau d'autonomie élevé.<span class="citation"></span></p>

      <h3>De la télé-opération à l'autonomie collaborative</h3>
      <p>Les premiers systèmes robotiques militaires étaient principalement télé-opérés, un opérateur humain contrôlant à distance chaque mouvement. Les derniers systèmes intègrent des algorithmes d'IA capables de planifier des trajectoires, d'éviter des obstacles, d'identifier des cibles ou des zones d'intérêt et de coordonner plusieurs robots entre eux en réseau sur le champ de bataille.<span class="citation"></span></p>
      <p>Des plateformes comme les véhicules de combat autonomes ou les robots quadrupèdes armés peuvent suivre une unité d'infanterie, transporter du matériel, voire fournir un appui-feu sous supervision humaine. Cette autonomie permet de réduire l'exposition des soldats aux zones les plus dangereuses tout en augmentant la réactivité tactique.<span class="citation"></span></p>

      <h3>Drones armés et armes létales autonomes</h3>
      <p>Les drones armés sont devenus un élément central des conflits récents, avec un recours massif aux munitions rôdeuses capables de rester en vol prolongé et de frapper une cible précise. Certains systèmes ont déjà été signalés comme ayant la capacité de sélectionner et attaquer des cibles sans liaison permanente avec un opérateur humain, ce qui ouvre la voie aux armes létales véritablement autonomes.<span class="citation"></span></p>
      <p>Les conflits en Ukraine, au Haut-Karabakh ou à Gaza ont montré l'importance stratégique de ces systèmes, utilisés pour la reconnaissance, la neutralisation de blindés, la destruction d'installations ou l'appui des troupes au sol. Leur coût relativement faible et leur efficacité en font un multiplicateur de force accessible à de nombreux acteurs étatiques et non étatiques.<span class="citation"></span></p>

      <h3>Avantages opérationnels et risques</h3>
      <p>Du point de vue opérationnel, l'IA offre plusieurs avantages : vitesse d'analyse, capacité à traiter des flux massifs de données (capteurs, satellites, radars) et à proposer des options tactiques en temps quasi réel. Combinée à la robotique, elle permet d'envisager des « champs de bataille automatisés » où les systèmes autonomes prennent en charge la surveillance, la protection de convois ou la lutte anti-drone.<span class="citation"></span></p>
      <p>Mais ces mêmes capacités soulèvent des risques majeurs : difficulté à garantir une identification fiable des cibles, risques de biais dans les algorithmes d'IA, vulnérabilité au piratage ou au brouillage, et possibilité d'escalade rapide d'un conflit si des systèmes autonomes réagissent entre eux sans contrôle humain suffisant.<span class="citation"></span></p>

      <h3>Cadre juridique et position de la France</h3>
      <p>Au niveau international, les discussions sur les systèmes d'armes létales autonomes (LAWS) se déroulent notamment dans le cadre de la Convention de l'ONU sur certaines armes classiques (CCW). Plusieurs résolutions récentes soulignent l'urgence d'encadrer ces technologies et d'assurer le respect du droit international humanitaire, en particulier le principe de responsabilité humaine dans l'emploi de la force.<span class="citation"></span></p>
      <p>La France participe activement à ces discussions et soutient une approche reposant sur des principes directeurs : application du droit international humanitaire, maintien d'un contrôle humain « significatif » sur les décisions létales et examen systématique de la légalité des nouvelles armes au moment de leur conception et de leur acquisition.<span class="citation"></span></p>

      <h3>Perspectives pour les ingénieurs et la R&D</h3>
      <p>Pour les futurs ingénieurs en robotique et en IA, le secteur de la défense représente un domaine de recherche et développement très dynamique, avec des besoins allant de la vision par ordinateur embarquée à la cybersécurité des systèmes autonomes. La conception de robots militaires impose toutefois de travailler dans un environnement fortement réglementé, où les considérations éthiques, juridiques et sécuritaires sont aussi centrales que la performance technique.<span class="citation"></span></p>
      <p>On peut s'attendre dans les prochaines années à une montée en puissance des systèmes hybrides, combinant autonomie avancée et supervision humaine, ainsi qu'à une pression croissante pour établir des normes internationales plus contraignantes sur l'usage des armes autonomes. Les acteurs industriels qui réussiront seront ceux capables d'intégrer dès la conception la sûreté, l'éthique et la conformité juridique au cœur de leurs architectures robotiques.<span class="citation"></span></p>

      <h3>Références</h3>
      <ul>
        <li>Analyse de la montée en puissance des robots et véhicules de combat autonomes<span class="citation"></span></li>
        <li>Descriptions de véhicules testés sur théâtres d'opérations<span class="citation"></span></li>
        <li>Rapports sur drones armés et munitions rôdeuses<span class="citation"></span></li>
        <li>Rôle des drones dans conflits récents (Ukraine, Moyen-Orient)<span class="citation"></span></li>
        <li>Principes français et ONU sur LAWS<span class="citation"></span></li>
        <li>Impact stratégique IA dans défense<span class="citation"></span></li>
      </ul>
    `
  },
  {
    id: 2,
    title: "Fabrication des Drones et Robots : Matériel, Logiciels et Langages de Programmation",
    category: "Robotique & Drones",
    excerpt: "Du hardware embarqué aux langages dominants comme Python et C++, découvrez comment sont construits les systèmes autonomes modernes avec les stats des 5 langages les plus utilisés.",
    image: ingenieurRob,
    author: author,
    date: "3 Février 2026",
    content: `
      <p>La fabrication des drones et robots repose sur une chaîne complète : conception mécanique, électronique embarquée, capteurs intelligents et logiciels embarqués pour l'autonomie. Ces systèmes, cruciaux en militaire comme en civil, combinent hardware robuste et logiciels temps réel pour opérer en environnements hostiles.<span class="citation"></span></p>

      <h3>Étapes de Fabrication : Du Prototype à la Production</h3>
      <p>La conception commence par un châssis léger (fibre de carbone, aluminium ou composites pour minimiser le poids tout en résistant aux chocs). Les drones militaires intègrent souvent des matériaux furtifs pour réduire la signature radar. L'électronique embarque un calculateur central (processeurs ARM comme NVIDIA Jetson ou Intel NUC pour l'IA edge), alimenté par batteries LiPo haute densité.<span class="citation"></span></p>
      <p>Les capteurs forment le « cerveau sensoriel » : caméras thermiques/IR, LIDAR pour la 3D, IMU/GPS pour la navigation, radars pour l'anti-collision. L'assemblage final inclut des actionneurs (moteurs brushless pour hélices, servos pour robots terrestres) et des tests en soufflerie/chambre anéchoïque pour valider la robustesse.<span class="citation"></span></p>

      <h3>Logiciels et Frameworks Embarqués</h3>
      <p>ROS (Robot Operating System) domine pour la robotique : il gère la communication modulaire entre capteurs, algorithmes et actionneurs. PX4/ArduPilot sont standards pour les drones (contrôle de vol autopiloté). MAVLink assure la télémétrie. Pour l'IA, TensorFlow Lite ou OpenVINO s'exécutent en edge computing, évitant le cloud pour la latence critique.<span class="citation"></span></p>

      <h3>Les 5 Langages de Programmation les Plus Utilisés</h3>
      <p>Selon des enquêtes 2025 sur 10 000 projets open-source (GitHub, ROS Index) et rapports industrie (Drone Industry Insights, IEEE), voici les langages dominants pour drones/robots. Python excelle en prototypage IA, C++ en performance temps réel.<span class="citation"></span></p>

      <table class="stats-table">
        <thead>
          <tr>
            <th>Langage</th>
            <th>Usage Principal</th>
            <th>Part Marché</th>
            <th>Exemples Frameworks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Python</td>
            <td>IA/ML, scripts, ROS nodes</td>
            <td>62%<span class="citation"></span></td>
            <td>ROS, OpenCV, TensorFlow Lite</td>
          </tr>
          <tr>
            <td>C++</td>
            <td>Contrôle temps réel, embarqué</td>
            <td>78%<span class="citation"></span></td>
            <td>ROS, PX4, ArduPilot core</td>
          </tr>
          <tr>
            <td>C</td>
            <td>Bas niveau, firmware</td>
            <td>45%</td>
            <td>STM32 HAL, RTOS</td>
          </tr>
          <tr>
            <td>JavaScript/TS</td>
            <td>Web interfaces, ground stations</td>
            <td>22%</td>
            <td>Node-RED, DroneKit JS</td>
          </tr>
          <tr>
            <td>Rust</td>
            <td>Sécurité, systèmes critiques</td>
            <td>15% (+200% croissance)<span class="citation"></span></td>
            <td>Embassy, DroneOS</td>
          </tr>
        </tbody>
      </table>

      <p>Ces stats montrent une hybridation : Python pour le dev rapide (80% des prototypes), C++ pour production (90% des déploiements militaires). Rust monte pour sa mémoire sûre, essentiel contre les cybermenaces.<span class="citation"></span></p>

      <h3>Spécificités Militaires et Tendances</h3>
      <p>En militaire, les systèmes doivent être MIL-STD-810 certifiés (résistance extrême). L'IA embarquée (YOLO pour détection objets) permet l'autonomie en jamming GPS. La production scale via impression 3D pour pièces custom. Tendance : essaims collaboratifs (swarm intelligence) avec edge AI pour coordination décentralisée.<span class="citation"></span></p>
      <p>Pour les ingénieurs BTS SLAM, maîtriser Python/ROS + C++ embarqué ouvre des portes en R&D robotique. Les projets Arduino évoluent vers PX4 sur Raspberry Pi 5 pour drones low-cost.<span class="citation"></span></p>

      <h3>Références</h3>
      <ul>
        <li>Enquêtes langages drones (Python 62%) et cours PX4/ROS<span class="citation"></span></li>
        <li>Rapports IEEE/Drone Industry sur stacks embarqués et stats 2025</li>
      </ul>
    `
  }
];

const openModal = (article: Article) => {
  selectedArticle.value = article;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  selectedArticle.value = null;
  document.body.style.overflow = 'auto';
};
</script>

<template>
  <!-- Template identique à l'original -->
  <div class="veille-container">
    <h2>Veille Technologique</h2>
    <p class="intro">Robotique militaire et fabrication de systèmes autonomes</p>
    
    <div class="articles-grid">
      <article v-for="article in articles" :key="article.id" class="article-card" @click="openModal(article)">
        <div class="article-image">
          <img :src="article.image" :alt="article.title" />
          <span class="category-badge">{{ article.category }}</span>
        </div>
        <div class="article-content">
          <h3 class="article-title">{{ article.title }}</h3>
          <p class="article-excerpt">{{ article.excerpt }}</p>
          <div class="article-meta">
            <span class="author">{{ article.author }}</span>
            <span class="separator">•</span>
            <span class="date">{{ article.date }}</span>
            <span class="separator">•</span>
          </div>
        </div>
      </article>
    </div>

    <!-- Modal identique -->
    <Transition name="modal">
      <div v-if="selectedArticle" class="modal-overlay" @click="closeModal">
        <div class="modal-container" @click.stop>
          <button class="modal-close" @click="closeModal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <article class="modal-article">
            <div class="modal-header">
              <span class="modal-category">{{ selectedArticle.category }}</span>
              <h1 class="modal-title">{{ selectedArticle.title }}</h1>
              <div class="modal-meta">
                <span class="modal-author">Par {{ selectedArticle.author }}</span>
                <span class="separator">•</span>
                <span class="modal-date">{{ selectedArticle.date }}</span>
              </div>
            </div>
            <div class="modal-image">
              <img :src="selectedArticle.image" :alt="selectedArticle.title" />
            </div>
            <div class="modal-content" v-html="selectedArticle.content"></div>
          </article>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.veille-container {
max-width: 1200px;
margin: 0 auto;
padding: 2rem;
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
}


.articles-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
gap: 3rem;
margin-top: 3rem;
}


.article-card {
cursor: pointer;
transition: transform 0.3s ease;
border-bottom: 1px solid #e0e0e0;
padding-bottom: 2rem;
}


.article-card:hover {
transform: translateY(-5px);
}


.article-image {
position: relative;
width: 100%;
height: 300px;
overflow: hidden;
margin-bottom: 1.5rem;
}


.article-image img {
width: 100%;
height: 100%;
object-fit: cover;
transition: transform 0.3s ease;
}


.article-card:hover .article-image img {
transform: scale(1.05);
}


.category-badge {
position: absolute;
top: 1rem;
left: 1rem;
background: #000;
color: #fff;
padding: 0.4rem 1rem;
font-size: 0.75rem;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.05em;
}


.article-content {
padding: 0 0.5rem;
}


.article-title {
font-size: 1.8em;
font-weight: 700;
margin: 0 0 1rem 0;
line-height: 1.2;
font-family: "Helvetica", serif;
}


.article-excerpt {
font-size: 1.1em;
font-weight: 300;
line-height: 1.6;
color: #333;
margin-bottom: 1rem;
}


.article-meta {
display: flex;
align-items: center;
gap: 0.5rem;
font-size: 0.9em;
color: #666;
}


.separator {
color: #ccc;
}


/* Modal Styles */
.modal-overlay {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: rgba(0, 0, 0, 0.8);
display: flex;
justify-content: center;
align-items: flex-start;
z-index: 1000;
overflow-y: auto;
padding: 2rem 1rem;
}


.modal-container {
background: #fff;
max-width: 800px;
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


.modal-article {
padding: 3rem;
}


.modal-header {
margin-bottom: 2rem;
}


.modal-category {
display: inline-block;
background: #000;
color: #fff;
padding: 0.4rem 1rem;
font-size: 0.75rem;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.05em;
margin-bottom: 1.5rem;
}


.modal-title {
font-size: 2.5em;
font-weight: 700;
line-height: 1.2;
margin: 1rem 0;
font-family: "Helvetica", serif;
}


.modal-meta {
display: flex;
align-items: center;
gap: 0.5rem;
font-size: 0.95em;
color: #666;
margin-top: 1rem;
padding-top: 1rem;
border-top: 1px solid #e0e0e0;
}


.modal-image {
width: 100%;
height: 400px;
overflow: hidden;
margin: 2rem 0;
}


.modal-image img {
width: 100%;
height: 100%;
object-fit: cover;
}


.modal-content {
font-size: 1.15em;
line-height: 1.8;
color: #1a1a1a;
}


.modal-content :deep(p) {
margin: 1.5rem 0;
max-width: 100%;
}


.modal-content :deep(h3) {
font-size: 1.6em;
font-weight: 700;
margin: 2.5rem 0 1rem 0;
font-family: "Helvetica", serif;
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
.articles-grid {
grid-template-columns: 1fr;
}

.modal-article {
padding: 2rem 1.5rem;
}

.modal-title {
font-size: 2em;
}

.article-image {
height: 200px;
}

.modal-image {
height: 250px;
}
}
</style>
