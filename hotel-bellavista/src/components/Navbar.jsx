import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import BrandMark from './BrandMark'
import { useI18n } from '../i18n'

function Flag({ children }) {
  return (
    <svg viewBox="0 0 18 12" className="block w-[20px] h-[14px]" aria-hidden="true">
      {children}
    </svg>
  )
}

const languages = [
  {
    id: 'it',
    label: 'Italiano',
    flag: (
      <Flag>
        <rect width="6" height="12" fill="#009246" />
        <rect x="6" width="6" height="12" fill="#fff" />
        <rect x="12" width="6" height="12" fill="#CE2B37" />
      </Flag>
    ),
  },
  {
    id: 'en',
    label: 'English',
    flag: (
      <Flag>
        <rect width="18" height="12" fill="#012169" />
        <path d="M0 0 L18 12 M18 0 L0 12" stroke="#fff" strokeWidth="2.4" />
        <path d="M0 0 L18 12 M18 0 L0 12" stroke="#C8102E" strokeWidth="1.2" />
        <path d="M9 0 V12 M0 6 H18" stroke="#fff" strokeWidth="4" />
        <path d="M9 0 V12 M0 6 H18" stroke="#C8102E" strokeWidth="2" />
      </Flag>
    ),
  },
  {
    id: 'pt',
    label: 'Português',
    flag: (
      <Flag>
        <rect width="7" height="12" fill="#006600" />
        <rect x="7" width="11" height="12" fill="#FF0000" />
        <circle cx="7" cy="6" r="2.2" fill="#FFCC00" />
      </Flag>
    ),
  },
]

function LanguageSwitch() {
  const { lang, setLang, t } = useI18n()

  return (
    <div className="flex items-center gap-1.5" role="group" aria-label={t.langLabel}>
      {languages.map((language) => (
        <button
          key={language.id}
          type="button"
          onClick={() => setLang(language.id)}
          aria-label={language.label}
          aria-pressed={lang === language.id}
          className={`border border-black/15 overflow-hidden leading-none ${
            lang === language.id ? 'ring-1 ring-ink ring-offset-2' : 'opacity-55 hover:opacity-100'
          }`}
        >
          {language.flag}
        </button>
      ))}
    </div>
  )
}

export default function Navbar({ onBook }) {
  const { t } = useI18n()
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: t.nav.home, href: '#hero' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.rooms, href: '#rooms' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.gallery, href: '#gallery' },
    { name: t.nav.contact, href: '#contact' },
  ]

  const handleBook = () => {
    setIsOpen(false)
    onBook()
  }

  return (
    <nav className="fixed w-full bg-cream/90 backdrop-blur-xl z-50 border-b border-black/5">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-[4.5rem] flex justify-between items-center gap-6">
        <a href="#hero" className="shrink min-w-0" aria-label={`${t.hero.title}, ${t.brandStars}`}>
          <BrandMark />
        </a>

        <div className="flex items-center gap-4 lg:gap-8">
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-ink/70 hover:text-ink text-[11px] uppercase tracking-[0.18em] font-medium"
              >
                {link.name}
              </a>
            ))}
            <button type="button" onClick={handleBook} className="btn-ink !px-5 !py-2.5">
              {t.nav.book}
            </button>
          </div>

          <LanguageSwitch />

          <button
            type="button"
            className="lg:hidden text-ink"
            aria-label={isOpen ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-cream border-t border-black/5">
          <div className="flex flex-col gap-1 px-5 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-ink py-3 text-sm tracking-wide border-b border-black/5"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button type="button" onClick={handleBook} className="btn-ink mt-4 w-full">
              {t.nav.book}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
