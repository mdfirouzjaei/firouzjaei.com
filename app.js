const OWNER_EMAIL = "mdfirouzjaei@gmail.com";
const DEFAULT_OWNER_PASSWORD = "April18!";
const LEGACY_OWNER_PASSWORDS = ["owner-demo-1403"];
const STORAGE_KEY = "firouzjaei-family-site-state-v1";
const SESSION_KEY = "firouzjaei-family-site-session-v1";
const BOOK_DATA = window.FIROUZJAEI_BOOK_DATA || null;
const BOOK_SEED_VERSION = BOOK_DATA?.version || "synthetic-seed-v1";
const BOOK_PHOTO_ASSET_PATH = "assets/book/photos/";
const MAX_LOCAL_UPLOAD_BYTES = 2 * 1024 * 1024;
const VALID_ROUTES = ["home", "tree", "gallery", "history", "article"];
const TREE_CANVAS_WIDTH = 1420;
const TREE_CANVAS_HEIGHT = 760;
const MAX_TREE_SLOT = 48;
const NODE_BASE_X = 150;
const NODE_BASE_Y = 120;
const NODE_X_GAP = 190;
const NODE_Y_GAP = 250;
const GENDER_LABELS = {
  male: "مرد",
  female: "زن",
  unknown: "نامشخص",
};

const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

const colors = [
  ["#24554c", "#dcebe6"],
  ["#8a2f45", "#f8e4ea"],
  ["#315d7e", "#e2edf4"],
  ["#b98528", "#f7eddc"],
  ["#4d5874", "#e8ebf2"],
];

const sampleState = {
  admins: [
    {
      email: OWNER_EMAIL,
      password: DEFAULT_OWNER_PASSWORD,
      role: "owner",
    },
  ],
  subscribers: [],
  people: [
    {
      id: "p1",
      name: "بزرگ خاندان",
      birth: "۱۲۷۰",
      death: "۱۳۴۸",
      generation: 0,
      slot: 4,
      spouseIds: ["p2"],
      parentIds: [],
      story: "این فرد نمونه برای نمایش ریشه درخت خانوادگی ساخته شده است. در نسخه واقعی می توانید نام، تاریخ ها، زندگی نامه و عکس ها را جایگزین کنید.",
      photos: [],
    },
    {
      id: "p2",
      name: "بانوی خاندان",
      birth: "۱۲۷۸",
      death: "۱۳۵۵",
      generation: 0,
      slot: 5,
      spouseIds: ["p1"],
      parentIds: [],
      story: "این پروفایل نمونه نشان می دهد که همسران با خط و نشان پیوند همسری نمایش داده می شوند.",
      photos: [],
    },
    {
      id: "p3",
      name: "فرزند اول",
      birth: "۱۳۰۲",
      death: "",
      generation: 1,
      slot: 2,
      spouseIds: ["p6"],
      parentIds: ["p1", "p2"],
      story: "در این بخش می توان روایت زندگی، محل زندگی، خاطرات و عکس های بیشتر را ثبت کرد.",
      photos: [],
    },
    {
      id: "p4",
      name: "فرزند دوم",
      birth: "۱۳۰۸",
      death: "۱۳۸۸",
      generation: 1,
      slot: 5,
      spouseIds: ["p7"],
      parentIds: ["p1", "p2"],
      story: "این داده ها کاملا ساختگی هستند و فقط برای طراحی اولیه استفاده شده اند.",
      photos: [],
    },
    {
      id: "p5",
      name: "فرزند سوم",
      birth: "۱۳۱۴",
      death: "",
      generation: 1,
      slot: 8,
      spouseIds: [],
      parentIds: ["p1", "p2"],
      story: "هر فرد می تواند بدون همسر یا فرزند هم در درخت بماند.",
      photos: [],
    },
    {
      id: "p6",
      name: "همسر فرزند اول",
      birth: "۱۳۰۵",
      death: "",
      generation: 1,
      slot: 3,
      spouseIds: ["p3"],
      parentIds: [],
      story: "برای افزودن همسر، در پنل مدیران فرد را انتخاب و همسر را تعیین کنید.",
      photos: [],
    },
    {
      id: "p7",
      name: "همسر فرزند دوم",
      birth: "۱۳۱۲",
      death: "",
      generation: 1,
      slot: 6,
      spouseIds: ["p4"],
      parentIds: [],
      story: "درخت با جایگاه نسل و جایگاه افقی چیده می شود تا از شلوغی و هم پوشانی جلوگیری شود.",
      photos: [],
    },
    {
      id: "p8",
      name: "نوه اول",
      birth: "۱۳۳۲",
      death: "",
      generation: 2,
      slot: 1,
      spouseIds: [],
      parentIds: ["p3", "p6"],
      story: "این کارت نمونه برای نسل سوم است.",
      photos: [],
    },
    {
      id: "p9",
      name: "نوه دوم",
      birth: "۱۳۳۹",
      death: "",
      generation: 2,
      slot: 3,
      spouseIds: ["p12"],
      parentIds: ["p3", "p6"],
      story: "با کلیک روی هر فرد، پنجره جزئیات باز می شود.",
      photos: [],
    },
    {
      id: "p10",
      name: "نوه سوم",
      birth: "۱۳۴۴",
      death: "",
      generation: 2,
      slot: 5,
      spouseIds: [],
      parentIds: ["p4", "p7"],
      story: "در نسخه واقعی، عکس اصلی می تواند نشانی یک تصویر در مخزن یا فضای ابری باشد.",
      photos: [],
    },
    {
      id: "p11",
      name: "نوه چهارم",
      birth: "۱۳۴۸",
      death: "",
      generation: 2,
      slot: 7,
      spouseIds: [],
      parentIds: ["p4", "p7"],
      story: "اطلاعات خالی در پنجره جزئیات نمایش داده نمی شود.",
      photos: [],
    },
    {
      id: "p12",
      name: "همسر نوه دوم",
      birth: "۱۳۴۱",
      death: "",
      generation: 2,
      slot: 4,
      spouseIds: ["p9"],
      parentIds: [],
      story: "این پیوند نمونه برای نمایش ازدواج در نسل های پایین تر است.",
      photos: [],
    },
    {
      id: "p13",
      name: "نتیجه اول",
      birth: "۱۳۶۸",
      death: "",
      generation: 3,
      slot: 3,
      spouseIds: [],
      parentIds: ["p9", "p12"],
      story: "برای افزودن نسل های بعدی، نسل را یک عدد بیشتر و جایگاه افقی را متناسب انتخاب کنید.",
      photos: [],
    },
    {
      id: "p14",
      name: "نتیجه دوم",
      birth: "۱۳۷۳",
      death: "",
      generation: 3,
      slot: 5,
      spouseIds: [],
      parentIds: ["p9", "p12"],
      story: "جست وجو می تواند فرد مورد نظر را برجسته کند.",
      photos: [],
    },
    {
      id: "p15",
      name: "ریشه شاخه دوم",
      birth: "۱۲۸۲",
      death: "۱۳۵۰",
      generation: 0,
      slot: 11,
      spouseIds: ["p16"],
      parentIds: [],
      story: "این فرد نمونه برای نمایش شروع یک شاخه مستقل دیگر در ردیف بالای درخت است.",
      photos: [],
    },
    {
      id: "p16",
      name: "همسر شاخه دوم",
      birth: "۱۲۸۸",
      death: "۱۳۶۰",
      generation: 0,
      slot: 12,
      spouseIds: ["p15"],
      parentIds: [],
      story: "چند نقطه شروع می توانند در ردیف بالا کنار هم قرار بگیرند.",
      photos: [],
    },
    {
      id: "p17",
      name: "فرزند شاخه دوم",
      birth: "۱۳۱۵",
      death: "",
      generation: 1,
      slot: 11,
      spouseIds: [],
      parentIds: ["p15", "p16"],
      story: "این کارت پس از باز کردن شاخه دوم نمایش داده می شود.",
      photos: [],
    },
    {
      id: "p18",
      name: "نوه شاخه دوم",
      birth: "۱۳۴۴",
      death: "",
      generation: 2,
      slot: 11,
      spouseIds: [],
      parentIds: ["p17"],
      story: "این نسل پایین تر با باز کردن فرزند شاخه دوم ظاهر می شود.",
      photos: [],
    },
  ],
  gallery: [
    {
      id: "g1",
      title: "دیدار خانوادگی",
      caption: "نمونه تصویری برای جایگزینی با عکس های واقعی",
      src: "",
      palette: ["#24554c", "#dcebe6"],
    },
    {
      id: "g2",
      title: "خانه قدیمی",
      caption: "ثبت مکان ها و خاطره های مشترک",
      src: "",
      palette: ["#8a2f45", "#f8e4ea"],
    },
    {
      id: "g3",
      title: "نسل های تازه",
      caption: "عکس های کودکان و نسل های جدید",
      src: "",
      palette: ["#315d7e", "#e2edf4"],
    },
  ],
  submissions: [],
  articleComments: [],
  history:
    "این متن نمونه برای بخش نوشتار تاریخ است. در نسخه نهایی، می توانید مقاله هایی درباره تاریخ خانواده، روستاها، منطقه، شاخه های اصلی، خاطرات بزرگان و رویدادهای مهم اینجا منتشر کنید.\n\nهدف این بخش این است که نوشته های تاریخی خانواده و سرزمین مادری در کنار درخت خانوادگی و عکس ها نگهداری شوند؛ جایی برای روایت های مستند، یادداشت های پژوهشی، خاطره ها و مقاله هایی که نسل های بعد بتوانند به آن رجوع کنند.",
  historyArticles: [
    {
      id: "ha1",
      title: "آغاز شاخه های فیروزجایی در کوهپایه",
      author: "گروه گردآوری خاندان",
      date: "۱ پیتک ۱۴۱۷ تبری",
      sortDate: "1906-03-22",
      body: [
        "این مقاله نمونه، آغاز یک روایت تاریخی درباره شکل گیری شاخه های نخست خانواده را نشان می دهد. در نسخه نهایی، این متن می تواند با اطلاعات کتاب خانوادگی، گفت وگو با بزرگان و سندهای معتبر جایگزین شود.",
        "تمرکز این نوشته بر پیوند میان خانواده، زمین، مسیرهای کوچ و روستاهای پیرامون است؛ یعنی همان زمینه ای که بسیاری از نام ها و خاطره های خانوادگی از آن معنا می گیرند.",
      ],
      figures: [
        {
          id: "hf1",
          title: "نقشه مسیرهای خانوادگی",
          caption: "شکل نمونه برای نمایش مسیرهای فرضی رفت وآمد، سکونت و پیوندهای محلی.",
          src: "",
        },
      ],
      references: ["دفترچه های شفاهی خانواده، نسخه آزمایشی", "مصاحبه نمونه با بزرگان خاندان، ۱۴۰۳"],
    },
    {
      id: "ha2",
      title: "نقش بزرگان در پیوندهای محلی",
      author: "دبیرخانه خاندان فیروزجایی",
      date: "۱ پیتک ۱۴۵۲ تبری",
      sortDate: "1941-03-21",
      body: [
        "این نوشته نمونه به جایگاه بزرگان خانواده در حفظ پیوندهای اجتماعی، حل اختلاف ها و انتقال خاطره ها می پردازد. چنین مقاله هایی می توانند نام افراد، رویدادها و نسبت های خانوادگی را با درخت خانواده مرتبط کنند.",
        "در آینده، هر پاراگراف می تواند به عکس، سند یا کارت افراد در درخت خانوادگی پیوند بخورد تا تاریخ نوشتاری و داده های شجره نامه در کنار هم خوانده شوند.",
      ],
      figures: [
        {
          id: "hf2",
          title: "مجلس خانوادگی",
          caption: "شکل نمونه از یک گردهمایی خانوادگی برای نمایش جایگاه روایت شفاهی.",
          src: "",
        },
      ],
      references: ["یادداشت های گردآوری شده از خانواده، نسخه نمونه", "آرشیو عکس های خانوادگی، بخش آزمایشی"],
    },
    {
      id: "ha3",
      title: "از خاطره های پراکنده تا آرشیو دیجیتال",
      author: "مصطفی فیروزجایی",
      date: "۱ پیتک ۱۵۳۵ تبری",
      sortDate: "2024-03-20",
      body: [
        "این مقاله نمونه توضیح می دهد که چرا گردآوری تاریخ خانواده در یک وب سایت مشترک اهمیت دارد. هدف، تبدیل خاطره های پراکنده به نوشته های قابل جست وجو، قابل ارجاع و قابل تکمیل برای نسل های بعد است.",
        "اعضای خانواده می توانند پیشنهاد اصلاح، عکس، ویدیو و سند بفرستند و مدیران پس از بررسی، مقاله ها و کارت های افراد را به روز کنند.",
      ],
      figures: [
        {
          id: "hf3",
          title: "آرشیو دیجیتال خانواده",
          caption: "شکل نمونه برای نمایش پیوند میان مقاله، عکس، سند و درخت خانوادگی.",
          src: "",
        },
      ],
      references: ["راهنمای داخلی وب سایت خاندان فیروزجایی، ۱۴۰۳", "فهرست پیشنهادی منابع خانوادگی، نسخه آزمایشی"],
    },
  ],
};

function applyBookSeed(target, bookData) {
  if (!bookData || typeof bookData !== "object") return;
  target.bookSeedVersion = bookData.version || BOOK_SEED_VERSION;
  if (Array.isArray(bookData.people) && bookData.people.length) target.people = clone(bookData.people);
  if (Array.isArray(bookData.gallery)) target.gallery = clone(bookData.gallery);
  if (Array.isArray(bookData.historyArticles)) target.historyArticles = clone(bookData.historyArticles);
  if (bookData.history) target.history = bookData.history;
}

applyBookSeed(sampleState, BOOK_DATA);

let state = loadState();
let session = loadSession();
let selectedPersonId = null;
let treeScale = 1;
let treeZoom = 1;
let pendingRelationship = null;
let expandedPersonIds = new Set();
let activeRootId = null;
let selectedArticleId = null;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isBookPhotoAsset(value = "") {
  return String(value).includes(BOOK_PHOTO_ASSET_PATH);
}

function isBookMediaItem(item) {
  const src = typeof item === "string" ? item : item?.src;
  return isBookPhotoAsset(src);
}

function removeBookPhotosFromState(target) {
  if (!target || typeof target !== "object") return;
  if (Array.isArray(target.gallery)) {
    target.gallery = target.gallery.filter((item) => !isBookMediaItem(item));
  }
  if (Array.isArray(target.people)) {
    target.people = target.people.map((person) => {
      const next = { ...person };
      if (isBookPhotoAsset(next.photo)) delete next.photo;
      next.photos = (next.photos || []).filter((item) => !isBookMediaItem(item));
      next.media = (next.media || []).filter((item) => !isBookMediaItem(item));
      return next;
    });
  }
  if (Array.isArray(target.historyArticles)) {
    target.historyArticles = target.historyArticles.map((article) => ({
      ...article,
      figures: (article.figures || article.media || []).filter((item) => !isBookMediaItem(item)),
    }));
  }
}

function normalizeGender(value) {
  return value === "male" || value === "female" ? value : "unknown";
}

function defaultGenderForPerson(person) {
  const sampleGenders = {
    p1: "male",
    p2: "female",
    p3: "male",
    p4: "male",
    p5: "male",
    p6: "female",
    p7: "female",
    p8: "male",
    p9: "male",
    p10: "male",
    p11: "male",
    p12: "female",
    p13: "male",
    p14: "female",
    p15: "male",
    p16: "female",
    p17: "male",
    p18: "female",
  };
  return sampleGenders[person.id] || "unknown";
}

function normalizeState(value) {
  const loadedBookSeedVersion = value?.bookSeedVersion;
  const normalized = { ...clone(sampleState), ...value };
  if (!Array.isArray(normalized.people) || !normalized.people.length) {
    normalized.people = clone(sampleState.people);
  }
  const looksLikeDemoData = normalized.people.some((person) => person.id === "p1" && person.name === "بزرگ خاندان");
  const shouldReplaceDemoData =
    looksLikeDemoData && sampleState.bookSeedVersion && loadedBookSeedVersion !== sampleState.bookSeedVersion;
  const shouldRemovePublishedBookPhotos =
    sampleState.bookSeedVersion && loadedBookSeedVersion !== sampleState.bookSeedVersion;
  if (shouldReplaceDemoData) {
    normalized.people = clone(sampleState.people);
    normalized.gallery = clone(sampleState.gallery);
    normalized.historyArticles = clone(sampleState.historyArticles);
    normalized.history = sampleState.history;
    normalized.bookSeedVersion = sampleState.bookSeedVersion;
  } else if (looksLikeDemoData) {
    const existingIds = new Set(normalized.people.map((person) => person.id));
    clone(sampleState.people).forEach((person) => {
      if (!existingIds.has(person.id)) normalized.people.push(person);
    });
  } else if (shouldRemovePublishedBookPhotos) {
    removeBookPhotosFromState(normalized);
    normalized.bookSeedVersion = sampleState.bookSeedVersion;
  }
  normalized.people = (normalized.people || []).map((person) => ({
    ...person,
    gender: normalizeGender(person.gender || defaultGenderForPerson(person)),
    media: (person.media || []).map(normalizeMediaItem).filter(Boolean),
    spouseIds: Array.from(new Set(person.spouseIds || [])).filter(Boolean),
    parentIds: Array.from(new Set(person.parentIds || [])).filter(Boolean).slice(0, 2),
  }));
  normalized.people.forEach((person) => {
    person.spouseIds = person.spouseIds.filter((spouseId) => spouseId !== person.id);
    person.spouseIds.forEach((spouseId) => {
      const spouse = normalized.people.find((item) => item.id === spouseId);
      if (spouse && !spouse.spouseIds.includes(person.id)) spouse.spouseIds.push(person.id);
    });
  });
  normalized.gallery = normalized.gallery || [];
  normalized.admins = normalized.admins || clone(sampleState).admins;
  normalized.subscribers = normalized.subscribers || [];
  normalized.bookSeedVersion = normalized.bookSeedVersion || sampleState.bookSeedVersion || BOOK_SEED_VERSION;
  normalized.submissions = (normalized.submissions || []).map(normalizeSubmission).filter(Boolean);
  normalized.articleComments = (normalized.articleComments || []).map(normalizeArticleComment).filter(Boolean);
  const historyArticleSource = Array.isArray(normalized.historyArticles) ? normalized.historyArticles : [];
  normalized.historyArticles = historyArticleSource.map(normalizeHistoryArticle).filter(Boolean);
  if (!normalized.historyArticles.length && normalized.history) {
    const legacyArticle = normalizeHistoryArticle({
      id: "ha-legacy",
      title: "یادداشت پیشین نوشتار تاریخ",
      author: "دبیرخانه خاندان",
      date: "بدون تاریخ",
      sortDate: "1900-01-01",
      body: normalized.history,
      figures: [],
      references: [],
    });
    if (legacyArticle) normalized.historyArticles = [legacyArticle];
  }
  return normalized;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return normalizeState(clone(sampleState));
  try {
    const parsedState = JSON.parse(raw);
    const loadedState = normalizeState(parsedState);
    const owner = loadedState.admins.find((admin) => admin.email.toLowerCase() === OWNER_EMAIL);
    let shouldPersist = parsedState.bookSeedVersion !== loadedState.bookSeedVersion;
    if (owner && LEGACY_OWNER_PASSWORDS.includes(owner.password)) {
      owner.password = DEFAULT_OWNER_PASSWORD;
      shouldPersist = true;
    }
    if (shouldPersist) localStorage.setItem(STORAGE_KEY, JSON.stringify(loadedState));
    return loadedState;
  } catch {
    return normalizeState(clone(sampleState));
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadSession() {
  const raw = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    const loadedSession = JSON.parse(raw);
    localStorage.setItem(SESSION_KEY, JSON.stringify(loadedSession));
    sessionStorage.removeItem(SESSION_KEY);
    return loadedSession;
  } catch {
    return null;
  }
}

function saveSession(value) {
  session = value;
  if (value) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(value));
  } else {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
  }
}

function isAdmin() {
  return Boolean(session && state.admins.some((admin) => admin.email === session.email));
}

function isOwner() {
  const admin = state.admins.find((item) => item.email === session?.email);
  return admin?.role === "owner";
}

function avatarSvg(name, index = 0) {
  const [dark, light] = colors[index % colors.length];
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240" dir="rtl">
    <rect width="240" height="240" rx="120" fill="${light}"/>
    <circle cx="120" cy="92" r="42" fill="${dark}" opacity=".9"/>
    <path d="M48 216c8-48 42-74 72-74s64 26 72 74" fill="${dark}" opacity=".9"/>
    <text x="120" y="128" text-anchor="middle" font-size="42" font-family="Tahoma" fill="#fff">${initials}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function gallerySvg(title, palette = colors[0]) {
  const [dark, light] = palette;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="650" viewBox="0 0 900 650" dir="rtl">
    <rect width="900" height="650" fill="${light}"/>
    <rect x="70" y="70" width="760" height="510" rx="24" fill="#fff" opacity=".86"/>
    <circle cx="685" cy="210" r="74" fill="${dark}" opacity=".18"/>
    <path d="M120 512 325 330l115 102 78-70 262 150Z" fill="${dark}" opacity=".32"/>
    <text x="450" y="140" text-anchor="middle" font-size="46" font-family="Tahoma" fill="${dark}">${title}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function makeId(prefix) {
  return `${prefix}${Date.now()}${Math.random().toString(36).slice(2, 7)}`;
}

function mediaTypeFromSource(src = "", mimeType = "") {
  if (
    mimeType === "video" ||
    mimeType.startsWith("video/") ||
    src.startsWith("data:video/") ||
    /\.(mp4|webm|mov|m4v|ogg)(\?|#|$)/i.test(src)
  ) {
    return "video";
  }
  return "image";
}

function normalizeMediaItem(item) {
  if (!item) return null;
  if (typeof item === "string") {
    const src = item.trim();
    if (!src) return null;
    return {
      id: makeId("m"),
      type: mediaTypeFromSource(src),
      src,
      name: "رسانه",
      addedAt: "",
    };
  }
  const src = (item.src || item.url || "").trim();
  if (!src) return null;
  return {
    id: item.id || makeId("m"),
    type: mediaTypeFromSource(src, item.mimeType || item.type || ""),
    src,
    name: item.name || "رسانه",
    addedAt: item.addedAt || "",
  };
}

function normalizeSubmission(item) {
  if (!item || !item.personId || !item.message) return null;
  return {
    id: item.id || makeId("s"),
    personId: item.personId,
    personName: item.personName || "",
    name: item.name || "",
    contact: item.contact || "",
    message: item.message || "",
    media: (item.media || []).map(normalizeMediaItem).filter(Boolean),
    status: item.status || "pending",
    createdAt: item.createdAt || new Date().toISOString(),
  };
}

function normalizeArticleComment(item) {
  if (!item || !item.articleId || !item.message) return null;
  return {
    id: item.id || makeId("ac"),
    articleId: item.articleId,
    articleTitle: item.articleTitle || "",
    name: item.name || "",
    contact: item.contact || "",
    message: item.message || "",
    status: item.status || "pending",
    createdAt: item.createdAt || new Date().toISOString(),
  };
}

function textToParagraphs(value) {
  if (Array.isArray(value)) return value.map((item) => String(item || "").trim()).filter(Boolean);
  return String(value || "")
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeReferenceList(value) {
  if (Array.isArray(value)) return value.map((item) => String(item || "").trim()).filter(Boolean);
  return String(value || "")
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function toPersianDigits(value) {
  return String(value).replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)]);
}

function toEnglishDigits(value) {
  return String(value)
    .replace(/[۰-۹]/g, (digit) => String(PERSIAN_DIGITS.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)));
}

function gregorianToJalali(gy, gm, gd) {
  const gMonthDays = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  let jy = gy <= 1600 ? 0 : 979;
  gy -= gy <= 1600 ? 621 : 1600;
  const gy2 = gm > 2 ? gy + 1 : gy;
  let days = 365 * gy + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) - 80 + gd + gMonthDays[gm - 1];
  jy += 33 * Math.floor(days / 12053);
  days %= 12053;
  jy += 4 * Math.floor(days / 1461);
  days %= 1461;
  if (days > 365) {
    jy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }
  const jm = days < 186 ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);
  const jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30);
  return { jy, jm, jd };
}

function tabariFromJalali(jy, jm, jd) {
  const year = jy + (jm > 5 || (jm === 5 && jd >= 2) ? 133 : 132);
  let day = 0;
  let month = "";

  if (jm === 5 && jd >= 2) {
    day = jd - 1;
    month = "فردینه ما";
  } else if (jm === 6 && jd <= 30) {
    day = jd;
    month = "کرچه ما";
  } else if ((jm === 6 && jd === 31) || (jm === 7 && jd <= 29)) {
    day = jm === 6 ? 1 : jd + 1;
    month = "هره ما";
  } else if ((jm === 7 && jd >= 30) || (jm === 8 && jd <= 29)) {
    day = jm === 7 ? 1 : jd + 1;
    month = "تیر ما";
  } else if ((jm === 8 && jd >= 30) || (jm === 9 && jd <= 29)) {
    day = jm === 8 ? 1 : jd + 1;
    month = "ملاره ما";
  } else if ((jm === 9 && jd >= 30) || (jm === 10 && jd <= 29)) {
    day = jm === 9 ? 1 : jd + 1;
    month = "شروینه ما";
  } else if ((jm === 10 && jd >= 30) || (jm === 11 && jd <= 29)) {
    day = jm === 10 ? 1 : jd + 1;
    month = "میر ما";
  } else if ((jm === 11 && jd >= 30) || (jm === 12 && jd <= 29)) {
    day = jm === 11 ? 1 : jd + 1;
    month = "اونه ما";
  } else if (jm === 12 && jd === 30) {
    return `شیشک ${toPersianDigits(year)} تبری`;
  } else if (jm === 1 && jd <= 5) {
    return `${toPersianDigits(jd)} پیتک ${toPersianDigits(year)} تبری`;
  } else if ((jm === 1 && jd >= 6) || (jm === 2 && jd <= 4)) {
    day = jm === 1 ? jd - 5 : jd + 26;
    month = "ارکه ما";
  } else if ((jm === 2 && jd >= 5) || (jm === 3 && jd <= 3)) {
    day = jm === 2 ? jd - 4 : jd + 27;
    month = "دِه ما";
  } else if ((jm === 3 && jd >= 4) || (jm === 4 && jd <= 2)) {
    day = jm === 3 ? jd - 3 : jd + 28;
    month = "وهنه ما";
  } else if ((jm === 4 && jd >= 3) || (jm === 5 && jd <= 1)) {
    day = jm === 4 ? jd - 2 : jd + 29;
    month = "نوروز ما";
  }

  return day && month ? `${toPersianDigits(day)} ${month} ${toPersianDigits(year)} تبری` : `سال ${toPersianDigits(year)} تبری`;
}

function tabariDateFromIso(value) {
  const match = String(value || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return "";
  const [, gy, gm, gd] = match.map(Number);
  const jalali = gregorianToJalali(gy, gm, gd);
  return tabariFromJalali(jalali.jy, jalali.jm, jalali.jd);
}

function localIsoDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function renderTabariToday() {
  const target = $("#tabariToday");
  if (!target) return;
  target.textContent = `امروز: ${tabariDateFromIso(localIsoDate())}`;
}

function normalizeArticleDate(date, sortDate) {
  const rawDate = String(date || "").trim();
  const tabariDate = tabariDateFromIso(sortDate);
  const solarYearOnly = rawDate.match(/^([۰-۹٠-٩0-9]{3,4})\s*(خورشیدی|شمسی)$/);
  if (solarYearOnly) return `سال ${toPersianDigits(Number(toEnglishDigits(solarYearOnly[1])) + 132)} تبری`;
  if (!rawDate || /خورشیدی|شمسی|میلادی|هجری|بدون تاریخ/.test(rawDate)) return tabariDate || rawDate;
  return rawDate;
}

function normalizeHistoryFigure(item) {
  if (!item) return null;
  if (typeof item === "string") {
    const src = item.trim();
    if (!src) return null;
    return {
      id: makeId("hf"),
      title: "شکل مقاله",
      caption: "",
      src,
      type: mediaTypeFromSource(src),
    };
  }
  const src = (item.src || item.url || "").trim();
  const title = (item.title || item.name || "").trim();
  const caption = (item.caption || "").trim();
  if (!src && !title && !caption) return null;
  return {
    id: item.id || makeId("hf"),
    title: title || "شکل مقاله",
    caption,
    src,
    type: mediaTypeFromSource(src, item.mimeType || item.type || ""),
  };
}

function normalizeHistoryArticle(item) {
  if (!item) return null;
  const title = (item.title || "").trim();
  const body = textToParagraphs(item.body || item.content || item.text);
  if (!title && !body.length) return null;
  const sortDate = (item.sortDate || item.dateSort || "").trim();
  return {
    id: item.id || makeId("ha"),
    title: title || "مقاله بدون عنوان",
    author: (item.author || "دبیرخانه خاندان").trim(),
    date: normalizeArticleDate(item.date, sortDate),
    sortDate,
    body,
    figures: (item.figures || item.media || []).map(normalizeHistoryFigure).filter(Boolean),
    references: normalizeReferenceList(item.references),
    createdAt: item.createdAt || new Date().toISOString(),
  };
}

function compareHistoryArticles(a, b) {
  return (Date.parse(a.sortDate) || 0) - (Date.parse(b.sortDate) || 0);
}

function sortedHistoryArticles() {
  return (state.historyArticles || []).map(normalizeHistoryArticle).filter(Boolean).sort(compareHistoryArticles);
}

function findHistoryArticle(articleId = selectedArticleId) {
  return sortedHistoryArticles().find((article) => article.id === articleId) || null;
}

function uniqueMedia(items) {
  const seen = new Set();
  return items
    .map(normalizeMediaItem)
    .filter(Boolean)
    .filter((item) => {
      if (seen.has(item.src)) return false;
      seen.add(item.src);
      return true;
    });
}

function personMedia(person) {
  return uniqueMedia([...(person.media || []), ...(person.photos || [])]);
}

function mediaPreviewMarkup(media, alt = "") {
  const item = normalizeMediaItem(media);
  if (!item) return "";
  const safeSrc = escapeHtml(item.src);
  const safeAlt = escapeHtml(alt || item.name || "رسانه");
  if (item.type === "video") {
    return `<video src="${safeSrc}" controls preload="metadata"></video>`;
  }
  return `<img src="${safeSrc}" alt="${safeAlt}">`;
}

function formatDateTime(value) {
  if (!value) return "";
  try {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return "";
  }
}

function fileToMedia(file) {
  if (!file) return Promise.resolve(null);
  if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
    return Promise.reject(new Error("فقط عکس یا ویدیو قابل بارگذاری است."));
  }
  if (file.size > MAX_LOCAL_UPLOAD_BYTES) {
    return Promise.reject(new Error("در نسخه فعلی، هر فایل باید کمتر از ۲ مگابایت باشد."));
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      resolve({
        id: makeId("m"),
        type: mediaTypeFromSource(reader.result, file.type),
        src: reader.result,
        name: file.name,
        addedAt: new Date().toISOString(),
      });
    });
    reader.addEventListener("error", () => reject(new Error("خواندن فایل انجام نشد.")));
    reader.readAsDataURL(file);
  });
}

async function filesToMedia(fileList) {
  const files = Array.from(fileList || []);
  const media = await Promise.all(files.map(fileToMedia));
  return media.filter(Boolean);
}

function parseRouteHash() {
  const hash = decodeURIComponent(window.location.hash.replace(/^#/, "")) || "home";
  const [route, ...rest] = hash.split("/");
  if (route === "article") return { route: "article", articleId: rest.join("/") };
  return { route: VALID_ROUTES.includes(route) ? route : "home", articleId: "" };
}

function routeHash(route, articleId = "") {
  return route === "article" ? `#article/${encodeURIComponent(articleId)}` : `#${route}`;
}

function routeTo(route, options = {}) {
  const nextRoute = VALID_ROUTES.includes(route) ? route : "home";
  if (nextRoute === "article") {
    selectedArticleId = options.articleId || selectedArticleId || sortedHistoryArticles()[0]?.id || "";
    if (!selectedArticleId) {
      routeTo("history");
      return;
    }
    renderArticlePage();
  }
  $$(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.route === nextRoute || (nextRoute === "article" && button.dataset.route === "history")));
  $$(".view").forEach((view) => view.classList.toggle("active", view.dataset.view === nextRoute));
  if (nextRoute === "tree") requestAnimationFrame(fitTreeToStage);
  const nextHash = routeHash(nextRoute, selectedArticleId);
  if (window.location.hash !== nextHash) window.location.hash = nextHash;
}

function nodePosition(person) {
  return {
    x: NODE_BASE_X + Number(person.slot || 0) * NODE_X_GAP,
    y: NODE_BASE_Y + Number(person.generation || 0) * NODE_Y_GAP,
  };
}

function genderSortValue(person) {
  if (person.gender === "male") return 0;
  if (person.gender === "female") return 1;
  return 2;
}

function genderLabel(gender) {
  return GENDER_LABELS[normalizeGender(gender)];
}

function oppositeSpouseGender(gender) {
  if (gender === "male") return "female";
  if (gender === "female") return "male";
  return "unknown";
}

function preferredSpouseSlot(basePerson, newGender = "unknown") {
  const baseSlot = Number(basePerson.slot || 0);
  const baseGender = normalizeGender(basePerson.gender);
  const gender = normalizeGender(newGender);
  if (baseGender === "female" || gender === "male") return Math.max(0, baseSlot - 1);
  return baseSlot + 1;
}

function orderedParentIds(parentIds) {
  return parentIds
    .filter(Boolean)
    .slice(0, 2)
    .sort((a, b) => {
      const parentA = state.people.find((person) => person.id === a);
      const parentB = state.people.find((person) => person.id === b);
      return genderSortValue(parentA || {}) - genderSortValue(parentB || {});
    });
}

function alignSpouseSlots(person, spouseId) {
  const spouse = state.people.find((item) => item.id === spouseId);
  if (!spouse || Number(spouse.generation || 0) !== Number(person.generation || 0)) return;
  const people = [person, spouse];
  const male = people.find((item) => item.gender === "male");
  const female = people.find((item) => item.gender === "female");
  if (!male || !female) return;
  const maleSlot = Number(male.slot || 0);
  const femaleSlot = Number(female.slot || 0);
  if (maleSlot < femaleSlot) return;
  if (maleSlot === femaleSlot) {
    female.slot = nextAvailableSlot(Number(female.generation || 0), maleSlot + 1, female.id);
    return;
  }
  male.slot = femaleSlot;
  female.slot = maleSlot;
}

function personById(id) {
  return state.people.find((person) => person.id === id);
}

function sortTreePeople(people) {
  return people
    .slice()
    .sort(
      (a, b) =>
        Number(a.generation || 0) - Number(b.generation || 0) ||
        Number(a.slot || 0) - Number(b.slot || 0) ||
        genderSortValue(a) - genderSortValue(b) ||
        a.name.localeCompare(b.name, "fa")
    );
}

function childPeopleOf(personId, people = state.people) {
  return sortTreePeople(people.filter((person) => (person.parentIds || []).includes(personId)));
}

function isStartingPerson(person) {
  if ((person.parentIds || []).length) return false;
  const spouseHasParents = (person.spouseIds || []).some((spouseId) => (personById(spouseId)?.parentIds || []).length);
  return !spouseHasParents;
}

function startingPeople() {
  const roots = state.people.filter(isStartingPerson);
  return sortTreePeople(roots.length ? roots : state.people.filter((person) => !(person.parentIds || []).length));
}

function startingPersonIds() {
  return new Set(startingPeople().map((person) => person.id));
}

function rootAncestorIds(personId, visited = new Set()) {
  if (!personId || visited.has(personId)) return [];
  visited.add(personId);
  const person = personById(personId);
  if (!person) return [];
  const parentIds = person.parentIds || [];
  if (!parentIds.length) return [person.id];
  const roots = parentIds.flatMap((parentId) => rootAncestorIds(parentId, new Set(visited)));
  return Array.from(new Set(roots));
}

function primaryRootForPerson(personId) {
  const roots = rootAncestorIds(personId);
  const startingIds = startingPersonIds();
  return roots.find((rootId) => startingIds.has(rootId)) || roots[0] || personId;
}

function personHasAncestor(personId, ancestorId, visited = new Set()) {
  if (!personId || !ancestorId || visited.has(personId)) return false;
  if (personId === ancestorId) return true;
  visited.add(personId);
  const person = personById(personId);
  return Boolean(person?.parentIds?.some((parentId) => personHasAncestor(parentId, ancestorId, visited)));
}

function pathFromRootToPerson(rootId, personId, visited = new Set()) {
  if (!rootId || !personId || visited.has(personId)) return [];
  if (rootId === personId) return [rootId];
  visited.add(personId);
  const person = personById(personId);
  if (!person) return [];
  for (const parentId of person.parentIds || []) {
    const parentPath = pathFromRootToPerson(rootId, parentId, new Set(visited));
    if (parentPath.length) return [...parentPath, personId];
  }
  return [];
}

function descendantIdsOf(personId, visited = new Set()) {
  if (!personId || visited.has(personId)) return [];
  visited.add(personId);
  return childPeopleOf(personId).flatMap((child) => [child.id, ...descendantIdsOf(child.id, visited)]);
}

function collapsePersonBranch(personId) {
  expandedPersonIds.delete(personId);
  descendantIdsOf(personId).forEach((id) => expandedPersonIds.delete(id));
}

function setActiveRoot(rootId = null) {
  activeRootId = rootId && personById(rootId) ? rootId : null;
  expandedPersonIds = activeRootId ? new Set([activeRootId]) : new Set();
  selectedPersonId = activeRootId;
  renderTree();
}

function focusPersonBranch(personId) {
  const rootId = primaryRootForPerson(personId);
  activeRootId = rootId && personById(rootId) ? rootId : null;
  const path = activeRootId ? pathFromRootToPerson(activeRootId, personId) : [];
  expandedPersonIds = new Set(path.slice(0, -1));
  if (activeRootId) expandedPersonIds.add(activeRootId);
  selectedPersonId = personId;
  renderTree();
}

function descendantCount(personId, visited = new Set()) {
  if (visited.has(personId)) return 0;
  visited.add(personId);
  return childPeopleOf(personId).reduce((total, child) => total + 1 + descendantCount(child.id, visited), 0);
}

function navigableChildPeopleOf(personId) {
  const children = childPeopleOf(personId);
  if (!activeRootId) return children;
  return children.filter((child) => personHasAncestor(child.id, activeRootId));
}

function navigableDescendantCount(personId, visited = new Set()) {
  if (visited.has(personId)) return 0;
  visited.add(personId);
  return navigableChildPeopleOf(personId).reduce((total, child) => total + 1 + navigableDescendantCount(child.id, visited), 0);
}

function shouldShowSpouseConnection(person, spouse) {
  if (!activeRootId || !person || !spouse) return false;
  return personHasAncestor(person.id, activeRootId) || personHasAncestor(spouse.id, activeRootId);
}

function visibleTreePeople(searchTerm = "") {
  if (searchTerm) return sortTreePeople(state.people);

  if (activeRootId && !personById(activeRootId)) activeRootId = null;
  const visibleIds = new Set(startingPeople().map((person) => person.id));
  if (!activeRootId) {
    return sortTreePeople(state.people.filter((person) => visibleIds.has(person.id)));
  }

  visibleIds.add(activeRootId);
  let changed = true;
  while (changed) {
    changed = false;
    Array.from(visibleIds).forEach((id) => {
      const person = personById(id);
      if (!person) return;
      (person.spouseIds || []).forEach((spouseId) => {
        const spouse = personById(spouseId);
        if (spouse && shouldShowSpouseConnection(person, spouse) && !visibleIds.has(spouseId)) {
          visibleIds.add(spouseId);
          changed = true;
        }
      });
      if (!expandedPersonIds.has(id)) return;
      navigableChildPeopleOf(id).forEach((child) => {
        if (!visibleIds.has(child.id)) {
          visibleIds.add(child.id);
          changed = true;
        }
      });
    });
  }

  return sortTreePeople(state.people.filter((person) => visibleIds.has(person.id)));
}

function treeDepthMap() {
  const depths = new Map();
  startingPeople().forEach((person) => depths.set(person.id, 0));

  let changed = true;
  while (changed) {
    changed = false;
    state.people.forEach((person) => {
      const parentDepths = (person.parentIds || []).map((parentId) => depths.get(parentId)).filter((depth) => depth !== undefined);
      if (parentDepths.length) {
        const nextDepth = Math.min(...parentDepths) + 1;
        if (depths.get(person.id) !== nextDepth) {
          depths.set(person.id, nextDepth);
          changed = true;
        }
      }
      (person.spouseIds || []).forEach((spouseId) => {
        const spouseDepth = depths.get(spouseId);
        const currentDepth = depths.get(person.id);
        if (spouseDepth !== undefined && currentDepth === undefined) {
          depths.set(person.id, spouseDepth);
          changed = true;
        }
        if (currentDepth !== undefined && spouseDepth === undefined && personById(spouseId)) {
          depths.set(spouseId, currentDepth);
          changed = true;
        }
      });
    });
  }

  state.people.forEach((person) => {
    if (!depths.has(person.id)) depths.set(person.id, Number(person.generation || 0));
  });
  return depths;
}

function orderTreeRowPeople(generationPeople) {
  const rowIds = new Set(generationPeople.map((person) => person.id));
  const placed = new Set();
  const ordered = [];
  const sorted = generationPeople
    .slice()
    .sort(
      (a, b) =>
        Number(a.slot || 0) - Number(b.slot || 0) ||
        genderSortValue(a) - genderSortValue(b) ||
        a.name.localeCompare(b.name, "fa")
    );

  sorted.forEach((person) => {
    if (placed.has(person.id)) return;
    const group = [person, ...(person.spouseIds || []).map(personById).filter((spouse) => spouse && rowIds.has(spouse.id) && !placed.has(spouse.id))];
    group
      .sort(
        (a, b) =>
          genderSortValue(a) - genderSortValue(b) ||
          Number(a.slot || 0) - Number(b.slot || 0) ||
          a.name.localeCompare(b.name, "fa")
      )
      .forEach((item) => {
        if (placed.has(item.id)) return;
        placed.add(item.id);
        ordered.push(item);
      });
  });

  return ordered;
}

function treePositions(people = state.people) {
  const positions = new Map();
  const generationMap = new Map();
  const depths = treeDepthMap();
  people.forEach((person) => {
    const generation = depths.get(person.id) ?? Number(person.generation || 0);
    generationMap.set(generation, [...(generationMap.get(generation) || []), person]);
  });

  generationMap.forEach((generationPeople) => {
    let nextSlot = -1;
    orderTreeRowPeople(generationPeople).forEach((person) => {
      const displaySlot = nextSlot + 1;
      nextSlot = displaySlot;
      positions.set(person.id, nodePosition({ ...person, slot: displaySlot }));
    });
  });

  return positions;
}

function treeCanvasSize(positions = treePositions()) {
  const positionList = Array.from(positions.values());
  if (!positionList.length) return { width: TREE_CANVAS_WIDTH, height: TREE_CANVAS_HEIGHT };
  return {
    width: Math.max(TREE_CANVAS_WIDTH, Math.max(...positionList.map((position) => position.x)) + 230),
    height: Math.max(TREE_CANVAS_HEIGHT, Math.max(...positionList.map((position) => position.y)) + 220),
  };
}

function branchBridgeRootForPerson(person) {
  if (!activeRootId || !person) return "";
  if (isStartingPerson(person)) return "";
  if (!(person.parentIds || []).length) return "";
  const rootId = primaryRootForPerson(person.id);
  return rootId && rootId !== activeRootId ? rootId : "";
}

function renderRootNavigator() {
  const rootNav = $("#rootNav");
  if (!rootNav) return;
  const roots = startingPeople();
  rootNav.innerHTML = "";

  const title = document.createElement("span");
  title.className = "root-nav-title";
  title.textContent = "شاخه‌ها";
  rootNav.appendChild(title);

  const allButton = document.createElement("button");
  allButton.type = "button";
  allButton.className = `root-chip ${!activeRootId ? "active" : ""}`;
  allButton.textContent = "فقط ریشه‌ها";
  allButton.addEventListener("click", () => setActiveRoot(null));
  rootNav.appendChild(allButton);

  roots.forEach((root) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `root-chip ${activeRootId === root.id ? "active" : ""}`;
    button.innerHTML = `<strong>${escapeHtml(root.name)}</strong><small>${toPersianDigits(descendantCount(root.id))}</small>`;
    button.title = `نمای شاخه ${root.name}`;
    button.addEventListener("click", () => setActiveRoot(root.id));
    rootNav.appendChild(button);
  });
}

function renderTree() {
  const nodes = $("#treeNodes");
  const lines = $("#treeLines");
  const template = $("#nodeTemplate");
  const searchTerm = $("#familySearch").value.trim();
  nodes.innerHTML = "";
  lines.innerHTML = "";
  renderRootNavigator();

  const people = visibleTreePeople(searchTerm);
  const positions = treePositions(people);

  drawRelationships(lines, people, positions);

  people.forEach((person, index) => {
    const position = positions.get(person.id);
    const node = template.content.firstElementChild.cloneNode(true);
    node.style.left = `${position.x}px`;
    node.style.top = `${position.y}px`;
    node.dataset.id = person.id;
    node.dataset.gender = normalizeGender(person.gender);
    node.classList.add(`gender-${normalizeGender(person.gender)}`);
    node.classList.toggle("selected", selectedPersonId === person.id);
    node.classList.toggle("active-root", activeRootId === person.id);
    if (searchTerm && !person.name.includes(searchTerm)) node.classList.add("dimmed");

    const avatar = $(".avatar", node);
    const image = document.createElement("img");
    image.alt = person.name;
    image.src = person.photo || avatarSvg(person.name, index);
    avatar.appendChild(image);
    $(".person-name", node).textContent = person.name;
    const bridgeRootId = !searchTerm ? branchBridgeRootForPerson(person) : "";
    const branchButton = $("[data-focus-branch]", node);
    if (branchButton && bridgeRootId) {
      const bridgeRoot = personById(bridgeRootId);
      node.classList.add("branch-bridge");
      branchButton.hidden = false;
      branchButton.title = bridgeRoot ? `رفتن به شاخه ${bridgeRoot.name}` : "رفتن به شاخه این فرد";
      branchButton.setAttribute("aria-label", branchButton.title);
      branchButton.addEventListener("click", (event) => {
        event.stopPropagation();
        focusPersonBranch(person.id);
      });
    }
    const toggleButton = $("[data-toggle-branch]", node);
    const childCount = searchTerm ? childPeopleOf(person.id).length : navigableChildPeopleOf(person.id).length;
    if (toggleButton && childCount) {
      const hiddenCount = searchTerm ? descendantCount(person.id) : navigableDescendantCount(person.id);
      const isExpanded = expandedPersonIds.has(person.id) || Boolean(searchTerm);
      node.classList.toggle("branch-open", isExpanded);
      $("[data-branch-symbol]", toggleButton).textContent = isExpanded ? "-" : "+";
      $("[data-branch-count]", toggleButton).textContent = hiddenCount;
      toggleButton.title = isExpanded ? "بستن نسل های پایین تر" : "باز کردن نسل های پایین تر";
      toggleButton.setAttribute("aria-label", toggleButton.title);
      toggleButton.addEventListener("click", (event) => {
        event.stopPropagation();
        if (expandedPersonIds.has(person.id)) {
          collapsePersonBranch(person.id);
        } else {
          if (!searchTerm) {
            if (startingPersonIds().has(person.id)) {
              activeRootId = person.id;
              expandedPersonIds = new Set();
            } else if (!activeRootId) {
              activeRootId = primaryRootForPerson(person.id);
            }
          }
          expandedPersonIds.add(person.id);
        }
        renderTree();
      });
    } else if (toggleButton) {
      toggleButton.hidden = true;
    }
    const editButton = $("[data-edit-person]", node);
    editButton.addEventListener("click", (event) => {
      event.stopPropagation();
      openPersonEditor(person.id);
    });
    const parentButton = $('[data-add-relative="parent"]', node);
    if ((person.parentIds || []).length >= 2) {
      parentButton.disabled = true;
      parentButton.title = "دو والد برای این فرد ثبت شده است.";
    }
    $$("[data-add-relative]", node).forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        openRelativeEditor(person.id, button.dataset.addRelative);
      });
    });
    node.addEventListener("click", (event) => {
      if (event.target.closest("button")) return;
      openPerson(person.id);
    });
    node.addEventListener("keydown", (event) => {
      if (event.target.closest("button")) return;
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openPerson(person.id);
    });
    nodes.appendChild(node);
  });

  fitTreeToStage();
  updateAdminStatus();
}

function fitTreeToStage() {
  const stage = $("#treeStage");
  const canvas = $("#treeCanvas");
  if (!stage || !canvas || !stage.clientWidth) return;

  const searchTerm = $("#familySearch")?.value.trim() || "";
  const { width, height } = treeCanvasSize(treePositions(visibleTreePeople(searchTerm)));
  const availableWidth = Math.max(260, stage.clientWidth - 28);
  const fitScale = Math.min(1, availableWidth / width);
  treeScale = fitScale * treeZoom;

  const visualWidth = width * treeScale;
  const visualHeight = height * treeScale;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.style.transform = `scale(${treeScale})`;
  canvas.style.marginLeft = `${Math.max(0, (stage.clientWidth - visualWidth) / 2)}px`;
  canvas.style.marginTop = "14px";
  stage.style.height = `${Math.ceil(visualHeight + 28)}px`;
}

function drawRelationships(svg, people, positions) {
  const drawnMarriages = new Set();
  people.forEach((person) => {
    person.spouseIds?.forEach((spouseId) => {
      const key = [person.id, spouseId].sort().join(":");
      if (drawnMarriages.has(key)) return;
      const spouse = people.find((item) => item.id === spouseId);
      if (!spouse) return;
      drawnMarriages.add(key);
      const a = positions.get(person.id);
      const b = positions.get(spouse.id);
      if (!a || !b) return;
      addLine(svg, a.x, a.y + 6, b.x, b.y + 6, "marriage-line");
      addCircle(svg, (a.x + b.x) / 2, (a.y + b.y) / 2 + 6, "marriage-dot");

      const children = people.filter((child) => {
        const parents = child.parentIds || [];
        return parents.includes(person.id) && parents.includes(spouse.id);
      });
      if (children.length) {
        const midX = (a.x + b.x) / 2;
        const childY = Math.min(...children.map((child) => positions.get(child.id).y)) - 84;
        addLine(svg, midX, a.y + 18, midX, childY, "descent-line");
        const minX = Math.min(...children.map((child) => positions.get(child.id).x));
        const maxX = Math.max(...children.map((child) => positions.get(child.id).x));
        addLine(svg, minX, childY, maxX, childY, "descent-line");
        children.forEach((child) => {
          const c = positions.get(child.id);
          addLine(svg, c.x, childY, c.x, c.y - 78, "descent-line");
        });
      }
    });
  });

  people.forEach((child) => {
    const parents = child.parentIds || [];
    if (parents.length !== 1) return;
    const parent = positions.get(parents[0]);
    const childPos = positions.get(child.id);
    if (parent && childPos) addLine(svg, parent.x, parent.y + 72, childPos.x, childPos.y - 78, "descent-line");
  });
}

function addLine(svg, x1, y1, x2, y2, className) {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("class", className);
  svg.appendChild(line);
}

function addCircle(svg, cx, cy, className) {
  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", cx);
  circle.setAttribute("cy", cy);
  circle.setAttribute("r", 8);
  circle.setAttribute("class", className);
  svg.appendChild(circle);
}

function openPerson(id) {
  selectedPersonId = id;
  const person = state.people.find((item) => item.id === id);
  if (!person) return;
  renderTree();
  const index = state.people.findIndex((item) => item.id === id);
  const detail = $("#personDetail");
  const dates = [person.birth && `زادروز: ${person.birth}`, person.death && `درگذشت: ${person.death}`].filter(Boolean);
  const gender = normalizeGender(person.gender);
  const parents = person.parentIds
    ?.map((parentId) => state.people.find((item) => item.id === parentId)?.name)
    .filter(Boolean);
  const spouses = person.spouseIds
    ?.map((spouseId) => state.people.find((item) => item.id === spouseId)?.name)
    .filter(Boolean);
  const media = personMedia(person);
  detail.innerHTML = `
    <div class="detail-head">
      <span class="avatar"><img src="${escapeHtml(person.photo || avatarSvg(person.name, index))}" alt="${escapeHtml(person.name)}"></span>
      <div>
        <p class="eyebrow">پرونده خانوادگی</p>
        <h2>${escapeHtml(person.name)}</h2>
        <div class="detail-meta">
          ${dates.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
          ${gender !== "unknown" ? `<span>جنسیت: ${genderLabel(gender)}</span>` : ""}
          ${parents?.length ? `<span>والدین: ${escapeHtml(parents.join(" و "))}</span>` : ""}
          ${spouses?.length ? `<span>${spouses.length > 1 ? "همسران" : "همسر"}: ${escapeHtml(spouses.join("، "))}</span>` : ""}
        </div>
      </div>
    </div>
    ${person.story ? `<p>${escapeHtml(person.story)}</p>` : ""}
    ${media.length ? `<div class="detail-gallery">${media.map((item) => mediaPreviewMarkup(item, person.name)).join("")}</div>` : ""}
    <section class="detail-admin-tools admin-only">
      <div class="detail-admin-head">
        <div>
          <p class="eyebrow">ابزار مدیر</p>
          <h3>ویرایش همین کارت</h3>
        </div>
        <div class="detail-admin-buttons">
          <button class="soft-action" type="button" data-detail-edit-person>ویرایش کارت</button>
          <button class="soft-action" type="button" data-detail-add-relative="spouse">افزودن همسر</button>
          <button class="soft-action" type="button" data-detail-add-relative="child">افزودن فرزند</button>
          <button class="soft-action" type="button" data-detail-add-relative="parent" ${(person.parentIds || []).length >= 2 ? "disabled" : ""}>افزودن والد</button>
        </div>
      </div>
      <form class="detail-upload-form" data-detail-media-form>
        <div class="form-grid">
          <label>بارگذاری عکس اصلی
            <input name="detailHeadshotFile" type="file" accept="image/*">
          </label>
          <label>بارگذاری عکس یا ویدیو برای گالری
            <input name="detailMediaFiles" type="file" accept="image/*,video/*" multiple>
          </label>
        </div>
        <div class="form-actions">
          <button class="primary-action" type="submit">ذخیره رسانه</button>
        </div>
        <p class="form-message" data-detail-upload-message role="status"></p>
      </form>
    </section>
    <form class="request-form" data-request-form>
      <h3>پیشنهاد اصلاح برای مدیران</h3>
      <div class="form-grid">
        <label>نام شما
          <input name="name" type="text" required>
        </label>
        <label>راه تماس
          <input name="contact" type="text" placeholder="ایمیل یا تلفن">
        </label>
      </div>
      <label>درخواست اصلاح یا اطلاعات پیشنهادی
        <textarea name="message" rows="4" required></textarea>
      </label>
      <label>ارسال عکس یا ویدیو برای بررسی
        <input name="media" type="file" accept="image/*,video/*" multiple>
      </label>
      <div class="form-actions">
        <button class="primary-action" type="submit">ارسال برای بررسی</button>
      </div>
      <p class="form-message" data-request-message role="status"></p>
    </form>
  `;
  const requestForm = $("[data-request-form]", detail);
  requestForm.addEventListener("submit", handleSubmissionRequest);
  bindPersonDetailAdminTools(detail, person);
  $("#personDialog").showModal();
}

function bindPersonDetailAdminTools(detail, person) {
  const editButton = $("[data-detail-edit-person]", detail);
  if (editButton) {
    editButton.addEventListener("click", () => {
      closeDialog("#personDialog");
      openPersonEditor(person.id);
    });
  }

  $$("[data-detail-add-relative]", detail).forEach((button) => {
    button.addEventListener("click", () => {
      closeDialog("#personDialog");
      openRelativeEditor(person.id, button.dataset.detailAddRelative);
    });
  });

  const uploadForm = $("[data-detail-media-form]", detail);
  if (uploadForm) uploadForm.addEventListener("submit", handleDetailMediaUpload);
}

async function handleDetailMediaUpload(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const fields = form.elements;
  const message = $("[data-detail-upload-message]", form);
  const person = state.people.find((item) => item.id === selectedPersonId);
  if (!person) return;

  message.textContent = "در حال ذخیره رسانه...";
  try {
    const previousPhoto = person.photo;
    const previousMedia = [...(person.media || [])];
    const headshotMedia = fields.detailHeadshotFile.files?.[0] ? await fileToMedia(fields.detailHeadshotFile.files[0]) : null;
    const uploadedMedia = await filesToMedia(fields.detailMediaFiles.files);
    if (!headshotMedia && !uploadedMedia.length) {
      message.textContent = "ابتدا یک عکس یا ویدیو انتخاب کنید.";
      return;
    }

    if (headshotMedia) person.photo = headshotMedia.src;
    person.media = uniqueMedia([...(person.media || []), ...uploadedMedia]);
    try {
      saveState();
    } catch {
      person.photo = previousPhoto;
      person.media = previousMedia;
      message.textContent = "حجم فایل‌ها برای ذخیره در این نسخه زیاد است.";
      return;
    }
    refreshAll();
    const personId = person.id;
    closeDialog("#personDialog");
    openPerson(personId);
    const refreshedMessage = $("[data-detail-upload-message]", $("#personDetail"));
    if (refreshedMessage) refreshedMessage.textContent = "رسانه با موفقیت ذخیره شد.";
  } catch (error) {
    message.textContent = error.message || "ذخیره رسانه انجام نشد.";
  }
}

async function handleSubmissionRequest(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const fields = form.elements;
  const message = $("[data-request-message]", form);
  const person = state.people.find((item) => item.id === selectedPersonId);
  if (!person) return;
  if (!fields.name.value.trim() || !fields.message.value.trim()) {
    message.textContent = "نام و متن درخواست را کامل وارد کنید.";
    return;
  }

  message.textContent = "در حال ثبت درخواست...";
  try {
    const media = await filesToMedia(fields.media.files);
    const submission = normalizeSubmission({
      id: makeId("s"),
      personId: person.id,
      personName: person.name,
      name: fields.name.value.trim(),
      contact: fields.contact.value.trim(),
      message: fields.message.value.trim(),
      media,
      status: "pending",
      createdAt: new Date().toISOString(),
    });
    state.submissions.unshift(submission);
    try {
      saveState();
    } catch {
      state.submissions = state.submissions.filter((item) => item.id !== submission.id);
      message.textContent = "حجم فایل‌ها برای ذخیره در این نسخه زیاد است.";
      return;
    }
    form.reset();
    message.textContent = "درخواست شما برای مدیران ثبت شد.";
    renderSubmissions();
  } catch (error) {
    message.textContent = error.message || "ثبت درخواست انجام نشد.";
  }
}

function handleArticleComment(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const fields = form.elements;
  const message = $("[data-article-comment-message]", form);
  const article = findHistoryArticle();
  if (!article) return;
  if (!fields.name.value.trim() || !fields.message.value.trim()) {
    message.textContent = "نام و متن نظر را کامل وارد کنید.";
    return;
  }
  const comment = normalizeArticleComment({
    id: makeId("ac"),
    articleId: article.id,
    articleTitle: article.title,
    name: fields.name.value.trim(),
    contact: fields.contact.value.trim(),
    message: fields.message.value.trim(),
    status: "pending",
    createdAt: new Date().toISOString(),
  });
  state.articleComments.unshift(comment);
  saveState();
  form.reset();
  renderArticlePage();
  const refreshedMessage = $("[data-article-comment-message]");
  if (refreshedMessage) refreshedMessage.textContent = "نظر شما برای مدیران ثبت شد.";
}

function updateArticleCommentStatus(commentId, status) {
  const comment = state.articleComments.find((item) => item.id === commentId);
  if (!comment) return;
  comment.status = status;
  saveState();
  renderArticlePage();
}

function deleteArticleComment(commentId) {
  state.articleComments = state.articleComments.filter((item) => item.id !== commentId);
  saveState();
  renderArticlePage();
}

function renderGallery() {
  const grid = $("#galleryGrid");
  grid.innerHTML = "";
  state.gallery.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "gallery-card";
    const imageSrc = item.src || gallerySvg(item.title, item.palette || colors[index % colors.length]);
    card.innerHTML = `
      <img src="${escapeHtml(imageSrc)}" alt="${escapeHtml(item.title)}" loading="lazy" decoding="async">
      <div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.caption || "")}</p>
      </div>
    `;
    grid.appendChild(card);
  });
}

function historyFigureMarkup(figure, article, index) {
  const safeFigure = normalizeHistoryFigure(figure);
  if (!safeFigure) return "";
  const src = safeFigure.src || gallerySvg(safeFigure.title || article.title, colors[index % colors.length]);
  const media =
    safeFigure.type === "video" && safeFigure.src
      ? `<video src="${escapeHtml(src)}" controls preload="metadata"></video>`
      : `<img src="${escapeHtml(src)}" alt="${escapeHtml(safeFigure.title || article.title)}" loading="lazy" decoding="async">`;
  const caption = [safeFigure.title, safeFigure.caption].filter(Boolean).join(" - ");
  return `
    <figure class="history-figure">
      ${media}
      ${caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : ""}
    </figure>
  `;
}

function historyListItemMarkup(article) {
  return `
    <article class="history-index-item">
      <time>${escapeHtml(article.date || "بدون تاریخ")}</time>
      <h2>${escapeHtml(article.title)}</h2>
      <button class="soft-action" type="button" data-read-article="${escapeHtml(article.id)}">خواندن</button>
    </article>
  `;
}

function historyArticleDetailMarkup(article) {
  const figures = article.figures.length
    ? `<div class="history-figures">${article.figures.map((figure, figureIndex) => historyFigureMarkup(figure, article, figureIndex)).join("")}</div>`
    : "";
  const references = article.references.length
    ? `
      <section class="article-references">
        <h4>منابع</h4>
        <ol>${article.references.map((reference) => `<li>${escapeHtml(reference)}</li>`).join("")}</ol>
      </section>
    `
    : "";
  return `
    <article class="history-article">
      <div class="article-body">
        <header class="article-head">
          <time>${escapeHtml(article.date || "بدون تاریخ")}</time>
          <h2>${escapeHtml(article.title)}</h2>
          <p>نویسنده: ${escapeHtml(article.author || "دبیرخانه خاندان")}</p>
        </header>
        ${article.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
        ${figures}
        ${references}
      </div>
    </article>
  `;
}

function renderHistory() {
  const articles = sortedHistoryArticles();
  $("#historyContent").innerHTML = articles.length
    ? articles.map(historyListItemMarkup).join("")
    : `<p class="empty-state">هنوز مقاله ای برای این بخش ثبت نشده است.</p>`;
  $$("[data-read-article]").forEach((button) => {
    button.addEventListener("click", () => routeTo("article", { articleId: button.dataset.readArticle }));
  });
}

function articleCommentsFor(articleId) {
  return (state.articleComments || [])
    .filter((comment) => comment.articleId === articleId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function articleCommentStatusLabel(status) {
  return (
    {
      pending: "در انتظار بررسی",
      done: "انجام شد",
    }[status] || "ثبت شده"
  );
}

function articleCommentsMarkup(article) {
  const comments = articleCommentsFor(article.id);
  if (!comments.length) return `<div class="empty-state">هنوز نظری برای این مقاله ثبت نشده است.</div>`;
  return comments
    .map(
      (comment) => `
        <article class="submission-card status-${escapeHtml(comment.status || "pending")}">
          <div class="submission-head">
            <div>
              <p class="eyebrow">${escapeHtml(articleCommentStatusLabel(comment.status))}</p>
              <h3>${escapeHtml(comment.name || "فرستنده بدون نام")}</h3>
            </div>
            <span>${escapeHtml(formatDateTime(comment.createdAt))}</span>
          </div>
          <div class="submission-meta">
            ${comment.contact ? `<span>تماس: ${escapeHtml(comment.contact)}</span>` : ""}
          </div>
          <p>${escapeHtml(comment.message)}</p>
          <div class="form-actions">
            <button class="primary-action" type="button" data-resolve-article-comment="${escapeHtml(comment.id)}">انجام شد</button>
            <button class="danger-action" type="button" data-delete-article-comment="${escapeHtml(comment.id)}">حذف</button>
          </div>
        </article>
      `
    )
    .join("");
}

function renderArticlePage() {
  const article = findHistoryArticle();
  const title = $("#articlePageTitle");
  const page = $("#articlePage");
  if (!page || !title) return;
  if (!article) {
    title.textContent = "مقاله پیدا نشد";
    page.innerHTML = `
      <div class="empty-state">این مقاله پیدا نشد.</div>
    `;
    return;
  }

  title.textContent = article.title;
  page.innerHTML = `
    <div class="article-detail-panel">
      ${historyArticleDetailMarkup(article)}
    </div>
    <section class="article-comment-box">
      <h2>ارسال نظر برای مدیران</h2>
      <p class="muted">اگر درباره این مقاله اصلاح، توضیح، منبع یا نکته ای دارید، اینجا برای مدیران ثبت کنید.</p>
      <form class="article-comment-form" data-article-comment-form>
        <div class="form-grid">
          <label>نام
            <input name="name" type="text" required />
          </label>
          <label>ایمیل یا شماره تماس
            <input name="contact" type="text" />
          </label>
        </div>
        <label>نظر برای مدیران
          <textarea name="message" rows="4" required></textarea>
        </label>
        <button class="primary-action" type="submit">ثبت نظر</button>
        <p class="form-message" data-article-comment-message role="status"></p>
      </form>
    </section>
    <section class="article-admin-comments admin-only">
      <div class="detail-admin-head">
        <h2>نظرهای ثبت شده برای این مقاله</h2>
        <p class="muted">این بخش فقط برای مدیران دیده می شود.</p>
      </div>
      <div class="submission-list">${articleCommentsMarkup(article)}</div>
    </section>
  `;
  const commentForm = $("[data-article-comment-form]", page);
  if (commentForm) commentForm.addEventListener("submit", handleArticleComment);
  $$("[data-resolve-article-comment]", page).forEach((button) => {
    button.addEventListener("click", () => updateArticleCommentStatus(button.dataset.resolveArticleComment, "done"));
  });
  $$("[data-delete-article-comment]", page).forEach((button) => {
    button.addEventListener("click", () => deleteArticleComment(button.dataset.deleteArticleComment));
  });
}

function openHistoryEditor(articleId = "") {
  const form = $("#historyEditor");
  const title = $("#historyEditorTitle");
  form.reset();
  form.elements.articleId.value = articleId;
  const article = articleId ? findHistoryArticle(articleId) : null;
  if (!article) {
    title.textContent = "افزودن مقاله تاریخی";
    form.elements.author.value = session.email || "دبیرخانه خاندان";
    form.elements.sortDate.value = new Date().toISOString().slice(0, 10);
    form.elements.date.value = tabariDateFromIso(form.elements.sortDate.value);
    $("#historyEditorDialog").showModal();
    return;
  }

  const firstFigure = article.figures[0] || {};
  title.textContent = "ویرایش مقاله تاریخی";
  form.elements.title.value = article.title;
  form.elements.author.value = article.author;
  form.elements.date.value = article.date;
  form.elements.sortDate.value = article.sortDate || "";
  form.elements.body.value = article.body.join("\n\n");
  form.elements.figureTitle.value = firstFigure.title || "";
  form.elements.figureSrc.value = firstFigure.src || "";
  form.elements.figureCaption.value = firstFigure.caption || "";
  form.elements.references.value = article.references.join("\n");
  $("#historyEditorDialog").showModal();
}

function updateAdminStatus() {
  document.body.classList.toggle("admin-mode", isAdmin());
  const loginButton = $("[data-open-login]");
  if (loginButton) loginButton.textContent = isAdmin() ? "پنل مدیر" : "ورود مدیر";
}

function personOptions(selectedId = "", includeEmpty = true) {
  const selectedIds = new Set(Array.isArray(selectedId) ? selectedId.filter(Boolean) : selectedId ? [selectedId] : []);
  const empty = includeEmpty ? `<option value="">انتخاب نشده</option>` : "";
  return (
    empty +
    state.people
      .map((person) => `<option value="${person.id}" ${selectedIds.has(person.id) ? "selected" : ""}>${person.name}</option>`)
      .join("")
  );
}

function selectedSelectValues(select) {
  return Array.from(select.selectedOptions)
    .map((option) => option.value)
    .filter(Boolean);
}

function nextAvailableSlot(generation, preferredSlot, excludeId = "") {
  const occupied = new Set(
    state.people
      .filter((person) => person.id !== excludeId && Number(person.generation || 0) === generation)
      .map((person) => Number(person.slot || 0))
  );
  const normalized = Math.min(MAX_TREE_SLOT, Math.max(0, Number(preferredSlot || 0)));
  for (let offset = 0; offset <= MAX_TREE_SLOT; offset += 1) {
    const candidates = offset === 0 ? [normalized] : [normalized + offset, normalized - offset];
    const match = candidates.find((slot) => slot >= 0 && slot <= MAX_TREE_SLOT && !occupied.has(slot));
    if (match !== undefined) return match;
  }
  return normalized;
}

function nextRootSlot() {
  const rootSlots = state.people
    .filter((person) => Number(person.generation || 0) === 0 && !(person.parentIds || []).length)
    .map((person) => Number(person.slot || 0));
  const preferredSlot = rootSlots.length ? Math.max(...rootSlots) + 2 : 0;
  return nextAvailableSlot(0, preferredSlot);
}

function fillRelativeForm(baseId, relation) {
  const base = state.people.find((person) => person.id === baseId);
  const form = $("#personEditor");
  const fields = form.elements;
  if (!base) return;

  clearPersonForm();
  pendingRelationship = { type: relation, baseId };
  const baseGeneration = Number(base.generation || 0);
  const baseSlot = Number(base.slot || 0);
  const spouseId = base.spouseIds?.[0] || "";
  const suggestedSpouseGender = oppositeSpouseGender(normalizeGender(base.gender));

  if (relation === "spouse") {
    $("#personEditorTitle").textContent = `افزودن همسر برای ${base.name}`;
    fields.generation.value = baseGeneration;
    fields.gender.value = suggestedSpouseGender;
    fields.slot.value = nextAvailableSlot(baseGeneration, preferredSpouseSlot(base, suggestedSpouseGender));
    fields.spouseId.innerHTML = personOptions([base.id], false);
  }

  if (relation === "child") {
    const generation = baseGeneration + 1;
    $("#personEditorTitle").textContent = `افزودن فرزند برای ${base.name}`;
    fields.generation.value = generation;
    fields.slot.value = nextAvailableSlot(generation, baseSlot);
    const parentIds = orderedParentIds([base.id, spouseId]);
    fields.parentOne.innerHTML = personOptions(parentIds[0] || base.id);
    fields.parentTwo.innerHTML = personOptions(parentIds[1] || "");
  }

  if (relation === "parent") {
    const generation = Math.max(0, baseGeneration - 1);
    $("#personEditorTitle").textContent = `افزودن والد برای ${base.name}`;
    fields.generation.value = generation;
    fields.slot.value = nextAvailableSlot(generation, baseSlot);
  }
}

function applyPendingRelationship(person) {
  if (!pendingRelationship || pendingRelationship.type !== "parent") return;
  const child = state.people.find((item) => item.id === pendingRelationship.baseId);
  if (!child) return;
  const parentIds = child.parentIds || [];
  if (parentIds.includes(person.id)) return;
  if (parentIds.length < 2) {
    parentIds.push(person.id);
  }
  child.parentIds = orderedParentIds(parentIds);
}

function submissionStatusLabel(status) {
  return (
    {
      pending: "در انتظار بررسی",
      approved: "رسانه افزوده شد",
      headshot: "عکس اصلی به‌روز شد",
      done: "انجام شد",
    }[status] || "ثبت شده"
  );
}

function renderSubmissions() {
  const list = $("#submissionsList");
  if (!list) return;
  list.innerHTML = "";

  const submissions = (state.submissions || [])
    .slice()
    .sort((a, b) => {
      const statusOrder = { pending: 0, approved: 1, headshot: 1, done: 2 };
      return (statusOrder[a.status] ?? 3) - (statusOrder[b.status] ?? 3) || new Date(b.createdAt) - new Date(a.createdAt);
    });

  if (!submissions.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "هنوز درخواستی ثبت نشده است.";
    list.appendChild(empty);
    return;
  }

  submissions.forEach((submission) => {
    const person = state.people.find((item) => item.id === submission.personId);
    const media = (submission.media || []).map(normalizeMediaItem).filter(Boolean);
    const firstImage = media.find((item) => item.type === "image");
    const card = document.createElement("article");
    card.className = `submission-card status-${submission.status || "pending"}`;
    card.innerHTML = `
      <div class="submission-head">
        <div>
          <p class="eyebrow">${escapeHtml(submissionStatusLabel(submission.status))}</p>
          <h3>${escapeHtml(person?.name || submission.personName || "فرد حذف شده")}</h3>
        </div>
        <span>${escapeHtml(formatDateTime(submission.createdAt))}</span>
      </div>
      <div class="submission-meta">
        ${submission.name ? `<span>فرستنده: ${escapeHtml(submission.name)}</span>` : ""}
        ${submission.contact ? `<span>تماس: ${escapeHtml(submission.contact)}</span>` : ""}
      </div>
      <p>${escapeHtml(submission.message)}</p>
      ${media.length ? `<div class="submission-media">${media.map((item) => mediaPreviewMarkup(item, submission.personName)).join("")}</div>` : ""}
      <div class="form-actions">
        <button class="soft-action" type="button" data-add-submission-media ${!person || !media.length ? "disabled" : ""}>افزودن رسانه به گالری فرد</button>
        <button class="soft-action" type="button" data-use-submission-headshot ${!person || !firstImage ? "disabled" : ""}>اولین عکس به عنوان عکس اصلی</button>
        <button class="primary-action" type="button" data-resolve-submission>انجام شد</button>
        <button class="danger-action" type="button" data-delete-submission>حذف</button>
      </div>
    `;
    $("[data-add-submission-media]", card).addEventListener("click", () => approveSubmissionMedia(submission.id, false));
    $("[data-use-submission-headshot]", card).addEventListener("click", () => approveSubmissionMedia(submission.id, true));
    $("[data-resolve-submission]", card).addEventListener("click", () => updateSubmissionStatus(submission.id, "done"));
    $("[data-delete-submission]", card).addEventListener("click", () => deleteSubmission(submission.id));
    list.appendChild(card);
  });
}

function approveSubmissionMedia(submissionId, useFirstImageAsHeadshot) {
  const submission = state.submissions.find((item) => item.id === submissionId);
  const person = state.people.find((item) => item.id === submission?.personId);
  if (!submission || !person) return;

  const media = (submission.media || []).map(normalizeMediaItem).filter(Boolean);
  if (!media.length) return;

  let mediaForGallery = media;
  if (useFirstImageAsHeadshot) {
    const firstImage = media.find((item) => item.type === "image");
    if (firstImage) {
      person.photo = firstImage.src;
      mediaForGallery = media.filter((item) => item.id !== firstImage.id);
      submission.status = "headshot";
    }
  } else {
    submission.status = "approved";
  }

  person.media = uniqueMedia([...(person.media || []), ...mediaForGallery]);
  submission.media = [];
  saveState();
  refreshAll();
}

function updateSubmissionStatus(submissionId, status) {
  const submission = state.submissions.find((item) => item.id === submissionId);
  if (!submission) return;
  submission.status = status;
  saveState();
  renderSubmissions();
}

function deleteSubmission(submissionId) {
  state.submissions = state.submissions.filter((item) => item.id !== submissionId);
  saveState();
  renderSubmissions();
}

function refreshAdminLists() {
  const peopleList = $("#peopleList");
  peopleList.innerHTML = "";
  state.people
    .slice()
    .sort((a, b) => a.generation - b.generation || a.slot - b.slot)
    .forEach((person) => {
      const row = document.createElement("div");
      row.className = "compact-row";
      row.innerHTML = `<span>${person.name}</span>`;
      peopleList.appendChild(row);
    });

  const adminsList = $("#adminsList");
  adminsList.innerHTML = "";
  state.admins.forEach((admin) => {
    const row = document.createElement("div");
    row.className = "compact-row";
    row.innerHTML = `<span>${admin.email}${admin.role === "owner" ? " - مالک" : ""}</span>`;
    if (admin.role !== "owner" && isOwner()) {
      const button = document.createElement("button");
      button.className = "danger-action";
      button.type = "button";
      button.textContent = "حذف";
      button.addEventListener("click", () => {
        state.admins = state.admins.filter((item) => item.email !== admin.email);
        saveState();
        refreshAdminLists();
      });
      row.appendChild(button);
    }
    adminsList.appendChild(row);
  });

  $$('select[name="spouseId"]').forEach((select) => {
    select.innerHTML = personOptions([], false);
  });
  $$('select[name="parentOne"], select[name="parentTwo"]').forEach((select) => {
    select.innerHTML = personOptions();
  });
  renderSubmissions();
}

function fillPersonForm(id) {
  const person = state.people.find((item) => item.id === id);
  const form = $("#personEditor");
  const fields = form.elements;
  if (!person) return;
  pendingRelationship = null;
  $("#personEditorTitle").textContent = "ویرایش فرد";
  fields.id.value = person.id;
  fields.name.value = person.name || "";
  fields.birth.value = person.birth || "";
  fields.gender.value = normalizeGender(person.gender);
  fields.death.value = person.death || "";
  fields.generation.value = person.generation ?? 0;
  fields.slot.value = person.slot ?? 0;
  fields.photo.value = person.photo || "";
  fields.headshotFile.value = "";
  fields.story.value = person.story || "";
  fields.photos.value = (person.photos || []).join("\n");
  fields.mediaFiles.value = "";
  fields.spouseId.innerHTML = personOptions(person.spouseIds || [], false);
  fields.parentOne.innerHTML = personOptions(person.parentIds?.[0] || "");
  fields.parentTwo.innerHTML = personOptions(person.parentIds?.[1] || "");
}

function clearPersonForm() {
  const form = $("#personEditor");
  const fields = form.elements;
  pendingRelationship = null;
  form.reset();
  $("#personEditorTitle").textContent = "افزودن فرد";
  fields.id.value = "";
  fields.gender.value = "unknown";
  fields.generation.value = 0;
  fields.slot.value = 0;
  fields.spouseId.innerHTML = personOptions([], false);
  fields.parentOne.innerHTML = personOptions();
  fields.parentTwo.innerHTML = personOptions();
}

function openPersonEditor(id = "") {
  if (!isAdmin()) {
    $("#loginDialog").showModal();
    return;
  }
  if (id) {
    fillPersonForm(id);
  } else {
    clearPersonForm();
  }
  $("#personEditorDialog").showModal();
}

function openRootEditor() {
  if (!isAdmin()) {
    $("#loginDialog").showModal();
    return;
  }
  clearPersonForm();
  const fields = $("#personEditor").elements;
  $("#personEditorTitle").textContent = "افزودن ریشه اصلی";
  fields.generation.value = 0;
  fields.slot.value = nextRootSlot();
  fields.parentOne.value = "";
  fields.parentTwo.value = "";
  fields.spouseId.innerHTML = personOptions([], false);
  $("#personEditorDialog").showModal();
}

function openRelativeEditor(baseId, relation) {
  if (!isAdmin()) {
    $("#loginDialog").showModal();
    return;
  }
  fillRelativeForm(baseId, relation);
  $("#personEditorDialog").showModal();
}

function openAdminPanel(tab = "admins") {
  refreshAdminLists();
  setAdminTab(tab);
  $("#adminDialog").showModal();
}

function closeDialog(selector) {
  const dialog = $(selector);
  if (dialog?.open) dialog.close();
}

function logoutAdmin() {
  saveSession(null);
  closeDialog("#adminDialog");
  closeDialog("#personEditorDialog");
  closeDialog("#personDialog");
  updateAdminStatus();
  renderTree();
}

function setAdminTab(tab) {
  $$(".admin-tabs .tab").forEach((button) => button.classList.toggle("active", button.dataset.adminTab === tab));
  $$("[data-admin-panel]").forEach((panel) => panel.classList.toggle("active", panel.dataset.adminPanel === tab));
}

function bindEvents() {
  $$("[data-route]").forEach((button) => button.addEventListener("click", () => routeTo(button.dataset.route)));
  $("[data-open-subscribe]").addEventListener("click", () => $("#subscribeDialog").showModal());
  $("[data-close-subscribe]").addEventListener("click", () => $("#subscribeDialog").close());
  $("[data-open-login]").addEventListener("click", () => (isAdmin() ? openAdminPanel() : $("#loginDialog").showModal()));
  $("[data-close-login]").addEventListener("click", () => $("#loginDialog").close());
  $("[data-close-admin]").addEventListener("click", () => $("#adminDialog").close());
  $("[data-close-person]").addEventListener("click", () => $("#personDialog").close());
  $("[data-close-person-editor]").addEventListener("click", () => $("#personEditorDialog").close());
  const openPersonButton = $("[data-open-person-editor]");
  if (openPersonButton) openPersonButton.addEventListener("click", () => openPersonEditor());
  const openRootButton = $("[data-open-root-editor]");
  if (openRootButton) openRootButton.addEventListener("click", openRootEditor);
  $("[data-admin-go-tree]").addEventListener("click", () => {
    $("#adminDialog").close();
    routeTo("tree");
  });
  $("[data-open-gallery-editor]").addEventListener("click", () => $("#galleryEditorDialog").showModal());
  $("[data-close-gallery-editor]").addEventListener("click", () => $("#galleryEditorDialog").close());
  $("[data-open-history-editor]").addEventListener("click", () => openHistoryEditor());
  $("[data-close-history-editor]").addEventListener("click", () => $("#historyEditorDialog").close());
  $("#historyEditor").elements.sortDate.addEventListener("change", (event) => {
    const fields = $("#historyEditor").elements;
    if (!fields.date.value.trim() || fields.date.value.includes("تبری")) {
      fields.date.value = tabariDateFromIso(event.currentTarget.value);
    }
  });
  $("[data-back-history]").addEventListener("click", () => routeTo("history"));
  $("[data-edit-current-article]").addEventListener("click", () => openHistoryEditor(selectedArticleId));
  $$("[data-logout]").forEach((button) => button.addEventListener("click", logoutAdmin));

  $("#familySearch").addEventListener("input", renderTree);
  $("[data-zoom-in]").addEventListener("click", () => setZoom(treeZoom + 0.1));
  $("[data-zoom-out]").addEventListener("click", () => setZoom(treeZoom - 0.1));
  $("[data-zoom-reset]").addEventListener("click", () => setZoom(1));

  $("#loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = form.elements;
    const returnRoute = parseRouteHash();
    const email = fields.email.value.trim().toLowerCase();
    const password = fields.password.value;
    const admin = state.admins.find((item) => item.email.toLowerCase() === email && item.password === password);
    if (!admin) {
      $("#loginMessage").textContent = "ایمیل یا رمز عبور درست نیست.";
      return;
    }
    saveSession({ email: admin.email });
    form.reset();
    $("#loginDialog").close();
    updateAdminStatus();
    renderTree();
    if (returnRoute.route === "article") {
      routeTo("article", { articleId: returnRoute.articleId });
    } else if (returnRoute.route === "history") {
      routeTo("history");
    } else {
      routeTo("tree");
    }
  });

  $("#subscribeForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = form.elements;
    state.subscribers.push({ name: fields.name.value.trim(), email: fields.email.value.trim(), date: new Date().toISOString() });
    saveState();
    form.reset();
    $("#subscribeMessage").textContent = "اشتراک ثبت شد.";
  });

  $("#personEditor").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = form.elements;
    const id = fields.id.value || `p${Date.now()}`;
    const existing = state.people.find((item) => item.id === id);
    const person = existing || { id, spouseIds: [], parentIds: [] };
    const spouseIds = selectedSelectValues(fields.spouseId).filter((spouseId) => spouseId !== id);
    let headshotMedia = null;
    let uploadedMedia = [];
    try {
      headshotMedia = fields.headshotFile.files?.[0] ? await fileToMedia(fields.headshotFile.files[0]) : null;
      uploadedMedia = await filesToMedia(fields.mediaFiles.files);
    } catch (error) {
      alert(error.message || "بارگذاری فایل انجام نشد.");
      return;
    }
    let generation = Number(fields.generation.value || 0);
    if (!existing && pendingRelationship?.type === "parent") {
      const child = state.people.find((item) => item.id === pendingRelationship.baseId);
      if (child) {
        const childGeneration = Number(child.generation || 0);
        if (generation >= childGeneration) {
          if (childGeneration === 0) {
            state.people.forEach((item) => {
              item.generation = Number(item.generation || 0) + 1;
            });
            generation = 0;
          } else {
            generation = childGeneration - 1;
          }
        }
      }
    }
    person.name = fields.name.value.trim();
    person.birth = fields.birth.value.trim();
    person.gender = normalizeGender(fields.gender.value);
    person.death = fields.death.value.trim();
    person.generation = generation;
    person.slot = Number(fields.slot.value || 0);
    person.photo = headshotMedia?.src || fields.photo.value.trim();
    person.story = fields.story.value.trim();
    person.photos = fields.photos.value.split(/\n+/).map((item) => item.trim()).filter(Boolean);
    person.media = uniqueMedia([...(person.media || []), ...uploadedMedia]);
    person.parentIds = orderedParentIds([fields.parentOne.value, fields.parentTwo.value]);
    person.spouseIds = Array.from(new Set(spouseIds));
    if (!existing) state.people.push(person);
    state.people.forEach((item) => {
      if (item.id === person.id) return;
      item.spouseIds = item.spouseIds || [];
      if (person.spouseIds.includes(item.id)) {
        if (!item.spouseIds.includes(person.id)) item.spouseIds.push(person.id);
      } else {
        item.spouseIds = item.spouseIds.filter((spouse) => spouse !== person.id);
      }
    });
    person.spouseIds.forEach((spouseId) => {
      const spouse = state.people.find((item) => item.id === spouseId);
      if (spouse) {
        spouse.spouseIds = spouse.spouseIds || [];
        if (!spouse.spouseIds.includes(person.id)) spouse.spouseIds.push(person.id);
        alignSpouseSlots(person, spouseId);
      }
    });
    applyPendingRelationship(person);
    pendingRelationship = null;
    saveState();
    selectedPersonId = id;
    const rootId = primaryRootForPerson(id);
    if (rootId) {
      activeRootId = rootId;
      const path = pathFromRootToPerson(rootId, id);
      path.slice(0, -1).forEach((pathId) => expandedPersonIds.add(pathId));
    }
    refreshAll();
    fillPersonForm(id);
    $("#personEditorDialog").close();
  });

  $("[data-clear-person-form]").addEventListener("click", clearPersonForm);
  $("[data-delete-person]").addEventListener("click", () => {
    const id = $("#personEditor").elements.id.value;
    if (!id) return;
    state.people = state.people.filter((item) => item.id !== id);
    state.people.forEach((person) => {
      person.spouseIds = (person.spouseIds || []).filter((item) => item !== id);
      person.parentIds = (person.parentIds || []).filter((item) => item !== id);
    });
    saveState();
    selectedPersonId = null;
    if (activeRootId === id) activeRootId = null;
    collapsePersonBranch(id);
    clearPersonForm();
    $("#personEditorDialog").close();
    refreshAll();
  });

  $("#adminEditor").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!isOwner()) return;
    const form = event.currentTarget;
    const fields = form.elements;
    const email = fields.email.value.trim().toLowerCase();
    const password = fields.password.value.trim();
    const existing = state.admins.find((item) => item.email.toLowerCase() === email);
    if (existing) {
      existing.password = password;
    } else {
      state.admins.push({ email, password, role: "admin" });
    }
    saveState();
    form.reset();
    refreshAdminLists();
  });

  $$(".admin-tabs .tab").forEach((button) => button.addEventListener("click", () => setAdminTab(button.dataset.adminTab)));

  $("#galleryEditor").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = form.elements;
    state.gallery.unshift({
      id: `g${Date.now()}`,
      title: fields.title.value.trim(),
      caption: fields.caption.value.trim(),
      src: fields.src.value.trim(),
      palette: colors[state.gallery.length % colors.length],
    });
    saveState();
    form.reset();
    $("#galleryEditorDialog").close();
    renderGallery();
  });

  $("#historyEditor").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = form.elements;
    const articleId = fields.articleId.value;
    const existing = articleId ? state.historyArticles.find((item) => item.id === articleId) : null;
    let uploadedFigure = null;
    try {
      uploadedFigure = fields.figureFile.files?.[0] ? await fileToMedia(fields.figureFile.files[0]) : null;
    } catch (error) {
      alert(error.message || "بارگذاری شکل انجام نشد.");
      return;
    }
    const figureSrc = fields.figureSrc.value.trim() || uploadedFigure?.src || "";
    const figureTitle = fields.figureTitle.value.trim();
    const figureCaption = fields.figureCaption.value.trim();
    const figures =
      figureSrc || figureTitle || figureCaption
        ? [
            {
              id: makeId("hf"),
              title: figureTitle,
              caption: figureCaption,
              src: figureSrc,
              type: uploadedFigure?.type || mediaTypeFromSource(figureSrc),
            },
          ]
        : [];
    const nextArticle = normalizeHistoryArticle({
      id: existing?.id || makeId("ha"),
      title: fields.title.value.trim(),
      author: fields.author.value.trim(),
      date: normalizeArticleDate(fields.date.value, fields.sortDate.value),
      sortDate: fields.sortDate.value,
      body: fields.body.value,
      figures,
      references: fields.references.value,
      createdAt: existing?.createdAt,
    });
    if (existing) {
      Object.assign(existing, nextArticle);
    } else {
      state.historyArticles.push(nextArticle);
    }
    state.historyArticles = state.historyArticles.filter(Boolean).sort(compareHistoryArticles);
    selectedArticleId = nextArticle.id;
    saveState();
    form.reset();
    $("#historyEditorDialog").close();
    refreshAll();
    routeTo("article", { articleId: nextArticle.id });
  });

  $("[data-export-data]").addEventListener("click", () => {
    $("#dataImport").value = JSON.stringify(state, null, 2);
    $("#dataMessage").textContent = "داده در کادر زیر آماده کپی است.";
  });
  $("[data-import-data]").addEventListener("click", () => {
    try {
      state = normalizeState(JSON.parse($("#dataImport").value));
      saveState();
      refreshAll();
      $("#dataMessage").textContent = "داده جایگزین شد.";
    } catch {
      $("#dataMessage").textContent = "ساختار JSON درست نیست.";
    }
  });
  $("[data-reset-data]").addEventListener("click", () => {
    state = normalizeState(clone(sampleState));
    saveState();
    refreshAll();
    $("#dataMessage").textContent = "داده آزمایشی بازگردانده شد.";
  });

  window.addEventListener("hashchange", () => {
    const next = parseRouteHash();
    if (VALID_ROUTES.includes(next.route)) routeTo(next.route, { articleId: next.articleId });
  });
  window.addEventListener("resize", fitTreeToStage);
}

function setZoom(value) {
  treeZoom = Math.min(1, Math.max(0.65, Number(value.toFixed(2))));
  fitTreeToStage();
}

function refreshAll() {
  renderTree();
  renderGallery();
  renderHistory();
  if (selectedArticleId) renderArticlePage();
  refreshAdminLists();
  updateAdminStatus();
}

function init() {
  bindEvents();
  clearPersonForm();
  renderTabariToday();
  refreshAll();
  const next = parseRouteHash();
  routeTo(VALID_ROUTES.includes(next.route) ? next.route : "home", { articleId: next.articleId });
}

init();
