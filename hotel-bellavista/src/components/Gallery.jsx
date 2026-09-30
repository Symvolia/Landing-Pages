import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { X } from 'lucide-react'
import { useI18n } from '../i18n'

const sources = [
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
]

export default function Gallery() {
  const { t } = useI18n()
  const [active, setActive] = useState(null)
  const photos = sources.map((src, index) => ({ src, alt: t.gallery.alts[index] }))

  return (
    <section id="gallery" className="py-24 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <h2 className="section-title" data-aos="fade-up">
          {t.gallery.title}
        </h2>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {photos.map((photo) => (
            <SwiperSlide key={photo.src}>
              <button
                type="button"
                onClick={() => setActive(photo)}
                className="block w-full overflow-hidden"
                aria-label={photo.alt}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="h-72 w-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="absolute top-6 right-6 text-white"
            aria-label={t.gallery.close}
            onClick={() => setActive(null)}
          >
            <X size={28} />
          </button>
          <img
            src={active.src}
            alt={active.alt}
            className="max-h-[85vh] max-w-5xl w-full object-contain rounded-lg"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
