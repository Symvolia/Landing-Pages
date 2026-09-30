import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import Seo from "../components/Seo"
import AreaIcon from "../components/Icons"
import { useSite } from "../components/Layout"
import { useI18n } from "../i18n"

export default function Services() {
  const { openConsult } = useSite()
  const { t } = useI18n()
  const a = t.areas
  return (
    <article className="page">
      <Seo title={a.seoTitle} description={a.seoDesc} path="/aree-di-pratica" />
      <div className="wrap">
        <nav className="crumbs" aria-label={t.pathLabel}><Link to="/">{t.homeCrumb}</Link><span>/</span><span>{a.crumb}</span></nav>
        <header className="page-title">
          <p className="kicker">{a.kicker}</p>
          <h1>{a.h1}</h1>
          <p className="intro">{a.intro}</p>
        </header>
        <div className="cards">
          {t.services.map((s) => (
            <Link className="card" key={s.slug} to={`/aree/${s.slug}`}>
              <span className="icon"><AreaIcon name={s.icon} /></span>
              <p className="kicker" style={{ letterSpacing: "0.12em" }}>{s.kicker}</p>
              <h3>{s.title}</h3>
              <p>{s.excerpt}</p>
              <span className="more">{a.open} <ArrowRight size={16} /></span>
            </Link>
          ))}
        </div>
        <section className="cta" style={{ marginTop: 36 }}>
          <div>
            <h2>{a.ctaH}</h2>
            <p>{a.ctaP}</p>
          </div>
          <button className="btn gold" onClick={() => openConsult()}>{a.cta}</button>
        </section>
      </div>
    </article>
  )
}
