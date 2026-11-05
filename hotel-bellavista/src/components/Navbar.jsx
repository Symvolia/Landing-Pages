import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Menu, Star, X } from 'lucide-react'
import { useI18n } from '../i18n'
import { areas, journeyCopy, photo } from '../journey'

const languages = [
  { id: 'it', label: 'Italiano' },
  { id: 'en', label: 'English' },
  { id: 'pt', label: 'Português' },
]

// Jump to an area of the journey (immersive: camera move; reduced motion: the static list item).
function goToArea(index) {
  const item = document.getElementById(`area-${areas[index].id}`)
  if (item) item.scrollIntoView({ behavior: 'smooth', block: 'start' })
  else window.dispatchEvent(new CustomEvent('journey:goto', { detail: index }))
}

function LanguageSwitch({ light, className = '' }) {
  const { lang, setLang, t } = useI18n()
  return (
    <div className={`flex items-center gap-0.5 ${className}`} role="group" aria-label={t.langLabel}>
      {languages.map((language, k) => (
        <span key={language.id} className="flex items-center">
          {k > 0 ? <span className={`mx-1 h-3 w-px ${light ? 'bg-white/30' : 'bg-ink/20'}`} aria-hidden="true" /> : null}
          <button
            type="button"
            onClick={() => setLang(language.id)}
            aria-label={language.label}
            aria-pressed={lang === language.id}
            lang={language.id}
            className={`px-1 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${
              lang === language.id
                ? light
                  ? 'text-white'
                  : 'text-ink'
                : light
                  ? 'text-white/50 hover:text-white'
                  : 'text-ink/40 hover:text-ink'
            }`}
          >
            {language.id}
          </button>
        </span>
      ))}
    </div>
  )
}

function Brand({ light }) {
  const { t } = useI18n()
  return (
    <span className={`flex flex-col items-center leading-none ${light ? 'text-white' : 'text-ink'}`}>
      <span className="whitespace-nowrap font-playfair text-[1.2rem] tracking-tight sm:text-[1.45rem]">Hotel Bella Vista</span>
      <span className="mt-1.5 flex items-center gap-0.5 text-gold" aria-label={t.brandStars}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Star key={index} size={9} strokeWidth={1.25} className="fill-gold" />
        ))}
      </span>
    </span>
  )
}

function AreaCard({ area, index, copy, onPick, compact = false }) {
  const text = copy.areas[area.id]
  return (
    <button type="button" onClick={() => onPick(index)} className="group block w-full text-left">
      <span className={`relative block overflow-hidden rounded-md ${compact ? 'aspect-[3/4]' : 'aspect-[4/5]'}`}>
        <img
          {...photo(area.image)}
          sizes={compact ? '45vw' : '14vw'}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
        <span className="absolute bottom-0 left-0 p-3">
          <span className="block text-[10px] uppercase tracking-[0.3em] text-[#f3d9a4]">{String(index + 1).padStart(2, '0')}</span>
          <span className="mt-1 block font-playfair text-lg leading-tight text-white">{text.name}</span>
        </span>
      </span>
    </button>
  )
}

export default function Navbar({ onBook }) {
  const { t, lang } = useI18n()
  const copy = journeyCopy[lang]
  const [isOpen, setIsOpen] = useState(false) // mobile menu
  const [explore, setExplore] = useState(false) // desktop "explore" panel
  const [overJourney, setOverJourney] = useState(true)
  const closeTimer = useRef(0)

  useEffect(() => {
    const check = () => {
      const journey = document.getElementById('journey')
      setOverJourney(Boolean(journey) && journey.getBoundingClientRect().bottom > 80)
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [])

  // Escape closes; the page doesn't scroll behind the mobile menu
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        setExplore(false)
      }
    }
    window.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [isOpen])

  const light = overJourney || explore
  const sectionLinks = [
    { name: t.nav.rooms, href: '#rooms' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.gallery, href: '#gallery' },
    { name: t.nav.contact, href: '#contact' },
  ]

  const pick = (index) => {
    setIsOpen(false)
    setExplore(false)
    goToArea(index)
  }
  const handleBook = () => {
    setIsOpen(false)
    setExplore(false)
    onBook()
  }
  const openExplore = () => {
    window.clearTimeout(closeTimer.current)
    setExplore(true)
  }
  const closeExploreSoon = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setExplore(false), 220)
  }

  const linkClass = `text-[11px] font-medium uppercase tracking-[0.2em] ${light ? 'text-white/85 hover:text-white' : 'text-ink/70 hover:text-ink'}`

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          explore
            ? 'bg-ink/85 backdrop-blur-xl'
            : light
              ? 'bg-gradient-to-b from-black/50 via-black/20 to-transparent'
              : 'border-b border-black/5 bg-cream/90 backdrop-blur-xl'
        }`}
        onMouseLeave={closeExploreSoon}
      >
        <div className="mx-auto grid h-[4.5rem] max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 lg:px-8">
          {/* left */}
          <div className="flex items-center gap-7">
            <button
              type="button"
              className={`lg:hidden ${light ? 'text-white' : 'text-ink'}`}
              aria-label={t.nav.openMenu}
              aria-expanded={isOpen}
              onClick={() => setIsOpen(true)}
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              className={`hidden items-center gap-1.5 lg:flex ${linkClass}`}
              aria-expanded={explore}
              aria-controls="explore-panel"
              onMouseEnter={openExplore}
              onFocus={openExplore}
              onClick={() => setExplore((v) => !v)}
            >
              {copy.exploreTitle}
              <ChevronDown size={14} strokeWidth={1.5} className={`transition-transform ${explore ? 'rotate-180' : ''}`} />
            </button>
            {sectionLinks.slice(0, 2).map((link) => (
              <a key={link.href} href={link.href} className={`hidden xl:block ${linkClass}`}>
                {link.name}
              </a>
            ))}
          </div>

          {/* centre */}
          <a href="#journey" aria-label={`${t.hero.title}, ${t.brandStars}`} onClick={() => setExplore(false)}>
            <Brand light={light} />
          </a>

          {/* right */}
          <div className="flex items-center justify-end gap-5">
            {sectionLinks.slice(2).map((link) => (
              <a key={link.href} href={link.href} className={`hidden xl:block ${linkClass}`}>
                {link.name}
              </a>
            ))}
            <LanguageSwitch light={light} className="hidden sm:flex" />
            <button type="button" onClick={handleBook} className={`pill !px-4 !py-2 sm:!px-5 sm:!py-2.5 ${light ? 'pill-glass' : 'pill-ink'}`}>
              {t.nav.book}
            </button>
          </div>
        </div>

        {/* desktop: explore panel */}
        {explore ? (
          <div id="explore-panel" className="hidden border-t border-white/10 lg:block" onMouseEnter={openExplore}>
            <div className="menu-in mx-auto grid max-w-7xl grid-cols-[minmax(0,15rem)_1fr] gap-10 px-8 pb-10 pt-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.36em] text-[#f3d9a4]">{copy.areasLabel}</p>
                <p className="mt-3 font-playfair text-3xl leading-tight text-white">{copy.exploreTitle}</p>
                <p className="mt-3 text-sm font-light leading-relaxed text-white/70">{copy.exploreIntro}</p>
              </div>
              <div className="grid grid-cols-7 gap-3">
                {areas.map((area, k) => (
                  <AreaCard key={area.id} area={area} index={k} copy={copy} onPick={pick} />
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </nav>

      {/* mobile: full-screen menu */}
      {isOpen ? (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-ink text-white lg:hidden" role="dialog" aria-modal="true" aria-label={t.nav.openMenu}>
          <div className="grid h-[4.5rem] grid-cols-[1fr_auto_1fr] items-center px-5">
            <button type="button" aria-label={t.nav.closeMenu} onClick={() => setIsOpen(false)} className="justify-self-start">
              <X size={22} strokeWidth={1.5} />
            </button>
            <Brand light />
            <span />
          </div>

          <div className="menu-in px-5 pt-6">
            <p className="text-[10px] uppercase tracking-[0.36em] text-[#f3d9a4]">{copy.exploreTitle}</p>
            <p className="mt-2 max-w-xs text-sm font-light text-white/70">{copy.exploreIntro}</p>
          </div>
          <ul className="menu-in mt-5 flex snap-x snap-mandatory scroll-pl-5 gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none]" style={{ animationDelay: '80ms' }}>
            {areas.map((area, k) => (
              <li key={area.id} className="w-[42vw] max-w-[180px] shrink-0 snap-start">
                <AreaCard area={area} index={k} copy={copy} onPick={pick} compact />
              </li>
            ))}
          </ul>

          <div className="menu-in px-5 pt-8" style={{ animationDelay: '160ms' }}>
            <p className="text-[10px] uppercase tracking-[0.36em] text-[#f3d9a4]">{copy.sections}</p>
            <ul className="mt-2">
              {sectionLinks.map((link) => (
                <li key={link.href} className="border-b border-white/10">
                  <a href={link.href} onClick={() => setIsOpen(false)} className="block py-3.5 font-playfair text-3xl">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="menu-in flex flex-col gap-5 px-5 pb-10 pt-8" style={{ animationDelay: '240ms' }}>
            <button type="button" onClick={handleBook} className="pill pill-gold w-full !py-4">
              {t.nav.book}
            </button>
            <LanguageSwitch light className="justify-center" />
          </div>
        </div>
      ) : null}
    </>
  )
}
