import { useState } from 'react'
import { About } from './components/About'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { LegalModal, TrialModal } from './components/Modals'
import { Plans } from './components/Plans'
import { Schedule } from './components/Schedule'
import { Services } from './components/Services'
import { Testimonials } from './components/Testimonials'
import { useI18n } from './i18n'

export default function App() {
  const { t } = useI18n()
  const [trial, setTrial] = useState({ open: false, intent: 'trial', plan: '' })
  const [legal, setLegal] = useState(null)

  const openTrial = (intent = 'trial', plan = '') => setTrial({ open: true, intent, plan })

  return (
    <>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:bg-ember focus:px-3 focus:py-2 focus:text-ink"
      >
        {t.skip}
      </a>
      <Header onTrial={() => openTrial('trial')} />
      <main>
        <Hero onTrial={() => openTrial('trial')} />
        <div className="overflow-hidden border-y border-white/10 bg-ember text-ink">
          <div className="marquee-track flex w-max gap-10 py-3">
            {[...t.band, ...t.band].map((word, index) => (
              <span key={`${word}-${index}`} className="font-display text-3xl tracking-wide">
                {word} ·
              </span>
            ))}
          </div>
        </div>
        <About />
        <Services />
        <Plans onChoose={(planId) => openTrial('plan', planId)} />
        <section className="relative overflow-hidden bg-ember py-16 text-ink md:py-24">
          <div className="motion-lines absolute inset-0 opacity-30" />
          <p className="relative px-5 text-center font-display text-6xl leading-[0.88] md:text-8xl">
            {t.slogan[0]}
            <br />
            {t.slogan[1]}
          </p>
        </section>
        <Testimonials />
        <Schedule onTrainer={() => openTrial('trainer')} />
      </main>
      <Footer onLegal={setLegal} />
      <TrialModal
        open={trial.open}
        intent={trial.intent}
        plan={trial.plan}
        onClose={() => setTrial((current) => ({ ...current, open: false }))}
      />
      <LegalModal type={legal} onClose={() => setLegal(null)} />
    </>
  )
}
