#!/usr/bin/env bash
# Resize + recompress the site photos for the web.
#
# The originals are 3060–4080 px wide and ~31 MB in total, which is far more
# than the layout ever displays (largest slot is ~1440 px). This script rewrites
# them in place at sane dimensions and quality.
#
# Requires ImageMagick 7 (`magick`) or 6 (`convert`).
#   macOS:  brew install imagemagick
#   Ubuntu: sudo apt install imagemagick
#
# Usage:  bash tools/optimize-images.sh
#
# Commit the result afterwards — the visual output is unchanged at display size.

set -euo pipefail
cd "$(dirname "$0")/.."

if command -v magick >/dev/null 2>&1; then IM="magick"
elif command -v convert >/dev/null 2>&1; then IM="convert"
else
  echo "ImageMagick not found. Install it, then re-run." >&2
  exit 1
fi

MAX_W=1800        # widest the layout ever needs, with room for retina
QUALITY=82        # visually lossless for photographs

before=$(du -ch ./*.jpg | tail -1 | cut -f1)

for f in ./*.jpg; do
  [ -e "$f" ] || continue
  $IM "$f" \
    -auto-orient \
    -resize "${MAX_W}x${MAX_W}>" \
    -strip \
    -sampling-factor 4:2:0 \
    -interlace JPEG \
    -quality "$QUALITY" \
    "$f"
  printf '  %-26s %s\n' "$(basename "$f")" "$(du -h "$f" | cut -f1)"
done

after=$(du -ch ./*.jpg | tail -1 | cut -f1)
echo
echo "Total: $before → $after"
echo "Review the images, then: git add -A && git commit -m 'perf: compress photos' && git push"
