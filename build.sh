#!/bin/bash
# Build both PrivacyPal decks as native, editable PPTX.
# The .pptx files are the deliverable; the build-*.js sources are the root of truth.
set -e
cd "$(dirname "$0")"

# Ensure the display font is installed so PowerPoint/Keynote render it natively.
# Static Regular+Bold (RIBBI) — variable fonts substitute incorrectly in PowerPoint for Mac.
if [ ! -f "$HOME/Library/Fonts/SpaceGrotesk-Bold.ttf" ]; then
  echo "Installing Space Grotesk (static) font…"
  cp assets/fonts/SpaceGrotesk-Regular.ttf assets/fonts/SpaceGrotesk-Bold.ttf "$HOME/Library/Fonts/"
fi

[ -d node_modules ] || npm install

node build-sme.js
node build-enterprise.js

echo ""
echo "Built:"
echo "  privacypal-sales-deck.pptx       (18 slides)"
echo "  privacypal-enterprise-deck.pptx  (11 slides)"
echo ""
echo "Preview / PDF export (via Keynote):  ./render.sh <deck.pptx> <out_dir>"
