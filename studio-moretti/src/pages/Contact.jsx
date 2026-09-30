import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Clock, Mail, MapPin, Phone } from "lucide-react"
import Seo from "../components/Seo"
import { ConsultForm } from "../components/Layout"
import { useI18n } from "../i18n"
import { saveEntry } from "../store"

function nextDays(count = 8) {
  const days = []
  const cursor = new Date()
  while (days.length < count) {
    cursor.setDate(cursor.getDate() + 1)
    const day = cursor.getDay()
    if (day === 0 || day === 6) continue
    days.push(new Date(cursor))
  }
  return days
}

const times = ["09:30", "11:00", "15:00", "16:30"]
const dayWord = { it: "Giorno", en: "Day", de: "Tag", es: "Día", pt: "Dia" }
const timeWord = { it: "Orario", en: "Time", de: "Uhrzeit", es: "Hora", pt: "Hora" }

export default function Contact() {
  const { lang, t, studio, formatDate } = useI18n()
  const c = t.contact
  const days = useMemo(() => nextDays(), [])
  const [day, setDay] = useState(0)
  const [time, setTime] = useState(times[0])
  const [booked, setBooked] = useState(false)

  function book(e) {
    e.preventDefault()
    const fd = new FormData(e.target)
    if (fd.get("company")) return
    const when = days[day]
    const slot = `${formatDate(when)} · ${time}`
    saveEntry("bookings", {
      name: fd.get("name"),
      email: fd.get("email"),
      topic: fd.get("topic"),
      slot,
    })
    saveEntry("leads", {
      name: fd.get("name"),
      email: fd.get("email"),
      phone: "",
      area: fd.get("topic"),
      message: `Videocall ${slot}`,
      kind: "videocall",
    })
    setBooked(true)
  }

  return (
    <article className="page">
      <Seo title={c.seoTitle} description={c.seoDesc} path="/contatti" />
      <div className="wrap">
        <nav className="crumbs" aria-label={t.pathLabel}><Link to="/">{t.homeCrumb}</Link><span>/</span><span>{c.crumb}</span></nav>
        <header className="page-title">
          <p className="kicker">{c.kicker}</p>
          <h1>{c.h1}</h1>
          <p className="intro">{c.intro}</p>
        </header>
        <div className="contact-grid">
          <div>
            <div className="contact-line"><Phone size={18} /><div><strong>{studio.phone}</strong><br /><a href={studio.phoneHref}>{c.call}</a></div></div>
            <div className="contact-line"><Mail size={18} /><div><strong>{c.email}</strong><br /><a href={`mailto:${studio.email}`}>{studio.email}</a></div></div>
            <div className="contact-line"><MapPin size={18} /><div><strong>{studio.address}</strong><br />{studio.cap} {studio.city}<br /><a href={studio.mapsLink} target="_blank" rel="noreferrer">{c.maps}</a></div></div>
            <div className="contact-line"><Clock size={18} /><div>{studio.hours.map(([d, h]) => <div key={d}><strong>{d}</strong> · {h}</div>)}</div></div>
            <iframe className="map" title={c.mapTitle} src={studio.maps} loading="lazy" />
          </div>
          <div>
            <div className="panel">
              <h2 style={{ fontSize: 28, marginBottom: 8 }}>{c.formH}</h2>
              <ConsultForm />
            </div>
            <div className="panel">
              <h2 style={{ fontSize: 28 }}>{c.videoH}</h2>
              <p style={{ color: "var(--muted)", margin: "8px 0 14px" }}>{c.videoP} <a href={studio.calendly} target="_blank" rel="noreferrer">{c.calendar}</a>.</p>
              {booked ? (
                <p className="form-ok">{c.booked} {formatDate(days[day])} · {time}</p>
              ) : (
                <form onSubmit={book}>
                  <input className="hp" name="company" tabIndex={-1} autoComplete="off" />
                  <label>{dayWord[lang]}</label>
                  <div className="slots">
                    {days.map((d, i) => (
                      <button type="button" key={d.toISOString()} className={`slot ${i === day ? "on" : ""}`} onClick={() => setDay(i)}>
                        {formatDate(d, { weekday: "short", day: "numeric", month: "short" })}
                      </button>
                    ))}
                  </div>
                  <label>{timeWord[lang]}</label>
                  <div className="slots">
                    {times.map((slot) => (
                      <button type="button" key={slot} className={`slot ${slot === time ? "on" : ""}`} onClick={() => setTime(slot)}>{slot}</button>
                    ))}
                  </div>
                  <label htmlFor="b-name">{c.name}</label>
                  <input id="b-name" name="name" required />
                  <label htmlFor="b-email">{c.email}</label>
                  <input id="b-email" name="email" type="email" required />
                  <label htmlFor="b-topic">{c.topic}</label>
                  <input id="b-topic" name="topic" required placeholder={c.topicPh} />
                  <label className="check"><input type="checkbox" required /><span>{c.consent} <Link to="/privacy">{t.footer.privacy}</Link>.</span></label>
                  <button className="btn" type="submit">{c.book}</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
