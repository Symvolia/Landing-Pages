import { Link, useParams } from "react-router-dom"
import Seo from "../components/Seo"
import AreaIcon from "../components/Icons"
import { useSite } from "../components/Layout"
import { useI18n } from "../i18n"

export default function Service() {
  const { slug } = useParams()
  const { openConsult } = useSite()
  const { t, images } = useI18n()
  const service = t.services.find((s) => s.slug === slug)
  const s = t.svc
  if (!service) {
    return (
      <article className="page">
        <div className="wrap-s">
          <h1>{t.areaMissing}</h1>
          <p className="intro">{t.areaMissingText}</p>
          <Link className="btn" to="/aree-di-pratica">{t.seeAreas}</Link>
        </div>
      </article>
    )
  }
  const related = t.articles.filter((a) => a.categorySlug === service.slug).slice(0, 2)
  const others = t.services.filter((item) => item.slug !== service.slug).slice(0, 3)

  return (
    <article className="page">
      <Seo title={`${service.title} ${s.inMilan}`} description={service.seo} path={`/aree/${service.slug}`} />
      <div className="wrap">
        <nav className="crumbs" aria-label={t.pathLabel}>
          <Link to="/">{t.homeCrumb}</Link><span>/</span>
          <Link to="/aree-di-pratica">{t.areas.crumb}</Link><span>/</span>
          <span>{service.title}</span>
        </nav>
        <header className="page-title">
          <p className="kicker">{service.kicker}</p>
          <h1>{service.title}</h1>
          <p className="intro">{service.excerpt}</p>
        </header>
        <div className="two">
          <div className="prose">
            <img src={images.books} alt="" style={{ borderRadius: 16, height: 280, width: "100%", objectFit: "cover", marginBottom: 18 }} />
            <h2>{s.what}</h2>
            <p>{service.approach}</p>
            <h2>{s.problems}</h2>
            <ul>{service.problems.map((p) => <li key={p}>{p}</li>)}</ul>
            <h2>{s.cases}</h2>
            <ul>{service.cases.map((p) => <li key={p}>{p}</li>)}</ul>
            <h2>{s.how}</h2>
            <p>
              {s.howText} <Link to="/chi-sono">{s.studioPage}</Link>.
            </p>
            <h2>{s.faq}</h2>
            <div className="faq">
              {service.faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q} <span aria-hidden="true">+</span></summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
          <aside>
            <div className="panel">
              <span className="icon" style={{ marginBottom: 10 }}><AreaIcon name={service.icon} /></span>
              <h3>{s.results}</h3>
              <p style={{ color: "var(--muted)", fontSize: 14, margin: "8px 0 12px" }}>{s.resultsNote}</p>
              {service.results.map((r) => (
                <div className="mini" key={r.label}><strong>{r.label}</strong><span>{r.detail}</span></div>
              ))}
            </div>
            <div className="panel">
              <p className="serif" style={{ fontSize: 22, lineHeight: 1.35 }}>{service.quote.text}</p>
              <p className="who" style={{ marginTop: 10 }}>{service.quote.author}</p>
            </div>
            <div className="panel">
              <h3>{s.discuss}</h3>
              <p style={{ color: "var(--muted)", margin: "8px 0 14px" }}>{s.orient}</p>
              <button className="btn" onClick={() => openConsult(service.title)}>{s.contact}</button>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section style={{ marginTop: 36 }}>
            <h2 style={{ fontSize: 28, marginBottom: 8 }}>{s.readMore}</h2>
            {related.map((a) => (
              <Link key={a.slug} to={`/approfondimenti/${a.slug}`} className="article-row">
                <span className="meta">{a.category}</span>
                <strong>{a.title}</strong>
                <span>{t.read}</span>
              </Link>
            ))}
          </section>
        )}

        <section style={{ marginTop: 28 }}>
          <h2 style={{ fontSize: 22, marginBottom: 12 }}>{s.others}</h2>
          <div className="cards">
            {others.map((item) => (
              <Link key={item.slug} to={`/aree/${item.slug}`} className="card">
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  )
}
