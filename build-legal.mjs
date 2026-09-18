// Baut impressum.html und datenschutz.html aus legal/*.md.
// Self-contained, on-brand, self-hosted Inter. Kein Drittanbieter-Request.
import { readFileSync, writeFileSync } from "node:fs";

const esc = (s) => s
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Inline: **fett**, `code`, bare URLs und E-Mails verlinken. Auf bereits
// escaptem Text arbeiten.
function inline(text) {
  let t = esc(text);
  t = t.replace(/`([^`]+)`/g, "<code>$1</code>");
  t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  t = t.replace(/(https?:\/\/[^\s<]+[^\s<.,;)])/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
  t = t.replace(/([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g,
    '<a href="mailto:$1">$1</a>');
  return t;
}

function mdToHtml(md) {
  const lines = md.split("\n");
  const out = [];
  let i = 0;
  let para = [];
  const flushPara = () => {
    if (para.length) { out.push(`<p>${inline(para.join(" "))}</p>`); para = []; }
  };
  while (i < lines.length) {
    const line = lines[i];
    if (/^#\s+/.test(line)) { flushPara(); i++; continue; }        // H1 -> Seitentitel separat
    if (/^##\s+/.test(line)) { flushPara(); out.push(`<h2>${inline(line.replace(/^##\s+/, ""))}</h2>`); i++; continue; }
    if (/^---\s*$/.test(line)) { flushPara(); out.push('<hr>'); i++; continue; }
    if (/^\s*[-*]\s+/.test(line)) {
      flushPara();
      const items = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(`<li>${inline(lines[i].replace(/^\s*[-*]\s+/, ""))}</li>`);
        i++;
      }
      out.push(`<ul>${items.join("")}</ul>`);
      continue;
    }
    if (line.trim() === "") { flushPara(); i++; continue; }
    para.push(line.trim());
    i++;
  }
  flushPara();
  return out.join("\n");
}

function page(title, bodyHtml) {
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} · Closewise</title>
<meta name="robots" content="index,follow">
<style>
@font-face{font-family:"Inter";font-style:normal;font-weight:400 700;font-display:swap;src:url("fonts/inter-latin.woff2") format("woff2")}
:root{--paper:#fff;--ink:#12224E;--muted:#5B667F;--accent:#294DAF;--line:#E6E9F2}
*{box-sizing:border-box}
body{margin:0;background:var(--paper);color:var(--ink);
  font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;
  font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased}
.top{border-bottom:1px solid var(--line)}
.top .in{max-width:760px;margin:0 auto;padding:20px 24px}
.top a{color:var(--ink);text-decoration:none;font-weight:600;letter-spacing:-.01em}
.top a:hover{color:var(--accent)}
main{max-width:760px;margin:0 auto;padding:48px 24px 80px}
h1{font-size:clamp(1.8rem,4vw,2.4rem);line-height:1.15;letter-spacing:-.02em;margin:0 0 28px}
h2{font-size:1.15rem;letter-spacing:-.01em;margin:34px 0 10px;color:var(--ink)}
p{margin:0 0 14px}
ul{margin:0 0 14px;padding-left:22px}
li{margin:4px 0}
a{color:var(--accent)}
code{background:#F1EDE4;padding:1px 5px;border-radius:3px;font-size:.9em}
hr{border:0;border-top:1px solid var(--line);margin:32px 0}
strong{font-weight:600}
.back{display:inline-block;margin-top:40px;color:var(--accent);text-decoration:none;font-weight:600}
.back:hover{text-decoration:underline}
</style>
</head>
<body>
<div class="top"><div class="in"><a href="/">← Closewise</a></div></div>
<main>
<h1>${esc(title)}</h1>
${bodyHtml}
<a class="back" href="/">← Zurück zur Startseite</a>
</main>
</body>
</html>
`;
}

for (const [md, out, title] of [
  ["legal/impressum.md", "impressum.html", "Impressum"],
  ["legal/datenschutzerklaerung.md", "datenschutz.html", "Datenschutzerklärung"],
]) {
  const src = readFileSync(md, "utf8");
  writeFileSync(out, page(title, mdToHtml(src)));
  console.log(`geschrieben: ${out}`);
}
