import { Link, useParams } from "react-router-dom"
import Seo from "../components/Seo"
import { useSite } from "../components/Layout"
import { useI18n } from "../i18n"

export function Blog() {
  const { t, formatDate } = useI18n()
  const b = t.blog
  return (
    <article className="page">
      <Seo title={b.seoTitle} description={b.seoDesc} path="/approfondimenti" />
      <div className="wrap">
        <nav className="crumbs" aria-label={t.pathLabel}><Link to="/">{t.homeCrumb}</Link><span>/</span><span>{b.crumb}</span></nav>
        <header className="page-title">
          <p className="kicker">{b.kicker}</p>
          <h1>{b.h1}</h1>
          <p className="intro">{b.intro}</p>
        </header>
        <div className="article-list">
          {t.articles.map((a) => (
            <Link className="article-row" key={a.slug} to={`/approfondimenti/${a.slug}`}>
              <div>
                <div className="meta">{a.category}</div>
                <div className="who">{formatDate(a.date)} · {a.read}</div>
              </div>
              <div>
                <h2>{a.title}</h2>
                <p>{a.excerpt}</p>
              </div>
              <span className="more">{t.read}</span>
            </Link>
          ))}
        </div>
      </div>
    </article>
  )
}

export function Article() {
  const { slug } = useParams()
  const { openConsult } = useSite()
  const { t, formatDate } = useI18n()
  const b = t.blog
  const article = t.articles.find((a) => a.slug === slug)
  if (!article) {
    return (
      <article className="page">
        <div className="wrap-s">
          <h1>{t.articleMissing}</h1>
          <Link className="btn" to="/approfondimenti">{t.backArticles}</Link>
        </div>
      </article>
    )
  }
  const area = t.services.find((s) => s.slug === article.categorySlug)
  const more = t.articles.filter((a) => a.slug !== article.slug).slice(0, 2)

  return (
    <article className="page">
      <Seo title={article.title} description={article.excerpt} path={`/approfondimenti/${article.slug}`} />
      <div className="wrap-s">
        <nav className="crumbs" aria-label={t.pathLabel}>
          <Link to="/">{t.homeCrumb}</Link><span>/</span>
          <Link to="/approfondimenti">{b.crumb}</Link><span>/</span>
          <span>{article.category}</span>
        </nav>
        <p className="kicker">{article.category}</p>
        <h1 style={{ fontSize: "clamp(34px, 4vw, 48px)", margin: "12px 0" }}>{article.title}</h1>
        <p className="who">{formatDate(article.date)} · {article.read} {b.readTime} · {article.keywords}</p>
        <div className="prose" style={{ marginTop: 22 }}>
          {article.content.map((block) => (
            <section key={block.h}>
              <h2>{block.h}</h2>
              <p>{block.p}</p>
            </section>
          ))}
        </div>
        <div className="panel" style={{ marginTop: 28 }}>
          <h2 style={{ fontSize: 26 }}>{b.ctaH}</h2>
          <p style={{ color: "var(--muted)", margin: "8px 0 14px" }}>{b.ctaP}</p>
          <button className="btn" onClick={() => openConsult(article.category)}>{t.consultFree}</button>
          {area && <p style={{ marginTop: 12 }}><Link to={`/aree/${area.slug}`}>{b.goArea} {area.title}</Link></p>}
        </div>
        <h3 style={{ marginTop: 28 }}>{b.more}</h3>
        {more.map((a) => (
          <Link key={a.slug} to={`/approfondimenti/${a.slug}`} className="mini" style={{ display: "block" }}>
            <strong>{a.title}</strong>
            <span>{a.category}</span>
          </Link>
        ))}
      </div>
    </article>
  )
}
