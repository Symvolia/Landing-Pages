# The Velvet Table

Sito del ristorante The Velvet Table, nel Chiado a Lisbona. Next.js (App Router), Tailwind CSS e `next-intl` per italiano, inglese, portoghese e spagnolo.

I testi, i premi e i contatti sono contenuti dimostrativi. Le fotografie arrivano da Unsplash.

## Avvio

```bash
npm install
cp .env.example .env.local
npm run dev
```

Apri `http://localhost:3000`: il proxy reindirizza alla lingua predefinita, `/it`.

## Pagine

- `/[locale]` home, con hero, casa, menu in sintesi, esperienze, galleria, team e prenotazione
- `/[locale]/menu` degustazione, à la carte e vini, con scheda di dettaglio
- `/[locale]/experiences` cene private, menu di stagione, wine pairing
- `/[locale]/about` storia, stella Michelin e team
- `/[locale]/gallery` griglia con lightbox
- `/[locale]/reservations` modulo con validazione
- `/[locale]/contact` indirizzo, orari, telefono e mappa
- `/[locale]/privacy` e `/[locale]/terms`

## Moduli e email

`POST /api/bookings` e `POST /api/newsletter` validano il corpo con Zod. Se le variabili SMTP di `.env.example` sono compilate, Nodemailer invia una mail alla sala e, per le prenotazioni, una conferma all’ospite. Senza SMTP la richiesta resta valida e l’interfaccia conferma la ricezione: non c’è un database.

## Deploy su Vercel

```bash
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

In alternativa, importa la cartella `el-ninho` su Vercel e imposta le stesse variabili d’ambiente. Il framework è Next.js, non serve una configurazione aggiuntiva.

## Note

- La navbar è fissa e diventa opaca allo scroll sulla home.
- Le immagini remote passano da `next/image` (AVIF/WebP).
- Analytics e Hotjar si caricano solo se gli identificatori in ambiente sono nel formato atteso.
- La mappa è un embed di OpenStreetMap, senza chiave API.
