import { ArrowDownRight } from 'lucide-react'
import { gallery } from '../data'
import { useI18n } from '../i18n'

export function Hero({ onTrial }) {
  const { t } = useI18n()
  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden bg-ink">
      <img
        src={gallery.hero}
        alt={t.hero.alt}
        className="kenburns absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
      <div className="motion-lines absolute inset-0 opacity-40 mix-blend-screen" />
      <div className="grain absolute inset-0" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 md:px-8 md:pb-20">
        <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.38em] text-ember">{t.hero.kicker}</p>
        <h1 className="max-w-5xl font-display text-[18vw] leading-[0.84] text-paper sm:text-7xl md:text-8xl lg:text-[8.4rem]">
          {t.hero.lines[0]}
          <br />
          {t.hero.lines[1]}
          <br />
          <span className="text-ember">{t.hero.lines[2]}</span>
        </h1>
        <p className="mt-6 max-w-xl text-base text-paper/80 md:text-lg">{t.hero.text}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onTrial}
            className="bg-ember px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5 hover:bg-flare hover:shadow-glow"
          >
            {t.hero.start}
          </button>
          <a
            href="#tariffe"
            className="border border-white/30 px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] transition hover:-translate-y-0.5 hover:border-ember hover:text-ember"
          >
            {t.hero.plans}
          </a>
        </div>
        <a
          href="#chi-siamo"
          className="mt-12 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-paper/70"
        >
          {t.hero.scroll} <ArrowDownRight size={16} className="text-ember" />
        </a>
      </div>
    </section>
  )
}
