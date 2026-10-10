// Preloader: dunkle Fläche wie der Hero, das Closewise-Logo wird von links freigelegt und aus der
// Unschärfe scharf, eine Haarlinie (Pfirsich → Türkis) zählt bis 100; danach gleitet die Fläche
// mit gerundeter Unterkante nach oben. Nur beim Besuch von außen (siehe Kopf-Skript); wartet bei
// 90 auf das Laden der Seite, höchstens 3 s.
(function () {
  var root = document.documentElement;
  if (!root.classList.contains('pl-on')) return;
  var pl = document.getElementById('pl');
  if (!pl) { root.classList.remove('pl-on'); return; }
  var logo = pl.querySelector('.pl-logo'), bar = pl.querySelector('.pl-bar i'), num = pl.querySelector('.pl-n');
  var loaded = document.readyState === 'complete', done = false, t0 = performance.now();
  addEventListener('load', function () { loaded = true; });
  var cl = function (x) { return Math.max(0, Math.min(1, x)); };
  var ease = function (x) { return 1 - Math.pow(1 - x, 3); };
  var finish = function () {
    done = true;
    setTimeout(function () {
      pl.classList.add('out');
      root.classList.add('pl-done');
      setTimeout(function () { root.classList.remove('pl-on'); pl.remove(); }, 1000);
    }, 150);
  };
  var tick = function (now) {
    var t = (now - t0) / 1000, r = ease(cl((t - 0.1) / 0.8));
    logo.style.clipPath = 'inset(-10% ' + ((1 - r) * 100).toFixed(2) + '% -10% 0)';
    logo.style.filter = 'blur(' + ((1 - r) * 8).toFixed(2) + 'px)';
    logo.style.opacity = cl(t / 0.3);
    var p = ease(cl(t / 1.3)) * 100;
    if (!loaded && t < 3) p = Math.min(p, 90);
    bar.style.transform = 'scaleX(' + (p / 100).toFixed(4) + ')';
    num.textContent = String(Math.round(p)).padStart(2, '0');
    if (p >= 99.5 && t >= 1.3 && !done) { num.textContent = '100'; finish(); return; }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
})();
