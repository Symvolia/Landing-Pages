# Landing Pages

Websites I designed and built, collected in one repository. The four industry sites are **concept projects**: complete, deployed demo sites for real sectors (restaurants, hospitality, professional studios, fitness) that show how I work from brief to launch. Each folder is an independent project with its own dependencies, build and Vercel deployment.

Portfolio and case studies: **[npdevelopment.xyz](https://npdevelopment.xyz)**

| Project | Live | What it is | Stack | Highlights |
| --- | --- | --- | --- | --- |
| [`portfolio/`](./portfolio) | [npdevelopment.xyz](https://npdevelopment.xyz) | My web designer & developer portfolio | Next.js, TypeScript, Tailwind, next-intl | 5 languages, case studies, dark/light theme, SEO (sitemap, hreflang, JSON-LD) |
| [`el-ninho/`](./el-ninho) | [Demo](https://the-velvet-table-symvolia.vercel.app/en) | The Velvet Table — fine-dining restaurant concept | Next.js App Router, Tailwind, next-intl | 4 languages, reservation form with validation (react-hook-form + zod) and email (Nodemailer) |
| [`hotel-bellavista/`](./hotel-bellavista) | [Demo](https://hotel-bellavista-umber.vercel.app/) | Hotel Bella Vista — hospitality concept | React, Vite, Tailwind | Room presentation, immersive gallery (Swiper), scroll animations (AOS) |
| [`studio-moretti/`](./studio-moretti) | [Demo](https://studio-legale-rossi-taupe.vercel.app/) | Studio Legale Rossi — law firm concept | React, Vite, React Router | 5 languages, 9 routed pages, structured data for local SEO |
| [`inshape-gym/`](./inshape-gym) | [Demo](https://inshape-gym-ruddy.vercel.app/) | InShape Gym — fitness concept | React, Vite, Tailwind, Framer Motion | 4 languages, animated sections, contact form via EmailJS |

Other projects featured in the portfolio: [symvolia-platform](https://github.com/Symvolia/symvolia-platform) (immersive artist website) and Into the Void (spatial audio synthesizer, [live demo](https://spatial-synth-symvolia.vercel.app/synth)).

## Running a project

```bash
cd <project-folder>
npm install
npm run dev
```

For the Next.js projects (`portfolio`, `el-ninho`), copy `.env.example` to `.env.local` when present.

## Deployment

Every site is deployed as its own Vercel project, with the project folder as root directory. There is no monorepo-level build.

## Author

**Nicolò Peruzzi** — web designer & developer · [npdevelopment.xyz](https://npdevelopment.xyz)
