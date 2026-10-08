#!/bin/bash
# Legt den Veröffentlichungsordner für Vercel neu an (nur die neue Seite).
# Veröffentlichen: ./deploy.sh (oder den Ordner "closewise" auf vercel.com/new ziehen).
#
# pf.html liegt dort zweimal: einmal als index.html (die Adresse ohne
# Dateinamen) und einmal unter eigenem Namen, weil die Seiten mit
# href="pf.html" aufeinander verweisen. Die alten Entwürfe (design.html,
# v2.html, ablauf.html) werden nicht mehr veröffentlicht.

set -e
cd "$(dirname "$0")"

ZIEL=closewise
# .vercel (Projektverknüpfung) über den Neuaufbau retten
[ -d "$ZIEL/.vercel" ] && mv "$ZIEL/.vercel" .vercel-keep
rm -rf "$ZIEL"
mkdir -p "$ZIEL"
[ -d .vercel-keep ] && mv .vercel-keep "$ZIEL/.vercel"

node build-en.mjs                  # erzeugt die EN-Seiten, bricht bei deutschen Resten ab
cp pf.html "$ZIEL/index.html"
cp pf.html faq.html security.html pf-en.html faq-en.html security-en.html "$ZIEL/"
cp impressum.html datenschutz.html dot-loader.js favicon.svg preloader.js "$ZIEL/"
cp -r fonts vendor logos bilder api "$ZIEL/"
cp package.json package-lock.json "$ZIEL/"
printf '.env*\n.vercel\n' > "$ZIEL/.vercelignore"   # keine Tokens/Umgebungsdateien hochladen

echo "closewise/ neu angelegt:"
ls -1sh "$ZIEL" | sed 's/^/  /'

# Zum Schluss die Seite im Browser zeigen. Mit "./sync.sh still" unterdrücken.
if [ "$1" != "still" ]; then
  open pf.html
fi
