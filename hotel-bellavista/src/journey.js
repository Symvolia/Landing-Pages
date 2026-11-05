// The walk through the resort: one entry per area, in visiting order.
// `focus` is where the camera walks to inside the photo (transform-origin, in %).
// `details` float in 3D space inside the area: x / y are offsets from the centre of the screen
// in vw / vh, `d` is how deep into the area they sit (0 = area entrance, 1 = next area).

const u = (id, w) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`

export const photo = (id) => ({
  src: u(id, 1600),
  srcSet: `${u(id, 900)} 900w, ${u(id, 1600)} 1600w, ${u(id, 2400)} 2400w`,
})

export const areas = [
  {
    id: 'arrival',
    image: 'photo-1540541338287-41700207dee6', // aerial: resort pool over the sea
    focus: [42, 70],
    details: [
      { kind: 'img', image: 'photo-1566073771259-6a8506099945', x: -30, y: -6, d: 0.55, w: 25 },
      { kind: 'fact', fact: 0, x: 27, y: 14, d: 0.42 },
    ],
  },
  {
    id: 'house',
    image: 'photo-1564501049412-61c2a3083791', // white facade with pool
    focus: [50, 58],
    details: [
      { kind: 'img', image: 'photo-1542314831-068cd1dbfeeb', x: 30, y: -8, d: 0.5, w: 23 },
      { kind: 'fact', fact: 0, x: -28, y: 12, d: 0.4 },
      { kind: 'fact', fact: 1, x: -24, y: -16, d: 0.68 },
    ],
  },
  {
    id: 'pool',
    image: 'photo-1584132967334-10e028bd69f7', // infinity pool deck over the sea
    focus: [40, 52],
    details: [
      { kind: 'img', image: 'photo-1445019980597-93fa8acb246c', x: -30, y: 8, d: 0.48, w: 23 },
      { kind: 'fact', fact: 0, x: 28, y: -12, d: 0.4 },
      { kind: 'fact', fact: 1, x: 24, y: 16, d: 0.66 },
    ],
  },
  {
    id: 'rooms',
    image: 'photo-1566665797739-1674de7a421a', // dark elegant room
    focus: [50, 62],
    details: [
      { kind: 'img', image: 'photo-1631049307264-da0ec9d70304', x: 30, y: -6, d: 0.45, w: 24 },
      { kind: 'img', image: 'photo-1590490360182-c33d57733427', x: -31, y: 10, d: 0.66, w: 21 },
      { kind: 'fact', fact: 0, x: -26, y: -16, d: 0.38 },
    ],
  },
  {
    id: 'spa',
    image: 'photo-1507652313519-d4e9174996dd', // stone bathtub with palm
    focus: [36, 70],
    details: [
      { kind: 'img', image: 'photo-1600334129128-685c5582fd35', x: 29, y: -8, d: 0.5, w: 23 },
      { kind: 'fact', fact: 0, x: -27, y: 12, d: 0.42 },
      { kind: 'fact', fact: 1, x: 24, y: 16, d: 0.68 },
    ],
  },
  {
    id: 'restaurant',
    image: 'photo-1578474846511-04ba529f0b88', // dark dining room
    focus: [50, 74],
    details: [
      { kind: 'img', image: 'photo-1414235077428-338989a2e8c0', x: -30, y: -4, d: 0.5, w: 24 },
      { kind: 'fact', fact: 0, x: 28, y: 12, d: 0.4 },
      { kind: 'fact', fact: 1, x: 26, y: -16, d: 0.66 },
    ],
  },
  {
    id: 'terrace',
    image: 'photo-1561501900-3701fa6a0864', // resort at sunset, pink sky
    focus: [50, 50],
    details: [
      { kind: 'img', image: 'photo-1551882547-ff40c63fe5fa', x: 30, y: -8, d: 0.45, w: 23 },
      { kind: 'fact', fact: 0, x: -27, y: 10, d: 0.38 },
    ],
  },
]

// Text for the journey, per language. Area keys match `areas[].id`.
export const journeyCopy = {
  it: {
    start: 'Inizia il tour',
    skip: 'Salta alle camere',
    keys: 'Usa ← → per cambiare area',
    exploreTitle: 'Esplora il resort',
    exploreIntro: 'Sette luoghi, dall\u2019arrivo al tramonto. Scegli da dove cominciare.',
    sections: 'Il sito',
    explore: 'Esplora',
    hint: 'Scorri per entrare nel resort',
    of: 'di',
    goTo: 'Vai a',
    areasLabel: 'Aree del resort',
    endKicker: 'Fine della passeggiata',
    endTitle: 'Il resto lo scopri di persona.',
    seeRooms: 'Vedi le camere',
    areas: {
      arrival: { short: 'Arrivo', name: 'Arrivo', line: 'Dall’alto: la baia, la piscina, il mare. Si scende piano.', facts: ['Costa Tirrenica · 40 km da Roma'] },
      house: { short: 'Casa', name: 'La casa', line: 'Una villa bianca degli anni ’30, rinnovata nel 1995. 120 camere.', facts: ['Check-in dalle 14:00', 'Concierge 24/7'] },
      pool: { short: 'Piscina', name: 'Piscina a sfioro', line: 'L’acqua finisce dove comincia il mare.', facts: ['Acqua a 28 °C', 'Aperta 8:00 – 20:00'] },
      rooms: { short: 'Camere', name: 'Camere e suite', line: 'Legno scuro, lino bianco e il rumore delle onde.', facts: ['Da 28 a 75 m²'] },
      spa: { short: 'Spa', name: 'Spa', line: 'Pietra, vapore e trattamenti con oli del Mediterraneo.', facts: ['Su prenotazione', 'Hammam e sauna'] },
      restaurant: { short: 'Ristorante', name: 'Ristorante', line: 'Cucina di mare, la sera, a luci basse.', facts: ['Cena 19:30 – 23:00', 'Menu degustazione'] },
      terrace: { short: 'Terrazza', name: 'Terrazza al tramonto', line: 'L’ultimo bicchiere, mentre il cielo diventa rosa.', facts: ['Aperitivo dalle 18:30'] },
    },
  },
  en: {
    start: 'Start the tour',
    skip: 'Skip to rooms',
    keys: 'Use ← → to change area',
    exploreTitle: 'Explore the resort',
    exploreIntro: 'Seven places, from arrival to sunset. Choose where to begin.',
    sections: 'The site',
    explore: 'Explore',
    hint: 'Scroll to step into the resort',
    of: 'of',
    goTo: 'Go to',
    areasLabel: 'Resort areas',
    endKicker: 'End of the walk',
    endTitle: 'The rest is better in person.',
    seeRooms: 'See the rooms',
    areas: {
      arrival: { short: 'Arrival', name: 'Arrival', line: 'From above: the bay, the pool, the sea. Then down, slowly.', facts: ['Tyrrhenian coast · 40 km from Rome'] },
      house: { short: 'House', name: 'The house', line: 'A white 1930s villa, restored in 1995. 120 rooms.', facts: ['Check-in from 2 pm', '24/7 concierge'] },
      pool: { short: 'Pool', name: 'Infinity pool', line: 'The water ends where the sea begins.', facts: ['Water at 28 °C', 'Open 8 am – 8 pm'] },
      rooms: { short: 'Rooms', name: 'Rooms & suites', line: 'Dark wood, white linen and the sound of the waves.', facts: ['From 28 to 75 m²'] },
      spa: { short: 'Spa', name: 'Spa', line: 'Stone, steam and treatments with Mediterranean oils.', facts: ['By appointment', 'Hammam and sauna'] },
      restaurant: { short: 'Restaurant', name: 'Restaurant', line: 'Seafood cooking, in the evening, in low light.', facts: ['Dinner 7:30 – 11 pm', 'Tasting menu'] },
      terrace: { short: 'Terrace', name: 'Sunset terrace', line: 'The last glass, while the sky turns pink.', facts: ['Aperitivo from 6:30 pm'] },
    },
  },
  pt: {
    start: 'Começar o passeio',
    skip: 'Saltar para os quartos',
    keys: 'Use ← → para mudar de área',
    exploreTitle: 'Explorar o resort',
    exploreIntro: 'Sete lugares, da chegada ao pôr do sol. Escolha por onde começar.',
    sections: 'O site',
    explore: 'Explorar',
    hint: 'Deslize para entrar no resort',
    of: 'de',
    goTo: 'Ir para',
    areasLabel: 'Áreas do resort',
    endKicker: 'Fim do passeio',
    endTitle: 'O resto descobre-se pessoalmente.',
    seeRooms: 'Ver os quartos',
    areas: {
      arrival: { short: 'Chegada', name: 'Chegada', line: 'Lá de cima: a baía, a piscina, o mar. Depois desce-se devagar.', facts: ['Costa do Tirreno · 40 km de Roma'] },
      house: { short: 'Casa', name: 'A casa', line: 'Uma villa branca dos anos 30, renovada em 1995. 120 quartos.', facts: ['Check-in a partir das 14:00', 'Concierge 24/7'] },
      pool: { short: 'Piscina', name: 'Piscina infinita', line: 'A água acaba onde o mar começa.', facts: ['Água a 28 °C', 'Aberta 8:00 – 20:00'] },
      rooms: { short: 'Quartos', name: 'Quartos e suites', line: 'Madeira escura, linho branco e o som das ondas.', facts: ['De 28 a 75 m²'] },
      spa: { short: 'Spa', name: 'Spa', line: 'Pedra, vapor e tratamentos com óleos do Mediterrâneo.', facts: ['Mediante marcação', 'Hammam e sauna'] },
      restaurant: { short: 'Restaurante', name: 'Restaurante', line: 'Cozinha de mar, à noite, com luz baixa.', facts: ['Jantar 19:30 – 23:00', 'Menu de degustação'] },
      terrace: { short: 'Terraço', name: 'Terraço ao pôr do sol', line: 'O último copo, enquanto o céu fica cor-de-rosa.', facts: ['Aperitivo a partir das 18:30'] },
    },
  },
}
