#!/bin/bash
# Baut den Veröffentlichungsordner für tyll.ai (Vorschau-Projekt auf Vercel).
# Quelle: tyll/*.html (Englisch). build-i18n.mjs erzeugt Arabisch (RTL) und Französisch.
#   ./sync-tyll.sh            bauen
#   cd tyll-dist && npx vercel deploy --prod
set -e
cd "$(dirname "$0")"
ZIEL=tyll-dist
[ -d "$ZIEL/.vercel" ] && mv "$ZIEL/.vercel" .vercel-tyll-keep
rm -rf "$ZIEL"; mkdir -p "$ZIEL"
[ -d .vercel-tyll-keep ] && mv .vercel-tyll-keep "$ZIEL/.vercel"
[ -f build-i18n.mjs ] && node build-i18n.mjs
cp tyll/*.html tyll/*.js tyll/favicon.svg "$ZIEL/" 2>/dev/null || cp tyll/*.html tyll/*.js "$ZIEL/"
cp -r fonts vendor logos "$ZIEL/" && cp -r tyll/api "$ZIEL/"
mkdir -p "$ZIEL/bilder" && cp bilder/hero-tyll.* bilder/stats-*.jpg "$ZIEL/bilder/" && cp -r bilder/belege "$ZIEL/bilder/"
cp package.json package-lock.json "$ZIEL/"
printf '.env*\n.vercel\n' > "$ZIEL/.vercelignore"
echo "tyll-dist/ neu angelegt:"; ls -1 "$ZIEL" | sed 's/^/  /'
