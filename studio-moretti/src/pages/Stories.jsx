import { Link } from "react-router-dom"
import Seo from "../components/Seo"
import { useSite } from "../components/Layout"
import { useI18n } from "../i18n"

function Stars({ n, label }) {
  return <div className="stars" aria-label={label}>{"★".repeat(n)}{"☆".repeat(5 - n)}</div>
}

export default function Stories() {
  const { openConsult } = useSite()
  const { t, studio } = useI18n()
  const s = t.stories
  return (
    <article className="page">
      <Seo title={s.seoTitle} description={s.seoDesc} path="/testimonianze" />
      <div className="wrap">
        <nav className="crumbs" aria-label={t.pathLabel}><Link to="/">{t.homeCrumb}</Link><span>/</span><span>{s.crumb}</span></nav>
        <header className="page-title">
          <p className="kicker">{s.kicker}</p>
          <h1>{s.h1}</h1>
        </header>
        <div className="rating-hero">
          <div>
            <b>{studio.rating}</b>
            <Stars n={5} label={s.stars} />
            <p>{s.average} {studio.reviews} {s.reviews}</p>
          </div>
          <div className="sources">
            <span className="source">Google · 4.9</span>
            <span className="source">Facebook · 4.8</span>
          </div>
        </div>
        <div className="review-grid">
          {t.testimonials.map((item) => (
            <article className="panel" key={item.name + item.area}>
              <Stars n={item.stars} label={s.stars} />
              <p>{item.text}</p>
              <p className="who" style={{ marginTop: 12 }}>{item.name} · {item.role}<br />{item.area} · {item.source}</p>
            </article>
          ))}
        </div>
        <h2 style={{ fontSize: 36, margin: "48px 0 16px" }}>{s.casesH}</h2>
        <div className="study-grid">
          {t.caseStudies.map((c) => (
            <article className="panel" key={c.title}>
              <p className="kicker">{c.area} · {c.time}</p>
              <h3 style={{ fontSize: 26, margin: "10px 0" }}>{c.title}</h3>
              <p style={{ color: "var(--muted)" }}>{c.text}</p>
              <p style={{ marginTop: 12 }}><strong>{s.outcome} </strong>{c.result}</p>
            </article>
          ))}
        </div>
        <section className="cta">
          <div>
            <h2>{s.ctaH}</h2>
            <p>{s.ctaP}</p>
          </div>
          <button className="btn gold" onClick={() => openConsult()}>{s.cta}</button>
        </section>
      </div>
    </article>
  )
}
