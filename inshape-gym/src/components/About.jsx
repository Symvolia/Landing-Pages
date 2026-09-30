import { useEffect, useRef, useState } from 'react'
import { gallery, stats } from '../data'
import { useI18n } from '../i18n'
import { Eyebrow, Reveal } from './Reveal'

function useCount(target, active) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return undefined
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setValue(target)
      return undefined
    }
    let frame
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / 1200)
      const eased = 1 - (1 - progress) ** 3
      setValue(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, target])

  return value
}

function Stat({ item, active }) {
  const value = useCount(item.value, active)
  return (
    <div>
      <p className="font-display text-6xl leading-none text-paper md:text-7xl">
        {item.prefix}
        {value}
        {item.suffix}
      </p>
      <p className="mt-2 text-sm uppercase tracking-[0.18em] text-mist">{item.label}</p>
    </div>
  )
}

export function About() {
  const { t } = useI18n()
  const ref = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(true)
      },
      { threshold: 0.4 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="chi-siamo" className="bg-ash py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-12">
        <Reveal className="relative lg:col-span-6">
          <div className="absolute -left-4 -top-4 h-full w-full border border-ember/70" />
          <img
            src={gallery.about}
            alt={t.about.imageAlt}
            className="relative aspect-[4/5] w-full object-cover"
            loading="lazy"
          />
          <div className="absolute bottom-6 left-6 right-6 bg-ink/85 p-5 backdrop-blur">
            <p className="font-display text-4xl leading-none">{t.about.caption}</p>
          </div>
        </Reveal>

        <div className="lg:col-span-6">
          <Reveal>
            <Eyebrow>{t.about.eyebrow}</Eyebrow>
            <h2 className="font-display text-6xl leading-[0.9] md:text-7xl">{t.about.heading}</h2>
            <p className="mt-6 text-lg text-paper/75">{t.about.text}</p>
          </Reveal>
          <div ref={ref} className="mt-10 grid grid-cols-2 gap-8">
            {stats.map((item) => (
              <Stat key={item.id} item={{ ...item, label: t.about.stats[item.id] }} active={active} />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-7xl gap-px bg-white/10 px-5 md:grid-cols-3 md:px-8">
        {t.about.pillars.map((pillar, index) => (
          <Reveal key={pillar.title} delay={index * 0.08} className="bg-ash p-8">
            <p className="font-display text-5xl text-ember">0{index + 1}</p>
            <h3 className="mt-3 font-display text-4xl">{pillar.title}</h3>
            <p className="mt-3 text-paper/70">{pillar.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
