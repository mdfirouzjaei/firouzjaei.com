const OWNER_EMAIL = "mdfirouzjaei@gmail.com";
const DEFAULT_OWNER_PASSWORD = "April18!";
const LEGACY_OWNER_PASSWORDS = ["owner-demo-1403"];
const STORAGE_KEY = "firouzjaei-family-site-state-v1";
const SESSION_KEY = "firouzjaei-family-site-session-v1";
const VALID_ROUTES = ["home", "tree", "gallery", "history"];
const TREE_CANVAS_WIDTH = 1420;
const TREE_CANVAS_HEIGHT = 760;

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
  history:
    "این متن نمونه برای صفحه تاریخچه است. در نسخه نهایی، می توانید روایت رسمی خانواده، نام روستاها، شاخه های اصلی، خاطرات بزرگان و رویدادهای مهم را اینجا وارد کنید.\n\nهدف این وب سایت این است که هر نسل بتواند با احترام به گذشته، اطلاعات خانوادگی را به شکلی مرتب، خوانا و قابل نگهداری ببیند. درخت خانوادگی، گالری عکس و تاریخچه در کنار هم یک دفتر زنده می سازند؛ دفتری که هم رسمی است و هم برای خانواده صمیمی و قابل استفاده می ماند.",
};

let state = loadState();
let session = loadSession();
let selectedPersonId = null;
let treeScale = 1;
let treeZoom = 1;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return clone(sampleState);
  try {
    const loadedState = { ...clone(sampleState), ...JSON.parse(raw) };
    const owner = loadedState.admins.find((admin) => admin.email.toLowerCase() === OWNER_EMAIL);
    if (owner && LEGACY_OWNER_PASSWORDS.includes(owner.password)) {
      owner.password = DEFAULT_OWNER_PASSWORD;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(loadedState));
    }
    return loadedState;
  } catch {
    return clone(sampleState);
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

function routeTo(route) {
  $$(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.route === route));
  $$(".view").forEach((view) => view.classList.toggle("active", view.dataset.view === route));
  if (route === "tree") requestAnimationFrame(fitTreeToStage);
  if (window.location.hash !== `#${route}`) window.location.hash = route;
}

function nodePosition(person) {
  const baseX = 130;
  const baseY = 110;
  const xGap = 145;
  const yGap = 178;
  return {
    x: baseX + Number(person.slot || 0) * xGap,
    y: baseY + Number(person.generation || 0) * yGap,
  };
}

function renderTree() {
  const nodes = $("#treeNodes");
  const lines = $("#treeLines");
  const template = $("#nodeTemplate");
  const searchTerm = $("#familySearch").value.trim();
  nodes.innerHTML = "";
  lines.innerHTML = "";

  const people = state.people;
  const positions = new Map();
  people.forEach((person) => positions.set(person.id, nodePosition(person)));

  drawRelationships(lines, people, positions);

  people.forEach((person, index) => {
    const position = positions.get(person.id);
    const node = template.content.firstElementChild.cloneNode(true);
    node.style.left = `${position.x}px`;
    node.style.top = `${position.y}px`;
    node.dataset.id = person.id;
    node.classList.toggle("selected", selectedPersonId === person.id);
    if (searchTerm && !person.name.includes(searchTerm)) node.classList.add("dimmed");

    const avatar = $(".avatar", node);
    const image = document.createElement("img");
    image.alt = person.name;
    image.src = person.photo || avatarSvg(person.name, index);
    avatar.appendChild(image);
    $(".person-name", node).textContent = person.name;
    node.addEventListener("click", () => openPerson(person.id));
    nodes.appendChild(node);
  });

  fitTreeToStage();
  updateAdminStatus();
}

function fitTreeToStage() {
  const stage = $("#treeStage");
  const canvas = $("#treeCanvas");
  if (!stage || !canvas || !stage.clientWidth) return;

  const availableWidth = Math.max(260, stage.clientWidth - 28);
  const fitScale = Math.min(1, availableWidth / TREE_CANVAS_WIDTH);
  treeScale = fitScale * treeZoom;

  const visualWidth = TREE_CANVAS_WIDTH * treeScale;
  const visualHeight = TREE_CANVAS_HEIGHT * treeScale;
  canvas.style.width = `${TREE_CANVAS_WIDTH}px`;
  canvas.style.height = `${TREE_CANVAS_HEIGHT}px`;
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
  const parents = person.parentIds
    ?.map((parentId) => state.people.find((item) => item.id === parentId)?.name)
    .filter(Boolean);
  const spouses = person.spouseIds
    ?.map((spouseId) => state.people.find((item) => item.id === spouseId)?.name)
    .filter(Boolean);
  const photos = (person.photos || []).filter(Boolean);
  detail.innerHTML = `
    <div class="detail-head">
      <span class="avatar"><img src="${person.photo || avatarSvg(person.name, index)}" alt="${person.name}"></span>
      <div>
        <p class="eyebrow">پرونده خانوادگی</p>
        <h2>${person.name}</h2>
        <div class="detail-meta">
          ${dates.map((item) => `<span>${item}</span>`).join("")}
          ${parents?.length ? `<span>والدین: ${parents.join(" و ")}</span>` : ""}
          ${spouses?.length ? `<span>همسر: ${spouses.join("، ")}</span>` : ""}
        </div>
      </div>
    </div>
    ${person.story ? `<p>${person.story}</p>` : ""}
    ${photos.length ? `<div class="detail-gallery">${photos.map((src) => `<img src="${src}" alt="${person.name}">`).join("")}</div>` : ""}
    ${isAdmin() ? `<button class="soft-action" type="button" data-edit-current="${person.id}">ویرایش این فرد</button>` : ""}
  `;
  const editButton = $("[data-edit-current]", detail);
  if (editButton) {
    editButton.addEventListener("click", () => {
      $("#personDialog").close();
      openPersonEditor(person.id);
    });
  }
  $("#personDialog").showModal();
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
  const empty = includeEmpty ? `<option value="">انتخاب نشده</option>` : "";
  return (
    empty +
    state.people
      .map((person) => `<option value="${person.id}" ${person.id === selectedId ? "selected" : ""}>${person.name}</option>`)
      .join("")
  );
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
      row.innerHTML = `<span>${person.name}</span><button class="soft-action" type="button">ویرایش</button>`;
      $("button", row).addEventListener("click", () => {
        $("#adminDialog").close();
        routeTo("tree");
        openPersonEditor(person.id);
      });
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

  $$('select[name="spouseId"], select[name="parentOne"], select[name="parentTwo"]').forEach((select) => {
    select.innerHTML = personOptions();
  });
}

function fillPersonForm(id) {
  const person = state.people.find((item) => item.id === id);
  const form = $("#personEditor");
  const fields = form.elements;
  if (!person) return;
  $("#personEditorTitle").textContent = "ویرایش فرد";
  fields.id.value = person.id;
  fields.name.value = person.name || "";
  fields.birth.value = person.birth || "";
  fields.death.value = person.death || "";
  fields.generation.value = person.generation ?? 0;
  fields.slot.value = person.slot ?? 0;
  fields.photo.value = person.photo || "";
  fields.story.value = person.story || "";
  fields.photos.value = (person.photos || []).join("\n");
  fields.spouseId.innerHTML = personOptions(person.spouseIds?.[0] || "");
  fields.parentOne.innerHTML = personOptions(person.parentIds?.[0] || "");
  fields.parentTwo.innerHTML = personOptions(person.parentIds?.[1] || "");
}

function clearPersonForm() {
  const form = $("#personEditor");
  const fields = form.elements;
  form.reset();
  $("#personEditorTitle").textContent = "افزودن فرد";
  fields.id.value = "";
  fields.generation.value = 0;
  fields.slot.value = 0;
  fields.spouseId.innerHTML = personOptions();
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

function openAdminPanel(tab = "admins") {
  refreshAdminLists();
  setAdminTab(tab);
  $("#adminDialog").showModal();
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
  $("[data-close-person-editor]").addEventListener("click", () => $("#personEditorDialog").close());
  $("[data-open-person-editor]").addEventListener("click", () => openPersonEditor());
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
  $("[data-logout]").addEventListener("click", () => {
    saveSession(null);
    $("#adminDialog").close();
    updateAdminStatus();
    renderTree();
  });

  $("#familySearch").addEventListener("input", renderTree);
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

  $("#personEditor").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = form.elements;
    const id = fields.id.value || `p${Date.now()}`;
    const existing = state.people.find((item) => item.id === id);
    const person = existing || { id, spouseIds: [], parentIds: [] };
    const spouseId = fields.spouseId.value;
    person.name = fields.name.value.trim();
    person.birth = fields.birth.value.trim();
    person.death = fields.death.value.trim();
    person.generation = Number(fields.generation.value || 0);
    person.slot = Number(fields.slot.value || 0);
    person.photo = fields.photo.value.trim();
    person.story = fields.story.value.trim();
    person.photos = fields.photos.value.split(/\n+/).map((item) => item.trim()).filter(Boolean);
    person.parentIds = [fields.parentOne.value, fields.parentTwo.value].filter(Boolean);
    person.spouseIds = spouseId ? [spouseId] : [];
    if (!existing) state.people.push(person);
    state.people.forEach((item) => {
      if (item.id !== person.id) item.spouseIds = (item.spouseIds || []).filter((spouse) => spouse !== person.id);
    });
    if (spouseId) {
      const spouse = state.people.find((item) => item.id === spouseId);
      if (spouse && !spouse.spouseIds.includes(person.id)) spouse.spouseIds.push(person.id);
    }
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
      state = JSON.parse($("#dataImport").value);
      saveState();
      refreshAll();
      $("#dataMessage").textContent = "داده جایگزین شد.";
    } catch {
      $("#dataMessage").textContent = "ساختار JSON درست نیست.";
    }
  });
  $("[data-reset-data]").addEventListener("click", () => {
    state = clone(sampleState);
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
