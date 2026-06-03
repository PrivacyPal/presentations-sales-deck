#!/usr/bin/env python3
"""Assemble slide JPEGs into a PDF, one full-bleed image per 16:9 page.
Pure stdlib. Embeds JPEGs directly (DCTDecode) so there is no reflow,
no font dependency, and no pagination drift -- each page IS the slide image."""
import glob, os, struct, sys

JPG_DIR = "/Users/jason/dev/PrivacyPal/privacypal-sales-deck/slides_jpg"
OUT = "/Users/jason/dev/PrivacyPal/privacypal-sales-deck/privacypal-sales-deck.pdf"
PAGE_W, PAGE_H = 960.0, 540.0  # points; 16:9 (matches PowerPoint widescreen 13.33in x 7.5in)

def jpeg_size(data):
    """Return (width, height) by scanning JPEG SOF markers."""
    i = 2
    n = len(data)
    while i < n:
        if data[i] != 0xFF:
            i += 1
            continue
        marker = data[i + 1]
        # standalone markers without length
        if marker in (0xD8, 0xD9) or 0xD0 <= marker <= 0xD7:
            i += 2
            continue
        seglen = struct.unpack(">H", data[i + 2:i + 4])[0]
        # SOF0..SOF15 except DHT(C4), JPG(C8), DAC(CC)
        if 0xC0 <= marker <= 0xCF and marker not in (0xC4, 0xC8, 0xCC):
            h = struct.unpack(">H", data[i + 5:i + 7])[0]
            w = struct.unpack(">H", data[i + 7:i + 9])[0]
            return w, h
        i += 2 + seglen
    raise ValueError("no SOF marker found")

jpgs = sorted(glob.glob(os.path.join(JPG_DIR, "slide-*.jpg")))
if not jpgs:
    sys.exit("no jpgs found")

objects = []  # list of raw object bodies (bytes), 1-indexed via append order

def add(obj_bytes):
    objects.append(obj_bytes)
    return len(objects)  # object number

# Reserve: 1 = Catalog, 2 = Pages. We'll fill them after we know kids.
objects.append(b"")  # placeholder obj 1 (Catalog)
objects.append(b"")  # placeholder obj 2 (Pages)

page_obj_nums = []
for path in jpgs:
    with open(path, "rb") as f:
        jpg = f.read()
    w, h = jpeg_size(jpg)
    # image XObject
    img_hdr = (
        b"<< /Type /XObject /Subtype /Image /Width %d /Height %d "
        b"/ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode "
        b"/Length %d >>\nstream\n" % (w, h, len(jpg))
    )
    img_obj = img_hdr + jpg + b"\nendstream"
    img_num = add(img_obj)
    # content stream: draw image full-bleed
    content = b"q %.2f 0 0 %.2f 0 0 cm /Im0 Do Q" % (PAGE_W, PAGE_H)
    content_obj = b"<< /Length %d >>\nstream\n%s\nendstream" % (len(content), content)
    content_num = add(content_obj)
    # page object
    page = (
        b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 %.2f %.2f] "
        b"/Resources << /XObject << /Im0 %d 0 R >> >> /Contents %d 0 R >>"
        % (PAGE_W, PAGE_H, img_num, content_num)
    )
    page_num = add(page)
    page_obj_nums.append(page_num)

# Fill Pages (obj 2) and Catalog (obj 1)
kids = b" ".join(b"%d 0 R" % n for n in page_obj_nums)
objects[1] = b"<< /Type /Pages /Kids [%s] /Count %d >>" % (kids, len(page_obj_nums))
objects[0] = b"<< /Type /Catalog /Pages 2 0 R >>"

# Serialize
out = bytearray()
out += b"%PDF-1.5\n%\xe2\xe3\xcf\xd3\n"
offsets = [0] * (len(objects) + 1)
for idx, body in enumerate(objects, start=1):
    offsets[idx] = len(out)
    out += b"%d 0 obj\n" % idx
    out += body
    out += b"\nendobj\n"

xref_pos = len(out)
n = len(objects)
out += b"xref\n0 %d\n" % (n + 1)
out += b"0000000000 65535 f \n"
for idx in range(1, n + 1):
    out += b"%010d 00000 n \n" % offsets[idx]
out += b"trailer\n<< /Size %d /Root 1 0 R >>\n" % (n + 1)
out += b"startxref\n%d\n%%%%EOF" % xref_pos

with open(OUT, "wb") as f:
    f.write(out)
print("wrote %s : %d pages, %d bytes" % (OUT, len(page_obj_nums), len(out)))
