import { DESKTOP_QUERY } from './breakpoints.js';

// Accordéon des missions (mobile et tablette) : une seule ligne ouverte à la fois.
// En desktop, les lignes deviennent des cartes : tout est ouvert, boutons désactivés.
export function initContactAccordion() {
  const rows = [...document.querySelectorAll('.contact-row')];
  if (rows.length === 0) return;

  const desktop = window.matchMedia(DESKTOP_QUERY);

  function setOpen(row, open) {
    row.classList.toggle('is-open', open);
    row.querySelector('.contact-row__toggle').setAttribute('aria-expanded', String(open));
  }

  function applyLayout() {
    rows.forEach((row) => {
      row.querySelector('.contact-row__toggle').disabled = desktop.matches;
      setOpen(row, desktop.matches);
    });
  }

  rows.forEach((row) => {
    row.querySelector('.contact-row__toggle').addEventListener('click', () => {
      const willOpen = !row.classList.contains('is-open');
      rows.forEach((other) => setOpen(other, false));
      setOpen(row, willOpen);
    });
  });

  applyLayout();
  desktop.addEventListener('change', applyLayout);
}
