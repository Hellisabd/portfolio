// Formulaire de contact : validation accessible puis envoi à Formspree.
// Sans JS, le formulaire est envoyé normalement vers l'attribut action.

// À remplacer par l'identifiant Formspree (et dans l'attribut action du HTML).
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xxxxxxxx';

const STATUS_TEXT = {
  ready: 'Prêt',
  sending: 'Transmission…',
  received: '● Reçu',
  failed: 'Échec — réessayez',
};

function errorMessage(field) {
  if (field.validity.valueMissing) return 'Champ requis.';
  if (field.validity.typeMismatch) return 'Adresse email invalide.';
  return '';
}

export function initContactForm() {
  const form = document.querySelector('.form');
  if (!form) return;

  const status = form.querySelector('.form__status');
  const submit = form.querySelector('.form__submit');
  const fields = [...form.querySelectorAll('.field__input')];

  // Le JS prend le relais des bulles d'erreur du navigateur.
  form.noValidate = true;

  function setStatus(state) {
    status.textContent = STATUS_TEXT[state];
    status.className = `form__status form__status--${state}`;
  }

  // Affiche l'erreur dans le paragraphe lié par aria-describedby.
  function validate(field) {
    const message = errorMessage(field);
    document.getElementById(field.getAttribute('aria-describedby')).textContent = message;
    if (message) field.setAttribute('aria-invalid', 'true');
    else field.removeAttribute('aria-invalid');
    return message === '';
  }

  fields.forEach((field) => {
    field.addEventListener('blur', () => {
      if (field.value !== '') validate(field);
    });
    // Une erreur affichée disparaît dès que la saisie devient valide.
    field.addEventListener('input', () => {
      if (field.hasAttribute('aria-invalid')) validate(field);
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const results = fields.map(validate);
    if (results.includes(false)) {
      fields[results.indexOf(false)].focus();
      return;
    }

    setStatus('sending');
    submit.disabled = true;
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      form.reset();
      setStatus('received');
    } catch {
      setStatus('failed');
    } finally {
      submit.disabled = false;
    }
  });
}
