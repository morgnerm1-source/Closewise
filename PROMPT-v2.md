# Bauauftrag — Closewise Landingpage, zweite Fassung

Baue eine neue, vollständige Landingpage für **Closewise**. Sie ersetzt die
bestehende Fassung nicht, sondern läuft parallel unter `/v2`.

---

## 1. Was Closewise ist

Closewise übernimmt den **Nachtabschluss** in Hotels und Gastronomie.

Jede Nacht entstehen in einem Haus vier voneinander unabhängige Auswertungen:
die Kassenbelege aus den Outlets, der Tagesabschluss des Kartenterminals, die
Gästekonten aus dem PMS und die von Hand gezählte Kassenlade. Diese vier müssen
deckungsgleich sein. Sind sie es nicht, steckt dahinter ein Storno ohne Freigabe,
eine Kartenzahlung, die nie eingezogen wurde, oder ein Betrag, der aufs falsche
Zimmer ging.

Heute prüft das die Schichtleitung von Hand, Beleg für Beleg, nach einer langen
Schicht, nachts. Closewise liest die Exporte, die die Systeme ohnehin erzeugen,
legt sie übereinander und legt am Morgen nur die Abweichungen hin.

**Wer die Seite liest:** Hoteldirektion, F&B-Leitung, Revenue- und
Finanzverantwortliche in Häusern mit mehreren Outlets. Fachleute. Sie haben
Software-Versprechen schon gehört und misstrauen ihnen.

**Was die Seite leisten muss:** in dreißig Sekunden glaubhaft machen, dass hier
jemand den Nachtabschluss wirklich versteht — und dann einen Termin auslösen.

---

## 2. Haltung

Die Seite soll sich anfühlen wie:

- **Instrument, nicht Werbung** — ein Werkzeug für Leute, die nachts arbeiten
- **Sachlich** — jede Zahl belegt, keine Superlative
- **Ruhig** — die Nacht ist das Motiv, nicht Aufregung
- **Dicht gebaut, weit gesetzt** — wenig Text, viel Luft, große Typografie
- **Selbstbewusst** — sie muss nicht überreden, sie zeigt

**Nicht:** freundlich-bunt, startup-optimistisch, verspielt, betont modern.

---

## 3. Was diese Seite ausdrücklich NICHT sein darf

Dieser Abschnitt ist der wichtigste. Die erste Fassung ist an genau diesen
Punkten gescheitert.

**Verboten, weil es nach Baukasten aussieht:**

- **Gesperrte Kleinversalien als Kicker über jeder Überschrift.** Kein
  „— SO FUNKTIONIERT ES", kein „— RECHNER", kein „— VERGLEICH". Das ist der
  stärkste einzelne Hinweis auf eine generierte Seite. Gesperrte Kleinversalien
  sind nur erlaubt, wo sie eine Funktion haben: Spaltenköpfe einer Tabelle,
  Beschriftungen innerhalb einer Produktoberfläche.
- **Weiche Farbverläufe oder geblurrte Farbblasen im Hintergrund.** Kein
  `radial-gradient` als Dekoration, keine animierten Flächen hinter dem Inhalt.
  Hintergründe sind flach.
- **Reihen aus drei oder vier gleichen Karten.** Wenn drei Dinge zu erklären
  sind, brauchen sie drei *unterschiedliche* Kompositionen oder eine Form, die
  keine Kartenreihe ist.
- **Gleicher Rhythmus in jedem Abschnitt.** Nicht überall Überschrift → Absatz →
  Raster. Abschnitte dürfen unterschiedlich hoch sein, unterschiedlich
  ausgerichtet, manche fast leer.
- **Leere Flächen ohne Absicht.** Eine halbe Seite tote Spalte neben einer
  Überschrift ist kein Weißraum, sondern ein Layoutfehler. Weißraum muss
  gewollt aussehen.
- **Textwände.** Ein Gedanke je Abschnitt. Wenn ein Absatz länger als vier
  Zeilen wird, fehlt eine Entscheidung.
- **Runde Ecken plus Schatten auf allem.** Schatten sparsam und nur, wo etwas
  wirklich über etwas anderem liegt.
- **Kästen, die im Raster schwimmen.** Ein dunkler Abschlussbereich läuft über
  die volle Breite, er ist keine gerundete Insel mit Rand links und rechts.

**Verboten, weil es nicht stimmt:**

- **Keine Herstellerlogos.** Es gibt keine Anbindungen, nur Dateiimporte. Eine
  Logowand wäre eine Behauptung.
- **Kein „Server in Deutschland".** Die Datenbank liegt in `eu-west-1`, Irland.
- **Kein „monatlich kündbar", keine „keine Einrichtungsgebühr"**, solange kein
  Vertrag das hergibt.
- **Kein „100 % geprüft"**, kein DSGVO-Siegel, kein „Vertrauenszentrum".
- **Keine erfundenen Kundenstimmen, keine erfundenen Logos, keine erfundenen
  Presseerwähnungen.** Wenn es noch keine Referenzen gibt, bekommt die Seite
  keinen Referenzabschnitt. Eine Seite ohne Kundenstimmen ist glaubwürdiger
  als eine mit erfundenen.

---

## 4. Belegt — und nur das darf behauptet werden

Diese Angaben sind geprüft und dürfen verwendet werden:

| Angabe | Wert |
|---|---|
| Quellen je Nacht | **4** |
| Fehlerbilder, die Closewise kennt | **17** |
| Abschluss von Hand, je Outlet | **60–70 Minuten** |
| Abschluss mit Closewise, je Outlet | **8,5 Minuten** |
| Offene Punkte, die übrig bleiben | **3–7 je Nacht** |
| Nächte im Jahr (Rechengrundlage) | **360**, nicht 365 |
| Preis | **800 € im Monat je Haus** |
| Datensparsamkeit | Der Import **lehnt vollständige Kartennummern ab** |

Alles, was hier nicht steht, wird nicht behauptet. Wenn ein Abschnitt eine Zahl
bräuchte, die es nicht gibt, bekommt der Abschnitt keine Zahl.

---

## 5. Marke

**Farbe.** Midnight Blue als Verweis auf den Nachtabschluss, Weiß als
Arbeitsfläche, genau **eine** Handlungsfarbe.

```
--paper      #FFFFFF   Arbeitsfläche
--off        #F8F9FC   leicht getöntes Off-White
--tint       #EFF4FD   weiche Fläche für ganze Abschnitte
--tile       #EAF4FE   Auswahl, Kacheln
--midnight   #12224E   Überschriften
--ink        #121A33   Fließtext
--muted      #5B6378   Nebentext
--line       #E3E7EF   Haarlinien
--accent     #294DAF   die EINZIGE Handlungsfarbe: Knöpfe, Verweise, Fokus
--accent-deep #163382  Akzent auf hellen Kacheln
--deep       #0A1330   dunkle Flächen
--deep-2     #132451   dunkle Flächen, Verlauf nach #09132F
--hospitality #5E8AFF  nur für „HOSPITALITY" auf dunklem Grund
--good       #2E6B4E   geprüft
--bad        #B4231F   offen
```

Grün und Rot **ausschließlich** für geprüft/offen. Kein weiteres Blau, kein
zweiter Akzent, keine Verläufe außer den dunklen Flächen.

**Schrift.** Nur **Inter**. Große Zeilen in Gewicht 650, eng gesperrt (−0,04 em).
Fließtext 400/450. Ziffern in Tabellen und Beträgen mit
`font-variant-numeric: tabular-nums`. Keine zweite Schriftfamilie, keine Serife.

Typografie ist das Hauptgestaltungsmittel. Überschriften dürfen sehr groß werden
(bis etwa 7 rem), Zahlen noch größer. Der Grad soll tragen, nicht die Menge.

**Form.** Knöpfe vollrund (`border-radius: 999px`). Karten 14 px, Bänder 22 px.
Haarlinien 1 px in `--line`. Struktur entsteht durch Linien und Raster, nicht
durch Kästen.

---

## 6. Technik

**Ausgabe: statische Dateien.** Kein Server, keine Datenbank, keine
Anmeldung, keine API-Routen, kein CMS. Alles läuft im Browser.

Zwei mögliche Wege, **bitte den ersten nehmen**, solange nichts dagegen spricht:

1. **Eine einzelne HTML-Datei** mit Stil und Skript inline, ohne Bauschritt und
   ohne Abhängigkeiten — so wie die bestehende Fassung. Sie liegt neben den
   Bildern im Veröffentlichungsordner und wird als Datei ausgeliefert. Vorteil:
   kein Werkzeugstapel, sofort prüfbar, nichts, was veralten kann.
2. Falls doch ein Rahmenwerk: Next.js mit App Router, TypeScript, Tailwind, und
   `output: "export"`, sodass `npm run build` ein `/out` erzeugt, das ohne
   Node-Server ausgeliefert werden kann. Jede Route muss nach dem Export
   funktionieren.

**Keine externen Bibliotheken für Bewegung.** Alles mit CSS-Übergängen,
`IntersectionObserver` und, wo nötig, einer schlanken Scrollfunktion. Die
bestehende Fassung zeigt, dass das reicht.

**Zweisprachig.** Deutsch ist die Grundsprache, Englisch per Umschalter in der
Navigation. Umsetzung über ein Wörterbuch, das Textknoten tauscht. **Achtung:**
wenn eine Überschrift für eine Animation in mehrere Elemente zerlegt wird,
entstehen neue Textknoten und die Umschaltung greift dort nicht mehr. Entweder
jede Teilzeile ins Wörterbuch aufnehmen oder Animationen wählen, die den Text
nicht anfassen (`clip-path`, Deckkraft, Transform am ganzen Element).

**Veröffentlichung.** Statische Dateien auf Vercel. HTML darf nicht
zwischengespeichert werden (`Cache-Control: public, max-age=0, must-revalidate`),
sonst sind Änderungen erst nach hartem Neuladen sichtbar.

---

## 7. Aufbau, Abschnitt für Abschnitt

Nicht jeder Abschnitt gleich hoch, nicht jeder gleich ausgerichtet. Die Folge
soll eine Dramaturgie haben: Stimmung → Beweis → Erklärung → Rechnung →
Einwände → Termin.

### Navigation

Links die Wortmarke, rechts wenige Verweise und der Umschalter DE/EN, dann
„Anmelden" und „Termin buchen". Über dem Einstieg transparent und hell auf
dunklem Grund; beim Scrollen geht sie in eine weiße Leiste mit Haarlinie über.
Auf dem Handy ein Vollbild-Menü, kein Klappmenü.

### Einstieg

Ein Vollbild-Einstieg mit Nachtstimmung — ein Haus am Abend, von außen, warm
erleuchtet. Kein gestelltes Produktbild, kein Personal, das in die Kamera
lächelt. Die Aufnahme trägt, die Typografie liegt darüber.

Überschrift, zweizeilig:

> Jeder Beleg, jede Nacht.
> Sie sehen nur, was **nicht** stimmt.

Darunter ein Satz:

> Closewise prüft den Abend gegen Kartenterminal, Gästekonten und
> Kassenzählung, und legt Ihrer Schichtleitung die kurze Liste hin.

Zwei Handlungen: „Termin buchen" (gefüllt) und „Demo ansehen" (Linie).
Dazu ein leiser Scrollhinweis.

**Bewegung:** langsames Heranfahren an das Bild, leichte Parallaxe, der Text
tritt gestaffelt ein. Beim Weiterscrollen soll der Einstieg nicht einfach
verblassen, sondern **übergeben**: die mittige Typografie verschwindet früh und
der Text wandert klein an den unteren Bildrand, wie eine Bauchbinde, und wechselt
dort in zwei oder drei Stufen mit dem Scrollfortschritt. Die letzte Stufe leitet
in den nächsten Abschnitt über.

Keine mittigen Knopfblöcke, die den ganzen Einstieg beherrschen.

### Zahlen

Direkt danach drei Zahlen im Schriftgrad einer Schlagzeile, getrennt durch
Haarlinien, die beim Hereinscrollen hochzählen:

- **4** — Quellen, die jede Nacht zusammenpassen müssen
- **8,5 min** — für den Abschluss, statt 60–70 von Hand
- **360** — Nächte im Jahr, jede davon geprüft

Darunter eine Zeile: *Übrig bleiben 3–7 Punkte je Nacht — mit Outlet, Beleg und
Ursache.*

Deutsches Dezimalkomma. Bei `prefers-reduced-motion` stehen die Endwerte sofort.

### Der Morgen danach

Ein einzelnes, großes Produktfenster: die Liste, die die Schichtleitung morgens
vorfindet. Midnight-Sidebar mit Wortmarke und „HOSPITALITY", weiße
Arbeitsfläche, ein Kopf mit Haus und Datum, drei Kennzahlen, fünf Zeilen — zwei
mit grünem Haken, drei mit roter Marke „offen".

Immer als **Demodaten** ausgewiesen. Höchstens zwei Sätze Text daneben.

### Der Ablauf

Drei Schritte: Exporte einlesen → gegen vier Quellen abgleichen → die kurze
Liste klären.

**Nicht** als drei Karten nebeneinander. Als Reiterleiste: links die drei
Schritte untereinander, rechts eine große Aufnahme, die mitwechselt. Der
Abschnitt **rastet fest** und der Scrollfortschritt wählt den Schritt; eine
schmale Schiene links zeigt, wo man ist. Klick und Pfeiltasten müssen ebenfalls
funktionieren und an die passende Scrollposition springen.

Ab 940 px Breite und nur bei `prefers-reduced-motion: no-preference`. Darunter
bleibt der Abschnitt im normalen Fluss, Umschaltung per Klick.

Als echte Reiterleiste bauen: `role="tablist"`, `role="tab"`, `role="tabpanel"`,
wanderndes `tabindex`, Pfeiltasten, Home und Ende.

### Die Bereiche

Restaurant, Hotel, Roomservice, Bar, Bankett — Closewise übernimmt jedes Outlet
im Haus. Eine Form, die nicht die Kartenreihe von oben wiederholt: ein
waagerechter Lauf, ein versetztes Raster, eine Fläche mit wechselndem Bild.
Diese Komponente ist neu zu entwerfen; die bestehende ist ein Nachbau einer
fremden Seite und darf nicht übernommen werden.

### Rechner

Der Besucher stellt sein Haus ein und sieht, was der Abschluss ihn heute kostet.
Drei Regler: Outlets im Haus, Stundensatz der Schichtleitung, Minuten je Outlet
heute. Ergebnis in einer dunklen Fläche, groß.

Formel, bestätigt und auf den Euro nachgerechnet:

```
Closewise-Minuten = 2,5 (Öffnen) + 1,5 × 4 (Ausnahmen) = 8,5
Stunden im Jahr   = Outlets × (Minuten − 8,5) × 360 ÷ 60
Ersparnis         = Stunden × Stundensatz
Netto             = Ersparnis − 9.600 € (800 €/Monat)
```

360 Nächte. **Negatives Netto darf nicht grün erscheinen.** Unter dem Ergebnis
ein Kleingedrucktes, das die Annahmen offenlegt und es als Schätzung ausweist,
nicht als Zusage.

### Was Closewise nicht ist

Ein kurzer Abschnitt gegen die naheliegende Verwechslung: Closewise ersetzt
weder PMS noch Buchhaltung. Als Tabelle mit drei Zeilen — PMS, Buchhaltung, von
Hand — je einmal „heute" und einmal „mit Closewise". Reine Typografie und
Haarlinien, keine Kacheln.

### Fragen

Die Einwände, die tatsächlich kommen: Müssen wir unser Kassensystem wechseln?
Wer muss nachts noch etwas tun? Was, wenn eine Quelle fehlt? Welche Daten
verarbeitet Closewise? Was kostet es? Können wir das vorher sehen?

Als Akkordeon mit Haarlinien. Die Antworten kurz und ehrlich — wo etwas
Handarbeit bleibt, steht das da. **Die Spalte daneben darf nicht leer
bleiben**; dort gehört der Anschluss hin: ein Satz und der Termin-Knopf.

### Abschluss

Ein dunkles Band **über die volle Breite**, nicht als gerundeter Kasten im
Raster. Eine große Zeile, ein Satz, zwei Handlungen: Termin buchen und Demo
selbst ausprobieren.

### Fuß

Mehrspaltig, dunkel, mit Wortmarke, Verweisen, Impressum und Datenschutz. Am
unteren Rand eine große typografische Setzung der Wortmarke. Keine
Vertrauenssiegel, keine erfundenen Zertifikate.

---

## 8. Bewegung

Bewegung soll eine der Stärken der Seite sein — aber langsam, kontrolliert,
teuer wirkend.

- Kurze Wege (etwa 18 px), lange Zeiten (0,8–1,2 s), **eine** Kurve:
  `cubic-bezier(.16, 1, .3, 1)`
- Nur **Deckkraft, Transform und `clip-path`**. Niemals `width`, `height`, `top`
  oder `left` animieren.
- Auftritte beim Hereinscrollen über `IntersectionObserver`, jedes Element nach
  seinem Auftritt wieder abmelden
- Gestaffelte Auftritte für Gruppen, Enthüllungen per `clip-path`
- Parallaxe nur auf ausgewählten Bildern, dezent
- Zahlen zählen hoch, wenn sie ins Bild kommen
- Scrollgetriebenes Einrasten für den Ablauf-Abschnitt

**Alles hinter `@media (prefers-reduced-motion: no-preference)`.** Wer weniger
Bewegung eingestellt hat, bekommt die Seite fertig serviert — sichtbar,
vollständig, ohne Animation.

**Nicht:** Federn, Springen, Leuchten, Rotieren, ständige Bewegung,
Cursor-Effekte, schwebende Formen.

**Hinweis zur Umsetzung:** Scrollabhängige Berechnungen nicht über
`requestAnimationFrame` drosseln, wenn sie prüfbar bleiben sollen — in
kopflosen Prüfläufen feuert keine Bildschleife, und die Logik sieht dort tot
aus, obwohl sie lebt. Eine `getBoundingClientRect`-Abfrage direkt am
`scroll`-Ereignis ist billig genug.

---

## 9. Handy

Das Handy ist eine eigene Gestaltung, nicht ein gestapelter Schreibtisch.

- Geprüfte Breiten: **320, 360, 390, 414** — kein waagerechter Überlauf
- Große Typografie bleibt groß. Nicht alles auf 16 px herunterrechnen.
- Bildausschnitte bewusst anders wählen, nicht dasselbe Bild schmaler
- Asymmetrische Abschnitte neu komponieren, nicht einfach untereinander legen
- Aufwendige Scrolleffekte dort abschalten und durch Klick ersetzen
- Vollbild-Menü, kein Klappmenü
- Regler und Formularfelder mit mindestens 44 px Trefferfläche

**Wichtig zur Reihenfolge im Stil:** Regeln für schmale Schirme gehören
**ganz ans Ende** des Stilblocks und ausschließlich in `@media (max-width: …)`.
Bei gleicher Spezifität gewinnt die spätere Regel — eine Handy-Regel vor ihrer
eigenen Grundregel läuft ins Leere.

---

## 10. Bildmaterial

Bildmaterial ist der Engpass, nicht der Code. Benötigt werden:

- **Einstieg:** ein Haus am Abend, von außen, warm erleuchtet — gern als kurzes
  Video für das Scroll-Scrubbing
- **Bereiche:** je eine Aufnahme für Restaurant, Hotelrezeption, Roomservice,
  Bar, Bankett — abends, gedämpft, ohne Personal in der Kamera
- **Ablauf:** drei Aufnahmen der Bedienoberfläche, im Hochformat, groß genug,
  dass man Text darin lesen kann

Unterschiedliche Seitenverhältnisse verwenden — Hochformat, Querformat,
Panorama, je nach Komposition. Nicht alles 16:9.

Solange ein Bild fehlt, **eine Platzhalterfläche einbauen, die benennt, was
dort hingehört** — nicht „Bild fehlt", sondern die Bildanweisung. Die Fläche
soll ihren Hinweis über `:has(img)` selbst ausblenden, sobald ein `<img>`
ergänzt wird, damit zum Füllen nichts gelöscht werden muss.

Bilder vorher verkleinern (`sips -Z 1400 gross.jpg --setProperty formatOptions 72
--out klein.jpg`), modernes Format, `loading="lazy"`, `width` und `height`
gesetzt, damit nichts springt.

---

## 11. Handwerk

**Barrierefreiheit.** Halbwegs vollständige Tastaturbedienung, sichtbarer
Fokusring (`:focus-visible`, 2 px in `--accent`), sinnvolle Überschriftenfolge,
`aria`-Beziehungen bei Reitern und Akkordeons, beschreibende Alt-Texte.
Farbkontrast nachmessen, nicht annehmen — die gedämpften Töne der Palette sind
grenzwertig und ungeprüft.

**Leistung.** Kein Rahmenwerk, wo keines nötig ist. Bilder optimiert und
verzögert geladen, Schriftschnitte nur in den benutzten Gewichten, keine
schweren Abhängigkeiten. Nichts, was dauerhaft animiert, während es unsichtbar
ist.

**Suchmaschinen.** Eigener Titel und eigene Beschreibung, Open Graph, sauberes
HTML, `LocalBusiness`- und `SoftwareApplication`-Auszeichnung, Impressum und
Datenschutz verlinkt.

Titel: `Closewise — Nachtabschluss für Hotels und Gastronomie`

**Sprache im Code.** Deutsch: Bezeichner, Kommentare, Commit-Nachrichten.
Kommentare erklären das *Warum*, nicht das *Was*.

---

## 12. Prüfliste, bevor die Seite als fertig gilt

Nicht behaupten, sondern messen:

- [ ] 320, 360, 390 und 414 px: kein waagerechter Überlauf
- [ ] Jeder interaktive Abschnitt in **jedem** Zustand geprüft, nicht nur im
      ersten — Reiter, Akkordeon, Regler, Scrollstufen
- [ ] `prefers-reduced-motion: reduce`: alles sichtbar, nichts animiert, keine
      leeren Flächen, wo eine Animation den Inhalt einblenden sollte
- [ ] Mit Tastatur allein von oben bis zum Termin-Knopf
- [ ] DE/EN-Umschaltung greift in **jedem** Abschnitt, auch in neuen
- [ ] Alle Zahlen gegen die Liste in Abschnitt 4 abgeglichen
- [ ] Kein Abschnitt beginnt mit gesperrten Kleinversalien
- [ ] Kein Farbverlauf als Hintergrunddekoration
- [ ] Keine zwei Abschnitte mit demselben Aufbau
- [ ] Keine leere Spalte ohne erkennbare Absicht
- [ ] Tote Stilregeln und ungenutzte Klassen entfernt
- [ ] Auszeichnung ausgeglichen, keine verschachtelten Kommentare

**Zum Prüfen mit Chrome im Headless-Modus:**

- Fenster gehen nicht unter 500 px Breite. Für echte Handy-Tests die Seite in
  einen Rahmen hängen, der sein eigenes Ansichtsfenster mitbringt.
- Scrollen und Ankersprünge greifen dort nicht. Stattdessen den Seitenanfang
  negativ verschieben — das erzeugt dieselbe Rechteckposition. Achtung:
  `position: absolute`-Elemente hängen am Dokumentursprung und wandern dabei
  **nicht** mit, sie tauchen dann in jedem Ausschnitt auf und sehen wie ein
  Fehler aus, der keiner ist.
- Übergänge laufen unter `--virtual-time-budget` nicht weiter. Ein Zustand
  mitten im Übergang sieht falsch aus, obwohl er richtig ist. Für Zustandsprüfungen
  Übergänge abschalten und **Attribute messen, nicht Pixel vergleichen**.
- Pixelvergleiche zweier Aufnahmen sind wertlos, solange Dauer-Animationen laufen.

---

## 13. Maßstab

Am Ende soll die Seite aussehen wie von jemandem gebaut, der den Nachtabschluss
selbst gemacht hat — nicht wie eine Vorlage mit ausgetauschten Texten.

Vor der Abgabe jeden Abschnitt durchgehen und alles entfernen, was
**generisch, vorlagenhaft, zu symmetrisch, visuell wiederholt, unnötig
dekorativ** oder **erkennbar maschinell erzeugt** wirkt.

Im Zweifel: weniger Text, größerer Grad, mehr Luft, eine Farbe.
