/* PrivacyPal deck design system — BOLD (New-Relic-inspired layout) on the
   PrivacyPal palette. Native pptxgenjs: real text/shapes/tables, editable.
   Ground = PrivacyPal Deep Navy. Accent = electric PrivacyPal Teal.
   Display = Space Grotesk. Body = Inter. Labels/data = JetBrains Mono. */

const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const Fi = require("react-icons/fi");

// ---------- Brand tokens — PrivacyPal Design System (AirOps Brand Kit #30260) ----------
// Dark treatment: Deep Navy ground, Signal Teal accent (brightened only where
// needed for legibility on navy, per brand guidance). Exact brand hex throughout.
const C = {
  ink:   "01204E", // Deep Navy (#01204E) — primary ground
  deep:  "01142F", // deeper navy tint — secondary grounds / scrims
  panel: "0A2C5E", // lifted navy card surface
  lift:  "12397A", // hover / emphasis navy surface
  teal:  "028391", // Signal Teal (#028391) — brand accent; solid fills behind white
  volt:  "12A7B5", // Signal Teal brightened for legible accents/highlights on navy
  sage:  "4DA394", // Forest Sage (#4DA394) — trust / proof / wins
  coral: "D54751", // Muted Coral (#D54751) — problem / risk
  tang:  "FAA968", // Burnt Tangerine (#FAA968) — energy / coverage
  amber: "F6DCAC", // Warm Amber (#F6DCAC) — glow / background wash only
  ivory: "F0ECC9", // Soft Ivory (#F0ECC9)
  espresso: "503D2D", // Espresso (#503D2D) — grounding / borders (light bg)
  white: "FFFFFF", // Pure White (#FFFFFF) — primary text on navy
  paper: "FFFFFF", // primary text on navy
  mute:  "9DB0C9", // muted blue-gray secondary text on navy (derived neutral)
  line:  "FFFFFF", // used with transparency for hairlines
};

const F = { head: "Space Grotesk", body: "Inter", mono: "JetBrains Mono" };

const W = 13.333, H = 7.5;
const MARGIN = 0.85;

const LIGHT_LOGO = "assets/pp-logo-light.png";
const LOGO_RATIO = 4000 / 1108;

// ---------- icon rasterizer (Feather -> colored PNG data URI) ----------
async function icon(IconComponent, color = "#" + C.volt, size = 256, strokeWidth = 2) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size), strokeWidth })
  );
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + png.toString("base64");
}

// ---------- shared slide helpers (string shape types; need only the slide) ----------
const bg   = (s, color = C.ink) => { s.background = { color }; };
const bgImg = (s, path) => { s.background = { path }; };

// faint radial-ish accent glow (NR motif) — large soft oval, very transparent
function glow(s, x, y, d, color = C.volt, transparency = 90) {
  s.addShape("ellipse", { x, y, w: d, h: d, fill: { color, transparency }, line: { type: "none" } });
}

// thin hairline
function rule(s, x, y, w, { color = C.line, transparency = 84, weight = 1 } = {}) {
  s.addShape("line", { x, y, w, h: 0, line: { color, transparency, width: weight } });
}

// mono dot-kicker
function kicker(s, txt, { color = C.volt, x = MARGIN, y = 0.7 } = {}) {
  s.addShape("ellipse", { x, y: y + 0.075, w: 0.12, h: 0.12, fill: { color }, line: { type: "none" } });
  s.addText(txt, {
    x: x + 0.28, y, w: 11.5, h: 0.32, margin: 0, align: "left", valign: "middle",
    fontFace: F.mono, fontSize: 12.5, color, charSpacing: 3, bold: true,
  });
}

// footer: light wordmark left + NN / TOTAL right
function footer(s, n, total) {
  s.addImage({ path: LIGHT_LOGO, x: MARGIN, y: 7.02, w: 0.92, h: 0.92 / LOGO_RATIO });
  s.addText(`${String(n).padStart(2, "0")} / ${total}`, {
    x: W - MARGIN - 1.2, y: 6.98, w: 1.2, h: 0.3, margin: 0, align: "right", valign: "middle",
    fontFace: F.mono, fontSize: 10, color: C.mute, charSpacing: 2,
  });
}

// pill button (accent fill, dark text) — solid, or outline when outline:true
function pill(s, x, y, w, h, label, { fill = C.volt, color = C.ink, fontSize = 14, outline = false } = {}) {
  s.addShape("roundRect", {
    x, y, w, h, rectRadius: h / 2,
    fill: outline ? { type: "none" } : { color: fill },
    line: outline ? { color: C.line, transparency: 64, width: 1 } : { type: "none" },
  });
  s.addText(label, {
    x, y, w, h, margin: 0, align: "center", valign: "middle",
    fontFace: F.body, fontSize, bold: true, color: outline ? C.paper : color,
  });
}

// card panel
function card(s, x, y, w, h, { fill = C.panel, lineColor = C.line, lineTransparency = 86, radius = 0.14, shadow = false } = {}) {
  const opts = { x, y, w, h, rectRadius: radius, fill: { color: fill }, line: { color: lineColor, transparency: lineTransparency, width: 1 } };
  if (shadow) opts.shadow = { type: "outer", color: "000000", blur: 14, offset: 5, angle: 90, opacity: 0.45 };
  s.addShape("roundRect", opts);
}

// full-bleed photo with a navy scrim for legibility; opt. directional (darker left)
function scrimPhoto(s, path, { base = 22, side = false } = {}) {
  s.background = { color: C.ink };
  // full-bleed cover-cropped photo (reliable fill, no distortion)
  s.addImage({ path, x: 0, y: 0, w: W, h: H, sizing: { type: "cover", w: W, h: H } });
  // overall scrim
  s.addShape("rect", { x: 0, y: 0, w: W, h: H, fill: { color: C.deep, transparency: base }, line: { type: "none" } });
  // extra left column scrim for text legibility
  if (side) s.addShape("rect", { x: 0, y: 0, w: W * 0.62, h: H, fill: { color: C.deep, transparency: 8 }, line: { type: "none" } });
}

module.exports = { C, F, W, H, MARGIN, LIGHT_LOGO, LOGO_RATIO, icon, bg, bgImg, glow, rule, kicker, footer, pill, card, scrimPhoto, Fi };
