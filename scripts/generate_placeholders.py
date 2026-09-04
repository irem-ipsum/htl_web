#!/usr/bin/env python3
"""Generate on-brand placeholder imagery for Hack The Loop using the strict palette."""
import os, random, math
from PIL import Image, ImageDraw, ImageFilter, ImageFont

PURPLES = ["#77386E", "#904B86", "#AE62A4", "#D7A2CA", "#E9C5DE"]
GREENS = ["#387741", "#4B9055", "#62AE6C", "#A2D7AF", "#C5E9D0"]
CREAM = "#FEF2E0"
INK = "#171717"
ALL = PURPLES + GREENS

random.seed(42)

OUT = "/root/hacktheloop-site/public/images"
os.makedirs(OUT, exist_ok=True)
os.makedirs(f"{OUT}/team", exist_ok=True)
os.makedirs(f"{OUT}/gallery", exist_ok=True)
os.makedirs(f"{OUT}/events", exist_ok=True)

def hex2rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def lerp(a, b, t):
    return tuple(int(a[i] + (b[i]-a[i])*t) for i in range(3))

def gradient(w, h, c1, c2, angle=45):
    base = Image.new("RGB", (w, h), c1)
    top = Image.new("RGB", (w, h), c2)
    mask = Image.new("L", (w, h))
    md = ImageDraw.Draw(mask)
    rad = math.radians(angle)
    for y in range(h):
        for x in [0]:
            pass
    # faster vectorized-ish approach using per-column gradient along angle
    import numpy as np
    xs = np.linspace(0, 1, w)
    ys = np.linspace(0, 1, h)
    gx, gy = np.meshgrid(xs, ys)
    t = (gx*math.cos(rad) + gy*math.sin(rad))
    t = (t - t.min()) / (t.max() - t.min())
    arr = np.zeros((h, w, 3), dtype=np.uint8)
    c1a = np.array(c1); c2a = np.array(c2)
    for ch in range(3):
        arr[:,:,ch] = (c1a[ch] + (c2a[ch]-c1a[ch])*t).astype(np.uint8)
    return Image.fromarray(arr, "RGB")

def add_noise_texture(img, amount=6):
    import numpy as np
    arr = np.array(img).astype(np.int16)
    noise = np.random.randint(-amount, amount, arr.shape[:2])
    for ch in range(3):
        arr[:,:,ch] = np.clip(arr[:,:,ch] + noise, 0, 255)
    return Image.fromarray(arr.astype(np.uint8), "RGB")

def draw_controller_motif(draw, cx, cy, scale, color, alpha=255):
    r = scale
    # simple abstract game-pad-ish rounded rect + circle (brand motif echo)
    draw.rounded_rectangle([cx-r*1.3, cy-r*0.6, cx+r*1.3, cy+r*0.6], radius=r*0.55, outline=color, width=max(2, int(scale*0.06)))
    draw.ellipse([cx+r*0.5, cy-r*0.28, cx+r*0.5+r*0.5, cy-r*0.28+r*0.5], outline=color, width=max(2,int(scale*0.05)))

def scene(w, h, seed, motif="dots"):
    random.seed(seed)
    c1 = hex2rgb(random.choice(ALL))
    c2 = hex2rgb(random.choice([c for c in ALL if c != None]))
    while c2 == c1:
        c2 = hex2rgb(random.choice(ALL))
    angle = random.choice([20, 45, 70, 110, 160])
    img = gradient(w, h, c1, c2, angle)
    img = img.filter(ImageFilter.GaussianBlur(1))
    draw = ImageDraw.Draw(img, "RGBA")
    n = random.randint(5, 9)
    for i in range(n):
        x = random.randint(0, w)
        y = random.randint(0, h)
        r = random.randint(int(min(w,h)*0.05), int(min(w,h)*0.22))
        shape_color = hex2rgb(random.choice(ALL)) + (random.randint(30, 70),)
        kind = random.choice(["circle", "circle", "ring", "diamond"])
        if kind == "circle":
            draw.ellipse([x-r, y-r, x+r, y+r], fill=shape_color)
        elif kind == "ring":
            draw.ellipse([x-r, y-r, x+r, y+r], outline=shape_color, width=max(3, r//6))
        else:
            draw.polygon([(x, y-r), (x+r, y), (x, y+r), (x-r, y)], fill=shape_color)
    img = add_noise_texture(img, 4)
    # vignette
    overlay = Image.new("L", (w, h), 0)
    od = ImageDraw.Draw(overlay)
    od.ellipse([-w*0.3, -h*0.3, w*1.3, h*1.3], fill=60)
    return img

def save(img, path, quality=87):
    img.save(path, quality=quality)
    print("wrote", path)

# ---- Team & volunteer avatars (square) ----
NAMES = [
    "Ela Y.", "Sude K.", "Naz A.", "Deniz T.", "Mira C.", "Buse S.",
    "Cansu O.", "Elif D.", "Aylin R.", "Zeynep M.", "Irem B.", "Selin F.",
]
for i, name in enumerate(NAMES):
    img = scene(600, 600, seed=100+i)
    draw = ImageDraw.Draw(img, "RGBA")
    # monogram circle badge
    initials = "".join([p[0] for p in name.split(" ")][:2]).upper()
    cx, cy, r = 300, 300, 150
    draw.ellipse([cx-r, cy-r, cx+r, cy+r], fill=hex2rgb(INK) + (235,))
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 130)
    except Exception:
        font = ImageFont.load_default()
    bbox = draw.textbbox((0,0), initials, font=font)
    tw, th = bbox[2]-bbox[0], bbox[3]-bbox[1]
    draw.text((cx-tw/2-bbox[0], cy-th/2-bbox[1]), initials, fill=hex2rgb(CREAM), font=font)
    save(img, f"{OUT}/team/avatar-{i+1}.jpg")

# ---- Gallery: varied aspect ratios for masonry ----
SIZES = [
    (800,1000),(800,800),(800,1200),(800,900),(800,650),(800,1100),
    (800,800),(800,1300),(800,700),(800,950),(800,1050),(800,800),
    (800,1150),(800,750),(800,1000),(800,900),(800,1250),(800,800),
]
for i, (w,h) in enumerate(SIZES):
    img = scene(w, h, seed=300+i)
    save(img, f"{OUT}/gallery/gallery-{i+1:02d}.jpg")

# ---- Event cover images (wide banners) ----
for i in range(8):
    img = scene(1200, 675, seed=500+i)
    save(img, f"{OUT}/events/event-{i+1}.jpg")

print("DONE")
