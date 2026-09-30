import { useState } from 'react'
import { X } from 'lucide-react'
import { useI18n } from '../i18n'

const roomIds = ['standard', 'deluxe', 'suite', 'family']

const emptyForm = {
  name: '',
  email: '',
  checkIn: '',
  checkOut: '',
  guests: '2',
  room: roomIds[0],
}

export default function BookingModal({ open, room, onClose }) {
  const { t } = useI18n()
  const [form, setForm] = useState({ ...emptyForm, room: room || roomIds[0] })
  const [error, setError] = useState('')
  const [confirmed, setConfirmed] = useState(null)

  if (!open) return null

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.checkIn || !form.checkOut) {
      setError(t.booking.required)
      return
    }
    if (form.checkOut <= form.checkIn) {
      setError(t.booking.dates)
      return
    }
    setError('')
    setConfirmed({ ...form })
  }

  const roomName = (id) => t.rooms.items[id]?.name || id

  return (
    <div className="fixed inset-0 z-[70] bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-cream w-full max-w-lg shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
      >
        <div className="flex justify-between items-start mb-6">
          <h2 id="booking-title" className="text-3xl font-playfair text-ink">
            {t.booking.title}
          </h2>
          <button type="button" onClick={onClose} aria-label={t.booking.close}>
            <X size={22} />
          </button>
        </div>

        {confirmed ? (
          <div>
            <p className="text-gray-700 mb-4">
              {t.booking.confirm({
                name: confirmed.name,
                email: confirmed.email,
                room: roomName(confirmed.room),
                checkIn: confirmed.checkIn,
                checkOut: confirmed.checkOut,
                guests: confirmed.guests,
              })}
            </p>
            <button type="button" onClick={onClose} className="btn-gold w-full">
              {t.booking.done}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium">{t.booking.name}</span>
              <input name="name" value={form.name} onChange={handleChange} className="field" />
            </label>
            <label className="block">
              <span className="text-sm font-medium">{t.booking.email}</span>
              <input name="email" type="email" value={form.email} onChange={handleChange} className="field" />
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-medium">{t.booking.checkIn}</span>
                <input name="checkIn" type="date" value={form.checkIn} onChange={handleChange} className="field" />
              </label>
              <label className="block">
                <span className="text-sm font-medium">{t.booking.checkOut}</span>
                <input name="checkOut" type="date" value={form.checkOut} onChange={handleChange} className="field" />
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-medium">{t.booking.guests}</span>
                <select name="guests" value={form.guests} onChange={handleChange} className="field bg-white">
                  {['1', '2', '3', '4'].map((count) => (
                    <option key={count} value={count}>
                      {count}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-medium">{t.booking.room}</span>
                <select name="room" value={form.room} onChange={handleChange} className="field bg-white">
                  {roomIds.map((id) => (
                    <option key={id} value={id}>
                      {roomName(id)}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button type="submit" className="btn-gold w-full">
              {t.booking.submit}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
