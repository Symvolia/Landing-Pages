# Landing Pages

Monorepo con i siti landing sviluppati per clienti e portfolio. Ogni cartella è un progetto indipendente (install, build e deploy separati).

| Cartella | Progetto | Stack |
| --- | --- | --- |
| [`portfolio/`](./portfolio) | Portfolio Nicolò Peruzzi | Next.js, next-intl |
| [`el-ninho/`](./el-ninho) | The Velvet Table (ristorante) | Next.js, next-intl |
| [`hotel-bellavista/`](./hotel-bellavista) | Hotel Bellavista | Vite, React |
| [`inshape-gym/`](./inshape-gym) | InShape Gym | Vite, React |
| [`studio-moretti/`](./studio-moretti) | Studio legale Moretti | Vite, React |

## Avvio di un progetto

```bash
cd <cartella-progetto>
npm install
npm run dev
```

Per i progetti Next.js (`portfolio`, `el-ninho`) copia `.env.example` in `.env.local` se presente.

## Deploy

Ogni sito ha (o può avere) un progetto Vercel dedicato sulla rispettiva cartella root. Non c’è un deploy unico a livello monorepo.
