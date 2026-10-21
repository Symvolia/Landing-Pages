export type ProjectType = "concept" | "client" | "personal";

export const projects = [
  {
    id: "velvet",
    category: "restaurant",
    type: "concept",
    title: "The Velvet Table",
    href: "https://the-velvet-table-symvolia.vercel.app/en",
    image: "/work/velvet.jpg",
    tech: ["Next.js", "React", "Tailwind"],
  },
  {
    id: "hotel",
    category: "hospitality",
    type: "concept",
    title: "Hotel Bellavista",
    href: "https://hotel-bellavista-umber.vercel.app/",
    image: "/work/hotel.jpg",
    tech: ["React", "Tailwind", "Vite"],
  },
  {
    id: "studio",
    category: "legal",
    type: "concept",
    title: "Studio Legale Rossi",
    href: "https://studio-legale-rossi-taupe.vercel.app/",
    image: "/work/studio.jpg",
    tech: ["React", "Vite"],
  },
  {
    id: "gym",
    category: "fitness",
    type: "concept",
    title: "InShape Gym",
    href: "https://inshape-gym-ruddy.vercel.app/",
    image: "/work/gym.jpg",
    tech: ["React", "Tailwind", "Vite"],
  },
  {
    id: "symvolia",
    category: "creative",
    type: "personal",
    title: "Symvolia",
    href: "https://symvolia.xyz",
    image: "/work/symvolia.jpg",
    tech: ["HTML/CSS/JS", "Three.js", "GSAP", "Web Audio"],
  },
  {
    id: "synth",
    category: "creative",
    type: "personal",
    title: "Into the Void",
    href: "https://spatial-synth-symvolia.vercel.app/synth",
    image: "/work/synth.png",
    tech: ["Web Audio", "AudioWorklet", "Canvas", "React"],
  },
] as const satisfies ReadonlyArray<{
  id: string;
  category: string;
  type: ProjectType;
  title: string;
  href: string;
  image: string;
  tech: readonly string[];
}>;

export type ProjectId = (typeof projects)[number]["id"];
export type ProjectCategory = (typeof projects)[number]["category"];
