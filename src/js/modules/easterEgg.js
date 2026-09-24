import { REDUCED_MOTION_QUERY } from './breakpoints.js';

// Easter egg [ NE PAS APPUYER ] : une console qui exécute pas à pas
// strlen.bf (https://github.com/Hellisabd/strlen.bf) avec un interpréteur Brainfuck.
// Le programme lit des caractères jusqu'à un espace, puis affiche leur nombre.

const INPUT = '42 ';
const STEP_DELAY = 20;    // ms entre deux instructions
const TAPE_WINDOW = 8;    // nombre de cases du ruban affichées

// Associe chaque crochet à son crochet correspondant, pour sauter en O(1).
function matchBrackets(program) {
  const pairs = new Map();
  const stack = [];
  [...program].forEach((op, index) => {
    if (op === '[') stack.push(index);
    if (op === ']') {
      const open = stack.pop();
      pairs.set(open, index);
      pairs.set(index, open);
    }
  });
  return pairs;
}

export function initEasterEgg() {
  const trigger = document.querySelector('.footer__egg');
  const dialog = document.getElementById('console');
  if (!trigger || !dialog) return;

  // Le code affiché dans le HTML est aussi le code exécuté.
  const program = dialog.querySelector('.console__code').textContent.replace(/[^+\-<>[\].,]/g, '');
  const pairs = matchBrackets(program);
  const view = {
    step: dialog.querySelector('.console__step'),
    op: dialog.querySelector('.console__op'),
    tape: dialog.querySelector('.console__tape'),
    output: dialog.querySelector('.console__output'),
    result: dialog.querySelector('.console__result'),
  };
  let timer = null;

  function render(state) {
    const first = Math.max(0, state.pointer - 3);
    const cells = state.tape.slice(first, first + TAPE_WINDOW).map((value, offset) => {
      const cell = String(value).padStart(3, ' ');
      return first + offset === state.pointer ? `[${cell}]` : ` ${cell} `;
    });
    view.step.textContent = String(state.steps);
    view.op.textContent = `${program[state.ip] ?? '—'}  (${state.ip} / ${program.length})`;
    view.tape.textContent = cells.join('');
    view.output.textContent = state.output === '' ? '—' : `"${state.output}"`;
  }

  // Exécute une instruction ; renvoie false quand le programme est terminé.
  function step(state) {
    const op = program[state.ip];
    switch (op) {
      case '+': state.tape[state.pointer] = (state.tape[state.pointer] + 1) % 256; break;
      case '-': state.tape[state.pointer] = (state.tape[state.pointer] + 255) % 256; break;
      case '>': state.pointer += 1; break;
      case '<': state.pointer -= 1; break;
      case ',': state.tape[state.pointer] = state.input.length ? state.input.shift().charCodeAt(0) : 0; break;
      case '.': state.output += String.fromCharCode(state.tape[state.pointer]); break;
      case '[': if (state.tape[state.pointer] === 0) state.ip = pairs.get(state.ip); break;
      case ']': if (state.tape[state.pointer] !== 0) state.ip = pairs.get(state.ip); break;
      default: break;
    }
    state.ip += 1;
    state.steps += 1;
    return state.ip < program.length;
  }

  function finish(state) {
    render(state);
    view.result.textContent = `strlen("${INPUT.trim()}") = ${state.output} · DON'T PANIC.`;
  }

  function run() {
    const state = { tape: new Array(32).fill(0), pointer: 0, ip: 0, steps: 0, input: [...INPUT], output: '' };
    view.result.textContent = '';

    // Moins d'animations : on exécute tout d'un coup.
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
      while (step(state));
      finish(state);
      return;
    }

    render(state);
    timer = setInterval(() => {
      if (step(state)) render(state);
      else {
        clearInterval(timer);
        finish(state);
      }
    }, STEP_DELAY);
  }

  trigger.addEventListener('click', () => {
    dialog.showModal();
    run();
  });

  dialog.querySelector('.console__close').addEventListener('click', () => dialog.close());
  // Fermeture (bouton ou Échap) : on arrête l'exécution en cours.
  dialog.addEventListener('close', () => clearInterval(timer));
}
