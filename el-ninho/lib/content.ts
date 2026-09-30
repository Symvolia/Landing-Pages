import { photo } from "./constants";

export const allergens = [
  "gluten",
  "crustaceans",
  "eggs",
  "fish",
  "milk",
  "nuts",
  "molluscs",
  "sulphites",
] as const;

export type Allergen = (typeof allergens)[number];
export type MenuCategory = "tasting" | "carte" | "wines";

export type MenuItem = {
  id: string;
  category: MenuCategory;
  price: string;
  allergens: Allergen[];
};

export const menuItems: MenuItem[] = [
  { id: "oyster", category: "tasting", price: "", allergens: ["molluscs"] },
  { id: "egg", category: "tasting", price: "", allergens: ["eggs", "milk"] },
  { id: "urchin", category: "tasting", price: "", allergens: ["molluscs", "milk"] },
  { id: "turbot", category: "tasting", price: "", allergens: ["fish", "molluscs", "milk"] },
  { id: "lamb", category: "tasting", price: "", allergens: ["gluten"] },
  { id: "chocolate", category: "tasting", price: "", allergens: ["milk", "nuts"] },
  { id: "prawn", category: "carte", price: "32", allergens: ["crustaceans"] },
  { id: "burrata", category: "carte", price: "24", allergens: ["milk"] },
  { id: "risotto", category: "carte", price: "36", allergens: ["milk"] },
  { id: "octopus", category: "carte", price: "38", allergens: ["molluscs"] },
  { id: "duck", category: "carte", price: "44", allergens: [] },
  { id: "lemon", category: "carte", price: "16", allergens: ["gluten", "eggs", "milk"] },
  { id: "bairrada", category: "wines", price: "14 / 68", allergens: ["sulphites"] },
  { id: "encruzado", category: "wines", price: "12 / 52", allergens: ["sulphites"] },
  { id: "douro", category: "wines", price: "13 / 58", allergens: ["sulphites"] },
  { id: "barolo", category: "wines", price: "22 / 110", allergens: ["sulphites"] },
  { id: "champagne", category: "wines", price: "28 / 160", allergens: ["sulphites"] },
];

export const galleryImages = [
  { id: "g1", src: photo("photo-1414235077428-338989a2e8c0", 1400), tall: true },
  { id: "g2", src: photo("photo-1559339352-11d035aa65de", 1200), tall: false },
  { id: "g3", src: photo("photo-1510812431401-41d2bd2722f3", 1200), tall: false },
  { id: "g4", src: photo("photo-1550966871-3ed3cdb5ed0c", 1400), tall: true },
  { id: "g5", src: photo("photo-1467003909585-2f8a72700288", 1200), tall: false },
  { id: "g6", src: photo("photo-1424847651672-bf20a4b0982b", 1400), tall: true },
  { id: "g7", src: photo("photo-1488477181946-6428a0291777", 1200), tall: false },
  { id: "g8", src: photo("photo-1551218808-94e220e084d2", 1400), tall: true },
] as const;

export const team = [
  {
    id: "mateo",
    image: photo("photo-1577219491135-ce391730fb2c", 900),
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
  },
  {
    id: "ines",
    image: photo("photo-1583394293214-28ded15ee548", 900),
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
  },
  {
    id: "rafael",
    image: photo("photo-1500648767791-00dcc994a43e", 900),
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
  },
  {
    id: "sofia",
    image: photo("photo-1544005313-94ddf0286df2", 900),
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
  },
] as const;

export const experiences = [
  { id: "private", image: photo("photo-1550966871-3ed3cdb5ed0c", 1400) },
  { id: "seasonal", image: photo("photo-1467003909585-2f8a72700288", 1400) },
  { id: "wine", image: photo("photo-1510812431401-41d2bd2722f3", 1400) },
] as const;

export const heroImage = photo("photo-1414235077428-338989a2e8c0", 2200);
export const aboutImages = {
  chef: photo("photo-1577219491135-ce391730fb2c", 1200),
  kitchen: photo("photo-1556910103-1c02745aae4d", 1200),
  room: photo("photo-1517248135467-4c7edcad34c4", 1400),
};
