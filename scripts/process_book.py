from __future__ import annotations

import argparse
import json
import re
import subprocess
from pathlib import Path

import numpy as np
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
PDF = Path(r"C:\Users\mosta\Downloads\98.10.20   ganjkoola  rahli 366p bw opti.pdf")
POPPLER = Path(r"C:\Users\mosta\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\poppler\Library\bin\pdftoppm.exe")
TESSERACT = Path(r"C:\Program Files\Tesseract-OCR\tesseract.exe")
TESSDATA = ROOT / "tmp" / "tessdata"
RENDER_DIR = ROOT / "tmp" / "book-work" / "pages"
OCR_DIR = ROOT / "assets" / "book" / "ocr"
PHOTO_DIR = ROOT / "assets" / "book" / "photos"


PERSIAN_LETTER_RE = re.compile(r"[\u0600-\u06ff]")


def run(cmd: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        cmd,
        cwd=ROOT,
        text=True,
        encoding="utf-8",
        errors="replace",
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        check=True,
    )


def render_page(page: int, dpi: int) -> Path:
    RENDER_DIR.mkdir(parents=True, exist_ok=True)
    output_prefix = RENDER_DIR / f"page-{page:03d}"
    expected = RENDER_DIR / f"page-{page:03d}-{page:03d}.png"
    if expected.exists():
        return expected
    cmd = [
        str(POPPLER),
        "-f",
        str(page),
        "-l",
        str(page),
        "-png",
        "-r",
        str(dpi),
        str(PDF),
        str(output_prefix),
    ]
    run(cmd)
    if not expected.exists():
        matches = sorted(RENDER_DIR.glob(f"page-{page:03d}-*.png"))
        if matches:
            matches[0].rename(expected)
    return expected


def clean_ocr_text(text: str) -> str:
    cleaned: list[str] = []
    for raw_line in text.splitlines():
        line = re.sub(r"\s+", " ", raw_line).strip()
        if not line:
            continue
        persian_count = len(PERSIAN_LETTER_RE.findall(line))
        if len(line) > 8 and persian_count < max(2, len(line) * 0.22):
            continue
        if re.fullmatch(r"[\d\s۰-۹٠-٩.,:؛،\-ـЇ]+", line):
            continue
        cleaned.append(line)
    return "\n".join(cleaned)


def ocr_page(image_path: Path, page: int) -> dict:
    OCR_DIR.mkdir(parents=True, exist_ok=True)
    raw_path = OCR_DIR / f"page-{page:03d}.txt"
    clean_path = OCR_DIR / f"page-{page:03d}.clean.txt"
    if raw_path.exists() and clean_path.exists():
        return {"page": page, "text": raw_path.read_text(encoding="utf-8"), "cleanText": clean_path.read_text(encoding="utf-8")}
    cmd = [
        str(TESSERACT),
        str(image_path),
        "stdout",
        "--tessdata-dir",
        str(TESSDATA),
        "-l",
        "fas",
        "--psm",
        "6",
    ]
    result = run(cmd)
    text = result.stdout
    clean = clean_ocr_text(text)
    raw_path.write_text(text, encoding="utf-8")
    clean_path.write_text(clean, encoding="utf-8")
    return {"page": page, "text": text, "cleanText": clean}


def dense_segments(values: np.ndarray, threshold: float, min_length: int) -> list[tuple[int, int]]:
    smooth = np.convolve(values, np.ones(15) / 15, mode="same")
    segments: list[tuple[int, int]] = []
    active = False
    start = 0
    for idx, value in enumerate(smooth):
        if value > threshold and not active:
            start = idx
            active = True
        if (value <= threshold or idx == len(smooth) - 1) and active:
            end = idx
            active = False
            if end - start >= min_length:
                segments.append((start, end))
    return segments


def detect_visual_blocks(image_path: Path, page: int) -> list[dict]:
    PHOTO_DIR.mkdir(parents=True, exist_ok=True)
    im = Image.open(image_path).convert("L")
    arr = np.array(im)
    mask = arr < 225
    row_density = mask.mean(axis=1)
    blocks: list[dict] = []
    for y1, y2 in dense_segments(row_density, threshold=0.12, min_length=80):
        sub = mask[y1:y2]
        col_density = sub.mean(axis=0)
        for x1, x2 in dense_segments(col_density, threshold=0.08, min_length=180):
            width = x2 - x1
            height = y2 - y1
            area = width * height
            density = float(sub[:, x1:x2].mean())
            if area < 40000 or density < 0.28:
                continue
            margin = 10
            crop_box = (
                max(0, x1 - margin),
                max(0, y1 - margin),
                min(im.width, x2 + margin),
                min(im.height, y2 + margin),
            )
            crop = im.crop(crop_box)
            filename = f"page-{page:03d}-visual-{len(blocks) + 1:02d}.png"
            out = PHOTO_DIR / filename
            if not out.exists():
                crop.save(out)
            blocks.append(
                {
                    "page": page,
                    "path": f"assets/book/photos/{filename}",
                    "box": list(crop_box),
                    "width": crop.width,
                    "height": crop.height,
                    "density": round(density, 4),
                }
            )
    return blocks


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--start", type=int, default=1)
    parser.add_argument("--end", type=int, default=366)
    parser.add_argument("--dpi", type=int, default=180)
    args = parser.parse_args()

    OCR_DIR.mkdir(parents=True, exist_ok=True)
    PHOTO_DIR.mkdir(parents=True, exist_ok=True)

    pages: list[dict] = []
    visuals: list[dict] = []
    for page in range(args.start, args.end + 1):
        image = render_page(page, args.dpi)
        page_ocr = ocr_page(image, page)
        page_visuals = detect_visual_blocks(image, page)
        pages.append({"page": page, "cleanText": page_ocr["cleanText"]})
        visuals.extend(page_visuals)
        print(f"processed page {page}: text={len(page_ocr['cleanText'])} visuals={len(page_visuals)}", flush=True)

    chunk = {"start": args.start, "end": args.end, "pages": pages, "visuals": visuals}
    (OCR_DIR / f"chunk-{args.start:03d}-{args.end:03d}.json").write_text(json.dumps(chunk, ensure_ascii=False, indent=2), encoding="utf-8")


if __name__ == "__main__":
    main()
