# PrivacyPal Sales Decks

Native, **editable** PowerPoint decks — bold layout on the PrivacyPal navy/teal palette,
Space Grotesk display type. The `.pptx` files are the deliverable; the `build-*.js`
scripts are the source of truth (real text boxes, shapes, and tables — not images).

## Decks
- `privacypal-sales-deck.pptx` — SME deck (18 slides) ← `build-sme.js`
- `privacypal-enterprise-deck.pptx` — Enterprise / Cloud deck (11 slides) ← `build-enterprise.js`
- Matching `*.pdf` are exported from the PPTX (see Preview below).

## Design system — `lib/brand.js`
Single source of tokens + helpers (shared by both decks):
- **Palette (PrivacyPal):** ink navy `#01204E` ground · electric teal `#19CEDB` accent · deep teal `#028391` · sage/coral/tangerine for wins/risk/energy · cool-white text.
- **Type:** `Space Grotesk` (display), `Inter` (body), `JetBrains Mono` (labels/data).
- **Helpers:** `bg`, `glow`, `kicker`, `footer`, `pill`, `card`, `rule`, `scrimPhoto`, `icon` (Feather → PNG via `sharp`).

To restyle globally, edit `lib/brand.js`. To edit a slide's content/layout, edit the
relevant `build-*.js` and rebuild.

## Build
```bash
./build.sh          # installs the font + deps if needed, builds both decks
# or:
npm run build       # both
npm run build:sme   # just the SME deck
npm run build:enterprise
```
Requires Node 20+. First run installs the **Space Grotesk** font into `~/Library/Fonts`
so PowerPoint/Keynote render it natively (body Inter + JetBrains Mono are standard).

## Preview / PDF export
`pptxgenjs` emits PPTX only. To eyeball slides or refresh the PDFs, export via Keynote:
```bash
./render.sh privacypal-sales-deck.pptx out/        # writes out/*.png + privacypal-sales-deck.pdf
```

## Assets — `assets/`
Logos, tool marks, `jason-melo.jpg`, and photography in `assets/bg/` (domain photos
are free-license; see `assets/bg/CREDITS.txt`). SVG/WebP logos are rasterized at build
time via `sharp` so they embed reliably.

## Legacy
The previous **HTML → headless-Chrome screenshot → image-per-slide** pipeline (flat,
non-editable output) is archived under `legacy/`. It is no longer the source.

## Notes
- Font portability: Space Grotesk renders natively on machines that have it installed.
  On machines without it, PowerPoint substitutes a fallback — fine for an internal
  source file; revisit font embedding if sharing externally.
- Keynote's PNG/PDF export occasionally previews photo-background slides at reduced
  resolution; the PPTX itself is full-bleed and correct (verified in the slide XML).
