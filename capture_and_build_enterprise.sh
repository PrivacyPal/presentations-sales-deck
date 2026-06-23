#!/bin/bash
# Capture the ENTERPRISE deck (privacypal-enterprise-deck.html) to hi-res PNGs,
# convert to JPEG, then build the PDF and PPTX. Mirrors capture_and_build.sh.
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
BASE="/Users/jason/dev/PrivacyPal/privacypal-sales-deck"
HTML="$BASE/privacypal-enterprise-deck.html"
HI="$BASE/slides_enterprise_hi"
JPG="$BASE/slides_enterprise_jpg"
PDF="$BASE/privacypal-enterprise-deck.pdf"
PPTX="$BASE/privacypal-enterprise-deck.pptx"
NSLIDES=11
cd "$BASE"
rm -f "$HI"/*.png 2>/dev/null
mkdir -p "$HI" "$JPG"
capture() {
  local i=$1
  local N=$(printf "%02d" $i)
  local out="$HI/slide-$N.png"
  local P=$(mktemp -d)
  rm -f "$out"
  "$CHROME" --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=3 \
    --window-size=1280,720 --user-data-dir="$P" --no-first-run --no-default-browser-check \
    --virtual-time-budget=3500 --screenshot="$out" \
    "file://$HTML#$i" >/dev/null 2>&1 &
  local pid=$!
  local waited=0
  while [ $waited -lt 40 ]; do
    if [ -f "$out" ]; then
      sz1=$(stat -f%z "$out" 2>/dev/null)
      sleep 1
      sz2=$(stat -f%z "$out" 2>/dev/null)
      if [ -n "$sz1" ] && [ "$sz1" = "$sz2" ] && [ "$sz1" -gt 1000 ]; then break; fi
    fi
    sleep 1; waited=$((waited+1))
  done
  kill "$pid" >/dev/null 2>&1
  rm -rf "$P" 2>/dev/null
  [ -f "$out" ] && echo "cap $N ok ($(stat -f%z "$out") b)" || echo "cap $N FAIL"
}
for i in $(seq 1 $NSLIDES); do capture $i; done
pkill -f "Google Chrome --headless" >/dev/null 2>&1
CNT=$(ls "$HI"/*.png 2>/dev/null | wc -l | tr -d ' ')
echo "=== captured: $CNT"
[ "$CNT" = "$NSLIDES" ] || { echo "ABORT not all captured"; exit 1; }
rm -f "$JPG"/*.jpg 2>/dev/null
for f in "$HI"/slide-*.png; do b=$(basename "$f" .png); sips -s format jpeg -s formatOptions 95 "$f" --out "$JPG/$b.jpg" >/dev/null 2>&1; done
echo "=== jpeg: $(ls "$JPG"/*.jpg | wc -l)"
python3 build_pdf.py "$JPG" "$PDF"
python3 build_pptx.py "$JPG" "$PPTX"
ls -la "$PDF" "$PPTX"
echo "ALL_DONE"
