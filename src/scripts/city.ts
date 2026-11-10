// Signature: choosing a city rewrites the number, address and tags in the header, the hero card,
// the mobile bar and the routes aside, and moves that city to the top of the centers directory (R-104).
// No city by default: the general line and a hint until the visitor chooses (ux/demo-home.md §7).
import { cities, phones, generalPhone, cityTags, type City } from "../data/site";

const KEY = "onclinic-city";
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const byId = new Map<string, City>(cities.map((c) => [c.id, c]));

function readStored(): City | null {
  try {
    const id = localStorage.getItem(KEY);
    return id ? byId.get(id) ?? null : null;
  } catch {
    return null;
  }
}

function store(id: string): void {
  try { localStorage.setItem(KEY, id); } catch { /* private mode: the choice lives for this page only */ }
}

function render(city: City | null): void {
  const phone = phones[city ? city.phone : generalPhone];

  document.querySelectorAll<HTMLAnchorElement>("a[data-phone]").forEach((a) => {
    a.href = phone.tel;
    const t = a.querySelector<HTMLElement>("[data-phone-text]");
    if (t) t.textContent = phone.display;
  });

  document.querySelectorAll<HTMLElement>("[data-city-label]").forEach((el) => {
    el.textContent = city ? city.name : el.dataset.empty ?? "";
  });

  document.querySelectorAll<HTMLElement>("[data-card-title]").forEach((el) => {
    el.textContent = city ? `ОН Клінік ${city.inName}` : el.dataset.empty ?? "";
  });

  const hint = document.querySelector<HTMLElement>("[data-card-hint]");
  const place = document.querySelector<HTMLElement>("[data-card-place]");
  const address = document.querySelector<HTMLElement>("[data-card-address]");
  const tags = document.querySelector<HTMLElement>("[data-card-tags]");
  if (hint) hint.hidden = !!city;
  if (place) place.hidden = !city;
  if (city && address && tags) {
    address.textContent = city.addresses.join("; ");
    tags.replaceChildren(...cityTags(city).map((t) => {
      const li = document.createElement("li");
      li.textContent = t;
      return li;
    }));
  }

  document.querySelectorAll<HTMLButtonElement>("[data-city-btn]").forEach((b) => {
    b.setAttribute("aria-pressed", String(!!city && b.dataset.cityBtn === city.id));
  });

  // Centers directory: the chosen city first and marked
  const list = document.querySelector<HTMLElement>("[data-centers]");
  if (list) {
    const rows = Array.from(list.querySelectorAll<HTMLElement>("[data-center]"));
    rows.forEach((r) => r.classList.toggle("is-current", !!city && r.dataset.center === city.id));
    const order = (r: HTMLElement) => Number(r.dataset.order ?? 0);
    rows.sort((a, b) => {
      if (city && a.dataset.center === city.id) return -1;
      if (city && b.dataset.center === city.id) return 1;
      return order(a) - order(b);
    });
    list.append(...rows);
  }
}

// Effect 2: old values fade out in 120ms, new ones arrive with a 6px rise in 220ms
function swap(city: City | null): void {
  const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-swap]"));
  if (reduce || !("animate" in HTMLElement.prototype)) { render(city); return; }
  const outs = targets.map((el) => el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 120, easing: "cubic-bezier(.4, 0, 1, 1)", fill: "forwards" }));
  // Safety: if the animation timeline is paused (background tab, throttled renderer), never leave content transparent
  const timeout = (ms: number) => new Promise((r) => setTimeout(r, ms));
  Promise.race([Promise.all(outs.map((a) => a.finished)), timeout(200)]).then(() => {
    render(city);
    const ins = targets.map((el) =>
      el.animate([{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "none" }], { duration: 220, easing: "cubic-bezier(.2, .7, .2, 1)", fill: "forwards" }));
    outs.forEach((a) => a.cancel());
    Promise.race([Promise.all(ins.map((a) => a.finished)), timeout(400)]).then(() => ins.forEach((a) => a.cancel()));
  });
}

const initial = readStored();
if (initial) render(initial);

document.querySelectorAll<HTMLButtonElement>("[data-city-btn]").forEach((b) => {
  b.addEventListener("click", () => {
    const city = byId.get(b.dataset.cityBtn ?? "");
    if (!city) return;
    store(city.id);
    swap(city);
  });
});

// Mobile menu: a jump to a section closes the menu
document.querySelectorAll<HTMLAnchorElement>(".mmenu a[href^='#']").forEach((a) => {
  a.addEventListener("click", () => a.closest("details")?.removeAttribute("open"));
});
