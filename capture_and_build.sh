#!/bin/bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
cd /Users/jason/privacypal-sales-deck
rm -f slides_hi/*.png 2>/dev/null
mkdir -p slides_hi
capture() {
  local i=$1
  local N=$(printf "%02d" $i)
  local out="slides_hi/slide-$N.png"
  local P=$(mktemp -d)
  rm -f "$out"
  "$CHROME" --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=3 \
    --window-size=1280,720 --user-data-dir="$P" --no-first-run --no-default-browser-check \
    --virtual-time-budget=3500 --screenshot="$out" \
    "file:///Users/jason/privacypal-sales-deck/privacypal-sales-deck.html#$i" >/dev/null 2>&1 &
  local pid=$!
  # wait up to 40s for the file to appear and stabilize
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
  rm -rf "$P"
  [ -f "$out" ] && echo "cap $N ok ($(stat -f%z "$out") b)" || echo "cap $N FAIL"
}
for i in $(seq 1 16); do capture $i; done
# reap any stragglers
pkill -f "Google Chrome --headless" >/dev/null 2>&1
CNT=$(ls slides_hi/*.png 2>/dev/null | wc -l | tr -d ' ')
echo "=== captured: $CNT"
[ "$CNT" = "16" ] || { echo "ABORT not all captured"; exit 1; }
for f in slides_hi/slide-*.png; do b=$(basename "$f" .png); sips -s format jpeg -s formatOptions 95 "$f" --out "slides_jpg/$b.jpg" >/dev/null 2>&1; done
echo "=== jpeg: $(ls slides_jpg/*.jpg | wc -l)"
sips -g pixelWidth -g pixelHeight slides_jpg/slide-01.jpg
python3 build_pdf.py
mdls -name kMDItemNumberOfPages privacypal-sales-deck.pdf 2>/dev/null
ls -la privacypal-sales-deck.pdf
echo "ALL_DONE"
