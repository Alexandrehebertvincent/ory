# Scripts utilitaires

> Tous les scripts se trouvent dans le dossier `scripts/` à la racine du projet.
> Ils nécessitent [tsx](https://github.com/privatenumber/tsx) pour s'exécuter.

---

## Table des matières

| Script                       | Rôle                                                          |
| ---------------------------- | ------------------------------------------------------------- |
| `validateCrossReferences.ts` | Valide l'intégrité référentielle de tous les datasets         |
| `analyzeGraph.ts`            | Analyse le graphe de dépendances entre événements historiques |
| `generateDatasetDoc.ts`      | Génère la documentation Markdown du WorldSnapshot             |
| `generateDatasetHtml.ts`     | Génère la documentation HTML interactive du WorldSnapshot     |
| `debugEvent.ts`              | Utilitaire de debug pour inspecter un événement               |

---

## Prérequis

```bash
# tsx doit être disponible (installé globalement ou via npx)
npm install -g tsx
# OU utiliser npx devant chaque commande
```

---

## validateCrossReferences.ts

**Objectif** : Vérifie que toutes les références croisées entre datasets sont valides (intégrité référentielle complète du WorldSnapshot an 1000).

**Vérifications effectuées** :

- Doublons d'IDs dans chaque dataset
- Doublons de `nationId` dans les tables de mapping (nationReligions, nationTechnologies, etc.)
- Références FK : chaque `nationId`, `settlementId`, `religionId`, `technologyId`, etc. pointe bien vers une entité existante
- Couverture : chaque nation possède une entrée dans chaque mapping table

**Usage** :

```bash
npx tsx scripts/validateCrossReferences.ts
```

**Sortie** : rapport dans la console avec le nombre de vérifications effectuées, les erreurs (références cassées) et les warnings (couverture manquante, doublons).

> **Quand l'exécuter ?** Après toute modification d'un fichier seed, avant de commit.

---

## analyzeGraph.ts

**Objectif** : Analyse le graphe de dépendances entre `historicalEvents` en traçant les liens `requiredEventIds` et `triggerEventIds`.

**Informations produites** :

- **Stats** : nombre total d'événements, connectés, racines, feuilles, orphelins
- **Orphelins** : événements sans aucun lien (ni prérequis, ni dépendants)
- **Racines** : événements sans prérequis mais requis par d'autres
- **Feuilles** : événements ayant des prérequis mais dont personne ne dépend
- **Références cassées** : IDs référencés qui n'existent pas
- **Graphe complet** : liste chronologique de tous les événements avec leurs liens

**Usage** :

```bash
npx tsx scripts/analyzeGraph.ts
```

**Sortie** : rapport textuel dans la console, organisé par sections.

> **Quand l'exécuter ?** Pour visualiser la structure du graphe d'événements et identifier des événements isolés ou des chaînes de causalité cassées.

---

## generateDatasetDoc.ts

**Objectif** : Génère le fichier `docs/GAME_ORIGINAL_DATASET.md`, un document Markdown complet décrivant l'état du monde an 1000 (toutes les nations, colonies, religions, technologies, etc.) avec table des matières navigable.

**Usage** :

```bash
npx tsx scripts/generateDatasetDoc.ts
```

**Sortie** : écrit (ou écrase) le fichier `docs/GAME_ORIGINAL_DATASET.md`.

> **Quand l'exécuter ?** Après modification des données seed, pour régénérer la documentation Markdown à jour.

---

## generateDatasetHtml.ts

**Objectif** : Génère le fichier `docs/GAME_ORIGINAL_DATASET.html`, une page HTML autonome avec sidebar de navigation, barre de recherche et thème sombre. Contient les mêmes données que la version Markdown dans un format plus interactif.

**Usage** :

```bash
npx tsx scripts/generateDatasetHtml.ts
```

**Sortie** : écrit (ou écrase) le fichier `docs/GAME_ORIGINAL_DATASET.html`.

> **Quand l'exécuter ?** En complément de `generateDatasetDoc.ts`, pour la version navigable en navigateur.

---

## debugEvent.ts

**Objectif** : Utilitaire de debug rapide pour inspecter la structure d'un événement historique donné. Par défaut, cherche l'événement `evt_french_revolution`.

**Usage** :

```bash
npx tsx scripts/debugEvent.ts
```

**Sortie** : affiche les clés de l'objet, les `requiredEventIds` et un extrait JSON de l'événement.

> **Astuce** : Pour inspecter un autre événement, modifier la valeur de l'ID directement dans le script (variable dans le `find()`).

---

## Workflow recommandé

```
1.  Modifier les fichiers seed dans packages/historical-data/src/seed/
2.  npx tsx scripts/validateCrossReferences.ts   ← vérifier l'intégrité
3.  npx tsx scripts/analyzeGraph.ts               ← vérifier le graphe d'événements
4.  npx tsx scripts/generateDatasetDoc.ts         ← régénérer la doc MD
5.  npx tsx scripts/generateDatasetHtml.ts        ← régénérer la doc HTML
6.  Commit
```
