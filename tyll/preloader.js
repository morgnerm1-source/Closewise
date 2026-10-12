// Preloader: dunkle Fläche mit weichem Leuchtband-Schimmer, der Schriftzug tyll.ai taucht Buchstabe
// für Buchstabe aus der Unschärfe auf; danach gleitet die Fläche nach oben. Keine Ladelinie, kein Zähler.
// Nur beim Besuch von außen (Kopf-Skript); wartet auf das Laden der Seite, höchstens 3 s.
(function () {
  var root = document.documentElement;
  if (!root.classList.contains('pl-on')) return;
  var pl = document.getElementById('pl');
  if (!pl) { root.classList.remove('pl-on'); return; }
  var t0 = performance.now(), loaded = document.readyState === 'complete', done = false;
  var finish = function () {
    if (done) return; done = true;
    pl.classList.add('out'); root.classList.add('pl-done');
    setTimeout(function () { root.classList.remove('pl-on'); pl.remove(); }, 1000);
  };
  var check = function () {
    var t = performance.now() - t0;
    if ((loaded && t > 1300) || t > 3000) finish(); else setTimeout(check, 100);
  };
  addEventListener('load', function () { loaded = true; });
  check();
})();
