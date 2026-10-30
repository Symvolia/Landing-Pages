# Landing Pages

A collection of production landing sites I designed and built for clients and for my own portfolio. Each folder is an independent project with its own dependencies, build and Vercel deployment.

| Project | What it is | Stack | Highlights |
| --- | --- | --- | --- |
| [`portfolio/`](./portfolio) | My developer portfolio ([npdevelopment.xyz](https://npdevelopment.xyz)) | Next.js, next-intl | Multilingual (IT/EN), case studies |
| [`el-ninho/`](./el-ninho) | The Velvet Table, restaurant in Chiado, Lisbon | Next.js App Router, Tailwind, next-intl | 4 languages, booking form with validation (react-hook-form + zod) and email (Nodemailer) |
| [`hotel-bellavista/`](./hotel-bellavista) | Hotel Bellavista | React, Vite, Tailwind | Image carousels (Swiper), scroll animations (AOS) |
| [`inshape-gym/`](./inshape-gym) | InShape Gym | React, Vite, Framer Motion | Animated sections, contact form via EmailJS |
| [`studio-moretti/`](./studio-moretti) | Moretti law firm | React, Vite, React Router | Multi-page site with client-side routing |

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

**Nicolò Peruzzi** — web designer & developer · [npdevelopment.xyz](https://npdevelopment.xyz) · [LinkedIn](https://linkedin.com/in/nicoloperuzzi)
