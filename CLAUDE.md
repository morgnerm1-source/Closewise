# Closewise — Landingpage

## Arbeitsweise

**Nicht um Erlaubnis fragen.** Aufgaben zu Ende bringen und danach berichten,
was getan wurde — statt vorher zu fragen, ob es getan werden darf.

Das gilt ausdrücklich für:

- Dateien anlegen, ändern, verschieben, löschen
- Werkzeuge installieren (`npm i`, `brew install`)
- Git: committen, Branch anlegen, pushen
- Veröffentlichen auf Vercel oder Netlify
- Screenshots rendern, Prüfläufe starten, Testdateien anlegen und wieder wegräumen

Keine Rückfragen der Form „soll ich …?", „möchtest du, dass ich …?",
„sag Bescheid, dann mache ich …". Auch keine Auswahlfragen zu Dingen, die
eine naheliegende Antwort haben.

Bei Mehrdeutigkeit: die naheliegendste Annahme treffen, sie in einem Satz
benennen, weitermachen. Innehalten nur, wenn ein Schritt echten Schaden
anrichten würde, der sich nicht rückgängig machen lässt.

Fehler und Fehlschläge klar benennen, ohne Umschweife und ohne
Entschuldigungsschleifen. Was nicht geprüft wurde, als ungeprüft ausweisen.
**Vermutete Ursachen messen, bevor man sie behebt** — hier wurde einmal an
den Schriftgraden korrigiert, obwohl die Seitenlänge von drei neu
eingebauten Bildabschnitten kam.

## Sprache

Deutsch — in Antworten, in Code-Kommentaren, in Commit-Nachrichten.

## Dateien

| Datei | Rolle |
|---|---|
| `design.html` | Die Landingpage. Stil und Skripte stehen **inline**. |
| `ablauf.html` | Unterseite. Bindet `stil.css` und `seite.js` ein. |
| `stil.css` | Der Stil für Unterseiten — **wortgleiche Kopie** des Blocks in `design.html`. |
| `seite.js` | Einblendungen, Zähler, Parallaxe, Handy-Menü, Akkordeon, Lesefortschritt. |
| `sync.sh` | Baut `closewise/` neu und öffnet die Seite. `./sync.sh still` ohne Öffnen. |
| `closewise/` | Veröffentlichungsordner für Vercel (Drag-and-drop auf vercel.com/new). |
| `textur-*.png` | Selbst erzeugte Texturen (Python + zlib, indiziertes PNG), Navy zu Leinen. |
| `restaurant-abend.jpg` | Foto in der Outlet-Galerie (Unsplash, frei nutzbar). |
| `index.html` | Die **alte** Fassung. Nicht anfassen. |
| `server.js` | Dependency-freier Node-Server für die alte Fassung. |

**Nach jeder Änderung:** `./sync.sh`

**Achtung Doppelung:** Der Stil existiert zweimal — inline in `design.html`
und in `stil.css`. Jede Stiländerung muss in **beide** Dateien.

## Gestaltung — Harvey trifft Aman

Zwei Vorbilder, ein Ton. Von Aman kommen Leinen, Weißraum, gesperrte
Kleinversalien und die Serife; von Harvey das tiefe Navy, die Klarheit und
der Software-Ernst. Die Seite soll nach einem Haus **und** nach Software
aussehen.

- **Farbe:** Navy (`--ink`, `--deep`) trägt die dunklen Flächen, Leinen
  (`--paper`, `--off`) die hellen, Bronze (`--akzent`) ist die Zweitstimme.
  Nie reines Weiß, nie reines Schwarz — beides wäre zu hart für ein Haus.
- **Zwei Schriften mit klarer Aufgabe:**
  `--display` ist **Newsreader** (Serife) und trägt nur die großen Zeilen.
  `--sans` ist **Inter** und trägt alles Funktionale — auch die
  Fenster-Überschriften, denn die gehören zur Software, nicht zum Haus.
  Die Serife steht in 400, nicht fett; Fettdruck nähme ihr die Ruhe.
- **Gesperrte Kleinversalien** (`.label`) für Kategorien — fein und grau
  (11 px, Gewicht 500, 0.2em, `--muted-2`). Fett und farbig gesperrt wirkt
  dagegen schablonenhaft.
- **`.textlink`** — Textverweis mit dünnem Unterstrich, die leise
  Alternative zum Knopf. Bei beiden Vorbildern das übliche Mittel.
- **Kanten statt Rundungen:** `--r:2px`, `--r-lg:3px`, `--r-xl:4px`.
  Knöpfe sind flach, nicht vollrund.
- **Linien statt Schatten.** Tiefe entsteht über feine Rahmen in `--line`.
  Schlagschatten nur dort, wo ein Fenster aus einem Band aufsteigt.
- **Keine Monoschrift.** Ziffern über `font-variant-numeric:tabular-nums`.
- **Bewegung:** kurze Wege (18 px), lange Zeiten (0,8–1,2 s), eine Kurve
  (`--ease`), nur Deckkraft und Transform. Alles Bewegte gehört in
  `@media (prefers-reduced-motion:no-preference)`.

## Handy

Regeln für schmale Schirme stehen **am Ende** des Stilblocks, ausschließlich
in `@media (max-width: …)`. Grund: bei gleicher Spezifität gewinnt die
spätere Regel — eine Handy-Regel vor ihrer eigenen Grundregel läuft ins Leere.
Das ist hier schon einmal passiert (`.win .side{display:none}`).

Geprüfte Breiten: 320, 360, 390, 414 — kein waagerechter Überlauf.

## Bildflächen

`<div class="bild hoch">` zeigt einen Hinweis, solange kein `<img>` darin
steht. Über `:has(img)` blendet er sich selbst aus — zum Füllen also nur
ein `<img>` **ergänzen**, nichts löschen.

Formate: `.breit` (21:9), `.quer` (4:3), `.hoch` (3:4).

Bilder vorher verkleinern, `sips` ist auf jedem Mac dabei:

```bash
sips -Z 1400 gross.jpg --setProperty formatOptions 72 --out klein.jpg
```

## Prüfen mit Chrome

Chrome headless geht **nicht unter 500 px** Fensterbreite. Für echte
Handy-Tests die Seite in einen Rahmen hängen, der sein eigenes
Ansichtsfenster mitbringt:

```html
<style>html,body{margin:0}iframe{display:block;width:390px;height:1500px;border:0}</style>
<iframe src="design.html"></iframe>
```

Weiter unten auf der Seite prüfen: eine Kopie mit `body{margin-top:-2000px}`
rendern — Scrollen und Ankersprünge greifen im Headless-Modus nicht.
Positionen vorher **messen** statt schätzen (`el.offsetTop` per Skript
ausgeben), sonst trifft der Ausschnitt daneben.

`--dump-dom` treibt **keine Bildschleife**, also feuert dort kein
`requestAnimationFrame`. Alles, was über rAF läuft (Zähler, Rechner,
Einblendungen), sieht dort tot aus, obwohl es lebt. Für solche Prüfungen
Screenshots nehmen.

Pixelvergleiche zweier Aufnahmen sind wertlos, solange die Dauer-Animationen
laufen — dieselbe Datei weicht bei zwei Durchläufen auf über 2000 Zeilen ab.
Stattdessen strukturell prüfen oder gezielt hinsehen.

Neue Schriften **nachweisen**, nicht annehmen: `document.fonts.check()` und
eine Breitenmessung derselben Zeile gegen eine Ersatzschrift. Sonst fällt die
Seite still auf die Systemschrift zurück.

In `grep` Suchbegriffe, die mit `--` beginnen, hinter `--` setzen:
`grep -c -F -- "--ink:#16294A" stil.css`. Sonst liest die Shell sie als Option.

## Dateiversand

`SendUserFile` scheitert bei extremen Seitenverhältnissen mit Fehler 400 —
eine Aufnahme von 1440 × 9000 kommt nicht durch, auch nicht als 750-KB-JPEG.
Die Seite stattdessen in Ausschnitte von etwa 1440 × 1180 zerlegen.

## Rechner

Formel, aus der Vorlage rückgerechnet und auf den Euro bestätigt:

```
Closewise-Minuten = 2,5 (Öffnen) + 1,5 × 4 (Ausnahmen) = 8,5
Stunden im Jahr   = Outlets × (Minuten − 8,5) × 360 ÷ 60
Ersparnis         = Stunden × Stundensatz
Netto             = Ersparnis − 9.600 € (800 €/Monat)
```

360 Nächte, nicht 365. Negatives Netto darf nicht grün erscheinen.

## Vor dem Veröffentlichen

Diese Angaben stammen aus Entwürfen und sind **nicht belegt**:

- Fußzeile: DSGVO, Auftragsverarbeitung, Serverstandort Deutschland,
  Vertrauenszentrum
- Häufige Fragen: Server in Deutschland, keine vollständigen Kartennummern,
  monatlich kündbar, keine Einrichtungsgebühr, Einrichtung enthalten
- Konsole: „17 Fehlerbilder", „100 % auf Belegebene geprüft"

Streichen, was nicht zutrifft.

Ungeprüft: der Farbkontrast der Palette (gedämpfte Töne, gesperrte Labels in
`--muted-2` liegen womöglich unter dem Schwellwert für Barrierefreiheit).
