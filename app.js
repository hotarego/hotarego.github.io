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
    "player.label": (title) => `${title} clip`,
    "player.play": "Play",
    "player.pause": "Pause",
    "player.mute": "Mute",
    "player.unmute": "Sound on",
    "player.seek": "Position in the clip",
    "player.fullscreen": "Full screen",
    "player.exit": "Exit full screen",
    "status.released": "Released",
    "status.beta": "Beta",
    "status.in-development": "In development",
    "status.concept": "Concept",
    "link.playStore": "Google Play",
    "link.download": "Download",
    "link.trailer": "Trailer",
    "guide.open": "How to play",
    gameCount: (n) => `${n} ${n === 1 ? "game" : "games"}`,
    version: (v) => `v${v}`,
    updated: (date) => `Updated ${date}`,
    shotAlt: (title, i) => `${title} screenshot ${i}`,
    shotOpen: (title, i) => `Open ${title} screenshot ${i}`,
    footer: (year) => `© ${year} Hotarego Games`,
  },
  fa: {
    "meta.title": "بازی‌های هوتارگو",
    "meta.description": "برای اندروید بازی پازلی می‌سازیم. اولینش، «خونه‌ی رویایی»، در راه است.",
    "lang.label": "زبان",
    "lang.system": "زبان دستگاه",
    "hero.logoAlt": "نشان بازی‌های هوتارگو: کوه‌ها، نخل‌ها، خانه‌های روستا و یک جوی آب",
    "hero.title": "بازی‌های هوتارگو",
    "hero.tagline": "برای اندروید بازی پازلی می‌سازیم. فعلاً سرمان گرم «خونه‌ی رویایی» است.",
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
    "player.label": (title) => `کلیپ ${title}`,
    "player.play": "پخش",
    "player.pause": "توقف",
    "player.mute": "بی‌صدا",
    "player.unmute": "با صدا",
    "player.seek": "جای کلیپ",
    "player.fullscreen": "تمام‌صفحه",
    "player.exit": "خروج از تمام‌صفحه",
    "status.released": "منتشر شده",
    "status.beta": "بتا",
    "status.in-development": "در دست ساخت",
    "status.concept": "ایده",
    "link.playStore": "گوگل‌پلی",
    "link.download": "دانلود",
    "link.trailer": "تریلر",
    "guide.open": "راهنمای بازی",
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

const PLAYER_ICONS = {
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.2v13.6l11.2-6.8z"/></svg>',
  pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h4.2v14H6zm7.8 0H18v14h-4.2z"/></svg>',
  sound: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h3.2L12 5.2v13.6L7.2 15H4zm10.2-2.2 1.4 1.4a3.2 3.2 0 0 1 0 4.6l-1.4 1.4a5.2 5.2 0 0 0 0-7.4zm2.6-2.6 1.4 1.4a7 7 0 0 1 0 9.8l-1.4 1.4a9 9 0 0 0 0-12.6z"/></svg>',
  muted: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h3.2L12 5.2v13.6L7.2 15H4zm11.2.8 4.4 4.4-1.4 1.4-4.4-4.4-1.4 1.4-1.4-1.4 1.4-1.4-1.4-1.4 1.4-1.4 1.4 1.4 1.4-1.4z"/></svg>',
  full: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5v2H6v3zm10-5h5v5h-2V6h-3zM6 15H4v5h5v-2H6zm12 0h2v5h-5v-2h3z"/></svg>',
  exit: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4H4v5h2V6h3zm6 0h5v5h-2V6h-3zM6 15H4v5h5v-2H6zm12 3v-3h2v5h-5v-2z"/></svg>',
};

function playerIcon(name) {
  const node = el("span", { class: "player__icon" });
  node.innerHTML = PLAYER_ICONS[name];
  return node;
}

function clock(seconds) {
  const total = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
  const minutes = Math.floor(total / 60);
  const remain = String(total % 60).padStart(2, "0");
  return digits(`${minutes}:${remain}`);
}

function renderPlayer(src, poster, title) {
  const video = el("video", { class: "player__video", playsinline: "", preload: "metadata" });
  if (poster) video.poster = poster;
  video.src = src;

  const toggle = el("button", { class: "player__toggle", type: "button", "aria-label": t("player.play") }, [
    playerIcon("play"),
  ]);
  const barPlay = el("button", { class: "player__btn", type: "button", "aria-label": t("player.play") }, [
    playerIcon("play"),
  ]);
  const time = el("span", { class: "player__time", dir: "ltr", text: `${clock(0)} / ${clock(0)}` });
  const seek = el("input", {
    class: "player__seek",
    type: "range",
    min: "0",
    max: "1000",
    value: "0",
    step: "1",
    dir: "ltr",
    "aria-label": t("player.seek"),
    "aria-valuemin": "0",
    "aria-valuemax": "1000",
    "aria-valuenow": "0",
  });
  const mute = el("button", { class: "player__btn", type: "button", "aria-label": t("player.mute") }, [
    playerIcon("sound"),
  ]);
  const full = el("button", { class: "player__btn", type: "button", "aria-label": t("player.fullscreen") }, [
    playerIcon("full"),
  ]);
  const mark = el("span", { class: "player__mark", text: lang === "fa" ? "هوتارگو" : "Hotarego" });
  const controls = el("div", { class: "player__controls" }, [barPlay, time, mute, full]);
  const bar = el("div", { class: "player__bar" }, [seek, controls]);
  const player = el("div", { class: "player", role: "region", "aria-label": t("player.label", title) }, [
    video, mark, toggle, bar,
  ]);

  let scrubbing = false;
  let suppressSeek = false;

  function paintSeek() {
    const shown = scrubbing ? (Number(seek.value) / 1000) * video.duration : video.currentTime;
    seek.style.setProperty("--pct", `${Number(seek.value) / 10}%`);
    seek.setAttribute("aria-valuenow", seek.value);
    seek.setAttribute("aria-valuetext", clock(shown));
  }

  function writeSeek(next) {
    suppressSeek = true;
    seek.value = String(next);
    setTimeout(() => {
      suppressSeek = false;
    }, 0);
  }

  function showTime() {
    if (scrubbing) return;
    time.textContent = `${clock(video.currentTime)} / ${clock(video.duration)}`;
    if (Number.isFinite(video.duration) && video.duration > 0) {
      writeSeek(Math.round((video.currentTime / video.duration) * 1000));
    }
    paintSeek();
  }

  function setPlaying(playing) {
    player.classList.toggle("is-playing", playing);
    const label = t(playing ? "player.pause" : "player.play");
    const glyph = playing ? "pause" : "play";
    toggle.setAttribute("aria-label", label);
    barPlay.setAttribute("aria-label", label);
    toggle.replaceChildren(playerIcon(glyph));
    barPlay.replaceChildren(playerIcon(glyph));
  }

  function playPause() {
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  }

  function toggleMute() {
    video.muted = !video.muted;
    mute.setAttribute("aria-label", t(video.muted ? "player.unmute" : "player.mute"));
    mute.replaceChildren(playerIcon(video.muted ? "muted" : "sound"));
  }

  function toggleFull() {
    if (document.fullscreenElement === player) document.exitFullscreen();
    else player.requestFullscreen();
  }

  function nudge(delta) {
    if (!Number.isFinite(video.duration)) return;
    video.currentTime = Math.min(video.duration, Math.max(0, video.currentTime + delta));
  }

  toggle.addEventListener("click", playPause);
  barPlay.addEventListener("click", playPause);
  video.addEventListener("click", playPause);
  mute.addEventListener("click", toggleMute);
  full.addEventListener("click", toggleFull);
  video.addEventListener("play", () => setPlaying(true));
  video.addEventListener("pause", () => setPlaying(false));
  video.addEventListener("ended", () => setPlaying(false));
  video.addEventListener("loadedmetadata", showTime);
  video.addEventListener("timeupdate", showTime);
  video.addEventListener("durationchange", showTime);
  seek.addEventListener("input", () => {
    if (suppressSeek || !Number.isFinite(video.duration) || video.duration <= 0) return;
    const target = (Number(seek.value) / 1000) * video.duration;
    scrubbing = true;
    if (Math.abs(video.currentTime - target) > 0.05) video.currentTime = target;
    else scrubbing = false;
    time.textContent = `${clock(target)} / ${clock(video.duration)}`;
    paintSeek();
  });
  video.addEventListener("seeked", () => {
    scrubbing = false;
    showTime();
  });
  player.addEventListener("fullscreenchange", () => {
    const open = document.fullscreenElement === player;
    full.setAttribute("aria-label", t(open ? "player.exit" : "player.fullscreen"));
    full.replaceChildren(playerIcon(open ? "exit" : "full"));
    player.classList.toggle("is-fullscreen", open);
  });
  player.addEventListener("keydown", (event) => {
    if (event.target === seek) return;
    if ((event.code === "Space" || event.key === "k" || event.key === "K") && event.target.tagName !== "BUTTON") {
      event.preventDefault();
      playPause();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      nudge(5);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      nudge(-5);
    } else if (event.key === "m" || event.key === "M") {
      toggleMute();
    } else if (event.key === "f" || event.key === "F") {
      toggleFull();
    }
  });
  paintSeek();
  return player;
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

  const guideLink = game.guide ? el("a", { class: "button", href: game.guide, text: t("guide.open") }) : null;
  const linkRow = links.length || guideLink
    ? el("div", { class: "game__links" }, [...links, guideLink].filter(Boolean))
    : null;

  const info = el("div", { class: "game__info" }, [
    el("h3", { class: "game__title", text: title.value, ...langProps(title.lang) }),
    el("p", { class: "game__tagline", text: tagline.value, ...langProps(tagline.lang) }),
    meta,
    el("p", { class: "game__description", text: description.value, ...langProps(description.lang) }),
    highlightList,
    tagList([localized(game.genres), localized(game.tech)]),
    linkRow,
  ]);

  const shots = localized(game.screenshots).value ?? [];
  const shotButtons = shots.map((src, i) => {
    const n = digits(i + 1);
    const button = el("button", { class: "shot", type: "button", "aria-label": t("shotOpen", title.value, n) }, [
      el("img", { src, alt: t("shotAlt", title.value, n), loading: "lazy", width: "540", height: "960" }),
    ]);
    button.addEventListener("click", () => openLightbox(src, t("shotAlt", title.value, n)));
    return button;
  });
  const clip = (localized(game.clips).value ?? [])[0];
  const media = [];
  if (clip) media.push(renderPlayer(clip, shots[0], title.value));
  if (shotButtons.length) media.push(el("div", { class: "shots" }, shotButtons));

  return el("article", { class: "game", id: game.id, style: { "--accent": game.accent ?? "" } }, [
    info,
    media.length ? el("div", { class: "game__media" }, media) : null,
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
