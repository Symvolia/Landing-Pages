# The Velvet Table

Concept project: a fine-dining restaurant site set in Chiado, Lisbon. Built with Next.js (App Router), Tailwind CSS and `next-intl` in Italian, English, Portuguese and Spanish.

**Live demo:** https://the-velvet-table-symvolia.vercel.app/en · Part of my portfolio at [npdevelopment.xyz](https://npdevelopment.xyz)

Texts, awards and contacts are demo content. Photos are from Unsplash.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`: the proxy redirects to the default locale, `/it`.

## Pages

- `/[locale]` — home: hero, the house, menu preview, experiences, gallery, team and reservations
- `/[locale]/menu` — tasting, à la carte and wine list, with dish detail
- `/[locale]/experiences` — private dining, seasonal menus, wine pairing
- `/[locale]/about` — story, Michelin star and team
- `/[locale]/gallery` — grid with lightbox
- `/[locale]/reservations` — booking form with validation
- `/[locale]/contact` — address, hours, phone and map
- `/[locale]/privacy`, `/[locale]/terms`

## Forms and email

`POST /api/bookings` and `POST /api/newsletter` validate the request body with Zod. When the SMTP variables in `.env.example` are set, Nodemailer emails the restaurant and, for bookings, sends a confirmation to the guest. Without SMTP the request is still accepted and the UI confirms receipt; there is no database.

## Deploy

Import the `el-ninho` folder as a Vercel project and set the same environment variables (or run `scripts/deploy.sh`). No extra configuration is needed for Next.js.

## Implementation notes

- Fixed navbar that turns opaque on scroll on the home page.
- Remote images served through `next/image` (AVIF/WebP).
- Analytics and Hotjar load only when their IDs in the environment have the expected format.
- Map embedded from OpenStreetMap, no API key required.
