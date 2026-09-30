import { MapPin, Award, Users } from 'lucide-react'
import { useI18n } from '../i18n'

const icons = [
  <MapPin size={40} className="text-gold" />,
  <Award size={40} className="text-gold" />,
  <Users size={40} className="text-gold" />,
]

export default function About() {
  const { t } = useI18n()

  return (
    <section id="about" className="py-24 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <h2 className="section-title" data-aos="fade-up">
          {t.about.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80"
            alt={t.about.imageAlt}
            className="w-full h-[28rem] object-cover"
            data-aos="fade-right"
          />
          <div data-aos="fade-left">
            <p className="uppercase tracking-[0.28em] text-gold text-[11px] mb-3">{t.about.kicker}</p>
            <h3 className="text-3xl md:text-4xl font-playfair mb-5 text-ink">
              {t.about.heading}
            </h3>
            <p className="text-ink/70 mb-6 leading-relaxed">{t.about.p1}</p>
            <p className="text-ink/70 leading-relaxed">{t.about.p2}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {t.about.features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-white p-8 text-center border border-black/5"
              data-aos="fade-up"
            >
              <div className="flex justify-center mb-4">{icons[index]}</div>
              <h3 className="text-xl font-playfair mb-2 text-ink">{feature.title}</h3>
              <p className="text-ink/60 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
