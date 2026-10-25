import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';

// Hash court du commit courant, affiché dans le footer.
function gitHash() {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim();
  } catch {
    return 'local';
  }
}

// Plugin maison : au build, remplace [xx] par le poids de la page (HTML + CSS + JS,
// sans le CV, les polices Google ni le jeu so_long) et [hash] par le hash du commit.
function buildInfo() {
  return {
    name: 'build-info',
    apply: 'build',
    // writeBundle : appelé une fois les fichiers écrits dans dist/, index.html compris.
    writeBundle(options, bundle) {
      const htmlPath = path.join(options.dir, 'index.html');
      const size = (file) => Buffer.byteLength(file.type === 'chunk' ? file.code : file.source);
      // Les fichiers de la page du jeu (entrée « game ») ne comptent pas : ils ne se
      // chargent que si on lance la partie.
      const assets = Object.values(bundle).filter(
        (file) => /\.(css|js)$/.test(file.fileName) && !file.fileName.startsWith('assets/game-'),
      );
      const html = readFileSync(htmlPath, 'utf8');
      const bytes = Buffer.byteLength(html) + assets.reduce((total, file) => total + size(file), 0);

      writeFileSync(
        htmlPath,
        html
          .replace('<span class="footer__weight">[xx]</span>', `<span class="footer__weight">${Math.round(bytes / 1024)}</span>`)
          .replace('<span class="footer__hash">[hash]</span>', `<span class="footer__hash">${gitHash()}</span>`),
      );
    },
  };
}

export default defineConfig({
  // Chemins relatifs : le build fonctionne quel que soit le dossier d'hébergement.
  base: './',
  plugins: [buildInfo()],
  build: {
    // Le portfolio, la page du jeu (chargée dans une iframe) et une page rapport par mission.
    rollupOptions: {
      input: {
        main: 'index.html',
        game: 'game.html',
        msn001: 'msn-001.html',
        msn002: 'msn-002.html',
        msn003: 'msn-003.html',
        msn004: 'msn-004.html',
        msn005: 'msn-005.html',
        msn006: 'msn-006.html',
        msn007: 'msn-007.html',
        msn008: 'msn-008.html',
      },
    },
  },
});
