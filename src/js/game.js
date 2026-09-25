// Page du jeu so_long, chargée dans une iframe depuis la carte MSN-001.
// Le jeu est le code C d'origine compilé en WebAssembly (npm run build:game).

const canvas = document.getElementById('canvas');
const status = document.querySelector('.game__status');

// so_long.js est un fichier de public/ : on l'importe par son URL,
// relative à la page, pour que Vite ne tente pas de l'intégrer au bundle.
const moduleUrl = new URL('games/so_long/so_long.js', document.baseURI).href;

// Pendant la partie, le focus est dans cette iframe : Échap n'atteint pas la fenêtre
// du portfolio. On la prévient par un message (même origine uniquement).
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') window.parent.postMessage('so_long:close', window.location.origin);
});

import(/* @vite-ignore */ moduleUrl)
  .then(({ default: createSoLong }) => createSoLong({
    canvas,
    arguments: ['map/map_file.ber'],  // équivalent de ./so_long map/map_file.ber
    // Sans ça, so_long.data (assets + carte) serait cherché à la racine du site
    // au lieu d'à côté de so_long.js.
    locateFile: (file) => new URL(file, moduleUrl).href,
  }))
  .then(() => {
    status.hidden = true;
    canvas.focus();  // les touches W A S D vont au jeu
  })
  .catch(() => {
    status.textContent = 'Échec du chargement du jeu.';
  });
