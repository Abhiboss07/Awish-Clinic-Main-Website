from __future__ import annotations

from pathlib import Path
import math
import textwrap

import imageio.v2 as imageio
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
VIDEO_PATH = PUBLIC / "videos" / "video.mp4"
ENTRANCE_PATH = PUBLIC / "videos" / "images" / "image.png"
LOGO_PATH = PUBLIC / "images" / "logo" / "awish-logo.jpg"
OUTPUT_PATH = PUBLIC / "videos" / "awish-clinic-concept-v2-mobile.mp4"
POSTER_PATH = PUBLIC / "videos" / "awish-clinic-concept-v2-mobile-poster.jpg"

WIDTH = 720
HEIGHT = 1280
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


TITLE_FONT = font(r"C:\Windows\Fonts\georgiab.ttf", 62)
SUBTITLE_FONT = font(r"C:\Windows\Fonts\segoeui.ttf", 24)
PILL_FONT = font(r"C:\Windows\Fonts\arialbd.ttf", 20)
SMALL_FONT = font(r"C:\Windows\Fonts\segoeui.ttf", 22)
BUTTON_FONT = font(r"C:\Windows\Fonts\arialbd.ttf", 22)


def ease_in_out(value: float) -> float:
    return 0.5 - 0.5 * math.cos(value * math.pi)


def clamp01(value: float) -> float:
    return max(0.0, min(1.0, value))


def text_size(draw: ImageDraw.ImageDraw, text: str, fnt: ImageFont.ImageFont) -> tuple[int, int]:
    box = draw.textbbox((0, 0), text, font=fnt)
    return box[2] - box[0], box[3] - box[1]


def wrap_text(
    draw: ImageDraw.ImageDraw,
    text: str,
    fnt: ImageFont.ImageFont,
    max_width: int,
) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""

    for word in words:
        candidate = word if not current else f"{current} {word}"
        width, _ = text_size(draw, candidate, fnt)
        if width <= max_width or not current:
            current = candidate
        else:
            lines.append(current)
            current = word

    if current:
        lines.append(current)

    return lines


def cover_focus(
    image: Image.Image,
    width: int,
    height: int,
    scale: float = 1.0,
    focus_x: float = 0.5,
    focus_y: float = 0.5,
) -> Image.Image:
    img = image.convert("RGBA")
    src_w, src_h = img.size
    ratio = max(width / src_w, height / src_h) * scale
    resized = img.resize((int(src_w * ratio), int(src_h * ratio)), Image.Resampling.LANCZOS)

    crop_center_x = resized.width * focus_x
    crop_center_y = resized.height * focus_y

    left = int(crop_center_x - width / 2)
    top = int(crop_center_y - height / 2)
    left = max(0, min(left, resized.width - width))
    top = max(0, min(top, resized.height - height))

    return resized.crop((left, top, left + width, top + height))


def contain(image: Image.Image, width: int, height: int) -> Image.Image:
    img = image.convert("RGBA")
    img.thumbnail((width, height), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    x = (width - img.width) // 2
    y = (height - img.height) // 2
    canvas.paste(img, (x, y), img)
    return canvas


def make_circle_logo(image: Image.Image, size: int) -> Image.Image:
    square = contain(image, size, size).resize((size, size), Image.Resampling.LANCZOS)
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, size - 1, size - 1), fill=255)
    square.putalpha(mask)
    return square


def add_shadowed_text(
    draw: ImageDraw.ImageDraw,
    pos: tuple[int, int],
    text: str,
    fnt: ImageFont.ImageFont,
    fill: tuple[int, int, int, int],
    shadow: tuple[int, int, int, int] = (0, 0, 0, 150),
    shadow_offset: tuple[int, int] = (0, 3),
    spacing: int = 8,
) -> None:
    x, y = pos
    draw.multiline_text(
        (x + shadow_offset[0], y + shadow_offset[1]),
        text,
        font=fnt,
        fill=shadow,
        spacing=spacing,
    )
    draw.multiline_text((x, y), text, font=fnt, fill=fill, spacing=spacing)


def draw_pill(
    draw: ImageDraw.ImageDraw,
    text: str,
    x: int,
    y: int,
    fill: tuple[int, int, int, int],
    text_fill: tuple[int, int, int, int],
    outline: tuple[int, int, int, int] | None = None,
) -> None:
    tw, th = text_size(draw, text, PILL_FONT)
    pad_x, pad_y = 18, 12
    box = (x, y, x + tw + pad_x * 2, y + th + pad_y * 2)
    draw.rounded_rectangle(box, radius=999, fill=fill, outline=outline, width=2 if outline else 0)
    draw.text((x + pad_x, y + pad_y - 2), text, font=PILL_FONT, fill=text_fill)


def make_panel(width: int, height: int, radius: int, fill: tuple[int, int, int, int]) -> Image.Image:
    panel = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    mask = Image.new("L", (width, height), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, width, height), radius=radius, fill=255)
    panel.paste(Image.new("RGBA", (width, height), fill), (0, 0), mask)
    return panel


def vignette_overlay() -> Image.Image:
    arr = np.zeros((HEIGHT, WIDTH, 4), dtype=np.uint8)
    yy, xx = np.mgrid[0:HEIGHT, 0:WIDTH]
    cx = WIDTH / 2
    cy = HEIGHT / 2
    distance = np.sqrt(((xx - cx) / WIDTH) ** 2 + ((yy - cy) / HEIGHT) ** 2)
    alpha = np.clip((distance - 0.22) / 0.42, 0, 1)
    arr[:, :, 3] = (alpha * 140).astype(np.uint8)
    return Image.fromarray(arr, "RGBA")


def save_poster(frame: Image.Image) -> None:
    frame.convert("RGB").save(POSTER_PATH, quality=92)


def load_frame(reader: imageio.Reader, second: float) -> Image.Image:
    idx = max(0, int(second * FPS))
    return Image.fromarray(reader.get_data(idx)).convert("RGBA")


def make_intro_frame(entrance: Image.Image, logo: Image.Image, t: float, duration: float) -> Image.Image:
    progress = clamp01(t / duration)
    reveal = ease_in_out(progress)

    base = cover_focus(entrance.filter(ImageFilter.GaussianBlur(12)), WIDTH, HEIGHT, 1.14, 0.52, 0.48)
    wash = Image.new("RGBA", (WIDTH, HEIGHT), (12, 20, 24, 110))
    base.alpha_composite(wash)
    base.alpha_composite(vignette_overlay())

    draw = ImageDraw.Draw(base)
    draw_pill(
        draw,
        "DELHI SKIN, HAIR & AESTHETIC CARE",
        34,
        58,
        (255, 255, 255, 208),
        BRAND + (255,),
        outline=(255, 255, 255, 148),
    )

    logo_img = make_circle_logo(logo, 130)
    logo_alpha = logo_img.getchannel("A").point(lambda px: px * 235 // 255)
    logo_img.putalpha(logo_alpha)
    base.alpha_composite(logo_img, ((WIDTH - 130) // 2, 150))

    title_lines = "Awish Clinic"
    subtitle = "Calm, dermatologist-led care with modern clinic confidence."

    title_y = 360 + int(22 * (1 - reveal))
    add_shadowed_text(
        draw,
        (52, title_y),
        title_lines,
        TITLE_FONT,
        WHITE + (255,),
        shadow=(0, 0, 0, 150),
        shadow_offset=(0, 4),
    )

    subtitle_lines = "\n".join(textwrap.wrap(subtitle, width=26))
    draw.multiline_text(
        (52, 520 + int(14 * (1 - reveal))),
        subtitle_lines,
        font=SUBTITLE_FONT,
        fill=(255, 255, 255, 224),
        spacing=8,
    )

    tag_panel = make_panel(WIDTH - 64, 170, 34, (255, 255, 255, 54))
    base.alpha_composite(tag_panel, (32, HEIGHT - 272))
    tag_draw = ImageDraw.Draw(base)
    tag_draw.text((62, HEIGHT - 236), "Skin  |  Hair  |  Aesthetic  |  Weight", font=SMALL_FONT, fill=WHITE + (235,))
    tag_draw.text(
        (62, HEIGHT - 188),
        "Premium presentation with practical, honest guidance.",
        font=SMALL_FONT,
        fill=(255, 255, 255, 205),
    )

    fade = clamp01(progress / 0.18)
    if progress > 0.88:
        fade = clamp01((1 - progress) / 0.12)
    if fade < 1:
        veil = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, int((1 - fade) * 255)))
        base.alpha_composite(veil)
    return base


def make_clip_frame(reader: imageio.Reader, logo: Image.Image, clip: dict[str, object], t: float) -> Image.Image:
    duration = float(clip["duration"])
    start = float(clip["source_start"])
    end = float(clip["source_end"])
    progress = clamp01(t / duration)
    source_t = start + (end - start) * progress
    zoom_from, zoom_to = clip.get("zoom", (1.02, 1.08))
    zoom = float(zoom_from) + (float(zoom_to) - float(zoom_from)) * ease_in_out(progress)
    focus_x = float(clip.get("focus_x", 0.5))

    frame = load_frame(reader, source_t)
    base = cover_focus(frame, WIDTH, HEIGHT, zoom, focus_x, 0.5)
    base.alpha_composite(vignette_overlay())
    base.alpha_composite(Image.new("RGBA", (WIDTH, HEIGHT), (6, 14, 18, 44)))

    draw = ImageDraw.Draw(base)
    draw_pill(
        draw,
        "AWISH CLINIC",
        28,
        34,
        (255, 255, 255, 186),
        BRAND + (255,),
        outline=(255, 255, 255, 128),
    )

    logo_img = make_circle_logo(logo, 88)
    logo_img.putalpha(logo_img.getchannel("A").point(lambda px: px * 225 // 255))
    base.alpha_composite(logo_img, (WIDTH - 116, 26))

    card = make_panel(WIDTH - 48, 280, 34, (8, 14, 18, 164))
    base.alpha_composite(card, (24, HEIGHT - 332))

    title = str(clip["title"])
    subtitle = str(clip["subtitle"])
    title_lines = wrap_text(draw, title, TITLE_FONT, WIDTH - 112)
    subtitle_lines = wrap_text(draw, subtitle, SUBTITLE_FONT, WIDTH - 112)

    text_progress = clamp01(progress / 0.22)
    if progress > 0.84:
        text_progress = clamp01((1 - progress) / 0.16)
    slide = int(28 * (1 - ease_in_out(text_progress)))
    opacity = int(255 * text_progress)

    add_shadowed_text(
        draw,
        (48, HEIGHT - 300 + slide),
        "\n".join(title_lines),
        TITLE_FONT,
        (255, 255, 255, opacity),
        shadow=(0, 0, 0, int(opacity * 0.55)),
        shadow_offset=(0, 3),
        spacing=8,
    )

    draw.multiline_text(
        (48, HEIGHT - 176 + slide),
        "\n".join(subtitle_lines),
        font=SUBTITLE_FONT,
        fill=(255, 255, 255, int(opacity * 0.9)),
        spacing=8,
    )

    draw.text(
        (48, HEIGHT - 88),
        "Delhi's modern skin, hair and aesthetic clinic",
        font=SMALL_FONT,
        fill=(255, 255, 255, 176),
    )

    return base


def make_outro_frame(entrance: Image.Image, logo: Image.Image, t: float, duration: float) -> Image.Image:
    progress = clamp01(t / duration)
    base = cover_focus(entrance.filter(ImageFilter.GaussianBlur(14)), WIDTH, HEIGHT, 1.18, 0.5, 0.5)
    wash = Image.new("RGBA", (WIDTH, HEIGHT), BRAND + (92,))
    base.alpha_composite(wash)
    base.alpha_composite(vignette_overlay())

    card = make_panel(WIDTH - 64, 520, 40, (255, 255, 255, 225))
    base.alpha_composite(card, (32, 362))
    draw = ImageDraw.Draw(base)

    logo_big = make_circle_logo(logo, 136)
    base.alpha_composite(logo_big, ((WIDTH - 136) // 2, 404))

    draw_pill(
        draw,
        "BOOK CONSULTATION",
        192,
        572,
        ACCENT + (255,),
        WHITE + (255,),
    )
    draw.text((126, 656), "Awish Clinic", font=TITLE_FONT, fill=TEXT + (255,))
    draw.multiline_text(
        (88, 748),
        "Skin, hair, aesthetic and\nweight care with calm,\nclear coordination.",
        font=SUBTITLE_FONT,
        fill=BRAND + (255,),
        align="center",
        spacing=8,
    )

    button = make_panel(336, 72, 999, ACCENT + (255,))
    base.alpha_composite(button, ((WIDTH - 336) // 2, 972))
    button_draw = ImageDraw.Draw(base)
    tw, th = text_size(button_draw, "Awish Clinic | Delhi", BUTTON_FONT)
    button_draw.text(((WIDTH - tw) // 2, 996 - th // 2), "Awish Clinic | Delhi", font=BUTTON_FONT, fill=WHITE + (255,))

    fade = clamp01(progress / 0.18)
    if progress > 0.88:
        fade = clamp01((1 - progress) / 0.12)
    if fade < 1:
        veil = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, int((1 - fade) * 255)))
        base.alpha_composite(veil)
    return base


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
            "zoom": (1.04, 1.11),
            "focus_x": 0.52,
        },
        {
            "source_start": 3.2,
            "source_end": 5.2,
            "duration": 2.6,
            "title": "Advanced Treatments",
            "subtitle": "Modern care delivered in a calm clinical setting.",
            "zoom": (1.03, 1.1),
            "focus_x": 0.62,
        },
        {
            "source_start": 9.6,
            "source_end": 10.8,
            "duration": 2.0,
            "title": "Expert Assessment",
            "subtitle": "Every journey begins with understanding your concern.",
            "zoom": (1.03, 1.09),
            "focus_x": 0.46,
        },
        {
            "source_start": 11.2,
            "source_end": 12.8,
            "duration": 2.2,
            "title": "Skin and Hair Care",
            "subtitle": "Glow, scars, anti-ageing, laser and treatment-led sessions.",
            "zoom": (1.04, 1.1),
            "focus_x": 0.56,
        },
        {
            "source_start": 13.6,
            "source_end": 16.0,
            "duration": 2.6,
            "title": "Technology-Led Care",
            "subtitle": "Professional equipment with a premium yet approachable feel.",
            "zoom": (1.06, 1.14),
            "focus_x": 0.36,
        },
        {
            "source_start": 17.2,
            "source_end": 18.8,
            "duration": 2.0,
            "title": "Comfort-Focused Sessions",
            "subtitle": "Clean, calm treatment moments designed around confidence.",
            "zoom": (1.03, 1.09),
            "focus_x": 0.55,
        },
        {
            "source_start": 27.2,
            "source_end": 31.0,
            "duration": 3.0,
            "title": "Natural-Looking Confidence",
            "subtitle": "Results designed to feel refined, warm and approachable.",
            "zoom": (1.05, 1.12),
            "focus_x": 0.5,
        },
    ]

    intro_duration = 2.4
    outro_duration = 3.0

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
            if not poster_saved and i >= intro_frames // 2:
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
