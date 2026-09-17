// Statische Auslieferung der aktuellen Seite, ohne Abhängigkeiten.
// Railway liefert PORT; auf allen Schnittstellen lauschen.
// "/" zeigt design.html (die aktuelle Fassung); index.html ist die alte.
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".mp4": "video/mp4",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
};

// Nur diese Dateien sind auslieferbar — kein Pfad-Ausbruch möglich.
const ALLOWED = new Set([
  "design.html", "ablauf.html", "stil.css", "seite.js",
  "produkt-demo.mp4", "produkt-demo.jpg",
  "flaechen-dunkel.svg", "textur-dunkel.png", "textur-hell.png",
  "restaurant-abend.jpg", "rezeption-nacht.jpg",
  "kofferwagen-lobby.jpg", "glocke-empfang.jpg",
]);

http.createServer((req, res) => {
  const url = decodeURIComponent((req.url || "/").split("?")[0]);

  if (url === "/health") {
    res.writeHead(200, { "content-type": "text/plain" });
    return res.end("ok");
  }

  const name = url === "/" ? "design.html" : url.replace(/^\/+/, "");

  if (!ALLOWED.has(name)) {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    return res.end("404");
  }

  let body;
  try {
    body = fs.readFileSync(path.join(ROOT, name));
  } catch {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    return res.end("404");
  }

  const type = TYPES[path.extname(name).toLowerCase()] || "application/octet-stream";
  res.writeHead(200, {
    "content-type": type,
    "cache-control": "public, max-age=300",
    "x-content-type-options": "nosniff",
  });
  res.end(body);
}).listen(PORT, "0.0.0.0", () => {
  console.log(`closewise landing on :${PORT}`);
});
