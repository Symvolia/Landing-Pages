import { Kicker } from "./ui";

export function PageHero({ kicker, title, intro }: { kicker: string; title: string; intro: string }) {
  return (
    <header className="bg-ink pt-32 text-cream md:pt-40">
      <div className="mx-auto max-w-[1200px] px-6 pb-16 md:px-10 md:pb-20">
        <Kicker className="text-gold">{kicker}</Kicker>
        <h1 className="mt-5 max-w-3xl font-serif text-5xl font-medium leading-[1.05] md:text-7xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/75 md:text-lg">{intro}</p>
      </div>
    </header>
  );
}
