#!/bin/bash
# Export a .pptx to per-slide PNGs (and a PDF) via Apple Keynote.
# Usage: ./render.sh <deck.pptx> <out_dir>
set -e
PPTX="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"
OUT="$2"
rm -rf "$OUT" && mkdir -p "$OUT"
osascript <<EOF
tell application id "com.apple.iWork.Keynote"
  launch
  delay 2
  set d to open (POSIX file "$PPTX")
  delay 4
  export d to (POSIX file "$OUT") as slide images with properties {image format:PNG}
  export d to (POSIX file "${PPTX%.pptx}.pdf") as PDF
  close d saving no
end tell
EOF
echo "rendered $(ls "$OUT"/*.png 2>/dev/null | wc -l | tr -d ' ') PNGs -> $OUT"
