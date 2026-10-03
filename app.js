const SUPPORTED = ["en", "fa"];
const STORAGE_KEY = "hotarego.lang";
const INTL_LOCALE = { en: "en", fa: "fa-IR" };

const STRINGS = {
  en: {
    "meta.title": "Hotarego Games — cozy indie mobile games",
    "meta.description": "Hotarego Games is an indie studio making cozy puzzle games for Android, named after Hotarego in Hormozgan, Iran.",
    "lang.label": "Language",
    "lang.system": "System default",
    "hero.logoAlt": "Hotarego Games logo: mountains, date palms, village houses and a stream",
    "hero.title": "Hotarego Games",
    "hero.tagline": "Cozy puzzle games for Android, from a small indie studio named after Hotarego in Hormozgan, Iran.",
    "hero.linksLabel": "Studio links",
    "hero.seeGames": "See the games",
    "hero.github": "GitHub",
    "games.title": "Games",
    "games.loading": "Loading games…",
    "games.empty": "New games are on the way.",
    "games.error": "Couldn't load the game list. Please refresh.",
    "about.title": "Why “Hotarego”?",
    "about.origin":
      'Hotarego (<span lang="fa" dir="rtl">هوتارگو</span>) is the local name of a place in the north-east of Hormozgan province, Iran. ' +
      'Its Persian name is Ābtārikān (<span lang="fa" dir="rtl">آبتاریکان</span>). We named our studio after it.',
    "about.craft": "We make small, handcrafted games that are easy to pick up, satisfying to master and made to be enjoyed at your own pace.",
    "about.fair": "Fair, transparent game economies",
    "about.handcrafted": "Handcrafted, tested content",
    "about.cozy": "Cozy art and calm sound",
    "lightbox.label": "Screenshot",
    "lightbox.close": "Close",
    "status.released": "Released",
    "status.beta": "Beta",
    "status.in-development": "In development",
    "status.concept": "Concept",
    "link.playStore": "Google Play",
    "link.download": "Download",
    "link.trailer": "Trailer",
    "link.repo": "Source",
    gameCount: (n) => `${n} ${n === 1 ? "game" : "games"}`,
    version: (v) => `v${v}`,
    updated: (date) => `Updated ${date}`,
    shotAlt: (title, i) => `${title} screenshot ${i}`,
    shotOpen: (title, i) => `Open ${title} screenshot ${i}`,
    footer: (year) => `© ${year} Hotarego Games`,
  },
  fa: {
    "meta.title": "بازی‌های هوتارگو — بازی‌های موبایلی دنج و مستقل",
    "meta.description": "بازی‌های هوتارگو یک استودیوی مستقل است که بازی‌های پازل دنج برای اندروید می‌سازد و نامش را از هوتارگو در هرمزگان ایران گرفته است.",
    "lang.label": "زبان",
    "lang.system": "پیش‌فرض دستگاه",
    "hero.logoAlt": "نشان بازی‌های هوتارگو: کوه‌ها، نخل‌ها، خانه‌های روستا و یک جوی آب",
    "hero.title": "بازی‌های هوتارگو",
    "hero.tagline": "بازی‌های پازل دنج برای اندروید، از یک استودیوی مستقل کوچک که نامش را از هوتارگو در هرمزگان ایران گرفته است.",
    "hero.linksLabel": "پیوندهای استودیو",
    "hero.seeGames": "دیدن بازی‌ها",
    "hero.github": "گیت‌هاب",
    "games.title": "بازی‌ها",
    "games.loading": "در حال بارگذاری بازی‌ها…",
    "games.empty": "بازی‌های تازه در راه‌اند.",
    "games.error": "فهرست بازی‌ها بارگذاری نشد. لطفاً صفحه را دوباره باز کنید.",
    "about.title": "چرا «هوتارگو»؟",
    "about.origin": "هوتارگو نام محلی جایی در شمال‌شرقی استان هرمزگان ایران است. نام فارسی آن «آبتاریکان» است. ما نام استودیومان را از آن گرفته‌ایم.",
    "about.craft": "ما بازی‌های کوچک و دست‌سازی می‌سازیم که شروعشان آسان است، استاد شدن در آن‌ها لذت‌بخش است و می‌شود با حوصلهٔ خودتان از آن‌ها لذت ببرید.",
    "about.fair": "اقتصاد بازی منصفانه و شفاف",
    "about.handcrafted": "محتوای دست‌ساز و آزموده",
    "about.cozy": "تصاویر دنج و صدای آرام",
    "lightbox.label": "تصویر بازی",
    "lightbox.close": "بستن",
    "status.released": "منتشر شده",
    "status.beta": "بتا",
    "status.in-development": "در حال ساخت",
    "status.concept": "ایده",
    "link.playStore": "گوگل‌پلی",
    "link.download": "دانلود",
    "link.trailer": "تریلر",
    "link.repo": "کد منبع",
    gameCount: (n) => `${n.toLocaleString("fa-IR")} بازی`,
    version: (v) => `نسخهٔ ${v}`,
    updated: (date) => `به‌روزرسانی: ${date}`,
    shotAlt: (title, i) => `تصویر ${i} از ${title}`,
    shotOpen: (title, i) => `باز کردن تصویر ${i} از ${title}`,
    footer: (year) => `© ${year} بازی‌های هوتارگو`,
  },
};

let choice = readChoice();
let lang = resolveLanguage(choice);
let games = null;
let listState = "loading";

function readChoice() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return SUPPORTED.includes(stored) ? stored : "system";
  } catch {
    return "system";
  }
}

function resolveLanguage(selected) {
  if (SUPPORTED.includes(selected)) return selected;
  const prefs = navigator.languages?.length ? navigator.languages : [navigator.language ?? "en"];
  for (const tag of prefs) {
    const primary = String(tag).toLowerCase().split("-")[0];
    if (SUPPORTED.includes(primary)) return primary;
  }
  return "en";
}

function t(key, ...args) {
  const value = STRINGS[lang][key] ?? STRINGS.en[key];
  return typeof value === "function" ? value(...args) : value;
}

function digits(value) {
  return String(value).replace(/\d/g, (d) => Number(d).toLocaleString(INTL_LOCALE[lang]));
}

/** Text and language of a game field that is either plain English or a {language: value} map. */
function localized(value) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    if (value[lang] !== undefined) return { value: value[lang], lang };
    return { value: value.en, lang: "en" };
  }
  return { value, lang: "en" };
}

function langProps(fieldLang) {
  return fieldLang === lang ? {} : { lang: fieldLang, dir: fieldLang === "fa" ? "rtl" : "ltr" };
}

function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (key === "class") node.className = value;
    else if (key === "text") node.textContent = value;
    else if (key === "style") for (const [prop, v] of Object.entries(value)) node.style.setProperty(prop, v);
    else node.setAttribute(key, value);
  }
  for (const child of [].concat(children)) if (child) node.append(child);
  return node;
}

function tagList(groups) {
  const items = groups.flatMap(({ value, lang: fieldLang }) =>
    (value ?? []).map((v) => el("li", { class: "tag", text: v, ...langProps(fieldLang) })));
  return items.length ? el("ul", { class: "tags" }, items) : null;
}

function formatDate(iso) {
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString(INTL_LOCALE[lang], { year: "numeric", month: "short", day: "numeric" });
}

function renderGame(game) {
  const title = localized(game.title);
  const tagline = localized(game.tagline);
  const description = localized(game.description);
  const platforms = localized(game.platforms);
  const highlights = localized(game.highlights);

  const meta = el("div", { class: "game__meta" }, [
    el("span", { class: `status status--${game.status}`, text: t(`status.${game.status}`) ?? game.status }),
    game.version ? el("span", { text: t("version", digits(game.version)) }) : null,
    game.updated ? el("span", { text: t("updated", formatDate(game.updated)) }) : null,
    el("span", { text: platforms.value.join(" · "), ...langProps(platforms.lang) }),
  ]);

  const highlightList = highlights.value?.length
    ? el("ul", { class: "game__highlights", ...langProps(highlights.lang) }, highlights.value.map((h) => el("li", { text: h })))
    : null;

  const links = Object.entries(game.links ?? {})
    .filter(([, url]) => typeof url === "string" && url.startsWith("https://"))
    .map(([kind, url]) => el("a", { class: "button", href: url, text: t(`link.${kind}`) ?? kind }));

  const info = el("div", { class: "game__info" }, [
    el("h3", { class: "game__title", text: title.value, ...langProps(title.lang) }),
    el("p", { class: "game__tagline", text: tagline.value, ...langProps(tagline.lang) }),
    meta,
    el("p", { class: "game__description", text: description.value, ...langProps(description.lang) }),
    highlightList,
    tagList([localized(game.genres), localized(game.tech)]),
    links.length ? el("div", { class: "game__links" }, links) : null,
  ]);

  const shots = (localized(game.screenshots).value ?? []).map((src, i) => {
    const n = digits(i + 1);
    const button = el("button", { class: "shot", type: "button", "aria-label": t("shotOpen", title.value, n) }, [
      el("img", { src, alt: t("shotAlt", title.value, n), loading: "lazy", width: "540", height: "1152" }),
    ]);
    button.addEventListener("click", () => openLightbox(src, t("shotAlt", title.value, n)));
    return button;
  });

  return el("article", { class: "game", id: game.id, style: { "--accent": game.accent ?? "" } }, [
    info,
    shots.length ? el("div", { class: "shots" }, shots) : null,
  ]);
}

function renderList() {
  const list = document.getElementById("games-list");
  const count = document.getElementById("games-count");
  count.textContent = games ? t("gameCount", games.length) : "";
  if (listState === "ready") {
    list.replaceChildren(...games.map(renderGame));
    if (games.length === 0) list.append(el("p", { class: "games__empty", text: t("games.empty") }));
  } else {
    list.replaceChildren(el("p", { class: "games__empty", text: t(`games.${listState}`) }));
  }
}

function applyLanguage() {
  const root = document.documentElement;
  root.lang = lang;
  root.dir = lang === "fa" ? "rtl" : "ltr";
  document.title = t("meta.title");
  document.querySelector('meta[name="description"]').setAttribute("content", t("meta.description"));

  for (const node of document.querySelectorAll("[data-i18n]")) node.textContent = t(node.dataset.i18n);
  for (const node of document.querySelectorAll("[data-i18n-html]")) node.innerHTML = t(node.dataset.i18nHtml);
  for (const node of document.querySelectorAll("[data-i18n-attr]")) {
    for (const pair of node.dataset.i18nAttr.split(";")) {
      const [attr, key] = pair.split(":");
      node.setAttribute(attr, t(key));
    }
  }

  const native = document.getElementById("hero-native");
  const other = lang === "fa" ? "en" : "fa";
  native.textContent = other === "fa" ? "هوتارگو" : STRINGS.en["hero.title"];
  native.lang = other;
  native.dir = other === "fa" ? "rtl" : "ltr";

  document.getElementById("footer-text").textContent = t("footer", digits(new Date().getFullYear()));
  for (const button of document.querySelectorAll("[data-lang]")) {
    button.setAttribute("aria-pressed", String(button.dataset.lang === choice));
  }
  renderList();
  root.classList.remove("i18n-pending");
}

function setChoice(next) {
  choice = next;
  try {
    if (next === "system") localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Private browsing can block storage; the choice still applies to this visit.
  }
  lang = resolveLanguage(choice);
  applyLanguage();
}

function openLightbox(src, alt) {
  const dialog = document.getElementById("lightbox");
  const image = document.getElementById("lightbox-image");
  image.src = src;
  image.alt = alt;
  dialog.showModal();
}

async function loadGames() {
  try {
    const response = await fetch("games.json", { cache: "no-cache" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    games = (await response.json()).games;
    listState = "ready";
  } catch (error) {
    listState = "error";
    console.error(error);
  }
  renderList();
}

for (const button of document.querySelectorAll("[data-lang]")) {
  button.addEventListener("click", () => setChoice(button.dataset.lang));
}
window.addEventListener("languagechange", () => {
  if (choice === "system") setChoice("system");
});
window.addEventListener("storage", (event) => {
  if (event.key === STORAGE_KEY) {
    choice = readChoice();
    lang = resolveLanguage(choice);
    applyLanguage();
  }
});
document.getElementById("lightbox").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) event.currentTarget.close();
});
applyLanguage();
loadGames();
