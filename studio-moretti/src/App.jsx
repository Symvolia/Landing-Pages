import { Link, Navigate, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import { useI18n } from "./i18n"
import Home from "./pages/Home"
import About from "./pages/About"
import Services from "./pages/Services"
import Service from "./pages/Service"
import Stories from "./pages/Stories"
import { Article, Blog } from "./pages/Blog"
import Contact from "./pages/Contact"
import { Cookies, Disclaimer, Privacy, Terms } from "./pages/Legal"
import Registry from "./pages/Registry"

function Missing() {
  const { t } = useI18n()
  return (
    <article className="page">
      <div className="wrap-s">
        <h1>{t.notFoundTitle}</h1>
        <p className="intro">{t.notFoundText}</p>
        <p style={{ marginTop: 16 }}><Link className="btn" to="/">{t.backHome}</Link></p>
      </div>
    </article>
  )
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chi-sono" element={<About />} />
        <Route path="/aree-di-pratica" element={<Services />} />
        <Route path="/aree/:slug" element={<Service />} />
        <Route path="/testimonianze" element={<Stories />} />
        <Route path="/approfondimenti" element={<Blog />} />
        <Route path="/approfondimenti/:slug" element={<Article />} />
        <Route path="/contatti" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookie" element={<Cookies />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/termini" element={<Terms />} />
        <Route path="/registro" element={<Registry />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Missing />} />
      </Routes>
    </Layout>
  )
}
