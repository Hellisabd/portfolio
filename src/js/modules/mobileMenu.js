import { DESKTOP_QUERY } from './breakpoints.js';

// Menu plein écran du mobile : ouverture par [ MENU ], fermeture par Échap,
// focus piégé dans le menu tant qu'il est ouvert.
export function initMobileMenu() {
  const header = document.querySelector('.header');
  const toggle = header?.querySelector('.header__toggle');
  const panel = document.getElementById('menu');
  if (!toggle || !panel) return;

  const desktop = window.matchMedia(DESKTOP_QUERY);

  function isOpen() {
    return header.classList.contains('header--open');
  }

  // Éléments atteignables au clavier : le bouton puis les liens du menu.
  function focusables() {
    return [toggle, ...panel.querySelectorAll('a[href]')];
  }

  function onKeydown(event) {
    if (event.key === 'Escape') {
      close();
      return;
    }
    if (event.key !== 'Tab') return;

    const items = focusables();
    const first = items[0];
    const last = items[items.length - 1];

    // Au bout de la liste, on repart de l'autre côté au lieu de sortir du menu.
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function open() {
    header.classList.add('header--open');
    document.documentElement.classList.add('menu-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.textContent = '[ FERMER ]';
    document.addEventListener('keydown', onKeydown);
    panel.querySelector('a[href]').focus();
  }

  function close({ returnFocus = true } = {}) {
    header.classList.remove('header--open');
    document.documentElement.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '[ MENU ]';
    document.removeEventListener('keydown', onKeydown);
    if (returnFocus) toggle.focus();
  }

  toggle.addEventListener('click', () => {
    if (isOpen()) close();
    else open();
  });

  // Un lien choisi : on ferme et on laisse le navigateur aller à l'ancre.
  panel.addEventListener('click', (event) => {
    if (isOpen() && event.target.closest('a')) close({ returnFocus: false });
  });

  // Passage en desktop avec le menu ouvert : la navigation redevient en ligne.
  desktop.addEventListener('change', (event) => {
    if (event.matches && isOpen()) close({ returnFocus: false });
  });
}
