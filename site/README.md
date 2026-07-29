# Profesionistas Bilingües — Marketing Site

Production-ready single-page marketing site built on the Profesionistas Bilingües design system, populated with client survey data (July 2026).

## Open locally

From the design system root, serve the `site/` folder with any static server:

```bash
cd "/Users/katarinaminich08/Downloads/Profesionistas Bilingües Design System (1)"
python3 -m http.server 8080
```

Then open: **http://localhost:8080/site/index.html** (Spanish default: **http://localhost:8080/site/index.html#/es**)

Routes use hash URLs locally (`#/es/precios`) so Python's static server works. On Netlify/Cloudflare with `site/_redirects`, clean paths like `/site/es/precios` also work.

Or open `site/index.html` directly in a browser (CDN scripts require network access).

## Site structure

The homepage is a **single scrollable landing page** with anchored sections:

| Section | Hash / deep link |
|---------|------------------|
| Hero, audience fork, ideal client | `#/es` |
| Programs & pricing (combined) | `#/es/programas` or `#/es/precios` |
| Organizations | `#/es/empresas` |
| About | `#/es/nosotros` |
| FAQ (+ free resources info) | `#/es/preguntas` |
| Contact | `#/es/contacto` |
| Free diagnostic CTA | `#/es/diagnostico` |

Separate routes exist only for **buy**, **checkout**, **privacy**, and **terms**.

Programs: **8-week virtual** ($1,297), **12-week virtual** (enroll online), **in-person** (contact us). Next cohort: **August 31**.

English mirrors use `/site/en/...` slugs. `hreflang` alternate links are injected at runtime.

## Before launch — replace placeholders

1. **Stripe payment links** — paste live URLs in `site/pricing-catalog.js` (`stripePaymentLink` for `8-week`, `12-week`, and `cert-only`); set `stripeLive: true` in `config.js`
2. **Formspree** — set `formspreeId` in `site/config.js` (contact form + newsletter signup)
3. **Calendly** — update `CALENDLY_URL` in `index.html` if Teresa's link changes
4. **Photography** — add client assets to `site/assets/` and update `site/photos.js`
5. **Google Analytics** — set `window.PB_GA_ID` before `analytics.js` loads (or edit `analytics.js`)
6. **Hosting** — deploy with `site/_redirects` for SPA pathname support

## Bilingual

Toggle EN / ES in the nav bar. Default language is **ES**. Preference saved in `localStorage`. Copy in `content.js` + `home-sections.js`.

## Files

- `site/index.html` — React SPA (CDN)
- `site/content.js` — EN/ES page copy, programs, pricing, FAQ
- `site/home-sections.js` — Homepage extended copy, quiz, ideal client
- `site/router.js` — Hash routing + hreflang
- `site/analytics.js` — GA4 funnel events (diagnostic → program → checkout)
- `site/pricing-catalog.js` — Final prices + buy-now flags + Stripe links
- `site/config.js` — Formspree ID, Stripe live flag
- `site/site.css` — Layout & responsive styles
- `site/_redirects` — Netlify/Cloudflare SPA fallback
