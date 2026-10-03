const SUPPORTED = ["en", "fa"];
const STORAGE_KEY = "hotarego.lang";
const INTL_LOCALE = { en: "en", fa: "fa-IR" };

const STRINGS = {
  en: {
    "meta.title": "Hotarego Games",
    "meta.description": "We make puzzle games for Android. Our first one, Dream Home, is on the way.",
    "lang.label": "Language",
    "lang.system": "System default",
    "hero.logoAlt": "Hotarego Games logo: mountains, date palms, village houses and a stream",
    "hero.title": "Hotarego Games",
    "hero.tagline": "We make puzzle games for Android. Right now that means Dream Home.",
    "hero.linksLabel": "Links",
    "hero.seeGames": "Our games",
    "hero.github": "GitHub",
    "games.title": "Games",
    "games.loading": "Loading…",
    "games.empty": "Nothing here yet. Check back soon.",
    "games.error": "The game list didn't load. Try refreshing the page.",
    "about.title": "Where the name comes from",
    "about.origin":
      'Hotarego (<span lang="fa" dir="rtl">هوتارگو</span>) is what locals call a place in the north-east of Hormozgan, Iran. ' +
      'In Persian it\'s Ābtārikān (<span lang="fa" dir="rtl">آبتاریکان</span>). We named ourselves after it.',
    "about.craft": "We like puzzle games you can play on a short break, so that's the kind we make.",
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
    "meta.title": "بازی‌های هوتارگو",
    "meta.description": "برای اندروید بازی پازلی می‌سازیم. اولینش، «خانهٔ رؤیایی»، در راه است.",
    "lang.label": "زبان",
    "lang.system": "زبان دستگاه",
    "hero.logoAlt": "نشان بازی‌های هوتارگو: کوه‌ها، نخل‌ها، خانه‌های روستا و یک جوی آب",
    "hero.title": "بازی‌های هوتارگو",
    "hero.tagline": "برای اندروید بازی پازلی می‌سازیم. فعلاً سرمان گرم «خانهٔ رؤیایی» است.",
    "hero.linksLabel": "پیوندها",
    "hero.seeGames": "بازی‌هایمان",
    "hero.github": "گیت‌هاب",
    "games.title": "بازی‌ها",
    "games.loading": "یک لحظه…",
    "games.empty": "هنوز بازی‌ای اینجا نیست. به‌زودی سر بزنید.",
    "games.error": "فهرست بازی‌ها باز نشد. صفحه را یک بار دیگر باز کنید.",
    "about.title": "اسم «هوتارگو» از کجا آمده؟",
    "about.origin": "هوتارگو اسم محلی جایی در شمال‌شرق هرمزگان است؛ در فارسی به آن «آبتاریکان» می‌گویند. اسم گروهمان را از همان‌جا برداشته‌ایم.",
    "about.craft": "خودمان بازی‌های پازلی را دوست داریم که بشود توی یک استراحت کوتاه بازی‌شان کرد؛ بازی‌های خودمان را هم همین‌طوری می‌سازیم.",
    "lightbox.label": "تصویر بازی",
    "lightbox.close": "بستن",
    "status.released": "منتشر شده",
    "status.beta": "بتا",
    "status.in-development": "در دست ساخت",
    "status.concept": "ایده",
    "link.playStore": "گوگل‌پلی",
    "link.download": "دانلود",
    "link.trailer": "تریلر",
    "link.repo": "کد منبع",
    gameCount: (n) => `${n.toLocaleString("fa-IR")} بازی`,
    version: (v) => `نسخهٔ ${v}`,
    updated: (date) => `آخرین تغییر: ${date}`,
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
