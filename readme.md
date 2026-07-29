# Profesionistas Bilingües Design System

**Company:** Profesionistas Bilingües — personalized English and Spanish coaching for professionals, online or in person, built around who you are and where you're headed. Positioning line: "Where bilingual professionals find their voice." Brand kicker: "Perform. Connect. Grow."

**Sources provided:** a set of pre-drafted specimen cards and two copies of a logo mark (under `uploads/`), plus `uploads/PB_Brand guidelines.pdf` — an official (draft, client-review) brand guidelines PDF that confirms the palette, type, voice, and adds logo lockup rules, accessibility rules, and UI application notes. The PDF's colors/fonts matched the specimen cards exactly, so tokens were unchanged; the additions below (logo lockups, Fluent Yellow usage limits, button/link specs) came from the PDF. Because no component library or app was provided, the reusable components are the standard set sized to a coaching-services marketing site, not a copy of an existing product.

## Brand guidelines (from `PB_Brand guidelines.pdf`, draft for client review)
- **Logo lockups (4):** compact+tagline (business cards, posters, loading screens), compact no-tagline (favicon/app icon/small avatars), horizontal+tagline (letterhead, email signature), horizontal no-tagline (nav bars, repeated placements). Dark-surface treatment applies to all four: mark stays full color, only the wordmark switches to white. See `guidelines/logo-lockups.html`. Never stretch/distort, recolor outside approved variants, or add drop shadows/outlines.
- **Color usage rules:** Bridge Blue for primary CTAs and links. Progress Purple for secondary accents/section labels, used deliberately — not a wash. **Fluent Yellow: one small highlight moment per screen, maximum** (a badge, a dot, an underline) — never a large field/button fill, and **never a text color** (fails WCAG AA against both light and dark surfaces). Every text/background pairing must meet 4.5:1 contrast minimum.
- **Type scale (confirmed):** H1 44px, H2 32px, H3 19px, Body 16px, Caption 12px — Sora for headings (SemiBold/Bold/ExtraBold), Inter for body (Regular–SemiBold).
- **Voice:** confident, warm, formal, credible, encouraging, direct. Do: "We'll help you lead your next negotiation in either language, with confidence." Don't: hype/exclamation copy like "Unlock your fluency potential today!". Same tone in English and Spanish, natural bilingual mixing over literal translation.
- **Buttons:** pill shape, Bridge Blue fill, white label; hover = slight color shift; press = `scale(0.97)`. Links: Bridge Blue, no underline at rest, underline on hover.
- **Bilingual layout note:** branding stays visually identical across English/Spanish (layout, color, type never change — only copy). Spanish runs longer with accented characters (á é í ó ú ñ ¿ ¡) — leave extra width in buttons/headers.
- **Imagery:** photography-led, icons used sparingly for UI, no illustration — mood professional-but-approachable. Actual photography not yet supplied.

## Content fundamentals
- **Voice:** confident, warm, direct — a coach's voice, not a corporate one. Short declarative sentences ("Where bilingual professionals find their voice."). Verbs of motion and growth: perform, connect, grow, lead, deliver, negotiate.
- **Address:** speaks to "you" — the professional — not "our users." First-person plural ("we help...") for the company, second-person for the reader.
- **Bilingual by nature:** copy can mix English and Spanish product language (e.g. "Español para negocios") without translating everything — reflects the bilingual audience rather than treating Spanish as an afterthought.
- **Casing:** sentence case for headlines and buttons; the kicker line uses uppercase with wide tracking ("PERFORM. CONNECT. GROW.") as a signature treatment, not a general rule.
- **No emoji.** No exclamation-heavy hype copy. Confidence comes from precision, not enthusiasm.
- Example body line (from the type specimen): "We help professionals lead meetings, deliver presentations, and negotiate with confidence in both languages."

## Visual foundations
- **Colors:** warm, paper-like neutrals (`#F5F4F1` page / `#FBF9F4` card) instead of stark white or gray, paired with three saturated brand colors — Bridge Blue `#121BFF`, Progress Purple `#682886`, Fluent Yellow `#F0D81A` (highlight-only, see usage rules above) — plus Ink Navy `#0F1A3A` for text and dark surfaces. The palette reads "confident bilingual," not corporate-generic: no blue-purple gradient wash, no muted SaaS pastel.
- **Type:** two families. **Sora** (ExtraBold/Bold/SemiBold) for headlines, section labels, and the wordmark — geometric, confident. **Inter** (Regular–SemiBold) for body copy, UI labels, and forms — a workhorse text face. Never mix them the other way (no Inter headlines, no Sora body paragraphs).
- **Spacing:** 4px base scale (4/8/12/16/24/32/48/64/96). Generous section padding (56–80px) on marketing surfaces; tight 8–16px rhythm inside components.
- **Radius:** sm 4px (inputs, small chips), md 8px (buttons where used, tags), lg 12px (cards, dialogs), pill (buttons, badges, tags) — pill is the signature shape for anything clickable, giving the brand its rounded, human warmth over sharp corporate rectangles.
- **Shadow:** soft and warm-toned (navy-tinted, not pure black) — `shadow-sm` for resting cards, `shadow-md` for hover/toasts, `shadow-lg` for modals. No hard drop shadows.
- **Backgrounds:** flat brand-color fields (e.g. Ink Navy hero) rather than gradients, photography, or texture — none of the source material used imagery, illustration, or pattern fills, so full-bleed photography is intentionally absent until real photography is supplied.
- **Motion:** short and functional — 120ms for press feedback (button scale-down), 200ms for state transitions (focus rings, toggle slide), standard ease-out curve `cubic-bezier(.3,0,.2,1)`. No bounce, no long fades.
- **Hover/press states:** hover uses subtle color shift (handled by consumers per-component); press uses a slight scale-down (`scale(0.97)`) on buttons — not a darker/lighter color swap.
- **Borders:** 1px hairline `--border-default` (`#E4E2DC`) separating cards and inputs from the warm-white page; focus state adds a 3px soft blue glow ring rather than a heavier border.
- **Cards:** card-white fill, 1px hairline border, `radius-lg`, `shadow-sm` — a quiet, paper-like surface, never a colored left border accent.
- **Transparency/blur:** used only for modal scrims (`rgba(15,26,58,0.45)`) — no frosted-glass panels elsewhere.

## Iconography
No icon system, icon font, or SVG set was provided in the source material. Do not invent icons freely — the primitives above avoid icon dependence entirely (Button/Tag/Badge are text-first). If icons are needed, use a plain unicode glyph sparingly or ask the user for a preferred icon set (e.g. Lucide/Heroicons via CDN) before introducing one. No emoji is used anywhere in the brand voice or UI.

## Logo
`assets/logo-mark.png` — an arch/bridge mark (blue + purple arcs meeting under a yellow circle), symbolizing connection between two languages. No separate wordmark image was provided; the wordmark is always set in Sora Bold/ExtraBold as live type (see `guidelines/logo-lockups.html`). `uploads/pb-logo.png` is an identical copy of the mark, kept only as a source reference.

## Index
- `styles.css` — root stylesheet, imports everything under `tokens/`.
- `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css` (radius + shadow + motion), `tokens/fonts.css` (Google Fonts import for Sora + Inter — no local font files were provided; flagging this substitution, see Caveats).
- `assets/logo-mark.png` — brand mark.
- `guidelines/` — foundation specimen cards (as originally drafted): `colors-brand.html`, `colors-neutral.html`, `colors-semantic.html`, `logo-icon.html`, `logo-lockups.html`, `radius-shadow.html`, `spacing-scale.html`, `type-body.html`, `type-display.html`, `type-scale.html`.
- `components/forms/` — Button, Input, Select, Checkbox, Radio, Switch.
- `components/core/` — Card, Badge, Tag, Avatar, Divider, Motif (decorative rings/spark/blob/dot for brand backdrops).
- `components/navigation/` — Tabs, Breadcrumb, Pagination.
- `components/feedback/` — Dialog, Toast, Tooltip.
- `ui_kits/marketing-site/` — click-through recreation of the coaching website: Home, Coaches, Pricing, Booking (`index.html` to run it).
- `thumbnail.html` — homepage tile for this design system.
- `SKILL.md` — portable skill file for use in Claude Code.

### Intentional additions
No source defined a component inventory, so the standard set above (Button, Input, Select, Checkbox, Radio, Switch, Card, Badge, Tag, Avatar, Divider, Motif, Tabs, Breadcrumb, Pagination, Dialog, Toast, Tooltip) was authored from scratch, sized to a coaching-services marketing site's needs.

## Caveats
- **Fonts:** Sora and Inter are loaded from Google Fonts CDN (`tokens/fonts.css`) since no font binaries were provided. If exact licensed font files exist, send them over and this can be switched to self-hosted `@font-face`.
- **No codebase, Figma file, or slide deck was attached** — the UI kit is an original coaching-site build using the visual foundations above, not a recreation of an existing product. If there's a live site or app, attach it so the UI kit can be corrected to match it exactly.
- **No icon set or photography was provided** — imagery direction (photography-led, no illustration) is confirmed in the brand guidelines PDF, but actual photo assets are still pending; `image-slot` placeholders are used until real photography is supplied.
- **The brand guidelines PDF is explicitly marked draft/placeholder** ("colors, name, and tagline shown are placeholders pending client input") — treat the palette/name as the working direction, not final-final, until the client confirms.
