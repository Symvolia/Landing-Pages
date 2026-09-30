import { Check } from 'lucide-react'
import { planMeta } from '../data'
import { useI18n } from '../i18n'
import { Eyebrow, Reveal } from './Reveal'

export function Plans({ onChoose }) {
  const { t } = useI18n()
  return (
    <section id="tariffe" className="bg-paper py-24 text-ink md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow>{t.plans.eyebrow}</Eyebrow>
            <h2 className="font-display text-6xl leading-[0.9] md:text-7xl">{t.plans.heading}</h2>
          </div>
          <p className="max-w-sm text-ink/70">{t.plans.intro}</p>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-3">
          {planMeta.map((plan, index) => {
            const copy = t.plans.items[plan.id]
            return (
            <Reveal key={plan.id} delay={index * 0.08}>
              <article
                className={`flex h-full flex-col p-7 transition duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                  plan.featured
                    ? 'bg-ink text-paper shadow-glow lg:-mt-6 lg:mb-[-1.5rem] lg:py-10'
                    : 'bg-white text-ink'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-5xl">{copy.name}</h3>
                  {plan.featured && (
                    <span className="bg-ember px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink">
                      {t.plans.popular}
                    </span>
                  )}
                </div>
                <p className={`mt-3 text-sm ${plan.featured ? 'text-paper/70' : 'text-ink/60'}`}>{copy.pitch}</p>
                <p className="mt-6 flex items-end gap-1">
                  <span className="font-display text-7xl leading-none">€{plan.price}</span>
                  <span className={`mb-2 text-sm ${plan.featured ? 'text-paper/60' : 'text-ink/50'}`}>{t.plans.month}</span>
                </p>
                <p className={`text-xs uppercase tracking-[0.16em] ${plan.featured ? 'text-ember' : 'text-ink/50'}`}>
                  {copy.duration}
                </p>
                <ul className="mt-6 flex-1 space-y-3 text-sm">
                  {copy.perks.map((perk) => (
                    <li key={perk} className="flex gap-3">
                      <Check size={16} className="mt-0.5 shrink-0 text-ember" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => onChoose(plan.id)}
                  className={`mt-8 px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] transition hover:-translate-y-0.5 ${
                    plan.featured
                      ? 'bg-ember text-ink hover:bg-flare hover:shadow-glow'
                      : 'bg-ink text-paper hover:bg-ember hover:text-ink'
                  }`}
                >
                  {t.plans.choose}
                </button>
              </article>
            </Reveal>
          )
          })}
        </div>
      </div>
    </section>
  )
}
