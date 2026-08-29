// One page, no dependencies. Railway supplies PORT; bind every interface.
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const PORT = process.env.PORT || 3000;
const page = fs.readFileSync(path.join(__dirname, "index.html"));

http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "content-type": "text/plain" });
    return res.end("ok");
  }
  res.writeHead(200, {
    "content-type": "text/html; charset=utf-8",
    "cache-control": "public, max-age=300",
    "x-content-type-options": "nosniff",
  });
  res.end(page);
}).listen(PORT, "0.0.0.0", () => {
  console.log(`closewise landing on :${PORT}`);
});
