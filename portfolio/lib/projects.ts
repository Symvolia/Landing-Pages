export const projects = [
  {
    id: "velvet",
    category: "restaurant",
    title: "The Velvet Table",
    href: "https://the-velvet-table-symvolia.vercel.app/en",
    image: "/work/velvet.jpg",
    tech: ["Next.js", "React", "Tailwind"],
  },
  {
    id: "hotel",
    category: "hospitality",
    title: "Hotel Bellavista",
    href: "https://hotel-bellavista-umber.vercel.app/",
    image: "/work/hotel.jpg",
    tech: ["React", "Tailwind", "Vite"],
  },
  {
    id: "studio",
    category: "legal",
    title: "Studio Legale Rossi",
    href: "https://studio-legale-rossi-taupe.vercel.app/",
    image: "/work/studio.jpg",
    tech: ["React", "Vite"],
  },
  {
    id: "gym",
    category: "fitness",
    title: "InShape Gym",
    href: "https://inshape-gym-ruddy.vercel.app/",
    image: "/work/gym.jpg",
    tech: ["React", "Tailwind", "Vite"],
  },
  {
    id: "symvolia",
    category: "creative",
    title: "Symvolia",
    href: "https://symvolia.xyz",
    image: "/work/symvolia.jpg",
    tech: ["JavaScript", "Motion", "Branding"],
  },
] as const;

export type ProjectId = (typeof projects)[number]["id"];
export type ProjectCategory = (typeof projects)[number]["category"];
