import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n } from '../i18n'
import { areas, journeyCopy, photo } from '../journey'
import { scrollToY } from '../smooth'

gsap.registerPlugin(ScrollTrigger)

/*
  Immersive walk through the resort.

  Layers inside a pinned (sticky) viewport, back to front:
  1. Environment: one full-screen photo per area. The camera walks into the current photo
     (scale towards `focus`), then passes through into the next one (zoom-through + fade),
     with a short bloom of light at the threshold.
  2. World (CSS 3D): area signs, photo cards, info chips and floating specks of light placed in
     depth. The camera moves along Z with the scroll, so they come towards you and fly past.
  3. Overlays: intro, outro, HUD.

  The view follows the pointer (head movement; slow drift on touch screens) and sways a little
  with scroll speed, like footsteps. ← / → jump between areas. Other components can ask for an
  area with:  window.dispatchEvent(new CustomEvent('journey:goto', { detail: index }))

  Reduced motion: a plain vertical list of the areas.
*/

const SCROLL_PER_AREA = 150 // vh of scroll for each area
const TAIL = 0.65 // extra time on the last area (in areas)
const DEPTH = 1700 // px of 3D depth per area
const PERSPECTIVE = 900
const SPECKS = 70

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const smooth = (v) => {
  const x = clamp(v)
  return x * x * (3 - 2 * x)
}

// small deterministic random, so the specks are the same on every render
const rand = (seed) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

const query = '(prefers-reduced-motion: reduce)'
const subscribe = (cb) => {
  const mq = window.matchMedia(query)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}
const motionAllowed = () => !window.matchMedia(query).matches

export default function Journey({ onBook }) {
  const { lang, t } = useI18n()
  const copy = journeyCopy[lang]
  const immersive = useSyncExternalStore(subscribe, motionAllowed, () => false)
  return immersive ? (
    <Immersive copy={copy} hotel={t.hero} onBook={onBook} />
  ) : (
    <StaticList copy={copy} hotel={t.hero} onBook={onBook} />
  )
}

const N = areas.length
const TRAVEL = N - 1 + TAIL

// 3D items: area signs + details, each with its absolute depth.
const PLACED = areas.flatMap((area, i) => [
  { key: `${area.id}-sign`, area: i, kind: 'sign', x: 0, y: -9, z: (i + 0.22) * DEPTH },
  ...area.details.map((d, j) => ({ key: `${area.id}-${j}`, area: i, ...d, z: (i + d.d) * DEPTH })),
])

// Specks of light spread through the whole walk, kept away from the centre of the view.
const SPECK_LIST = Array.from({ length: SPECKS }, (_, k) => {
  const angle = rand(k + 1) * Math.PI * 2
  const radius = 18 + rand(k + 101) * 42 // vw from the centre
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius * 0.6,
    z: (rand(k + 201) * (TRAVEL + 0.6) - 0.3) * DEPTH,
    size: 2 + rand(k + 301) * 5,
    warm: rand(k + 401) > 0.45,
  }
})

function Immersive({ copy, hotel, onBook }) {
  const section = useRef(null)
  const world = useRef(null)
  const bgs = useRef([])
  const items = useRef([])
  const specks = useRef([])
  const flash = useRef(null)
  const intro = useRef(null)
  const outro = useRef(null)
  const hud = useRef(null)
  const bar = useRef(null)
  const [active, setActive] = useState(0)

  const heightVh = TRAVEL * SCROLL_PER_AREA + 100

  const goTo = (k) => {
    const el = section.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const span = el.offsetHeight - window.innerHeight
    const target = Math.max(0, Math.min(N - 1, k))
    scrollToY(top + span * ((target + (target === 0 ? 0 : 0.1)) / TRAVEL))
  }
  const goToRef = useRef(goTo)
  useEffect(() => {
    goToRef.current = goTo
  })

  useEffect(() => {
    const state = { p: 0, v: 0 }
    const look = { x: 0, y: 0, tx: 0, ty: 0, pointer: false }
    let bob = 0
    let current = -1
    let vw = window.innerWidth
    let vh = window.innerHeight

    const onResize = () => {
      vw = window.innerWidth
      vh = window.innerHeight
    }
    const onPointer = (e) => {
      if (e.pointerType === 'touch') return
      look.pointer = true
      look.tx = (e.clientX / vw) * 2 - 1
      look.ty = (e.clientY / vh) * 2 - 1
    }
    const onGoto = (e) => goToRef.current(Number(e.detail) || 0)
    const onKey = (e) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || '')) return
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
      const r = section.current?.getBoundingClientRect()
      if (!r || r.top > 1 || r.bottom < window.innerHeight - 1) return // only while the journey fills the screen
      e.preventDefault()
      goToRef.current(current + (e.key === 'ArrowRight' ? 1 : -1))
    }

    const render = (time) => {
      // head movement: follow the pointer, or a slow drift on touch screens
      if (!look.pointer) {
        look.tx = Math.sin(time * 0.25) * 0.35
        look.ty = Math.cos(time * 0.18) * 0.2
      }
      look.x += (look.tx - look.x) * 0.06
      look.y += (look.ty - look.y) * 0.06
      // footsteps: a small vertical sway that grows with scroll speed
      const speed = clamp(Math.abs(state.v) / 2500)
      bob += (speed - bob) * 0.08
      const sway = Math.sin(time * 8) * 7 * bob

      const tt = state.p * TRAVEL
      const i = Math.min(Math.floor(tt), N - 1)
      const f = tt - i

      // 1. environment photos
      bgs.current.forEach((el, j) => {
        if (!el) return
        let opacity = 0
        let scale = 1.08
        if (j === i) {
          const last = j === N - 1
          const pass = last ? 0 : smooth((f - 0.66) / 0.34)
          scale = 1.08 + 0.2 * Math.min(f, 1) + 0.9 * pass * pass
          opacity = last ? 1 : 1 - smooth((f - 0.74) / 0.26)
        } else if (j === i + 1) {
          opacity = 1
          scale = 1.08
        }
        el.style.visibility = opacity > 0.001 ? 'visible' : 'hidden'
        el.style.opacity = opacity
        el.style.transform = `translate3d(${-look.x * 16}px, ${-look.y * 12 + sway}px, 0) scale(${scale})`
      })

      // light at the threshold between two areas
      if (flash.current) {
        const peak = i < N - 1 ? Math.max(0, 1 - Math.abs(f - 0.86) / 0.12) : 0
        flash.current.style.opacity = 0.22 * peak * peak
      }

      // 2. 3D world: camera moves along Z, view origin follows the head
      const camZ = tt * DEPTH
      if (world.current) {
        world.current.style.perspectiveOrigin = `${50 + look.x * 7}% ${50 + look.y * 6 + sway * 0.05}%`
        world.current.style.opacity = smooth((tt - 0.12) / 0.22) // appears once the intro has left
      }
      items.current.forEach((el, k) => {
        if (!el) return
        const it = PLACED[k]
        const rel = camZ - it.z // < 0: in front of the camera
        // signs show up late (only the next one); details when they are already spread out
        const fadeIn = it.kind === 'sign' ? smooth((rel + 0.8 * DEPTH) / (0.3 * DEPTH)) : smooth((rel + 0.95 * DEPTH) / (0.4 * DEPTH))
        const near = it.kind === 'sign' ? 0.35 : 0.6
        const fadeOut = 1 - smooth((rel + PERSPECTIVE * (1 - near)) / (PERSPECTIVE * 0.4))
        const opacity = fadeIn * fadeOut
        if (opacity <= 0.001 || rel > PERSPECTIVE * 0.9) {
          el.style.visibility = 'hidden'
          return
        }
        el.style.visibility = 'visible'
        el.style.opacity = opacity
        el.style.transform = `translate3d(-50%, -50%, 0) translate3d(${(it.x * vw) / 100}px, ${(it.y * vh) / 100}px, ${rel}px)`
      })
      specks.current.forEach((el, k) => {
        if (!el) return
        const s = SPECK_LIST[k]
        const rel = camZ - s.z
        const opacity = smooth((rel + 1.4 * DEPTH) / (0.8 * DEPTH)) * (1 - smooth((rel + 200) / 500))
        if (opacity <= 0.001 || rel > PERSPECTIVE * 0.8) {
          el.style.visibility = 'hidden'
          return
        }
        el.style.visibility = 'visible'
        el.style.opacity = opacity
        el.style.transform = `translate3d(${(s.x * vw) / 100}px, ${(s.y * vh) / 100}px, ${rel}px)`
      })

      // 3. overlays
      if (intro.current) {
        const k = 1 - smooth(tt / 0.3)
        intro.current.style.opacity = k
        intro.current.style.transform = `translateY(${(1 - k) * -40}px)`
        intro.current.style.visibility = k > 0.01 ? 'visible' : 'hidden'
      }
      if (outro.current) {
        const k = smooth((tt - (N - 1) - 0.15) / 0.35)
        outro.current.style.opacity = k
        outro.current.style.transform = `translateY(${(1 - k) * 30}px)`
        outro.current.style.visibility = k > 0.01 ? 'visible' : 'hidden'
      }
      if (hud.current) {
        const k = smooth((tt - 0.12) / 0.2)
        hud.current.style.opacity = k
        hud.current.style.visibility = k > 0.01 ? 'visible' : 'hidden'
      }
      if (bar.current) bar.current.style.transform = `scaleX(${state.p})`

      // the label follows the photo you actually see (it switches mid-crossfade)
      const shown = Math.min(Math.floor(tt + 0.13), N - 1)
      if (shown !== current) {
        current = shown
        setActive(shown)
      }
    }

    const ctx = gsap.context(() => {
      gsap.to(state, {
        p: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
          onUpdate: (self) => {
            state.v = self.getVelocity()
          },
        },
      })
    }, section)

    gsap.ticker.add(render)
    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('journey:goto', onGoto)
    window.addEventListener('keydown', onKey)
    render(0)
    return () => {
      gsap.ticker.remove(render)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('journey:goto', onGoto)
      window.removeEventListener('keydown', onKey)
      ctx.revert()
    }
  }, [])

  const area = areas[active]
  const text = copy.areas[area.id]
  const words = hotel.title.split(' ')

  return (
    <section id="journey" ref={section} className="relative bg-ink" style={{ height: `${heightVh}vh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden text-white">
        {/* 1. Environment */}
        {areas.map((a, j) => (
          <div
            key={a.id}
            ref={(el) => (bgs.current[j] = el)}
            className="absolute inset-[-3%] will-change-transform"
            style={{ zIndex: N - j, transformOrigin: `${a.focus[0]}% ${a.focus[1]}%`, visibility: j < 2 ? 'visible' : 'hidden' }}
          >
            <img
              {...photo(a.image)}
              sizes="100vw"
              alt=""
              loading={j < 2 ? 'eager' : 'lazy'}
              fetchPriority={j === 0 ? 'high' : undefined}
              decoding="async"
              className="h-full w-full object-cover"
              style={{ objectPosition: `${a.focus[0]}% ${a.focus[1]}%` }}
            />
          </div>
        ))}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ zIndex: N + 1, background: 'radial-gradient(ellipse at center, rgba(18,16,13,0) 35%, rgba(18,16,13,0.55) 100%), linear-gradient(180deg, rgba(18,16,13,0.5) 0%, rgba(18,16,13,0) 24%, rgba(18,16,13,0) 58%, rgba(18,16,13,0.75) 100%)' }}
        />
        <div
          ref={flash}
          className="pointer-events-none absolute inset-0"
          style={{ zIndex: N + 1, opacity: 0, background: 'radial-gradient(ellipse at center, #fff6e6 0%, rgba(255,246,230,0.4) 45%, rgba(255,246,230,0) 75%)', mixBlendMode: 'screen' }}
        />

        {/* 2. World in 3D */}
        <div
          ref={world}
          className="pointer-events-none absolute inset-0"
          style={{ zIndex: N + 2, perspective: `${PERSPECTIVE}px`, opacity: 0 }}
          aria-hidden="true"
        >
          {SPECK_LIST.map((s, k) => (
            <span
              key={`speck-${k}`}
              ref={(el) => (specks.current[k] = el)}
              className="absolute left-1/2 top-1/2 rounded-full will-change-transform"
              style={{
                width: s.size,
                height: s.size,
                visibility: 'hidden',
                background: s.warm ? '#f3d9a4' : '#ffffff',
                boxShadow: `0 0 ${s.size * 3}px ${s.size}px ${s.warm ? 'rgba(243,217,164,0.35)' : 'rgba(255,255,255,0.3)'}`,
              }}
            />
          ))}
          {PLACED.map((it, k) => (
            <div
              key={it.key}
              ref={(el) => (items.current[k] = el)}
              className="absolute left-1/2 top-1/2 will-change-transform"
              style={{ visibility: 'hidden' }}
            >
              <Item it={it} copy={copy} />
            </div>
          ))}
        </div>

        {/* 3a. Intro */}
        <div ref={intro} className="absolute inset-0 flex flex-col items-center justify-center px-6 pb-10 text-center" style={{ zIndex: N + 3 }}>
          <p className="journey-rise mb-6 text-[11px] font-medium uppercase tracking-[0.42em] text-[#f3d9a4]" style={{ animationDelay: '150ms', textShadow: '0 1px 12px rgba(0,0,0,0.5)' }}>
            {hotel.kicker}
          </p>
          <h1 className="font-playfair text-[3.4rem] font-medium leading-[0.98] sm:text-7xl md:text-[7.5rem]" style={{ textShadow: '0 6px 50px rgba(0,0,0,0.35)' }}>
            {words.map((w, k) => (
              <span key={w + k} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <span className="journey-word inline-block" style={{ animationDelay: `${250 + k * 140}ms` }}>
                  {w}
                </span>
                {k < words.length - 1 ? ' ' : null}
              </span>
            ))}
          </h1>
          <p className="journey-rise mx-auto mt-5 max-w-xl text-base font-light text-white/90 md:text-lg" style={{ animationDelay: '750ms', textShadow: '0 1px 16px rgba(0,0,0,0.5)' }}>
            {hotel.subtitle}
          </p>
          <div className="journey-rise mt-9 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: '950ms' }}>
            <button type="button" onClick={() => goTo(1)} className="pill pill-gold">
              {copy.start}
              <span aria-hidden="true">→</span>
            </button>
            <a href="#rooms" className="pill pill-glass">
              {copy.skip}
            </a>
          </div>
          <div className="journey-rise absolute bottom-8 flex flex-col items-center gap-3" style={{ animationDelay: '1300ms' }}>
            <span className="scroll-cue" aria-hidden="true" />
            <p className="rounded-full bg-ink/30 px-4 py-1.5 text-[10px] uppercase tracking-[0.32em] text-white backdrop-blur-sm">{copy.hint}</p>
          </div>
        </div>

        {/* 3b. Outro */}
        <div ref={outro} className="absolute inset-x-0 top-[26%] px-6 text-center" style={{ zIndex: N + 3, visibility: 'hidden' }}>
          <p className="mb-5 text-[11px] uppercase tracking-[0.42em] text-[#f3d9a4]">{copy.endKicker}</p>
          <h2 className="mx-auto max-w-3xl font-playfair text-4xl leading-[1.05] sm:text-6xl md:text-7xl" style={{ textShadow: '0 6px 50px rgba(0,0,0,0.35)' }}>
            {copy.endTitle}
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={onBook} className="pill pill-gold">
              {hotel.book}
            </button>
            <a href="#rooms" className="pill pill-glass">
              {copy.seeRooms}
            </a>
          </div>
        </div>

        {/* 3c. HUD */}
        <div ref={hud} className="absolute inset-x-0 bottom-0 px-5 pb-5 md:px-8 md:pb-7" style={{ zIndex: N + 4, visibility: 'hidden', opacity: 0 }}>
          <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div aria-live="polite" className="min-h-[4.5rem]">
              <p className="text-[10px] uppercase tracking-[0.36em] text-[#f3d9a4]">
                {String(active + 1).padStart(2, '0')} {copy.of} {String(N).padStart(2, '0')}
              </p>
              <p key={area.id} className="fade-in mt-1 font-playfair text-2xl md:text-3xl">{text.name}</p>
              <p key={`${area.id}-l`} className="fade-in mt-1 max-w-md text-sm font-light text-white/85">{text.line}</p>
            </div>
            <nav aria-label={copy.areasLabel} className="md:min-w-[460px]">
              <div className="relative mb-3 h-px bg-white/25">
                <div ref={bar} className="absolute inset-0 origin-left bg-gold" style={{ transform: 'scaleX(0)' }} />
              </div>
              <ol className="flex justify-between gap-1">
                {areas.map((a, k) => (
                  <li key={a.id}>
                    <button
                      type="button"
                      onClick={() => goTo(k)}
                      aria-current={k === active ? 'step' : undefined}
                      aria-label={`${copy.goTo}: ${copy.areas[a.id].name}`}
                      className={`group flex flex-col items-center gap-1.5 px-1 text-[9px] uppercase tracking-[0.18em] ${k === active ? 'text-white' : 'text-white/55 hover:text-white'}`}
                    >
                      <span className={`block h-2 w-2 rounded-full border border-gold transition-transform ${k <= active ? 'bg-gold' : 'bg-transparent'} ${k === active ? 'scale-150' : 'group-hover:scale-125'}`} />
                      <span className="hidden lg:block">{copy.areas[a.id].short}</span>
                    </button>
                  </li>
                ))}
              </ol>
              <p className="mt-3 hidden text-right text-[9px] uppercase tracking-[0.24em] text-white/45 lg:block">{copy.keys}</p>
            </nav>
          </div>
        </div>
      </div>
    </section>
  )
}

function Item({ it, copy }) {
  const text = copy.areas[areas[it.area].id]
  if (it.kind === 'sign') {
    return (
      <div className="w-[80vw] text-center" style={{ textShadow: '0 4px 40px rgba(0,0,0,0.5)' }}>
        <p className="text-[11px] uppercase tracking-[0.5em] text-[#f3d9a4]">{String(it.area + 1).padStart(2, '0')}</p>
        <p className="mt-2 font-playfair text-6xl leading-none md:text-8xl">{text.name}</p>
      </div>
    )
  }
  if (it.kind === 'img') {
    return (
      <div className="overflow-hidden rounded-md border border-white/40 shadow-[0_30px_80px_rgba(0,0,0,0.55)]" style={{ width: `${it.w}vw`, minWidth: 170 }}>
        <img {...photo(it.image)} sizes="25vw" alt="" loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover" />
      </div>
    )
  }
  return (
    <p className="whitespace-nowrap rounded-full border border-white/35 bg-ink/55 px-6 py-3.5 text-xs font-medium uppercase tracking-[0.22em] text-white shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-md">
      <span className="mr-3 inline-block h-2 w-2 rounded-full bg-gold align-middle" />
      {text.facts[it.fact]}
    </p>
  )
}

function StaticList({ copy, hotel, onBook }) {
  return (
    <section id="journey" className="bg-ink pb-16 pt-28 text-white">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="mb-5 text-[11px] uppercase tracking-[0.42em] text-gold">{hotel.kicker}</p>
        <h1 className="font-playfair text-5xl md:text-7xl">{hotel.title}</h1>
        <p className="mt-5 text-white/80">{hotel.subtitle}</p>
        <button type="button" onClick={onBook} className="pill pill-gold mt-8">
          {hotel.book}
        </button>
      </div>
      <ol className="mx-auto mt-16 grid max-w-6xl gap-10 px-6 md:grid-cols-2">
        {areas.map((a, i) => (
          <li key={a.id} id={`area-${a.id}`}>
            <img {...photo(a.image)} sizes="(min-width: 768px) 50vw, 100vw" alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
            <p className="mt-4 text-[10px] uppercase tracking-[0.36em] text-gold">{String(i + 1).padStart(2, '0')}</p>
            <h2 className="mt-1 font-playfair text-3xl">{copy.areas[a.id].name}</h2>
            <p className="mt-2 text-white/75">{copy.areas[a.id].line}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
