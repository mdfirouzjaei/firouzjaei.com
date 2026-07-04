const OWNER_EMAIL = "mdfirouzjaei@gmail.com";
const DEFAULT_OWNER_PASSWORD = "April18!";
const LEGACY_OWNER_PASSWORDS = ["owner-demo-1403"];
const STORAGE_KEY = "firouzjaei-family-site-state-v1";
const SESSION_KEY = "firouzjaei-family-site-session-v1";
const MAX_LOCAL_UPLOAD_BYTES = 2 * 1024 * 1024;
const VALID_ROUTES = ["home", "tree", "gallery", "history"];
const TREE_CANVAS_WIDTH = 1420;
const TREE_CANVAS_HEIGHT = 760;
const MAX_TREE_SLOT = 24;
const NODE_BASE_X = 150;
const NODE_BASE_Y = 120;
const NODE_X_GAP = 190;
const NODE_Y_GAP = 250;
const GENDER_LABELS = {
  male: "مرد",
  female: "زن",
  unknown: "نامشخص",
};

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
      death: "۱۳۵۱",
      generation: 0,
      slot: 11,
      spouseIds: ["p16"],
      parentIds: [],
      story: "این شاخه مصنوعی برای نمایش خانواده هایی ساخته شده که از یک فرد مبدا دیگر آغاز می شوند.",
      photos: [],
    },
    {
      id: "p16",
      name: "همسر ریشه شاخه دوم",
      birth: "۱۲۸۹",
      death: "۱۳۶۲",
      generation: 0,
      slot: 12,
      spouseIds: ["p15"],
      parentIds: [],
      story: "با انتخاب شاخه اصلی می توانید فقط همین خانواده مستقل را ببینید.",
      photos: [],
    },
    {
      id: "p17",
      name: "فرزند شاخه دوم",
      birth: "۱۳۱۱",
      death: "",
      generation: 1,
      slot: 10,
      spouseIds: ["p18"],
      parentIds: ["p15", "p16"],
      story: "روی دکمه کوچک کنار کارت کلیک کنید تا فرزندان این فرد بسته یا باز شوند.",
      photos: [],
    },
    {
      id: "p18",
      name: "همسر فرزند شاخه دوم",
      birth: "۱۳۱۷",
      death: "",
      generation: 1,
      slot: 11,
      spouseIds: ["p17"],
      parentIds: [],
      story: "همسران در کنار شاخه انتخاب شده حفظ می شوند تا پیوند خانوادگی روشن بماند.",
      photos: [],
    },
    {
      id: "p19",
      name: "فرزند دوم شاخه دوم",
      birth: "۱۳۲۰",
      death: "",
      generation: 1,
      slot: 13,
      spouseIds: [],
      parentIds: ["p15", "p16"],
      story: "این فرد برای نشان دادن چند فرزند در یک شاخه مستقل اضافه شده است.",
      photos: [],
    },
    {
      id: "p20",
      name: "نوه شاخه دوم",
      birth: "۱۳۴۲",
      death: "",
      generation: 2,
      slot: 10,
      spouseIds: [],
      parentIds: ["p17", "p18"],
      story: "از داخل پنجره هر فرد می توانید به والدین، همسران و فرزندان حرکت کنید.",
      photos: [],
    },
    {
      id: "p21",
      name: "نوه دوم شاخه دوم",
      birth: "۱۳۴۸",
      death: "",
      generation: 2,
      slot: 12,
      spouseIds: [],
      parentIds: ["p17", "p18"],
      story: "این کارت برای تست حرکت پایین به فرزندان و تمرکز روی شاخه استفاده می شود.",
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
  history:
    "این متن نمونه برای صفحه تاریخچه است. در نسخه نهایی، می توانید روایت رسمی خانواده، نام روستاها، شاخه های اصلی، خاطرات بزرگان و رویدادهای مهم را اینجا وارد کنید.\n\nهدف این وب سایت این است که هر نسل بتواند با احترام به گذشته، اطلاعات خانوادگی را به شکلی مرتب، خوانا و قابل نگهداری ببیند. درخت خانوادگی، گالری عکس و تاریخچه در کنار هم یک دفتر زنده می سازند؛ دفتری که هم رسمی است و هم برای خانواده صمیمی و قابل استفاده می ماند.",
};

let state = loadState();
let session = loadSession();
let selectedPersonId = null;
let treeScale = 1;
let treeZoom = 1;
let pendingRelationship = null;
let treeFocusId = "";
let collapsedPersonIds = new Set();
let currentTreePositions = new Map();
let currentTreePeople = [];

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
    p19: "female",
    p20: "male",
    p21: "female",
  };
  return sampleGenders[person.id] || "unknown";
}

function normalizeState(value) {
  const normalized = { ...clone(sampleState), ...value };
  if (!Array.isArray(normalized.people) || !normalized.people.length) {
    normalized.people = clone(sampleState.people);
  }
  const looksLikeDemoData = normalized.people.some((person) => person.id === "p1" && person.name === "بزرگ خاندان");
  if (looksLikeDemoData) {
    const existingIds = new Set(normalized.people.map((person) => person.id));
    clone(sampleState.people).forEach((person) => {
      if (!existingIds.has(person.id)) normalized.people.push(person);
    });
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
  normalized.submissions = (normalized.submissions || []).map(normalizeSubmission).filter(Boolean);
  return normalized;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return normalizeState(clone(sampleState));
  try {
    const loadedState = normalizeState(JSON.parse(raw));
    const owner = loadedState.admins.find((admin) => admin.email.toLowerCase() === OWNER_EMAIL);
    if (owner && LEGACY_OWNER_PASSWORDS.includes(owner.password)) {
      owner.password = DEFAULT_OWNER_PASSWORD;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(loadedState));
    }
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

function routeTo(route) {
  $$(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.route === route));
  $$(".view").forEach((view) => view.classList.toggle("active", view.dataset.view === route));
  if (route === "tree") requestAnimationFrame(fitTreeToStage);
  if (window.location.hash !== `#${route}`) window.location.hash = route;
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

function descendantCount(personId) {
  const visited = new Set();
  collectDescendantIds(personId, visited, false);
  return visited.size;
}

function collectDescendantIds(personId, ids, respectCollapsed = true, visited = new Set()) {
  if (visited.has(personId)) return;
  visited.add(personId);
  if (respectCollapsed && collapsedPersonIds.has(personId)) return;
  childPeopleOf(personId).forEach((child) => {
    if (!ids.has(child.id)) ids.add(child.id);
    collectDescendantIds(child.id, ids, respectCollapsed, visited);
  });
}

function collectAncestorIds(personId, ids, visited = new Set()) {
  if (visited.has(personId)) return;
  visited.add(personId);
  const person = personById(personId);
  if (!person) return;
  (person.parentIds || []).forEach((parentId) => {
    const parent = personById(parentId);
    if (!parent) return;
    ids.add(parent.id);
    collectAncestorIds(parent.id, ids, visited);
  });
}

function expandIdsWithSpouses(ids) {
  let changed = true;
  while (changed) {
    changed = false;
    Array.from(ids).forEach((id) => {
      const person = personById(id);
      (person?.spouseIds || []).forEach((spouseId) => {
        if (personById(spouseId) && !ids.has(spouseId)) {
          ids.add(spouseId);
          changed = true;
        }
      });
    });
  }
}

function hiddenTreeIdsFromCollapsed() {
  const hidden = new Set();
  collapsedPersonIds.forEach((id) => collectDescendantIds(id, hidden, false));

  let changed = true;
  while (changed) {
    changed = false;
    state.people.forEach((person) => {
      if (hidden.has(person.id) || collapsedPersonIds.has(person.id)) return;
      const hasHiddenSpouse = (person.spouseIds || []).some((spouseId) => hidden.has(spouseId));
      if (!hasHiddenSpouse) return;
      const hasVisibleParent = (person.parentIds || []).some((parentId) => !hidden.has(parentId));
      const hasVisibleChild = childPeopleOf(person.id).some((child) => !hidden.has(child.id));
      if (!hasVisibleParent && !hasVisibleChild) {
        hidden.add(person.id);
        changed = true;
      }
    });
  }

  return hidden;
}

function visibleTreePeople() {
  if (treeFocusId && !personById(treeFocusId)) treeFocusId = "";

  if (treeFocusId) {
    const ids = new Set([treeFocusId]);
    collectAncestorIds(treeFocusId, ids);
    collectDescendantIds(treeFocusId, ids, true);
    expandIdsWithSpouses(ids);
    return sortTreePeople(state.people.filter((person) => ids.has(person.id)));
  }

  const hidden = hiddenTreeIdsFromCollapsed();
  return sortTreePeople(state.people.filter((person) => !hidden.has(person.id)));
}

function rootPeople() {
  const roots = state.people.filter((person) => !(person.parentIds || []).length);
  return sortTreePeople(roots.length ? roots : state.people);
}

function focusTreeOnPerson(personId) {
  if (!personById(personId)) return;
  treeFocusId = personId;
  selectedPersonId = personId;
  collapsedPersonIds.delete(personId);
  renderTree();
  routeTo("tree");
}

function moveTreeSelection(direction) {
  const current = personById(selectedPersonId || treeFocusId);
  if (!current) return;
  const target =
    direction === "parent"
      ? (current.parentIds || []).map(personById).filter(Boolean)[0]
      : childPeopleOf(current.id)[0];
  if (target) focusTreeOnPerson(target.id);
}

function renderTreeNavigation() {
  const rootSelect = $("#treeRootSelect");
  const focusNote = $("#treeFocusNote");
  if (!rootSelect || !focusNote) return;

  const roots = rootPeople();
  const options = [`<option value="">همه شاخه ها</option>`];
  roots.forEach((person) => {
    options.push(`<option value="${escapeHtml(person.id)}">${escapeHtml(person.name)}</option>`);
  });
  if (treeFocusId && !roots.some((person) => person.id === treeFocusId)) {
    const focused = personById(treeFocusId);
    if (focused) options.push(`<option value="${escapeHtml(focused.id)}">${escapeHtml(focused.name)} - شاخه انتخاب شده</option>`);
  }
  rootSelect.innerHTML = options.join("");
  rootSelect.value = treeFocusId || "";

  const selected = personById(selectedPersonId || treeFocusId);
  const focused = personById(treeFocusId);
  const parentButton = $("[data-tree-focus-parent]");
  const childButton = $("[data-tree-focus-child]");
  const selectedButton = $("[data-tree-focus-selected]");
  if (parentButton) parentButton.disabled = !selected || !(selected.parentIds || []).length;
  if (childButton) childButton.disabled = !selected || !childPeopleOf(selected.id).length;
  if (selectedButton) selectedButton.disabled = !selected;

  const hiddenCount = hiddenTreeIdsFromCollapsed().size;
  const focusText = focused ? `نمایش شاخه: ${focused.name}` : "نمایش همه شاخه های اصلی";
  focusNote.textContent = hiddenCount ? `${focusText}، ${hiddenCount} نفر در شاخه های بسته پنهان هستند.` : focusText;
}

function treePositions(people = state.people) {
  const positions = new Map();
  const generationMap = new Map();
  const minGeneration = people.length ? Math.min(...people.map((person) => Number(person.generation || 0))) : 0;
  const minSlot = people.length ? Math.min(...people.map((person) => Math.max(0, Number(person.slot || 0)))) : 0;
  people.forEach((person) => {
    const generation = Number(person.generation || 0);
    generationMap.set(generation, [...(generationMap.get(generation) || []), person]);
  });

  generationMap.forEach((generationPeople) => {
    let nextSlot = -1;
    generationPeople
      .slice()
      .sort(
        (a, b) =>
          Number(a.slot || 0) - Number(b.slot || 0) ||
          genderSortValue(a) - genderSortValue(b) ||
          a.name.localeCompare(b.name, "fa")
      )
      .forEach((person) => {
        const requestedSlot = Math.max(0, Number(person.slot || 0) - minSlot);
        const displaySlot = Math.max(requestedSlot, nextSlot + 1);
        nextSlot = displaySlot;
        positions.set(person.id, nodePosition({ ...person, generation: generation - minGeneration, slot: displaySlot }));
      });
  });

  return positions;
}

function treeCanvasSize(positions = treePositions()) {
  const positionList = Array.from(positions.values());
  if (!positionList.length) return { width: TREE_CANVAS_WIDTH, height: TREE_CANVAS_HEIGHT };
  const minWidth = treeFocusId ? 760 : TREE_CANVAS_WIDTH;
  return {
    width: Math.max(minWidth, Math.max(...positionList.map((position) => position.x)) + 230),
    height: Math.max(TREE_CANVAS_HEIGHT, Math.max(...positionList.map((position) => position.y)) + 220),
  };
}

function renderTree() {
  const nodes = $("#treeNodes");
  const lines = $("#treeLines");
  const template = $("#nodeTemplate");
  const searchTerm = $("#familySearch").value.trim();
  nodes.innerHTML = "";
  lines.innerHTML = "";

  if (selectedPersonId && !personById(selectedPersonId)) selectedPersonId = null;
  const people = visibleTreePeople();
  const positions = treePositions(people);
  currentTreePeople = people;
  currentTreePositions = positions;
  renderTreeNavigation();

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
    if (searchTerm && !person.name.includes(searchTerm)) node.classList.add("dimmed");

    const avatar = $(".avatar", node);
    const image = document.createElement("img");
    image.alt = person.name;
    image.src = person.photo || avatarSvg(person.name, index);
    avatar.appendChild(image);
    $(".person-name", node).textContent = person.name;
    const toggleButton = $("[data-toggle-branch]", node);
    const descendantTotal = descendantCount(person.id);
    if (descendantTotal) {
      const isCollapsed = collapsedPersonIds.has(person.id);
      node.classList.toggle("collapsed", isCollapsed);
      $("[data-branch-symbol]", toggleButton).textContent = isCollapsed ? "+" : "−";
      $("[data-branch-count]", toggleButton).textContent = descendantTotal;
      toggleButton.title = isCollapsed ? "باز کردن شاخه" : "بستن شاخه";
      toggleButton.setAttribute("aria-label", toggleButton.title);
      toggleButton.addEventListener("click", (event) => {
        event.stopPropagation();
        if (collapsedPersonIds.has(person.id)) {
          collapsedPersonIds.delete(person.id);
        } else {
          collapsedPersonIds.add(person.id);
        }
        renderTree();
      });
    } else {
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

  const positions = currentTreePositions.size ? currentTreePositions : treePositions(visibleTreePeople());
  const { width, height } = treeCanvasSize(positions);
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
  const parentPeople = (person.parentIds || []).map(personById).filter(Boolean);
  const spousePeople = (person.spouseIds || []).map(personById).filter(Boolean);
  const childrenPeople = childPeopleOf(person.id);
  const parents = parentPeople.map((item) => item.name);
  const spouses = spousePeople.map((item) => item.name);
  const media = personMedia(person);
  const navGroups = [
    ["بالا: والدین", parentPeople],
    ["همسران", spousePeople],
    ["پایین: فرزندان", childrenPeople],
  ].filter(([, items]) => items.length);
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
    <section class="detail-branch-nav">
      <div class="detail-branch-head">
        <div>
          <p class="eyebrow">ناوبری شاخه</p>
          <h3>حرکت در خانواده این فرد</h3>
        </div>
        <button class="soft-action" type="button" data-focus-person-branch>نمایش شاخه این فرد</button>
      </div>
      ${
        navGroups.length
          ? navGroups
              .map(
                ([label, items]) => `
          <div class="detail-link-group">
            <span>${label}</span>
            <div>
              ${items
                .map((item) => `<button class="link-chip" type="button" data-open-person-link="${escapeHtml(item.id)}">${escapeHtml(item.name)}</button>`)
                .join("")}
            </div>
          </div>`
              )
              .join("")
          : `<p class="muted">برای این فرد هنوز پیوند بالادست یا پایین دست ثبت نشده است.</p>`
      }
    </section>
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
  bindPersonDetailNavigation(detail, person);
  bindPersonDetailAdminTools(detail, person);
  $("#personDialog").showModal();
}

function bindPersonDetailNavigation(detail, person) {
  $("[data-focus-person-branch]", detail).addEventListener("click", () => {
    closeDialog("#personDialog");
    focusTreeOnPerson(person.id);
  });

  $$("[data-open-person-link]", detail).forEach((button) => {
    button.addEventListener("click", () => {
      const nextId = button.dataset.openPersonLink;
      selectedPersonId = nextId;
      collapsedPersonIds.delete(nextId);
      openPerson(nextId);
    });
  });
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

function renderGallery() {
  const grid = $("#galleryGrid");
  grid.innerHTML = "";
  state.gallery.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "gallery-card";
    card.innerHTML = `
      <img src="${item.src || gallerySvg(item.title, item.palette || colors[index % colors.length])}" alt="${item.title}">
      <div>
        <h3>${item.title}</h3>
        <p>${item.caption || ""}</p>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderHistory() {
  $("#historyContent").innerHTML = state.history
    .split(/\n+/)
    .filter(Boolean)
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");
}

function updateAdminStatus() {
  document.body.classList.toggle("admin-mode", isAdmin());
  const status = $("#adminStatus");
  const loginButton = $("[data-open-login]");
  if (loginButton) loginButton.textContent = isAdmin() ? "پنل مدیر" : "ورود مدیر";
  if (!isAdmin()) {
    status.textContent = "برای ویرایش، وارد حساب مدیر شوید.";
    return;
  }
  status.innerHTML = `حالت ویرایش فعال است.<br>${session.email}`;
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
  $("[data-admin-go-tree]").addEventListener("click", () => {
    $("#adminDialog").close();
    routeTo("tree");
  });
  $("[data-open-gallery-editor]").addEventListener("click", () => $("#galleryEditorDialog").showModal());
  $("[data-close-gallery-editor]").addEventListener("click", () => $("#galleryEditorDialog").close());
  $("[data-open-history-editor]").addEventListener("click", () => {
    $("#historyEditor").elements.history.value = state.history;
    $("#historyEditorDialog").showModal();
  });
  $("[data-close-history-editor]").addEventListener("click", () => $("#historyEditorDialog").close());
  $$("[data-logout]").forEach((button) => button.addEventListener("click", logoutAdmin));

  $("#familySearch").addEventListener("input", renderTree);
  $("#treeRootSelect").addEventListener("change", (event) => {
    treeFocusId = event.currentTarget.value;
    if (treeFocusId) {
      selectedPersonId = treeFocusId;
      collapsedPersonIds.delete(treeFocusId);
    }
    renderTree();
  });
  $("[data-tree-focus-selected]").addEventListener("click", () => {
    if (selectedPersonId) focusTreeOnPerson(selectedPersonId);
  });
  $("[data-tree-focus-parent]").addEventListener("click", () => moveTreeSelection("parent"));
  $("[data-tree-focus-child]").addEventListener("click", () => moveTreeSelection("child"));
  $("[data-tree-clear-focus]").addEventListener("click", () => {
    treeFocusId = "";
    renderTree();
  });
  $("[data-tree-expand-all]").addEventListener("click", () => {
    collapsedPersonIds.clear();
    renderTree();
  });
  $("[data-zoom-in]").addEventListener("click", () => setZoom(treeZoom + 0.1));
  $("[data-zoom-out]").addEventListener("click", () => setZoom(treeZoom - 0.1));
  $("[data-zoom-reset]").addEventListener("click", () => setZoom(1));

  $("#loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = form.elements;
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
    routeTo("tree");
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
    collapsedPersonIds.delete(id);
    if (treeFocusId === id) treeFocusId = "";
    saveState();
    selectedPersonId = null;
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

  $("#historyEditor").addEventListener("submit", (event) => {
    event.preventDefault();
    state.history = event.currentTarget.elements.history.value.trim();
    saveState();
    $("#historyEditorDialog").close();
    renderHistory();
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
    const route = window.location.hash.replace("#", "") || "home";
    if (VALID_ROUTES.includes(route)) routeTo(route);
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
  refreshAdminLists();
  updateAdminStatus();
}

function init() {
  bindEvents();
  clearPersonForm();
  refreshAll();
  const route = window.location.hash.replace("#", "") || "home";
  routeTo(VALID_ROUTES.includes(route) ? route : "home");
}

init();
