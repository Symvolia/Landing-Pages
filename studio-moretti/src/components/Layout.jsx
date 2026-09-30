import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { Menu, MessageCircle, Search, X } from "lucide-react"
import { CHAT_TESTS, LangSwitch, useI18n } from "../i18n"
import { saveEntry } from "../store"

const SiteContext = createContext(null)
export function useSite() {
  return useContext(SiteContext)
}

function ConsultForm({ onDone, preset = "" }) {
  const { t } = useI18n()
  const [ok, setOk] = useState(false)
  function submit(e) {
    e.preventDefault()
    const fd = new FormData(e.target)
    if (fd.get("company")) return
    saveEntry("leads", {
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      area: fd.get("area"),
      message: fd.get("message"),
      kind: "consulenza",
    })
    setOk(true)
    e.target.reset()
    onDone?.()
  }
  if (ok) return <p className="form-ok">{t.consult.sent}</p>
  return (
    <form onSubmit={submit}>
      <input className="hp" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <label htmlFor="c-name">{t.consult.name}</label>
      <input id="c-name" name="name" required autoComplete="name" />
      <label htmlFor="c-email">{t.consult.email}</label>
      <input id="c-email" name="email" type="email" required autoComplete="email" />
      <label htmlFor="c-phone">{t.consult.phone}</label>
      <input id="c-phone" name="phone" required autoComplete="tel" />
      <label htmlFor="c-area">{t.consult.area}</label>
      <select id="c-area" name="area" defaultValue={preset || t.services[0].title}>
        {t.services.map((s) => <option key={s.slug}>{s.title}</option>)}
        <option>{t.consult.unsure}</option>
      </select>
      <label htmlFor="c-msg">{t.consult.msg}</label>
      <textarea id="c-msg" name="message" required placeholder={t.consult.msgPh} />
      <label className="check">
        <input type="checkbox" required />
        <span>{t.consult.privacyBefore}<Link to="/privacy">{t.consult.privacyLink}</Link>{t.consult.privacyAfter}</span>
      </label>
      <button className="btn" type="submit">{t.consult.send}</button>
    </form>
  )
}

export default function Layout({ children }) {
  const { lang, t, studio } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [consult, setConsult] = useState(false)
  const [consultArea, setConsultArea] = useState("")
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState(() => [{ from: "bot", text: t.chat.greeting }])
  const [cookies, setCookies] = useState(() => localStorage.getItem("rossi-cookies"))
  const location = useLocation()

  useEffect(() => {
    setMessages((m) => (m.length === 1 && m[0].from === "bot" ? [{ from: "bot", text: t.chat.greeting }] : m))
  }, [lang, t.chat.greeting])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMenu(false)
    setSearchOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  const searchIndex = useMemo(() => [
    ...t.services.map((s) => ({ title: s.title, text: s.excerpt, href: `/aree/${s.slug}` })),
    ...t.articles.map((a) => ({ title: a.title, text: a.excerpt, href: `/approfondimenti/${a.slug}` })),
    { title: t.nav.find((n) => n.to === "/contatti").label, text: `${studio.address} ${studio.city}`, href: "/contatti" },
  ], [t, studio.address, studio.city])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (q.length < 2) return []
    return searchIndex.filter((item) => `${item.title} ${item.text}`.toLowerCase().includes(q)).slice(0, 8)
  }, [query, searchIndex])

  function openConsult(area = "") {
    setConsultArea(area)
    setConsult(true)
  }

  function sendChat(e) {
    e.preventDefault()
    const text = new FormData(e.target).get("q").trim()
    if (!text) return
    e.target.reset()
    const i = CHAT_TESTS.findIndex((re) => re.test(text))
    const reply = i >= 0 ? t.chat.answers[i] : t.chat.fallback
    setMessages((m) => [...m, { from: "me", text }, { from: "bot", text: reply }])
  }

  function subscribe(e) {
    e.preventDefault()
    const email = new FormData(e.target).get("email")
    saveEntry("newsletters", { email })
    e.target.reset()
    alert(t.footer.subscribeOk)
  }

  return (
    <SiteContext.Provider value={{ openConsult }}>
      <a className="skip" href="#contenuto">{t.skip}</a>
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-inner">
          <Link to="/" className="brand" aria-label={`${studio.name}, ${t.homeCrumb}`}>
            <span className="mark">R</span>
            <span className="brand-copy">
              <strong>ROSSI</strong>
              <small>{t.brandSub}</small>
            </span>
          </Link>
          <nav className="nav" aria-label={t.navAria}>
            {t.nav.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? "active" : "")}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <LangSwitch />
            <button className="icon-btn" aria-label={t.searchAria} onClick={() => setSearchOpen(true)}>
              <Search size={18} />
            </button>
            <button className="btn small" onClick={() => openConsult()}>{t.consultShort}</button>
            <button className="icon-btn menu-btn" aria-label={menu ? t.menuClose : t.menuOpen} onClick={() => setMenu((v) => !v)}>
              {menu ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>
      <div className={`mobile-nav ${menu ? "open" : ""}`}>
        <LangSwitch />
        {t.nav.map((item) => <Link key={item.to} to={item.to}>{item.label}</Link>)}
        <button className="btn" onClick={() => openConsult()}>{t.consultFree}</button>
      </div>
      <main id="contenuto">{children}</main>
      <footer className="footer">
        <div className="wrap footer-grid">
          <div>
            <Link to="/" className="brand">
              <span className="mark">R</span>
              <span className="brand-copy">
                <strong>ROSSI</strong>
                <small>{t.brandFooter}</small>
              </span>
            </Link>
            <p style={{ marginTop: 16, maxWidth: "32ch" }}>
              {studio.address}, {studio.cap} {studio.city}<br />
              <a href={studio.phoneHref}>{studio.phone}</a><br />
              <a href={`mailto:${studio.email}`}>{studio.email}</a>
            </p>
          </div>
          <div>
            <h3>{t.footer.practice}</h3>
            {t.services.map((s) => <Link key={s.slug} to={`/aree/${s.slug}`}>{s.title}</Link>)}
          </div>
          <div>
            <h3>{t.footer.studio}</h3>
            <Link to="/chi-sono">{t.footer.who}</Link>
            <Link to="/testimonianze">{t.footer.stories}</Link>
            <Link to="/approfondimenti">{t.footer.articles}</Link>
            <Link to="/contatti">{t.footer.contact}</Link>
            <Link to="/registro">{t.footer.registry}</Link>
            <Link to="/privacy">{t.footer.privacy}</Link>
            <Link to="/cookie">{t.footer.cookies}</Link>
            <Link to="/disclaimer">{t.footer.disclaimer}</Link>
            <Link to="/termini">{t.footer.terms}</Link>
          </div>
          <div>
            <h3>{t.footer.newsTitle}</h3>
            <p style={{ marginBottom: 12 }}>{t.footer.newsText}</p>
            <form className="news-row" onSubmit={subscribe}>
              <input name="email" type="email" required placeholder={t.footer.emailPh} aria-label={t.footer.emailPh} />
              <button className="btn gold small" type="submit">{t.footer.subscribe}</button>
            </form>
          </div>
        </div>
        <div className="wrap sub">
          <span>© {new Date().getFullYear()} {studio.name} · P. IVA {studio.vat}</span>
          <span>{studio.albo}</span>
        </div>
      </footer>

      {searchOpen && (
        <div className="overlay" onClick={() => setSearchOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-labelledby="search-title">
            <button className="close" onClick={() => setSearchOpen(false)} aria-label={t.close}><X size={16} /></button>
            <p className="kicker">{t.search.kicker}</p>
            <h2 id="search-title">{t.search.title}</h2>
            <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.search.ph} aria-label={t.search.aria} />
            {results.map((item) => (
              <Link key={item.href + item.title} to={item.href} className="search-hit" onClick={() => setSearchOpen(false)}>
                <strong>{item.title}</strong>
                <span>{item.text.slice(0, 110)}</span>
              </Link>
            ))}
            {query.length >= 2 && results.length === 0 && <p>{t.search.empty}</p>}
            <p className="who" style={{ marginTop: 12 }}>{t.search.latest}: {t.articles[0].title}</p>
          </div>
        </div>
      )}

      {consult && (
        <div className="overlay" onClick={() => setConsult(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-labelledby="consult-title">
            <button className="close" onClick={() => setConsult(false)} aria-label={t.close}><X size={16} /></button>
            <p className="kicker">{t.consult.kicker}</p>
            <h2 id="consult-title">{t.consult.title}</h2>
            <p className="intro" style={{ margin: "8px 0 18px" }}>{t.consult.intro}</p>
            <ConsultForm preset={consultArea} />
          </div>
        </div>
      )}

      {chatOpen && (
        <section className="chat" aria-label={t.chat.aria}>
          <header>
            <div>
              <strong>{t.chat.title}</strong>
              <p>{t.chat.sub}</p>
            </div>
            <button className="icon-btn" style={{ color: "white", borderColor: "transparent" }} onClick={() => setChatOpen(false)} aria-label={t.close}><X size={16} /></button>
          </header>
          <div className="log">
            {messages.map((m, i) => <div key={i} className={`bubble ${m.from}`}>{m.text}</div>)}
          </div>
          <form onSubmit={sendChat}>
            <input name="q" placeholder={t.chat.ph} aria-label={t.chat.ph} />
            <button className="btn small" type="submit">{t.chat.send}</button>
          </form>
        </section>
      )}
      <button className="chat-btn" onClick={() => setChatOpen((v) => !v)}>
        <MessageCircle size={18} /> {t.chat.label}
      </button>

      {!cookies && (
        <aside className="cookies" role="dialog" aria-label={t.cookies.aria}>
          <strong>{t.cookies.title}</strong>
          <p>{t.cookies.body} <Link to="/cookie">{t.cookies.policy}</Link>.</p>
          <div className="row">
            <button className="btn small" onClick={() => { localStorage.setItem("rossi-cookies", "all"); setCookies("all") }}>{t.cookies.all}</button>
            <button className="btn ghost small" onClick={() => { localStorage.setItem("rossi-cookies", "necessary"); setCookies("necessary") }}>{t.cookies.necessary}</button>
          </div>
        </aside>
      )}
    </SiteContext.Provider>
  )
}

export { ConsultForm }
