import { useEffect, useState } from 'react'
import AOS from 'aos'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Rooms from './components/Rooms'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [bookingRoom, setBookingRoom] = useState('')
  const [bookingSession, setBookingSession] = useState(0)

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 80 })
  }, [])

  const openBooking = (room = '') => {
    setBookingRoom(room)
    setBookingSession((current) => current + 1)
    setBookingOpen(true)
  }

  return (
    <>
      <Navbar onBook={() => openBooking()} />
      <main>
        <Hero onBook={() => openBooking()} />
        <About />
        <Rooms onBook={openBooking} />
        <Services />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <BookingModal
        key={bookingSession}
        open={bookingOpen}
        room={bookingRoom}
        onClose={() => setBookingOpen(false)}
      />
    </>
  )
}
