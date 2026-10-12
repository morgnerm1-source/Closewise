// Erzeugt die arabische (RTL) und französische Fassung von tyll.ai aus den englischen Quellen:
//   tyll/index.html    -> tyll/ar.html,          tyll/fr.html
//   tyll/faq.html      -> tyll/faq-ar.html,      tyll/faq-fr.html
//   tyll/security.html -> tyll/security-ar.html, tyll/security-fr.html
// Übersetzt werden Textknoten, ausgewählte Attribute und Text-Zeichenketten in Inline-Skripten
// (Wörterbücher i18n/ar.json, i18n/fr.json). Bleibt englischer Text übrig, bricht das Skript ab.
//   node build-i18n.mjs            bauen
//   node build-i18n.mjs --extract  alle zu übersetzenden Texte als JSON ausgeben
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(here, "tyll");
const PAGES = ["index.html", "faq.html", "security.html", "book.html"];
const LANGS = { de: { dir: "ltr" }, ar: { dir: "rtl" }, fr: { dir: "ltr" } };
const ATTRS = ["alt", "aria-label", "placeholder", "title", "content", "label"];
// Wörter/Namen, die in allen Sprachen gleich bleiben (Marken, Systeme, Formate)
const KEEP = /^(tyll\.ai|EN|FR|العربية|FAQ|PMS|POS|DATEV|CSV|Mews|Lightspeed|Shopify POS|SumUp|DATEV|Oracle OPERA|Oracle MICROS Simphony|IDS Next|Shiji Infrasys|Foodics|Sapaad|Infor HMS|©.*|[\d\s.,:%€+–\-·/×→↔✓#|()]+)$/;

const split = html => html.split(/(<script>[\s\S]*?<\/script>|<style>[\s\S]*?<\/style>|<!--[\s\S]*?-->)/);
const outName = (page, lang) => (page === "index.html" ? `${lang}.html` : page.replace(".html", `-${lang}.html`));

// Text-Zeichenketten im Skript: nur '…' und `…` mit mindestens zwei Wörtern aus Buchstaben,
// oder Einträge, die das Wörterbuch ausdrücklich kennt
const jsStrings = code => [...code.replace(/(^|[\s;{}(])\/\/[^\n]*/g, "$1").matchAll(/'([^'\n\\]*(?:\\.[^'\n\\]*)*)'|`([^`]*)`/g)].map(m => m[1] ?? m[2]);
const isProse = t => /[A-Za-z]{2,}\s+[A-Za-z]{2,}/.test(t) && !/[{};=<>]|^\s*[.#]|\$\{|^[a-z-]+:|^https?:/.test(t);

function translate(html, dict, lang, page) {
  const T = dict.text, J = Object.entries(dict.js || {}).sort((a, b) => b[0].length - a[0].length);
  const parts = split(html).map(p => {
    if (p.startsWith("<style") || p.startsWith("<!--")) return p;
    if (p.startsWith("<script>")) { for (const [a, b] of J) p = p.split(a).join(b); return p; }
    p = p.replace(/>([^<>]+)</g, (m, t) => { const k = t.trim(); return k && k in T ? ">" + t.replace(k, T[k]) + "<" : m; });
    p = p.replace(new RegExp(`(\\s(?:${ATTRS.join("|")})=")([^"]*)(")`, "g"), (m, a, v, b) => (v in T ? a + T[v] + b : m));
    // interne Links auf die Sprachfassung (nicht der Sprachumschalter)
    p = p.replace(/<a\b[^>]*>/g, tag => /\sdata-l="/.test(tag) ? tag :
      tag.replace(/href="(index|faq|security|book)\.html(#[^"]*)?"/, (m, n, h = "") => `href="${outName(n + ".html", lang)}${h}"`));
    return p;
  });
  let out = parts.join("");
  out = out.replace(/<html lang="[^"]*"[^>]*>/, `<html lang="${lang}" dir="${LANGS[lang].dir}">`);
  return out;
}

// Englische Reste finden (sichtbarer Text, Attribute, Skript-Zeichenketten)
function leftovers(html) {
  const hits = new Set();
  for (const p of split(html)) {
    if (p.startsWith("<style") || p.startsWith("<!--")) continue;
    if (p.startsWith("<script>")) { jsStrings(p).filter(isProse).forEach(t => hits.add("JS: " + t)); continue; }
    const body = p.replace(/<svg[\s\S]*?<\/svg>/g, " ");
    for (const m of body.matchAll(/>([^<>]+)</g)) { const t = m[1].trim(); if (t && /[A-Za-z]{2}/.test(t) && !KEEP.test(t)) hits.add(t); }
    for (const m of body.matchAll(new RegExp(`\\s(?:${ATTRS.join("|")})="([^"]*)"`, "g"))) { const t = m[1]; if (/[A-Za-z]{3}/.test(t) && !KEEP.test(t) && !/^(width=|https?:|#)/.test(t)) hits.add("@" + t); }
  }
  return [...hits];
}

if (process.argv.includes("--extract")) {
  const all = {};
  for (const page of PAGES) all[page] = leftovers(fs.readFileSync(path.join(SRC, page), "utf8"));
  console.log(JSON.stringify(all, null, 1));
  process.exit(0);
}

let fail = false;
for (const lang of Object.keys(LANGS)) {
  const dict = JSON.parse(fs.readFileSync(path.join(here, "i18n", `${lang}.json`), "utf8"));
  for (const page of PAGES) {
    const out = translate(fs.readFileSync(path.join(SRC, page), "utf8"), dict, lang, page);
    // Rest = was nach der Übersetzung noch wortgleich zur englischen Quelle dasteht
    const en = new Set(leftovers(fs.readFileSync(path.join(SRC, page), "utf8")));
    const rest = leftovers(out).filter(t => en.has(t) && !(t.replace(/^(@|JS: )/, "") in (dict.keep || {})));
    if (rest.length) { fail = true; console.error(`\n${outName(page, lang)}: ${rest.length} Stelle(n) ohne Übersetzung:`); rest.forEach(t => console.error("  " + t.slice(0, 110))); }
    fs.writeFileSync(path.join(SRC, outName(page, lang)), out);
    console.log(`${outName(page, lang)} geschrieben`);
  }
}
if (fail) process.exit(1);
