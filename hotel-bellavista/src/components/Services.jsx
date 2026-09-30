import { Flower2, UtensilsCrossed, Dumbbell, Wifi, CircleParking, ConciergeBell } from 'lucide-react'
import { useI18n } from '../i18n'

const icons = [
  <Flower2 size={48} />,
  <UtensilsCrossed size={48} />,
  <Dumbbell size={48} />,
  <Wifi size={48} />,
  <CircleParking size={48} />,
  <ConciergeBell size={48} />,
]

export default function Services() {
  const { t } = useI18n()

  return (
    <section id="services" className="py-24 md:py-28 bg-ink text-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <h2 className="section-title !text-white" data-aos="fade-up">
          {t.services.title}
        </h2>
        <p className="text-center text-white/60 max-w-2xl mx-auto -mt-8 mb-14 text-sm">
          {t.services.intro}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.services.items.map((service, index) => (
            <div
              key={service.name}
              className="border border-white/10 p-8 text-center hover:border-gold/70"
              data-aos="fade-up"
            >
              <div className="flex justify-center text-gold mb-4">{icons[index]}</div>
              <h3 className="text-xl font-playfair mb-2">{service.name}</h3>
              <p className="text-gray-300 text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
