import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { de } from './locales/de'
import { en } from './locales/en'
import { it } from './locales/it'
import { pt } from './locales/pt'

const LanguageContext = createContext(null)

export const languages = [
  { id: 'it', label: 'Italiano', short: 'IT' },
  { id: 'en', label: 'English', short: 'EN' },
  { id: 'pt', label: 'Português', short: 'PT' },
  { id: 'de', label: 'Deutsch', short: 'DE' },
]

const copy = { it, en, pt, de }

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('inshape-lang')
    return copy[saved] ? saved : 'it'
  })

  useEffect(() => {
    localStorage.setItem('inshape-lang', lang)
    document.documentElement.lang = lang
    document.title = copy[lang].title
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', copy[lang].description)
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t: copy[lang] }), [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useI18n() {
  return useContext(LanguageContext)
}
