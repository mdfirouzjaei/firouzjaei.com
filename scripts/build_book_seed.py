from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OCR_DIR = ROOT / "assets" / "book" / "ocr"
PHOTO_DIR = ROOT / "assets" / "book" / "photos"
OUT_PATH = ROOT / "assets" / "book" / "book-data.js"


def fa_digits(value: int | str) -> str:
    table = str.maketrans("0123456789", "۰۱۲۳۴۵۶۷۸۹")
    return str(value).translate(table)


def page_text(page: int) -> str:
    path = OCR_DIR / f"page-{page:03d}.clean.txt"
    return path.read_text(encoding="utf-8") if path.exists() else ""


def excerpt(page: int, limit: int = 520) -> str:
    text = re.sub(r"\s+", " ", page_text(page)).strip()
    if len(text) <= limit:
        return text
    cut = text[:limit].rsplit(" ", 1)[0]
    return f"{cut}..."


class SeedBuilder:
    def __init__(self) -> None:
        self.people: list[dict] = []
        self.id_by_name: dict[str, str] = {}

    def add(
        self,
        pid: str,
        name: str,
        *,
        gender: str = "unknown",
        generation: int = 0,
        slot: int = 0,
        parents: list[str] | None = None,
        spouses: list[str] | None = None,
        birth: str = "",
        death: str = "",
        story: str = "",
        photo: str = "",
        media: list[dict] | None = None,
    ) -> str:
        if pid in {person["id"] for person in self.people}:
            raise ValueError(f"duplicate id: {pid}")
        person = {
            "id": pid,
            "name": name,
            "gender": gender,
            "birth": birth,
            "death": death,
            "generation": generation,
            "slot": slot,
            "parentIds": parents or [],
            "spouseIds": spouses or [],
            "story": story,
            "photos": [],
            "media": media or [],
        }
        if photo:
            person["photo"] = photo
        self.people.append(person)
        self.id_by_name[name] = pid
        return pid

    def marry(self, a: str, b: str) -> None:
        pa = self.by_id(a)
        pb = self.by_id(b)
        if b not in pa["spouseIds"]:
            pa["spouseIds"].append(b)
        if a not in pb["spouseIds"]:
            pb["spouseIds"].append(a)

    def by_id(self, pid: str) -> dict:
        for person in self.people:
            if person["id"] == pid:
                return person
        raise KeyError(pid)


def source_note(page: int, note: str = "") -> str:
    base = f"برگرفته از کتاب «از بالاگنجکلا تا پایین‌شالینگچال»، صفحه {fa_digits(page)}."
    return f"{base} {note}".strip()


def visual(path: str, title: str, caption: str = "") -> dict:
    return {
        "id": Path(path).stem,
        "title": title,
        "caption": caption,
        "src": path.replace("\\", "/"),
        "type": "image",
    }


def build_people() -> list[dict]:
    b = SeedBuilder()

    # Chapter 1: Mehdi-Soltan branch
    b.add(
        "book-mehdi-soltan",
        "مهدی‌سلطان",
        gender="male",
        death="۱۱۹۵ شمسی",
        generation=0,
        slot=1,
        story=source_note(
            31,
            "فرزند حاج تقی؛ کتاب برای او همسری به نام خانم حوری و شش فرزند یاد می‌کند.",
        ),
    )
    b.add("book-hoori", "خانم حوری", gender="female", generation=0, slot=2, story=source_note(31, "همسر مهدی‌سلطان."))
    b.marry("book-mehdi-soltan", "book-hoori")
    mehdi_parents = ["book-mehdi-soltan", "book-hoori"]
    for idx, (pid, name, gender) in enumerate(
        [
            ("book-hosein-jan", "کربلایی حسین‌جان", "male"),
            ("book-hoseinali", "حسینعلی", "male"),
            ("book-reza-mehdi", "رضا", "male"),
            ("book-malek", "ملک", "female"),
            ("book-bani-mehdi", "بَنی", "female"),
            ("book-salimeh-mehdi", "سلیمه", "female"),
        ],
        start=0,
    ):
        b.add(pid, name, gender=gender, generation=1, slot=idx, parents=mehdi_parents, story=source_note(31))

    b.add("book-sonobar", "صنمبر آرایی", gender="female", generation=1, slot=1, story=source_note(32, "همسر اول کربلایی حسین‌جان."))
    b.add("book-khavar", "خاور تنکابنی", gender="female", generation=1, slot=2, story=source_note(32, "همسر دوم کربلایی حسین‌جان."))
    b.marry("book-hosein-jan", "book-sonobar")
    b.marry("book-hosein-jan", "book-khavar")
    sonobar_children = [
        ("book-mohammad-agha", "حاج محمدآقا", "male"),
        ("book-abdolrashid", "عبدالرشید", "male"),
        ("book-aliakbar-hoseinjan", "علی‌اکبر", "male"),
        ("book-abbas-hoseinjan", "عباس", "male"),
        ("book-abdollah-hoseinjan", "عبدالله", "male"),
        ("book-kolsoom-hoseinjan", "کلثوم", "female"),
        ("book-khanom-hoseinjan", "خانم", "female"),
        ("book-khatoon-hoseinjan", "خاتون", "female"),
        ("book-nazafarin", "نازآفرین", "female"),
    ]
    for idx, (pid, name, gender) in enumerate(sonobar_children):
        b.add(pid, name, gender=gender, generation=2, slot=idx, parents=["book-hosein-jan", "book-sonobar"], story=source_note(32))
    for idx, (pid, name, gender) in enumerate(
        [("book-gholamali-hoseinjan", "غلامعلی", "male"), ("book-pari-hoseinjan", "پری", "female")],
        start=len(sonobar_children),
    ):
        b.add(pid, name, gender=gender, generation=2, slot=idx, parents=["book-hosein-jan", "book-khavar"], story=source_note(32))

    b.add("book-golin", "گلین‌خانم فیروزیان", gender="female", generation=2, slot=1, story=source_note(33))
    b.marry("book-mohammad-agha", "book-golin")
    for idx, (pid, name, gender) in enumerate(
        [
            ("book-abdolhosein", "عبدالحسین فیروزیان حاجی", "male"),
            ("book-abolhasan", "ابوالحسن فیروزیان حاجی", "male"),
            ("book-mohammad-bagher", "محمدباقر فیروزیان", "male"),
            ("book-ebrahim-firouzian", "ابراهیم فیروزیان حاجی", "male"),
            ("book-naneh-bigom", "ننه‌بیگم فیروزیان حاجی", "female"),
            ("book-hava-bigom", "حوابیگم فیروزیان حاجی", "female"),
            ("book-sedigheh-firouzian", "صدیقه فیروزیان حاجی", "female"),
        ]
    ):
        b.add(pid, name, gender=gender, generation=3, slot=idx, parents=["book-mohammad-agha", "book-golin"], story=source_note(34))

    b.add("book-iran-khanom", "ایران‌خانم فیروزی", gender="female", generation=3, slot=3, story=source_note(51, "همسر محمدباقر فیروزیان."))
    b.by_id("book-mohammad-bagher")["story"] = source_note(51, "اهل فرهنگ و هنر، نوازنده نی محلی، و از خیرین روستای بالاگنجکلا معرفی شده است.")
    b.marry("book-mohammad-bagher", "book-iran-khanom")
    for idx, (pid, name, gender, death) in enumerate(
        [
            ("book-abdollah-firouzian", "عبدالله فیروزیان", "male", ""),
            ("book-nabiollah", "نبی‌الله فیروزیان", "male", ""),
            ("book-habibollah", "حبیب‌الله فیروزیان", "male", ""),
            ("book-rahmatollah", "رحمت‌الله فیروزیان", "male", "در کودکی"),
            ("book-mehdi-firouzian", "مهدی فیروزیان", "male", ""),
            ("book-zeynab-khatoon", "زینب‌خاتون فیروزیان", "female", ""),
            ("book-narges-khatoon", "نرگس‌خاتون فیروزیان", "female", ""),
            ("book-zobeydeh", "زبیده فیروزیان", "female", ""),
            ("book-batool", "بتول فیروزیان", "female", ""),
            ("book-hoorieh", "حوریه فیروزیان", "female", ""),
            ("book-razieh", "راضیه فیروزیان", "female", ""),
        ]
    ):
        b.add(pid, name, gender=gender, death=death, generation=4, slot=idx, parents=["book-mohammad-bagher", "book-iran-khanom"], story=source_note(51))
    b.add("book-marzieh-hajizadeh", "مرضیه حاجی‌زاده", gender="female", generation=4, slot=1, story=source_note(52))
    b.by_id("book-abdollah-firouzian")["story"] = source_note(52, "فرزند ارشد محمدباقر؛ از چهره‌های شاخص آموزش بندپی معرفی شده است.")
    b.by_id("book-mehdi-firouzian")["story"] = source_note(52, "دبیر و خوشنویس دارای مدرک ممتاز خوشنویسی معرفی شده است.")
    b.marry("book-abdollah-firouzian", "book-marzieh-hajizadeh")

    # Chapter 2: Haji Beiglar branch
    b.add("book-haji-beiglar", "حاجی‌بیگلر", gender="male", death="۱۲۰۰ شمسی", generation=0, slot=3, story=source_note(195, "فرزند حاج تقی و ریشه فصل دوم کتاب."))
    b.add("book-haj-naneh", "حاج‌ننه", gender="female", generation=0, slot=4, story=source_note(195, "همسر اول حاجی‌بیگلر."))
    b.add("book-salimeh-vasati", "سلیمه وسطی‌کلایی", gender="female", generation=0, slot=5, story=source_note(195, "همسر دوم حاجی‌بیگلر."))
    b.marry("book-haji-beiglar", "book-haj-naneh")
    b.marry("book-haji-beiglar", "book-salimeh-vasati")
    for idx, (pid, name, gender, death) in enumerate(
        [
            ("book-ahmad-beiglar", "احمد بیگلرنیا", "male", "۱۲۲۵ شمسی"),
            ("book-taghi-beiglar", "تقی بیگلرنیا", "male", "۱۳۳۷ شمسی"),
            ("book-sadegh-beiglar", "صادق بیگلرنیا", "male", ""),
            ("book-hajali-beiglar", "حاج‌علی بیگلرنیا", "male", ""),
            ("book-hajikhanom-beiglar", "حاجی‌خانم بیگلرنیا", "female", "۱۲۲۹ شمسی"),
            ("book-halimeh-beiglar", "حلیمه بیگلرنیا", "female", "۱۳۳۱ شمسی"),
            ("book-jaddeh-beiglar", "جده بیگلرنیا", "female", "۱۲۳۲ شمسی"),
            ("book-naneh-bozorg", "ننه‌بزرگ بیگلرنیا", "female", "۱۲۳۵ شمسی"),
        ]
    ):
        b.add(pid, name, gender=gender, death=death, generation=1, slot=8 + idx, parents=["book-haji-beiglar", "book-salimeh-vasati"], story=source_note(195 if idx < 5 else 196))
    b.add("book-ghanbar-dadashi", "قنبر داداشی", gender="male", generation=1, slot=16, story=source_note(196))
    b.marry("book-naneh-bozorg", "book-ghanbar-dadashi")
    for idx, (pid, name, gender) in enumerate(
        [
            ("book-aghadash-dadashi", "آقاداش داداشی", "male"),
            ("book-hajbarar-dadashi", "حاجی‌برار داداشی", "male"),
            ("book-hajeshaq-dadashi", "حاج‌اسحاق داداشی", "male"),
            ("book-hajahmad-dadashi", "حاج‌احمد داداشی", "male"),
            ("book-hajar-khatoon", "هاجرخاتون داداشی", "female"),
            ("book-hajmoharram", "حاجی‌محرم داداشی", "male"),
            ("book-mashhadi-naneh", "مشهدی‌ننه داداشی", "female"),
        ]
    ):
        b.add(pid, name, gender=gender, generation=2, slot=8 + idx, parents=["book-naneh-bozorg", "book-ghanbar-dadashi"], story=source_note(196))

    # Chapter 3: Alikhan branch
    b.add("book-alikhan", "علیخان", gender="male", generation=0, slot=7, story=source_note(303, "فرزند حاج تقی و ریشه فصل سوم کتاب."))
    b.add("book-ameneh-gholamali", "آمنه غلامعلی‌تبار", gender="female", generation=0, slot=8, story=source_note(303, "همسر علیخان."))
    b.marry("book-alikhan", "book-ameneh-gholamali")
    for idx, (pid, name, gender) in enumerate(
        [
            ("book-yaghoob-alikhan", "یعقوب علیخان‌زاده", "male"),
            ("book-salman-alikhan", "سلمان علیخان‌زاده", "male"),
            ("book-kolsoom-alikhan", "کلثوم علیخان‌زاده", "female"),
            ("book-leila-alikhan", "لیلا علیخان‌زاده", "female"),
        ]
    ):
        b.add(pid, name, gender=gender, generation=1, slot=15 + idx, parents=["book-alikhan", "book-ameneh-gholamali"], story=source_note(303))
    b.marry("book-salman-alikhan", "book-bani-mehdi")
    b.add("book-nistar", "نیستر", gender="female", generation=1, slot=17, story=source_note(303, "از همسران یعقوب."))
    b.add("book-sonmir", "صنمیر", gender="female", generation=1, slot=18, story=source_note(303, "از همسران یعقوب."))
    b.marry("book-yaghoob-alikhan", "book-nistar")
    b.marry("book-yaghoob-alikhan", "book-sonmir")
    b.marry("book-yaghoob-alikhan", "book-bani-mehdi")
    for idx, (pid, name, gender) in enumerate(
        [
            ("book-abdolrahim-alikhan", "عبدالرحیم علیخان‌زاده", "male"),
            ("book-hajagha-alikhan", "حاج‌آقا علیخان‌زاده", "male"),
            ("book-aliagha-alikhan", "علی‌آقا علیخان‌زاده", "male"),
        ]
    ):
        b.add(pid, name, gender=gender, generation=2, slot=15 + idx, parents=["book-yaghoob-alikhan", "book-nistar"], story=source_note(303))

    # Chapter 4: Tahmasb branch
    b.add("book-tahmasb", "طهماسب", gender="male", generation=0, slot=10, story=source_note(327, "فرزند حاج تقی و ریشه فصل چهارم کتاب."))
    for idx, (pid, name) in enumerate([("book-yousef-tahmasb", "یوسف طهماسب‌نژاد"), ("book-hasan-tahmasb", "حسن طهماسب‌نژاد")]):
        b.add(pid, name, gender="male", generation=1, slot=21 + idx, parents=["book-tahmasb"], story=source_note(327))
    b.add("book-bani-akbarzadeh", "بَنی اکبرزاده‌تهمتن", gender="female", generation=1, slot=22, story=source_note(327, "همسر اول یوسف."))
    b.add("book-khadijeh-pourkia", "خدیجه پورکیا", gender="female", generation=1, slot=23, story=source_note(327, "همسر دوم یوسف."))
    b.marry("book-yousef-tahmasb", "book-bani-akbarzadeh")
    b.marry("book-yousef-tahmasb", "book-khadijeh-pourkia")
    for idx, (pid, name, gender) in enumerate(
        [
            ("book-nourollah-tahmasb", "نورالله طهماسب‌نژاد", "male"),
            ("book-ghasem-tahmasb", "قاسم طهماسب‌نژاد", "male"),
            ("book-khanom-nosrat", "خانم‌نصرت طهماسب‌نژاد", "female"),
        ]
    ):
        b.add(pid, name, gender=gender, generation=2, slot=21 + idx, parents=["book-yousef-tahmasb", "book-bani-akbarzadeh"], story=source_note(327))
    for idx, (pid, name, gender) in enumerate(
        [
            ("book-gholi-yousefzadeh", "قلی یوسفی‌زاده", "male"),
            ("book-nemat-tahmasb", "نعمت طهماسب‌نژاد", "male"),
            ("book-karbalai-agha", "کربلایی‌آقا طهماسب‌نژاد", "male"),
            ("book-shokrollah", "شکرالله طهماسب‌نژاد", "male"),
            ("book-karbalai-khanom", "کربلایی‌خانم طهماسب‌نژاد", "female"),
            ("book-rababeh", "ربابه طهماسب‌نژاد", "female"),
        ],
        start=3,
    ):
        b.add(pid, name, gender=gender, generation=2, slot=21 + idx, parents=["book-yousef-tahmasb", "book-khadijeh-pourkia"], story=source_note(327))
    b.add("book-mashhadi-naneh-dadashi", "مشهدی‌ننه داداشی", gender="female", generation=2, slot=27, story=source_note(336, "همسر قلی یوسفی‌زاده."))
    b.marry("book-gholi-yousefzadeh", "book-mashhadi-naneh-dadashi")
    for idx, (pid, name, gender, death) in enumerate(
        [
            ("book-nourali-yousefzadeh", "نورعلی یوسفی‌زاده", "male", "۱۳۷۳ شمسی"),
            ("book-alimardan", "علی‌مردان یوسفی‌زاده", "male", ""),
            ("book-alibarar-yousefzadeh", "علی‌برار یوسفی‌زاده", "male", ""),
            ("book-rahman-yousefzadeh", "رحمان یوسفی‌زاده", "male", "در جوانی"),
            ("book-nireh-yousefzadeh", "نیره یوسفی‌زاده", "female", ""),
            ("book-navabeh-yousefzadeh", "نوابه یوسفی‌زاده", "female", ""),
            ("book-marzieh-yousefzadeh", "مرضیه یوسفی‌زاده", "female", ""),
        ]
    ):
        b.add(pid, name, gender=gender, death=death, generation=3, slot=21 + idx, parents=["book-gholi-yousefzadeh", "book-mashhadi-naneh-dadashi"], story=source_note(336))
    b.add("book-maryam-alizadeh", "مریم علیزاده", gender="female", generation=3, slot=22, story=source_note(336, "مشهور به باجی؛ همسر نورعلی."))
    b.marry("book-nourali-yousefzadeh", "book-maryam-alizadeh")
    for idx, (pid, name, gender) in enumerate(
        [
            ("book-gholi-nourali", "قلی یوسفی‌زاده", "male"),
            ("book-ebrahim-yousefzadeh", "ابراهیم یوسفی‌زاده", "male"),
            ("book-kazem-yousefzadeh", "کاظم یوسفی‌زاده", "male"),
            ("book-naneh-yousefzadeh", "ننه یوسفی‌زاده", "female"),
            ("book-tayyebeh-yousefzadeh", "طیبه یوسفی‌زاده", "female"),
            ("book-fatemeh-yousefzadeh", "فاطمه یوسفی‌زاده", "female"),
            ("book-hourieh-yousefzadeh", "حوریه یوسفی‌زاده", "female"),
            ("book-sakineh-yousefzadeh", "سکینه یوسفی‌زاده", "female"),
        ]
    ):
        b.add(pid, name, gender=gender, generation=4, slot=21 + idx, parents=["book-nourali-yousefzadeh", "book-maryam-alizadeh"], story=source_note(336))

    return b.people


def build_gallery() -> list[dict]:
    return []


def build_articles() -> list[dict]:
    return [
        {
            "id": "book-article-preface",
            "title": "کتاب خاندان تقی فیروزجایی و روش گردآوری آن",
            "author": "علی فیروزیان حاجی و حسین بیگلرنیا",
            "date": "سال ۱۵۳۲ تبری",
            "sortDate": "2019-03-21",
            "body": [
                "این نوشته بر پایه پیشگفتار کتاب تنظیم شده است. کتاب، شجره نوادگان پسری و دختری تقی فیروزجایی، فرزند آقا کاظم و از نوادگان آقا داداش، را از حدود سال ۱۰۴۸ شمسی تا روزگار معاصر پیگیری می‌کند.",
                "در پیشگفتار توضیح داده شده که گردآوری داده‌ها با مراجعه حضوری، مصاحبه با بزرگان فامیل و گردآوری اسناد و تصویرها انجام شده است. نویسندگان همچنین یادآور شده‌اند که برخی کاستی‌ها به دلیل کمبود سند یا تصویر در چاپ‌های بعدی با همکاری خانواده‌ها قابل تکمیل است.",
            ],
            "figures": [],
            "references": ["کتاب «از بالاگنجکلا تا پایین‌شالینگچال»، پیشگفتار، صفحه ۹.", "فهرست و شناسنامه کتاب، صفحه‌های ۳ تا ۷."],
        },
        {
            "id": "book-article-branches",
            "title": "چهار شاخه اصلی فرزندان حاج تقی",
            "author": "گروه گردآوری وب‌سایت",
            "date": "سال ۱۵۳۲ تبری",
            "sortDate": "2019-03-22",
            "body": [
                "ساختار کتاب بر چهار شاخه اصلی بنا شده است: خاندان مهدی‌سلطان، خاندان حاجی‌بیگلر، خاندان علیخان و خاندان طهماسب. هر یک از این شاخه‌ها به عنوان فرزند یا نسل مستقیم حاج تقی معرفی شده‌اند و فصل‌های مستقل کتاب را شکل می‌دهند.",
                "در نسخه فعلی سایت، همین چهار شاخه به عنوان ریشه‌های قابل باز و بسته شدن در درخت خانوادگی قرار گرفته‌اند تا شاخه‌های پایین‌تر بدون شلوغی نمایش داده شوند. هر کارت با شماره صفحه منبع همراه شده تا مدیران بتوانند در مرحله‌های بعدی نام‌ها، نسبت‌ها و تصویرها را دقیق‌تر بازبینی کنند.",
            ],
            "figures": [],
            "references": ["کتاب، صفحه ۳۱: آغاز خاندان مهدی‌سلطان.", "کتاب، صفحه ۱۹۵: آغاز خاندان حاجی‌بیگلر.", "کتاب، صفحه ۳۰۳: آغاز خاندان علیخان.", "کتاب، صفحه ۳۲۷: آغاز خاندان طهماسب."],
        },
        {
            "id": "book-article-mohammad-bagher",
            "title": "محمدباقر فیروزیان؛ فرهنگ، نی محلی و گذشت",
            "author": "برگرفته از متن کتاب",
            "date": "سال ۱۵۳۲ تبری",
            "sortDate": "2019-03-23",
            "body": [
                "در فصل خاندان مهدی‌سلطان، محمدباقر فیروزیان فرزند حاج‌محمدآقا و همسرش ایران‌خانم فیروزی معرفی می‌شوند. کتاب او را فردی خوش‌ذوق، اهل فرهنگ و هنر و آشنا با نغمه‌های محلی و فرهنگ عامه منطقه توصیف می‌کند.",
                "یکی از روایت‌های برجسته این بخش، گذشت او پس از درگذشت فرزندش رحمت‌الله در حادثه‌ای تلخ است. متن کتاب توضیح می‌دهد که محمدباقر با وجود اندوه، برای آزادی راننده حادثه‌دیده رضایت‌نامه نوشت و همراه فرزندش عبدالله به پاسگاه مراجعه کرد.",
                "کتاب همچنین به کار خیر او در اهدای بخشی از زمین برای بنای حسینیه قدیم روستای بالاگنجکلا اشاره دارد.",
            ],
            "figures": [],
            "references": ["کتاب «از بالاگنجکلا تا پایین‌شالینگچال»، صفحه ۵۱."],
        },
        {
            "id": "book-article-education-art",
            "title": "آموزش و هنر در نسل‌های خاندان",
            "author": "گروه گردآوری وب‌سایت",
            "date": "سال ۱۵۳۲ تبری",
            "sortDate": "2019-03-24",
            "body": [
                "صفحه ۵۲ کتاب، عبدالله فیروزیان را به عنوان فرزند ارشد محمدباقر و از چهره‌های شاخص آموزش بندپی معرفی می‌کند. او پس از تحصیلات دانشگاهی وارد آموزش و پرورش شد و در مسئولیت‌های آموزشی منطقه فعالیت کرد.",
                "در همان صفحه، مهدی فیروزیان به عنوان دبیر و خوشنویس معرفی شده و به مدرک ممتاز خوشنویسی و نمایش آثار او در نمایشگاه‌ها اشاره شده است. این بخش نشان می‌دهد که حافظه خاندان فقط نسب‌نامه نیست؛ بخشی از آن تاریخ آموزش، فرهنگ و هنر منطقه است.",
            ],
            "figures": [],
            "references": ["کتاب، صفحه ۵۲."],
        },
        {
            "id": "book-article-bandpey-places",
            "title": "روستا، حسینیه و نشانه‌های محلی",
            "author": "گروه گردآوری وب‌سایت",
            "date": "سال ۱۵۳۲ تبری",
            "sortDate": "2019-03-25",
            "body": [
                "در بخش‌های پایانی کتاب، تصویرها و روایت‌هایی از بناها، حسینیه، غسلخانه، درخت کهنسال و نشانه‌های محلی بالاگنجکلا و پایین‌شالینگچال آمده است. این تصویرها به تاریخ خانوادگی بافت مکانی می‌دهند و نشان می‌دهند زندگی خاندان با روستا، وقف، آموزش و آیین‌های محلی پیوند داشته است.",
                "تصویرهای استخراج‌شده از کتاب فقط در پوشه assets پروژه نگهداری می‌شوند تا بعدها، پس از بازبینی خانوادگی، بتوان برای هر تصویر شرح دقیق، نام افراد و پیوند به کارت‌های خانوادگی را آماده کرد.",
            ],
            "figures": [],
            "references": ["کتاب، صفحه ۳۲۸ و تصویرهای استخراج‌شده از بخش پایانی کتاب."],
        },
    ]


def build_data() -> dict:
    gallery = build_gallery()
    return {
        "version": "demo-scenarios-2026-07-05",
        "source": {
            "title": "از بالاگنجکلا تا پایین‌شالینگچال (خاندان تقی فیروزجایی)",
            "authors": ["علی فیروزیان حاجی", "حسین بیگلرنیا"],
            "editor": "عیسی کیانی حاجی",
            "printYear": "۱۳۹۸",
            "pages": 366,
            "ocrNote": "متن و روابط از OCR فارسی و بازخوانی دستی چند صفحه کلیدی استخراج شده‌اند و نیازمند بازبینی خانوادگی هستند.",
        },
        "people": [],
        "gallery": gallery,
        "history": "این بخش از این نسخه به بعد بر پایه کتاب خانوادگی «از بالاگنجکلا تا پایین‌شالینگچال» تکمیل شده است. مقاله‌ها خلاصه و بازنویسی‌شده‌اند و برای هر مورد صفحه‌های منبع ذکر شده است.",
        "historyArticles": build_articles(),
    }


def main() -> None:
    data = build_data()
    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    payload = json.dumps(data, ensure_ascii=False, indent=2)
    OUT_PATH.write_text(
        "window.FIROUZJAEI_BOOK_DATA = " + payload + ";\n",
        encoding="utf-8",
    )
    print(f"wrote {OUT_PATH.relative_to(ROOT)}")
    print(f"people: {len(data['people'])}")
    print(f"gallery items: {len(data['gallery'])}")
    print(f"articles: {len(data['historyArticles'])}")


if __name__ == "__main__":
    main()

