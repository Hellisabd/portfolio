# PLAN.md — Portfolio « Radar »

Roadmap à cocher. Une tâche = un commit. Après chaque tâche : `npm run validate`, console sans erreur, tests à 360 / 390 / 768 / 1440px si la mise en page change.

## Décisions prises

- [x] Formulaire : pas de champ objet (identifiant, email, message).
- [x] Header desktop : `BASILE GROSJEAN // SYS-01` (la DA fait foi).
- [x] Tokens ajoutés : `$radar-axis`, `$radar-label`, `$radar-dot`.
- [x] SVG du radar écrit directement dans `index.html`, sans plugin.
- [x] Bascule radar décoratif / interactif par `matchMedia` dans `radarLock`.

## Jour 1 — Socle et structure

- [x] Initialiser le projet Vite, installer `sass` et `html-validate`, scripts `dev`, `build`, `preview`, `validate`.
- [x] Créer l'arborescence `src/scss` (abstracts, base, components, sections) et `src/js/modules`.
- [x] `_variables.scss` (tokens), `_mixins.scss` (`bp(md)`, `bp(lg)` en `min-width`).
- [x] Base : `_reset`, `_typography` (IBM Plex Mono + Sans), `_grid-background` (grille 48px).
- [x] `index.html` complet et sémantique, tout le contenu réel (header, hero, télémétrie, missions, systèmes, journal, contact, footer), sans style.
- [x] Validation HTML à zéro erreur.

## Jour 2 — Mise en page mobile first + radar

- [x] Composants : `_button`, `_status`, `_tag`, `_field`, `_telemetry`.
- [x] Sections mobiles : header 56px, hero, télémétrie 2×2, liste des missions en accordéon, systèmes, journal, contact, footer.
- [x] Adaptations `md` puis `lg` (grille de 9 cartes, deux colonnes du hero, contact en deux colonnes).
- [x] Radar SVG : les 8 couches (cadran, lunette, horizon, rayons, anneaux, contacts, centre), positions calculées depuis le tableau des missions.
- [x] Faisceau en `conic-gradient` qui tourne (6 s) + rémanence des contacts (map `$contacts` + `@each`).
- [x] Contact non confirmé qui clignote ; `prefers-reduced-motion`.

## Jour 3 — Interactions + mise en ligne

- [x] `mobileMenu` : menu plein écran, Échap, focus piégé, `aria-expanded`.
- [x] `contactAccordion` : une seule ligne ouverte, 200 ms, `aria-expanded`.
- [x] `radarLock` (lg) : bascule décoratif / interactif via `matchMedia` (`aria-hidden`, `tabindex`), crochets de visée, panneau « Cible verrouillée », carte mise en évidence.
- [x] `missionClock` : horloge `T+`.
- [x] `reveal` : apparition des sections avec `IntersectionObserver`.
- [x] `contactForm` : validation, honeypot, envoi Formspree, états prêt / transmission / reçu / échec, `aria-live`.
- [x] `easterEgg` : console `[ NE PAS APPUYER ]` qui exécute `strlen.bf` pas à pas.
- [x] Tests 360 / 390 / 768 / 1440px, navigation clavier.
- [ ] Validation sur validator.w3.org.
- [x] Build de production ; poids de la page et hash de build dans le footer (plugin dans `vite.config.js`).
- [ ] Mise en ligne (hébergeur à choisir).

## Contenu à fournir

- [x] Clic sur un point du radar (desktop) : fiche du projet déroulée dans le panneau.
- [ ] Détailler ensemble le contenu des fiches projets (cartes des missions).
- [ ] Décision clé : Philosophers, Inception, AirQuality.
- [ ] Phase actuelle d'AirQuality (`[x] / 8`).
- [ ] Identifiant Formspree (`contactForm.js` + attribut `action` du formulaire).

## Jour 4 — Bonus (seulement si le cœur est validé)

- [ ] so_long compilé en WebAssembly (Emscripten), jouable depuis le rapport de MSN-001.
- [ ] Pages « rapport » détaillées pour les missions.

## V2 (après le rendu)

- [ ] Portfolio servi par Webserv.
- [ ] Avancement d'AirQuality mis à jour au fil des phases.
