import { Star } from 'lucide-react'
import { useI18n } from '../i18n'

export default function BrandMark({ light = false }) {
  const { t } = useI18n()

  return (
    <span className={`inline-flex items-center gap-3 min-w-0 ${light ? 'text-white' : 'text-ink'}`}>
      <span className="font-playfair text-[1.05rem] sm:text-[1.35rem] leading-none tracking-tight whitespace-nowrap">
        Hotel Bella Vista
      </span>
      <span className="hidden sm:block h-3.5 w-px bg-gold shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline-flex items-center gap-0.5 text-gold shrink-0" aria-label={t.brandStars}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Star key={index} size={11} strokeWidth={1.25} className="fill-gold" />
        ))}
      </span>
    </span>
  )
}
