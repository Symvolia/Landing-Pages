import { useState } from 'react'
import { Star, X } from 'lucide-react'
import { useI18n } from '../i18n'

const rooms = [
  {
    id: 'standard',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
    price: '€150',
    rating: 4.5,
  },
  {
    id: 'deluxe',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80',
    price: '€250',
    rating: 4.8,
  },
  {
    id: 'suite',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    price: '€450',
    rating: 5,
  },
  {
    id: 'family',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    price: '€320',
    rating: 4.7,
  },
]

export default function Rooms({ onBook }) {
  const { t } = useI18n()
  const [selected, setSelected] = useState(null)
  const selectedCopy = selected ? t.rooms.items[selected.id] : null

  return (
    <section id="rooms" className="py-24 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <h2 className="section-title" data-aos="fade-up">
          {t.rooms.title}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rooms.map((room) => {
            const copy = t.rooms.items[room.id]
            return (
              <article
                key={room.id}
                className="bg-cream overflow-hidden border border-black/5 group"
                data-aos="fade-up"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={room.image}
                    alt={copy.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 text-ink px-3 py-1 text-[11px] tracking-[0.14em] uppercase">
                    {room.price} / {t.rooms.perNight}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-playfair mb-2 text-ink">{copy.name}</h3>
                  <p className="text-ink/60 text-sm mb-4">{copy.description}</p>

                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(room.rating) ? 'fill-gold text-gold' : 'text-gray-300'}
                      />
                    ))}
                    <span className="text-xs text-ink/50 ml-2">{room.rating}</span>
                  </div>

                  <button type="button" onClick={() => setSelected(room)} className="btn-ink w-full">
                    {t.rooms.details}
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {selected && selectedCopy && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-cream max-w-lg w-full overflow-hidden shadow-2xl"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="room-title"
          >
            <img src={selected.image} alt="" className="h-56 w-full object-cover" />
            <div className="p-6">
              <div className="flex justify-between items-start gap-4 mb-2">
                <h3 id="room-title" className="text-2xl font-playfair text-ink">
                  {selectedCopy.name}
                </h3>
                <button type="button" onClick={() => setSelected(null)} aria-label={t.rooms.close}>
                  <X size={22} />
                </button>
              </div>
              <p className="text-gold font-semibold mb-3">
                {selected.price} / {t.rooms.perNight}
              </p>
              <p className="text-gray-600 mb-6">{selectedCopy.details}</p>
              <button
                type="button"
                onClick={() => {
                  setSelected(null)
                  onBook(selected.id)
                }}
                className="btn-gold w-full"
              >
                {t.rooms.bookThis}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
