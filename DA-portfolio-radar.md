# DA — Portfolio « Radar »

Direction artistique du portfolio de **Basile Grosjean**, développeur C/C++ **systèmes & back-end**. Thème spatial **sérieux** inspiré des écrans de contrôle et de détection : une interface sobre et lisible, avec **un seul élément spectaculaire, le radar des missions**.

> **Pour une autre conversation :** colle ce fichier et demande par exemple « Construis la page d'accueil en HTML/CSS en respectant strictement cette DA ». Le site est **mobile first** : commence toujours par la version 390px.

---

## 1. Intention

- **Le radar est la pièce centrale** : chaque projet est un contact détecté, et sa position a un sens (secteur = techno, distance = avancement dans le cursus).
- **Tout le reste est sobre** : structure claire, traits fins, typographie mono. Le radar est le seul endroit où l'on s'autorise lueur et dégradés.
- Les projets sont présentés comme des **missions** avec un statut et des **métriques factuelles**.
- Le site est **léger** (poids affiché dans le footer) et **conçu d'abord pour le téléphone**.
- Clin d'œil discret au *Guide du voyageur galactique* : l'horloge de mission, l'easter egg.

## 2. Palette

| Rôle | Hex |
|---|---|
| Fond | `#030B18` |
| Surface (cartes, bandes, formulaire) | `#07152A` |
| Lignes de grille de fond | `#0A1A31` |
| Bordures / séparateurs | `#15294A` |
| Bordures fortes / boutons secondaires | `#23426F` |
| Texte principal / titres / valeurs | `#EAF4FF` |
| Texte courant | `#C8D8EE` |
| Texte secondaire (paragraphes) | `#9DB2CF` |
| Labels / légendes | `#7F97BA` |
| **Accent signal (cyan radar)** | `#4FD8FF` (hover `#BDF2FF`) |
| Bleu radar (graduations, anneaux) | `#2F8CFF` · `#1A3F78` · `#0F2B55` |
| Contacts (points) | `#FFFFFF` avec halo cyan |

**Un seul accent : le cyan.** Hors du radar, pas de dégradé ni de lueur.

## 3. Typographie

- **IBM Plex Mono** (400, 500, 600) : titres, navigation, labels, données, boutons, tags, textes du radar.
- **IBM Plex Sans** (400, 500, 600) : paragraphes uniquement.
- Google Fonts : `family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600`

| Élément | Police | Mobile → desktop | Détails |
|---|---|---|---|
| H1 hero | Mono 500 | 36px → 60px | line-height 1.08, letter-spacing -0.02em |
| H2 section | Mono 500 | 28px → 40px | numéro de section en cyan (`01`, `02`…) |
| H3 carte | Mono 500 | 16–20px → 21px | |
| Paragraphe | Sans 400 | 15–16px → 16–19px | line-height 1.6, `#9DB2CF` |
| Label / surtitre | Mono | 10–12px → 11–13px | MAJUSCULES, letter-spacing 0.12em |
| Valeur de métrique | Mono | 13px → 14–16px | `#EAF4FF` |
| Champ de formulaire | Sans | 16px minimum | évite le zoom automatique sur iOS |

## 4. Le radar des missions (FIG.01)

### Construction (SVG inline, repère 700×700, centre 350)

1. **Fond du cadran** : disque de rayon 300, dégradé radial du bleu nuit `#0B2A55` au centre vers le fond.
2. **Lunette** : anneau épais `#0C2448`, graduations tous les 3°, graduations longues `#2F8CFF` tous les 15°, avec les relèvements `000` à `345` en mono 12px `#5F87C4` (desktop uniquement).
3. **Arc d'horizon** : cercle de rayon 292, dont un grand arc cyan épais et lumineux (de 210° à 60°), le reste en bleu sombre.
4. **Rayons** tous les 15° (`#0F2B55`), plus marqués aux 4 axes (`#2A5CA0`).
5. **Anneaux de distance** R2 à R6 (`#1A3F78`), étiquetés en mono 10px.
6. **Faisceau de balayage** : secteur cyan qui s'estompe vers l'arrière (≈ 48°), bord d'attaque en trait clair lumineux.
7. **Contacts** : point blanc de 4,5px avec halo cyan ; leur intensité dépend du temps écoulé depuis le passage du faisceau (rémanence).
8. **Centre** : point lumineux + `BASILE`.

### Ce que signifie une position

- **Secteur (relèvement) = techno** : C (000–090), C++ (090–180), Web / infra (180–270), Embarqué (270–360). Nom du secteur en mono 12px dans le cadran.
- **Distance = avancement dans le cursus** : R2 au centre (premiers projets), R6 au bord (projet final), au-delà de R6 : l'horizon (projet en cours).
- **Statut** : `CONFIRMÉ` (point plein, projet validé), `NON CONFIRMÉ` (cercle en pointillés qui clignote, projet en cours), `EN APPROCHE` / `HORS PORTÉE` (la prochaine mission, l'alternance, qui n'est pas sur le radar).

### Desktop : radar interactif

- Étiquettes à côté de chaque contact : nom (13px, blanc) + identifiant (10px, gris).
- Survol ou focus clavier d'un contact : **crochets de visée** qui se resserrent autour, et **panneau « Cible verrouillée »** (nom, ID, relèvement, distance, statut, `RAPPORT →`). La carte correspondante dans la liste est mise en évidence.
- Clic : défilement jusqu'à la carte de la mission.
- Chaque contact est un vrai lien `<a>` dans le SVG, atteignable au Tab.

### Mobile : radar purement visuel

- Le radar est **décoratif** (`aria-hidden="true"`), sans étiquettes ni relèvements, en pleine largeur sous le hero, avec la ligne `BALAYAGE ACTIF · 8 MISSIONS · 7 CONFIRMÉES`.
- **Les projets passent directement par une liste** (section 01), jamais par le radar.

## 5. Motifs de l'interface (hors radar)

- **Grille de fond** 48×48px, lignes 1px `#0A1A31`.
- Traits fins **1px**, angles droits (pas de border-radius, sauf pastilles de statut).
- **Pastilles de statut** 8px + texte mono : `● CONFIRMÉ` (cyan plein), `◌ NON CONFIRMÉ` (contour cyan), `◌ EN APPROCHE` (pointillés gris). Dans le journal : `TERMINÉ`, `CERTIFIÉ`, `EN COURS`, `RECHERCHE`.
- **Horodatage** `T+ 00:42:17`, **identifiants** `SYS-01`, `MSN-001`, `MSG-001`, `FIG.01`.
- **Tags** entre crochets : `[c++] [sockets]`. Flèches textuelles `→`, `↓`.

## 6. Structure de la page

1. **Header**
   - Mobile (56px) : `B.GROSJEAN // SYS-01` · pastille cyan · `[ MENU ]` (menu plein écran : liens numérotés de 72px, CV, statut + horloge).
   - Desktop (72px) : `BASILE GROSJEAN // SYS-01` · nav `01 Missions  02 Systèmes  03 Journal  04 Contact` · `● BALAYAGE ACTIF  T+ 00:42:17`.
2. **Hero** : surtitre cyan, H1 « J'aime comprendre ce qui se passe sous le capot. », présentation, boutons `VOIR LES MISSIONS →` / `CV.PDF ↓`.
   - Mobile : texte, boutons pleine largeur, puis le radar visuel en pleine largeur.
   - Desktop : texte à gauche avec la légende de lecture (secteurs, distance, base), radar interactif à droite (700px) avec le panneau de verrouillage.
3. **Bande télémétrie** : LANGAGES · INFRA · RÉSEAU · STATUT (`● Disponible — janv. 2027`). 2×2 en mobile, 4 cellules en desktop.
4. **01 Missions**
   - **Mobile : liste en accordéon**, groupée par secteur (`SECTEUR C · 4 missions`…). Chaque ligne (64px) : point de statut, nom, identifiant, statut, `+`. Déplier une ligne affiche la description, les 3 métriques, les tags et `RAPPORT →`. Puis la carte en pointillés `MSN-009 · HORS PORTÉE — Prochaine mission : votre équipe ?`.
   - **Desktop : grille de cartes** (3 colonnes, 9 cartes), synchronisée avec le radar. Chaque carte : bandeau `MSN-00X · SECTEUR` + statut, titre, description (problème, solution, décision clé), 3 métriques, tags + `RAPPORT →`.
5. **02 Systèmes à bord** : inventaire en lignes (langages, systèmes, réseau, outils, langues).
6. **03 Journal de bord** : parcours au format log, puis `HORS MISSION` (centres d'intérêt).
7. **04 Canal ouvert** : H2 « Une équipe systèmes ou back-end à renforcer ? », liens MAIL / GITHUB / LINKEDIN / CV, formulaire de transmission (`MSG-001`) : identifiant, email, message, `TRANSMETTRE →`, statut `PRÊT` → `TRANSMISSION…` → `● REÇU`.
8. **Footer** : `● TOUS SYSTÈMES NOMINAUX` · `© 2026 BASILE GROSJEAN` · `PAGE [xx] kB · 0 TRACKER · BUILD [hash]` · `[ NE PAS APPUYER ]`.

### Mise en page

| Écran | Largeur | Marges | Missions |
|---|---|---|---|
| Mobile (base) | < 768px | 24px | liste en accordéon, radar décoratif |
| Tablette (`md`) | ≥ 768px | 48px | liste en accordéon, radar décoratif plus grand |
| Desktop (`lg`) | ≥ 1200px | 80px, conteneur max 1440px | radar interactif + grille de 3 colonnes |

Sections espacées de 64px en mobile, 120px en desktop. Media queries en `min-width` uniquement.

## 7. Mouvement

- **Balayage** : le faisceau tourne en continu (un tour en 6 s), en CSS pur (`conic-gradient` + `@keyframes rotate`).
- **Rémanence** : chaque contact s'illumine quand le faisceau passe dessus, puis s'estompe (animation d'opacité décalée selon son relèvement, même durée que le balayage : pas de JS nécessaire).
- **Contact non confirmé** : clignotement lent du cercle en pointillés.
- **Verrouillage** (desktop) : les crochets se resserrent en 200 ms, le panneau apparaît en fondu.
- **Accordéon** (mobile) : ouverture en hauteur + fondu, 200 ms.
- Horloge `T+`, apparition des sections au défilement par un fondu vertical, changement de statut du formulaire.
- **Easter egg** : `[ NE PAS APPUYER ]` ouvre une console qui exécute pas à pas un strlen écrit en Brainfuck.
- `prefers-reduced-motion` : radar figé, tous les contacts allumés, aucune rotation ni clignotement.

## 8. Règles

**À faire**
- Des faits réels et vérifiables, sinon un placeholder `[xx]`, jamais de valeurs inventées.
- HTML/CSS léger, sans framework ni librairie d'animation ; le radar en SVG + CSS.
- Le radar n'est **jamais le seul accès** à un projet : la liste (mobile) ou les cartes (desktop) contiennent tout.
- Contraste texte ≥ 4.5:1, vrais `<a>` / `<button>`, navigation au clavier, `aria-expanded` sur l'accordéon.
- Cibles tactiles d'au moins 44×44px ; aucune information accessible uniquement au survol.

**À éviter**
- Planètes, fusées, astronautes illustrés, mascottes, emojis.
- Lueur, dégradés et néons **en dehors du radar**.
- Champs d'étoiles animés, parallax.
- Inter, Roboto, Arial ; coins arrondis ; ombres portées.
- Numéro de téléphone sur le site.

## 9. Contenu

### Identité
- Basile Grosjean — développeur C/C++ systèmes & back-end.
- Diplômé de l'École 42 (Mulhouse), Pre-Master of Science à Epitech (titre RNCP niveau 7).
- Base : Strasbourg · Mulhouse · Belfort.
- Fenêtre : alternance janvier 2027 → septembre 2029, rythme 4 semaines en entreprise / 2 semaines à l'école.
- Intérêt : embarqué, énergie, environnement.

### Contacts (missions)

| ID | Mission | Secteur | Relèvement | Distance | Statut | Métriques | Tags |
|---|---|---|---|---|---|---|---|
| MSN-001 | so_long | C | 028° | R2 | Confirmé | Rendu MLX42 · Validation flood fill · Démo jouable [bonus] | c, mlx42 |
| MSN-002 | Philosophers | C | 052° | R3 | Confirmé | Threads 1 / philo · Synchro mutex · Temps gettimeofday | c, pthread |
| MSN-003 | minishell | C | 014° | R3 | Confirmé | Builtins 7 · Signaux SIGINT, SIGQUIT · Équipe 2 | c, unix |
| MSN-004 | Eyes-Cube | C | 072° | R4 | Confirmé | Rendu raycasting DDA · Équipe 2 · Bonus ennemis, portes | c, minilibx |
| MSN-005 | Webserv | C++ | 128° | R5 | Confirmé | Protocole HTTP/1.1 · I/O poll · Durée 1,5 mois | c++, sockets, poll |
| MSN-006 | Inception | Web / infra | 205° | R5 | Confirmé | Conteneurs 3 · TLS 1.2 / 1.3 · Images from scratch | docker, nginx, mariadb |
| MSN-007 | Transcendence Bubble-Pong | Web / infra | 242° | R6 | Confirmé | Équipe 4 · Commits 300+ · Temps réel WebSockets | typescript, fastify, sqlite |
| MSN-009 | Prochaine mission | — | — | hors portée | En approche | Début janv. 2027 · Rythme 4 / 2 sem. · Zone Grand Est | alternance |

### Systèmes à bord
- Langages : C · C++ · JavaScript · TypeScript
- Systèmes : UNIX · fork / exec / wait · signaux · descripteurs de fichiers · threads et mutex · gestion mémoire manuelle
- Réseau : sockets · HTTP/1.1 · API REST · WebSockets · poll, epoll
- Outils : Git · Docker · Node.js · Fastify · SQL · SQLite
- Langues : français natif · anglais B1, C1 en compréhension

### Journal de bord
| Date | Code | Intitulé | Statut |
|---|---|---|---|
| 2021 – 2022 | UNIV-PSY | Licence de psychologie, 1re année | Terminé |
| 2023 – 2025 | 42-MULHOUSE | École 42 — certification | Certifié |
| 2026 – 2029 | EPITECH | Pre-Master of Science → Master of Science | En cours |
| 2027-01 | ALTERNANCE | Recherche d'une entreprise d'accueil | Recherche |

Hors mission : handball (6 ans), escalade (2 ans), volley-ball, mythologie / fantasy / SF, jeux vidéo, jeux de société.

### Liens
- Email : basile.grosjean@outlook.fr
- GitHub : https://github.com/Hellisabd
- LinkedIn : https://www.linkedin.com/in/basile-grosjean-60b69a280/
- CV : `basile-grosjean-CV.pdf`
- Easter egg : https://github.com/Hellisabd/strlen.bf
