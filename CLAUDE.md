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

## Git — der Kontrollmechanismus

Aktuelle Arbeit läuft auf dem Zweig `figma-look`, abgezweigt von `vercel-live`
(dem Stand, der auf Vercel lief). `main` und `aman-redesign` bleiben als
Rückwege unangetastet.

**Nach jeder abgeschlossenen, vom Nutzer angestoßenen Änderung: committen.**
Nicht nach jeder einzelnen Edit-Anweisung, aber nach jedem Punkt, den der
Nutzer als erledigt ansehen würde. Kleine Schrittfolgen (CSS anpassen,
Screenshot prüfen, nochmal anpassen) gehören in einen gemeinsamen Commit.

`git push` nach `origin` schlägt vermutlich fehl — das Repo gehört
`fynnkz`, der lokale Git-Nutzer (`morgnerm1-source`) hat dort keine
bestätigten Schreibrechte.

## Dateien

| Datei | Rolle |
|---|---|
| `design.html` | Die Landingpage. Stil und Skripte stehen **inline**. |
| `ablauf.html` | Unterseite. Bindet `stil.css` und `seite.js` ein. |
| `stil.css` | Der Stil für Unterseiten — **wortgleiche Kopie** des Blocks in `design.html`. |
| `seite.js` | Einblendungen, Zähler, Parallaxe, Handy-Menü, Akkordeon, Lesefortschritt. |
| `sync.sh` | Baut `closewise/` neu und öffnet die Seite. `./sync.sh still` ohne Öffnen. |
| `closewise/` | Veröffentlichungsordner für Vercel (Drag-and-drop auf vercel.com/new). |
| `flaechen-dunkel.svg` | Frame 21 aus Figma, das Motiv der dunklen Flächen. |
| `textur-*.png` | Alte Texturen, von `design.html` nicht mehr genutzt. |
| `restaurant-abend.jpg` | Foto in der Outlet-Galerie (Unsplash, frei nutzbar). |
| `index.html` | Die **alte** Fassung. Nicht anfassen. |
| `server.js` | Dependency-freier Node-Server für die alte Fassung. |

**Nach jeder Änderung:** `./sync.sh`

**Achtung Doppelung:** Der Stil existiert zweimal — inline in `design.html`
und in `stil.css`. Jede Stiländerung muss in **beide** Dateien.

## Gestaltung — Figma „CLOSEWISE NEW“

Dieselbe Marke wie die Demo (demo.closewise.site). Quelle ist das Figma-Board
„CLOSWISE“, Seite „CLOSEWISE NEW“.

- **Farbe:** Midnight Blue (`--midnight #12224E`, dunkle Flächen als Verlauf
  `#132451` → `#09132F`) als Verweis auf den Nachtabschluss. Weiß ist die
  Arbeitsfläche. `--accent #294DAF` ist die **einzige** Handlungsfarbe
  (Knöpfe, Verweise, Fokus) — dieselbe wie in der Demo. Auswahl und Kacheln
  in `--tile #EAF4FE` mit `--accent-deep #163382`. „HOSPITALITY“ auf Dunkel
  in `#5E8AFF`. Grün und Rot nur für geprüft / offen.
- **Dunkle Flächen** zeigen das Motiv aus Frame 21 (`flaechen-dunkel.svg`).
  Der SVG-Export ist gegenüber Figma horizontal gespiegelt, deshalb überall
  `transform:scaleX(-1)`.
- **Schrift:** nur **Inter**. Große Zeilen 650, eng gesperrt (−.04em).
- **Gesperrte Kleinversalien** (`.label`) in `--accent` mit kurzem Strich davor.
- **Knöpfe** vollrund (`border-radius:999px`), Karten 14 px, Bänder 22 px.
- **Produktfenster** zeigen, wie die Demo wirklich aussieht: Midnight-Sidebar
  mit Wortmarke + HOSPITALITY, weiße Arbeitsfläche. Immer als Demodaten.
- **Keine unbelegten Behauptungen.** Keine Herstellerlogos (es gibt keine
  Anbindungen, nur Exporte), kein „Server in Deutschland“ (die Datenbank liegt
  in eu-west-1, Irland), kein „monatlich kündbar“ ohne Vertrag dazu.
  Belegt sind: 4 Quellen und 17 Fehlerbilder (Demo-Spec), 60–70 Minuten von
  Hand, 8,5 Minuten mit Closewise, 3–7 Punkte je Nacht, Import lehnt
  vollständige Kartennummern ab, 800 € im Monat je Haus.
- **Bewegung:** kurze Wege (18 px), lange Zeiten (0,8–1,2 s), eine Kurve
  (`--ease`), nur Deckkraft und Transform, alles hinter
  `prefers-reduced-motion:no-preference`.

**Achtung:** `ablauf.html` und `stil.css` stehen noch auf dem alten
Aman-Stand und sind von `design.html` aus nicht verlinkt.

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
