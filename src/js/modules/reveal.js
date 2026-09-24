import { REDUCED_MOTION_QUERY } from './breakpoints.js';

// Apparition des sections au défilement : .is-visible est ajoutée
// quand la section entre dans l'écran (transition définie dans le SCSS).
export function initReveal() {
  const items = document.querySelectorAll('.reveal');
  const reduceMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);  // une seule apparition
      });
    },
    { rootMargin: '0px 0px -10% 0px' },
  );

  items.forEach((item) => observer.observe(item));
}
