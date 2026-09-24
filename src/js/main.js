import { initMobileMenu } from './modules/mobileMenu.js';
import { initMissionClock } from './modules/missionClock.js';
import { initContactAccordion } from './modules/contactAccordion.js';
import { initRadarLock } from './modules/radarLock.js';
import { initReveal } from './modules/reveal.js';
import { initContactForm } from './modules/contactForm.js';
import { initEasterEgg } from './modules/easterEgg.js';

// Signale au CSS que le JavaScript est actif : les styles qui en dépendent
// (menu repliable, accordéon, apparitions) sont préfixés par .js.
document.documentElement.classList.add('js');

initMobileMenu();
initMissionClock();
initContactAccordion();
initRadarLock();
initReveal();
initContactForm();
initEasterEgg();
