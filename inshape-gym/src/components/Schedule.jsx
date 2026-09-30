import { useState } from 'react'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { dayIds, week } from '../data'
import { useI18n } from '../i18n'
import { Eyebrow, Reveal } from './Reveal'

export function Schedule({ onTrainer }) {
  const { t } = useI18n()
  const [day, setDay] = useState('mon')

  return (
    <section id="orari" className="bg-ink py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Eyebrow>{t.schedule.eyebrow}</Eyebrow>
          <h2 className="font-display text-6xl leading-[0.9] md:text-7xl">{t.schedule.heading}</h2>
          <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {t.schedule.hours.map((row) => (
              <li key={row.day} className="flex items-center justify-between py-4">
                <span className="text-paper/70">{row.day}</span>
                <span className="font-semibold tracking-wide">{row.time}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-2">
            {dayIds.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setDay(item)}
                className={`px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${
                  day === item ? 'bg-ember text-ink' : 'border border-white/15 text-paper/80'
                }`}
              >
                {t.schedule.days[item]}
              </button>
            ))}
          </div>
          <ul className="mt-6 space-y-3">
            {week[day].map((slot) => (
              <li key={`${slot.time}-${slot.classId}`} className="grid grid-cols-[4.5rem_1fr] gap-4 border border-white/10 bg-steel p-4">
                <span className="font-display text-3xl text-ember">{slot.time}</span>
                <span>
                  <span className="block font-medium">{t.schedule.classes[slot.classId]}</span>
                  <span className="text-sm text-mist">
                    {slot.coach === 'staff' ? t.schedule.staff : slot.coach} · {t.schedule.rooms[slot.room]}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7" >
          <div id="contatti" className="scroll-mt-28">
            <Eyebrow>{t.schedule.location}</Eyebrow>
            <h2 className="font-display text-6xl leading-[0.9] md:text-7xl">{t.schedule.visit}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <p className="flex gap-3 text-sm text-paper/80">
                <MapPin className="shrink-0 text-ember" size={18} />
                {t.schedule.address}
                <br />
                {t.schedule.city}
              </p>
              <a href="tel:+390294752210" className="flex gap-3 text-sm text-paper/80 hover:text-ember">
                <Phone className="shrink-0 text-ember" size={18} />
                02 9475 2210
              </a>
              <a href="mailto:info@inshapegym.it" className="flex gap-3 text-sm text-paper/80 hover:text-ember">
                <Mail className="shrink-0 text-ember" size={18} />
                info@inshapegym.it
              </a>
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-mist">
              <Clock size={14} className="text-ember" /> {t.schedule.desk}
            </p>
            <div className="relative mt-6 overflow-hidden border border-white/10">
              <iframe
                title={t.schedule.map}
                src="https://maps.google.com/maps?q=Via%20Tortona%2031%20Milano&z=15&output=embed"
                className="h-80 w-full grayscale contrast-125 brightness-75 md:h-[28rem]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <button
              type="button"
              onClick={onTrainer}
              className="mt-6 bg-ember px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5 hover:bg-flare hover:shadow-glow"
            >
              {t.schedule.trainer}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
