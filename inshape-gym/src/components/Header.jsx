import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks } from '../data'
import { languages, useI18n } from '../i18n'
import { Logo } from './Logo'

function LanguageSwitch({ className = '' }) {
  const { lang, setLang, t } = useI18n()

  return (
    <div className={`flex items-center gap-1 ${className}`} role="group" aria-label={t.langLabel}>
      {languages.map((language) => (
        <button
          key={language.id}
          type="button"
          onClick={() => setLang(language.id)}
          aria-label={language.label}
          aria-pressed={lang === language.id}
          className={`px-1.5 py-1 text-[11px] font-semibold tracking-[0.14em] ${
            lang === language.id ? 'text-ember' : 'text-paper/55 hover:text-paper'
          }`}
        >
          {language.short}
        </button>
      ))}
    </div>
  )
}

export function Header({ onTrial }) {
  const { t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition ${
        scrolled || open ? 'bg-ink/90 shadow-lg shadow-black/30 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 md:px-8">
        <Logo />
        <nav className="hidden items-center gap-6 xl:flex" aria-label={t.nav.main}>
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] font-medium uppercase tracking-[0.16em] text-paper/80 transition hover:text-ember"
            >
              {t.nav[item.id]}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitch className="hidden sm:flex" />
          <button
            type="button"
            onClick={onTrial}
            className="hidden bg-ember px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5 hover:bg-flare hover:shadow-glow lg:inline-flex"
          >
            {t.trialCta}
          </button>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center border border-white/15 xl:hidden"
            aria-expanded={open}
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 top-[4.5rem] z-40 bg-ink px-6 py-8 xl:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <nav className="flex flex-col gap-2" aria-label={t.nav.mobile}>
              {navLinks.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="border-b border-white/10 py-4 font-display text-5xl tracking-wide"
                >
                  {t.nav[item.id]}
                </motion.a>
              ))}
              <LanguageSwitch className="mt-6 sm:hidden" />
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  onTrial()
                }}
                className="mt-6 bg-ember px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-ink"
              >
                {t.trialCta}
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
