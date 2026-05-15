from __future__ import annotations

from pathlib import Path
import math

import imageio.v2 as imageio
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
VIDEO_PATH = PUBLIC / "videos" / "video.mp4"
ENTRANCE_PATH = PUBLIC / "videos" / "images" / "image.png"
LOGO_PATH = PUBLIC / "images" / "logo" / "awish-logo-BOw6Zrgz.webp"
OUTPUT_PATH = PUBLIC / "videos" / "awish-clinic-concept-v2.mp4"
POSTER_PATH = PUBLIC / "videos" / "awish-clinic-concept-v2-poster.jpg"

WIDTH = 1920
HEIGHT = 1080
FPS = 25

IVORY = (248, 244, 237)
BRAND = (33, 77, 72)
ACCENT = (138, 79, 57)
WHITE = (255, 255, 255)
TEXT = (30, 36, 34)


def font(path: str, size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    try:
        return ImageFont.truetype(path, size=size)
    except Exception:
        return ImageFont.load_default()


TITLE_FONT = font(r"C:\Windows\Fonts\georgiab.ttf", 86)
SUBTITLE_FONT = font(r"C:\Windows\Fonts\segoeui.ttf", 34)
PILL_FONT = font(r"C:\Windows\Fonts\arialbd.ttf", 26)
SMALL_FONT = font(r"C:\Windows\Fonts\segoeui.ttf", 28)


def ease_in_out(value: float) -> float:
    return 0.5 - 0.5 * math.cos(value * math.pi)


def clamp01(value: float) -> float:
    return max(0.0, min(1.0, value))


def text_size(draw: ImageDraw.ImageDraw, text: str, fnt: ImageFont.ImageFont) -> tuple[int, int]:
    box = draw.textbbox((0, 0), text, font=fnt)
    return box[2] - box[0], box[3] - box[1]


def cover(image: Image.Image, width: int, height: int, scale: float = 1.0) -> Image.Image:
    img = image.convert("RGBA")
    src_w, src_h = img.size
    ratio = max(width / src_w, height / src_h) * scale
    resized = img.resize((int(src_w * ratio), int(src_h * ratio)), Image.Resampling.LANCZOS)
    left = (resized.width - width) // 2
    top = (resized.height - height) // 2
    return resized.crop((left, top, left + width, top + height))


def contain(image: Image.Image, width: int, height: int) -> Image.Image:
    img = image.convert("RGBA")
    img.thumbnail((width, height), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    x = (width - img.width) // 2
    y = (height - img.height) // 2
    canvas.paste(img, (x, y), img)
    return canvas


def add_shadowed_text(
    draw: ImageDraw.ImageDraw,
    pos: tuple[int, int],
    text: str,
    fnt: ImageFont.ImageFont,
    fill: tuple[int, int, int],
    shadow: tuple[int, int, int, int] = (0, 0, 0, 160),
    shadow_offset: tuple[int, int] = (0, 3),
) -> None:
    x, y = pos
    draw.text((x + shadow_offset[0], y + shadow_offset[1]), text, font=fnt, fill=shadow)
    draw.text((x, y), text, font=fnt, fill=fill)


def draw_pill(draw: ImageDraw.ImageDraw, text: str, x: int, y: int) -> None:
    tw, th = text_size(draw, text, PILL_FONT)
    pad_x, pad_y = 28, 16
    box = (x, y, x + tw + pad_x * 2, y + th + pad_y * 2)
    draw.rounded_rectangle(box, radius=999, fill=(255, 255, 255, 220), outline=(255, 255, 255, 180), width=2)
    draw.text((x + pad_x, y + pad_y - 3), text, font=PILL_FONT, fill=BRAND + (255,))


def gradient_overlay(height: int, start_alpha: int, end_alpha: int) -> Image.Image:
    overlay = Image.new("RGBA", (WIDTH, height), (0, 0, 0, 0))
    px = overlay.load()
    for y in range(height):
        alpha = int(start_alpha + (end_alpha - start_alpha) * (y / max(1, height - 1)))
        for x in range(WIDTH):
            px[x, y] = (10, 16, 20, alpha)
    return overlay


def vignette_overlay() -> Image.Image:
    arr = np.zeros((HEIGHT, WIDTH, 4), dtype=np.uint8)
    yy, xx = np.mgrid[0:HEIGHT, 0:WIDTH]
    cx = WIDTH / 2
    cy = HEIGHT / 2
    distance = np.sqrt(((xx - cx) / WIDTH) ** 2 + ((yy - cy) / HEIGHT) ** 2)
    alpha = np.clip((distance - 0.28) / 0.35, 0, 1)
    arr[:, :, 3] = (alpha * 130).astype(np.uint8)
    return Image.fromarray(arr, "RGBA")


def make_intro_frame(entrance: Image.Image, logo: Image.Image, t: float, duration: float) -> Image.Image:
    progress = clamp01(t / duration)
    base = Image.new("RGBA", (WIDTH, HEIGHT), IVORY + (255,))

    bg = cover(entrance.filter(ImageFilter.GaussianBlur(18)), WIDTH, HEIGHT, 1.12)
    bg = Image.blend(bg, Image.new("RGBA", (WIDTH, HEIGHT), (235, 231, 224, 255)), 0.34)
    base.alpha_composite(bg)

    panel = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    card_w, card_h = 540, 760
    card_x, card_y = 170, 160
    shadow = Image.new("RGBA", (card_w + 40, card_h + 40), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    shadow_draw.rounded_rectangle((20, 20, card_w + 20, card_h + 20), radius=48, fill=(0, 0, 0, 80))
    shadow = shadow.filter(ImageFilter.GaussianBlur(18))
    panel.alpha_composite(shadow, (card_x - 20, card_y - 10))

    card = Image.new("RGBA", (card_w, card_h), (255, 255, 255, 235))
    mask = Image.new("L", (card_w, card_h), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, card_w, card_h), radius=48, fill=255)
    card.putalpha(mask)
    panel.alpha_composite(card, (card_x, card_y))

    zoom = 1.02 + 0.05 * ease_in_out(progress)
    entrance_card = cover(entrance, card_w - 42, card_h - 42, zoom)
    entrance_mask = Image.new("L", (card_w - 42, card_h - 42), 0)
    ImageDraw.Draw(entrance_mask).rounded_rectangle((0, 0, card_w - 42, card_h - 42), radius=36, fill=255)
    entrance_card.putalpha(entrance_mask)
    panel.alpha_composite(entrance_card, (card_x + 21, card_y + 21))
    base.alpha_composite(panel)

    draw = ImageDraw.Draw(base)
    accent_x = 830
    accent_y = 220
    draw_pill(draw, "DELHI CLINIC", accent_x, accent_y)
    title_y = accent_y + 118
    subtitle_y = title_y + 124
    line_y = subtitle_y + 88

    reveal = ease_in_out(progress)
    title_x = int(accent_x + 20 * (1 - reveal))
    add_shadowed_text(draw, (title_x, title_y), "Awish Clinic", TITLE_FONT, WHITE)
    draw.text(
        (title_x, subtitle_y),
        "Skin, Hair & Aesthetic Care",
        font=SUBTITLE_FONT,
        fill=(255, 255, 255, 228),
    )
    draw.rounded_rectangle((title_x, line_y, title_x + 210, line_y + 8), radius=999, fill=ACCENT + (255,))
    draw.text(
        (title_x, line_y + 36),
        "Professional care with a calm, premium feel.",
        font=SMALL_FONT,
        fill=(255, 255, 255, 215),
    )

    logo_size = 210
    logo_img = contain(logo, logo_size, logo_size)
    logo_opacity = int(255 * clamp01((progress - 0.15) / 0.45))
    logo_alpha = logo_img.getchannel("A").point(lambda px: px * logo_opacity // 255)
    logo_img.putalpha(logo_alpha)
    base.alpha_composite(logo_img, (WIDTH - 320, 150))

    fade = clamp01(progress / 0.22)
    if progress > 0.86:
      fade = clamp01((1 - progress) / 0.14)
    if fade < 1:
        veil = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, int((1 - fade) * 255)))
        base.alpha_composite(veil)
    return base


def load_frame(reader: imageio.Reader, second: float) -> Image.Image:
    idx = max(0, int(second * FPS))
    return Image.fromarray(reader.get_data(idx)).convert("RGBA")


def make_clip_frame(
    reader: imageio.Reader,
    logo: Image.Image,
    clip: dict[str, object],
    t: float,
) -> Image.Image:
    duration = float(clip["duration"])
    start = float(clip["source_start"])
    end = float(clip["source_end"])
    progress = clamp01(t / duration)
    source_t = start + (end - start) * progress
    zoom_from, zoom_to = clip.get("zoom", (1.02, 1.08))
    zoom = float(zoom_from) + (float(zoom_to) - float(zoom_from)) * ease_in_out(progress)

    frame = load_frame(reader, source_t)
    base = cover(frame, WIDTH, HEIGHT, zoom)
    base.alpha_composite(vignette_overlay())
    base.alpha_composite(gradient_overlay(420, 0, 205), (0, HEIGHT - 420))

    draw = ImageDraw.Draw(base)
    draw_pill(draw, "AWISH CLINIC", 92, 84)

    logo_small = contain(logo, 138, 138)
    logo_small_alpha = logo_small.getchannel("A").point(lambda px: px * 175 // 255)
    logo_small.putalpha(logo_small_alpha)
    base.alpha_composite(logo_small, (WIDTH - 210, 58))

    title = str(clip["title"])
    subtitle = str(clip["subtitle"])
    title_x = 92
    title_y = HEIGHT - 248
    subtitle_y = HEIGHT - 122
    text_progress = clamp01(progress / 0.22)
    if progress > 0.84:
        text_progress = clamp01((1 - progress) / 0.16)
    slide = int(36 * (1 - ease_in_out(text_progress)))
    opacity = int(255 * text_progress)

    add_shadowed_text(
        draw,
        (title_x, title_y + slide),
        title,
        TITLE_FONT,
        (255, 255, 255, opacity),
        shadow=(0, 0, 0, int(opacity * 0.55)),
        shadow_offset=(0, 4),
    )
    draw.text(
        (title_x, subtitle_y + slide),
        subtitle,
        font=SUBTITLE_FONT,
        fill=(255, 255, 255, int(opacity * 0.92)),
    )

    if progress < 0.10:
        veil = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, int((1 - progress / 0.10) * 90)))
        base.alpha_composite(veil)
    if progress > 0.90:
        veil = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, int(((progress - 0.90) / 0.10) * 110)))
        base.alpha_composite(veil)
    return base


def make_outro_frame(entrance: Image.Image, logo: Image.Image, t: float, duration: float) -> Image.Image:
    progress = clamp01(t / duration)
    base = Image.new("RGBA", (WIDTH, HEIGHT), IVORY + (255,))
    bg = cover(entrance.filter(ImageFilter.GaussianBlur(14)), WIDTH, HEIGHT, 1.24)
    bg = Image.blend(bg, Image.new("RGBA", (WIDTH, HEIGHT), (236, 232, 225, 255)), 0.46)
    base.alpha_composite(bg)

    wash = Image.new("RGBA", (WIDTH, HEIGHT), BRAND + (82,))
    base.alpha_composite(wash)

    center_card = Image.new("RGBA", (1180, 560), (255, 255, 255, 218))
    mask = Image.new("L", center_card.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, center_card.width, center_card.height), radius=52, fill=255)
    center_card.putalpha(mask)
    shadow = center_card.copy().filter(ImageFilter.GaussianBlur(22))
    shadow.putalpha(110)
    base.alpha_composite(shadow, ((WIDTH - 1180) // 2, 270))
    base.alpha_composite(center_card, ((WIDTH - 1180) // 2, 250))

    draw = ImageDraw.Draw(base)
    card_x = (WIDTH - 1180) // 2
    card_y = 250

    logo_big = contain(logo, 220, 220)
    base.alpha_composite(logo_big, (card_x + 62, card_y + 54))
    draw_pill(draw, "BOOK CONSULTATION", card_x + 338, card_y + 82)
    draw.text((card_x + 338, card_y + 196), "Awish Clinic", font=TITLE_FONT, fill=TEXT + (255,))
    draw.text(
        (card_x + 338, card_y + 318),
        "Skin | Hair | Aesthetic | Weight Care",
        font=SUBTITLE_FONT,
        fill=BRAND + (255,),
    )
    draw.text(
        (card_x + 338, card_y + 390),
        "Delhi-focused care with a calm, affordable and professional approach.",
        font=SMALL_FONT,
        fill=(80, 88, 84, 255),
    )
    draw.rounded_rectangle(
        (card_x + 338, card_y + 460, card_x + 648, card_y + 530),
        radius=999,
        fill=ACCENT + (255,),
    )
    draw.text((card_x + 386, card_y + 476), "Awish Clinic | Delhi", font=SMALL_FONT, fill=WHITE + (255,))

    fade = clamp01(progress / 0.18)
    if progress > 0.88:
        fade = clamp01((1 - progress) / 0.12)
    if fade < 1:
        veil = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, int((1 - fade) * 255)))
        base.alpha_composite(veil)
    return base


def save_poster(frame: Image.Image) -> None:
    frame.convert("RGB").save(POSTER_PATH, quality=92)


def main() -> None:
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    reader = imageio.get_reader(str(VIDEO_PATH), "ffmpeg")
    entrance = Image.open(ENTRANCE_PATH).convert("RGBA")
    logo = Image.open(LOGO_PATH).convert("RGBA")

    clips = [
        {
            "source_start": 1.6,
            "source_end": 3.0,
            "duration": 2.8,
            "title": "Personalised Consultation",
            "subtitle": "Private planning for skin, hair and aesthetic concerns.",
            "zoom": (1.02, 1.08),
        },
        {
            "source_start": 3.2,
            "source_end": 5.2,
            "duration": 2.6,
            "title": "Advanced Treatments",
            "subtitle": "Modern care delivered in a calm clinical setting.",
            "zoom": (1.01, 1.07),
        },
        {
            "source_start": 9.6,
            "source_end": 10.8,
            "duration": 2.0,
            "title": "Expert Assessment",
            "subtitle": "Every journey begins with understanding your concern.",
            "zoom": (1.02, 1.06),
        },
        {
            "source_start": 11.2,
            "source_end": 12.8,
            "duration": 2.2,
            "title": "Skin & Hair Care",
            "subtitle": "Glow, scars, anti-ageing, laser and treatment-led sessions.",
            "zoom": (1.01, 1.05),
        },
        {
            "source_start": 13.6,
            "source_end": 16.0,
            "duration": 2.6,
            "title": "Technology-Led Care",
            "subtitle": "Professional equipment with a premium yet approachable feel.",
            "zoom": (1.02, 1.07),
        },
        {
            "source_start": 17.2,
            "source_end": 18.8,
            "duration": 2.0,
            "title": "Comfort-Focused Sessions",
            "subtitle": "Clean, calm treatment moments designed around confidence.",
            "zoom": (1.02, 1.05),
        },
        {
            "source_start": 27.2,
            "source_end": 31.0,
            "duration": 3.0,
            "title": "Natural-Looking Confidence",
            "subtitle": "Results designed to feel refined, not distant or overdone.",
            "zoom": (1.04, 1.10),
        },
    ]

    intro_duration = 2.4
    outro_duration = 3.2

    with imageio.get_writer(
        str(OUTPUT_PATH),
        fps=FPS,
        codec="libx264",
        pixelformat="yuv420p",
        quality=8,
        macro_block_size=None,
        ffmpeg_log_level="error",
    ) as writer:
        poster_saved = False

        intro_frames = int(intro_duration * FPS)
        for i in range(intro_frames):
            frame = make_intro_frame(entrance, logo, i / FPS, intro_duration)
            if not poster_saved:
                save_poster(frame)
                poster_saved = True
            writer.append_data(np.array(frame.convert("RGB")))

        for clip in clips:
            total = int(float(clip["duration"]) * FPS)
            for i in range(total):
                frame = make_clip_frame(reader, logo, clip, i / FPS)
                writer.append_data(np.array(frame.convert("RGB")))

        outro_frames = int(outro_duration * FPS)
        for i in range(outro_frames):
            frame = make_outro_frame(entrance, logo, i / FPS, outro_duration)
            writer.append_data(np.array(frame.convert("RGB")))

    reader.close()
    print(f"Created {OUTPUT_PATH}")
    print(f"Poster  {POSTER_PATH}")


if __name__ == "__main__":
    main()
