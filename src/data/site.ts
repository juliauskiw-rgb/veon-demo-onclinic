// Facts for the homepage. Source: veon/client.json (C-001…C-028, company.*) and audit/screens/home-desktop-*.png.
// Nothing here is invented: no prices, ratings or reviews beyond what the client's site shows.

export type PhoneId = "301177" | "301730" | "301733" | "307733" | "300700";

export interface Phone { display: string; tel: string; cities: string; }

// company.contacts.phones (C-010). 30 11 77 is the number in the header of the client's homepage;
// it is used as the general line and for Kharkiv until the client decides (R-103, ux/demo-home.md §9).
export const phones: Record<PhoneId, Phone> = {
  "301177": { display: "0 800 30 11 77", tel: "tel:0800301177", cities: "Загальна лінія" },
  "301730": { display: "0 800 30 17 30", tel: "tel:0800301730", cities: "Одеса, Дніпро" },
  "301733": { display: "0 800 30 17 33", tel: "tel:0800301733", cities: "Миколаїв, Суми" },
  "307733": { display: "0 800 30 77 33", tel: "tel:0800307733", cities: "Полтава, Ужгород" },
  "300700": { display: "0 800 30 07 00", tel: "tel:0800300700", cities: "Черкаси, Чернігів, Біла Церква, Кропивницький" },
};

export const generalPhone: PhoneId = "301177";
/** Display order for the footer list (object keys that look like numbers are reordered by JS) */
export const phoneOrder: PhoneId[] = ["301177", "301730", "301733", "307733", "300700"];

export interface City {
  id: string;
  name: string;
  /** Locative for «ОН Клінік у …» */
  inName: string;
  phone: PhoneId;
  addresses: string[];
  kids: boolean;
  emergency?: boolean;
  surgery?: boolean;
}

// company.geography, C-005, C-006
export const cities: City[] = [
  { id: "bila-tserkva", name: "Біла Церква", inName: "у Білій Церкві", phone: "300700", addresses: ["вул. Ярослава Мудрого, 5/13"], kids: true },
  { id: "dnipro", name: "Дніпро", inName: "у Дніпрі", phone: "301730", addresses: ["пр. Д. Яворницького, 107а"], kids: true },
  { id: "kropyvnytskyi", name: "Кропивницький", inName: "у Кропивницькому", phone: "300700", addresses: ["бульвар Студентський, 6/5"], kids: false },
  { id: "mykolaiv", name: "Миколаїв", inName: "у Миколаєві", phone: "301733", addresses: ["вул. Велика Морська, 74/3", "вул. Аркасівська, 8"], kids: true },
  { id: "odesa", name: "Одеса", inName: "в Одесі", phone: "301730", addresses: ["вул. Мала Арнаутська, 56"], kids: true },
  { id: "poltava", name: "Полтава", inName: "у Полтаві", phone: "307733", addresses: ["пр. Віталія Грицаєнка (пр. Першотравневий), 18-А"], kids: true },
  { id: "sumy", name: "Суми", inName: "у Сумах", phone: "301733", addresses: ["вул. Харківська, 23"], kids: false },
  { id: "uzhhorod", name: "Ужгород", inName: "в Ужгороді", phone: "307733", addresses: ["вул. Д. Богуславського, 4"], kids: false },
  { id: "kharkiv", name: "Харків", inName: "у Харкові", phone: "301177", addresses: ["вул. Ярослава Мудрого, 30а"], kids: true, emergency: true, surgery: true },
  { id: "cherkasy", name: "Черкаси", inName: "у Черкасах", phone: "300700", addresses: ["вул. Чехова, 43"], kids: false },
  { id: "chernihiv", name: "Чернігів", inName: "у Чернігові", phone: "300700", addresses: ["вул. Героїв Чорнобиля, 3"], kids: false },
];

export function cityTags(c: City): string[] {
  const tags = ["дорослий центр"];
  if (c.kids) tags.push("дитячий центр");
  if (c.emergency) tags.push("швидка допомога");
  if (c.surgery) tags.push("оперблок і стаціонар");
  return tags;
}

/** Short line under a city name in the hero index (concept 5, «Перший екран») */
export function cityNote(c: City): string {
  if (c.emergency) return "швидка, оперблок";
  if (c.kids) return "дитячий центр";
  return "";
}

// C-012
export const bots = {
  telegram: "https://t.me/ONClinicChatBot",
  viber: "viber://pa?chatURI=onclinicchatbot",
};

export const kidsCities = cities.filter((c) => c.kids).map((c) => c.name);
export const kharkiv = cities.find((c) => c.id === "kharkiv")!;

// home-desktop-s05.png (5 з 5 and the review counts as shown on the client's homepage)
export const doctors = [
  { name: "Мандзяк Тетяна Ігорівна", role: "Лікар-гінеколог", category: "Перша категорія", years: "Стаж роботи 15 років", rating: "5 з 5", reviews: "34 відгуки", tags: ["Гінеколог", "УЗД", "Дитячий гінеколог"], photo: "mandzyak" },
  { name: "Яковець Олег Петрович", role: "Лікар-ендоскопіст", category: "Перша категорія", years: "Стаж роботи 28 років", rating: "5 з 5", reviews: "22 відгуки", tags: ["Ендоскопіст"], photo: "yakovets" },
  { name: "Коротких Олександр Миколайович", role: "Лікар-ендоскопіст", category: "Вища категорія", years: "Стаж роботи 19 років", rating: "5 з 5", reviews: "12 відгуків", tags: ["Ендоскопіст"], photo: "korotkykh" },
];

// home-desktop-s05.png, verbatim
export const review = {
  text: "Відчувається, що лікарка досвідчена. Усі призначення по суті і зрозуміло.",
  author: "Яна",
  date: "13.10.2026",
  dateIso: "2026-10-13",
  physician: "Баранік Г. А.",
  rating: "5 з 5",
  source: "medcentre",
};

// C-017, home-desktop-fold.png; only offers valid on the build date
export const offers = [
  { city: "Дніпро", title: "Час для себе: знижка 15% на естетичні операції в «ОН Клінік Дніпро»", from: "01.11.26", fromIso: "2026-11-01", to: "31.12.26", toIso: "2026-12-31", phone: "301730" as PhoneId },
  { city: "Одеса", title: "Первинний прийом проктолога в «ОН Клінік Одеса» за 600 грн", from: "26.10.26", fromIso: "2026-10-26", to: "26.11.26", toIso: "2026-11-26", phone: "301730" as PhoneId },
];

// C-018, home-desktop-s06.png
export const articles = [
  { title: "Що робити, якщо вночі терпнуть руки?", author: "Назаров Владислав Віталійович, лікар-терапевт, ендокринолог" },
  { title: "Передчасне відшарування плаценти під час вагітності: симптоми та що робити вагітній за підозри на ускладнення", author: "Попович Зоряна, авторка та редакторка інформаційних статей" },
];

export const note = "Розділ у розробці";
export const noteForm = "Онлайн-запис з’явиться в повній версії сайту";
