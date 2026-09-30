import { FaFacebookF, FaInstagram, FaTripadvisor } from 'react-icons/fa'
import BrandMark from './BrandMark'
import { useI18n } from '../i18n'

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer className="bg-ink text-white/70 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid md:grid-cols-3 gap-12">
        <div>
          <BrandMark light />
          <p className="mt-5 text-sm leading-relaxed max-w-xs">{t.footer.blurb}</p>
        </div>
        <div>
          <p className="text-white text-[11px] uppercase tracking-[0.22em] mb-4">{t.footer.explore}</p>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#rooms" className="hover:text-gold">{t.nav.rooms}</a></li>
            <li><a href="#services" className="hover:text-gold">{t.nav.services}</a></li>
            <li><a href="#gallery" className="hover:text-gold">{t.nav.gallery}</a></li>
            <li><a href="#contact" className="hover:text-gold">{t.nav.contact}</a></li>
          </ul>
        </div>
        <div>
          <p className="text-white text-[11px] uppercase tracking-[0.22em] mb-4">{t.footer.follow}</p>
          <div className="flex gap-3">
            {[
              { href: 'https://instagram.com', label: 'Instagram', icon: <FaInstagram /> },
              { href: 'https://facebook.com', label: 'Facebook', icon: <FaFacebookF /> },
              { href: 'https://www.tripadvisor.com', label: 'Tripadvisor', icon: <FaTripadvisor /> },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="w-10 h-10 border border-white/15 flex items-center justify-center hover:border-gold hover:text-gold"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="text-center text-[11px] tracking-wide text-white/40 mt-14 px-5">
        © {new Date().getFullYear()} Hotel Bella Vista. {t.footer.rights}
      </p>
    </footer>
  )
}
