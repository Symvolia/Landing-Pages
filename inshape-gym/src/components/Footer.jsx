import { useState } from 'react'
import { navLinks } from '../data'
import { useI18n } from '../i18n'
import { sendLead } from '../lib/email'
import { FacebookIcon, InstagramIcon, Logo, TikTokIcon } from './Logo'

const socials = [
  { label: 'Instagram', href: 'https://instagram.com', Icon: InstagramIcon },
  { label: 'Facebook', href: 'https://facebook.com', Icon: FacebookIcon },
  { label: 'TikTok', href: 'https://www.tiktok.com', Icon: TikTokIcon },
]

export function Footer({ onLegal }) {
  const { t, lang } = useI18n()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  const submit = async (event) => {
    event.preventDefault()
    if (!email.includes('@')) {
      setStatus('invalid')
      return
    }
    setStatus('loading')
    try {
      await sendLead({
        from_name: 'Newsletter',
        reply_to: email,
        phone: '',
        plan: 'Newsletter',
        message: `Newsletter InShape Gym (${lang})`,
      })
      setStatus('done')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-5 max-w-xs text-sm text-paper/65">
            {t.footer.blurb}
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center border border-white/15 transition hover:-translate-y-0.5 hover:border-ember hover:text-ember"
              >
                <Icon size={18} className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ember">{t.footer.links}</p>
          <ul className="mt-4 space-y-2">
            {navLinks.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-sm text-paper/75 hover:text-ember">
                  {t.nav[item.id]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={submit} className="lg:col-span-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ember">{t.footer.news}</p>
          <p className="mt-3 text-sm text-paper/70">{t.footer.newsText}</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="newsletter-email">
              {t.footer.email}
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={t.footer.placeholder}
              className="w-full border border-white/15 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-paper/35 focus:border-ember"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-ember px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-ink transition hover:bg-flare disabled:opacity-60"
            >
              {status === 'loading' ? t.footer.sending : t.footer.join}
            </button>
          </div>
          {status === 'done' && <p className="mt-3 text-sm text-ember">{t.footer.joined}</p>}
          {status === 'error' && <p className="mt-3 text-sm text-ember">{t.footer.error}</p>}
          {status === 'invalid' && <p className="mt-3 text-sm text-ember">{t.footer.invalid}</p>}
        </form>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-xs text-paper/50 md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} InShape Gym. {t.footer.rights}</p>
          <div className="flex gap-4">
            <button type="button" onClick={() => onLegal('privacy')} className="hover:text-ember">
              {t.footer.privacy}
            </button>
            <button type="button" onClick={() => onLegal('termini')} className="hover:text-ember">
              {t.footer.terms}
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
