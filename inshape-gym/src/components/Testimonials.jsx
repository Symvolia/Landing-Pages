import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { storyMedia } from '../data'
import { useI18n } from '../i18n'
import { Eyebrow, Reveal } from './Reveal'

function Compare({ before, after, name, labels }) {
  const ref = useRef(null)
  const [pos, setPos] = useState(58)

  const move = (clientX) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const next = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.min(90, Math.max(10, next)))
  }

  return (
    <div
      ref={ref}
      className="relative aspect-[4/5] cursor-ew-resize touch-none overflow-hidden bg-steel"
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId)
        move(event.clientX)
      }}
      onPointerMove={(event) => {
        if (event.buttons) move(event.clientX)
      }}
      role="slider"
      aria-valuemin={10}
      aria-valuemax={90}
      aria-valuenow={Math.round(pos)}
      aria-label={`${labels.compare} ${name}`}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') setPos((value) => Math.max(10, value - 4))
        if (event.key === 'ArrowRight') setPos((value) => Math.min(90, value + 4))
      }}
    >
      <img src={after} alt={`${labels.afterAlt} ${name}`} className="absolute inset-0 h-full w-full object-cover" />
      <img
        src={before}
        alt={`${labels.beforeAlt} ${name}`}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />
      <div className="absolute inset-y-0 w-0.5 bg-paper" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center bg-ember text-xs font-bold text-ink">
          ↔
        </span>
      </div>
      <span className="absolute left-3 top-3 bg-ink/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]">
        {labels.before}
      </span>
      <span className="absolute right-3 top-3 bg-ember px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink">
        {labels.after}
      </span>
    </div>
  )
}

export function Testimonials() {
  const { t } = useI18n()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const story = storyMedia[index]
  const copy = t.stories.items[story.id]

  useEffect(() => {
    if (paused) return undefined
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return undefined
    const timer = setInterval(() => {
      setIndex((value) => (value + 1) % storyMedia.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [paused])

  const go = (direction) => {
    setIndex((value) => (value + direction + storyMedia.length) % storyMedia.length)
  }

  return (
    <section id="risultati" className="bg-ash py-24 md:py-32" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="flex items-end justify-between gap-6">
          <div>
            <Eyebrow>{t.stories.eyebrow}</Eyebrow>
            <h2 className="font-display text-6xl leading-[0.9] md:text-7xl">{t.stories.heading}</h2>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button type="button" onClick={() => go(-1)} className="grid h-12 w-12 place-items-center border border-white/15 hover:border-ember" aria-label={t.stories.prev}>
              <ChevronLeft />
            </button>
            <button type="button" onClick={() => go(1)} className="grid h-12 w-12 place-items-center border border-white/15 hover:border-ember" aria-label={t.stories.next}>
              <ChevronRight />
            </button>
          </div>
        </Reveal>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
          <Compare key={story.id} before={story.before} after={story.after} name={story.name} labels={t.stories} />
          <div>
            <p className="font-display text-4xl leading-[1.05] text-paper md:text-5xl">“{copy.quote}”</p>
            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-ember">
              {story.name} · {copy.plan}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {copy.metrics.map((metric) => (
                <li key={metric} className="border border-white/15 px-3 py-2 text-xs uppercase tracking-[0.16em] text-paper/80">
                  {metric}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-2">
              {storyMedia.map((item, dot) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`${t.stories.show} ${item.name}`}
                  onClick={() => setIndex(dot)}
                  className={`h-1.5 transition-all ${dot === index ? 'w-10 bg-ember' : 'w-4 bg-white/25'}`}
                />
              ))}
            </div>
            <div className="mt-6 flex gap-2 sm:hidden">
              <button type="button" onClick={() => go(-1)} className="grid h-12 w-12 place-items-center border border-white/15" aria-label={t.stories.prev}>
                <ChevronLeft />
              </button>
              <button type="button" onClick={() => go(1)} className="grid h-12 w-12 place-items-center border border-white/15" aria-label={t.stories.next}>
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
