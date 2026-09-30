import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Seo from "../components/Seo"
import { useI18n } from "../i18n"
import { loadCrm } from "../store"

export default function Registry() {
  const { t, formatDate } = useI18n()
  const r = t.registry
  const [data, setData] = useState({ leads: [], bookings: [], newsletters: [] })
  useEffect(() => setData(loadCrm()), [])
  const stamp = (iso) => formatDate(iso, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
  return (
    <article className="page">
      <Seo title={r.seoTitle} description={r.seoDesc} path="/registro" />
      <div className="wrap">
        <nav className="crumbs" aria-label={t.pathLabel}><Link to="/">{t.homeCrumb}</Link><span>/</span><span>{r.crumb}</span></nav>
        <header className="page-title">
          <p className="kicker">{r.kicker}</p>
          <h1>{r.h1}</h1>
          <p className="intro">{r.intro}</p>
        </header>
        <h2>{r.leads}</h2>
        <table className="table">
          <thead><tr><th>{r.when}</th><th>{r.name}</th><th>{r.contact}</th><th>{r.area}</th><th>{r.note}</th></tr></thead>
          <tbody>
            {data.leads.length === 0 && <tr><td colSpan={5}>{r.emptyLeads}</td></tr>}
            {data.leads.map((l) => (
              <tr key={l.id}>
                <td>{stamp(l.at)}<br /><span className="badge">{l.kind}</span></td>
                <td>{l.name}</td>
                <td>{l.email}<br />{l.phone}</td>
                <td>{l.area}</td>
                <td>{l.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 style={{ marginTop: 28 }}>{r.video}</h2>
        <table className="table">
          <thead><tr><th>{r.when}</th><th>{r.name}</th><th>{t.consult.email}</th><th>{r.slot}</th><th>{r.topic}</th></tr></thead>
          <tbody>
            {data.bookings.length === 0 && <tr><td colSpan={5}>{r.emptyBook}</td></tr>}
            {data.bookings.map((b) => (
              <tr key={b.id}><td>{stamp(b.at)}</td><td>{b.name}</td><td>{b.email}</td><td>{b.slot}</td><td>{b.topic}</td></tr>
            ))}
          </tbody>
        </table>
        <h2 style={{ marginTop: 28 }}>{r.news}</h2>
        <ul>{data.newsletters.map((n) => <li key={n.id}>{n.email} · {stamp(n.at)}</li>)}</ul>
        {data.newsletters.length === 0 && <p>{r.emptyNews}</p>}
      </div>
    </article>
  )
}
