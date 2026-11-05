import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis = null

// Smooth wheel scrolling (Lenis) driven by GSAP's ticker, so the 3D journey stays in sync.
// Touch keeps native scrolling. Skipped entirely with reduced motion.
export function startSmoothScroll() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}
  lenis = new Lenis({ autoRaf: false, anchors: { offset: -72 }, lerp: 0.09 })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (time) => lenis?.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  document.documentElement.classList.add('lenis')
  return () => {
    gsap.ticker.remove(tick)
    lenis?.destroy()
    lenis = null
    document.documentElement.classList.remove('lenis')
  }
}

export function scrollToY(y) {
  if (lenis) lenis.scrollTo(y, { duration: 1.6 })
  else window.scrollTo({ top: y, behavior: 'smooth' })
}
