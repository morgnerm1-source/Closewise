# Closewise — Berlin landing page

The sales page for Berlin hotels. German by default with an English toggle.

One self-contained `index.html` — all styles, scripts and images inlined, no
build step and no dependencies. `server.js` is a dependency-free Node server
that returns the page on every path and answers `/health`.

## Run it

```bash
npm start          # http://localhost:3000
```

## What's on the page

- A live demo of the nightly close running in the hero: fourteen receipts, a
  rule sweeping down, eleven clearing and three flagging.
- The problem, the three steps, and what the AI takes over.
- What gets flagged, and the repeat causes across seven nights.
- How Closewise differs from a PMS, accounting software and doing it by hand.
- An ROI calculator — drag outlets and hourly cost, the yearly figures move.
- Call booking, handed off to Calendly rather than inventing our own availability.

## Before it goes to a hotel

- Screens show demonstration data; the figures are synthetic and labelled as
  such inside the product.

The product itself lives in a separate repository.
