import { useState } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { useI18n } from '../i18n'

const initialForm = {
  name: '',
  email: '',
  message: '',
}

export default function Contact() {
  const { t } = useI18n()
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
    setSent(false)
    setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError(t.contact.required)
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError(t.contact.invalidEmail)
      return
    }
    setError('')
    setSent(true)
    setForm(initialForm)
  }

  return (
    <section id="contact" className="py-24 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <h2 className="section-title" data-aos="fade-up">
          {t.contact.title}
        </h2>

        <div className="grid lg:grid-cols-2 gap-12">
          <div data-aos="fade-right">
            <h3 className="text-3xl font-playfair text-ink mb-4">{t.contact.heading}</h3>
            <p className="text-ink/70 mb-8">{t.contact.intro}</p>
            <ul className="space-y-4 text-ink/80">
              <li className="flex items-start gap-3">
                <MapPin className="text-gold shrink-0 mt-1" size={20} />
                Via del Mare 12, 18038 Sanremo (IM)
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-gold shrink-0" size={20} />
                <a href="tel:+390184000000" className="hover:text-gold">
                  +39 0184 000 000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-gold shrink-0" size={20} />
                <a href="mailto:info@hotelbellavista.it" className="hover:text-gold">
                  info@hotelbellavista.it
                </a>
              </li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="bg-cream p-8 md:p-10 border border-black/5" data-aos="fade-left">
            <label className="block mb-4">
              <span className="text-[11px] uppercase tracking-[0.16em] text-ink/70">{t.contact.name}</span>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="field"
                placeholder={t.contact.namePlaceholder}
              />
            </label>
            <label className="block mb-4">
              <span className="text-[11px] uppercase tracking-[0.16em] text-ink/70">{t.contact.email}</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="field"
                placeholder={t.contact.emailPlaceholder}
              />
            </label>
            <label className="block mb-6">
              <span className="text-[11px] uppercase tracking-[0.16em] text-ink/70">{t.contact.message}</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                className="field"
                placeholder={t.contact.messagePlaceholder}
              />
            </label>
            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
            {sent && (
              <p className="text-green-700 text-sm mb-4">
                {t.contact.sent}
              </p>
            )}
            <button
              type="submit"
              className="btn-ink w-full"
            >
              {t.contact.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
