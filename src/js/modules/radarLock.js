import { DESKTOP_QUERY } from './breakpoints.js';

// Radar interactif (desktop uniquement).
// - Bascule décoratif / interactif selon la largeur d'écran.
// - Survol ou focus d'un contact : crochets de visée, panneau « Cible verrouillée »
//   et mise en évidence de la carte de la mission.
// - Clic (ou Entrée) sur un contact : la fiche du projet se déroule sous le radar.
export function initRadarLock() {
  const svg = document.querySelector('.radar__svg');
  if (!svg) return;

  const contacts = [...svg.querySelectorAll('.radar__contact')];
  const brackets = svg.querySelector('.radar__brackets');
  const emptyMessage = document.querySelector('.radar__panel-empty');
  const panel = document.querySelector('.radar__panel');
  const sheet = document.getElementById('radar-sheet');
  const sheetTitle = sheet.querySelector('.radar__sheet-title');
  const sheetContent = sheet.querySelector('.radar__sheet-content');
  const desktop = window.matchMedia(DESKTOP_QUERY);
  let locked = null;       // contact visé (survol, focus ou clic)
  let openContact = null;  // contact dont la fiche est déroulée

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

  function onKeydown(event) {
    if (event.key === 'Escape') closeSheet({ returnFocus: true });
  }

  // La fiche reprend le contenu de la carte de la mission, déjà écrit dans le HTML :
  // le texte n'existe qu'à un seul endroit.
  function openSheet(contact) {
    const id = missionId(contact);
    const card = document.getElementById(id);
    openContact = null;  // libère le verrouillage pour viser le nouveau contact
    lock(contact);
    openContact = contact;

    const content = card.querySelector('.mission-card__inner').cloneNode(true);
    // Si la mission a un résumé court dans le panneau, il remplace la description
    // de la carte : la fiche ne garde que métriques, tags et lien.
    if (document.querySelector(`#info-${id} .radar__summary`)) {
      content.querySelectorAll('.mission-card__desc').forEach((desc) => desc.remove());
    }
    sheetContent.replaceChildren(...content.children);
    sheetTitle.textContent = `Fiche ${id.toUpperCase()} · ${card.querySelector('.contact-row__name').textContent}`;
    sheet.classList.add('is-open');
    panel.classList.add('radar__panel--sheet-open');
    document.addEventListener('keydown', onKeydown);
    // Le focus passe sur la fiche : un lecteur d'écran l'annonce, et Tab continue dedans.
    sheetTitle.focus();
  }

  function closeSheet({ returnFocus = false } = {}) {
    if (!openContact) return;
    const contact = openContact;
    openContact = null;
    sheet.classList.remove('is-open');
    panel.classList.remove('radar__panel--sheet-open');
    document.removeEventListener('keydown', onKeydown);
    if (returnFocus) contact.focus();
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
      closeSheet();
      unlock();
    }
    contacts.forEach((contact) => {
      if (interactive) contact.removeAttribute('tabindex');
      else contact.setAttribute('tabindex', '-1');
    });
  }

  // Fiche ouverte : le survol ne déplace plus la visée, pour ne pas décrocher de la fiche lue.
  function aim(contact) {
    if (!openContact) lock(contact);
  }

  contacts.forEach((contact) => {
    contact.addEventListener('mouseenter', () => aim(contact));
    contact.addEventListener('focus', () => aim(contact));
    contact.addEventListener('click', (event) => {
      // Sans JS (ou en cas d'erreur), le lien mène simplement à la carte de la mission.
      event.preventDefault();
      if (contact === openContact) closeSheet();
      else openSheet(contact);
    });
  });

  sheet.querySelector('.radar__sheet-close').addEventListener('click', () => closeSheet({ returnFocus: true }));

  setInteractive(desktop.matches);
  desktop.addEventListener('change', (event) => setInteractive(event.matches));
}
