#!/usr/bin/env bash
# Compile so_long en WebAssembly (règle « make web » du dépôt so_long)
# et copie le résultat dans public/games/so_long/, servi tel quel par Vite.
set -euo pipefail
cd "$(dirname "$0")/.."

# Emscripten n'est pas dans le PATH par défaut : on charge son environnement.
if ! command -v emcc > /dev/null; then
  source "${EMSDK:-$HOME/emsdk}/emsdk_env.sh" > /dev/null 2>&1
fi

make -C so_long web
mkdir -p public/games/so_long
cp so_long/web/so_long.js so_long/web/so_long.wasm so_long/web/so_long.data public/games/so_long/
echo "so_long copié dans public/games/so_long/"
