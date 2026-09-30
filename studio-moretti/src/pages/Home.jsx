import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Pause, Play } from "lucide-react"
import Seo from "../components/Seo"
import AreaIcon from "../components/Icons"
import { useSite } from "../components/Layout"
import { useI18n } from "../i18n"

export default function Home() {
  const { openConsult } = useSite()
  const { lang, t, images, studio, formatDate } = useI18n()
  const [slide, setSlide] = useState(0)
  const [playing, setPlaying] = useState(true)
  const featured = t.testimonials[0]

  useEffect(() => setSlide(0), [lang])

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => setSlide((n) => (n + 1) % t.presentation.length), 7000)
    return () => clearInterval(id)
  }, [playing, t.presentation.length])

  return (
    <>
      <Seo title={t.home.seoTitle} description={t.home.seoDesc} path="/" />
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="kicker">{t.home.kicker}</p>
            <h1>{t.home.h1}</h1>
            <p className="lede">{t.home.lede}</p>
            <div className="hero-actions">
              <button className="btn" onClick={() => openConsult()}>{t.consultFree}</button>
              <Link className="btn ghost" to="/aree-di-pratica">{t.home.cta2}</Link>
            </div>
            <div className="hero-meta">
              <div><strong>{studio.lawyer}</strong>{t.home.meta1}</div>
              <div><strong>{t.home.meta2s}</strong>{t.home.meta2}</div>
              <div><strong>{t.home.meta3s}</strong>{t.home.meta3}</div>
            </div>
          </div>
          <div className="hero-visual">
            <img src={images.portrait} alt={t.home.portraitAlt} />
            <div className="hero-card">
              <em>{t.home.quote}</em>
              <span>{t.home.quoteNote}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="band" aria-label={t.home.valuesAria}>
        <div className="wrap band-grid">
          {t.values.map((v) => (
            <article className="band-item" key={v.title}>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">{t.home.practiceKicker}</p>
              <h2>{t.home.practiceH}</h2>
            </div>
            <p>{t.home.practiceP}</p>
          </div>
          <div className="cards">
            {t.services.map((s) => (
              <Link className="card" key={s.slug} to={`/aree/${s.slug}`}>
                <span className="icon"><AreaIcon name={s.icon} /></span>
                <h3>{s.title}</h3>
                <p>{s.excerpt}</p>
                <span className="more">{t.home.cardMore} <ArrowRight size={16} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap split">
          <img src={images.office} alt={t.home.officeAlt} />
          <div>
            <p className="kicker">{t.home.studioKicker}</p>
            <h2 className="serif" style={{ fontSize: "clamp(32px, 4vw, 48px)", margin: "12px 0" }}>{t.home.studioH}</h2>
            <p className="intro">{t.home.studioP}</p>
            <div className="stats">
              {t.stats.map((s) => (
                <div className="stat" key={s.label}><b>{s.value}</b><span>{s.label}</span></div>
              ))}
            </div>
            <Link className="btn" style={{ marginTop: 22 }} to="/chi-sono">{t.home.bioCta}</Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">{t.home.methodKicker}</p>
              <h2>{t.home.methodH}</h2>
            </div>
            <p>{t.home.methodP}</p>
          </div>
          <div className="steps">
            {t.method.map((m) => (
              <article className="step" key={m.n}>
                <div className="n">{m.n}</div>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap player">
          <img src={images.library} alt={t.home.libraryAlt} />
          <div className="player-copy">
            <p className="kicker">{t.home.presKicker}</p>
            <h2 style={{ fontSize: 36, marginTop: 10 }}>{t.presentation[slide].t}</h2>
            <p className="intro" style={{ marginTop: 12 }}>{t.presentation[slide].d}</p>
            <div className="progress" aria-hidden="true"><span style={{ width: `${((slide + 1) / t.presentation.length) * 100}%` }} /></div>
            <button className="btn ghost small" onClick={() => setPlaying((v) => !v)}>
              {playing ? <Pause size={16} /> : <Play size={16} />} {playing ? t.home.pause : t.home.play}
            </button>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 10 }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">{t.home.voicesKicker}</p>
              <h2>{t.home.voicesH}</h2>
            </div>
            <Link to="/testimonianze" className="more">{t.home.allStories} <ArrowRight size={16} /></Link>
          </div>
          <div className="quotes">
            <blockquote className="quote">
              <p>{featured.text}</p>
              <div className="stars" aria-label={t.stories.stars}>★★★★★</div>
              <div className="who">{featured.name} · {featured.role} · {featured.source}</div>
            </blockquote>
            <div className="quote-side">
              <div className="who">{t.stories.average} {studio.rating} · {studio.reviews} {t.stories.reviews}</div>
              {t.testimonials.slice(1, 4).map((item) => (
                <div className="mini" key={item.name}>
                  <strong>{item.area}</strong>
                  <span>{item.text.slice(0, 90)}…</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">{t.home.newsKicker}</p>
              <h2>{t.home.newsH}</h2>
            </div>
            <Link to="/approfondimenti">{t.home.archive}</Link>
          </div>
          <div className="news">
            {t.articles.slice(0, 2).map((a) => (
              <Link key={a.slug} to={`/approfondimenti/${a.slug}`}>
                <img src={a.categorySlug === "diritto-del-lavoro" ? images.meeting : images.desk} alt="" />
                <div className="news-copy">
                  <small>{a.category} · {formatDate(a.date)}</small>
                  <h3>{a.title}</h3>
                  <p>{a.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="wrap">
        <section className="cta">
          <div>
            <h2>{t.home.bandH}</h2>
            <p>{t.home.bandP}</p>
          </div>
          <button className="btn gold" onClick={() => openConsult()}>{t.consultFree}</button>
        </section>
      </div>
    </>
  )
}
