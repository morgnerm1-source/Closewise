/**
 * <dot-loader> — dependency-free dot-matrix loading animations.
 *
 * Usage:
 *   <script src="dot-loader.js"></script>
 *   <dot-loader variant="snake"></dot-loader>
 *
 * Attributes (all optional):
 *   variant  snake | perimeter | braille | pulse | wave | typing | orbit | twinkle | scanner | spiral | equalizer   (default: snake)
 *   size     dot diameter in px                                  (default: 4)
 *   speed    ms per frame                                         (default: 80)
 *   color    any CSS color                                        (default: currentColor)
 *   label    accessible label                                     (default: "Loading")
 *
 * Respects prefers-reduced-motion (shows a static frame).
 */
(function () {
  if (customElements.get('dot-loader')) return;

  const trail = (n, order, head, ws) => {
    const a = Array(n).fill(0), L = order.length;
    ws.forEach((w, k) => { a[order[((head - k) % L + L) % L]] = w; });
    return a;
  };
  const fillClear = (n, order, t) => {
    const L = order.length, s = t % (L * 2), a = Array(n).fill(0);
    order.forEach((c, k) => { a[c] = s < L ? (k <= s ? 1 : 0) : (k > s - L ? 1 : 0); });
    return a;
  };
  const hash = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
  const ring = (x, y) => (x === 1 && y === 1) ? 0 : (x === 1 || y === 1) ? 1 : 2;
  const grid = (c, r, f) => Array.from({ length: c * r }, (_, i) => f(i % c, Math.floor(i / c), i));

  // Each variant: [cols, rows, frame(t) -> opacity array]
  const VARIANTS = {
    snake: [2, 3, t => {
      const loop = [0, 1, 3, 5, 4, 2], h = (t % 12) >> 1, len = t % 2 ? 4 : 3, lit = new Set();
      for (let i = 0; i < len; i++) lit.add(loop[(h - 2 + i + 6) % 6]);
      return [0, 1, 2, 3, 4, 5].map(i => lit.has(i) ? 1 : 0);
    }],
    perimeter: [3, 3, t => trail(9, [0, 1, 2, 5, 8, 7, 6, 3], t, [1, .6, .3])],
    braille:   [2, 4, t => fillClear(8, [6, 4, 2, 0, 1, 3, 5, 7], t)],
    pulse:     [3, 3, t => grid(3, 3, (x, y) => [1, .35, .1][(ring(x, y) - Math.floor(t / 2) % 3 + 3) % 3])],
    wave:      [3, 3, t => grid(3, 3, (x, y) => .1 + .9 * Math.max(0, Math.cos((x + y - t * .35) * 1.05)) ** 2)],
    typing:    [3, 1, t => grid(3, 1, x => [1, .6, .3][((t >> 1) - x + 9) % 6] ?? .15)],
    orbit:     [2, 2, t => trail(4, [0, 1, 3, 2], t >> 1, [1, .45, .15])],
    twinkle:   [3, 3, t => grid(3, 3, (x, y, i) => hash(i, t >> 2) > .55 ? 1 : .12)],
    scanner:   [5, 1, t => { const s = t % 8, p = s < 5 ? s : 8 - s; return grid(5, 1, x => Math.max(.1, 1 - Math.abs(x - p) * .45)); }],
    spiral:    [3, 3, t => fillClear(9, [0, 1, 2, 5, 8, 7, 6, 3, 4], t)],
    equalizer: [3, 3, t => grid(3, 3, (x, y) => { const h = 1 + Math.floor((Math.sin(t * .55 + x * 1.9) + 1) / 2 * 2.99); return y >= 3 - h ? 1 : 0; })]
  };

  class DotLoader extends HTMLElement {
    static get observedAttributes() { return ['variant', 'size', 'speed', 'color', 'label']; }
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.t = 0;
    }
    connectedCallback() { this.build(); this.start(); }
    disconnectedCallback() { clearInterval(this.timer); }
    attributeChangedCallback() { if (this.isConnected) { this.build(); this.start(); } }

    build() {
      const v = VARIANTS[this.getAttribute('variant')] || VARIANTS.snake;
      const size = parseFloat(this.getAttribute('size')) || 4;
      const color = this.getAttribute('color') || 'currentColor';
      const gap = Math.round(size * 0.65);
      this.setAttribute('role', 'status');
      this.setAttribute('aria-label', this.getAttribute('label') || 'Loading');
      this.variant = v;
      this.shadowRoot.innerHTML = `
        <style>
          :host { display: inline-grid; grid-template-columns: repeat(${v[0]}, ${size}px); grid-auto-rows: ${size}px; gap: ${gap}px; vertical-align: middle; }
          span { width: ${size}px; height: ${size}px; border-radius: 50%; background: ${color}; opacity: 0; transition: opacity 70ms linear; }
        </style>${'<span></span>'.repeat(v[0] * v[1])}`;
      this.dots = [...this.shadowRoot.querySelectorAll('span')];
      this.render();
    }
    render() {
      const o = this.variant[2](this.t);
      this.dots.forEach((d, i) => { d.style.opacity = o[i]; });
    }
    start() {
      clearInterval(this.timer);
      if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const speed = parseFloat(this.getAttribute('speed')) || 80;
      this.timer = setInterval(() => { this.t++; this.render(); }, speed);
    }
  }

  customElements.define('dot-loader', DotLoader);
})();
