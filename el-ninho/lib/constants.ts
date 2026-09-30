export const site = {
  name: "The Velvet Table",
  phoneDisplay: "+351 21 342 1180",
  phoneHref: "tel:+351213421180",
  email: "reservas@thevelvettable.pt",
  street: "Rua Garrett 88",
  postal: "1200-205 Lisboa",
  country: "Portugal",
  mapsUrl: "https://maps.google.com/?q=Rua+Garrett+88+Lisboa",
  mapsEmbed:
    "https://www.openstreetmap.org/export/embed.html?bbox=-9.1478%2C38.7076%2C-9.1352%2C38.7144&layer=mapnik&marker=38.7109%2C-9.1416",
  instagram: "https://www.instagram.com/",
  facebook: "https://www.facebook.com/",
  tripadvisor: "https://www.tripadvisor.com/",
  linkedin: "https://www.linkedin.com/",
} as const;

export const navItems = [
  { href: "/", key: "home" },
  { href: "/menu", key: "menu" },
  { href: "/experiences", key: "experiences" },
  { href: "/about", key: "about" },
  { href: "/gallery", key: "gallery" },
  { href: "/reservations", key: "reservations" },
  { href: "/contact", key: "contact" },
] as const;

export const locales = [
  { code: "it", label: "Italiano" },
  { code: "en", label: "English" },
  { code: "pt", label: "Português" },
  { code: "es", label: "Español" },
] as const;

export const reservationTimes = ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30"] as const;

export function photo(id: string, width = 1800) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=75`;
}
