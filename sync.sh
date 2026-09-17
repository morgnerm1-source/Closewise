#!/bin/bash
# Legt den Veröffentlichungsordner neu an.
# Danach den Ordner "closewise" auf vercel.com/new ziehen.
#
# design.html liegt dort zweimal: einmal als index.html (die Adresse
# ohne Dateinamen) und einmal unter eigenem Namen, weil die
# Unterseiten mit href="design.html" zurückverweisen.

set -e
cd "$(dirname "$0")"

ZIEL=closewise
rm -rf "$ZIEL"
mkdir -p "$ZIEL"

cp design.html "$ZIEL/index.html"
cp design.html "$ZIEL/design.html"
cp ablauf.html "$ZIEL/"
cp stil.css seite.js "$ZIEL/"
cp textur-dunkel.png textur-hell.png flaechen-dunkel.svg "$ZIEL/"
cp restaurant-abend.jpg rezeption-nacht.jpg "$ZIEL/"
cp kofferwagen-lobby.jpg glocke-empfang.jpg "$ZIEL/"

echo "closewise/ neu angelegt:"
ls -1sh "$ZIEL" | sed 's/^/  /'

# Zum Schluss die Seite im Browser zeigen. Mit "./sync.sh still"
# unterdrücken, etwa wenn schon ein Fenster offen ist.
if [ "$1" != "still" ]; then
  open design.html
fi
