import { DESKTOP_QUERY } from './breakpoints.js';

// Radar interactif (desktop uniquement).
// - Bascule décoratif / interactif selon la largeur d'écran.
// - Survol ou focus d'un contact : crochets de visée, panneau « Contact verrouillé »
//   et mise en évidence de la carte de la mission.
export function initRadarLock() {
  const svg = document.querySelector('.radar__svg');
  if (!svg) return;

  const contacts = [...svg.querySelectorAll('.radar__contact')];
  const brackets = svg.querySelector('.radar__brackets');
  const emptyMessage = document.querySelector('.radar__panel-empty');
  const desktop = window.matchMedia(DESKTOP_QUERY);
  let locked = null;

  // "#msn-005" → "msn-005"
  function missionId(contact) {
    return contact.getAttribute('href').slice(1);
  }

  function unlock() {
    if (!locked) return;
    const id = missionId(locked);
    document.getElementById(`info-${id}`).hidden = true;
    document.querySelector(`#${id} .mission-card`)?.classList.remove('mission-card--locked');
    brackets.classList.remove('is-locked');
    emptyMessage.hidden = false;
    locked = null;
  }

  function lock(contact) {
    if (contact === locked) return;
    unlock();
    locked = contact;
    const id = missionId(contact);

    // Les crochets se placent sur le centre du point du contact.
    const dot = contact.querySelector('.radar__dot');
    brackets.setAttribute('transform', `translate(${dot.getAttribute('cx')} ${dot.getAttribute('cy')})`);
    // Lire une dimension force le navigateur à appliquer l'état « non verrouillé »
    // avant d'ajouter la classe : l'animation de resserrement repart de zéro.
    brackets.getBoundingClientRect();
    brackets.classList.add('is-locked');

    emptyMessage.hidden = true;
    document.getElementById(`info-${id}`).hidden = false;
    document.querySelector(`#${id} .mission-card`)?.classList.add('mission-card--locked');
  }

  // Mobile : le radar est une image (caché aux lecteurs d'écran, rien de focusable).
  // Desktop : c'est un groupe de liens atteignables au clavier.
  function setInteractive(interactive) {
    if (interactive) {
      svg.removeAttribute('aria-hidden');
      svg.setAttribute('role', 'group');
      svg.setAttribute('aria-label', 'Radar des missions');
    } else {
      svg.setAttribute('aria-hidden', 'true');
      svg.removeAttribute('role');
      svg.removeAttribute('aria-label');
      unlock();
    }
    contacts.forEach((contact) => {
      if (interactive) contact.removeAttribute('tabindex');
      else contact.setAttribute('tabindex', '-1');
    });
  }

  contacts.forEach((contact) => {
    contact.addEventListener('mouseenter', () => lock(contact));
    contact.addEventListener('focus', () => lock(contact));
  });

  setInteractive(desktop.matches);
  desktop.addEventListener('change', (event) => setInteractive(event.matches));
}
