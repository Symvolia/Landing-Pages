import Seo from "../components/Seo"
import { Link } from "react-router-dom"
import { useSite } from "../components/Layout"
import { useI18n } from "../i18n"

export default function About() {
  const { openConsult } = useSite()
  const { t, images, studio } = useI18n()
  const a = t.about
  return (
    <article className="page">
      <Seo title={a.seoTitle} description={a.seoDesc} path="/chi-sono" />
      <div className="wrap">
        <nav className="crumbs" aria-label={t.pathLabel}>
          <Link to="/">{t.homeCrumb}</Link><span>/</span><span>{a.crumb}</span>
        </nav>
        <header className="page-title">
          <p className="kicker">{a.kicker}</p>
          <h1>{a.h1}</h1>
          <p className="intro">{a.intro}</p>
        </header>
        <div className="split">
          <img src={images.portrait} alt={a.alt} />
          <div className="prose">
            <h2>{a.h2}</h2>
            <p>{a.p1}</p>
            <p>{a.p2}</p>
            <p>{a.p3}</p>
            <div className="stats">
              {t.stats.map((s) => <div className="stat" key={s.label}><b>{s.value}</b><span>{s.label}</span></div>)}
            </div>
          </div>
        </div>

        <div className="two" style={{ marginTop: 48 }}>
          <div>
            <h2 style={{ fontSize: 32, marginBottom: 16 }}>{a.steps}</h2>
            <div className="timeline">
              {a.timeline.map(([y, text]) => (
                <div className="tl" key={y}><b>{y}</b><span>{text}</span></div>
              ))}
            </div>
          </div>
          <div>
            <div className="panel">
              <h3>{a.how}</h3>
              <p style={{ color: "var(--muted)", marginTop: 8 }}>{a.howText}</p>
            </div>
            <div className="panel">
              <h3>{a.aff}</h3>
              <ul className="list-check">
                <li>{studio.albo}</li>
                {a.affItems.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="panel">
              <img src={images.columns} alt={a.columnsAlt} style={{ borderRadius: 12, height: 180, width: "100%", objectFit: "cover" }} />
            </div>
          </div>
        </div>
        <div style={{ marginTop: 28 }}>
          <button className="btn" onClick={() => openConsult()}>{t.consultFree}</button>
        </div>
      </div>
    </article>
  )
}
