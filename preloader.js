// Preloader: Closewise-Bildmarke zeichnet sich (Pfirsich → Türkis), füllt sich, Zähler 0–100,
// danach gleitet die Fläche nach oben weg. Erscheint nur beim Besuch von außen (siehe Kopf-Skript),
// wartet bei 90 auf das Laden der Seite (höchstens 3 s).
(function () {
  var root = document.documentElement;
  if (!root.classList.contains('pl-on')) return;
  var pl = document.getElementById('pl');
  if (!pl) { root.classList.remove('pl-on'); return; }
  var lines = pl.querySelectorAll('.ln'), fills = pl.querySelectorAll('.fl');
  var bar = pl.querySelector('.pl-bar i'), num = pl.querySelector('.pl-n');
  var loaded = document.readyState === 'complete', done = false, t0 = performance.now();
  addEventListener('load', function () { loaded = true; });
  var cl = function (x) { return Math.max(0, Math.min(1, x)); };
  var ease = function (x) { return 1 - Math.pow(1 - x, 3); };
  var finish = function () {
    done = true;
    setTimeout(function () {
      pl.classList.add('out');
      root.classList.add('pl-done');
      setTimeout(function () { root.classList.remove('pl-on'); pl.remove(); }, 850);
    }, 120);
  };
  var tick = function (now) {
    var t = (now - t0) / 1000, d = ease(cl(t / 0.9)), f = ease(cl((t - 0.6) / 0.5));
    for (var i = 0; i < lines.length; i++) lines[i].style.strokeDashoffset = 1 - d;
    for (var k = 0; k < fills.length; k++) fills[k].style.opacity = f;
    var p = ease(cl(t / 1.3)) * 100;
    if (!loaded && t < 3) p = Math.min(p, 90);
    bar.style.transform = 'scaleX(' + (p / 100) + ')';
    num.textContent = Math.round(p);
    if (p >= 99.5 && t >= 1.3 && !done) { num.textContent = '100'; finish(); return; }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
})();
