# Portfolio « Radar »

Portfolio en ligne de **Basile Grosjean**, développeur C/C++ systèmes et back-end, diplômé de l'École 42, en recherche d'alternance à partir de janvier 2027.

Projet Epitech (Pre-Master of Science, module T-ENT-500).

## Concept

Une interface de contrôle spatiale, sobre et lisible, avec un seul élément spectaculaire : **le radar des missions**.

- Chaque projet est un **contact détecté par le radar** (`MSN-001` à `MSN-009`).
- Le **secteur** (relèvement) indique la techno : C, C++, Web / infra, Embarqué.
- La **distance** au centre indique l'avancement dans le cursus : les premiers projets près du centre, le projet en cours à l'horizon.
- Le parcours est un **journal de bord** au format log ; le contact est un **canal de transmission**.

La direction artistique est détaillée dans [`DA-portfolio-radar.md`](DA-portfolio-radar.md), les règles de construction dans [`CLAUDE.md`](CLAUDE.md) et la roadmap dans [`PLAN.md`](PLAN.md).

## Fonctionnalités

- Radar SVG inline avec faisceau qui tourne et rémanence des contacts, en CSS pur.
- Mobile first : radar décoratif et missions en accordéon sur téléphone ; radar interactif (verrouillage de cible, fiche projet) et grille de cartes sur grand écran (≥ 1200px).
- Menu plein écran accessible (Échap, focus piégé, `aria-expanded`).
- Horloge de mission `T+`, apparition des sections au défilement (`IntersectionObserver`).
- Formulaire de contact avec validation accessible, honeypot anti-spam et envoi via Formspree.
- Easter egg `[ NE PAS APPUYER ]` : une console qui exécute pas à pas `strlen.bf`.
- Bonus : **so_long** compilé en WebAssembly (Emscripten), jouable depuis la mission `MSN-001`.
- Respect de `prefers-reduced-motion`, aucune information accessible seulement au survol, cibles tactiles ≥ 44px.

## Stack

| Rôle | Outil |
|---|---|
| Build et serveur de dev | [Vite](https://vite.dev) |
| Structure | HTML sémantique (un seul `index.html`) |
| Styles | SCSS (`sass`), nommage BEM, mobile first |
| Interactions | JavaScript vanilla, modules ES |
| Formulaire | Formspree (sans backend) |
| Validation | `html-validate` |
| Bonus | Emscripten (so_long en WebAssembly) |

Aucun framework CSS ou JS, aucune librairie d'animation, aucun tracker.

## Démarrage

Prérequis : Node.js et npm.

```bash
npm install
npm run dev        # serveur de développement
npm run build      # build de production dans dist/
npm run preview    # prévisualiser le build
npm run validate   # html-validate sur index.html et game.html
npm run build:game # recompile so_long en WebAssembly (nécessite Emscripten dans ~/emsdk)
```

`build:game` n'est utile que pour régénérer le jeu : le build déjà compilé est dans `public/games/so_long/`.

## Structure

```
.
├── index.html            # toute la page, contenu inclus
├── game.html             # page du jeu so_long (chargée dans une iframe)
├── public/               # CV PDF, favicon, build WebAssembly de so_long
├── scripts/              # build-game.sh
└── src/
    ├── scss/
    │   ├── main.scss     # uniquement des @use
    │   ├── abstracts/    # variables (tokens), mixins (breakpoints)
    │   ├── base/         # reset, typographie, grille de fond
    │   ├── components/   # bouton, statut, radar, carte mission, champ, console…
    │   └── sections/     # header, hero, missions, systèmes, journal, contact, footer
    └── js/
        ├── main.js       # point d'entrée
        └── modules/      # un module = une responsabilité (radarLock, mobileMenu, contactForm…)
```

## Points de rupture

| Nom | Largeur | Mise en page |
|---|---|---|
| base | < 768px | une colonne, radar décoratif, missions en liste |
| `md` | ≥ 768px | marges plus larges, radar plus grand |
| `lg` | ≥ 1200px | radar interactif, grille de 9 cartes |

## Liens

- GitHub : <https://github.com/Hellisabd>
- LinkedIn : <https://www.linkedin.com/in/basile-grosjean-60b69a280/>
- Contact : basile.grosjean@outlook.fr
