import { motion, useReducedMotion } from 'framer-motion'

export function Reveal({ children, className = '', delay = 0 }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function Eyebrow({ children }) {
  return (
    <p className="mb-3 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-ember">
      <span className="h-px w-8 bg-ember" />
      {children}
    </p>
  )
}
