import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { images, studio } from "./data"
import it from "./locales/it"
import en from "./locales/en"
import de from "./locales/de"
import es from "./locales/es"
import pt from "./locales/pt"

export const LANGS = [
  { code: "it", label: "ITA" },
  { code: "en", label: "ENG" },
  { code: "de", label: "DE" },
  { code: "es", label: "ES" },
  { code: "pt", label: "PT" },
]

const packs = { it, en, de, es, pt }
const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem("rossi-lang")
    return packs[saved] ? saved : "it"
  })

  useEffect(() => {
    localStorage.setItem("rossi-lang", lang)
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(() => {
    const t = packs[lang]
    const formatDate = (iso, options) =>
      new Date(iso).toLocaleDateString(t.dateLocale, options || { day: "numeric", month: "long", year: "numeric" })
    return {
      lang,
      setLang,
      t,
      formatDate,
      images,
      studio: { ...studio, hours: t.hours, albo: t.albo, lawyer: t.lawyer },
    }
  }, [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useI18n() {
  return useContext(LanguageContext)
}

export const CHAT_TESTS = [
  /orari|aperto|hours|opening|öffnungs|geöffnet|horario|abierto|horário|aberto|wann/i,
  /dove|indirizzo|mappa|durini|where|address|adresse|dónde|dirección|onde|morada/i,
  /costo|prezzo|gratis|parcella|preventivo|cost|fee|free|quote|kosten|honorar|precio|gratuito|custo|orçamento/i,
  /video|call|prenot|book|termin|cita|marcação/i,
  /famiglia|separaz|family|separation|familie|trennung|familia|separac|família/i,
  /lavoro|licenzi|employ|dismiss|arbeit|kündig|laboral|despido|trabalho|desped/i,
  /civil|success|eredit|commerc|societ|amministr|contrat|zivil|handels|vertrag|mercantil|contrato/i,
]

export function LangSwitch() {
  const { lang, setLang, t } = useI18n()
  return (
    <div className="langs" role="group" aria-label={t.langLabel}>
      {LANGS.map((item) => (
        <button
          key={item.code}
          type="button"
          className={lang === item.code ? "on" : ""}
          aria-pressed={lang === item.code}
          onClick={() => setLang(item.code)}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
