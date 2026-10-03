const STATUS_LABELS = {
  released: "Released",
  beta: "Beta",
  "in-development": "In development",
  concept: "Concept",
};

const LINK_LABELS = {
  playStore: "Google Play",
  download: "Download",
  trailer: "Trailer",
  repo: "Source",
};

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

function tagList(values) {
  if (!values || values.length === 0) return null;
  return el("ul", { class: "tags" }, values.map((v) => el("li", { class: "tag", text: v })));
}

function formatDate(iso) {
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function renderGame(game) {
  const meta = el("div", { class: "game__meta" }, [
    el("span", { class: `status status--${game.status}`, text: STATUS_LABELS[game.status] ?? game.status }),
    game.version ? el("span", { text: `v${game.version}` }) : null,
    game.updated ? el("span", { text: `Updated ${formatDate(game.updated)}` }) : null,
    el("span", { text: game.platforms.join(" · ") }),
  ]);

  const highlights = game.highlights?.length
    ? el("ul", { class: "game__highlights" }, game.highlights.map((h) => el("li", { text: h })))
    : null;

  const links = Object.entries(game.links ?? {})
    .filter(([, url]) => typeof url === "string" && url.startsWith("https://"))
    .map(([kind, url]) => el("a", { class: "button", href: url, text: LINK_LABELS[kind] ?? kind }));

  const info = el("div", { class: "game__info" }, [
    el("h3", { class: "game__title", text: game.title }),
    el("p", { class: "game__tagline", text: game.tagline }),
    meta,
    el("p", { class: "game__description", text: game.description }),
    highlights,
    tagList([...(game.genres ?? []), ...(game.tech ?? [])]),
    links.length ? el("div", { class: "game__links" }, links) : null,
  ]);

  const shots = (game.screenshots ?? []).map((src, i) => {
    const button = el("button", { class: "shot", type: "button", "aria-label": `Open ${game.title} screenshot ${i + 1}` }, [
      el("img", { src, alt: `${game.title} screenshot ${i + 1}`, loading: "lazy", width: "540", height: "1152" }),
    ]);
    button.addEventListener("click", () => openLightbox(src, `${game.title} screenshot ${i + 1}`));
    return button;
  });

  return el("article", { class: "game", id: game.id, style: { "--accent": game.accent ?? "" } }, [
    info,
    shots.length ? el("div", { class: "shots" }, shots) : null,
  ]);
}

function openLightbox(src, alt) {
  const dialog = document.getElementById("lightbox");
  const image = document.getElementById("lightbox-image");
  image.src = src;
  image.alt = alt;
  dialog.showModal();
}

async function loadGames() {
  const list = document.getElementById("games-list");
  const count = document.getElementById("games-count");
  try {
    const response = await fetch("games.json", { cache: "no-cache" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const { games } = await response.json();
    list.replaceChildren(...games.map(renderGame));
    count.textContent = `${games.length} ${games.length === 1 ? "game" : "games"}`;
    if (games.length === 0) list.append(el("p", { class: "games__empty", text: "New games are on the way." }));
  } catch (error) {
    list.replaceChildren(el("p", { class: "games__empty", text: "Couldn't load the game list. Please refresh." }));
    console.error(error);
  }
}

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lightbox").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) event.currentTarget.close();
});
loadGames();
