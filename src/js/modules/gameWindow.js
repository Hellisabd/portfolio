// Fenêtre de jeu so_long (MSN-001) : un <dialog> qui contient une iframe vers game.html.
// L'iframe n'est chargée qu'à l'ouverture et vidée à la fermeture : la partie
// s'arrête et les ~5 Mo du jeu ne pèsent rien tant qu'on ne joue pas.
export function initGameWindow() {
  const dialog = document.getElementById('game');
  if (!dialog) return;

  const frame = dialog.querySelector('.game-window__frame');
  let opener = null;  // bouton à refocaliser à la fermeture

  // Écoute sur le document : la fiche du radar contient une copie du bouton,
  // et une copie (cloneNode) ne garde pas les écouteurs de l'original.
  document.addEventListener('click', (event) => {
    const button = event.target.closest('.mission-card__play-button');
    if (!button) return;
    opener = button;
    frame.src = 'game.html';
    dialog.showModal();
    // Une fois la page chargée, le focus va dans l'iframe : les touches vont au jeu.
    frame.addEventListener('load', () => frame.contentWindow.focus(), { once: true });
  });

  dialog.querySelector('.game-window__close').addEventListener('click', () => dialog.close());

  // Échap pressé dans le jeu : game.js envoie ce message (on ignore les autres origines).
  window.addEventListener('message', (event) => {
    if (event.origin === window.location.origin && event.data === 'so_long:close') dialog.close();
  });

  // Fermeture (bouton ou Échap) : on décharge le jeu.
  dialog.addEventListener('close', () => {
    // about:blank plutôt que retirer src : tous les navigateurs déchargent alors la page.
    frame.src = 'about:blank';
    opener?.focus();
  });
}
