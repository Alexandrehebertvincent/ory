# ORY — Game Design Document

> A multiplayer generational strategy game where players shape history from the year 1000 onward.

---

## 1. Compréhension du concept

### Vision globale

ORY est un jeu de stratégie générationnelle en temps semi-réel, multijoueur, piloté par l'IA. Le joueur incarne un humain au sein d'une nation à partir de l'an 1000, et traverse les générations en prenant des décisions qui façonnent l'histoire de sa nation et du monde.

**L'IA est le moteur central du jeu** : elle maintient la cohérence historique, simule les nations non-joueurs, propose des choix contextuels et gère la progression temporelle.

### Principes fondamentaux

1. **Snapshot historique unique** — On capture l'état du monde en l'an 1000. Toute l'histoire post-1000 connue est ignorée. Le monde diverge dès le premier tour.
2. **L'humain d'abord** — Le joueur est un humain dans une lignée familiale, pas une entité abstraite. Il vieillit, meurt, et son descendant prend la relève.
3. **La nation en second** — Le joueur influence aussi les décisions de sa nation, mais les contraintes humaines (âge, compétences, position sociale) modulent son pouvoir.
4. **Cohérence technologique** — L'arbre technologique suit une logique de prérequis. On ne va pas dans l'espace sans fusée. On ne fabrique pas de voiture sans moteur. Mais on peut y arriver en 1500 si les conditions sont réunies.
5. **Économie organique** — La valeur des biens est définie par leur valeur en l'an 1000 et évolue uniquement selon les décisions des joueurs.
6. **Multi-start** — Un joueur peut rejoindre un monde existant (choisir nation + lignée) ou démarrer un nouveau monde vierge (an 1000).

---

## 2. Snapshot historique — An 1000

C'est le cœur du jeu. Voici les dimensions de données à capturer :

### 2.1 Politique

- **Nations & entités politiques** : empires, royaumes, cités-États, tribus, confédérations existant en l'an 1000
- **Frontières** approximatives et zones d'influence
- **Systèmes de gouvernance** : monarchie, théocratie, système tribal, féodalisme, etc.
- **Relations diplomatiques** : alliances, vassalités, rivalités, tributs
- **Figures de pouvoir** : dirigeants, dynasties en place

### 2.2 Géographie

- **Terrain physique** : montagnes, rivières, forêts, déserts, côtes, plaines — basé sur la géographie réelle
- **Ressources naturelles** : minerais, terres fertiles, accès à l'eau, bois, sel, etc.
- **Routes commerciales** : Route de la Soie, routes maritimes, voies fluviales
- **Établissements humains** : villes principales, villages, centres de commerce

### 2.3 Population

- **Estimations démographiques** par région/nation
- **Densité de population** et répartition urbaine/rurale
- **Structures sociales** : noblesse, clergé, paysans, artisans, esclaves, castes
- **Espérance de vie** moyenne (~30-35 ans à l'époque, avec variance régionale)
- **Taux de natalité/mortalité**

### 2.4 Religions & croyances

- **Religions majeures** et leur zones d'influence : Christianisme (catholique/orthodoxe), Islam (sunnite/chiite), Bouddhisme, Hindouisme, religions traditionnelles (animisme, chamanisme, religions nordiques, etc.)
- **Centres religieux** : Rome, Constantinople, La Mecque, Varanasi, etc.
- **Tensions religieuses** et coexistences
- **Influence du religieux sur le politique**

### 2.5 Technologies

- **Niveau technologique par région** : agriculture, métallurgie, navigation, construction, armement, médecine, écriture, astronomie
- **Innovations clés déjà présentes** : poudre à canon (Chine), moulins à eau (Europe), acier de Damas, papier, imprimerie à blocs (Chine)
- **Artisanat et savoir-faire** : tissage, poterie, architecture
- **Capacités militaires** : types d'armées, fortifications, tactiques

### 2.6 Sciences naturelles & climat

- **Climat régional** en l'an 1000 (Optimum Climatique Médiéval — période chaude)
- **Catastrophes naturelles récurrentes** : zones sismiques, volcans actifs, inondations
- **Maladies endémiques** par région : paludisme, lèpre, variole
- **Ressources alimentaires** : cultures principales, élevage, pêche
- **Saisons et cycles agricoles**

### 2.7 Santé & condition humaine

- **Maladies courantes** et taux de mortalité infantile
- **Connaissances médicales** par civilisation
- **Famines** et crises alimentaires régionales
- **Hygiène et conditions de vie**

### 2.8 Langues

- **Langues principales** et familles linguistiques
- **Langues de commerce** (arabe, latin, chinois classique)
- **Alphabets et systèmes d'écriture**
- **Taux d'alphabétisation** (très bas partout, mais variable)

### 2.9 Dimensions additionnelles identifiées

| Dimension                               | Exemples                                                                                                              |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Culture & Arts**                      | Architecture (roman, islamique, chinois), musique, littérature orale, traditions                                      |
| **Commerce & Économie**                 | Monnaies en circulation, systèmes de troc, guildes, valeurs de biens de base                                          |
| **Agriculture & Alimentation**          | Cultures par région, techniques agricoles, domestication                                                              |
| **Infrastructure**                      | Routes, ponts, aqueducs, fortifications, ports                                                                        |
| **Droit & Justice**                     | Systèmes juridiques, droit coutumier, lois religieuses (Sharia, droit canon)                                          |
| **Éducation**                           | Madrasas, monastères, universités naissantes, transmission orale                                                      |
| **Exploration & Connaissance du monde** | Ce que chaque civilisation sait du monde (les Vikings connaissent l'Amérique, les Polynésiens naviguent le Pacifique) |
| **Migration & Mouvements de peuples**   | Peuples nomades, grandes migrations en cours                                                                          |
| **Vie quotidienne**                     | Alimentation, vêtements, logement, loisirs — utile pour l'immersion du joueur en tant qu'humain                       |
| **Écologie & Faune**                    | Animaux domestiqués, faune sauvage, forêts anciennes, ressources halieutiques                                         |

---

## 3. Architecture de jeu

### 3.1 Boucle de jeu (Game Loop)

```
┌─────────────────────────────────────────────────────┐
│                   BOUCLE PRINCIPALE                  │
│                                                      │
│  1. L'IA évalue le contexte mondial + local          │
│  2. L'IA détermine le time ratio                     │
│  3. Si décision requise :                            │
│     ├─ Option A : Réplique historique (si pertinent) │
│     ├─ Option B : Meilleur choix IA (1 ou +)         │
│     └─ Option C : Décision libre du joueur           │
│  4. Le joueur choisit                                │
│  5. L'IA simule les conséquences                     │
│  6. Le monde avance                                  │
│  7. Retour à 1                                       │
└─────────────────────────────────────────────────────┘
```

### 3.2 Time Ratio (Ratio temporel)

Le temps est **universel par monde** : tous les joueurs d'un même serveur/partie sont toujours au même moment dans l'histoire. Il n'y a pas de désynchronisation temporelle possible.

- **Principe** : Le Grand Maître évalue en permanence l'état de TOUS les joueurs pour déterminer un ratio temporel unique, appliqué à tout le monde.
- **Temps accéléré** : Si tous les joueurs sont en phase passive (pas de décision critique), le temps avance vite. Des semaines/mois/années peuvent défiler.
- **Ralentissement** : Dès qu'UN joueur a un événement critique (guerre, catastrophe, décision diplomatique majeure), le temps ralentit **pour tout le monde**.
- **Temps granulaire** : En moment critique, le temps peut descendre au jour-par-jour voire à l'heure pour les joueurs directement impliqués. Les autres joueurs reçoivent des micro-décisions ou du contexte narratif pendant ce temps.

**Algorithme de ratio** (simplifié) :

1. Le Grand Maître collecte le "poids d'urgence" de chaque joueur (0 = rien à faire, 10 = crise existentielle)
2. Le ratio est déterminé par le poids le plus élevé parmi tous les joueurs
3. Les joueurs en phase passive pendant un ralentissement reçoivent des événements contextuels pour rester engagés (rumeurs, opportunités mineures, vie quotidienne)

> **Conséquence design** : Un joueur ne peut jamais "bloquer" le serveur indéfiniment. Si un joueur ne prend pas sa décision dans un temps imparti (temps réel), l'IA Compagnon prend une décision par défaut (l'option la plus neutre/historique) et le temps reprend.

### 3.3 Le joueur en tant qu'humain

- **Naissance** → enfance (pas de décisions majeures, formation du personnage)
- **Adolescence** → premières décisions, apprentissage, mariage potentiel
- **Adulte** → période de pouvoir maximal, décisions clés
- **Vieillesse** → déclin, préparation de la succession
- **Mort** → transition vers le descendant choisi
- **Traits héréditaires** : certains traits se transmettent (aptitudes, défauts, réputation familiale)

### 3.4 Le joueur en tant que nation

- **Influence variable** : un paysan n'a pas le même pouvoir qu'un roi
- **Ascension sociale** possible sur plusieurs générations
- **Décisions nationales** : diplomatie, guerre, commerce, lois, expansion
- **Interaction avec d'autres joueurs** : commerce, alliance, conflit
- **Plusieurs joueurs par nation** : une même nation peut accueillir plusieurs joueurs, chacun représentant une lignée familiale différente. Cela crée des dynamiques internes :
  - **Rivalités** : lutte pour le pouvoir au sein de la nation (qui devient roi ? qui contrôle le commerce ?)
  - **Coopération** : les lignées peuvent s'allier pour renforcer la nation face à l'extérieur
  - **Politique interne** : votes, complots, mariages inter-lignées, assassinats (si la mécanique le permet)
  - **Spécialisation** : une lignée se concentre sur le militaire, une autre sur le commerce, etc.
  - Les décisions nationales sont influencées par le poids politique de chaque lignée (un paysan vote moins qu'un noble)

### 3.5 Gestion des invasions

Quand la nation du joueur est envahie :

- **Option A** : Accepter l'invasion → Le joueur peut continuer sous la nouvelle nation dominante (sa lignée survit mais change de nationalité)
- **Option B** : Résister (si possible) → En fonction des capacités militaires
- **Option C** : Quitter cette partie → Le joueur peut recommencer dans un autre monde ou rejoindre un monde existant

Ce n'est pas un "game over" — c'est une transition narrative.

---

## 4. Milestones

### Phase 0 — Fondations (actuelle)

- [x] Définir la vision du jeu
- [ ] Valider le document de design
- [ ] Définir le modèle de données du snapshot An 1000
- [ ] Choisir le stack technique

### Phase 1 — Le Monde en l'An 1000

- [ ] Construire le dataset historique (snapshot An 1000) — toutes les dimensions
- [ ] Système de carte : génération procédurale basée sur la géographie réelle
- [ ] Rendu de carte (tuiles) avec terrain, frontières, villes
- [ ] Modèle de données : nations, populations, technologies, religions, économie

### Phase 2 — Moteur IA

- [ ] Moteur de simulation du monde (tour par tour interne, temps continu pour le joueur)
- [ ] Système de décision IA : proposer des choix contextuels
- [ ] Arbre technologique avec système de prérequis
- [ ] Système économique organique (valeurs basées sur l'an 1000)
- [ ] Time ratio dynamique

### Phase 3 — Le Joueur

- [ ] Création de personnage (nation + lignée)
- [ ] Système de vie : naissance, vieillissement, mort, succession
- [ ] Interface de décision (les 3 types de choix)
- [ ] Système de traits et compétences héréditaires

### Phase 4 — Multijoueur

- [ ] Serveur de jeu persistant
- [ ] Multi-start : créer ou rejoindre un monde
- [ ] Interaction entre joueurs (commerce, diplomatie, guerre)
- [ ] Synchronisation du time ratio entre joueurs

### Phase 5 — Polish & Launch

- [ ] Interface utilisateur complète
- [ ] Tutoriel / onboarding
- [ ] Équilibrage (IA, économie, tech tree)
- [ ] Tests de charge
- [ ] Alpha / Beta

---

## 5. Difficultés anticipées

### 5.1 Données historiques

- **Problème** : Les données sur l'an 1000 sont inégales. L'Europe et la Chine sont bien documentées, l'Afrique subsaharienne, l'Amérique précolombienne et l'Océanie beaucoup moins.
- **Solution** : Combiner sources académiques, estimations approximatives, et interpolation cohérente. Documenter clairement ce qui est factuel vs estimé. La précision parfaite n'est pas le but — la cohérence si.

### 5.2 Architecture IA — Deux rôles distincts

- **Problème initial** : Simuler des centaines de nations avec l'IA en parallèle, c'est coûteux.
- **Constat clé** : À grande échelle, les joueurs humains pilotent eux-mêmes leurs nations, chacun accompagné par l'IA. L'IA n'a pas besoin de simuler ce que les joueurs font déjà.

- **Solution** : L'IA est divisée en deux rôles :

  **1. IA Compagnon (per-player)** — Une instance par joueur
  - Propose les 3 types de choix (historique, optimal, libre)
  - Narration et immersion (résumés, descriptions, dialogues)
  - Gestion du time ratio individuel
  - Contextualisée à la nation et la lignée du joueur
  - Coût : scale linéairement avec le nombre de joueurs connectés

  **2. IA Monde / Grand Maître (une instance par monde)** — L'orchestrateur global omniscient
  - **Vision globale** : connaît l'état de TOUTES les nations — joueurs ET NPC — pour orchestrer un monde cohérent
  - **Événements naturels** : séismes, éruptions, sécheresses, inondations, épidémies — hors contrôle des joueurs
  - **Nations sans joueur (NPC)** : simulation simplifiée des nations non pilotées par un humain (diplomatie, expansion, économie basique)
  - **Climat & saisons** : cycles globaux qui affectent tout le monde
  - **Événements mondiaux émergents** : routes commerciales qui s'ouvrent, migrations de peuples NPC, diffusion de technologies entre nations
  - **Événements inter-joueurs** : le Grand Maître peut **proposer ou imposer** des situations entre joueurs :
    - _Proposés_ : opportunité commerciale entre deux nations joueurs, mariage diplomatique, alliance face à une menace commune
    - _Imposés_ : tension frontalière inévitable, conflit de ressources sur un territoire disputé, afflux de réfugiés d'une nation vers une autre, épidémie qui se propage d'un joueur à l'autre
    - Le Grand Maître détecte les situations de friction ou d'opportunité en analysant la proximité, les ressources, les trajectoires politiques et technologiques des joueurs
  - **Arbitrage** : quand les zones d'influence de joueurs se chevauchent, le Grand Maître impose les règles de la réalité (on ne peut pas ignorer un voisin qui mobilise son armée à ta frontière)
  - Coût : proportionnel au nombre total d'entités dans le monde, mais les nations joueurs nécessitent moins de simulation (le joueur décide, le Grand Maître observe et réagit)

  > **Effet vertueux** : Plus il y a de joueurs, moins de nations NPC à simuler en profondeur. En contrepartie, plus d'interactions inter-joueurs à orchestrer — mais c'est précisément ce qui rend le jeu plus riche.

  > **Flux d'information** : Le Grand Maître alimente les IA Compagnon. Quand il détecte un événement qui concerne un joueur, il transmet le contexte à l'IA Compagnon du joueur, qui se charge de la narration et de la présentation des choix.

### 5.3 Cohérence de l'arbre technologique

- **Problème** : Permettre des chemins technologiques alternatifs tout en maintenant la physique et la logique. L'IA doit empêcher les absurdités sans brider la créativité.
- **Solution** : Arbre technologique basé sur des prérequis physiques/scientifiques réels, pas sur la chronologie historique. Un graphe de dépendances, pas une timeline.

### 5.4 Time ratio multijoueur

- **Problème** : Comment gérer le rythme du jeu quand des joueurs ont des niveaux d'activité différents ?
- **Solution** : Le time ratio est **unique et universel par monde**. Tous les joueurs sont toujours à la même date. Le Grand Maître évalue l'état global de tous les joueurs et applique le ratio le plus lent nécessaire.
- **Risque** : Un joueur en crise permanente pourrait ralentir le jeu pour tous.
- **Garde-fou** : Timeout sur les décisions — si un joueur ne répond pas, l'IA Compagnon prend la décision par défaut (option neutre/historique). Le monde ne s'arrête jamais.
- **Engagement** : Les joueurs en phase passive reçoivent du contenu contextuel (rumeurs, événements mineurs, vie quotidienne) pour rester immergés pendant les ralentissements.

### 5.5 Équilibrage économique

- **Problème** : Sans rails historiques, l'économie peut diverger vers des états absurdes (hyperinflation, effondrement total).
- **Solution** : L'IA joue le rôle de "lois de la physique économique" — offre/demande, rareté des ressources, logistique — plutôt que de suivre un script. Des garde-fous émergents plutôt que des limites artificielles.

### 5.6 Échelle de la carte

- **Problème** : Représenter le monde entier avec assez de détail pour être jouable, en temps réel, avec des tuiles générées procéduralement.
- **Solution** : Système de tuiles multi-résolution (zoom niveaux). Données d'élévation et de terrain réelles (SRTM, Natural Earth) converties en tuiles de jeu. Génération à la demande, cache agressif.

### 5.7 Onboarding d'un nouveau joueur dans un monde avancé

- **Problème** : Un joueur qui rejoint un monde en l'an 1347 doit comprendre 347 ans d'histoire divergente.
- **Solution** : L'IA génère un résumé narratif de l'histoire du monde et de la nation choisie. Le joueur reçoit un "briefing historique" adapté à sa lignée.

---

## 6. Stack technique (proposition)

### 6.1 Architecture globale

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Client     │◄───►│  API Server  │◄───►│   AI Engine  │
│  (Frontend)  │     │  (Backend)   │     │  (Simulation)│
└──────────────┘     └──────┬───────┘     └──────┬───────┘
                            │                     │
                     ┌──────▼───────┐     ┌──────▼───────┐
                     │  Game State  │     │  Historical  │
                     │   Database   │     │   Dataset    │
                     └──────────────┘     └──────────────┘
```

### 6.2 Frontend (Client)

| Composant            | Technologie proposée                     | Justification                                                                          |
| -------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------- |
| **Framework UI**     | React + TypeScript / React Native (Expo) | Web + mobile avec codebase partagée maximale                                           |
| **Rendu carte**      | PixiJS ou Phaser 3 (WebGL/WebGPU)        | Rendu 2D performant pour les tuiles de carte, compatible mobile via react-native-webgl |
| **Carte / Tuiles**   | Custom tile engine sur WebGL             | Contrôle total sur le rendu, LOD, zoom                                                 |
| **State management** | Zustand                                  | Léger, simple, fonctionne web + RN                                                     |
| **Communication**    | WebSocket (Socket.IO)                    | Temps réel pour le multijoueur                                                         |
| **Fallback moteur**  | Godot (export Web + iOS + Android)       | Plan B si les perfs WebGL sur mobile ne suffisent pas                                  |

> **Décision : Web + Mobile dès le départ.** Le web offre l'accessibilité immédiate, mais le mobile est essentiel pour la taille de la clientèle potentielle. La nature du jeu (décisions stratégiques, pas de réflexes temps-réel) se prête très bien au mobile. **Stratégie retenue** : codebase partagée avec React Native (mobile) + React (web), ou framework cross-platform comme Expo. Le moteur de carte (WebGL/Canvas) devra être compatible avec les deux. Si les performances graphiques deviennent un frein, migration vers Godot (qui exporte web + mobile nativement).

### 6.3 Backend (Server)

| Composant         | Technologie proposée         | Justification                                                      |
| ----------------- | ---------------------------- | ------------------------------------------------------------------ |
| **Langage**       | TypeScript (Node.js) ou Rust | TS pour la vélocité de dev, Rust pour la performance de simulation |
| **Framework API** | Fastify ou Hono              | Léger, rapide, WebSocket natif                                     |
| **WebSocket**     | Socket.IO ou ws              | Communication temps réel                                           |
| **Job Queue**     | BullMQ (Redis)               | Simulation asynchrone, ticks de jeu                                |
| **Auth**          | JWT + sessions persistantes  | Multi-device, reconnexion                                          |

### 6.4 Base de données

| Composant               | Technologie proposée                                    | Justification                                                |
| ----------------------- | ------------------------------------------------------- | ------------------------------------------------------------ |
| **Game State**          | PostgreSQL + PostGIS                                    | Données relationnelles + requêtes géospatiales pour la carte |
| **Cache / Temps réel**  | Redis                                                   | State temporaire, pub/sub entre serveurs, files d'attente    |
| **Données historiques** | PostgreSQL (tables dédiées) ou fichiers JSON structurés | Le snapshot An 1000 est en lecture seule, peut être statique |
| **Sauvegarde monde**    | PostgreSQL + snapshots périodiques                      | Chaque monde est une instance avec son propre état           |

### 6.5 Moteur IA

| Composant                       | Technologie proposée                          | Justification                                                  |
| ------------------------------- | --------------------------------------------- | -------------------------------------------------------------- |
| **LLM (narration & décisions)** | API OpenAI / Anthropic / modèle local (Llama) | Génération de choix contextuels, narration, résumés            |
| **Simulation**                  | Moteur custom (TS ou Rust)                    | Logique de simulation : économie, population, tech, diplomatie |
| **Arbre technologique**         | Graphe orienté acyclique (DAG)                | Dépendances technologiques explicites                          |
| **Simulation économique**       | Agent-based modeling                          | Chaque nation est un agent avec des règles économiques         |

> **Point critique** : Le LLM ne doit PAS être le moteur de simulation. Il intervient pour la narration, les choix, et les résumés. La simulation doit être déterministe et performante (code custom).

### 6.6 Carte & Géographie

| Composant                | Source / Tech                 | Justification                                   |
| ------------------------ | ----------------------------- | ----------------------------------------------- |
| **Données d'élévation**  | SRTM / ETOPO                  | Terrain réaliste du monde réel                  |
| **Données vectorielles** | Natural Earth                 | Côtes, rivières, lacs                           |
| **Génération de tuiles** | Pipeline custom               | Conversion des données réelles en tuiles de jeu |
| **Format de tuiles**     | Tuiles hexagonales ou carrées | Hex recommandé pour le gameplay stratégique     |

### 6.7 Infrastructure

| Composant            | Technologie proposée                                           |
| -------------------- | -------------------------------------------------------------- |
| **Hébergement**      | VPS (Hetzner/OVH) ou cloud (AWS/GCP)                           |
| **Conteneurisation** | Docker + Docker Compose (dev), Kubernetes (prod si nécessaire) |
| **CI/CD**            | GitHub Actions                                                 |
| **Monitoring**       | Prometheus + Grafana                                           |
| **Logs**             | Structure logging (pino) → agrégation centralisée              |

### 6.8 Monorepo

```
ory/
├── docs/                    # Documentation
├── packages/
│   ├── client/              # Frontend (React/Phaser)
│   ├── server/              # Backend API + WebSocket
│   ├── simulation/          # Moteur de simulation (IA core)
│   ├── historical-data/     # Dataset An 1000
│   ├── map-engine/          # Génération et rendu de tuiles
│   └── shared/              # Types et utilitaires partagés
├── tools/                   # Scripts, seeders, générateurs
└── infrastructure/          # Docker, configs, déploiement
```

---

## 7. Prochaines étapes immédiates

1. **Valider ce document** — Discussion ouverte sur les choix et les priorités
2. **Construire le modèle de données du snapshot An 1000** — Définir les schemas (types, interfaces) pour chaque dimension
3. **Recherche & compilation des données historiques** — Sources à exploiter :
   - Wikipedia (vue d'ensemble)
   - Données académiques (démographie historique, Angus Maddison pour la population/économie)
   - Natural Earth (géographie)
   - SRTM (élévation)
4. **Prototype de carte** — Afficher le monde en tuiles basiques avec terrain réel
5. **Prototype de simulation** — Un tick de jeu : une nation, une décision, une conséquence

---

## 8. Décisions validées

- [x] **Plateforme** : Web + Mobile dès le départ
- [x] **Time ratio** : Universel par monde — tous les joueurs à la même date, ratio déterminé par l'état global de tous les joueurs (5.4)
- [x] **Données historiques** : Sources mixtes + interpolation, cohérence > précision (5.1)
- [x] **Arbre tech** : Graphe de dépendances basé sur la physique/logique, pas la chronologie (5.3)
- [x] **Économie** : Lois émergentes (offre/demande, rareté) plutôt que script historique (5.5)
- [x] **Carte** : Tuiles multi-résolution, données réelles, génération à la demande (5.6)
- [x] **Onboarding** : Briefing narratif généré par l'IA pour les nouveaux joueurs (5.7)
- [x] **Architecture IA** : Deux rôles — Compagnon (per-player) + Grand Maître (per-world) (5.2)
- [x] **Style graphique** : Hybride Carto + Low-Poly — carte politique/physique en zoom arrière, relief semi-carto en zoom moyen, low-poly simplifié en zoom ville/local (inspiré Humankind / Old World)
- [x] **Équipe** : Solo dev + IA assistée (pour le moment)
- [x] **Modèle économique** : Hybride F2P + abonnement premium + packages in-game (voir détails ci-dessous)
- [x] **Scope** : Monde entier dès le départ — essentiel pour que chaque joueur puisse choisir sa nation
- [x] **Persistance** : Un monde vit tant qu'il y a des joueurs, pas de fin déterminée (peut dépasser 2026+). Archivage des mondes morts → possibilité de forker un monde archivé à un moment donné pour en créer un nouveau.
- [x] **Capacité** : Pas de limite fixe — les joueurs remplissent les nations disponibles, NPC pour les nations restantes

## 9. Monétisation — Détail du modèle hybride

### 9.1 Free-to-Play (base gratuite)

- Accès complet au gameplay de base
- Rejoindre ou créer un monde
- Toutes les nations accessibles
- IA Compagnon standard

### 9.2 Abonnement Premium

- **Avantages possibles** (à équilibrer) :
  - Mondes simultanés illimités (F2P = 1 ou 2)
  - Statistiques détaillées et chroniques avancées de sa lignée
  - IA Compagnon enrichie (narration plus détaillée, plus d'options de choix, briefings plus profonds)
  - Accès prioritaire aux serveurs en cas de charge
  - Personnalisation avancée (blasons, portraits de lignée, cosmétiques exclusifs)

### 9.3 Packages in-game (achats ponctuels)

- **Strictement cosmétiques et non pay-to-win** :
  - Packs de portraits / apparences de personnages
  - Thèmes de carte (parchemin ancien, carte moderne, fantaisie)
  - Décorations de villes et bâtiments (purement visuelles)
  - Blasons et bannières personnalisés
  - Effets visuels (animations de frontières, particules météo)
- **Narratifs** (non compétitifs) :
  - Chroniques illustrées de sa lignée (généré par l'IA, format "livre")
  - Export de l'histoire de son monde en format consultable
- **Utilitaires** :
  - Slot de monde supplémentaire (pour F2P)
  - Fork d'un monde archivé (gratuit pour premium, payant pour F2P)

> **Règle absolue** : Aucun achat ne doit donner un avantage stratégique, militaire, économique ou technologique. Le jeu reste équitable pour tous.

### 9.4 Coût IA — Justification du modèle

Le LLM consomme des tokens à chaque interaction joueur. Le modèle hybride permet de :

- Couvrir le coût IA de base via l'abonnement premium
- Les joueurs F2P génèrent moins de coût (IA Compagnon standard, moins de narration)
- Les packages ponctuels absorbent les pics de coût (fork de monde, chroniques générées)

## 10. Persistance & Fork de mondes — Détail

### 10.1 Monde actif

- Tant qu'au moins 1 joueur est actif, le monde vit
- Le Grand Maître continue de faire évoluer les NPC même si certains joueurs sont inactifs
- Pas de fin prédéterminée — l'an 3000, 5000 ou au-delà est possible

### 10.2 Monde inactif

- **6 mois** d'inactivité totale (aucun joueur connecté) → le monde est **gelé/archivé**
- **2 ans** après l'archivage sans qu'aucun joueur ne le consulte ou le fork → **suppression définitive**
- Un monde gelé conserve son état complet — il peut être réactivé si un joueur revient avant la suppression
- Les joueurs reçoivent une notification avant le gel (email/push) et avant la suppression

### 10.3 Archivage & Fork

- Un monde archivé devient une **chronique consultable** : timeline, nations, événements majeurs, lignées
- N'importe quel joueur peut **forker un monde archivé** à n'importe quel point de son histoire
- **Fork gratuit pour les abonnés premium**, payant (package ponctuel) pour les joueurs F2P
- Le fork crée un nouveau monde identique à l'état du monde original à la date choisie
- Les lignées de joueurs dans le fork deviennent des NPC (sauf si des joueurs les reprennent)
- Fork de mondes actifs : **non** (pour éviter la duplication de mondes vivants) — uniquement sur archives

## 11. Questions ouvertes

_(Toutes les questions précédentes ont été résolues. Nouvelles questions à mesure que le développement avance.)_

- **Mécaniques intra-nation** : Comment résoudre les conflits entre joueurs d'une même nation ? Vote pondéré ? Système de rang ? Le joueur le plus haut placé tranche ?
- **Limite de lignées par nation** : Faut-il limiter le nombre de joueurs dans une même nation pour éviter la surpopulation de lignées ?

---

_Document vivant — sera mis à jour au fur et à mesure des discussions et décisions._
