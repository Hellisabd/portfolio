# CLAUDE.md — Portfolio « Radar »

Ce fichier est la ligne directrice du projet. Lis-le entièrement avant toute tâche et respecte-le à chaque modification. En cas de doute entre une demande ponctuelle et ces règles, demande-moi avant d'agir.

## Contexte

Projet Epitech (Pre-Master of Science) : le CV / portfolio en ligne de **Basile Grosjean**, développeur C/C++ systèmes et back-end, diplômé de l'École 42, en recherche d'alternance à partir de janvier 2027. Le projet est noté sur les critères suivants (non négociables) :

1. Code propre et bien structuré.
2. Séparation claire entre HTML et CSS.
3. HTML valide (le validateur W3C ne doit renvoyer aucune erreur).
4. Effets : transitions et animations.
5. Éléments interactifs.
6. Un formulaire de contact.
7. Design responsive.
8. Design attrayant.

Délai : 4 jours. Je dois comprendre et pouvoir expliquer chaque ligne en soutenance : privilégie un code lisible et commenté aux endroits non évidents plutôt qu'un code astucieux.

## Concept

Un portfolio au thème spatial **sérieux**, inspiré des écrans de contrôle et de détection. L'interface est sobre et lisible, avec **un seul élément spectaculaire : le radar des missions**.

- **Chaque projet est un contact détecté par le radar**, et sa position a un sens :
  - le **secteur** (relèvement) indique la techno : C (000–090°), C++ (090–180°), Web / infra (180–270°), Embarqué (270–360°) ;
  - la **distance** au centre indique l'avancement dans le cursus : R2 près du centre (premiers projets), R6 au bord (projet final), l'horizon pour le projet en cours.
- **Les projets sont des missions** (`MSN-001` à `MSN-009`) avec un statut (`CONFIRMÉ`, `NON CONFIRMÉ`, `EN APPROCHE`), une description (problème, solution, décision technique clé) et trois métriques factuelles.
- **Le parcours est un journal de bord** au format log ; **le contact est un canal de transmission**.
- Clin d'œil discret au *Guide du voyageur galactique* et au nombre 42 : l'horloge de mission, l'easter egg.

**Le document de référence visuelle est `DA-portfolio-radar.md`** (palette, typographie, construction du radar, structure, mouvement, contenu). Ce fichier-ci dit comment construire ; la DA dit à quoi ça ressemble. En cas de conflit, demande-moi.

Les maquettes de référence sont dans le canvas de design, section « DA retenue — Radar » : « Radar — mobile » (**référence principale**) et « Radar — desktop ».

### Sections de la page (dans l'ordre)

1. **Header** : `B.GROSJEAN // SYS-01` + menu (mobile) ; `BASILE GROSJEAN // SYS-01` + nav numérotée `01 Missions  02 Systèmes  03 Journal  04 Contact` + `● BALAYAGE ACTIF  T+ hh:mm:ss` (desktop).
2. **Hero** : surtitre, H1 « J'aime comprendre ce qui se passe sous le capot. », présentation, boutons `VOIR LES MISSIONS →` et `CV.PDF ↓`, puis le radar (décoratif en mobile, interactif en desktop).
3. **Bande télémétrie** : LANGAGES · INFRA · RÉSEAU · STATUT.
4. `#missions` — **01 Missions** : liste en accordéon groupée par secteur (mobile) ou grille de 9 cartes (desktop), puis la mission `MSN-009` hors portée (l'alternance).
5. `#systemes` — **02 Systèmes à bord** : inventaire des compétences.
6. `#journal` — **03 Journal de bord** : parcours au format log, puis « Hors mission ».
7. `#contact` — **04 Canal ouvert** : liens + formulaire de transmission.
8. **Footer** : statut, copyright, poids de la page, `[ NE PAS APPUYER ]`.

## Mobile first

**Le site est conçu d'abord pour un téléphone de 390px de large**, puis enrichi pour les écrans plus grands. Les styles de base du SCSS sont ceux du mobile ; les media queries ne font qu'**ajouter** de la mise en page (`min-width`), jamais l'inverse.

### Points de rupture

| Nom | Largeur | Mise en page |
|---|---|---|
| base | < 768px | une colonne, marges 24px, radar décoratif, missions en liste |
| `md` | ≥ 768px | marges 48px, radar décoratif plus grand, missions en liste |
| `lg` | ≥ 1200px | marges 80px, conteneur max 1440px, radar interactif + grille de cartes |

### Règle clé : sur mobile, le radar est purement visuel

- Sur mobile et tablette, le radar est **décoratif** : `aria-hidden="true"`, pas d'étiquettes, pas de relèvements, aucun élément cliquable. Il sert l'ambiance, pas la navigation.
- **Les projets passent directement par la liste** de la section 01 : accordéon groupé par secteur (`SECTEUR C · 4 missions`), lignes de 64px (point de statut, nom, identifiant, statut, `+`), une seule ligne dépliée à la fois, `aria-expanded` sur chaque bouton. Une ligne dépliée affiche description, 3 métriques, tags et `RAPPORT →`.
- En `lg` seulement, le radar devient interactif (contacts cliquables, verrouillage, panneau d'info) et la liste devient une grille de cartes.

### Autres adaptations

- **Header** : 56px et bouton `[ MENU ]` (menu plein écran, Échap pour fermer, focus piégé, `aria-expanded`) ; en `lg`, navigation en ligne.
- **Hero** : H1 36px → 60px (`clamp()`), boutons pleine largeur empilés ; en `lg`, deux colonnes (texte + légende de lecture à gauche, radar à droite).
- **Télémétrie** : 2×2 → 4 cellules.
- **Inventaire et journal** : label au-dessus de la valeur → grilles en colonnes.
- **Contact** : une colonne → liens à gauche, formulaire à droite.

### Règles tactiles

- Toute cible tactile fait **au moins 44×44px**.
- Aucune information accessible uniquement au survol.
- Champs de formulaire en 16px minimum, `type="email"`, `autocomplete` renseigné.
- Pas de défilement horizontal de la page.
- Tests obligatoires à 360px, 390px, 768px et 1440px avant chaque commit touchant la mise en page.

## Direction artistique : Radar

La référence complète est `DA-portfolio-radar.md`. Résumé des règles à appliquer dans le code :

### Tokens

Toutes les valeurs vivent dans `src/scss/abstracts/_variables.scss`. Aucune couleur en dur ailleurs (le SVG du radar utilise des classes stylées en SCSS, pas de couleurs en attribut).

```scss
$bg:           #030B18;
$surface:      #07152A;
$grid:         #0A1A31;
$line:         #15294A;
$line-strong:  #23426F;
$text-title:   #EAF4FF;
$text:         #C8D8EE;
$text-muted:   #9DB2CF;
$label:        #7F97BA;
$accent:       #4FD8FF;  // cyan radar, seul accent
$accent-hover: #BDF2FF;
$radar-blue:   #2F8CFF;  // graduations
$radar-ring:   #1A3F78;  // anneaux de distance
$radar-spoke:  #0F2B55;  // rayons
$radar-bezel:  #0C2448;  // lunette
$radar-core:   #0B2A55;  // centre du dégradé du cadran
$radar-axis:   #2A5CA0;  // rayons des 4 axes
$radar-label:  #5F87C4;  // relèvements de la lunette
$radar-dot:    #FFFFFF;  // contacts
```

Typographies : **IBM Plex Mono** (titres, labels, données, boutons, radar) et **IBM Plex Sans** (paragraphes). Aucune autre.

### Règle des deux mondes

- **Le radar** a le droit à ce qui est interdit ailleurs : dégradé radial du cadran, lueur (`drop-shadow`) sur l'arc d'horizon, le faisceau et les contacts.
- **Tout le reste** est sobre : traits 1px, angles droits, aucun dégradé, aucune lueur, aucune ombre portée, grille de fond 48px.

### Construction du radar

- Un seul SVG inline (`viewBox="0 0 700 700"`, centre 350), écrit directement dans `index.html` (pas de fichier séparé ni de plugin : le contenu reste dans le HTML et passe par le validateur), suivant les 8 couches décrites dans la DA (cadran, lunette, arc d'horizon, rayons, anneaux, faisceau, contacts, centre).
- Position d'un contact : `x = 350 + r·sin(relèvement)`, `y = 350 − r·cos(relèvement)`, avec les relèvements et distances du tableau des missions.
- **Faisceau** : un élément HTML superposé au SVG, en `conic-gradient` qui tourne via `@keyframes` (un tour en 6 s). Pas de canvas, pas de requestAnimationFrame.
- **Rémanence** : chaque contact a la même animation d'opacité (6 s) avec un `animation-delay` calculé depuis son relèvement (`relèvement / 360 × 6s`), pour s'allumer au passage du faisceau. Comme les attributs `style` sont interdits dans le HTML, chaque contact porte une classe dédiée (ex. `.radar__contact--msn-005`) et son délai est défini dans le SCSS, généré par une boucle `@each` sur une map `$contacts: (msn-005: 128, …)`.
- Version mobile : même SVG, étiquettes et relèvements masqués en CSS, `aria-hidden="true"`, contacts non focusables (`tabindex="-1"`). C'est l'état écrit dans le HTML (mobile first, et la page reste correcte sans JS).
- Version desktop : chaque contact est un `<a href="#msn-00x">` dans le SVG, avec `aria-label` complet. Le module `radarLock` écoute `matchMedia('(min-width: 75em)')` : en `lg` il retire `aria-hidden` et les `tabindex="-1"`, et les remet en dessous. Survol / focus : crochets de visée + panneau « Cible verrouillée » + mise en évidence de la carte liée. Clic (ou Entrée) : le panneau se déroule en fiche du projet ; Échap, `[ FERMER ]` ou un second clic la replient. Trois niveaux de description, chaque texte n'existant qu'une fois dans le HTML : **résumé court** (une phrase, `<p class="radar__summary">` dans le panneau `info-msn-00x`, visible seulement fiche ouverte), **résumé moyen** (les deux paragraphes de la carte mission : problème, puis décision clé) et **description détaillée** (le README du dépôt, via `RAPPORT →`). La fiche copie métriques, tags et lien depuis la carte ; si la mission a un résumé court, elle ne recopie pas les paragraphes de la carte.

### Composants (hors radar)

- **Bouton principal** : fond cyan, texte `$bg`, mono 600 14px, 48px de haut, angles droits. **Secondaire** : contour 1px `$line-strong`.
- **Statuts** : pastille 8px + texte mono. `CONFIRMÉ` (cyan plein), `NON CONFIRMÉ` (contour cyan), `EN APPROCHE` (pointillés gris).
- **Ligne d'accordéon** (mobile) : `<button aria-expanded>` de 64px, contenu déplié avec métriques et `RAPPORT →`.
- **Carte mission** (desktop) : fond `$surface`, bordure 1px `$line`, 4 bandes (en-tête `MSN-00X · SECTEUR` + statut, corps, métriques, pied). Carte liée au contact verrouillé : bordure cyan. `MSN-009` : bordure en pointillés.
- **Champs** : fond `$bg`, bordure 1px `$line-strong`, focus cyan.

### Mouvement

- Balayage continu et rémanence des contacts (CSS pur).
- Contact non confirmé : clignotement lent.
- Verrouillage (desktop) : crochets qui se resserrent (200 ms), panneau en fondu.
- Accordéon (mobile) : ouverture en 200 ms.
- Horloge `T+`, apparition des sections au défilement (`IntersectionObserver`), statut du formulaire.
- Easter egg `[ NE PAS APPUYER ]` : console qui exécute pas à pas `strlen.bf`.
- `prefers-reduced-motion` : radar figé, contacts tous allumés, rien ne tourne ni ne clignote.

### Interdits visuels

Planètes, fusées, astronautes, mascottes, emojis. Lueur, dégradés et néons hors du radar. Champs d'étoiles, parallax. Coins arrondis (hors pastilles), ombres portées. Polices autres qu'IBM Plex. Chiffres inventés.

## Stack

- **Vite** : serveur de dev et build.
- **HTML sémantique** : `index.html` (le radar et les sections) et une page « rapport » par mission (`msn-00X.html`), exigées par le sujet (plusieurs pages distinctes, navigation cohérente).
- **SCSS** (paquet `sass`) : compilé par Vite.
- **JavaScript vanilla** en modules ES : aucune librairie d'animation, tout se fait en CSS et avec `IntersectionObserver`.
- **Formspree** : envoi du formulaire sans backend.
- **html-validate** : validation HTML en local.
- **Emscripten** (bonus) : so_long compilé en WebAssembly, jouable depuis le rapport de mission.

### Interdits techniques

- Pas de Tailwind ni de framework CSS utilitaire (viole la séparation HTML / CSS).
- Pas de React, Vue, Svelte ou autre framework JS.
- Pas de librairie d'animation ni de smooth scroll : le site doit rester léger, son poids est affiché dans le footer.
- Pas de nouvelle dépendance sans me demander d'abord, en justifiant le besoin.
- Pas de tracker, pas d'analytics.

## Architecture

```
portfolio/
├── CLAUDE.md
├── PLAN.md                  # roadmap à cocher
├── index.html
├── msn-001.html … msn-007.html   # pages « rapport » des missions (même en-tête, SCSS et JS que l'accueil)
├── game.html                # page du jeu so_long (chargée dans une iframe)
├── package.json
├── vite.config.js
├── scripts/
│   └── build-game.sh        # npm run build:game : compile so_long en WebAssembly
├── so_long/                 # dépôt so_long (git à part, ignoré), branche web
├── public/
│   ├── basile-grosjean-CV.pdf
│   ├── casts/               # enregistrements asciinema
│   └── games/so_long/       # build WebAssembly de so_long (.js, .wasm, .data)
└── src/
    ├── scss/
    │   ├── main.scss        # uniquement des @use
    │   ├── game.scss        # styles de game.html
    │   ├── abstracts/       # _variables, _mixins
    │   ├── base/            # _reset, _utilities, _typography, _grid-background
    │   ├── components/      # _button, _status, _radar, _contact-row, _mission-card, _field, _tag, _telemetry, _console, _game-window
    │   └── sections/        # _section, _header, _hero, _missions, _systems, _journal, _contact, _footer, _game
    └── js/
        ├── main.js          # point d'entrée : importe et initialise les modules
        ├── game.js          # page du jeu : charge so_long.js (Emscripten)
        └── modules/         # breakpoints, mobileMenu, missionClock, radarLock, contactAccordion, reveal, contactForm, easterEgg, gameWindow
```

## Conventions

### HTML
- Tout le contenu est écrit dans le HTML. Le JavaScript améliore l'expérience, il ne génère pas le contenu. La page doit rester lisible sans JS.
- Balises sémantiques : `header`, `nav`, `main`, `section` (avec titre), `ul`/`li` pour la liste des contacts, `article` par mission, `figure` + `figcaption` pour le radar, `footer`.
- **Aucun attribut `style`**, aucune balise `<style>`, aucun script inline.
- Chaque élément cliquable est un vrai `<button>` ou `<a href>`. Sur desktop, les contacts du radar sont des liens `<a>` dans le SVG, atteignables au clavier ; sur mobile ils ne sont pas focusables.
- Les pastilles et symboles de statut sont doublés d'un texte lisible par les lecteurs d'écran.
- Indentation de 2 espaces, attributs entre guillemets doubles.

### CSS / SCSS
- Nommage **BEM** : `.radar__contact`, `.contact-row__toggle`, `.mission-card--locked`.
- Un fichier partiel par composant ou section, importé via `@use` dans `main.scss`.
- **Mobile first** (voir la section dédiée) : styles de base pour mobile, puis `@include bp(md)` et `@include bp(lg)`, qui génèrent des media queries en `min-width` uniquement.
- Pas d'`!important`, pas de sélecteur d'ID pour le style, imbrication SCSS limitée à 3 niveaux.
- Unités relatives (`rem`, `%`, `clamp()`) pour les tailles et espacements.

### JavaScript
- Modules ES : un module = une responsabilité, chacun exporte une fonction `init…()` appelée dans `main.js`.
- Le JS manipule des classes (`is-visible`, `is-highlighted`) ; les styles restent dans le SCSS.
- Pas de variables globales. `const` par défaut.

### Formulaire de contact
- Champs : identifiant (nom ou entreprise), email, message (pas de champ objet). Validation HTML5 puis en JS avec messages d'erreur accessibles (`aria-live`).
- Envoi via `fetch` vers Formspree (identifiant du formulaire en constante dans `contactForm.js`, et dans l'attribut `action` du formulaire pour l'envoi sans JS).
- Champ piège anti-spam (honeypot) masqué.
- États : prêt, transmission, reçu, échec.

## Commandes

```bash
npm run dev        # serveur de développement
npm run build      # build de production dans dist/
npm run preview    # prévisualiser le build
npm run validate   # html-validate sur index.html, game.html et les pages msn-00X.html
npm run build:game # recompile so_long (Emscripten dans ~/emsdk) vers public/games/so_long/
```

## Méthode de travail

1. Avant une tâche importante, propose un plan court et attends ma validation.
2. Une fonctionnalité à la fois. Ne modifie pas de fichiers sans rapport avec la tâche en cours.
3. Après chaque étape : lance `npm run validate`, vérifie qu'il n'y a pas d'erreur dans la console, puis propose un message de commit (format : `feat:`, `fix:`, `style:`, `refactor:`, `docs:`).
4. Explique brièvement ce que tu as fait et pourquoi, pour que je puisse le reprendre en soutenance.
5. Suis `PLAN.md` et coche les tâches terminées.

## Priorités

1. **Cœur** (jours 1 à 3) : tout ce qui valide les 8 critères du sujet. Une version en ligne doit exister à la fin du jour 3.
2. **Bonus** (jour 4) : so_long jouable en WebAssembly depuis son rapport de mission ; pages « rapport » détaillées pour les missions.
3. **V2** (après le rendu) : portfolio servi par Webserv.

Ne commence jamais un bonus tant que le cœur n'est pas terminé et validé.

## Contenu

Le contenu de référence est le CV de Basile et son relevé de projets. **Ne jamais inventer d'information ni de chiffre** : une métrique inconnue devient un emplacement `[xx]`. Les métriques sont des faits vérifiables (taille d'équipe, nombre de commits, protocole, nombre de conteneurs…).

Le numéro de téléphone n'apparaît pas dans la page : seulement l'email, la zone géographique, LinkedIn, GitHub et le CV en PDF. Le CV PDF téléchargeable, lui, contient le numéro (choix assumé, pour garder un CV propre).

### Missions

| ID | Mission | Secteur | Relèvement | Distance | Statut | Métriques | Tags | Dépôt |
|---|---|---|---|---|---|---|---|---|
| MSN-001 | so_long | C | 028° | R2 | Confirmé | Rendu MLX42 · Validation flood fill · Démo jouable [bonus] | c, mlx42 | Hellisabd/so_long |
| MSN-002 | Philosophers | C | 052° | R3 | Confirmé | Threads 1 / philo · Synchro mutex · Temps gettimeofday | c, pthread | Hellisabd/Philosopher |
| MSN-003 | minishell | C | 014° | R3 | Confirmé | Builtins 7 · Signaux SIGINT, SIGQUIT · Équipe 2 | c, unix | Hellisabd/minishell |
| MSN-004 | Eyes-Cube | C | 072° | R4 | Confirmé | Rendu raycasting DDA · Équipe 2 · Bonus ennemis, portes | c, mlx42 | Hellisabd/Eyes-Cube |
| MSN-005 | Webserv | C++ | 128° | R5 | Confirmé | Protocole HTTP/1.1 · I/O poll · Durée 1,5 mois | c++, sockets, poll | Hellisabd/Webserv |
| MSN-006 | Inception | Web / infra | 205° | R5 | Confirmé | Conteneurs 3 · TLS 1.2 / 1.3 · Images from scratch | docker, nginx, mariadb | Hellisabd/Inception |
| MSN-007 | Transcendence Bubble-Pong | Web / infra | 242° | R6 | Confirmé | Équipe 4 · Commits 300+ · Temps réel WebSockets | typescript, fastify, sqlite | Hellisabd/Transcendence-Bubble-Pong |
| MSN-009 | Prochaine mission | — | — | hors portée | En approche | Début janv. 2027 · Rythme 4 / 2 sem. · Zone Grand Est | alternance | — |

Rayons des anneaux de distance (repère 700) : R2 = 70, R3 = 120, R4 = 170, R5 = 215, R6 = 255, horizon ≈ 282.

### Journal de bord

| Date | Code | Intitulé | Statut |
|---|---|---|---|
| 2021 – 2022 | UNIV-PSY | Licence de psychologie, 1re année | Terminé |
| 2023 – 2025 | 42-MULHOUSE | École 42 — certification | Certifié |
| 2026 – 2029 | EPITECH | Pre-Master of Science → Master of Science (RNCP 7) | En cours |
| 2027-01 | ALTERNANCE | Recherche d'une entreprise d'accueil | Recherche |

Hors mission : handball (6 ans), escalade (2 ans), volley-ball, mythologie / fantasy / SF, jeux vidéo, jeux de société.

### Liens

- Email : basile.grosjean@outlook.fr
- GitHub : https://github.com/Hellisabd
- LinkedIn : https://www.linkedin.com/in/basile-grosjean-60b69a280/
- Easter egg : https://github.com/Hellisabd/strlen.bf
