/* PrivacyPal — ENTERPRISE Sales Deck (11 slides), native editable PPTX.
   Bold New-Relic-inspired layout on the PrivacyPal navy/teal palette.
   Run:  node build-enterprise.js  ->  privacypal-enterprise-deck.pptx     */

const pptxgen = require("pptxgenjs");
const sharp = require("sharp");
const B = require("./lib/brand");
const { C, F, W, H, MARGIN, icon, Fi } = B;

const TOTAL = 11;
const cr = (t, brk) => ({ text: t, options: { color: C.paper, breakLine: !!brk } });
const ac = (t, brk) => ({ text: t, options: { color: C.volt, breakLine: !!brk } });

const toPng = async (f, width = 700) =>
  "image/png;base64," + (await sharp("assets/" + f, { density: 300 }).resize({ width }).png().toBuffer()).toString("base64");

(async () => {
  const I = {
    box:    await icon(Fi.FiBox, "#" + C.volt),
    cloud:  await icon(Fi.FiCloud, "#" + C.volt),
    shield: await icon(Fi.FiShield, "#" + C.volt),
    layers: await icon(Fi.FiLayers, "#" + C.volt),
    clock:  await icon(Fi.FiClock, "#" + C.volt),
    zap:    await icon(Fi.FiZap, "#" + C.volt),
    search: await icon(Fi.FiSearch, "#" + C.volt),
    cpu:    await icon(Fi.FiCpu, "#" + C.volt),
    alert:  await icon(Fi.FiAlertTriangle, "#" + C.volt),
    checkc: await icon(Fi.FiCheckCircle, "#" + C.volt),
    db:     await icon(Fi.FiDatabase, "#" + C.volt),
    lock:   await icon(Fi.FiLock, "#" + C.volt),
    ext:    await icon(Fi.FiExternalLink, "#" + C.volt),
    key:    await icon(Fi.FiKey, "#" + C.volt),
    check:  await icon(Fi.FiCheck, "#" + C.sage),
  };
  const partners = { nvidia: await toPng("nvidia-inception.png"), voda: await toPng("vodafone-fastweb.png"), pnp: await toPng("plug-and-play.png") };

  const p = new pptxgen();
  p.defineLayout({ name: "WIDE", width: W, height: H });
  p.layout = "WIDE";
  p.author = "PrivacyPal"; p.company = "PrivacyPal"; p.title = "PrivacyPal for Enterprise — Govern every AI.";

  // feature card helper (icon + title + body)
  const feat = (s, x, y, w, h, ic, title, body) => {
    B.card(s, x, y, w, h);
    s.addShape("roundRect", { x: x + 0.28, y: y + 0.26, w: 0.58, h: 0.58, rectRadius: 0.1, fill: { color: C.white, transparency: 90 }, line: { type: "none" } });
    s.addImage({ data: ic, x: x + 0.42, y: y + 0.4, w: 0.3, h: 0.3 });
    s.addText(title, { x: x + 0.28, y: y + 0.95, w: w - 0.56, h: 0.58, margin: 0, valign: "top", fontFace: F.head, fontSize: 16, bold: true, color: C.paper, lineSpacingMultiple: 0.98 });
    s.addText(body, { x: x + 0.28, y: y + 1.58, w: w - 0.56, h: h - 1.72, margin: 0, valign: "top", fontFace: F.body, fontSize: 11, color: C.mute, lineSpacingMultiple: 1.25 });
  };

  // ============================================================ 1 — HERO
  {
    const s = p.addSlide(); B.bg(s); B.glow(s, 8.4, -1.8, 7.2, C.volt, 90);
    s.addImage({ path: B.LIGHT_LOGO, x: MARGIN, y: 0.75, w: 2.1, h: 2.1 / B.LOGO_RATIO });
    B.kicker(s, "PRIVACYPAL FOR ENTERPRISE", { y: 1.55 });
    s.addText([cr("Govern every AI.", true), cr("Without blocking a "), ac("single user"), cr(".")], {
      x: MARGIN, y: 2.05, w: 7.1, h: 2.4, margin: 0, fontFace: F.head, fontSize: 48, bold: true, lineSpacingMultiple: 1.0,
    });
    s.addText("The governance and enablement layer for AI — so your enterprise can adopt AI everywhere it creates value, with trust and compliance built in. Not a brake on innovation. The layer that unlocks it.", {
      x: MARGIN, y: 4.55, w: 6.6, h: 1.4, margin: 0, fontFace: F.body, fontSize: 15, color: C.mute, lineSpacingMultiple: 1.45,
    });
    B.pill(s, MARGIN, 6.0, 2.4, 0.6, "Book a demo  →", { fontSize: 14 });
    B.pill(s, MARGIN + 2.6, 6.0, 2.9, 0.6, "Watch the product intro", { outline: true, fontSize: 13 });
    // CLI card (right)
    const cx = 8.1, cy = 1.5, cw = 4.4, ch = 4.7;
    s.addShape("roundRect", { x: cx, y: cy, w: cw, h: ch, rectRadius: 0.14, fill: { color: C.deep }, line: { color: C.volt, transparency: 60, width: 1 }, shadow: { type: "outer", color: "000000", blur: 18, offset: 6, angle: 90, opacity: 0.5 } });
    const cm = (t) => ({ text: t, options: { color: C.mute, breakLine: true } });
    const ok = (t) => ({ text: t, options: { color: C.sage, breakLine: true } });
    const cmd = (t) => ({ text: t, options: { color: C.paper, breakLine: true } });
    s.addText([
      cm("# Install on any desktop or server"),
      { text: "$ ", options: { color: C.volt } }, cmd("curl -sSL https://get.privacypal.ai | sh"),
      cm(" "),
      cm("# Every AI agent on this machine is"),
      cm("# now protected by PrivacyPal Cloud."),
      cm(" "),
      { text: "$ ", options: { color: C.volt } }, cmd("privacypal status"),
      ok("✓ Gateway running on 127.0.0.1:7878"),
      ok("✓ Watching 4 local AI processes"),
      ok("✓ Routing via privacypal.yourco.internal"),
      ok("✓ 0 prompts left this network"),
    ], { x: cx + 0.35, y: cy + 0.35, w: cw - 0.7, h: ch - 0.7, margin: 0, fontFace: F.mono, fontSize: 12, lineSpacingMultiple: 1.45, valign: "top" });
  }

  // ============================================================ 2 — THE BIND (photo)
  {
    const s = p.addSlide(); B.scrimPhoto(s, "assets/bg/bg-server.jpg", { base: 14, side: true });
    B.kicker(s, "THE GOVERNANCE GAP");
    s.addText([cr("Your people are already all-in on AI.", true), cr("Your governance "), ac("isn't"), cr(".")], {
      x: MARGIN, y: 1.2, w: 11.5, h: 1.6, margin: 0, fontFace: F.head, fontSize: 40, bold: true, lineSpacingMultiple: 1.0,
    });
    const rows = [["01", "AI is already ~60% of the workday.", "Teams run client data, code and strategy through ChatGPT, Claude and Copilot every day — with or without you."], ["02", "Block it, and innovation stalls.", "The only lever most security teams have is “no.” AI initiatives die in the review queue while competitors ship."], ["03", "Allow it ungoverned, and trust is on the line.", "Unprotected prompts leak PII, PHI and IP to third-party models — risking trust your firm spent a lifetime earning."]];
    rows.forEach((r, i) => {
      const y = 3.15 + i * 0.92;
      s.addText(r[0], { x: MARGIN, y, w: 0.6, h: 0.4, margin: 0, fontFace: F.mono, fontSize: 14, color: C.volt, bold: true });
      s.addText(r[1], { x: MARGIN + 0.7, y: y - 0.04, w: 10.6, h: 0.4, margin: 0, fontFace: F.head, fontSize: 18, bold: true, color: C.paper });
      s.addText(r[2], { x: MARGIN + 0.7, y: y + 0.36, w: 10.6, h: 0.5, margin: 0, fontFace: F.body, fontSize: 13, color: C.mute, lineSpacingMultiple: 1.25 });
    });
    s.addText([cr("Stop blocking AI. "), ac("Start governing it.")], { x: MARGIN, y: 6.15, w: 11.5, h: 0.5, margin: 0, fontFace: F.head, fontSize: 26, bold: true });
    B.footer(s, 2, TOTAL);
  }

  // ============================================================ 3 — TWO PILLARS
  {
    const s = p.addSlide(); B.bg(s);
    B.kicker(s, "THE GOVERNANCE & ENABLEMENT LAYER");
    s.addText("The trust layer beneath your AI operating system.", { x: MARGIN, y: 1.1, w: 11.5, h: 1.2, margin: 0, fontFace: F.head, fontSize: 38, bold: true, color: C.paper, lineSpacingMultiple: 1.0 });
    const cw = 5.6, gap = 0.5, x0 = MARGIN, y0 = 2.85, ch = 3.1;
    const pillar = (x, tag, tagColor, title, body, chips) => {
      B.card(s, x, y0, cw, ch);
      s.addText(tag, { x: x + 0.35, y: y0 + 0.32, w: cw - 0.7, h: 0.3, margin: 0, fontFace: F.mono, fontSize: 11, color: tagColor, charSpacing: 1.5, bold: true });
      s.addText(title, { x: x + 0.35, y: y0 + 0.66, w: cw - 0.7, h: 0.6, margin: 0, fontFace: F.head, fontSize: 24, bold: true, color: C.paper });
      s.addText(body, { x: x + 0.35, y: y0 + 1.35, w: cw - 0.7, h: 1.1, margin: 0, fontFace: F.body, fontSize: 13.5, color: C.mute, lineSpacingMultiple: 1.4 });
      s.addText(chips, { x: x + 0.35, y: y0 + ch - 0.55, w: cw - 0.7, h: 0.4, margin: 0, fontFace: F.mono, fontSize: 10.5, color: C.paper, charSpacing: 0.5 });
    };
    pillar(x0, "DATA IN MOTION · GATEWAY", C.volt, "Govern every AI request", "Installs at the network edge and intercepts AI traffic with zero code changes. Sensitive values are swapped for Privacy Twins on the way out and restored on return — provider-agnostic, streaming-safe.", "OpenAI · Anthropic · Google · Mistral · Llama · Own fine-tune");
    pillar(x0 + cw + gap, "DATA AT REST · NETWORK DSPM", C.tang, "Govern every data store", "The same install continuously discovers, classifies, prioritizes and remediates sensitive data across the AI data layer — databases, lakes, RAG pipelines, vector stores and agent memory.", "SQL · PostgreSQL · MongoDB · Supabase · Object · Vector/RAG");
    s.addText([cr("One layer. Every AI, every endpoint, every data store — "), ac("governed and enabled.")], { x: MARGIN, y: 6.2, w: 11.5, h: 0.5, margin: 0, fontFace: F.head, fontSize: 20, bold: true });
    B.footer(s, 3, TOTAL);
  }

  // ============================================================ 4 — PRIVACY TWINS
  {
    const s = p.addSlide(); B.bg(s);
    B.kicker(s, "THE MECHANISM · PRIVACY TWINS");
    s.addText("Language-based privacy for a language-based threat.", { x: MARGIN, y: 1.1, w: 11.5, h: 0.7, margin: 0, fontFace: F.head, fontSize: 34, bold: true, color: C.paper });
    s.addText([cr("Others stop at redaction — which breaks the model's output and kills adoption. PrivacyPal substitutes a "), ac("context-preserving Privacy Twin"), cr(", then restores the real values on the way back. The work gets done. The data never leaves.")], { x: MARGIN, y: 1.85, w: 11.4, h: 0.8, margin: 0, fontFace: F.body, fontSize: 14.5, color: C.mute, lineSpacingMultiple: 1.35 });
    const sens = (t) => ({ text: t, options: { color: C.coral, bold: true } });
    const twin = (t) => ({ text: t, options: { color: C.volt, bold: true } });
    const cw = 3.5, gap = 0.62, x0 = MARGIN, y0 = 2.95, ch = 2.0;
    const step = (x, lbl, lblColor, runs) => {
      B.card(s, x, y0, cw, ch);
      s.addText(lbl, { x: x + 0.28, y: y0 + 0.25, w: cw - 0.5, h: 0.3, margin: 0, fontFace: F.mono, fontSize: 10, color: lblColor, charSpacing: 0.5, bold: true });
      s.addText(runs, { x: x + 0.28, y: y0 + 0.62, w: cw - 0.56, h: ch - 0.8, margin: 0, fontFace: F.body, fontSize: 12.5, color: C.paper, lineSpacingMultiple: 1.35 });
    };
    step(x0, "① IN YOUR NETWORK — REAL DATA", C.coral, [cr('"Summarize '), sens("Margaret Chen"), cr("'s chart — "), sens("MRN 4471-8829"), cr(", admitted "), sens("March 14"), cr('."')]);
    step(x0 + cw + gap, "② WHAT THE MODEL SEES — TWINS", C.volt, [cr('"Summarize '), twin("Nancy Grace"), cr("'s chart — "), twin("MRN 8826-3142"), cr(", admitted "), twin("April 22"), cr('."')]);
    step(x0 + 2 * (cw + gap), "③ WHAT YOU GET BACK — RESTORED", C.sage, [cr("Accurate clinical summary for "), sens("Margaret Chen"), cr(" — full context intact, 100% faithful to the model's answer.")]);
    [x0 + cw + 0.06, x0 + 2 * cw + gap + 0.06].forEach((ax, i) => {
      s.addText("→", { x: ax, y: y0 + ch / 2 - 0.3, w: gap - 0.12, h: 0.6, margin: 0, align: "center", valign: "middle", fontFace: F.head, fontSize: 24, color: C.volt, bold: true });
      s.addText(i === 0 ? "swap" : "restore", { x: ax - 0.3, y: y0 + ch / 2 + 0.28, w: gap + 0.48, h: 0.2, margin: 0, align: "center", fontFace: F.mono, fontSize: 8, color: C.mute });
    });
    const badges = [["340ms", "avg interception"], ["0 bytes", "to providers"], ["47", "PII · PHI · PCI · IP classes"], ["100%", "on-device · zero-knowledge"]];
    let bx = MARGIN; const byy = 5.65;
    badges.forEach(([n, t]) => {
      const w = 0.75 + (n.length + t.length) * 0.082;
      s.addShape("roundRect", { x: bx, y: byy, w, h: 0.5, rectRadius: 0.25, fill: { color: C.white, transparency: 92 }, line: { color: C.line, transparency: 70, width: 1 } });
      s.addText([{ text: n + "  ", options: { color: C.volt, bold: true } }, { text: t, options: { color: C.paper } }], { x: bx + 0.18, y: byy, w: w - 0.3, h: 0.5, margin: 0, valign: "middle", fontFace: F.body, fontSize: 12 });
      bx += w + 0.18;
    });
    B.footer(s, 4, TOTAL);
  }

  // ============================================================ 5 — SOVEREIGN BY DESIGN
  {
    const s = p.addSlide(); B.bg(s);
    B.kicker(s, "THE DEPLOYMENT CHECKLIST");
    s.addText("Sovereign by design. Drop in anywhere your workloads live.", { x: MARGIN, y: 1.1, w: 11.5, h: 0.7, margin: 0, fontFace: F.head, fontSize: 32, bold: true, color: C.paper });
    const items = [[I.box, "Zero code changes", "Intercepts AI traffic at the network edge. Existing agents, copilots and SDKs keep their config — every request twin-swapped."], [I.cloud, "AWS · Azure · GCP · bare metal", "Terraform, Helm, or single-container deploy. Production-ready in an afternoon, inside your tenancy — no third-party DPAs."], [I.shield, "Air-gapped option", "Run detection with on-prem models. No outbound traffic. Built for regulated enterprises — Healthcare, FSI, Defense."], [I.layers, "Provider-agnostic gateway", "OpenAI / Anthropic / Google compatible. Route to GPT, Claude, Gemini, Mistral, Llama or your own fine-tune."], [I.clock, "Streaming-safe", "Detects and swaps mid-stream without breaking token-by-token responses. Users never see a hitch."], [I.zap, "Horizontal scale & 24/7 SLA", "Stateless workers scale to 100k req/s. P99 under half a second. Dedicated SE. 24/7 support included."]];
    const cw = 3.7, ch = 2.3, gx = 0.3, gy = 0.24, x0 = MARGIN, y0 = 1.95;
    items.forEach((it, i) => feat(s, x0 + (i % 3) * (cw + gx), y0 + Math.floor(i / 3) * (ch + gy), cw, ch, it[0], it[1], it[2]));
    B.footer(s, 5, TOTAL);
  }

  // ============================================================ 6 — NETWORK DSPM
  {
    const s = p.addSlide(); B.bg(s);
    B.kicker(s, "INCLUDED WITH CLOUD · NETWORK DSPM");
    s.addText("Govern the AI data layer like the database layer.", { x: MARGIN, y: 1.1, w: 11.5, h: 0.7, margin: 0, fontFace: F.head, fontSize: 32, bold: true, color: C.paper });
    const items = [[I.search, "Agentless discovery", "Connect a store and it's in the scan queue. SQL, Mongo, Supabase, Drive, object storage — read in place, no agents."], [I.cpu, "Context-aware classification", "The intelligence behind Privacy Twins reads data like a human. PII, PHI, financials, schemas — no regex to maintain."], [I.alert, "Risk that's actually risk", "Sensitivity tied to access, exposure and business purpose. An SSN in a public bucket is critical; a dev fixture is not."], [I.checkc, "One-click remediation", "Revoke access, mask columns, trigger a workflow, or route findings to the owner with full context. Cloud closes the loop."], [I.db, "RAG, vector & agent memory", "Scan the AI data layer the way you scan the database layer — where models read from, and where data quietly leaks in."], [I.lock, "Sovereign by design", "Scans run inside your network against the same gateway. Findings, classifications and remediation never leave your tenancy."]];
    const cw = 3.7, ch = 2.3, gx = 0.3, gy = 0.24, x0 = MARGIN, y0 = 1.95;
    items.forEach((it, i) => feat(s, x0 + (i % 3) * (cw + gx), y0 + Math.floor(i / 3) * (ch + gy), cw, ch, it[0], it[1], it[2]));
    B.footer(s, 6, TOTAL);
  }

  // ============================================================ 7 — ON-CHAIN (peaq)
  {
    const s = p.addSlide(); B.bg(s);
    B.kicker(s, "VERIFIABLE TRUST LAYER · POWERED BY PEAQ");
    s.addText("Every twin and action, anchored on-chain.", { x: MARGIN, y: 1.1, w: 11.5, h: 0.7, margin: 0, fontFace: F.head, fontSize: 34, bold: true, color: C.paper });
    const pillars = [[I.ext, "Tokenized, never exposed", "Sensitive values become Privacy Twins. Only cryptographic hashes and content IDs go on-chain — never the PII."], [I.shield, "AI activity, audited on-chain", "Each session is one immutable peaq transaction — user, machine identity, model and twin hashes. Tamper-proof."], [I.key, "DID-secured vault access", "A peaq DID is each machine's cryptographic identity. An encrypted vault and DID-gated endpoints guard every twin."]];
    const px = MARGIN, py = 2.3;
    pillars.forEach((pl, i) => {
      const y = py + i * 1.3;
      s.addShape("roundRect", { x: px, y, w: 0.6, h: 0.6, rectRadius: 0.1, fill: { color: C.white, transparency: 90 }, line: { type: "none" } });
      s.addImage({ data: pl[0], x: px + 0.15, y: y + 0.15, w: 0.3, h: 0.3 });
      s.addText(pl[1], { x: px + 0.85, y: y - 0.04, w: 5.5, h: 0.4, margin: 0, fontFace: F.head, fontSize: 18, bold: true, color: C.paper });
      s.addText(pl[2], { x: px + 0.85, y: y + 0.38, w: 5.6, h: 0.8, margin: 0, fontFace: F.body, fontSize: 12.5, color: C.mute, lineSpacingMultiple: 1.3 });
    });
    const Lx = 7.55, Ly = 2.3, Lw = 4.93, Lh = 3.5;
    s.addShape("roundRect", { x: Lx, y: Ly, w: Lw, h: Lh, rectRadius: 0.14, fill: { color: C.deep }, line: { color: C.volt, transparency: 55, width: 1 } });
    s.addText("PEAQ · PRIVACY_TWIN_BATCH_AUDIT", { x: Lx + 0.3, y: Ly + 0.25, w: 3.4, h: 0.3, margin: 0, fontFace: F.mono, fontSize: 10, color: C.volt, charSpacing: 1 });
    s.addText("✓ confirmed", { x: Lx + Lw - 1.5, y: Ly + 0.25, w: 1.2, h: 0.3, margin: 0, align: "right", fontFace: F.mono, fontSize: 10, color: C.sage });
    B.rule(s, Lx + 0.3, Ly + 0.64, Lw - 0.6, { transparency: 80 });
    s.addText("tx 0x9f3c…a847        block #4,182,663", { x: Lx + 0.3, y: Ly + 0.78, w: Lw - 0.6, h: 0.3, margin: 0, fontFace: F.mono, fontSize: 11, color: C.mute });
    const tw = [["3a7f…e1", "c19e…b4", "name"], ["88b2…9c", "4471…42", "mrn"], ["d04a…7f", "a8e2…10", "address"]];
    tw.forEach((r, i) => {
      const y = Ly + 1.28 + i * 0.36;
      s.addText([{ text: r[0], options: { color: C.tang } }, { text: "  →  ", options: { color: C.mute } }, { text: r[1], options: { color: C.volt } }], { x: Lx + 0.3, y, w: 3, h: 0.3, margin: 0, fontFace: F.mono, fontSize: 11.5 });
      s.addText(r[2], { x: Lx + Lw - 1.6, y, w: 1.3, h: 0.3, margin: 0, align: "right", fontFace: F.mono, fontSize: 9, color: C.mute, charSpacing: 1 });
    });
    B.rule(s, Lx + 0.3, Ly + 2.48, Lw - 0.6, { transparency: 80 });
    [["machine DID", "did:peaq:0x0841…84ef"], ["IPFS CID", "QmP8Ud…1YGT  ✓ pinned"], ["payload", "hashes only · 0 bytes PII"]].forEach((r, i) => {
      const y = Ly + 2.62 + i * 0.28;
      s.addText(r[0], { x: Lx + 0.3, y, w: 1.5, h: 0.26, margin: 0, fontFace: F.mono, fontSize: 9.5, color: C.mute });
      s.addText(r[1], { x: Lx + 1.7, y, w: Lw - 2, h: 0.26, margin: 0, fontFace: F.mono, fontSize: 9.5, color: C.paper });
    });
    B.footer(s, 7, TOTAL);
  }

  // ============================================================ 8 — ARCHITECTURE
  {
    const s = p.addSlide(); B.bg(s);
    B.kicker(s, "ARCHITECTURE");
    s.addText("Stateless. Sovereign. Throughput-grade.", { x: MARGIN, y: 1.1, w: 11.5, h: 0.7, margin: 0, fontFace: F.head, fontSize: 34, bold: true, color: C.paper });
    const ny = 2.5, nh = 1.6, nw = 3.5, gap = 0.55, x0 = MARGIN;
    const node = (x, gw, lbl, title, desc) => {
      if (gw) s.addShape("roundRect", { x, y: ny, w: nw, h: nh, rectRadius: 0.14, fill: { color: C.teal }, line: { type: "none" }, shadow: { type: "outer", color: "000000", blur: 16, offset: 5, angle: 90, opacity: 0.4 } });
      else B.card(s, x, ny, nw, nh);
      s.addText(lbl, { x: x + 0.25, y: ny + 0.22, w: nw - 0.5, h: 0.3, margin: 0, align: "center", fontFace: F.mono, fontSize: 9, color: gw ? C.white : C.mute, charSpacing: 1, bold: true });
      s.addText(title, { x: x + 0.25, y: ny + 0.55, w: nw - 0.5, h: 0.5, margin: 0, align: "center", fontFace: F.head, fontSize: 19, bold: true, color: gw ? C.white : C.paper });
      s.addText(desc, { x: x + 0.25, y: ny + 1.05, w: nw - 0.5, h: 0.5, margin: 0, align: "center", fontFace: F.body, fontSize: 11, color: gw ? "EAF2EE" : C.mute, lineSpacingMultiple: 1.2 });
    };
    node(x0, false, "YOUR ENVIRONMENT", "AI agents & copilots", "Chat, IDE, RAG apps, internal agents");
    node(x0 + nw + gap, true, "PRIVACYPAL CLOUD · IN YOUR VPC", "Sovereign gateway + DSPM", "Twin-swap in motion · agentless scan at rest");
    node(x0 + 2 * (nw + gap), false, "OUTBOUND", "LLM providers", "GPT · Claude · Gemini · Llama — twins only");
    [x0 + nw + 0.08, x0 + 2 * nw + gap + 0.08].forEach((ax) => s.addText("→", { x: ax, y: ny + nh / 2 - 0.3, w: gap - 0.16, h: 0.6, margin: 0, align: "center", valign: "middle", fontFace: F.head, fontSize: 24, color: C.volt, bold: true }));
    const metrics = [["100k", "requests / sec"], ["<0.5s", "P99 latency"], ["Zero", "knowledge · your keys"], ["Air-gap", "ready · no egress"]];
    const mw = (W - 2 * MARGIN - 3 * 0.4) / 4;
    metrics.forEach((m, i) => {
      const x = MARGIN + i * (mw + 0.4), y = 4.85;
      s.addShape("rect", { x, y: y + 0.05, w: 0.06, h: 1.1, fill: { color: C.volt }, line: { type: "none" } });
      s.addText(m[0], { x: x + 0.22, y, w: mw - 0.2, h: 0.7, margin: 0, fontFace: F.head, fontSize: 38, bold: true, color: C.volt });
      s.addText(m[1], { x: x + 0.22, y: y + 0.78, w: mw - 0.2, h: 0.5, margin: 0, fontFace: F.mono, fontSize: 10.5, color: C.mute, charSpacing: 1, lineSpacingMultiple: 1.2 });
    });
    B.footer(s, 8, TOTAL);
  }

  // ============================================================ 9 — GOVERNANCE & COMPLIANCE
  {
    const s = p.addSlide(); B.bg(s);
    B.kicker(s, "TOTAL GOVERNANCE & VISIBILITY");
    s.addText("Total governance. Full visibility. Provable trust.", { x: MARGIN, y: 1.1, w: 11.5, h: 0.7, margin: 0, fontFace: F.head, fontSize: 32, bold: true, color: C.paper });
    const lx = MARGIN, ly = 2.3;
    s.addText("Full visibility", { x: lx, y: ly, w: 5, h: 0.35, margin: 0, fontFace: F.body, fontSize: 16, bold: true, color: C.volt });
    ["Every prompt to every model — logged: who, tool, data type, when.", "Findings, classifications & remediation never leave your tenancy.", "Immutable on-chain audit trail for high-assurance evidence."].forEach((t, i) => {
      const y = ly + 0.5 + i * 0.6;
      s.addImage({ data: I.check, x: lx, y: y + 0.02, w: 0.26, h: 0.26 });
      s.addText(t, { x: lx + 0.42, y, w: 5.1, h: 0.55, margin: 0, fontFace: F.body, fontSize: 13.5, color: C.paper, valign: "middle", lineSpacingMultiple: 1.15 });
    });
    s.addText("Compliance-ready exports", { x: lx, y: ly + 2.5, w: 5, h: 0.35, margin: 0, fontFace: F.body, fontSize: 16, bold: true, color: C.volt });
    let cx = lx; const cyc = ly + 3.0;
    ["GDPR", "CCPA", "HIPAA", "SOC 2", "ISO 27001"].forEach((t) => {
      const w = 0.4 + t.length * 0.13;
      s.addShape("roundRect", { x: cx, y: cyc, w, h: 0.44, rectRadius: 0.1, fill: { color: C.white, transparency: 92 }, line: { color: C.line, transparency: 70, width: 1 } });
      s.addText(t, { x: cx, y: cyc, w, h: 0.44, margin: 0, align: "center", valign: "middle", fontFace: F.mono, fontSize: 11, color: C.paper });
      cx += w + 0.16;
    });
    // audit table
    const head = ["User", "Model", "Data Type", "Status"].map(t => ({ text: t, options: { fill: { color: C.teal }, color: C.white, bold: true, fontFace: F.mono, fontSize: 10, align: "left", valign: "middle" } }));
    const data = [["a.chen", "GPT-4o", "Customer PII", "● Protected"], ["m.ruiz", "Claude", "Financial", "● Protected"], ["j.park", "Gemini", "Source code", "● Protected"], ["s.okoro", "Llama (on-prem)", "PHI", "● Masked + flagged"], ["d.lang", "GPT-4o", "API keys", "● Protected"]];
    const body = data.map((r, ri) => r.map((cell, ci) => ({ text: cell, options: { fill: { color: ri % 2 ? C.deep : C.panel }, color: ci === 3 ? (cell.includes("flag") ? C.tang : C.sage) : C.paper, fontFace: F.body, fontSize: 12, bold: ci === 0, align: "left", valign: "middle" } })));
    s.addTable([head, ...body], { x: 6.7, y: 2.3, w: 5.78, colW: [1.2, 1.5, 1.58, 1.5], rowH: 0.52, border: { type: "solid", color: C.ink, pt: 1 }, margin: [0, 6, 0, 6] });
    B.footer(s, 9, TOTAL);
  }

  // ============================================================ 10 — PROOF (photo)
  {
    const s = p.addSlide(); B.scrimPhoto(s, "assets/bg/bg-clinician.jpg", { base: 20, side: false });
    s.addShape("rect", { x: 0, y: 0, w: W, h: H, fill: { color: C.ink, transparency: 18 }, line: { type: "none" } });
    B.kicker(s, "PROOF · INNOVATION WITH TRUST");
    s.addText("“", { x: MARGIN - 0.05, y: 1.5, w: 1, h: 1.2, margin: 0, fontFace: F.head, fontSize: 90, bold: true, color: C.volt });
    s.addText("We shipped an AI assistant on patient records in six weeks. Legal signed it in two days. That's PrivacyPal Cloud.", { x: MARGIN + 0.75, y: 1.95, w: 10.6, h: 2.2, margin: 0, fontFace: F.head, fontSize: 36, bold: true, color: C.paper, lineSpacingMultiple: 1.15 });
    s.addText("— CTO, healthcare SaaS · Series B", { x: MARGIN + 0.75, y: 4.25, w: 8, h: 0.4, margin: 0, fontFace: F.body, fontSize: 15, color: C.volt });
    B.rule(s, MARGIN, 5.1, W - 2 * MARGIN, { transparency: 70 });
    s.addText([{ text: "10M+", options: { color: C.paper, bold: true } }], { x: MARGIN, y: 5.35, w: 2.5, h: 0.6, margin: 0, fontFace: F.head, fontSize: 30 });
    s.addText("ELEMENTS GOVERNED IN REAL TIME", { x: MARGIN, y: 5.95, w: 3.2, h: 0.3, margin: 0, fontFace: F.mono, fontSize: 9.5, color: C.mute, charSpacing: 1 });
    s.addText([{ text: "Days", options: { color: C.paper, bold: true } }], { x: MARGIN + 3.3, y: 5.35, w: 2.5, h: 0.6, margin: 0, fontFace: F.head, fontSize: 30 });
    s.addText("NOT QUARTERS, TO LAUNCH", { x: MARGIN + 3.3, y: 5.95, w: 3, h: 0.3, margin: 0, fontFace: F.mono, fontSize: 9.5, color: C.mute, charSpacing: 1 });
    // partner chips
    const chips = [partners.nvidia, partners.voda, partners.pnp];
    chips.forEach((d, i) => {
      const cw = 1.35, x = W - MARGIN - (3 - i) * (cw + 0.18) + 0.18, y = 5.45;
      s.addShape("roundRect", { x, y, w: cw, h: 0.6, rectRadius: 0.1, fill: { color: "F5F0E8" }, line: { type: "none" } });
      s.addImage({ data: d, x: x + 0.16, y: y + 0.14, w: cw - 0.32, h: 0.32, sizing: { type: "contain", w: cw - 0.32, h: 0.32 } });
    });
    B.footer(s, 10, TOTAL);
  }

  // ============================================================ 11 — FINAL CTA (photo)
  {
    const s = p.addSlide(); B.scrimPhoto(s, "assets/bg/bg-skyline.jpg", { base: 28 });
    s.addText("●   THE GOVERNANCE LAYER FOR AI", { x: 0, y: 1.5, w: W, h: 0.32, margin: 0, align: "center", valign: "middle", fontFace: F.mono, fontSize: 13, color: C.volt, charSpacing: 3, bold: true });
    s.addText([cr("Stop blocking AI.", true), ac("Start governing it.")], { x: 0, y: 2.0, w: W, h: 2.0, margin: 0, align: "center", fontFace: F.head, fontSize: 72, bold: true, lineSpacingMultiple: 0.98 });
    s.addText("The layer that turns AI from your biggest risk into your biggest advantage.", { x: 0, y: 4.5, w: W, h: 0.5, margin: 0, align: "center", fontFace: F.body, fontSize: 18, color: C.paper });
    B.pill(s, W / 2 - 3.0, 5.4, 2.9, 0.66, "Book a demo  →", { fontSize: 16 });
    B.pill(s, W / 2 + 0.1, 5.4, 2.9, 0.66, "Watch the product intro", { outline: true, fontSize: 14 });
    s.addText("privacypal.ai      ·      Book a demo      ·      Solution Engineering", { x: 0, y: 6.5, w: W, h: 0.35, margin: 0, align: "center", fontFace: F.mono, fontSize: 12, color: C.mute, charSpacing: 1 });
  }

  await p.writeFile({ fileName: "privacypal-enterprise-deck.pptx" });
  console.log("WROTE privacypal-enterprise-deck.pptx");
})().catch((e) => { console.error(e); process.exit(1); });
