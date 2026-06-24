/* PrivacyPal — SME Sales Deck (18 slides), native editable PPTX.
   Bold New-Relic-inspired layout on the PrivacyPal navy/teal palette.
   Run:  node build-sme.js   ->  privacypal-sales-deck.pptx               */

const pptxgen = require("pptxgenjs");
const sharp = require("sharp");
const B = require("./lib/brand");
const { C, F, W, H, MARGIN, icon, Fi } = B;

// rasterize any image (png/webp/svg) to a PNG data URI so PPTX embeds it reliably
const toPng = async (f, width = 700) =>
  "image/png;base64," + (await sharp("assets/" + f, { density: 300 }).resize({ width, withoutEnlargement: false }).png().toBuffer()).toString("base64");

const TOTAL = 18;
const cr = (t, brk) => ({ text: t, options: { color: C.paper, breakLine: !!brk } });
const ac = (t, brk) => ({ text: t, options: { color: C.volt, breakLine: !!brk } });
const co = (t, brk) => ({ text: t, options: { color: C.coral, breakLine: !!brk } });

(async () => {
  const I = {
    check:  await icon(Fi.FiCheck, "#" + C.sage),
    checkT: await icon(Fi.FiCheck, "#" + C.volt),
    zap:    await icon(Fi.FiZap, "#" + C.volt),
    eye:    await icon(Fi.FiEyeOff, "#" + C.coral),
    alert:  await icon(Fi.FiAlertTriangle, "#" + C.coral),
    drop:   await icon(Fi.FiAlertCircle, "#" + C.coral),
    shield: await icon(Fi.FiShield, "#" + C.volt),
    repeat: await icon(Fi.FiRepeat, "#" + C.ink),
    restore:await icon(Fi.FiCornerUpLeft, "#" + C.ink),
    ext:    await icon(Fi.FiExternalLink, "#" + C.volt),
    lock:   await icon(Fi.FiLock, "#" + C.volt),
    key:    await icon(Fi.FiKey, "#" + C.volt),
    dollar: await icon(Fi.FiDollarSign, "#" + C.sage),
    activity:await icon(Fi.FiActivity, "#" + C.sage),
    brief:  await icon(Fi.FiBriefcase, "#" + C.sage),
    monitor:await icon(Fi.FiMonitor, "#" + C.sage),
    code:   await icon(Fi.FiCode, "#" + C.sage),
    arrowT: await icon(Fi.FiArrowRight, "#" + C.tang),
  };
  const TLOGO = {
    chatgpt:    await toPng("pp-chatgpt.png"),
    claude:     await toPng("pp-claude.png"),
    gemini:     await toPng("pp-gemini.png"),
    perplexity: await toPng("perplexity_wordmark.svg"),
    copilot:    await toPng("pp-copilot.webp"),
    cursor:     await toPng("cursor_wordmark.svg"),
  };

  const p = new pptxgen();
  p.defineLayout({ name: "WIDE", width: W, height: H });
  p.layout = "WIDE";
  p.author = "PrivacyPal"; p.company = "PrivacyPal"; p.title = "PrivacyPal — Safe AI. Anywhere.";

  // ============================================================ 1 — TITLE
  {
    const s = p.addSlide(); B.bg(s); B.glow(s, 8.5, -1.7, 7.4, C.volt, 90);
    s.addImage({ path: B.LIGHT_LOGO, x: MARGIN, y: 0.7, w: 2.4, h: 2.4 / B.LOGO_RATIO });
    B.kicker(s, "ON-DEVICE AI PRIVACY & GOVERNANCE", { y: 1.75 });
    s.addText([cr("Safe AI.", true), ac("Anywhere.")], {
      x: MARGIN - 0.05, y: 2.4, w: 11.5, h: 3, margin: 0, fontFace: F.head, fontSize: 100, bold: true, lineSpacingMultiple: 0.93,
    });
    s.addText("On-device data protection for every AI interaction.", {
      x: MARGIN, y: 5.55, w: 10, h: 0.6, margin: 0, fontFace: F.body, fontSize: 22, color: C.mute,
    });
    B.pill(s, MARGIN, 6.35, 2.7, 0.62, "Book a demo  →", { fontSize: 15 });
  }

  // ============================================================ 2 — WHO WE ARE
  {
    const s = p.addSlide(); B.bg(s); B.glow(s, -2, 4, 6, C.teal, 92);
    B.kicker(s, "WHO WE ARE");
    // circular portrait with teal ring
    const px = MARGIN, py = 1.7, pd = 3.0;
    s.addShape("ellipse", { x: px, y: py, w: pd, h: pd, fill: { color: C.deep }, line: { color: C.volt, width: 2.5 } });
    s.addImage({ path: "assets/jason-melo.jpg", x: px + 0.1, y: py + 0.1, w: pd - 0.2, h: pd - 0.2, rounding: true });
    const rx = px + pd + 0.7;
    s.addText("Jason Melo", { x: rx, y: 1.55, w: 8, h: 0.9, margin: 0, fontFace: F.head, fontSize: 52, bold: true, color: C.paper });
    s.addText("Two-time unicorn founder. CEO, PrivacyPal.", { x: rx, y: 2.5, w: 8, h: 0.4, margin: 0, fontFace: F.body, fontSize: 18, color: C.mute });
    const rows = [["BACKED BY", "Fastweb + Vodafone"], ["PARTNER", "NVIDIA Inception"], ["TRACTION", "10M+ records scanned and protected"], ["FEATURED", "Plug and Play Silicon Valley Summit — 4,000 attendees"]];
    rows.forEach((r, i) => {
      const y = 3.15 + i * 0.52;
      s.addText(r[0], { x: rx, y, w: 1.7, h: 0.4, margin: 0, fontFace: F.mono, fontSize: 11, color: C.volt, charSpacing: 2, bold: true, valign: "middle" });
      s.addText(r[1], { x: rx + 1.8, y, w: 6.6, h: 0.4, margin: 0, fontFace: F.body, fontSize: 16.5, color: C.paper, bold: true, valign: "middle" });
    });
    s.addText("“We didn't build a feature. We built an architecture.”", { x: rx, y: 5.45, w: 8, h: 0.5, margin: 0, fontFace: F.head, italic: true, fontSize: 20, color: C.volt });
    B.footer(s, 2, TOTAL);
  }

  // ============================================================ 3 — TRUST SIGNALS
  {
    const s = p.addSlide(); B.bg(s); B.glow(s, 8.8, 3.5, 6, C.volt, 92);
    B.kicker(s, "BACKED BY");
    s.addText("The names behind us.", { x: MARGIN, y: 1.15, w: 11, h: 0.9, margin: 0, fontFace: F.head, fontSize: 46, bold: true, color: C.paper });
    const logos = ["assets/vodafone-fastweb.png", "assets/nvidia-inception.png", "assets/plug-and-play.png"];
    const cw = 3.4, gap = 0.4, x0 = (W - (cw * 3 + gap * 2)) / 2, ly = 2.5, ch = 1.5;
    logos.forEach((lg, i) => {
      const x = x0 + i * (cw + gap);
      s.addShape("roundRect", { x, y: ly, w: cw, h: ch, rectRadius: 0.12, fill: { color: "F5F0E8" }, line: { type: "none" } });
      s.addImage({ path: lg, x: x + 0.5, y: ly + 0.42, w: cw - 1.0, h: ch - 0.84, sizing: { type: "contain", w: cw - 1.0, h: ch - 0.84 } });
    });
    s.addText("FINANCE   ·   HEALTHCARE   ·   LEGAL   ·   TECHNOLOGY", { x: 0, y: 4.3, w: W, h: 0.4, margin: 0, align: "center", fontFace: F.mono, fontSize: 13, color: C.mute, charSpacing: 2 });
    s.addText([{ text: "10M", options: { color: C.paper } }, { text: "+", options: { color: C.volt } }], { x: 0, y: 4.95, w: W, h: 1.4, margin: 0, align: "center", fontFace: F.head, fontSize: 96, bold: true });
    s.addText("RECORDS PROTECTED", { x: 0, y: 6.35, w: W, h: 0.3, margin: 0, align: "center", fontFace: F.mono, fontSize: 12, color: C.mute, charSpacing: 3 });
    B.footer(s, 3, TOTAL);
  }

  // ============================================================ 4 — SHADOW AI (photo)
  {
    const s = p.addSlide(); B.scrimPhoto(s, "assets/bg/bg-shadow.jpg", { base: 14, side: true });
    s.addShape("rect", { x: 0, y: 1.3, w: 0.14, h: 4.9, fill: { color: C.coral }, line: { type: "none" } });
    B.kicker(s, "THE SHADOW AI PROBLEM", { color: C.coral });
    s.addText([cr("Does your team use ChatGPT?", true), cr("Do you know what they're "), co("pasting into it?")], {
      x: MARGIN, y: 1.45, w: 11.5, h: 1.9, margin: 0, fontFace: F.head, fontSize: 46, bold: true, lineSpacingMultiple: 1.02,
    });
    s.addText("Every prompt is a data event.", { x: MARGIN, y: 3.5, w: 9, h: 0.45, margin: 0, fontFace: F.body, fontSize: 20, bold: true, color: C.paper });
    const chips = ["Customer PII", "Financial records", "Health data", "Source code & API keys", "Proprietary strategy docs"];
    let cx = MARGIN, cy = 4.15;
    chips.forEach((t) => {
      const w = 0.34 + t.length * 0.097;
      if (cx + w > W - MARGIN) { cx = MARGIN; cy += 0.56; }
      s.addShape("roundRect", { x: cx, y: cy, w, h: 0.44, rectRadius: 0.1, fill: { color: C.white, transparency: 92 }, line: { color: C.line, transparency: 70, width: 1 } });
      s.addText(t, { x: cx, y: cy, w, h: 0.44, margin: 0, align: "center", valign: "middle", fontFace: F.mono, fontSize: 12, color: C.paper });
      cx += w + 0.16;
    });
    s.addText([cr("Your firewall can't see it.   ", false), cr("Your DLP can't stop it.   ", false), co("It's happening right now.")], {
      x: MARGIN, y: 5.7, w: 11.5, h: 0.6, margin: 0, fontFace: F.body, fontSize: 19, bold: true,
    });
    B.footer(s, 4, TOTAL);
  }

  // ============================================================ 5 — GOVERNANCE LAYER
  {
    const s = p.addSlide(); B.bg(s);
    B.kicker(s, "THE GOVERNANCE LAYER");
    s.addText([cr("Teams run 10+ AI agents. PrivacyPal governs the "), ac("space in between"), cr(".")], {
      x: MARGIN, y: 1.15, w: 11.6, h: 1.2, margin: 0, fontFace: F.head, fontSize: 34, bold: true, lineSpacingMultiple: 1.0,
    });
    const yb = 2.95, ch = 2.7, colW = 3.5, gap = 0.55, x0 = MARGIN;
    // zone 1
    B.card(s, x0, yb, colW, ch);
    s.addText("YOUR DATA", { x: x0 + 0.3, y: yb + 0.3, w: colW - 0.6, h: 0.3, margin: 0, fontFace: F.mono, fontSize: 11, color: C.mute, charSpacing: 2, bold: true });
    s.addText("Sensitive information", { x: x0 + 0.3, y: yb + 0.75, w: colW - 0.6, h: 0.8, margin: 0, fontFace: F.head, fontSize: 22, bold: true, color: C.paper });
    s.addText("PII · Financials · Source code · Strategy", { x: x0 + 0.3, y: yb + 1.65, w: colW - 0.6, h: 0.8, margin: 0, fontFace: F.body, fontSize: 13.5, color: C.mute, lineSpacingMultiple: 1.3 });
    // gate (teal)
    const gx = x0 + colW + gap;
    s.addShape("roundRect", { x: gx, y: yb, w: colW, h: ch, rectRadius: 0.14, fill: { color: C.teal }, line: { type: "none" }, shadow: { type: "outer", color: "000000", blur: 18, offset: 6, angle: 90, opacity: 0.4 } });
    s.addText("PRIVACYPAL", { x: gx + 0.3, y: yb + 0.28, w: colW - 0.6, h: 0.3, margin: 0, fontFace: F.mono, fontSize: 11, color: C.white, charSpacing: 2, bold: true });
    s.addText("Govern. Protect. Enable.", { x: gx + 0.3, y: yb + 0.62, w: colW - 0.6, h: 0.6, margin: 0, fontFace: F.head, fontSize: 21, bold: true, color: C.white });
    ["Data Privacy", "Controls", "Usage Audit", "Compliance"].forEach((t, i) => {
      s.addText("✓  " + t, { x: gx + 0.3, y: yb + 1.3 + i * 0.34, w: colW - 0.6, h: 0.32, margin: 0, fontFace: F.body, fontSize: 14, bold: true, color: C.white });
    });
    // zone 3
    const zx = gx + colW + gap;
    B.card(s, zx, yb, colW, ch);
    s.addText("IN PRODUCTION", { x: zx + 0.3, y: yb + 0.3, w: colW - 0.6, h: 0.3, margin: 0, fontFace: F.mono, fontSize: 11, color: C.mute, charSpacing: 2, bold: true });
    s.addText([{ text: "10", options: { color: C.volt } }, { text: "+", options: { color: C.volt } }], { x: zx + 0.3, y: yb + 0.6, w: colW - 0.6, h: 1.0, margin: 0, fontFace: F.head, fontSize: 60, bold: true });
    s.addText("AI Agents", { x: zx + 0.3, y: yb + 1.65, w: colW - 0.6, h: 0.4, margin: 0, fontFace: F.body, fontSize: 16, bold: true, color: C.paper });
    s.addText("ChatGPT · Claude · Copilot · Gemini · Cursor · Custom", { x: zx + 0.3, y: yb + 2.05, w: colW - 0.6, h: 0.6, margin: 0, fontFace: F.mono, fontSize: 11, color: C.mute, lineSpacingMultiple: 1.3 });
    // arrows
    [x0 + colW + 0.08, gx + colW + 0.08].forEach((ax) => s.addText("→", { x: ax, y: yb + ch / 2 - 0.3, w: gap - 0.16, h: 0.6, margin: 0, align: "center", valign: "middle", fontFace: F.head, fontSize: 26, color: C.volt, bold: true }));
    s.addText([cr("Your CISO stops being the blocker. Your team moves at "), ac("AI speed"), cr(".")], { x: MARGIN, y: 6.1, w: 11.6, h: 0.5, margin: 0, fontFace: F.head, fontSize: 22, bold: true });
    B.footer(s, 5, TOTAL);
  }

  // ============================================================ 6 — OLD APPROACH
  {
    const s = p.addSlide(); B.bg(s);
    B.kicker(s, "THE OLD APPROACH", { color: C.coral });
    s.addText("The old approach kills the output.", { x: MARGIN, y: 1.15, w: 11.6, h: 0.9, margin: 0, fontFace: F.head, fontSize: 44, bold: true, color: C.paper });
    const bw = 5.55, gap = 0.5, x0 = MARGIN, by = 2.5, bh = 2.5;
    B.card(s, x0, by, bw, bh);
    s.addText("INPUT · TRADITIONAL DLP", { x: x0 + 0.35, y: by + 0.3, w: bw - 0.7, h: 0.3, margin: 0, fontFace: F.mono, fontSize: 11, color: C.mute, charSpacing: 2 });
    s.addText([cr("Prepare a financial summary for "), co("[CLIENT NAME]"), cr(" showing Q3 revenue of "), co("$4.2M")], { x: x0 + 0.35, y: by + 0.8, w: bw - 0.7, h: 1.4, margin: 0, fontFace: F.mono, fontSize: 14.5, lineSpacingMultiple: 1.5 });
    const x1 = x0 + bw + gap;
    s.addShape("roundRect", { x: x1, y: by, w: bw, h: bh, rectRadius: 0.14, fill: { color: C.deep }, line: { color: C.line, transparency: 88, width: 1 } });
    s.addText("OUTPUT · WHAT THE AI SEES", { x: x1 + 0.35, y: by + 0.3, w: bw - 0.7, h: 0.3, margin: 0, fontFace: F.mono, fontSize: 11, color: C.mute, charSpacing: 2 });
    s.addText("Prepare a financial summary for [REDACTED] showing Q3 revenue of [REDACTED]", { x: x1 + 0.35, y: by + 0.8, w: bw - 0.7, h: 1.0, margin: 0, fontFace: F.mono, fontSize: 14.5, color: C.mute, lineSpacingMultiple: 1.5 });
    s.addText("→ AI can't process it. Output is useless. Team bypasses the tool.", { x: x1 + 0.35, y: by + 1.95, w: bw - 0.7, h: 0.5, margin: 0, fontFace: F.mono, fontSize: 12.5, color: C.coral, lineSpacingMultiple: 1.3 });
    s.addText("The tradeoff between security and productivity shouldn't exist.", { x: MARGIN, y: 5.35, w: 11.6, h: 0.7, margin: 0, fontFace: F.head, fontSize: 30, bold: true, color: C.paper });
    s.addText([co("Redaction breaks context.    "), co("Redaction breaks accuracy.    "), co("Redaction breaks adoption.")], { x: MARGIN, y: 6.2, w: 11.6, h: 0.4, margin: 0, fontFace: F.body, fontSize: 15, bold: true });
    B.footer(s, 6, TOTAL);
  }

  // ============================================================ 7 — INTRODUCING
  {
    const s = p.addSlide(); B.bg(s); B.glow(s, 8.6, -1.5, 7, C.volt, 91);
    s.addShape("rect", { x: 0, y: 0, w: W, h: 0.16, fill: { color: C.volt }, line: { type: "none" } });
    B.kicker(s, "INTRODUCING PRIVACYPAL");
    s.addText("The AI privacy layer that doesn't break your workflow.", { x: MARGIN, y: 1.2, w: 9.4, h: 1.6, margin: 0, fontFace: F.head, fontSize: 44, bold: true, color: C.paper, lineSpacingMultiple: 1.0 });
    const items = ["On-device protection — data never leaves your machine", "Works across every AI tool your team uses", "Browser extension + desktop app", "One install. Full coverage.", "Zero learning curve — runs silently in the background"];
    items.forEach((t, i) => {
      const y = 3.25 + i * 0.6;
      s.addImage({ data: I.checkT, x: MARGIN, y: y + 0.02, w: 0.3, h: 0.3 });
      s.addText(t, { x: MARGIN + 0.5, y, w: 10.5, h: 0.4, margin: 0, fontFace: F.body, fontSize: 19, color: C.paper, valign: "middle" });
    });
    s.addText("Simple. Powerful. Private.", { x: MARGIN, y: 6.35, w: 9, h: 0.5, margin: 0, fontFace: F.head, italic: true, fontSize: 26, color: C.volt });
    B.footer(s, 7, TOTAL);
  }

  // ============================================================ 8 — PRIVACY TWINS
  {
    const s = p.addSlide(); B.bg(s);
    B.kicker(s, "HOW IT WORKS");
    s.addText([cr("Privacy Twins™ — "), ac("swap, process, restore"), cr(".")], { x: MARGIN, y: 1.1, w: 11.6, h: 0.7, margin: 0, fontFace: F.head, fontSize: 34, bold: true });
    s.addText("PRIVACY TWIN · 18 HIPAA IDENTIFIERS · CONTEXTUAL SWAP · §164.514", { x: MARGIN, y: 1.85, w: 11.6, h: 0.3, margin: 0, fontFace: F.mono, fontSize: 10.5, color: C.volt, charSpacing: 1.5 });
    const cw = 5.0, gap = 1.5, x0 = MARGIN, x1 = x0 + cw + gap, ya = 2.4, yb = 4.35, rh = 1.75;
    const cellY = (xx, yy, lbl, lblColor, runs2) => {
      B.card(s, xx, yy, cw, rh, { fill: lblColor === C.sage ? C.panel : C.panel });
      s.addText(lbl, { x: xx + 0.28, y: yy + 0.2, w: cw - 0.5, h: 0.3, margin: 0, fontFace: F.mono, fontSize: 10, color: lblColor, charSpacing: 1, bold: true });
      s.addText(runs2, { x: xx + 0.28, y: yy + 0.55, w: cw - 0.56, h: rh - 0.7, margin: 0, fontFace: F.body, fontSize: 12.5, color: C.paper, lineSpacingMultiple: 1.35 });
    };
    const sens = (t) => ({ text: t, options: { color: C.coral, bold: true } });
    const twin = (t) => ({ text: t, options: { color: C.volt, bold: true } });
    cellY(x0, ya, "① WHAT YOU TYPE", C.coral, [cr('"My patient '), sens("Margaret Chen"), cr(" — recent MI, "), sens("MRN 4471-8829"), cr(" — presented "), sens("March 14"), cr(' with chest pain. Workup?"')]);
    cellY(x1, ya, "② WHAT THE AI SEES", C.volt, [cr('"My patient '), twin("Nancy Grace"), cr(" — recent MI, "), twin("MRN 8826-3142"), cr(" — presented "), twin("April 22"), cr(' with chest pain. Workup?"')]);
    cellY(x0, yb, "④ WHAT YOU GET BACK · RESTORED", C.sage, [cr("For "), sens("Margaret Chen"), cr(": 12-lead ECG + serial troponins, aspirin + nitrate, admit cardiology.")]);
    cellY(x1, yb, "③ WHAT THE AI RETURNS", C.volt, [cr("For "), twin("Nancy Grace"), cr(": 12-lead ECG + serial troponins, aspirin + nitrate, admit cardiology.")]);
    // connector pills
    s.addShape("ellipse", { x: x0 + cw + gap / 2 - 0.32, y: ya + rh / 2 - 0.32, w: 0.64, h: 0.64, fill: { color: C.volt }, line: { type: "none" } });
    s.addImage({ data: I.repeat, x: x0 + cw + gap / 2 - 0.16, y: ya + rh / 2 - 0.16, w: 0.32, h: 0.32 });
    s.addText("SWAP", { x: x0 + cw + gap / 2 - 0.6, y: ya + rh / 2 + 0.34, w: 1.2, h: 0.2, margin: 0, align: "center", fontFace: F.mono, fontSize: 8, color: C.mute, charSpacing: 1 });
    s.addShape("ellipse", { x: x0 + cw + gap / 2 - 0.32, y: yb + rh / 2 - 0.32, w: 0.64, h: 0.64, fill: { color: C.sage }, line: { type: "none" } });
    s.addImage({ data: I.restore, x: x0 + cw + gap / 2 - 0.16, y: yb + rh / 2 - 0.16, w: 0.32, h: 0.32 });
    s.addText("RESTORE", { x: x0 + cw + gap / 2 - 0.6, y: yb + rh / 2 + 0.34, w: 1.2, h: 0.2, margin: 0, align: "center", fontFace: F.mono, fontSize: 8, color: C.mute, charSpacing: 1 });
    // badges
    const badges = [["100% Accurate Results", true], ["Clinical Context Intact", false], ["Zero PHI on the Wire", false], ["No BAA Required", false]];
    let bx = MARGIN; const byy = 6.35;
    badges.forEach(([t, hot]) => {
      const w = 0.5 + t.length * 0.097;
      s.addShape("roundRect", { x: bx, y: byy, w, h: 0.46, rectRadius: 0.23, fill: hot ? { color: C.sage } : { color: C.white, transparency: 92 }, line: hot ? { type: "none" } : { color: C.line, transparency: 70, width: 1 } });
      s.addText("✓  " + t, { x: bx, y: byy, w, h: 0.46, margin: 0, align: "center", valign: "middle", fontFace: F.body, fontSize: 12.5, bold: true, color: hot ? C.ink : C.paper });
      bx += w + 0.18;
    });
    B.footer(s, 8, TOTAL);
  }

  // ============================================================ 9 — GOVERNANCE & VISIBILITY
  {
    const s = p.addSlide(); B.bg(s);
    B.kicker(s, "FULL GOVERNANCE & VISIBILITY");
    s.addText([cr("Stop guessing. "), ac("Start seeing"), cr(".")], { x: MARGIN, y: 1.15, w: 11.6, h: 0.9, margin: 0, fontFace: F.head, fontSize: 42, bold: true });
    const lx = MARGIN, ly = 2.4;
    const panel = (yy, title, lines) => {
      s.addText(title, { x: lx, y: yy, w: 5.4, h: 0.35, margin: 0, fontFace: F.body, fontSize: 16, bold: true, color: C.volt });
      lines.forEach((t, i) => {
        const y = yy + 0.5 + i * 0.5;
        s.addImage({ data: I.check, x: lx, y: y + 0.02, w: 0.26, h: 0.26 });
        s.addText(t, { x: lx + 0.42, y, w: 5.2, h: 0.45, margin: 0, fontFace: F.body, fontSize: 13.5, color: C.paper, valign: "middle", lineSpacingMultiple: 1.1 });
      });
    };
    panel(ly, "Comprehensive Audit Log", ["Every prompt to every third-party LLM — logged", "Which user. Which tool. Which data type. When.", "Spot high-risk behavior before it's a breach"]);
    panel(ly + 2.05, "Compliance-Ready", ["Export-ready for GDPR, CCPA, HIPAA, SOC 2", "Show exactly how data is handled, every step", "Real-time dashboard for security teams"]);
    // audit table (native)
    const head = ["User", "Tool", "Data Type", "Status"].map(t => ({ text: t, options: { fill: { color: C.teal }, color: C.white, bold: true, fontFace: F.mono, fontSize: 10, align: "left", valign: "middle" } }));
    const data = [["a.chen", "ChatGPT", "Customer PII", "● Protected"], ["m.ruiz", "Claude", "Financial", "● Protected"], ["j.park", "Copilot", "Source code", "● Protected"], ["s.okoro", "Gemini", "Health data", "● Flagged"], ["d.lang", "Cursor", "API keys", "● Protected"]];
    const body = data.map((r, ri) => r.map((cell, ci) => ({
      text: cell,
      options: { fill: { color: ri % 2 ? C.deep : C.panel }, color: ci === 3 ? (cell.includes("Flagged") ? C.coral : C.sage) : C.paper, fontFace: F.body, fontSize: 12.5, bold: ci === 0, align: "left", valign: "middle" },
    })));
    s.addTable([head, ...body], { x: 6.7, y: 2.4, w: 5.78, colW: [1.3, 1.3, 1.78, 1.4], rowH: 0.5, border: { type: "solid", color: C.deep, pt: 1 }, margin: [0, 6, 0, 6] });
    s.addText([cr("You can't govern what you "), ac("can't see"), cr(".")], { x: 6.7, y: 5.7, w: 5.8, h: 0.5, margin: 0, fontFace: F.head, italic: true, fontSize: 18, color: C.paper });
    B.footer(s, 9, TOTAL);
  }

  // ============================================================ 10 — ON-CHAIN (peaq)
  {
    const s = p.addSlide(); B.bg(s);
    B.kicker(s, "VERIFIABLE TRUST LAYER · POWERED BY PEAQ");
    s.addText("The trust layer, anchored on-chain.", { x: MARGIN, y: 1.1, w: 11.6, h: 0.7, margin: 0, fontFace: F.head, fontSize: 36, bold: true, color: C.paper });
    s.addText("Sensitive data is tokenized into Privacy Twins; every AI interaction is written as immutable proof to the peaq blockchain. The PII never leaves the device — only cryptographic proof goes on-chain.", { x: MARGIN, y: 1.85, w: 11.4, h: 0.7, margin: 0, fontFace: F.body, fontSize: 14.5, color: C.mute, lineSpacingMultiple: 1.35 });
    const pillars = [[I.ext, "Tokenized, never exposed", "Sensitive values become Privacy Twins. Only cryptographic hashes and content IDs go on-chain — never the PII."], [I.shield, "AI activity, audited on-chain", "Each session is one immutable peaq transaction — user, machine identity, model, and twin hashes. Tamper-proof."], [I.key, "DID-secured vault access", "A peaq DID is each machine's cryptographic identity. An encrypted vault and DID-gated endpoints guard every twin."]];
    const px = MARGIN, py = 2.85;
    pillars.forEach((pl, i) => {
      const y = py + i * 1.25;
      s.addShape("roundRect", { x: px, y, w: 0.6, h: 0.6, rectRadius: 0.1, fill: { color: C.white, transparency: 90 }, line: { type: "none" } });
      s.addImage({ data: pl[0], x: px + 0.15, y: y + 0.15, w: 0.3, h: 0.3 });
      s.addText(pl[1], { x: px + 0.85, y: y - 0.04, w: 5.5, h: 0.4, margin: 0, fontFace: F.head, fontSize: 18, bold: true, color: C.paper });
      s.addText(pl[2], { x: px + 0.85, y: y + 0.38, w: 5.6, h: 0.8, margin: 0, fontFace: F.body, fontSize: 12.5, color: C.mute, lineSpacingMultiple: 1.3 });
    });
    // ledger receipt
    const Lx = 7.55, Ly = 2.85, Lw = 4.93, Lh = 3.35;
    s.addShape("roundRect", { x: Lx, y: Ly, w: Lw, h: Lh, rectRadius: 0.14, fill: { color: C.deep }, line: { color: C.volt, transparency: 55, width: 1 } });
    s.addText("PEAQ · PRIVACY_TWIN_BATCH_AUDIT", { x: Lx + 0.3, y: Ly + 0.25, w: 3.4, h: 0.3, margin: 0, fontFace: F.mono, fontSize: 10, color: C.volt, charSpacing: 1 });
    s.addText("✓ confirmed", { x: Lx + Lw - 1.5, y: Ly + 0.25, w: 1.2, h: 0.3, margin: 0, align: "right", fontFace: F.mono, fontSize: 10, color: C.sage });
    B.rule(s, Lx + 0.3, Ly + 0.62, Lw - 0.6, { transparency: 80 });
    s.addText("tx 0x9f3c…a847        block #4,182,663", { x: Lx + 0.3, y: Ly + 0.74, w: Lw - 0.6, h: 0.3, margin: 0, fontFace: F.mono, fontSize: 11, color: C.mute });
    const tw = [["3a7f…e1", "c19e…b4", "name"], ["88b2…9c", "4471…42", "mrn"], ["d04a…7f", "a8e2…10", "address"]];
    tw.forEach((r, i) => {
      const y = Ly + 1.2 + i * 0.34;
      s.addText([{ text: r[0], options: { color: C.tang } }, { text: "  →  ", options: { color: C.mute } }, { text: r[1], options: { color: C.volt } }], { x: Lx + 0.3, y, w: 3, h: 0.3, margin: 0, fontFace: F.mono, fontSize: 11.5 });
      s.addText(r[2], { x: Lx + Lw - 1.6, y, w: 1.3, h: 0.3, margin: 0, align: "right", fontFace: F.mono, fontSize: 9, color: C.mute, charSpacing: 1 });
    });
    B.rule(s, Lx + 0.3, Ly + 2.32, Lw - 0.6, { transparency: 80 });
    [["machine DID", "did:peaq:0x0841…84ef"], ["IPFS CID", "QmP8Ud…1YGT  ✓ pinned"], ["payload", "hashes only · 0 bytes PII"]].forEach((r, i) => {
      const y = Ly + 2.45 + i * 0.28;
      s.addText(r[0], { x: Lx + 0.3, y, w: 1.5, h: 0.26, margin: 0, fontFace: F.mono, fontSize: 9.5, color: C.mute });
      s.addText(r[1], { x: Lx + 1.7, y, w: Lw - 2, h: 0.26, margin: 0, fontFace: F.mono, fontSize: 9.5, color: C.paper });
    });
    s.addText([cr("Immutable. Append-only. "), ac("Proof you can hand to an auditor.")], { x: MARGIN, y: 6.35, w: 11.6, h: 0.4, margin: 0, fontFace: F.head, italic: true, fontSize: 18, color: C.paper });
    B.footer(s, 10, TOTAL);
  }

  // ============================================================ 11 — WORKS EVERYWHERE
  {
    const s = p.addSlide(); B.bg(s);
    B.kicker(s, "COVERAGE");
    s.addText("Works everywhere your team uses AI.", { x: MARGIN, y: 1.15, w: 11.6, h: 0.9, margin: 0, fontFace: F.head, fontSize: 42, bold: true, color: C.paper });
    const tools = [{ logo: TLOGO.chatgpt }, { logo: TLOGO.claude }, { logo: TLOGO.gemini }, { logo: TLOGO.perplexity }, { logo: TLOGO.copilot }, { text: "Claude Code" }, { logo: TLOGO.cursor }, { text: "Codex" }, { text: "OpenClaw" }];
    const cols = 3, tw = 3.5, th = 1.0, gap = 0.35, x0 = MARGIN, y0 = 2.5;
    tools.forEach((t, i) => {
      const x = x0 + (i % cols) * (tw + gap), y = y0 + Math.floor(i / cols) * (th + 0.3);
      s.addShape("roundRect", { x, y, w: tw, h: th, rectRadius: 0.12, fill: { color: "F5F0E8" }, line: { type: "none" } });
      if (t.logo) s.addImage({ data: t.logo, x: x + 0.7, y: y + 0.24, w: tw - 1.4, h: th - 0.48, sizing: { type: "contain", w: tw - 1.4, h: th - 0.48 } });
      else s.addText(t.text, { x, y, w: tw, h: th, margin: 0, align: "center", valign: "middle", fontFace: F.head, fontSize: 18, bold: true, color: C.ink });
      s.addText("✓", { x: x + tw - 0.42, y: y + 0.1, w: 0.3, h: 0.3, margin: 0, fontFace: F.body, fontSize: 13, bold: true, color: C.teal });
    });
    s.addText("BROWSER        DESKTOP        MAC · PC · iOS & ANDROID (SOON)", { x: MARGIN, y: 6.45, w: 8.5, h: 0.4, margin: 0, fontFace: F.mono, fontSize: 11.5, color: C.mute, charSpacing: 1, valign: "middle" });
    B.pill(s, 9.55, 6.4, 2.93, 0.5, "One install. Full coverage.", { fontSize: 13 });
    B.footer(s, 11, TOTAL);
  }

  // ============================================================ 12 — TIERS
  {
    const s = p.addSlide(); B.bg(s);
    B.kicker(s, "PRODUCT TIERS");
    s.addText("Two products. One architecture.", { x: MARGIN, y: 1.15, w: 11.6, h: 0.9, margin: 0, fontFace: F.head, fontSize: 42, bold: true, color: C.paper });
    const H0 = (t, fill) => ({ text: t, options: { fill: { color: fill }, color: C.white, bold: true, fontFace: F.head, fontSize: 15, align: "center", valign: "middle" } });
    const rows = [["Browser + Desktop", "✓", "✓"], ["Unlimited AI queries", "✓", "✓"], ["Privacy Twins", "✓", "✓"], ["Audit Log", "✓", "✓"], ["Self-hosted Privacy Twins", "—", "✓"], ["DSPM (database scanning)", "—", "✓"], ["Data sovereignty controls", "—", "✓"], ["Admin governance console", "—", "✓"], ["24/7 dedicated support", "—", "✓"]];
    const tbl = [[H0("", C.teal), H0("PrivacyPal AI", C.teal), H0("PrivacyPal Cloud", C.teal)]];
    rows.forEach((r, ri) => tbl.push(r.map((cell, ci) => ({
      text: cell,
      options: { fill: { color: ci === 1 ? "06384A" : (ci === 2 ? "0A2C5E" : (ri % 2 ? C.deep : C.panel)) }, color: cell === "✓" ? C.volt : (cell === "—" ? C.mute : C.paper), bold: ci === 0 || cell === "✓", fontFace: ci === 0 ? F.body : F.head, fontSize: ci === 0 ? 13.5 : 16, align: ci === 0 ? "left" : "center", valign: "middle", margin: [0, ci === 0 ? 12 : 0, 0, ci === 0 ? 12 : 0] },
    }))));
    s.addTable(tbl, { x: MARGIN, y: 2.25, w: W - 2 * MARGIN, colW: [5.63, 3, 3], rowH: 0.42, border: { type: "solid", color: C.ink, pt: 1.5 } });
    s.addText([{ text: "PrivacyPal AI", options: { color: C.volt, bold: true } }, { text: " — teams that need protection now.        ", options: { color: C.mute } }, { text: "PrivacyPal Cloud", options: { color: C.volt, bold: true } }, { text: " — governance at scale.", options: { color: C.mute } }], { x: MARGIN, y: 6.5, w: 11.6, h: 0.4, margin: 0, fontFace: F.body, fontSize: 14 });
    B.footer(s, 12, TOTAL);
  }

  // ============================================================ 13 — DEPLOYMENT
  {
    const s = p.addSlide(); B.bg(s); B.glow(s, 4.5, 1.5, 6, C.teal, 92);
    B.kicker(s, "FRICTIONLESS DEPLOYMENT");
    s.addText([cr("Deploy in minutes. "), ac("Not months"), cr(".")], { x: 0, y: 1.6, w: W, h: 0.9, margin: 0, align: "center", fontFace: F.head, fontSize: 46, bold: true });
    const steps = [["1", "Install"], ["2", "Activate"], ["3", "Protected"]];
    const d = 1.7, gap = 1.3, total = d * 3 + gap * 2, x0 = (W - total) / 2, cy = 3.2;
    steps.forEach((st, i) => {
      const x = x0 + i * (d + gap);
      s.addShape("ellipse", { x, y: cy, w: d, h: d, fill: { color: C.teal }, line: { type: "none" }, shadow: { type: "outer", color: "000000", blur: 16, offset: 5, angle: 90, opacity: 0.4 } });
      s.addText(st[0], { x, y: cy, w: d, h: d, margin: 0, align: "center", valign: "middle", fontFace: F.head, fontSize: 64, bold: true, color: C.white });
      s.addText(st[1], { x: x - 0.3, y: cy + d + 0.2, w: d + 0.6, h: 0.5, margin: 0, align: "center", fontFace: F.head, fontSize: 24, bold: true, color: C.paper });
      if (i < 2) s.addText("→", { x: x + d, y: cy + d / 2 - 0.3, w: gap, h: 0.6, margin: 0, align: "center", valign: "middle", fontFace: F.head, fontSize: 30, color: C.volt, bold: true });
    });
    s.addText("No complex integration      ·      No internal LLM to build      ·      No rearchitecting      ·      No training", { x: 0, y: 6.25, w: W, h: 0.4, margin: 0, align: "center", fontFace: F.mono, fontSize: 12, color: C.mute, charSpacing: 1 });
    B.footer(s, 13, TOTAL);
  }

  // ============================================================ 14 — WHO USES (photo)
  {
    const s = p.addSlide(); B.scrimPhoto(s, "assets/bg/bg-towers.jpg", { base: 16, side: true });
    B.kicker(s, "WHO USES PRIVACYPAL");
    s.addText("Real teams. Real traction.", { x: MARGIN, y: 1.15, w: 8, h: 0.8, margin: 0, fontFace: F.head, fontSize: 40, bold: true, color: C.paper });
    const inds = [[I.dollar, "Financial Services & Accounting"], [I.activity, "Healthcare & Life Sciences"], [I.brief, "Legal"], [I.monitor, "Enterprise Technology"], [I.code, "Engineering & Product Teams"]];
    inds.forEach((r, i) => {
      const y = 2.35 + i * 0.56;
      s.addImage({ data: r[0], x: MARGIN, y: y + 0.02, w: 0.32, h: 0.32 });
      s.addText(r[1], { x: MARGIN + 0.5, y, w: 5, h: 0.4, margin: 0, fontFace: F.body, fontSize: 17, bold: true, color: C.paper, valign: "middle" });
    });
    s.addText([{ text: "10M", options: { color: C.volt } }, { text: "+ ", options: { color: C.volt } }, { text: "records protected", options: { color: C.mute, fontSize: 13 } }], { x: MARGIN, y: 5.35, w: 6, h: 0.9, margin: 0, fontFace: F.head, fontSize: 56, bold: true });
    // right use cases
    const rx = 7.2;
    s.addText("USE CASES", { x: rx, y: 2.2, w: 5, h: 0.3, margin: 0, fontFace: F.mono, fontSize: 11, color: C.volt, charSpacing: 2, bold: true });
    const uses = ["Legal teams protecting privileged info in AI drafting", "Finance teams masking client data in AI analysis", "Engineering teams securing code & API keys in AI assistants", "HR teams protecting employee PII in AI comms"];
    uses.forEach((t, i) => {
      const y = 2.7 + i * 0.62;
      s.addImage({ data: I.arrowT, x: rx, y: y + 0.03, w: 0.3, h: 0.3 });
      s.addText(t, { x: rx + 0.45, y, w: 5.1, h: 0.55, margin: 0, fontFace: F.body, fontSize: 14, color: C.paper, valign: "middle", lineSpacingMultiple: 1.1 });
    });
    s.addText("Inbound from accounting firms, MSPs, and resellers — plus marketplace inclusion requested by partners.", { x: rx, y: 5.3, w: 5.3, h: 0.8, margin: 0, fontFace: F.body, fontSize: 13, color: C.mute, lineSpacingMultiple: 1.35 });
    B.footer(s, 14, TOTAL);
  }

  // ============================================================ 15 — TESTIMONIALS
  {
    const s = p.addSlide(); B.bg(s, C.deep); B.glow(s, 8.5, 4, 6, C.teal, 92);
    B.kicker(s, "WHAT PEOPLE ARE SAYING");
    const q = [["From everything I've been able to find, PrivacyPal looks like one of the strongest solutions on the market.", "— Partner inbound, 2026"], ["The synthetic replacement angle is a clever way to meet security folks where they are without wrecking the day-to-day UX.", "— Product Hunt community"], ["Shadow AI is a huge problem already. I'm in third-party risk management and I'm already seeing a lot of vendors not dealing with this.", "— Industry practitioner"]];
    q.forEach((r, i) => {
      const y = 1.5 + i * 1.62;
      s.addText("“", { x: MARGIN, y: y - 0.15, w: 0.7, h: 0.9, margin: 0, fontFace: F.head, fontSize: 64, bold: true, color: C.volt });
      s.addText(r[0], { x: MARGIN + 0.85, y, w: 10.6, h: 1.0, margin: 0, fontFace: F.head, fontSize: 21, color: C.paper, lineSpacingMultiple: 1.2 });
      s.addText(r[1], { x: MARGIN + 0.85, y: y + 1.0, w: 10, h: 0.3, margin: 0, fontFace: F.body, italic: true, fontSize: 14, color: C.mute });
    });
    s.addText("UNSOLICITED.  UNPROMPTED.  REAL.", { x: MARGIN, y: 6.5, w: 11, h: 0.35, margin: 0, fontFace: F.mono, fontSize: 13, color: C.volt, charSpacing: 3, bold: true });
    B.footer(s, 15, TOTAL);
  }

  // ============================================================ 16 — vs ALTERNATIVES
  {
    const s = p.addSlide(); B.bg(s);
    B.kicker(s, "THE COMPARISON");
    s.addText("PrivacyPal vs. the alternatives.", { x: MARGIN, y: 1.15, w: 11.6, h: 0.9, margin: 0, fontFace: F.head, fontSize: 42, bold: true, color: C.paper });
    const hd = ["", "PrivacyPal", "Traditional DLP", "Cloud Proxies"];
    const rows = [["Data leaves your machine", "No", "Yes", "Yes"], ["AI output accuracy", "100%", "Broken", "Partial"], ["Real-time protection", "Yes", "Batch/async", "API-based"], ["Desktop AI coverage", "Yes", "No", "No"], ["All AI tools covered", "One install", "Per-tool", "Limited"], ["Self-hosted option", "Yes", "N/A", "Some"], ["Zero learning curve", "Yes", "Training", "Config"], ["Vendor sees your data", "No", "Varies", "Yes"]];
    const tbl = [hd.map((t, ci) => ({ text: t, options: { fill: { color: C.teal }, color: C.white, bold: true, fontFace: F.head, fontSize: 14, align: ci === 0 ? "left" : "center", valign: "middle", margin: [0, 10, 0, 10] } }))];
    rows.forEach((r, ri) => tbl.push(r.map((cell, ci) => ({
      text: cell,
      options: { fill: { color: ci === 1 ? "06384A" : (ri % 2 ? C.deep : C.panel) }, color: ci === 0 ? C.paper : (ci === 1 ? C.volt : C.mute), bold: ci <= 1, fontFace: F.body, fontSize: 13.5, align: ci === 0 ? "left" : "center", valign: "middle", margin: [0, 10, 0, 10] },
    }))));
    s.addTable(tbl, { x: MARGIN, y: 2.2, w: W - 2 * MARGIN, colW: [4.13, 2.5, 2.5, 2.5], rowH: 0.4, border: { type: "solid", color: C.ink, pt: 1.5 } });
    s.addText([cr("The difference is "), ac("architecture"), cr(". Not policy.")], { x: MARGIN, y: 6.5, w: 11.6, h: 0.45, margin: 0, fontFace: F.head, fontSize: 24, bold: true });
    B.footer(s, 16, TOTAL);
  }

  // ============================================================ 17 — PRICING
  {
    const s = p.addSlide(); B.bg(s);
    B.kicker(s, "PRICING");
    s.addText("Simple pricing. Immediate protection.", { x: MARGIN, y: 1.15, w: 11.6, h: 0.9, margin: 0, fontFace: F.head, fontSize: 40, bold: true, color: C.paper });
    const plans = [["PERSONAL", "Home", "$9", "/mo per device", ["Up to 5 devices (family)", "All major AI apps", "On-device detection", "Personal data library"], false], ["MOST POPULAR", "Pro", "$15", "/mo per seat", ["CRM / Slack / Notion / SQL", "Role-based team policies", "Audit log + SSO & SCIM", "Priority support"], true], ["ENTERPRISE", "Max", "$50", "/mo per seat", ["Everything in Pro", "On-device Privacy Agents", "Org-wide AI controls", "Private MCP & on-device DSPM"], false], ["SOVEREIGN", "Cloud", "Custom", "annual", ["Self-hosted (AWS/Azure/GCP)", "Network DSPM for databases", "AI-compatible gateway", "Dedicated SE · 24/7"], false]];
    const cw = 2.86, gap = 0.24, x0 = MARGIN, y0 = 2.35, ch = 3.85;
    plans.forEach((pl, i) => {
      const x = x0 + i * (cw + gap);
      if (pl[5]) s.addShape("roundRect", { x, y: y0, w: cw, h: ch, rectRadius: 0.14, fill: { color: "0A2C5E" }, line: { color: C.volt, width: 2 } });
      else B.card(s, x, y0, cw, ch);
      s.addText(pl[0], { x: x + 0.28, y: y0 + 0.25, w: cw - 0.5, h: 0.3, margin: 0, fontFace: F.mono, fontSize: 9.5, color: C.volt, charSpacing: 1.5, bold: true });
      s.addText(pl[1], { x: x + 0.28, y: y0 + 0.55, w: cw - 0.5, h: 0.5, margin: 0, fontFace: F.head, fontSize: 26, bold: true, color: C.paper });
      s.addText([{ text: pl[2], options: { color: C.volt, bold: true } }, { text: " " + pl[3], options: { color: C.mute, fontSize: 12 } }], { x: x + 0.28, y: y0 + 1.1, w: cw - 0.5, h: 0.5, margin: 0, fontFace: F.head, fontSize: 28 });
      pl[4].forEach((f, j) => {
        s.addText("✓  " + f, { x: x + 0.28, y: y0 + 1.85 + j * 0.45, w: cw - 0.5, h: 0.42, margin: 0, fontFace: F.body, fontSize: 11.5, color: C.paper, valign: "middle", lineSpacingMultiple: 1.05 });
      });
    });
    s.addText([cr("Every plan includes "), ac("Privacy Twins"), cr(" and real-time interception.")], { x: MARGIN, y: 6.45, w: 11.6, h: 0.4, margin: 0, fontFace: F.head, fontSize: 20, bold: true });
    B.footer(s, 17, TOTAL);
  }

  // ============================================================ 18 — YOUR MOVE (photo CTA)
  {
    const s = p.addSlide(); B.scrimPhoto(s, "assets/bg/bg-skyline.jpg", { base: 30 });
    s.addText("●   SAFE AI. ANYWHERE.", { x: 0, y: 1.5, w: W, h: 0.32, margin: 0, align: "center", valign: "middle", fontFace: F.mono, fontSize: 13, color: C.volt, charSpacing: 3, bold: true });
    s.addText("Your Move.", { x: 0, y: 2.0, w: W, h: 1.7, margin: 0, align: "center", fontFace: F.head, fontSize: 100, bold: true, color: C.paper });
    s.addText([{ text: "Book a demo  ", options: { color: C.volt, bold: true } }, { text: "— see Privacy Twins on your actual AI tools.", options: { color: C.paper } }], { x: 0, y: 4.0, w: W, h: 0.4, margin: 0, align: "center", fontFace: F.body, fontSize: 17 });
    s.addText([{ text: "Start a pilot  ", options: { color: C.volt, bold: true } }, { text: "— deploy to a team in minutes; measure the risk reduction.", options: { color: C.paper } }], { x: 0, y: 4.5, w: W, h: 0.4, margin: 0, align: "center", fontFace: F.body, fontSize: 17 });
    B.pill(s, W / 2 - 1.4, 5.35, 2.8, 0.66, "Book a demo  →", { fontSize: 16 });
    s.addText("privacypal.ai/cloud      ·      Contact      ·      Calendar", { x: 0, y: 6.5, w: W, h: 0.35, margin: 0, align: "center", fontFace: F.mono, fontSize: 12, color: C.mute, charSpacing: 1 });
  }

  await p.writeFile({ fileName: "privacypal-sales-deck.pptx" });
  console.log("WROTE privacypal-sales-deck.pptx");
})().catch((e) => { console.error(e); process.exit(1); });
