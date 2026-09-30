const img = (id, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`

export const gallery = {
  hero: img('photo-1534438327276-14e5300c3a48', 2000),
  about: img('photo-1540497077202-7c8a3999166f', 1400),
}

export const stats = [
  { id: 'members', value: 500, prefix: '+' },
  { id: 'trainers', value: 20, prefix: '+' },
  { id: 'disciplines', value: 12 },
  { id: 'renew', value: 98, suffix: '%' },
]

export const serviceMedia = [
  { id: 'strength', image: img('photo-1534438327276-14e5300c3a48', 1200), icon: 'dumbbell' },
  { id: 'cardio', image: img('photo-1538805060514-97d9cc17730c', 1200), icon: 'pulse' },
  { id: 'classes', image: img('photo-1518611012118-696072aa579a', 1200), icon: 'users' },
  { id: 'pt', image: img('photo-1571019614242-c5c5dee9f50b', 1000), icon: 'user' },
  { id: 'nutrition', image: img('photo-1490645935967-10de6ba17061', 1000), icon: 'apple' },
]

export const planMeta = [
  { id: 'basic', price: '39' },
  { id: 'premium', price: '69', featured: true },
  { id: 'elite', price: '129' },
]

export const storyMedia = [
  {
    id: 'giulia',
    name: 'Giulia R.',
    before: img('photo-1518310383802-640c2de311b2', 900),
    after: img('photo-1518611012118-696072aa579a', 900),
  },
  {
    id: 'marco',
    name: 'Marco L.',
    before: img('photo-1434682881908-b43d0467b798', 900),
    after: img('photo-1583454110551-21f2fa2afe61', 900),
  },
  {
    id: 'sara',
    name: 'Sara V.',
    before: img('photo-1571019613454-1cb2f99b2d8b', 900),
    after: img('photo-1541534741688-6078c6bfb5c5', 900),
  },
]

export const dayIds = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

export const week = {
  mon: [
    { time: '06:30', classId: 'strengthFoundations', coach: 'Luca', room: 'weights' },
    { time: '12:15', classId: 'cross', coach: 'Amina', room: 'studio1' },
    { time: '18:30', classId: 'spinning', coach: 'Davide', room: 'cycling' },
    { time: '20:00', classId: 'yogaRestore', coach: 'Elena', room: 'studio2' },
  ],
  tue: [
    { time: '07:00', classId: 'cardio', coach: 'Davide', room: 'conditioning' },
    { time: '13:00', classId: 'hypertrophy', coach: 'Luca', room: 'weights' },
    { time: '18:00', classId: 'cross', coach: 'Amina', room: 'studio1' },
    { time: '19:30', classId: 'spinning', coach: 'Chiara', room: 'cycling' },
  ],
  wed: [
    { time: '06:30', classId: 'strengthFoundations', coach: 'Luca', room: 'weights' },
    { time: '12:30', classId: 'yogaFlow', coach: 'Elena', room: 'studio2' },
    { time: '18:30', classId: 'cross', coach: 'Amina', room: 'studio1' },
    { time: '20:15', classId: 'core', coach: 'Chiara', room: 'studio2' },
  ],
  thu: [
    { time: '07:00', classId: 'spinning', coach: 'Davide', room: 'cycling' },
    { time: '12:15', classId: 'hypertrophy', coach: 'Luca', room: 'weights' },
    { time: '18:00', classId: 'cross', coach: 'Amina', room: 'studio1' },
    { time: '19:45', classId: 'yogaRestore', coach: 'Elena', room: 'studio2' },
  ],
  fri: [
    { time: '06:30', classId: 'cardio', coach: 'Chiara', room: 'conditioning' },
    { time: '13:00', classId: 'strengthFoundations', coach: 'Luca', room: 'weights' },
    { time: '18:00', classId: 'spinning', coach: 'Davide', room: 'cycling' },
    { time: '19:30', classId: 'cross', coach: 'Amina', room: 'studio1' },
  ],
  sat: [
    { time: '09:00', classId: 'cross', coach: 'Amina', room: 'studio1' },
    { time: '10:15', classId: 'strengthTeam', coach: 'Luca', room: 'weights' },
    { time: '11:30', classId: 'yogaFlow', coach: 'Elena', room: 'studio2' },
  ],
  sun: [
    { time: '10:00', classId: 'openGym', coach: 'staff', room: 'weights' },
    { time: '11:15', classId: 'mobility', coach: 'Elena', room: 'studio2' },
  ],
}

export const navLinks = [
  { href: '#home', id: 'home' },
  { href: '#chi-siamo', id: 'about' },
  { href: '#servizi', id: 'services' },
  { href: '#orari', id: 'hours' },
  { href: '#tariffe', id: 'plans' },
  { href: '#contatti', id: 'contact' },
]
