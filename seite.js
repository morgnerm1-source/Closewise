/* ============================================================
   Closewise — gemeinsames Verhalten aller Unterseiten:
   Einblendungen beim Scrollen, Zähler, Parallaxe, Handy-Menü.
   Der Rechner bleibt in design.html, er kommt nur dort vor.
   ============================================================ */
/* ============================================================
   Bewegung
   Ein Beobachter für alles, was beim Hereinscrollen erscheint.
   Jedes Element wird nach seinem Auftritt wieder abgemeldet —
   die Animation läuft einmal, nicht bei jedem Vorbeiscrollen.
   ============================================================ */
(function () {
  var ruhig = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Gruppen: jedes Kind bekommt seinen Versatz und den Grundzustand. */
  document.querySelectorAll("[data-stagger]").forEach(function (box) {
    var schritt = parseInt(box.dataset.stagger, 10) || 80;
    Array.prototype.forEach.call(box.children, function (kind, i) {
      kind.style.setProperty("--d", i * schritt + "ms");
    });
  });

  /* Balken laufen einzeln los, von links nach rechts. */
  document.querySelectorAll('[data-anim="bars"]').forEach(function (feld) {
    Array.prototype.forEach.call(feld.children, function (balken, i) {
      balken.style.transitionDelay = i * 45 + "ms";
    });
  });

  /* Zählt eine Zahl hoch, gebremst zum Ende hin. */
  function zaehle(el) {
    var ziel = parseFloat(el.dataset.to), start = performance.now(), dauer = 1200;
    (function schritt(jetzt) {
      var t = Math.min(1, (jetzt - start) / dauer);
      el.textContent = Math.round(ziel * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(schritt);
    })(start);
  }

  /* Kopfzeile und Parallaxe hängen am selben Scroll-Ereignis und
     werden in einem einzigen Frame gezeichnet. Der Schatten gilt
     auch dann, wenn Bewegung abgeschaltet ist — er bewegt nichts. */
  var kopf = document.querySelector(".nav");
  var lagen = ruhig ? [] : [].slice.call(document.querySelectorAll("[data-parallax]"));
  var wartet = false;

  function zeichne() {
    wartet = false;
    kopf.classList.toggle("stuck", scrollY > 8);
    var hoehe = innerHeight;
    lagen.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -240 || r.top > hoehe + 240) return;   /* außer Sicht: nichts rechnen */
      var mitte = (r.top + r.height / 2 - hoehe / 2) / hoehe;
      var weg = mitte * -(parseFloat(el.dataset.parallax) || 14);
      el.style.transform = "translate3d(0," + weg.toFixed(1) + "px,0)";
    });
  }

  addEventListener("scroll", function () {
    if (!wartet) { wartet = true; requestAnimationFrame(zeichne); }
  }, { passive: true });
  addEventListener("resize", zeichne, { passive: true });
  zeichne();

  if (ruhig) {
    document.querySelectorAll(".count").forEach(function (el) {
      el.textContent = el.dataset.to;
    });
    return;
  }

  var auge = new IntersectionObserver(function (eintraege) {
    eintraege.forEach(function (e) {
      if (!e.isIntersecting) return;
      if (e.target.classList.contains("count")) zaehle(e.target);
      else e.target.classList.add("in");
      auge.unobserve(e.target);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });

  document.querySelectorAll("[data-anim], [data-stagger] > *, .count")
    .forEach(function (el) { auge.observe(el); });

})();
/* ============================================================
   Menü auf dem Handy
   Auf breiten Schirmen ist der Knopf ausgeblendet; dieses Skript
   läuft dort zwar mit, hat aber nichts zu tun.
   ============================================================ */
(function () {
  var kopf  = document.querySelector(".nav");
  var knopf = document.getElementById("navToggle");
  var liste = document.getElementById("navLinks");
  if (!kopf || !knopf || !liste) return;

  function setzen(offen) {
    kopf.classList.toggle("offen", offen);
    knopf.setAttribute("aria-expanded", offen ? "true" : "false");
  }

  knopf.addEventListener("click", function () {
    setzen(!kopf.classList.contains("offen"));
  });

  /* Nach dem Antippen eines Verweises schließen — sonst verdeckt das
     Menü genau den Abschnitt, zu dem es gerade gesprungen ist. */
  liste.addEventListener("click", function (e) {
    if (e.target.closest("a")) setzen(false);
  });

  addEventListener("keydown", function (e) {
    if (e.key === "Escape") setzen(false);
  });

  /* Wird der Schirm breit genug, übernimmt wieder die Zeile oben. */
  matchMedia("(min-width: 1000px)").addEventListener("change", function (e) {
    if (e.matches) setzen(false);
  });
})();

/* ============================================================
   Häufige Fragen und Lesefortschritt
   Das Akkordeon animiert die Höhe über Rasterzeilen (0fr -> 1fr),
   damit keine feste Höhe nötig ist. Der Fortschrittsstreifen sitzt
   auf der Unterkante der Kopfzeile.
   ============================================================ */
(function () {
  var faq = document.getElementById("faq");
  if (faq) {
    faq.addEventListener("click", function (e) {
      var knopf = e.target.closest("button");
      if (!knopf) return;
      var zeile = knopf.parentNode;
      var auf   = zeile.classList.toggle("auf");
      knopf.setAttribute("aria-expanded", auf ? "true" : "false");
      /* Immer nur eine Antwort offen — sonst wandert die Seite unter
         den Fingern weg. */
      [].forEach.call(faq.children, function (a) {
        if (a !== zeile && a.classList.contains("auf")) {
          a.classList.remove("auf");
          a.querySelector("button").setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  var streifen = document.getElementById("fortschritt");
  if (streifen) {
    var wartet = false;
    function malen() {
      wartet = false;
      var hoehe = document.documentElement.scrollHeight - innerHeight;
      var teil  = hoehe > 0 ? Math.min(1, scrollY / hoehe) : 0;
      streifen.style.transform = "scaleX(" + teil.toFixed(4) + ")";
    }
    addEventListener("scroll", function () {
      if (!wartet) { wartet = true; requestAnimationFrame(malen); }
    }, { passive: true });
    addEventListener("resize", malen, { passive: true });
    malen();
  }
})();
