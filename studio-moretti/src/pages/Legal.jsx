import { Link } from "react-router-dom"
import Seo from "../components/Seo"
import { useI18n } from "../i18n"

function Shell({ page, path, studio, home, pathLabel }) {
  return (
    <article className="page">
      <Seo title={page.seoTitle} description={page.seoDesc} path={path} />
      <div className="wrap-s legal">
        <nav className="crumbs" aria-label={pathLabel}><Link to="/">{home}</Link><span>/</span><span>{page.h1}</span></nav>
        <h1>{page.h1}</h1>
        {page.lead && <p>{page.lead}</p>}
        {page.sections.map((block, i) => (
          <section key={block.h || i}>
            {block.h && <h2>{block.h}</h2>}
            {block.kind === "controller" && (
              <p>{studio.name}, {studio.lawyer}, {studio.address}, {studio.cap} {studio.city}. Email {studio.email}, {studio.phone}. P. IVA {studio.vat}.</p>
            )}
            {block.kind === "rights" && <p>{page.rights} {studio.email}. {page.rightsAfter}</p>}
            {block.p && <p>{block.p}</p>}
            {block.items && <ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>}
          </section>
        ))}
      </div>
    </article>
  )
}

export function Privacy() {
  const { t, studio } = useI18n()
  return <Shell page={t.legal.privacy} path="/privacy" studio={studio} home={t.homeCrumb} pathLabel={t.pathLabel} />
}

export function Cookies() {
  const { t, studio } = useI18n()
  return <Shell page={t.legal.cookies} path="/cookie" studio={studio} home={t.homeCrumb} pathLabel={t.pathLabel} />
}

export function Disclaimer() {
  const { t, studio } = useI18n()
  return <Shell page={t.legal.disclaimer} path="/disclaimer" studio={studio} home={t.homeCrumb} pathLabel={t.pathLabel} />
}

export function Terms() {
  const { t, studio } = useI18n()
  return <Shell page={t.legal.terms} path="/termini" studio={studio} home={t.homeCrumb} pathLabel={t.pathLabel} />
}
