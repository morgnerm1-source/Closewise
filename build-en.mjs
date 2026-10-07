// Erzeugt die englischen Seiten aus den deutschen Quellen:
//   pf.html  -> pf-en.html
//   faq.html -> faq-en.html
//   security.html -> security-en.html
// Übersetzt wird nur, was Besucher sehen oder vorgelesen bekommen: Textknoten,
// ausgewählte Attribute und Text-Zeichenketten in den Inline-Skripten
// (Wörterbuch i18n/en.json). Klassen, IDs und Code bleiben unberührt.
// Bleibt danach deutscher Text übrig, bricht das Skript mit einer Liste ab.
//
//   node build-en.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const dict = JSON.parse(fs.readFileSync(path.join(here, "i18n/en.json"), "utf8"));
const TEXT = dict.text;
const JS = Object.entries(dict.js).sort((a, b) => b[0].length - a[0].length);
const PAGES = { "pf.html": "pf-en.html", "faq.html": "faq-en.html", "security.html": "security-en.html" };
const ATTRS = ["alt", "aria-label", "placeholder", "title", "content", "label", "data-name"];

// Seite in Abschnitte teilen: Inline-Skripte, Styles, Kommentare und der Rest
const split = html => html.split(/(<script>[\s\S]*?<\/script>|<style>[\s\S]*?<\/style>|<!--[\s\S]*?-->)/);

function translateMarkup(part) {
  // Textknoten: exakter Vergleich, Leerraum drumherum bleibt
  part = part.replace(/>([^<>]+)</g, (m, t) => {
    const key = t.trim();
    if (!key || !(key in TEXT)) return m;
    return ">" + t.replace(key, TEXT[key]) + "<";
  });
  // Attribute
  const re = new RegExp(`(\\s(?:${ATTRS.join("|")})=")([^"]*)(")`, "g");
  part = part.replace(re, (m, a, v, b) => (v in TEXT ? a + TEXT[v] + b : m));
  // Interne Links auf die englischen Seiten (nicht der Sprachumschalter)
  part = part.replace(/<a\b[^>]*>/g, tag => {
    if (/\sdata-l="/.test(tag)) return tag;
    return tag.replace(/href="(pf|faq|security)\.html(#[^"]*)?"/, (m, n, h = "") => `href="${n}-en.html${h}"`);
  });
  return part;
}

function translateScript(part) {
  for (const [de, en] of JS) part = part.split(de).join(en);
  return part;
}

// Deutsch-Prüfung auf allem, was sichtbar ist oder vorgelesen wird
const GERMAN = /[äöüßÄÖÜ]|\b(und|der|die|das|nicht|Sie|Ihr|Ihre|Ihren|ist|wird|mit|für|auf|den|dem|eine|oder|von|zum|zur|Frage|Antwort|Zitat|Termin|Abschluss|Rechnung)\b/;
function findGerman(html) {
  const hits = [];
  const lineOf = i => html.slice(0, i).split("\n").length;
  for (const p of split(html).map((s, k) => [s, k])) {
    const [seg] = p;
    const offset = html.indexOf(seg);
    if (seg.startsWith("<style") || seg.startsWith("<!--")) continue;
    if (seg.startsWith("<script>")) {
      const code = seg.replace(/(^|[\s;{}(])\/\/[^\n]*/g, "$1");
      for (const m of code.matchAll(/'([^'\n]*)'|`([^`]*)`/g)) {
        const t = m[1] ?? m[2];
        if (GERMAN.test(t) && !/^\s*$/.test(t)) hits.push(`Z. ${lineOf(offset + seg.indexOf(t))} (Skript): ${t.slice(0, 90)}`);
      }
      continue;
    }
    const body = seg.replace(/<svg[\s\S]*?<\/svg>/g, s => " ".repeat(s.length));
    for (const m of body.matchAll(/>([^<>]+)</g)) {
      const t = m[1].trim();
      if (t && GERMAN.test(t)) hits.push(`Z. ${lineOf(offset + m.index)}: ${t.slice(0, 90)}`);
    }
    for (const m of body.matchAll(new RegExp(`\\s(?:${ATTRS.join("|")})="([^"]*)"`, "g"))) {
      if (GERMAN.test(m[1])) hits.push(`Z. ${lineOf(offset + m.index)} (Attribut): ${m[1].slice(0, 90)}`);
    }
  }
  return hits;
}

let fail = false;
for (const [src, dst] of Object.entries(PAGES)) {
  const html = fs.readFileSync(path.join(here, src), "utf8");
  let out = split(html)
    .map(p => (p.startsWith("<script>") ? translateScript(p) : p.startsWith("<style>") || p.startsWith("<!--") ? p : translateMarkup(p)))
    .join("");
  out = out.replace('<html lang="de">', '<html lang="en">');
  const hits = findGerman(out);
  if (hits.length) {
    fail = true;
    console.error(`\n${dst}: ${hits.length} deutsche Stelle(n) ohne Übersetzung – Eintrag in i18n/en.json ergänzen:`);
    hits.forEach(h => console.error("  " + h));
  }
  fs.writeFileSync(path.join(here, dst), out);
  console.log(`${dst} geschrieben`);
}
if (fail) process.exit(1);
