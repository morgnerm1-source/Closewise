// Logo-Animation im Footer (nach Claude Design „Logo Animation Wordmark“, Schleife 3,6 s):
// kurzer Strich wischt von unten herein, langer Strich gleitet entlang seiner Achse heraus,
// Halten, dann zieht sich das Icon zurück (langer Strich zuerst). Der Schriftzug bleibt stehen.
// Läuft nur, solange der Footer sichtbar ist; bei reduzierter Bewegung bleibt das Logo ruhig.
(() => {
  const svg = document.querySelector('.footer .tl-logo[data-anim]');
  if (!svg || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const tick = svg.querySelector('.la-tk'), bar = svg.querySelector('.la-br');
  const ease = t => t < .5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2;   // easeInOutQuart
  const seg = (t, a, b) => ease(Math.min(1, Math.max(0, (t - a) / (b - a))));
  const AX = 24 / Math.hypot(24, 56), AY = -56 / Math.hypot(24, 56), LOOP = 3.6, OUT = 2.6;
  const draw = t => {
    const tk = seg(t, 0, .6) - seg(t, OUT + .3, OUT + .9);
    const bk = seg(t, .4, 1.1) - seg(t, OUT - .1, OUT + .5);
    const off = (1 - bk) * -54;
    tick.setAttribute('y', 72 - tk * 38);
    bar.setAttribute('transform', `translate(${AX * off} ${AY * off})`);
  };
  let raf = 0, t0 = 0;
  const frame = now => { draw(((now - t0) / 1000) % LOOP); raf = requestAnimationFrame(frame); };
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !raf) { t0 = performance.now(); raf = requestAnimationFrame(frame); }
    else if (!e.isIntersecting && raf) { cancelAnimationFrame(raf); raf = 0; draw(1.6); }
  }).observe(svg);
})();
