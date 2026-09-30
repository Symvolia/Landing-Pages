import { ChevronDown } from 'lucide-react'
import { useI18n } from '../i18n'

export default function Hero({ onBook }) {
  const { t } = useI18n()

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen bg-cover bg-center flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(18,16,13,0.35) 0%, rgba(18,16,13,0.55) 100%),
                         url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=80')`,
      }}
    >
      <div className="text-center text-white z-10 px-6 max-w-3xl animate-fade-in">
        <p className="uppercase tracking-[0.42em] text-gold text-[11px] mb-6">
          {t.hero.kicker}
        </p>
        <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl font-medium mb-5 leading-[1.05]">
          {t.hero.title}
        </h1>
        <p className="text-base md:text-lg mb-10 font-light text-white/80 tracking-wide">
          {t.hero.subtitle}
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button type="button" onClick={onBook} className="btn-gold">
            {t.hero.book}
          </button>
          <a href="#about" className="btn-line">
            {t.hero.more}
          </a>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold/90"
        aria-label={t.hero.scroll}
      >
        <ChevronDown size={28} strokeWidth={1.25} />
      </a>
    </section>
  )
}
