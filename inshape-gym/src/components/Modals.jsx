import { useEffect, useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { planMeta } from '../data'
import { useI18n } from '../i18n'
import { sendLead } from '../lib/email'

const empty = { name: '', email: '', phone: '', plan: 'premium', message: '' }

export function TrialModal({ open, intent, plan, onClose }) {
  const { t } = useI18n()
  const titleId = useId()
  const [fields, setFields] = useState(empty)
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (!open) return
    setFields({ ...empty, plan: plan || 'premium' })
    setStatus('idle')
  }, [open, plan])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const update = (key) => (event) => setFields((current) => ({ ...current, [key]: event.target.value }))

  const submit = async (event) => {
    event.preventDefault()
    setStatus('loading')
    try {
      await sendLead({
        from_name: fields.name,
        reply_to: fields.email,
        phone: fields.phone,
        plan: fields.plan,
        message: fields.message || intent,
      })
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  const planName = t.plans.items[plan]?.name
  const title = intent === 'trainer' ? t.form.trainer : planName ? `${t.form.plan} ${planName}` : t.form.trial

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] grid place-items-center bg-ink/80 px-4 py-8 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative max-h-[90svh] w-full max-w-lg overflow-y-auto bg-paper p-6 text-ink shadow-2xl md:p-8"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button type="button" onClick={onClose} className="absolute right-4 top-4" aria-label={t.form.close}>
              <X />
            </button>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ember">{t.form.brand}</p>
            <h2 id={titleId} className="mt-2 font-display text-5xl leading-none">
              {title}
            </h2>
            <p className="mt-3 text-sm text-ink/65">{t.form.hint}</p>

            {status === 'done' ? (
              <p className="mt-8 bg-ink px-4 py-6 text-paper">
                {t.form.done}
              </p>
            ) : (
              <form onSubmit={submit} className="mt-6 grid gap-4">
                <Field label={t.form.name} value={fields.name} onChange={update('name')} required />
                <Field label={t.form.email} type="email" value={fields.email} onChange={update('email')} required />
                <Field label={t.form.phone} type="tel" value={fields.phone} onChange={update('phone')} required />
                <label className="grid gap-1 text-xs font-semibold uppercase tracking-[0.16em]">
                  {t.form.plan}
                  <select
                    value={fields.plan}
                    onChange={update('plan')}
                    className="border border-ink/15 bg-white px-3 py-3 text-sm font-normal normal-case tracking-normal"
                  >
                    {planMeta.map((item) => (
                      <option key={item.id} value={item.id}>
                        {t.plans.items[item.id].name}
                      </option>
                    ))}
                    <option value="unsure">{t.form.unsure}</option>
                  </select>
                </label>
                <label className="grid gap-1 text-xs font-semibold uppercase tracking-[0.16em]">
                  {t.form.goal}
                  <textarea
                    value={fields.message}
                    onChange={update('message')}
                    rows={3}
                    placeholder={t.form.goalPlaceholder}
                    className="border border-ink/15 bg-white px-3 py-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-ember"
                  />
                </label>
                {status === 'error' && (
                  <p className="text-sm text-ember">{t.form.fail}</p>
                )}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-ember px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-ink hover:bg-flare disabled:opacity-60"
                >
                  {status === 'loading' ? t.form.sending : t.form.submit}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Field({ label, ...props }) {
  return (
    <label className="grid gap-1 text-xs font-semibold uppercase tracking-[0.16em]">
      {label}
      <input
        {...props}
        className="border border-ink/15 bg-white px-3 py-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-ember"
      />
    </label>
  )
}

export function LegalModal({ type, onClose }) {
  const { t } = useI18n()
  if (!type) return null
  const copy = t.legal[type]
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-ink/80 px-4" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-title"
        className="w-full max-w-lg bg-paper p-8 text-ink"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2 id="legal-title" className="font-display text-5xl">
          {copy.title}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-ink/75">{copy.body}</p>
        <button type="button" onClick={onClose} className="mt-6 bg-ink px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-paper">
          {t.form.close}
        </button>
      </div>
    </div>
  )
}
