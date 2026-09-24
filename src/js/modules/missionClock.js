// Horloge de mission T+ hh:mm:ss, qui compte depuis l'ouverture de la page.
// Clin d'œil au Guide du voyageur galactique : elle démarre à T+ 00:42:00.
const START_OFFSET = 42 * 60;

function pad(value) {
  return String(value).padStart(2, '0');
}

export function initMissionClock() {
  const clocks = document.querySelectorAll('.clock');
  if (clocks.length === 0) return;

  const start = Date.now();

  function tick() {
    const seconds = START_OFFSET + Math.floor((Date.now() - start) / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds / 60) % 60;
    const text = `T+ ${pad(hours)}:${pad(minutes)}:${pad(seconds % 60)}`;
    clocks.forEach((clock) => {
      clock.textContent = text;
    });
  }

  tick();
  setInterval(tick, 1000);
}
