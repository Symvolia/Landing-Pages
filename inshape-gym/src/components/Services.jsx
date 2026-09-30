import { Apple, Dumbbell, HeartPulse, UserRound, Users } from 'lucide-react'
import { serviceMedia } from '../data'
import { useI18n } from '../i18n'
import { Eyebrow, Reveal } from './Reveal'

const icons = {
  dumbbell: Dumbbell,
  pulse: HeartPulse,
  users: Users,
  user: UserRound,
  apple: Apple,
}

export function Services() {
  const { t } = useI18n()

  return (
    <section id="servizi" className="relative overflow-hidden bg-ink py-24 md:py-32">
      <div className="motion-lines pointer-events-none absolute inset-0 opacity-25" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-3xl">
          <Eyebrow>{t.services.eyebrow}</Eyebrow>
          <h2 className="font-display text-6xl leading-[0.9] md:text-7xl">{t.services.heading}</h2>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-6">
          {serviceMedia.map((service, index) => {
            const copy = t.services.items[service.id]
            const Icon = icons[service.icon]
            const span = index < 3 ? 'md:col-span-2' : 'md:col-span-3'
            const ratio = index < 3 ? 'aspect-[4/5] md:aspect-[3/4]' : 'aspect-[16/10]'
            return (
              <Reveal key={service.id} delay={index * 0.05} className={span}>
                <article
                  className={`group relative overflow-hidden ${ratio} border border-white/10 bg-steel`}
                >
                  <img
                    src={service.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10 transition duration-500 group-hover:via-ink/70" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <span className="mb-4 grid h-11 w-11 place-items-center bg-ember text-ink transition duration-300 group-hover:-translate-y-1 group-hover:shadow-glow">
                      <Icon size={20} />
                    </span>
                    <h3 className="font-display text-4xl leading-none">{copy.title}</h3>
                    <p className="mt-3 text-sm text-paper/80 md:max-h-0 md:overflow-hidden md:opacity-0 md:transition-all md:duration-500 md:group-hover:max-h-32 md:group-hover:opacity-100">
                      {copy.text}
                    </p>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
